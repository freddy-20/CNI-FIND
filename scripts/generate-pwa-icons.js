#!/usr/bin/env node

/**
 * Script de génération des icônes PWA CNI-FIND
 * À partir de l'image du logo original
 * 
 * Installation requise:
 * npm install sharp
 * 
 * Utilisation:
 * node scripts/generate-pwa-icons.js <path-to-original-image>
 * 
 * Exemple:
 * node scripts/generate-pwa-icons.js public/logo-original.png
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const inputImage = args[0] || 'public/logo-original.png';

if (!fs.existsSync(inputImage)) {
  console.error(`❌ Erreur: Le fichier ${inputImage} n'existe pas!`);
  console.error(`\nUtilisation: node scripts/generate-pwa-icons.js <path-to-image>`);
  process.exit(1);
}

const iconsDir = path.join(__dirname, '../public/icons');

// Créer le dossier s'il n'existe pas
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

console.log('🎨 Génération des icônes PWA pour CNI-FIND');
console.log('==========================================\n');
console.log(`📸 Source: ${inputImage}\n`);

// Définir les tailles et options
const sizes = [
  { width: 192, height: 192, name: 'icon-192x192.png', type: 'standard' },
  { width: 256, height: 256, name: 'icon-256x256.png', type: 'standard' },
  { width: 384, height: 384, name: 'icon-384x384.png', type: 'standard' },
  { width: 512, height: 512, name: 'icon-512x512.png', type: 'standard' },
  { width: 192, height: 192, name: 'icon-maskable-192.png', type: 'maskable' },
  { width: 512, height: 512, name: 'icon-maskable-512.png', type: 'maskable' },
  { width: 192, height: 192, name: 'shortcut-search-192.png', type: 'shortcut' },
  { width: 192, height: 192, name: 'shortcut-report-192.png', type: 'shortcut' },
];

let completed = 0;
let errors = 0;

// Générer chaque taille
sizes.forEach(async (size) => {
  try {
    let pipeline = sharp(inputImage)
      .resize(size.width, size.height, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      });

    // Pour les icônes maskable, utiliser fond transparent
    if (size.type === 'maskable') {
      pipeline = sharp(inputImage)
        .resize(size.width, size.height, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        });
    }

    const outputPath = path.join(iconsDir, size.name);
    
    pipeline
      .png({ quality: 90, progressive: true })
      .toFile(outputPath, (err, info) => {
        if (err) {
          console.error(`❌ Erreur ${size.name}: ${err.message}`);
          errors++;
        } else {
          const type = size.type === 'standard' ? '📱' : size.type === 'maskable' ? '🎭' : '⚡';
          console.log(`✅ ${type} ${size.name} (${(info.size / 1024).toFixed(2)} KB)`);
          completed++;
        }

        if (completed + errors === sizes.length) {
          console.log('\n' + '='.repeat(50));
          console.log(`\n✨ Génération complétée!`);
          console.log(`✅ ${completed} icônes créées`);
          if (errors > 0) {
            console.log(`❌ ${errors} erreur(s)\n`);
          } else {
            console.log(`\n🎉 Tous les PNG sont prêts dans public/icons/\n`);
            console.log('📋 Fichiers créés:');
            sizes.forEach(s => {
              console.log(`   ✓ ${s.name}`);
            });
            console.log('\n🚀 Prochaines étapes:');
            console.log('   1. git add public/icons/');
            console.log('   2. git commit -m "feat: Add PWA icons"');
            console.log('   3. git push');
            console.log('   4. npm run build');
            console.log('   5. npm start');
            console.log('   6. Testez sur mobile/desktop!\n');
          }
        }
      });
  } catch (error) {
    console.error(`❌ Erreur ${size.name}: ${error.message}`);
    errors++;
  }
});
