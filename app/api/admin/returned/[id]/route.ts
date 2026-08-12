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
  const { id } = await params;

  await prisma.lostDocument.update({
    where: { id },
    data: {
      status: "RETURNED",
    },
  });

  return NextResponse.redirect(
    new URL("/admin", request.url)
  );
}
