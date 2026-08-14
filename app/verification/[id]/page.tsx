import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import VerificationForm from "@/components/verification/VerificationForm";
import AnimatedBackground from "@/components/shared/AnimatedBackground";

export default async function VerificationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const match = await prisma.match.findUnique({
    where: { id },
    include: { found: { select: { foundCity: true, foundDate: true } } },
  });

  if (!match) return notFound();

  return (
    <div className="relative">
      <AnimatedBackground />

      <div className="mx-auto max-w-xl px-4 py-16 sm:py-20">
        <div className="animate-fade-in-up text-center text-white">
          <h1 className="text-3xl font-bold sm:text-4xl">Vérification d'identité</h1>
          <p className="mt-3 text-slate-300">
            Confirmez au moins 2 informations personnelles avant d'accéder aux coordonnées de la
            personne qui a retrouvé la CNI.
          </p>
        </div>

        <div className="glass-card animate-fade-in-up mt-6 border-blue-400/20 bg-blue-500/10 p-4 text-sm text-blue-200" style={{ animationDelay: "100ms" }}>
          📍 Indice : cette CNI a été retrouvée à <strong>{match.found.foundCity}</strong>.
        </div>

        <div className="glass-card animate-fade-in-up mt-6 p-6 sm:p-8" style={{ animationDelay: "200ms" }}>
          <VerificationForm matchId={match.id} />
        </div>
      </div>
    </div>
  );
}
