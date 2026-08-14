import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { foundDocumentSchema } from "@/lib/validations/found-document";
import { calculateMatchScore, MATCH_THRESHOLD } from "@/lib/matching/calculate-score";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const parsed = foundDocumentSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Données invalides", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    if (!body.photoUrl) {
      return NextResponse.json(
        { success: false, error: "La photo de la CNI est obligatoire" },
        { status: 400 }
      );
    }

    const blocked = await prisma.blockedNumber.findUnique({
      where: { phone: data.phone },
    });

    if (blocked) {
      return NextResponse.json(
        { success: false, error: "Ce numéro n'est pas autorisé à publier d'annonce" },
        { status: 403 }
      );
    }

    if (data.cniNumber) {
      const existing = await prisma.foundDocument.findFirst({
        where: { cniNumber: data.cniNumber, status: { not: "ARCHIVED" } },
      });

      if (existing) {
        return NextResponse.json(
          { success: false, error: "Cette CNI a déjà été déclarée retrouvée" },
          { status: 409 }
        );
      }
    }

    const result = await prisma.$transaction(async (tx) => {
      const foundDocument = await tx.foundDocument.create({
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          cniNumber: data.cniNumber || null,
          birthDate: data.birthDate ? new Date(data.birthDate) : null,
          birthPlace: data.birthPlace || null,
          profession: data.profession || null,
          fatherName: data.fatherName || null,
          motherName: data.motherName || null,
          foundCity: data.foundCity,
          foundDate: new Date(data.foundDate),
          photoUrl: body.photoUrl,
          description: data.description || null,
          depositorName: data.depositorName,
          phone: data.phone,
          whatsapp: data.whatsapp || null,
          email: data.email || null,
        },
      });

      const lostDocuments = await tx.lostDocument.findMany({
        where: { status: "LOST" },
      });

      let matchesCreated = 0;

      for (const lost of lostDocuments) {
        const score = calculateMatchScore(lost, foundDocument);

        if (score >= MATCH_THRESHOLD) {
          await tx.match.create({
            data: {
              lostId: lost.id,
              foundId: foundDocument.id,
              score,
            },
          });

          await tx.lostDocument.update({
            where: { id: lost.id },
            data: { status: "MATCHED" },
          });

          matchesCreated++;
        }
      }

      return { foundDocument, matchesCreated };
    });

    return NextResponse.json({
      success: true,
      data: result.foundDocument,
      matchesCreated: result.matchesCreated,
    });
  } catch (error) {
    console.error("Erreur /api/found:", error);

    return NextResponse.json(
      { success: false, error: "Erreur lors de l'enregistrement" },
      { status: 500 }
    );
  }
}
