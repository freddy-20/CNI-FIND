import SearchForm from "@/components/search/SearchForm";

export default function RecherchePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">

      <h1 className="text-4xl font-bold mb-3">
        Rechercher une CNI
      </h1>

      <p className="text-gray-500 mb-8">
        Recherchez une correspondance.
      </p>

      <div className="bg-white border rounded-xl p-6">

        <SearchForm />

      </div>

    </div>
  );
}
