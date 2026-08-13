"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AdminLogout from "./AdminLogout";

const NAV_ITEMS = [
  { href: "/admin", label: "Tableau de bord" },
  { href: "/admin/reports", label: "Signalements" },
];

export default function AdminShell({
  adminEmail,
  children,
}: {
  adminEmail: string | null;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Overlay mobile */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-[#0b1230] px-4 py-6 text-white transition-transform duration-300 md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-8 flex items-center gap-2 px-2">
          <span className="text-lg font-bold">CNI FIND</span>
          <span className="flag-stripe w-6">
            <span className="bg-cameroon-green" />
            <span className="bg-cameroon-red" />
            <span className="bg-cameroon-yellow" />
          </span>
        </div>

        <nav className="flex-1 space-y-1">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-white/10 text-white"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 pt-4">
          {adminEmail && (
            <p className="mb-3 truncate px-2 text-xs text-slate-400">{adminEmail}</p>
          )}
          <AdminLogout />
        </div>
      </aside>

      {/* Contenu */}
      <div className="md:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-white/80 px-4 backdrop-blur-md sm:px-8">
          <button
            onClick={() => setOpen(true)}
            className="rounded-lg border p-2 text-slate-600 md:hidden"
            aria-label="Ouvrir le menu"
          >
            ☰
          </button>

          <h1 className="text-lg font-semibold text-slate-800">Administration</h1>

          <span className="hidden items-center gap-2 text-sm text-slate-500 sm:flex">
            <span className="badge-pulse" />
            Système opérationnel
          </span>
        </header>

        <main className="animate-fade-in-up px-4 py-8 sm:px-8">{children}</main>
      </div>
    </div>
  );
}
