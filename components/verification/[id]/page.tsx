import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import VerificationForm from "@/components/verification/VerificationForm";

export default async function VerificationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const match = await prisma.match.findUnique({
    where: { id },
    include: { found: { select: { foundCity: true, foundDate: true } } },
  });

  if (!match) {
    return notFound();
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-800">Vérification d'identité</h1>
      <p className="mt-2 text-slate-500">
        Pour votre sécurité, confirmez au moins 2 informations personnelles avant d'accéder aux
        coordonnées de la personne qui a retrouvé la CNI.
      </p>

      <div className="mt-6 rounded-xl border bg-blue-50 p-4 text-sm text-blue-700">
        📍 Indice : cette CNI a été retrouvée à <strong>{match.found.foundCity}</strong>.
      </div>

      <div className="mt-6 rounded-2xl border bg-white p-6 shadow-sm">
        <VerificationForm matchId={match.id} />
      </div>
    </div>
  );
}
