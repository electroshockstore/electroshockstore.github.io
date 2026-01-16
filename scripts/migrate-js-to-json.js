#!/usr/bin/env node

/**
 * Script de migración: Convierte archivos JS de categorías a JSON
 * Para que Decap CMS pueda editarlos
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const categoriesDir = path.join(rootDir, 'src/data/categories');

console.log('🔄 Migrando archivos JS a JSON...\n');

// Leer todos los archivos .js en categories
const files = fs.readdirSync(categoriesDir).filter(f => f.endsWith('.js'));

let migrated = 0;
let errors = 0;

files.forEach(file => {
  try {
    const jsPath = path.join(categoriesDir, file);
    const jsonPath = jsPath.replace('.js', '.json');
    
    // Leer el archivo JS
    const content = fs.readFileSync(jsPath, 'utf-8');
    
    // Extraer el array exportado
    const match = content.match(/export\s+const\s+(\w+Products)\s*=\s*(\[[\s\S]*\]);?/);
    
    if (match && match[2]) {
      const arrayStr = match[2];
      
      // Evaluar el array de forma segura
      const products = eval('(' + arrayStr + ')');
      
      // Escribir como JSON
      fs.writeFileSync(jsonPath, JSON.stringify(products, null, 2), 'utf-8');
      
      console.log(`✅ ${file} → ${file.replace('.js', '.json')}`);
      migrated++;
    } else {
      console.log(`⚠️  ${file} - No se encontró el patrón de export`);
    }
  } catch (error) {
    console.error(`❌ Error en ${file}:`, error.message);
    errors++;
  }
});

console.log(`\n📊 Resumen:`);
console.log(`   ✅ Migrados: ${migrated}`);
console.log(`   ❌ Errores: ${errors}`);
console.log(`\n✨ Migración completada!`);
console.log(`\n⚠️  IMPORTANTE: Los archivos .js originales NO se eliminaron.`);
console.log(`   Puedes eliminarlos manualmente después de verificar que todo funciona.`);
