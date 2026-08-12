import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    const document =
      await prisma.lostDocument.create({
        data: {
          firstName: body.firstName,
          lastName: body.lastName,

          birthDate: body.birthDate
            ? new Date(body.birthDate)
            : null,

          profession: body.profession,

          fatherName: body.fatherName,

          motherName: body.motherName,

          birthPlace: body.birthPlace,

          lossCity: body.lossCity,

          lossDate: body.lossDate
            ? new Date(body.lossDate)
            : null,

          cniNumber: body.cniNumber,

          phone: body.phone
        }
      });

    return NextResponse.json(
      document
    );
  } catch (error) {
    return NextResponse.json(
      {
        message:
          "Erreur lors de l'enregistrement"
      },
      {
        status: 500
      }
    );
  }
}
