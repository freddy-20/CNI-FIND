import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-bold text-xl text-blue-700"
        >
          CNI FIND 🇨🇲
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/perdu">Perdu</Link>
          <Link href="/retrouve">Retrouvé</Link>
          <Link href="/recherche">Recherche</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
