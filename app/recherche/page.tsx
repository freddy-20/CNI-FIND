import SearchForm from "@/components/search/SearchForm";
import AnimatedBackground from "@/components/shared/AnimatedBackground";

export default function RecherchePage() {
  return (
    <div className="relative">
      <AnimatedBackground />

      <div className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
        <div className="animate-fade-in-up text-center text-white">
          <div className="mx-auto mb-6 flex w-40 justify-center gap-1">
            <span className="h-2 flex-1 rounded-full bg-cameroon-green" />
            <span className="h-2 flex-1 rounded-full bg-cameroon-red" />
            <span className="h-2 flex-1 rounded-full bg-cameroon-yellow" />
          </div>

          <h1 className="mt-2 text-3xl font-bold sm:text-5xl">Rechercher une CNI</h1>
          <p className="mx-auto mt-4 max-w-xl text-slate-300">
            Entrez votre nom pour voir si votre CNI a été retrouvée.
          </p>
        </div>

        <div className="glass-card animate-fade-in-up mt-10 p-6 sm:p-8" style={{ animationDelay: "150ms" }}>
          <SearchForm />
        </div>
      </div>
    </div>
  );
}
