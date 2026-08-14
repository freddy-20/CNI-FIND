import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { MATCH_THRESHOLD } from "@/lib/matching/calculate-score";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const query = (body.query || "").trim();

    if (!query || query.length < 2) {
      return NextResponse.json([]);
    }

    const results = await prisma.match.findMany({
      where: {
        score: { gte: MATCH_THRESHOLD },
        lost: { status: { notIn: ["RETURNED", "ARCHIVED"] } },
        found: { status: { notIn: ["RETURNED", "ARCHIVED"] } },
        OR: [
          { lost: { lastName: { contains: query, mode: "insensitive" } } },
          { lost: { firstName: { contains: query, mode: "insensitive" } } },
          { found: { lastName: { contains: query, mode: "insensitive" } } },
          { found: { firstName: { contains: query, mode: "insensitive" } } },
        ],
      },
      include: {
        lost: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            lossCity: true,
            status: true,
          },
        },
        found: {
          select: {
            id: true,
            foundCity: true,
            status: true,
          },
        },
      },
      orderBy: { score: "desc" },
      take: 20,
    });

    return NextResponse.json(results);
  } catch (error) {
    console.error("Erreur /api/search:", error);
    return NextResponse.json([], { status: 500 });
  }
}
