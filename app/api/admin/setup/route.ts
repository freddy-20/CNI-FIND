import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const DEFAULT_ADMIN_EMAIL = "admin@cni.cm";
const DEFAULT_ADMIN_PASSWORD = "Admin123";

export async function POST(request: Request) {
  try {
    const existingAdmin = await prisma.admin.findFirst();
    if (existingAdmin) {
      return NextResponse.json(
        { error: "Un compte admin existe déjà. Connectez-vous avec vos identifiants." },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(DEFAULT_ADMIN_PASSWORD, 10);

    await prisma.admin.create({
      data: {
        email: DEFAULT_ADMIN_EMAIL,
        password: passwordHash,
      },
    });

    return NextResponse.json({
      success: true,
      email: DEFAULT_ADMIN_EMAIL,
      password: DEFAULT_ADMIN_PASSWORD,
    });
  } catch (error) {
    console.error("Admin setup error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du compte admin." },
      { status: 500 }
    );
  }
}
