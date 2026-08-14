"use client";

import { useState } from "react";

export default function ReportActions({
  targetType,
  offenderPhone,
}: {
  targetType?: string | null;
  offenderPhone?: string | null;
}) {
  const [loading, setLoading] = useState(false);
  const [blocked, setBlocked] = useState(false);

  if (!offenderPhone) return null;

  async function blockNumber() {
    if (!confirm(`Bloquer le numéro ${offenderPhone} ?`)) return;
    setLoading(true);

    try {
      const response = await fetch("/api/admin/block-number", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: offenderPhone, reason: `Signalement (${targetType})` }),
      });

      if (response.ok) setBlocked(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={blockNumber}
      disabled={loading || blocked}
      className="mt-3 rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-60"
    >
      {blocked ? "✓ Numéro bloqué" : loading ? "Blocage..." : "🚫 Bloquer le numéro de l'annonce"}
    </button>
  );
}
