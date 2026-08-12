import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const foundDocument =
      await prisma.foundDocument.create({
        data: {
          firstName: body.firstName,
          lastName: body.lastName,

          cniNumber: body.cniNumber || null,

          birthDate: body.birthDate
            ? new Date(body.birthDate)
            : null,

          birthPlace: body.birthPlace || null,

          fatherName: body.fatherName || null,

          motherName: body.motherName || null,

          profession: body.profession || null,

          foundCity: body.foundCity || null,

          foundDate: body.foundDate
            ? new Date(body.foundDate)
            : null,

          photoUrl: body.photoUrl,

          description: body.description || null,

          depositorName:
            body.depositorName,

          phone: body.phone,

          whatsapp:
            body.whatsapp || null,

          email: body.email || null,
        },
      });

    const lostDocuments =
      await prisma.lostDocument.findMany();

    for (const lost of lostDocuments) {
      let score = 0;

      if (
        lost.lastName &&
        foundDocument.lastName &&
        lost.lastName.toLowerCase() ===
          foundDocument.lastName.toLowerCase()
      ) {
        score += 30;
      }

      if (
        lost.firstName &&
        foundDocument.firstName &&
        lost.firstName.toLowerCase() ===
          foundDocument.firstName.toLowerCase()
      ) {
        score += 20;
      }

      if (
        lost.birthPlace &&
        foundDocument.birthPlace &&
        lost.birthPlace.toLowerCase() ===
          foundDocument.birthPlace.toLowerCase()
      ) {
        score += 10;
      }

      if (
        lost.profession &&
        foundDocument.profession &&
        lost.profession.toLowerCase() ===
          foundDocument.profession?.toLowerCase()
      ) {
        score += 10;
      }

      if (
        lost.fatherName &&
        foundDocument.fatherName &&
        lost.fatherName.toLowerCase() ===
          foundDocument.fatherName.toLowerCase()
      ) {
        score += 15;
      }

      if (
        lost.motherName &&
        foundDocument.motherName &&
        lost.motherName.toLowerCase() ===
          foundDocument.motherName.toLowerCase()
      ) {
        score += 15;
      }

      if (score >= 60) {
        await prisma.match.create({
          data: {
            lostId: lost.id,
            foundId: foundDocument.id,
            score,
          },
        });
      }
    }

    const blocked =
  await prisma.blockedNumber.findUnique({
    where: {
      phone: body.phone,
    },
  });

if (blocked) {
  return NextResponse.json(
    {
      error:
        "Numéro bloqué",
    },
    {
      status: 403,
    }
  );
}
    
    return NextResponse.json({
      success: true,
      data: foundDocument,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Erreur lors de l'enregistrement",
      },
      {
        status: 500,
      }
    );
  }
}
