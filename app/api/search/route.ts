import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { calculateMatchScore, MATCH_THRESHOLD } from "@/lib/matching/calculate-score";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const query = (body.query || "").trim();

    if (!query || query.length < 2) {
      return NextResponse.json([]);
    }

    const nameFilter = { contains: query, mode: "insensitive" as const };

    // Rattrapage : recalcule les correspondances possibles pour les déclarations
    // existantes qui n'ont jamais été comparées (ancien bug de matching à sens unique)
    const [lostCandidates, foundPool] = await Promise.all([
      prisma.lostDocument.findMany({
        where: {
          status: { notIn: ["RETURNED", "ARCHIVED"] },
          OR: [{ lastName: nameFilter }, { firstName: nameFilter }],
        },
      }),
      prisma.foundDocument.findMany({
        where: { status: { notIn: ["RETURNED", "ARCHIVED"] } },
      }),
    ]);

    for (const lost of lostCandidates) {
      for (const found of foundPool) {
        const score = calculateMatchScore(lost, found);
        if (score >= MATCH_THRESHOLD) {
          const existing = await prisma.match.findFirst({
            where: { lostId: lost.id, foundId: found.id },
          });
          if (!existing) {
            await prisma.match.create({ data: { lostId: lost.id, foundId: found.id, score } });
            await prisma.lostDocument.update({ where: { id: lost.id }, data: { status: "MATCHED" } });
          }
        }
      }
    }

    const results = await prisma.match.findMany({
      where: {
        score: { gte: MATCH_THRESHOLD },
        lost: { status: { notIn: ["RETURNED", "ARCHIVED"] } },
        found: { status: { notIn: ["RETURNED", "ARCHIVED"] } },
        OR: [
          { lost: { lastName: nameFilter } },
          { lost: { firstName: nameFilter } },
          { found: { lastName: nameFilter } },
          { found: { firstName: nameFilter } },
        ],
      },
      include: {
        lost: { select: { id: true, firstName: true, lastName: true, lossCity: true, status: true } },
        found: { select: { id: true, foundCity: true, status: true } },
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
