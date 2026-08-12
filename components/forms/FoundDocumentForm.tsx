"use client";

import { useState } from "react";
import ImageUpload from "./ImageUpload";

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
              ? "border-green-200 bg-green-50 text-green-700"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {feedback.message}
        </div>
      )}

      {/* Section 1 : Identité sur la CNI */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-blue-700">
          1. Identité sur la carte
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <input
            name="lastName"
            placeholder="Nom *"
            required
            className="rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
          />
          <input
            name="firstName"
            placeholder="Prénom(s) *"
            required
            className="rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
          />
          <input
            name="cniNumber"
            placeholder="Numéro CNI (si visible)"
            className="rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
          />
          <input
            type="date"
            name="birthDate"
            placeholder="Date de naissance"
            className="rounded-lg border border-slate-300 p-3 text-slate-500 focus:border-blue-500 focus:outline-none"
          />
          <input
            name="birthPlace"
            placeholder="Lieu de naissance"
            className="rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
          />
          <input
            name="profession"
            placeholder="Profession"
            className="rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
          />
          <input
            name="fatherName"
            placeholder="Nom du père"
            className="rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
          />
          <input
            name="motherName"
            placeholder="Nom de la mère"
            className="rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
          />
        </div>
      </section>

      {/* Section 2 : Découverte */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-blue-700">
          2. Où et quand l'avez-vous trouvée ?
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <input
            name="foundCity"
            placeholder="Ville / Quartier *"
            required
            className="rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
          />
          <input
            type="date"
            name="foundDate"
            required
            className="rounded-lg border border-slate-300 p-3 text-slate-500 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <textarea
          name="description"
          placeholder="Description facultative (circonstances, lieu précis...)"
          rows={3}
          className="w-full rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
        />
      </section>

      {/* Section 3 : Photo */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-blue-700">
          3. Photo de la CNI *
        </h2>
        <ImageUpload onUploaded={setPhotoUrl} />
      </section>

      {/* Section 4 : Coordonnées du déposant */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-blue-700">
          4. Vos coordonnées
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <input
            name="depositorName"
            placeholder="Votre nom *"
            required
            className="rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
          />
          <input
            name="phone"
            placeholder="+237 6XX XXX XXX *"
            required
            pattern="^(\+237)?[26][0-9]{8}$"
            className="rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
          />
          <input
            name="whatsapp"
            placeholder="Numéro WhatsApp (si différent)"
            className="rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Email (facultatif)"
            className="rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <p className="text-xs text-slate-400">
          🔒 Vos coordonnées ne seront jamais affichées publiquement. Elles ne sont révélées
          qu'après vérification d'identité du propriétaire.
        </p>
      </section>

      <button
        disabled={loading}
        className="w-full rounded-xl bg-green-600 p-4 font-semibold text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Enregistrement en cours..." : "✅ Déclarer la CNI retrouvée"}
      </button>
    </form>
  );
}
