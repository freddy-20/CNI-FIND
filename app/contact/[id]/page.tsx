import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const match =
    await prisma.match.findUnique({
      where: {
        id,
      },
      include: {
        found: true,
      },
    });

  if (!match) {
    return notFound();
  }

  if (!match.verified) {
    return (
      <div className="max-w-xl mx-auto py-10">
        <div className="bg-red-100 text-red-700 p-6 rounded-xl">
          Vérification obligatoire.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-10">

      <h1 className="text-3xl font-bold mb-6">
        Correspondance vérifiée ✅
      </h1>

      <div className="bg-white border rounded-xl p-6">

        <p className="mb-4">
          Contactez la personne qui a retrouvé
          votre CNI.
        </p>

        <div className="flex gap-4">

          <a
            href={`tel:${match.found.phone}`}
            className="bg-green-600 text-white px-4 py-3 rounded-lg"
          >
            📞 Appeler
          </a>

          <a
            href={`https://wa.me/${match.found.whatsapp}`}
            target="_blank"
            className="bg-green-700 text-white px-4 py-3 rounded-lg"
          >
            💬 WhatsApp
          </a>

        </div>

      </div>
    </div>
  );
}
