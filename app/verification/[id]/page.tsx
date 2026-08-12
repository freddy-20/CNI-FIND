import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function VerificationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const match =
    await prisma.match.findUnique({
      where: { id },
      include: {
        found: true,
      },
    });

  if (!match) {
    return notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">

      <h1 className="text-3xl font-bold mb-6">
        Vérification d'identité
      </h1>

      <div className="bg-white border rounded-xl p-6">

        <p className="mb-4">
          Pour des raisons de sécurité,
          vous devez confirmer vos informations.
        </p>

        <form
          action={`/api/verify/${match.id}`}
          method="POST"
          className="grid gap-4"
        >
          <input
            name="fatherName"
            placeholder="Nom du père"
            className="border p-3 rounded-lg"
          />

          <input
            name="motherName"
            placeholder="Nom de la mère"
            className="border p-3 rounded-lg"
          />

          <input
            name="birthPlace"
            placeholder="Lieu de naissance"
            className="border p-3 rounded-lg"
          />

          <button
            className="bg-blue-600 text-white p-3 rounded-lg"
          >
            Vérifier
          </button>
        </form>

      </div>
    </div>
  );
}
