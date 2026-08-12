"use client";

import { useState } from "react";

export default function LostDocumentForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const payload = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      birthDate: formData.get("birthDate"),
      profession: formData.get("profession"),
      fatherName: formData.get("fatherName"),
      motherName: formData.get("motherName"),
      birthPlace: formData.get("birthPlace"),
      lossCity: formData.get("lossCity"),
      lossDate: formData.get("lossDate"),
      cniNumber: formData.get("cniNumber"),
      phone: formData.get("phone")
    };

    const response = await fetch(
      "/api/lost",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json"
        },
        body: JSON.stringify(payload)
      }
    );

    setLoading(false);

    if (response.ok) {
      alert(
        "Déclaration enregistrée avec succès."
      );
    } else {
      alert("Une erreur est survenue.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4"
    >
      <input
        name="lastName"
        placeholder="Nom"
        className="border rounded-lg p-3"
        required
      />

      <input
        name="firstName"
        placeholder="Prénom(s)"
        className="border rounded-lg p-3"
        required
      />

      <input
        type="date"
        name="birthDate"
        className="border rounded-lg p-3"
      />

      <input
        name="profession"
        placeholder="Profession"
        className="border rounded-lg p-3"
      />

      <input
        name="fatherName"
        placeholder="Nom du père"
        className="border rounded-lg p-3"
      />

      <input
        name="motherName"
        placeholder="Nom de la mère"
        className="border rounded-lg p-3"
      />

      <input
        name="birthPlace"
        placeholder="Lieu de naissance"
        className="border rounded-lg p-3"
      />

      <input
        name="lossCity"
        placeholder="Ville ou lieu de perte"
        className="border rounded-lg p-3"
      />

      <input
        type="date"
        name="lossDate"
        className="border rounded-lg p-3"
      />

      <input
        name="cniNumber"
        placeholder="Numéro CNI (facultatif)"
        className="border rounded-lg p-3"
      />

      <input
        name="phone"
        placeholder="+237xxxxxxxxx"
        className="border rounded-lg p-3"
        required
      />

      <button
        disabled={loading}
        className="bg-red-600 text-white p-3 rounded-lg"
      >
        {loading
          ? "Enregistrement..."
          : "Déclarer la perte"}
      </button>
    </form>
  );
}
