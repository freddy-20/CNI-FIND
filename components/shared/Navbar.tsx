"use client";

import { useState } from "react";
import Link from "next/link";

const LINKS = [
  { href: "/perdu", label: "Perdu" },
  { href: "/retrouve", label: "Retrouvé" },
  { href: "/recherche", label: "Recherche" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-blue-700">
          CNI FIND
          <span className="flex h-4 w-6 overflow-hidden rounded-sm">
            <span className="flex-1 bg-cameroon-green" />
            <span className="flex-1 bg-cameroon-red" />
            <span className="flex-1 bg-cameroon-yellow" />
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-700">
              {link.label}
            </Link>
          ))}
          <Link
            href="/admin"
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700"
          >
            Admin
          </Link>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg border p-2 text-slate-600 md:hidden"
          aria-label="Menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <nav className="border-t bg-white px-4 py-3 md:hidden">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/admin"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-lg bg-slate-900 px-3 py-2.5 text-center text-sm font-medium text-white"
          >
            Admin
          </Link>
        </nav>
      )}
    </header>
  );
}
