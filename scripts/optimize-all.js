import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Imágenes WebP pesadas que necesitan re-compresión
const heavyWebpImages = [
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

let stats = {
  webpRecompressed: 0,
  webpOriginalSize: 0,
  webpNewSize: 0,
  pngJpgConverted: 0,
  pngJpgOriginalSize: 0,
  pngJpgNewSize: 0,
  errors: 0
};

// Función para re-comprimir WebP pesados
async function recompressWebP(imagePath) {
  try {
    await fs.access(imagePath);
    
    const originalSize = (await fs.stat(imagePath)).size;
    stats.webpOriginalSize += originalSize;
    
    // Re-comprimir con calidad 75
    await sharp(imagePath)
      .webp({ quality: 75, effort: 6 })
      .toFile(imagePath + '.tmp');
    
    await fs.rename(imagePath + '.tmp', imagePath);
    
    const newSize = (await fs.stat(imagePath)).size;
    stats.webpNewSize += newSize;
    
    const reduction = ((1 - newSize / originalSize) * 100).toFixed(1);
    const originalKB = (originalSize / 1024).toFixed(0);
    const newKB = (newSize / 1024).toFixed(0);
    
    console.log(`  ✓ ${path.basename(imagePath)}: ${originalKB}KB → ${newKB}KB (-${reduction}%)`);
    stats.webpRecompressed++;
  } catch (error) {
    console.error(`  ✗ Error: ${path.basename(imagePath)} - ${error.message}`);
    stats.errors++;
  }
}

// Función para convertir PNG/JPG a WebP
async function convertToWebP(imagePath) {
  const webpPath = imagePath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
  
  try {
    // Si ya existe el WebP, skip
    try {
      await fs.access(webpPath);
      return false;
    } catch {}
    
    const originalSize = (await fs.stat(imagePath)).size;
    stats.pngJpgOriginalSize += originalSize;
    
    const info = await sharp(imagePath)
      .webp({ quality: 80, effort: 6 })
      .toFile(webpPath);
    
    stats.pngJpgNewSize += info.size;
    
    const reduction = ((1 - info.size / originalSize) * 100).toFixed(1);
    const originalKB = (originalSize / 1024).toFixed(0);
    const newKB = (info.size / 1024).toFixed(0);
    
    console.log(`  ✓ ${path.basename(imagePath)}: ${originalKB}KB → ${newKB}KB (-${reduction}%)`);
    stats.pngJpgConverted++;
    return true;
  } catch (error) {
    console.error(`  ✗ Error: ${path.basename(imagePath)} - ${error.message}`);
    stats.errors++;
    return false;
  }
}

// Función recursiva para buscar PNG/JPG
async function findAndConvertImages(dir) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        await findAndConvertImages(fullPath);
      } else if (/\.(png|jpg|jpeg)$/i.test(entry.name)) {
        await convertToWebP(fullPath);
      }
    }
  } catch (error) {
    console.error(`Error leyendo directorio ${dir}:`, error.message);
  }
}

// Función principal
async function optimizeAll() {
  console.log('🚀 OPTIMIZACIÓN COMPLETA DE IMÁGENES\n');
  console.log('='.repeat(60));
  
  // Paso 1: Re-comprimir WebP pesados
  console.log('\n📦 PASO 1: Re-comprimiendo WebP pesados (calidad 75%)...\n');
  for (const img of heavyWebpImages) {
    await recompressWebP(img);
  }
  
  // Paso 2: Convertir PNG/JPG a WebP
  console.log('\n📦 PASO 2: Convirtiendo PNG/JPG a WebP (calidad 80%)...\n');
  await findAndConvertImages('./public/images');
  
  // Resumen final
  console.log('\n' + '='.repeat(60));
  console.log('✓ OPTIMIZACIÓN COMPLETADA');
  console.log('='.repeat(60));
  
  console.log('\n📊 WEBP RE-COMPRIMIDOS:');
  console.log(`   Archivos: ${stats.webpRecompressed}`);
  console.log(`   Antes: ${(stats.webpOriginalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Después: ${(stats.webpNewSize / 1024 / 1024).toFixed(2)} MB`);
  if (stats.webpOriginalSize > 0) {
    const reduction = ((1 - stats.webpNewSize / stats.webpOriginalSize) * 100).toFixed(1);
    const saved = ((stats.webpOriginalSize - stats.webpNewSize) / 1024 / 1024).toFixed(2);
    console.log(`   Ahorro: ${saved} MB (${reduction}%)`);
  }
  
  console.log('\n📊 PNG/JPG CONVERTIDOS:');
  console.log(`   Archivos: ${stats.pngJpgConverted}`);
  console.log(`   Antes: ${(stats.pngJpgOriginalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Después: ${(stats.pngJpgNewSize / 1024 / 1024).toFixed(2)} MB`);
  if (stats.pngJpgOriginalSize > 0) {
    const reduction = ((1 - stats.pngJpgNewSize / stats.pngJpgOriginalSize) * 100).toFixed(1);
    const saved = ((stats.pngJpgOriginalSize - stats.pngJpgNewSize) / 1024 / 1024).toFixed(2);
    console.log(`   Ahorro: ${saved} MB (${reduction}%)`);
  }
  
  console.log('\n📊 TOTAL:');
  const totalOriginal = stats.webpOriginalSize + stats.pngJpgOriginalSize;
  const totalNew = stats.webpNewSize + stats.pngJpgNewSize;
  console.log(`   Antes: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Después: ${(totalNew / 1024 / 1024).toFixed(2)} MB`);
  if (totalOriginal > 0) {
    const totalReduction = ((1 - totalNew / totalOriginal) * 100).toFixed(1);
    const totalSaved = ((totalOriginal - totalNew) / 1024 / 1024).toFixed(2);
    console.log(`   💾 AHORRO TOTAL: ${totalSaved} MB (${totalReduction}%)`);
  }
  
  if (stats.errors > 0) {
    console.log(`\n⚠️  Errores: ${stats.errors}`);
  }
  
  console.log('\n✅ PRÓXIMOS PASOS:');
  console.log('1. Verifica que las imágenes se vean bien: npm run dev');
  console.log('2. Si todo está bien, elimina los PNG/JPG originales');
  console.log('3. Mide el rendimiento con Lighthouse');
}

// Ejecutar
optimizeAll().catch(error => {
  console.error('\n❌ Error fatal:', error);
  process.exit(1);
});
