export default function CommentCaMarchePage() {
  return (
    <div className="max-w-6xl mx-auto py-10 px-4">

      <h1 className="text-4xl font-bold mb-10">
        Comment ça marche ?
      </h1>

      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-white border rounded-xl p-6">
          <h2 className="font-bold text-xl mb-3">
            1. Déclaration
          </h2>

          <p>
            Déclarez une CNI perdue
            ou retrouvée.
          </p>
        </div>

        <div className="bg-white border rounded-xl p-6">
          <h2 className="font-bold text-xl mb-3">
            2. Analyse
          </h2>

          <p>
            Le système recherche
            automatiquement les
            correspondances.
          </p>
        </div>

        <div className="bg-white border rounded-xl p-6">
          <h2 className="font-bold text-xl mb-3">
            3. Vérification
          </h2>

          <p>
            Vérification sécurisée
            de l'identité.
          </p>
        </div>

        <div className="bg-white border rounded-xl p-6">
          <h2 className="font-bold text-xl mb-3">
            4. Restitution
          </h2>

          <p>
            Mise en relation avec
            le déposant.
          </p>
        </div>

      </div>

    </div>
  );
}
