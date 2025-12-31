import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let totalOriginalSize = 0;
let totalOptimizedSize = 0;
let filesProcessed = 0;
let filesSkipped = 0;
let filesErrored = 0;

async function optimizeDirectory(dir) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        await optimizeDirectory(fullPath);
      } else if (/\.(png|jpg|jpeg)$/i.test(entry.name)) {
        const webpPath = fullPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
        
        // Si ya existe el WebP, skip
        try {
          await fs.access(webpPath);
          console.log(`⏭️  Ya existe: ${path.basename(webpPath)}`);
          filesSkipped++;
          continue;
        } catch {}
        
        try {
          const originalStats = await fs.stat(fullPath);
          totalOriginalSize += originalStats.size;
          
          const info = await sharp(fullPath)
            .webp({ quality: 80, effort: 6 })
            .toFile(webpPath);
          
          totalOptimizedSize += info.size;
          filesProcessed++;
          
          const reduction = ((1 - info.size / originalStats.size) * 100).toFixed(1);
          const originalMB = (originalStats.size / 1024 / 1024).toFixed(2);
          const optimizedMB = (info.size / 1024 / 1024).toFixed(2);
          
          console.log(`✓ ${entry.name} (${originalMB}MB) → ${path.basename(webpPath)} (${optimizedMB}MB) - ${reduction}% reducción`);
        } catch (error) {
          console.error(`✗ Error: ${entry.name}`, error.message);
          filesErrored++;
        }
      }
    }
  } catch (error) {
    console.error(`Error leyendo directorio ${dir}:`, error.message);
  }
}

console.log('🚀 Iniciando optimización de imágenes...\n');

optimizeDirectory('./public/images')
  .then(() => {
    console.log('\n' + '='.repeat(60));
    console.log('✓ OPTIMIZACIÓN COMPLETADA');
    console.log('='.repeat(60));
    console.log(`📊 Archivos procesados: ${filesProcessed}`);
    console.log(`⏭️  Archivos omitidos: ${filesSkipped}`);
    console.log(`✗ Archivos con error: ${filesErrored}`);
    console.log(`📦 Tamaño original: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`📦 Tamaño optimizado: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)} MB`);
    
    if (totalOriginalSize > 0) {
      const totalReduction = ((1 - totalOptimizedSize / totalOriginalSize) * 100).toFixed(1);
      const savedMB = ((totalOriginalSize - totalOptimizedSize) / 1024 / 1024).toFixed(2);
      console.log(`💾 Ahorro total: ${savedMB} MB (${totalReduction}% reducción)`);
    }
    
    console.log('\n⚠️  IMPORTANTE:');
    console.log('1. Verifica que todas las imágenes se vean correctamente');
    console.log('2. Prueba la web en diferentes navegadores');
    console.log('3. Si todo está bien, puedes eliminar los archivos PNG/JPG originales');
    console.log('4. Comando para eliminar originales (¡CUIDADO!):');
    console.log('   find public/images -type f \\( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \\) -delete');
  })
  .catch(error => {
    console.error('\n❌ Error fatal:', error);
    process.exit(1);
  });
