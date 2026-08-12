import { prisma } from "@/lib/prisma";

export async function archiveExpiredDocuments() {
  const sixMonthsAgo =
    new Date();

  sixMonthsAgo.setMonth(
    sixMonthsAgo.getMonth() - 6
  );

  await prisma.foundDocument.updateMany({
    where: {
      createdAt: {
        lt: sixMonthsAgo,
      },
      status: "FOUND",
    },
    data: {
      status: "ARCHIVED",
    },
  });
}
