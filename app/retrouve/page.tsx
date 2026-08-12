import FoundDocumentForm from "@/components/forms/FoundDocumentForm";

export default function RetrouvePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">

      <h1 className="text-3xl font-bold mb-3">
        J'ai retrouvé une CNI
      </h1>

      <p className="text-gray-500 mb-8">
        Déclarez une carte retrouvée.
      </p>

      <div className="bg-white border rounded-xl p-6">
        <FoundDocumentForm />
      </div>

    </div>
  );
}
