import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { toWhatsAppDigits } from "@/utils/phone";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const match = await prisma.match.findUnique({
    where: { id },
    include: { found: true },
  });

  if (!match) {
    return notFound();
  }

  if (!match.verified) {
    redirect(`/verification/${match.id}`);
  }

  const whatsappDigits = toWhatsAppDigits(match.found.whatsapp || match.found.phone);

  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      <div className="mb-6 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-4 text-green-700">
        <span className="text-xl">✅</span>
        <span className="font-semibold">Correspondance vérifiée</span>
      </div>

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800">Contactez le déposant</h1>
        <p className="mt-2 text-sm text-slate-500">
          Votre CNI a été retrouvée à <strong>{match.found.foundCity}</strong>. Vous pouvez
          maintenant contacter directement la personne qui l'a déposée.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          
            href={`tel:${match.found.phone}`}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 p-4 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            📞 Appeler
          </a>

          {whatsappDigits && (
            
              href={`https://wa.me/${whatsappDigits}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-green-600 p-4 font-semibold text-white transition-colors hover:bg-green-700"
            >
              💬 WhatsApp
            </a>
          )}
        </div>

        <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-700">
          ⚠️ Convenez toujours d'un lieu public pour la remise. CNI FIND est une plateforme
          citoyenne indépendante — restez vigilant face à toute demande d'argent.
        </div>

        
          href={`/signaler`}
          className="mt-4 block text-center text-sm text-red-600 hover:underline"
        >
          🚩 Signaler un problème avec cette annonce
        </a>
      </div>
    </div>
  );
}
