import type { Metadata, Viewport } from "next";
import "./globals.css";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: "CNI FIND 🇨🇲",
  description:
    "Perdue. Retrouvée. Restituée. Plateforme citoyenne de recherche et restitution des CNI au Cameroun.",
  manifest: "/manifest.json",
  icons: {
    icon: "/icons/icon-192x192.png",
    apple: "/icons/icon-192x192.png",
    shortcut: "/icons/icon-192x192.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "CNI FIND",
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#1f2937" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        {/* PWA Meta Tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="CNI FIND" />
        
        {/* Windows Tile */}
        <meta name="msapplication-TileColor" content="#003d82" />
        <meta name="msapplication-TileImage" content="/icons/icon-256x256.png" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Theme */}
        <meta name="theme-color" content="#003d82" />
        
        {/* Security & Privacy */}
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        
        {/* Open Graph */}
        <meta property="og:title" content="CNI FIND" />
        <meta property="og:description" content="Perdue. Retrouvée. Restituée. Plateforme citoyenne de recherche et restitution des CNI au Cameroun." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:locale" content="fr_FR" />
        
        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/service-worker.js').catch(() => {
                    console.log('Service Worker registration failed');
                  });
                });
              }
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-slate-50">
        <Navbar />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}
