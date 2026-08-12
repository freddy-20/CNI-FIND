export default function SignalerPage() {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4">

      <h1 className="text-3xl font-bold mb-6">
        Signaler un problème
      </h1>

      <form
        action="/api/report"
        method="POST"
        className="space-y-4"
      >
        <select
          name="reason"
          className="w-full border p-3 rounded-lg"
        >
          <option>
            Fausse information
          </option>

          <option>
            CNI déjà récupérée
          </option>

          <option>
            Tentative d'arnaque
          </option>

          <option>
            Mauvais numéro
          </option>

          <option>
            Contenu suspect
          </option>

          <option>
            Autre
          </option>
        </select>

        <textarea
          name="description"
          placeholder="Description"
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="text"
          name="phone"
          placeholder="Téléphone"
          className="w-full border p-3 rounded-lg"
        />

        <button className="bg-red-600 text-white px-6 py-3 rounded-lg">
          Envoyer le signalement
        </button>
      </form>

    </div>
  );
}
