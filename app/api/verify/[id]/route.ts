import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const { id } = await params;

    const form =
      await request.formData();

    const fatherName =
      String(form.get("fatherName") || "");

    const motherName =
      String(form.get("motherName") || "");

    const birthPlace =
      String(form.get("birthPlace") || "");

    const match =
      await prisma.match.findUnique({
        where: { id },
        include: {
          lost: true,
          found: true,
        },
      });

    if (!match) {
      return NextResponse.redirect(
        new URL("/recherche", request.url)
      );
    }

    let verified = 0;

    if (
      fatherName &&
      match.lost.fatherName &&
      fatherName.toLowerCase() ===
        match.lost.fatherName.toLowerCase()
    ) {
      verified++;
    }

    if (
      motherName &&
      match.lost.motherName &&
      motherName.toLowerCase() ===
        match.lost.motherName.toLowerCase()
    ) {
      verified++;
    }

    if (
      birthPlace &&
      match.lost.birthPlace &&
      birthPlace.toLowerCase() ===
        match.lost.birthPlace.toLowerCase()
    ) {
      verified++;
    }

    if (verified >= 2) {
      await prisma.match.update({
        where: {
          id: match.id,
        },
        data: {
          verified: true,
        },
      });

      return NextResponse.redirect(
        new URL(
          `/contact/${match.id}`,
          request.url
        )
      );
    }

    return NextResponse.redirect(
      new URL(
        "/verification-echec",
        request.url
      )
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
