"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function VerificationForm({ matchId }: { matchId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const payload = {
      fatherName: formData.get("fatherName"),
      motherName: formData.get("motherName"),
      birthPlace: formData.get("birthPlace"),
    };

    try {
      const response = await fetch(`/api/verify/${matchId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        router.push(data.redirect);
      } else {
        setError(data.error || "Vérification échouée.");
      }
    } catch {
      setError("Erreur réseau. Réessayez.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-600">Nom du père</label>
        <input
          name="fatherName"
          className="w-full rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-600">Nom de la mère</label>
        <input
          name="motherName"
          className="w-full rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-600">Lieu de naissance</label>
        <input
          name="birthPlace"
          className="w-full rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
        />
      </div>

      <button
        disabled={loading}
        className="rounded-lg bg-blue-600 p-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-60"
      >
        {loading ? "Vérification..." : "Vérifier mon identité"}
      </button>

      <p className="text-center text-xs text-slate-400">
        Répondez à au moins 2 des 3 questions correctement pour continuer.
      </p>
    </form>
  );
}
