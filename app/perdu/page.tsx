import LostDocumentForm from "@/components/forms/LostDocumentForm";

export default function PerduPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">

      <h1 className="text-3xl font-bold mb-2">
        Déclarer une CNI perdue
      </h1>

      <p className="text-gray-500 mb-8">
        Remplissez le formulaire.
      </p>

      <div className="bg-white border rounded-xl p-6">
        <LostDocumentForm />
      </div>

    </div>
  );
}
