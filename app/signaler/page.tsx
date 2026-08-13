"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SignalerPage() {
  const searchParams = useSearchParams();
  const targetType = searchParams.get("type"); // "found" | "lost"
  const targetId = searchParams.get("id");

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFeedback(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const payload = {
      reason: formData.get("reason"),
      description: formData.get("description") || undefined,
      phone: formData.get("phone") || undefined,
      targetType: targetType ? targetType.toUpperCase() : undefined,
      targetId: targetId || undefined,
    };

    try {
      const response = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setFeedback({ type: "success", message: "Merci, votre signalement a été transmis à l'équipe." });
        e.currentTarget.reset();
      } else {
        setFeedback({ type: "error", message: "Erreur lors de l'envoi. Réessayez." });
      }
    } catch {
      setFeedback({ type: "error", message: "Erreur réseau. Réessayez." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-800">Signaler un problème</h1>
      <p className="mt-2 text-slate-500">Aidez-nous à garder la plateforme fiable et sécurisée.</p>

      {targetId && (
        <p className="mt-2 text-xs text-slate-400">Signalement lié à l'annonce #{targetId.slice(-6)}</p>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-2xl border bg-white p-6 shadow-sm">
        {feedback && (
          <div
            className={`rounded-lg border p-3 text-sm ${
              feedback.type === "success"
                ? "border-green-200 bg-green-50 text-green-700"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            {feedback.message}
          </div>
        )}

        <select name="reason" required className="w-full rounded-lg border border-slate-300 p-3">
          <option value="">Choisissez un motif *</option>
          <option>Fausse information</option>
          <option>CNI déjà récupérée</option>
          <option>Tentative d'arnaque</option>
          <option>Mauvais numéro</option>
          <option>Contenu suspect</option>
          <option>Autre</option>
        </select>

        <textarea
          name="description"
          placeholder="Décrivez le problème"
          rows={4}
          className="w-full rounded-lg border border-slate-300 p-3"
        />

        <input
          type="text"
          name="phone"
          placeholder="Votre téléphone (facultatif, pour vous recontacter)"
          className="w-full rounded-lg border border-slate-300 p-3"
        />

        <button
          disabled={loading}
          className="w-full rounded-xl bg-red-600 p-4 font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-60"
        >
          {loading ? "Envoi..." : "🚩 Envoyer le signalement"}
        </button>
      </form>
    </div>
  );
}
