import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    const blocked =
      await prisma.blockedNumber.create({
        data: {
          phone:
            body.phone,

          reason:
            body.reason,
        },
      });

    return NextResponse.json(
      blocked
    );
  } catch {
    return NextResponse.json(
      {
        error:
          "Impossible de bloquer",
      },
      {
        status: 500,
      }
    );
  }
}
