import Link from "next/link";

export default function Hero() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4 text-center">

        <h1 className="text-5xl font-extrabold text-blue-700">
          CNI FIND 🇨🇲
        </h1>

        <p className="text-xl mt-4 text-gray-600">
          Perdue. Retrouvée. Restituée.
        </p>

        <p className="max-w-2xl mx-auto mt-6 text-gray-500">
          Déclarez une CNI perdue ou retrouvée
          et facilitez sa restitution à son propriétaire.
        </p>

        <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center">

          <Link
            href="/perdu"
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold"
          >
            🔴 J'ai perdu une CNI
          </Link>

          <Link
            href="/retrouve"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold"
          >
            🟢 J'ai retrouvé une CNI
          </Link>

        </div>
      </div>
    </section>
  );
}
