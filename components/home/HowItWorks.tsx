const STEPS = [
  { title: "1. Déclarer", text: "Déclarez une CNI perdue ou retrouvée." },
  { title: "2. Recherche", text: "Le système recherche les correspondances." },
  { title: "3. Vérification", text: "Vérification sécurisée des informations." },
  { title: "4. Restitution", text: "Contact sécurisé pour récupérer la CNI." },
];

export default function HowItWorks() {
  return (
    <section className="px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="animate-fade-in-up mb-12 text-center text-3xl font-bold text-white">
          Comment ça marche ?
        </h2>

        <div className="grid gap-6 md:grid-cols-4">
          {STEPS.map((step, i) => (
            <div
              key={step.title}
              className="glass-card animate-fade-in-up p-6"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <h3 className="mb-2 text-lg font-bold text-white">{step.title}</h3>
              <p className="text-slate-300">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
