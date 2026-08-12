export default function HowItWorks() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">

        <h2 className="text-3xl font-bold text-center mb-12">
          Comment ça marche ?
        </h2>

        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-slate-50 p-6 rounded-xl">
            <h3 className="font-bold text-lg mb-2">
              1. Déclarer
            </h3>

            <p className="text-gray-600">
              Déclarez une CNI perdue ou retrouvée.
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-xl">
            <h3 className="font-bold text-lg mb-2">
              2. Recherche
            </h3>

            <p className="text-gray-600">
              Le système recherche les correspondances.
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-xl">
            <h3 className="font-bold text-lg mb-2">
              3. Vérification
            </h3>

            <p className="text-gray-600">
              Vérification sécurisée des informations.
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-xl">
            <h3 className="font-bold text-lg mb-2">
              4. Restitution
            </h3>

            <p className="text-gray-600">
              Contact sécurisé pour récupérer la CNI.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
