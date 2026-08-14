import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { toWhatsAppDigits } from "@/utils/phone";
import AnimatedBackground from "@/components/shared/AnimatedBackground";

export default async function ContactPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const match = await prisma.match.findUnique({
    where: { id },
    include: { found: true },
  });

  if (!match) return notFound();
  if (!match.verified) redirect(`/verification/${match.id}`);

  const whatsappDigits = toWhatsAppDigits(match.found.whatsapp || match.found.phone);

  return (
    <div className="relative">
      <AnimatedBackground />

      <div className="mx-auto max-w-xl px-4 py-16 sm:py-20">
        <div className="animate-fade-in-up mb-6 flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4 text-emerald-300">
          <span className="font-semibold">✅ Correspondance vérifiée</span>
        </div>

        <div className="glass-card animate-fade-in-up p-6 sm:p-8" style={{ animationDelay: "100ms" }}>
          <h1 className="text-2xl font-bold text-white">Contactez le déposant</h1>
          <p className="mt-2 text-sm text-slate-300">
            Votre CNI a été retrouvée à <strong className="text-white">{match.found.foundCity}</strong>.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            
              href={`tel:${match.found.phone}`}
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 p-4 font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Appeler
            </a>
            {whatsappDigits && (
              
                href={`https://wa.me/${whatsappDigits}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 p-4 font-semibold text-white transition-colors hover:bg-emerald-700"
              >
                WhatsApp
              </a>
            )}
          </div>

          <div className="mt-6 rounded-lg border border-amber-400/30 bg-amber-500/10 p-3 text-xs text-amber-200">
            ⚠️ Convenez toujours d'un lieu public pour la remise. Restez vigilant face à toute
            demande d'argent.
          </div>

          
            href={`/signaler?type=found&id=${match.found.id}`}
            className="mt-4 block text-center text-sm text-red-300 hover:underline"
          >
            🚩 Signaler un problème avec cette annonce
          </a>
        </div>
      </div>
    </div>
  );
}
