"use client";

import { useState } from "react";
import { hideName } from "@/utils/security";

export default function SearchForm() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  async function search() {
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      setResults(data);
    } finally {
      setLoading(false);
    }
  }

  function scoreColor(score: number) {
    if (score >= 80) return "border-emerald-400/30 bg-emerald-500/10 text-emerald-300";
    if (score >= 60) return "border-amber-400/30 bg-amber-500/10 text-amber-300";
    return "border-white/15 bg-white/5 text-slate-300";
  }

  return (
    <div>
      <div className="mb-6 flex gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && search()}
          placeholder="Nom ou prénom..."
          className="flex-1 rounded-lg border border-white/15 bg-white/[0.04] p-3 text-white placeholder-slate-400 focus:border-blue-400 focus:outline-none"
        />
        <button
          onClick={search}
          disabled={loading}
          className="btn-primary px-6 disabled:opacity-60"
        >
          Rechercher
        </button>
      </div>

      {loading && (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="animate-pulse rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <div className="h-4 w-1/3 rounded bg-white/10" />
              <div className="mt-3 h-3 w-1/4 rounded bg-white/5" />
            </div>
          ))}
        </div>
      )}

      {!loading && searched && results.length === 0 && (
        <div className="rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-8 text-center">
          <p className="font-medium text-slate-200">Aucune correspondance trouvée</p>
          <p className="mt-1 text-sm text-slate-400">
            Essayez avec seulement le nom, ou revenez plus tard.
          </p>
        </div>
      )}

      {!loading && results.length > 0 && (
        <div className="space-y-4">
          {results.map((item) => (
            <div
              key={item.id}
              className="glass-card p-5 transition-shadow hover:shadow-2xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {hideName(item.lost.lastName)} {hideName(item.lost.firstName)}
                  </h3>
                  <p className="mt-1 text-sm text-slate-400">
                    Perdue à {item.lost.lossCity || "lieu non précisé"}
                  </p>
                </div>

                <span className={`shrink-0 rounded-full border px-3 py-1 text-sm font-semibold ${scoreColor(item.score)}`}>
                  {Math.round(item.score)}%
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                <p className="text-xs text-slate-400">🔒 Identité masquée jusqu'à vérification</p>
                
                  href={`/verification/${item.id}`}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                  Vérifier mon identité
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
