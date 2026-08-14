import Link from "next/link";

export default function Hero() {
  return (
    <section className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <div className="animate-fade-in-up mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-blue-200">
          <span className="text-base leading-none">🇨🇲</span>
          Plateforme citoyenne camerounaise
        </div>

        <h1 className="animate-fade-in-up text-5xl font-extrabold text-white" style={{ animationDelay: "80ms" }}>
          CNI FIND
        </h1>

        <p className="animate-fade-in-up mt-4 text-xl text-slate-300" style={{ animationDelay: "150ms" }}>
          Perdue. Retrouvée. Restituée.
        </p>

        <p className="animate-fade-in-up mx-auto mt-6 max-w-2xl text-slate-400" style={{ animationDelay: "220ms" }}>
          Déclarez une CNI perdue ou retrouvée et facilitez sa restitution à son propriétaire.
        </p>

        <div className="animate-fade-in-up mt-10 flex flex-col justify-center gap-4 sm:flex-row" style={{ animationDelay: "300ms" }}>
          <Link href="/perdu" className="group inline-flex items-center justify-center gap-3 rounded-xl bg-red-600 px-8 py-4 font-semibold text-white transition-all duration-200 hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/30 active:scale-[0.98]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
            </span>
            J'ai perdu une CNI
          </Link>

          <Link href="/retrouve" className="group inline-flex items-center justify-center gap-3 rounded-xl bg-emerald-600 px-8 py-4 font-semibold text-white transition-all duration-200 hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/30 active:scale-[0.98]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
            </span>
            J'ai retrouvé une CNI
          </Link>
        </div>

        <div className="animate-fade-in-up mx-auto mt-12 flex w-32 justify-center gap-1.5" style={{ animationDelay: "380ms" }}>
          <span className="h-3 flex-1 rounded-full bg-cameroon-green" />
          <span className="h-3 flex-1 rounded-full bg-cameroon-red" />
          <span className="h-3 flex-1 rounded-full bg-cameroon-yellow" />
        </div>
      </div>
    </section>
  );
}
