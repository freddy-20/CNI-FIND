import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { getSessionEmail } from "@/lib/auth";
import AdminShell from "@/components/admin/AdminShell";
import ReportActions from "@/components/admin/ReportActions";

export const dynamic = "force-dynamic";

export default async function ReportsPage() {
  const cookieStore = await cookies();
  const adminEmail = await getSessionEmail(cookieStore.get("admin-session")?.value);

  const reports = await prisma.report.findMany({ orderBy: { createdAt: "desc" } });

  const enriched = await Promise.all(
    reports.map(async (report) => {
      let offenderPhone: string | null = null;

      if (report.targetType === "FOUND" && report.targetId) {
        const doc = await prisma.foundDocument.findUnique({
          where: { id: report.targetId },
          select: { phone: true },
        });
        offenderPhone = doc?.phone || null;
      }

      if (report.targetType === "LOST" && report.targetId) {
        const doc = await prisma.lostDocument.findUnique({
          where: { id: report.targetId },
          select: { phone: true },
        });
        offenderPhone = doc?.phone || null;
      }

      return { ...report, offenderPhone };
    })
  );

  return (
    <AdminShell adminEmail={adminEmail}>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Signalements</h2>
        <p className="text-sm text-slate-500">{enriched.length} signalement(s) au total.</p>
      </div>

      {enriched.length === 0 && (
        <div className="surface-card p-8 text-center text-slate-400">
          Aucun signalement pour le moment.
        </div>
      )}

      <div className="space-y-4">
        {enriched.map((report) => (
          <div key={report.id} className="surface-card p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-800">{report.reason}</h3>
              <span className="text-xs text-slate-400">
                {new Date(report.createdAt).toLocaleDateString("fr-FR")}
              </span>
            </div>

            {report.targetId && (
              <p className="mt-1 text-xs font-medium text-blue-600">
                Annonce liée : {report.targetType} #{report.targetId.slice(-6)}
              </p>
            )}

            {report.description && <p className="mt-2 text-sm text-slate-600">{report.description}</p>}
            {report.phone && (
              <p className="mt-2 text-xs text-slate-400">Contact du plaignant : {report.phone}</p>
            )}

            <ReportActions targetType={report.targetType} offenderPhone={report.offenderPhone} />
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
