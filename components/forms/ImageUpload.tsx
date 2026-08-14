"use client";

import { useRef, useState } from "react";

interface ImageUploadProps {
  onUploaded: (url: string) => void;
}

export default function ImageUpload({ onUploaded }: ImageUploadProps) {
  const [preview, setPreview] = useState("");
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function uploadFile(file: File) {
    setError("");

    if (!file.type.startsWith("image/")) {
      setError("Seules les images sont autorisées");
      setStatus("error");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image trop volumineuse (max 5 Mo)");
      setStatus("error");
      return;
    }

    setPreview(URL.createObjectURL(file));
    setStatus("uploading");
    setProgress(0);

    const formData = new FormData();
    formData.append("file", file);

    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener("progress", (e) => {
      if (e.lengthComputable) {
        setProgress(Math.round((e.loaded / e.total) * 100));
      }
    });

    xhr.addEventListener("load", () => {
      try {
        const data = JSON.parse(xhr.responseText);

        if (xhr.status === 200 && data.url) {
          setStatus("success");
          onUploaded(data.url);
        } else {
          setStatus("error");
          setError(data.error || "Erreur lors de l'upload");
        }
      } catch {
        setStatus("error");
        setError("Erreur lors de l'upload");
      }
    });

    xhr.addEventListener("error", () => {
      setStatus("error");
      setError("Erreur réseau lors de l'upload");
    });

    xhr.open("POST", "/api/upload");
    xhr.send(formData);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  }

  function reset() {
    setPreview("");
    setStatus("idle");
    setProgress(0);
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="space-y-3">
      {!preview && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-8 text-center cursor-pointer transition-colors ${
            dragActive
              ? "border-blue-400 bg-blue-500/10"
              : "border-white/20 bg-white/[0.03] hover:bg-white/[0.06]"
          }`}
        >
          <span className="text-3xl">📷</span>
          <p className="text-sm font-medium text-slate-200">
            Touchez pour prendre / choisir une photo
          </p>
          <p className="text-xs text-slate-400">JPG, PNG, WEBP — max 5 Mo</p>

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleChange}
            className="hidden"
          />
        </div>
      )}

      {preview && (
        <div className="relative overflow-hidden rounded-xl border border-white/10">
          <img src={preview} alt="Aperçu de la CNI" className="w-full max-h-72 object-cover" />

          {status === "uploading" && (
            <div className="absolute inset-x-0 bottom-0 bg-black/60 p-2">
              <div className="h-2 w-full rounded-full bg-white/20">
                <div
                  className="h-2 rounded-full bg-blue-500 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-1 text-center text-xs text-white">{progress}%</p>
            </div>
          )}

          {status === "success" && (
            <div className="absolute top-2 right-2 rounded-full bg-emerald-600 px-3 py-1 text-xs font-medium text-white">
              ✓ Envoyée
            </div>
          )}

          <button
            type="button"
            onClick={reset}
            className="absolute top-2 left-2 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white shadow"
          >
            ✕ Retirer
          </button>
        </div>
      )}

      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}
