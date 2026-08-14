import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { lostDocumentSchema } from "@/lib/validations/lost-document";

const attempts = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;

function getClientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (attempts.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= RATE_LIMIT_MAX) {
    attempts.set(ip, recent);
    return true;
  }

  recent.push(now);
  attempts.set(ip, recent);
  return false;
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Trop de tentatives. Réessayez dans une minute." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = lostDocumentSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Données invalides", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const document = await prisma.lostDocument.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        birthDate: data.birthDate ? new Date(data.birthDate) : null,
        profession: data.profession || null,
        fatherName: data.fatherName || null,
        motherName: data.motherName || null,
        birthPlace: data.birthPlace || null,
        lossCity: data.lossCity || null,
        lossDate: data.lossDate ? new Date(data.lossDate) : null,
        cniNumber: data.cniNumber || null,
        phone: data.phone,
      },
    });

    return NextResponse.json(document);
  } catch (error) {
    console.error("Erreur /api/lost:", error);
    return NextResponse.json({ error: "Erreur lors de l'enregistrement" }, { status: 500 });
  }
}
