"use client";

import { useState } from "react";

export default function SearchForm() {
  const [query, setQuery] =
    useState("");

  const [results, setResults] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(false);

  async function search() {
    setLoading(true);

    const response =
      await fetch(
        "/api/search",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            query,
          }),
        }
      );

    const data =
      await response.json();

    setResults(data);

    setLoading(false);
  }

  return (
    <div>

      <div className="flex gap-3 mb-6">

        <input
          value={query}
          onChange={(e) =>
            setQuery(
              e.target.value
            )
          }
          placeholder="Nom, prénom..."
          className="flex-1 border p-3 rounded-lg"
        />

        <button
          onClick={search}
          className="bg-blue-600 text-white px-5 rounded-lg"
        >
          Rechercher
        </button>

      </div>

      {loading && (
        <p>
          Recherche...
        </p>
      )}

      <div className="space-y-4">

        {results.map(
          (item) => (
            <div
              key={item.id}
              className="bg-white border rounded-xl p-5"
            >
              <div className="flex justify-between">

                <div>

                  <h3 className="font-bold">

                    {
                      item.lost
                        .lastName[0]
                    }
                    ****

                    {" "}

                    {
                      item.lost
                        .firstName[0]
                    }
                    ****

                  </h3>

                  <p className="text-gray-500">
                    {
                      item.lost
                        .lossCity
                    }
                  </p>

                </div>

                <div>

                  <span className="bg-green-100 text-green-700 px-3 py-2 rounded-full">

                    {
                      Math.round(
                        item.score
                      )
                    }
                    %

                  </span>

                </div>

              </div>

              <div className="mt-4">

                <a
                  href={`/verification/${item.id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Vérifier
                </a>

              </div>

            </div>
          )
        )}

      </div>

    </div>
  );
}
