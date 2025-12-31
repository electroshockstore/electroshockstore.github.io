import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Imágenes WebP que están pesadas (> 500 KB)
const heavyImages = [
  'public/images/category_grid/refrigeracion_grid_tiny.webp',
  'public/images/icons/motherboard_icon_tiny.webp',
  'public/images/hero/megaphone_tiny.webp',
  'public/images/category_grid/procesador_grid_tiny.webp',
  'public/images/icons/refrigeracion_icon_tiny.webp',
  'public/images/icons/cpu_icon_tiny.webp',
  'public/images/hero/location_tiny.webp',
  'public/images/icons/storage_icon_tiny.webp',
  'public/images/icons/psu_icon_tiny.webp'
];

let totalOriginalSize = 0;
let totalNewSize = 0;
let processed = 0;
let errors = 0;

async function recompressImage(imagePath) {
  const backup = imagePath.replace('.webp', '.backup.webp');
  
  try {
    // Verificar que existe
    await fs.access(imagePath);
    
    // Backup
    await fs.copyFile(imagePath, backup);
    
    const originalSize = (await fs.stat(imagePath)).size;
    totalOriginalSize += originalSize;
    
    // Re-comprimir con calidad 75 (balance entre calidad y tamaño)
    await sharp(imagePath)
      .webp({ quality: 75, effort: 6 })
      .toFile(imagePath + '.tmp');
    
    await fs.rename(imagePath + '.tmp', imagePath);
    
    const newSize = (await fs.stat(imagePath)).size;
    totalNewSize += newSize;
    
    const reduction = ((1 - newSize / originalSize) * 100).toFixed(1);
    const originalKB = (originalSize / 1024).toFixed(0);
    const newKB = (newSize / 1024).toFixed(0);
    
    console.log(`✓ ${path.basename(imagePath)}`);
    console.log(`  ${originalKB} KB → ${newKB} KB (${reduction}% reducción)`);
    
    processed++;
  } catch (error) {
    console.error(`✗ Error en ${imagePath}:`, error.message);
    errors++;
  }
}

(async () => {
  console.log('🔄 Re-comprimiendo imágenes WebP pesadas...');
  console.log('📦 Calidad: 75% (balance óptimo)\n');
  
  for (const img of heavyImages) {
    await recompressImage(img);
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('✓ PROCESO COMPLETADO');
  console.log('='.repeat(60));
  console.log(`📊 Imágenes procesadas: ${processed}`);
  console.log(`✗ Errores: ${errors}`);
  console.log(`📦 Tamaño original: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`📦 Tamaño nuevo: ${(totalNewSize / 1024 / 1024).toFixed(2)} MB`);
  
  if (totalOriginalSize > 0) {
    const totalReduction = ((1 - totalNewSize / totalOriginalSize) * 100).toFixed(1);
    const savedMB = ((totalOriginalSize - totalNewSize) / 1024 / 1024).toFixed(2);
    console.log(`💾 Ahorro: ${savedMB} MB (${totalReduction}% reducción)`);
  }
  
  console.log('\n⚠️  IMPORTANTE:');
  console.log('1. Verifica que las imágenes se vean bien');
  console.log('2. Si hay problemas, los backups están en .backup.webp');
  console.log('3. Para restaurar: renombra .backup.webp a .webp');
  console.log('4. Si todo está bien, elimina los backups:');
  console.log('   Get-ChildItem -Path "public/images" -Recurse -Filter "*.backup.webp" | Remove-Item');
})();
