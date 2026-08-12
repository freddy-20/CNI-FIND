import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    const report =
      await prisma.report.create({
        data: {
          reason: body.reason,
          description:
            body.description,
          phone: body.phone,
        },
      });

    return NextResponse.json({
      success: true,
      report,
    });
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
