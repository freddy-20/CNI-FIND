"use client";

import { useState } from "react";

const inputClass =
  "w-full rounded-lg border border-white/15 bg-white/[0.04] p-3 text-white placeholder-slate-400 focus:border-red-400 focus:bg-white/[0.07] focus:outline-none transition-colors";

export default function LostDocumentForm() {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(
    null
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFeedback(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const payload = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      birthDate: formData.get("birthDate") || undefined,
      profession: formData.get("profession") || undefined,
      fatherName: formData.get("fatherName") || undefined,
      motherName: formData.get("motherName") || undefined,
      birthPlace: formData.get("birthPlace") || undefined,
      lossCity: formData.get("lossCity") || undefined,
      lossDate: formData.get("lossDate") || undefined,
      cniNumber: formData.get("cniNumber") || undefined,
      phone: formData.get("phone"),
    };

    try {
      const response = await fetch("/api/lost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setFeedback({
          type: "success",
          message: "Déclaration enregistrée. Vous serez averti automatiquement dès qu'une correspondance sera trouvée.",
        });
        e.currentTarget.reset();
      } else {
        setFeedback({ type: "error", message: data.error || "Une erreur est survenue." });
      }
    } catch {
      setFeedback({ type: "error", message: "Erreur réseau. Réessayez." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {feedback && (
        <div
          className={`rounded-xl border p-4 text-sm ${
            feedback.type === "success"
              ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-300"
              : "border-red-400/30 bg-red-500/10 text-red-300"
          }`}
        >
          {feedback.message}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <input name="lastName" placeholder="Nom *" required className={inputClass} />
        <input name="firstName" placeholder="Prénom(s) *" required className={inputClass} />
        <input type="date" name="birthDate" className={`${inputClass} [color-scheme:dark]`} />
        <input name="profession" placeholder="Profession" className={inputClass} />
        <input name="fatherName" placeholder="Nom du père" className={inputClass} />
        <input name="motherName" placeholder="Nom de la mère" className={inputClass} />
        <input name="birthPlace" placeholder="Lieu de naissance" className={inputClass} />
        <input name="lossCity" placeholder="Ville ou lieu de perte" className={inputClass} />
        <input type="date" name="lossDate" className={`${inputClass} [color-scheme:dark]`} />
        <input name="cniNumber" placeholder="Numéro CNI (facultatif)" className={inputClass} />
      </div>

      <input name="phone" placeholder="Votre téléphone : +237 6XX XXX XXX *" required className={inputClass} />

      <button disabled={loading} className="btn-primary w-full bg-red-600 hover:bg-red-700 hover:shadow-red-600/30">
        {loading ? "Enregistrement..." : "🔴 Déclarer la perte"}
      </button>
    </form>
  );
}
