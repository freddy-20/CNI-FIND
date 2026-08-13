import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSessionToken } from "@/lib/auth";

// Anti brute-force : 5 tentatives / 15 min / IP
const attempts = new Map<string, { count: number; firstAttempt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60_000;

function getClientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function isBlocked(ip: string) {
  const entry = attempts.get(ip);
  if (!entry) return false;
  if (Date.now() - entry.firstAttempt > WINDOW_MS) {
    attempts.delete(ip);
    return false;
  }
  return entry.count >= MAX_ATTEMPTS;
}

function recordAttempt(ip: string) {
  const entry = attempts.get(ip);
  if (!entry || Date.now() - entry.firstAttempt > WINDOW_MS) {
    attempts.set(ip, { count: 1, firstAttempt: Date.now() });
  } else {
    entry.count++;
  }
}

export async function POST(request: Request) {
  const ip = getClientIp(request);

  if (isBlocked(ip)) {
    return NextResponse.json(
      { success: false, error: "Trop de tentatives. Réessayez dans 15 minutes." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");

    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      recordAttempt(ip);
      return NextResponse.json({ success: false, error: "Identifiants incorrects" }, { status: 401 });
    }

    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) {
      recordAttempt(ip);
      return NextResponse.json({ success: false, error: "Identifiants incorrects" }, { status: 401 });
    }

    attempts.delete(ip);

    const token = await createSessionToken(email);
    const response = NextResponse.json({ success: true });

    response.cookies.set("admin-session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch {
    return NextResponse.json({ success: false, error: "Erreur serveur" }, { status: 500 });
  }
}
