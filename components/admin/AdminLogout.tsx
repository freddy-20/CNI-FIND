"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogout() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);

    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      // router.replace (pas push) : l'étape dashboard sort de l'historique
      router.replace("/admin/login");
      router.refresh();
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600/90 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-red-600 disabled:opacity-60"
    >
      {loading ? "Déconnexion..." : "Déconnexion"}
    </button>
  );
}
