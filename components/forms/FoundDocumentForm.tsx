"use client";

import { useState } from "react";
import ImageUpload from "./ImageUpload";

const inputClass =
  "w-full rounded-lg border border-white/15 bg-white/[0.04] p-3 text-white placeholder-slate-400 focus:border-blue-400 focus:bg-white/[0.07] focus:outline-none transition-colors";

export default function FoundDocumentForm() {
  const [photoUrl, setPhotoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(
    null
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFeedback(null);

    if (!photoUrl) {
      setFeedback({ type: "error", message: "Veuillez ajouter une photo de la CNI avant de continuer." });
      return;
    }

    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const payload = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      cniNumber: formData.get("cniNumber") || undefined,
      birthDate: formData.get("birthDate") || undefined,
      birthPlace: formData.get("birthPlace") || undefined,
      fatherName: formData.get("fatherName") || undefined,
      motherName: formData.get("motherName") || undefined,
      profession: formData.get("profession") || undefined,
      foundCity: formData.get("foundCity"),
      foundDate: formData.get("foundDate"),
      description: formData.get("description") || undefined,
      depositorName: formData.get("depositorName"),
      phone: formData.get("phone"),
      whatsapp: formData.get("whatsapp") || undefined,
      email: formData.get("email") || undefined,
      photoUrl,
    };

    try {
      const response = await fetch("/api/found", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setFeedback({
          type: "success",
          message: "Merci ! La CNI a été enregistrée. Elle sera automatiquement comparée aux déclarations de perte.",
        });
        e.currentTarget.reset();
        setPhotoUrl("");
      } else {
        setFeedback({ type: "error", message: data.error || "Erreur lors de l'enregistrement." });
      }
    } catch {
      setFeedback({ type: "error", message: "Erreur réseau. Réessayez." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
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

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-blue-300">
          1. Identité sur la carte
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <input name="lastName" placeholder="Nom *" required className={inputClass} />
          <input name="firstName" placeholder="Prénom(s) *" required className={inputClass} />
          <input name="cniNumber" placeholder="Numéro CNI (si visible)" className={inputClass} />
          <input type="date" name="birthDate" className={`${inputClass} [color-scheme:dark]`} />
          <input name="birthPlace" placeholder="Lieu de naissance" className={inputClass} />
          <input name="profession" placeholder="Profession" className={inputClass} />
          <input name="fatherName" placeholder="Nom du père" className={inputClass} />
          <input name="motherName" placeholder="Nom de la mère" className={inputClass} />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-blue-300">
          2. Où et quand l'avez-vous trouvée ?
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <input name="foundCity" placeholder="Ville / Quartier *" required className={inputClass} />
          <input type="date" name="foundDate" required className={`${inputClass} [color-scheme:dark]`} />
        </div>

        <textarea
          name="description"
          placeholder="Description facultative (circonstances, lieu précis...)"
          rows={3}
          className={inputClass}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-blue-300">
          3. Photo de la CNI *
        </h2>
        <ImageUpload onUploaded={setPhotoUrl} />
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-blue-300">
          4. Vos coordonnées
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <input name="depositorName" placeholder="Votre nom *" required className={inputClass} />
          <input
            name="phone"
            placeholder="+237 6XX XXX XXX *"
            required
            pattern="^(\+237)?[26][0-9]{8}$"
            className={inputClass}
          />
          <input name="whatsapp" placeholder="Numéro WhatsApp (si différent)" className={inputClass} />
          <input type="email" name="email" placeholder="Email (facultatif)" className={inputClass} />
        </div>

        <p className="text-xs text-slate-400">
          🔒 Vos coordonnées ne seront jamais affichées publiquement. Elles ne sont révélées
          qu'après vérification d'identité du propriétaire.
        </p>
      </section>

      <button disabled={loading} className="btn-primary w-full bg-emerald-600 hover:bg-emerald-700 hover:shadow-emerald-600/30">
        {loading ? "Enregistrement en cours..." : "✅ Déclarer la CNI retrouvée"}
      </button>
    </form>
  );
}
