"use client";

export default function FoundDocumentForm() {
  return (
    <form className="grid gap-4">
      <input
        name="lastName"
        placeholder="Nom"
        className="border rounded-lg p-3"
      />

      <input
        name="firstName"
        placeholder="Prénom(s)"
        className="border rounded-lg p-3"
      />

      <input
        type="file"
        accept="image/*"
        className="border rounded-lg p-3"
      />

      <button
        className="bg-green-600 text-white p-3 rounded-lg"
      >
        Déclarer la découverte
      </button>
    </form>
  );
}
