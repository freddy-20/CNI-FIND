import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ReportsPage() {
  const reports =
    await prisma.report.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">

      <h1 className="text-3xl font-bold mb-6">
        Signalements
      </h1>

      <div className="space-y-4">

        {reports.map(
          (report) => (
            <div
              key={report.id}
              className="bg-white border rounded-xl p-5"
            >
              <h3 className="font-bold">
                {report.reason}
              </h3>

              <p>
                {
                  report.description
                }
              </p>

              <p className="text-sm text-gray-500">
                {
                  report.phone
                }
              </p>
            </div>
          )
        )}

      </div>

    </div>
  );
}
