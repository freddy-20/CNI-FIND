import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    const results =
      await prisma.match.findMany({
        where: {
          OR: [
            {
              lost: {
                lastName: {
                  contains:
                    body.query,
                  mode:
                    "insensitive",
                },
              },
            },

            {
              lost: {
                firstName: {
                  contains:
                    body.query,
                  mode:
                    "insensitive",
                },
              },
            },

            {
              found: {
                lastName: {
                  contains:
                    body.query,
                  mode:
                    "insensitive",
                },
              },
            },

            {
              found: {
                firstName: {
                  contains:
                    body.query,
                  mode:
                    "insensitive",
                },
              },
            },
          ],
        },

        include: {
          lost: true,
          found: true,
        },

        orderBy: {
          score: "desc",
        },
      });

    return NextResponse.json(
      results
    );
  } catch {
    return NextResponse.json(
      [],
      {
        status: 500,
      }
    );
  }
}
