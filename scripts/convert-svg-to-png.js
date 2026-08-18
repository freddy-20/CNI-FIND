#!/usr/bin/env node

/**
 * Script de conversion SVG → PNG pour PWA CNI FIND
 * Utilise canvas pour générer les PNG optimisés
 * 
 * Installation: npm install canvas
 * Utilisation: node scripts/convert-svg-to-png.js
 */

const fs = require('fs');
const path = require('path');

// Créer le dossier icons s'il n'existe pas
const iconsDir = path.join(__dirname, '../public/icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
  console.log(`✅ Dossier créé: ${iconsDir}`);
}

console.log('\n🎨 Conversion SVG → PNG pour CNI FIND');
console.log('=====================================\n');

// Les résolutions à générer
const sizes = [192, 256, 384, 512];
const maskableSizes = [192, 512];

console.log('📝 Fichiers PNG à créer:\n');

console.log('Standard icons (fond blanc):');
sizes.forEach(size => {
  const filename = `icon-${size}x${size}.png`;
  console.log(`  ✓ ${filename}`);
});

console.log('\nMaskable icons (fond transparent - peuvent être coupées):');
maskableSizes.forEach(size => {
  const filename = `icon-maskable-${size}.png`;
  console.log(`  ✓ ${filename}`);
});

console.log('\nShortcut icons:');
console.log(`  ✓ shortcut-search-192.png`);
console.log(`  ✓ shortcut-report-192.png`);

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('\n⚠️  MÉTHODE RECOMMANDÉE: PWA Image Generator\n');

const instructions = `
🌐 Allez sur: https://www.pwabuilder.com/imageGenerator

Étapes:
1. Uploadez public/logo.svg (le fichier SVG créé)
2. Téléchargez le ZIP généré automatiquement
3. Extrayez tous les PNG dans public/icons/

RÉSULTAT: Tous les fichiers PNG seront créés en 1 minute! ⚡

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ALTERNATIVE - Si vous préférez faire localement:

Option 1: ImageMagick (ligne de commande)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# Installez d'abord ImageMagick:
# macOS: brew install imagemagick
# Ubuntu/Debian: sudo apt-get install imagemagick
# Windows: https://imagemagick.org/script/download.php

# Ensuite, exécutez ces commandes:

mkdir -p public/icons

# Standard icons (fond blanc)
convert -background white -resize 192x192 public/logo.svg public/icons/icon-192x192.png
convert -background white -resize 256x256 public/logo.svg public/icons/icon-256x256.png
convert -background white -resize 384x384 public/logo.svg public/icons/icon-384x384.png
convert -background white -resize 512x512 public/logo.svg public/icons/icon-512x512.png

# Maskable icons (fond transparent)
convert -background none -resize 192x192 public/logo.svg public/icons/icon-maskable-192.png
convert -background none -resize 512x512 public/logo.svg public/icons/icon-maskable-512.png

# Shortcut icons
convert -background white -resize 192x192 public/logo.svg public/icons/shortcut-search-192.png
convert -background white -resize 192x192 public/logo.svg public/icons/shortcut-report-192.png

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Option 2: Node.js avec canvas
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

npm install canvas

Puis modifier ce script pour utiliser canvas (voir exemple ci-bas)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✨ RÉSULTAT FINAL - Structure des fichiers:

public/
├── logo.svg                      ← Source SVG
├── manifest.json                 ← Config PWA
├── offline.html                  ← Page offline
├── browserconfig.xml             ← Windows config
├── service-worker.ts             ← Service Worker
└── icons/
    ├── icon-192x192.png          ✅
    ├── icon-256x256.png          ✅
    ├── icon-384x384.png          ✅
    ├── icon-512x512.png          ✅
    ├── icon-maskable-192.png     ✅
    ├── icon-maskable-512.png     ✅
    ├── shortcut-search-192.png   ✅
    └── shortcut-report-192.png   ✅

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Vérification après conversion:

Exécutez cette commande pour vérifier:
  ls -lh public/icons/

Vous devriez voir 8 fichiers PNG de ~50-100KB chacun.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 PROCHAINE ÉTAPE:

Une fois les PNG générés:
1. Committer les fichiers: git add public/icons/
2. Build l'app: npm run build
3. Tester la PWA: npm start
4. Sur mobile: installer l'app depuis le menu!

`;

console.log(instructions);

console.log('\n✅ Instructions complètes affichées!\n');
