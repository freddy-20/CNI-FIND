"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const inputClass =
  "w-full rounded-lg border border-white/15 bg-white/[0.04] p-3 text-white placeholder-slate-400 focus:border-blue-400 focus:outline-none transition-colors";

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
        <div className="rounded-lg border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-300">Nom du père</label>
        <input name="fatherName" className={inputClass} />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-300">Nom de la mère</label>
        <input name="motherName" className={inputClass} />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-300">Lieu de naissance</label>
        <input name="birthPlace" className={inputClass} />
      </div>

      <button disabled={loading} className="btn-primary">
        {loading ? "Vérification..." : "Vérifier mon identité"}
      </button>

      <p className="text-center text-xs text-slate-400">
        Répondez à au moins 2 des 3 questions correctement pour continuer.
      </p>
    </form>
  );
}
