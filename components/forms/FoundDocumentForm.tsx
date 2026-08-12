"use client";

import { useState } from "react";
import ImageUpload from "./ImageUpload";

export default function FoundDocumentForm() {
  const [photoUrl, setPhotoUrl] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!photoUrl) {
      alert(
        "Veuillez ajouter la photo de la CNI"
      );
      return;
    }

    setLoading(true);

    const formData =
      new FormData(e.currentTarget);

    const payload = {
      firstName:
        formData.get("firstName"),

      lastName:
        formData.get("lastName"),

      cniNumber:
        formData.get("cniNumber"),

      birthDate:
        formData.get("birthDate"),

      birthPlace:
        formData.get("birthPlace"),

      fatherName:
        formData.get("fatherName"),

      motherName:
        formData.get("motherName"),

      profession:
        formData.get("profession"),

      foundCity:
        formData.get("foundCity"),

      foundDate:
        formData.get("foundDate"),

      description:
        formData.get("description"),

      depositorName:
        formData.get("depositorName"),

      phone:
        formData.get("phone"),

      whatsapp:
        formData.get("whatsapp"),

      email:
        formData.get("email"),

      photoUrl,
    };

    const response =
      await fetch(
        "/api/found",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(
            payload
          ),
        }
      );

    setLoading(false);

    if (response.ok) {
      alert(
        "CNI enregistrée avec succès"
      );

      window.location.href =
        "/recherche";
    } else {
      alert(
        "Erreur lors de l'enregistrement"
      );
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
        required
        className="border p-3 rounded-lg"
      />

      <input
        name="firstName"
        placeholder="Prénom(s)"
        required
        className="border p-3 rounded-lg"
      />

      <input
        name="cniNumber"
        placeholder="Numéro CNI"
        className="border p-3 rounded-lg"
      />

      <input
        type="date"
        name="birthDate"
        className="border p-3 rounded-lg"
      />

      <input
        name="birthPlace"
        placeholder="Lieu de naissance"
        className="border p-3 rounded-lg"
      />

      <input
        name="fatherName"
        placeholder="Nom du père"
        className="border p-3 rounded-lg"
      />

      <input
        name="motherName"
        placeholder="Nom de la mère"
        className="border p-3 rounded-lg"
      />

      <input
        name="profession"
        placeholder="Profession"
        className="border p-3 rounded-lg"
      />

      <input
        name="foundCity"
        placeholder="Ville / Quartier"
        required
        className="border p-3 rounded-lg"
      />

      <input
        type="date"
        name="foundDate"
        required
        className="border p-3 rounded-lg"
      />

      <textarea
        name="description"
        placeholder="Description"
        className="border p-3 rounded-lg"
      />

      <input
        name="depositorName"
        placeholder="Nom du déposant"
        required
        className="border p-3 rounded-lg"
      />

      <input
        name="phone"
        placeholder="+237..."
        required
        className="border p-3 rounded-lg"
      />

      <input
        name="whatsapp"
        placeholder="WhatsApp"
        className="border p-3 rounded-lg"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        className="border p-3 rounded-lg"
      />

      <div className="border rounded-xl p-4">
        <p className="font-semibold mb-3">
          Photo de la CNI
        </p>

        <ImageUpload
          onUploaded={
            setPhotoUrl
          }
        />
      </div>

      <button
        disabled={loading}
        className="bg-green-600 text-white p-4 rounded-xl"
      >
        {loading
          ? "Enregistrement..."
          : "Déclarer la CNI retrouvée"}
      </button>
    </form>
  );
}
