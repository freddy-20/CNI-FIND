import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { reportSchema } from "@/lib/validations/report";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = reportSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ success: false, error: "Données invalides" }, { status: 400 });
    }

    const report = await prisma.report.create({ data: parsed.data });

    return NextResponse.json({ success: true, report });
  } catch {
    return NextResponse.json({ success: false, error: "Erreur serveur" }, { status: 500 });
  }
}
