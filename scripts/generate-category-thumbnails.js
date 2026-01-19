import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const INPUT_DIR = join(__dirname, '../public/images/category_filter');
const OUTPUT_DIR = join(__dirname, '../public/images/category_filter/thumbs');
const THUMB_SIZE = 200; // 200x200px para mobile
const QUALITY = 80; // Calidad WebP

async function generateThumbnails() {
  console.log('🖼️  Generando thumbnails optimizados para mobile...\n');

  // Crear directorio de salida si no existe
  if (!existsSync(OUTPUT_DIR)) {
    await mkdir(OUTPUT_DIR, { recursive: true });
    console.log('✅ Directorio thumbs/ creado\n');
  }

  // Leer todas las imágenes
  const files = await readdir(INPUT_DIR);
  const imageFiles = files.filter(file => 
    file.endsWith('.webp') || file.endsWith('.jpg') || file.endsWith('.png')
  );

  console.log(`📁 Encontradas ${imageFiles.length} imágenes\n`);

  let processed = 0;
  let errors = 0;

  for (const file of imageFiles) {
    try {
      const inputPath = join(INPUT_DIR, file);
      const outputFile = file.replace(/\.(jpg|png)$/, '.webp'); // Convertir todo a webp
      const outputPath = join(OUTPUT_DIR, outputFile);

      // Obtener tamaño original
      const originalStats = await sharp(inputPath).metadata();
      const originalSize = (await import('fs')).statSync(inputPath).size;

      // Generar thumbnail optimizado
      await sharp(inputPath)
        .resize(THUMB_SIZE, THUMB_SIZE, {
          fit: 'cover',
          position: 'center'
        })
        .webp({ 
          quality: QUALITY,
          effort: 6 // Mejor compresión
        })
        .toFile(outputPath);

      // Obtener tamaño nuevo
      const newSize = (await import('fs')).statSync(outputPath).size;
      const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(1);

      console.log(`✅ ${file}`);
      console.log(`   ${(originalSize / 1024).toFixed(1)} KB → ${(newSize / 1024).toFixed(1)} KB (${reduction}% reducción)`);
      
      processed++;
    } catch (error) {
      console.error(`❌ Error procesando ${file}:`, error.message);
      errors++;
    }
  }

  console.log(`\n${'='.repeat(50)}`);
  console.log(`✅ Procesadas: ${processed}`);
  console.log(`❌ Errores: ${errors}`);
  console.log(`📁 Ubicación: public/images/category_filter/thumbs/`);
  console.log(`${'='.repeat(50)}\n`);
}

generateThumbnails().catch(console.error);
