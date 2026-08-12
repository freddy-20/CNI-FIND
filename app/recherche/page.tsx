import SearchForm from "@/components/search/SearchForm";

export default function RecherchePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-800 sm:text-4xl">
        Rechercher une CNI
      </h1>
      <p className="mt-2 mb-8 text-slate-500">
        Entrez votre nom pour voir si votre CNI a été retrouvée.
      </p>

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <SearchForm />
      </div>
    </div>
  );
}
