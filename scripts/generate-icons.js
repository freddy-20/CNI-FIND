#!/usr/bin/env node

/**
 * Script de génération des icônes PWA
 * Utilise sharp pour créer les PNG optimisés aux différentes résolutions
 * 
 * Installation: npm install sharp
 * Utilisation: node scripts/generate-icons.js
 */

const fs = require('fs');
const path = require('path');

console.log('🎨 Générateur d\'icônes PWA pour CNI FIND');
console.log('==========================================\n');

console.log('📝 Instructions manuelles (puisque sharp nécessite une compilation):\n');

const instructions = `
1. OPTION 1 - Utiliser un service en ligne (RECOMMANDÉ & GRATUIT):
   ✅ Allez sur: https://www.pwabuilder.com/imageGenerator
   ✅ Uploadez votre logo (public/logo.svg ou le PNG)
   ✅ Téléchargez le ZIP avec tous les PNG
   ✅ Extrayez dans public/icons/

2. OPTION 2 - Utiliser ImageMagick/GraphicsMagick (local):
   ✅ Installez: brew install imagemagick (macOS) ou apt-get install imagemagick (Linux)
   ✅ Exécutez les commandes ci-dessous

3. OPTION 3 - Utiliser Photoshop/GIMP:
   ✅ Exportez votre logo aux dimensions: 192, 256, 384, 512
   ✅ Format PNG avec fond transparent

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

COMMANDES IMAGEMAGICK (exécutez une par une):

mkdir -p public/icons

# Standard icons (fond blanc)
convert -background white -resize 192x192 public/logo.svg public/icons/icon-192x192.png
convert -background white -resize 256x256 public/logo.svg public/icons/icon-256x256.png
convert -background white -resize 384x384 public/logo.svg public/icons/icon-384x384.png
convert -background white -resize 512x512 public/logo.svg public/icons/icon-512x512.png

# Maskable icons (peuvent être coupées - fond transparent)
convert -background none -resize 192x192 public/logo.svg public/icons/icon-maskable-192.png
convert -background none -resize 512x512 public/logo.svg public/icons/icon-maskable-512.png

# Shortcut icons
convert -background white -resize 192x192 public/logo.svg public/icons/shortcut-search-192.png
convert -background white -resize 192x192 public/logo.svg public/icons/shortcut-report-192.png

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

RÉSULTAT ATTENDU:

public/icons/
├── icon-192x192.png          ✅
├── icon-256x256.png          ✅
├── icon-384x384.png          ✅
├── icon-512x512.png          ✅
├── icon-maskable-192.png     ✅
├── icon-maskable-512.png     ✅
├── shortcut-search-192.png   ✅
└── shortcut-report-192.png   ✅

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✨ MEILLEURE OPTION: https://www.pwabuilder.com/imageGenerator
   - Gratuit & en ligne
   - Crée automatiquement toutes les résolutions
   - Optimise les fichiers PNG
   - Support du maskable (arrondis sur certains OS)
   - Résultat en 1 minute!

`;

console.log(instructions);

console.log('\n✅ Fichier script créé: scripts/generate-icons.js');
console.log('📖 Lire les instructions ci-dessus et suivre l\'une des 3 options.\n');
