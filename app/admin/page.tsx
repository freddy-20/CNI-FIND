import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { getSessionEmail } from "@/lib/auth";
import AdminShell from "@/components/admin/AdminShell";
import StatCard from "@/components/admin/StatCard";
import StatBarChart from "@/components/admin/StatBarChart";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const adminEmail = await getSessionEmail(cookieStore.get("admin-session")?.value);

  const [lostCount, foundCount, matchCount, returnedCount, reportCount, lostDocuments, foundDocuments] =
    await Promise.all([
      prisma.lostDocument.count(),
      prisma.foundDocument.count(),
      prisma.match.count(),
      prisma.foundDocument.count({ where: { status: "RETURNED" } }),
      prisma.report.count(),
      prisma.lostDocument.findMany({ orderBy: { createdAt: "desc" }, take: 10 }),
      prisma.foundDocument.findMany({ orderBy: { createdAt: "desc" }, take: 10 }),
    ]);

  return (
    <AdminShell adminEmail={adminEmail}>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Vue d'ensemble</h2>
        <p className="text-sm text-slate-500">Résumé basé sur les données réelles de la plateforme.</p>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-5">
        <StatCard label="CNI perdues" value={lostCount} accent="blue" />
        <StatCard label="CNI retrouvées" value={foundCount} accent="green" />
        <StatCard label="Correspondances" value={matchCount} accent="yellow" />
        <StatCard label="Restituées" value={returnedCount} accent="green" />
        <StatCard label="Signalements" value={reportCount} accent="red" />
      </div>

      <div className="mb-8 surface-card p-6">
        <h3 className="mb-5 text-lg font-semibold text-slate-800">Répartition</h3>
        <StatBarChart
          data={[
            { label: "CNI perdues", value: lostCount, color: "#1d4ed8" },
            { label: "CNI retrouvées", value: foundCount, color: "#007a33" },
            { label: "Correspondances", value: matchCount, color: "#fcd116" },
            { label: "Restituées", value: returnedCount, color: "#059669" },
            { label: "Signalements", value: reportCount, color: "#ce1126" },
          ]}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="surface-card p-6">
          <h3 className="mb-4 text-lg font-semibold text-slate-800">Dernières CNI perdues</h3>
          <div className="space-y-3">
            {lostDocuments.length === 0 && (
              <p className="text-sm text-slate-400">Aucune déclaration pour le moment.</p>
            )}
            {lostDocuments.map((item) => (
              <div key={item.id} className="rounded-xl border p-4 transition-colors hover:bg-slate-50">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800">
                    {item.lastName} {item.firstName}
                  </span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                    {item.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-500">{item.lossCity || "Ville non précisée"}</p>

                <div className="mt-3 flex gap-2">
                  <form action={`/api/admin/returned/${item.id}`} method="POST">
                    <button className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-emerald-700">
                      Restituée
                    </button>
                  </form>
                  <form action={`/api/admin/delete-lost/${item.id}`} method="POST">
                    <button className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-red-700">
                      Supprimer
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="surface-card p-6">
          <h3 className="mb-4 text-lg font-semibold text-slate-800">Dernières CNI retrouvées</h3>
          <div className="space-y-3">
            {foundDocuments.length === 0 && (
              <p className="text-sm text-slate-400">Aucune déclaration pour le moment.</p>
            )}
            {foundDocuments.map((item) => (
              <div key={item.id} className="rounded-xl border p-4 transition-colors hover:bg-slate-50">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800">
                    {item.lastName} {item.firstName}
                  </span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                    {item.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-500">{item.foundCity || "Ville non précisée"}</p>

                <div className="mt-3 flex gap-2">
                  <form action={`/api/admin/returned-found/${item.id}`} method="POST">
                    <button className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-emerald-700">
                      Restituée
                    </button>
                  </form>
                  <form action={`/api/admin/delete-found/${item.id}`} method="POST">
                    <button className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-red-700">
                      Supprimer
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
