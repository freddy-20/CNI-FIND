import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [
    lostCount,
    foundCount,
    matchCount,
    returnedCount,
    reportCount,
    lostDocuments,
    foundDocuments,
  ] = await Promise.all([
    prisma.lostDocument.count(),
    prisma.foundDocument.count(),
    prisma.match.count(),
    prisma.foundDocument.count({
      where: {
        status: "RETURNED",
      },
    }),
    prisma.report.count(),
    prisma.lostDocument.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    }),
    prisma.foundDocument.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    }),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      <h1 className="text-4xl font-bold mb-8">
        Dashboard Admin
      </h1>

      <div className="grid md:grid-cols-5 gap-4 mb-10">

        <div className="bg-white border rounded-xl p-5">
          <h3 className="text-sm text-gray-500">
            CNI Perdues
          </h3>
          <p className="text-3xl font-bold">
            {lostCount}
          </p>
        </div>

        <div className="bg-white border rounded-xl p-5">
          <h3 className="text-sm text-gray-500">
            CNI Retrouvées
          </h3>
          <p className="text-3xl font-bold">
            {foundCount}
          </p>
        </div>

        <div className="bg-white border rounded-xl p-5">
          <h3 className="text-sm text-gray-500">
            Matchs
          </h3>
          <p className="text-3xl font-bold">
            {matchCount}
          </p>
        </div>

        <div className="bg-white border rounded-xl p-5">
          <h3 className="text-sm text-gray-500">
            Restituées
          </h3>
          <p className="text-3xl font-bold">
            {returnedCount}
          </p>
        </div>

        <div className="bg-white border rounded-xl p-5">
          <h3 className="text-sm text-gray-500">
            Signalements
          </h3>
          <p className="text-3xl font-bold">
            {reportCount}
          </p>
        </div>

      </div>

      <div className="grid lg:grid-cols-2 gap-8">

        <div className="bg-white border rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">
            Dernières CNI Perdues
          </h2>

          <div className="space-y-3">
            {lostDocuments.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg p-4"
              >
                <div className="font-semibold">
                  {item.lastName} {item.firstName}
                </div>

                <div className="text-sm text-gray-500">
                  {item.lossCity}
                </div>

                <div className="mt-3 flex gap-2">

                  <form
                    action={`/api/admin/returned/${item.id}`}
                    method="POST"
                  >
                    <button className="bg-green-600 text-white px-3 py-2 rounded">
                      Restituée
                    </button>
                  </form>

                  <form
                    action={`/api/admin/delete-lost/${item.id}`}
                    method="POST"
                  >
                    <button className="bg-red-600 text-white px-3 py-2 rounded">
                      Supprimer
                    </button>
                  </form>

                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">
            Dernières CNI Retrouvées
          </h2>

          <div className="space-y-3">
            {foundDocuments.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg p-4"
              >
                <div className="font-semibold">
                  {item.lastName} {item.firstName}
                </div>

                <div className="text-sm text-gray-500">
                  {item.foundCity}
                </div>

                <div className="mt-3 flex gap-2">

                  <form
                    action={`/api/admin/returned-found/${item.id}`}
                    method="POST"
                  >
                    <button className="bg-green-600 text-white px-3 py-2 rounded">
                      Restituée
                    </button>
                  </form>

                  <form
                    action={`/api/admin/delete-found/${item.id}`}
                    method="POST"
                  >
                    <button className="bg-red-600 text-white px-3 py-2 rounded">
                      Supprimer
                    </button>
                  </form>

                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
