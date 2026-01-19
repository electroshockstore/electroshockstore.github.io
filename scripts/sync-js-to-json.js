#!/usr/bin/env node

/**
 * Sincroniza datos de archivos JS a JSON (sobrescribe JSON con datos de JS)
 * Para asegurar que los JSON tengan toda la información actualizada
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const categoriesDir = path.join(rootDir, 'src/data/categories');

console.log('🔄 Sincronizando JS → JSON...\n');

const files = fs.readdirSync(categoriesDir).filter(f => f.endsWith('.js'));

let synced = 0;
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
      
      // Escribir como JSON con estructura de objeto
      const wrapped = { products: products };
      fs.writeFileSync(jsonPath, JSON.stringify(wrapped, null, 2), 'utf-8');
      
      console.log(`✅ ${file} → ${file.replace('.js', '.json')} (${products.length} productos)`);
      synced++;
    } else {
      console.log(`⚠️  ${file} - No se encontró el patrón de export`);
    }
  } catch (error) {
    console.error(`❌ Error en ${file}:`, error.message);
    errors++;
  }
});

console.log(`\n📊 Resumen:`);
console.log(`   ✅ Sincronizados: ${synced}`);
console.log(`   ❌ Errores: ${errors}`);
console.log(`\n✨ Sincronización completada!`);
