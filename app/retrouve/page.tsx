import FoundDocumentForm from "@/components/forms/FoundDocumentForm";
import AnimatedBackground from "@/components/shared/AnimatedBackground";

export default function RetrouvePage() {
  return (
    <div className="relative">
      <AnimatedBackground />

      <div className="mx-auto max-w-4xl px-4 py-16 sm:py-20">
        <div className="animate-fade-in-up text-center text-white">
          <div className="mx-auto mb-6 flex w-40 justify-center gap-1">
            <span className="h-2 flex-1 rounded-full bg-cameroon-green" />
            <span className="h-2 flex-1 rounded-full bg-cameroon-red" />
            <span className="h-2 flex-1 rounded-full bg-cameroon-yellow" />
          </div>

          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-blue-200">
            <span className="badge-pulse" />
            Plateforme citoyenne camerounaise
          </span>

          <h1 className="mt-6 text-3xl font-bold sm:text-5xl">J'ai retrouvé une CNI</h1>
          <p className="mx-auto mt-4 max-w-xl text-slate-300">
            Déclarez la carte que vous avez trouvée en quelques minutes. Elle sera automatiquement
            comparée aux déclarations de perte pour retrouver son propriétaire.
          </p>
        </div>

        <div className="glass-card animate-fade-in-up mt-10 p-6 sm:p-10" style={{ animationDelay: "150ms" }}>
          <FoundDocumentForm />
        </div>

        <div
          className="animate-fade-in-up mt-8 grid gap-4 text-sm text-slate-300 sm:grid-cols-3"
          style={{ animationDelay: "300ms" }}
        >
          <div className="glass-card p-4">
            <p className="font-semibold text-white">🔒 Données protégées</p>
            <p className="mt-1 text-slate-300">Vos coordonnées restent privées jusqu'à vérification.</p>
          </div>
          <div className="glass-card p-4">
            <p className="font-semibold text-white">⚡ Matching automatique</p>
            <p className="mt-1 text-slate-300">Comparaison instantanée avec les déclarations de perte.</p>
          </div>
          <div className="glass-card p-4">
            <p className="font-semibold text-white">🇨🇲 100% camerounais</p>
            <p className="mt-1 text-slate-300">Plateforme indépendante, pensée pour le Cameroun.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
