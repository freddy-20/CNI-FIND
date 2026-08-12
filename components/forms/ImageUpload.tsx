"use client";

import { useState } from "react";

interface ImageUploadProps {
  onUploaded: (url: string) => void;
}

export default function ImageUpload({
  onUploaded,
}: ImageUploadProps) {
  const [loading, setLoading] =
    useState(false);

  const [preview, setPreview] =
    useState("");

  async function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    setPreview(
      URL.createObjectURL(file)
    );

    setLoading(true);

    const formData = new FormData();

    formData.append("file", file);

    const response = await fetch(
      "/api/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data =
      await response.json();

    setLoading(false);

    if (data.url) {
      onUploaded(data.url);
    }
  }

  return (
    <div className="space-y-3">

      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
      />

      {loading && (
        <p>
          Upload en cours...
        </p>
      )}

      {preview && (
        <img
          src={preview}
          alt="preview"
          className="w-full max-w-xs rounded-lg border"
        />
      )}

    </div>
  );
}
