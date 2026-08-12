import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Anti brute-force : 5 essais max par match / 10 minutes
const attempts = new Map<string, { count: number; firstAttempt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 10 * 60_000;

function isBlocked(matchId: string) {
  const entry = attempts.get(matchId);
  if (!entry) return false;

  if (Date.now() - entry.firstAttempt > WINDOW_MS) {
    attempts.delete(matchId);
    return false;
  }

  return entry.count >= MAX_ATTEMPTS;
}

function recordAttempt(matchId: string) {
  const entry = attempts.get(matchId);

  if (!entry || Date.now() - entry.firstAttempt > WINDOW_MS) {
    attempts.set(matchId, { count: 1, firstAttempt: Date.now() });
  } else {
    entry.count++;
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (isBlocked(id)) {
      return NextResponse.json(
        { success: false, error: "Trop de tentatives. Réessayez dans quelques minutes." },
        { status: 429 }
      );
    }

    const body = await request.json();

    const fatherName = String(body.fatherName || "").trim();
    const motherName = String(body.motherName || "").trim();
    const birthPlace = String(body.birthPlace || "").trim();

    const match = await prisma.match.findUnique({
      where: { id },
      include: { lost: true },
    });

    if (!match) {
      return NextResponse.json({ success: false, error: "Correspondance introuvable" }, { status: 404 });
    }

    if (match.verified) {
      return NextResponse.json({ success: true, redirect: `/contact/${match.id}` });
    }

    recordAttempt(id);

    let score = 0;

    if (fatherName && match.lost.fatherName?.toLowerCase() === fatherName.toLowerCase()) score++;
    if (motherName && match.lost.motherName?.toLowerCase() === motherName.toLowerCase()) score++;
    if (birthPlace && match.lost.birthPlace?.toLowerCase() === birthPlace.toLowerCase()) score++;

    if (score >= 2) {
      await prisma.match.update({
        where: { id: match.id },
        data: { verified: true },
      });

      await prisma.lostDocument.update({
        where: { id: match.lostId },
        data: { status: "CONTACTED" },
      });

      attempts.delete(id);

      return NextResponse.json({ success: true, redirect: `/contact/${match.id}` });
    }

    return NextResponse.json(
      { success: false, error: "Les informations ne correspondent pas. Vérifiez et réessayez." },
      { status: 401 }
    );
  } catch (error) {
    console.error("Erreur /api/verify:", error);
    return NextResponse.json({ success: false, error: "Erreur serveur" }, { status: 500 });
  }
}
