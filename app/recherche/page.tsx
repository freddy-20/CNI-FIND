import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function RecherchePage() {
  const matches = await prisma.match.findMany({
    include: {
      lost: true,
      found: true,
    },
    orderBy: {
      score: "desc",
    },
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      <h1 className="text-3xl font-bold mb-2">
        Recherche de correspondances
      </h1>

      <p className="text-gray-500 mb-8">
        Les informations sensibles sont masquées.
      </p>

      {matches.length === 0 ? (
        <div className="bg-white border rounded-xl p-8 text-center">
          Aucune correspondance trouvée.
        </div>
      ) : (
        <div className="grid gap-6">

          {matches.map((match) => (
            <div
              key={match.id}
              className="bg-white border rounded-xl p-6"
            >
              <div className="flex justify-between items-center">

                <div>
                  <h2 className="font-bold text-lg">
                    {match.lost.lastName.charAt(0)}
                    ****{" "}
                    {match.lost.firstName.charAt(0)}
                    ****
                  </h2>

                  <p className="text-gray-500">
                    Ville :{" "}
                    {match.lost.lossCity || "-"}
                  </p>
                </div>

                <div className="text-right">
                  <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
                    Correspondance :
                    {" "}
                    {Math.round(match.score)}
                    %
                  </span>
                </div>

              </div>

              <div className="mt-4">
                <a
                  href={`/verification/${match.id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Vérifier mon identité
                </a>
              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}
