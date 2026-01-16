#!/usr/bin/env node

/**
 * Convierte arrays JSON directos a objetos con propiedad 'products'
 * Para que Decap CMS pueda editarlos correctamente
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const categoriesDir = path.join(rootDir, 'src/data/categories');

console.log('🔄 Convirtiendo arrays JSON a objetos...\n');

const files = fs.readdirSync(categoriesDir).filter(f => f.endsWith('.json'));

files.forEach(file => {
  const jsonPath = path.join(categoriesDir, file);
  const content = fs.readFileSync(jsonPath, 'utf-8');
  const data = JSON.parse(content);
  
  // Si es un array directo, convertirlo a objeto
  if (Array.isArray(data)) {
    const wrapped = { products: data };
    fs.writeFileSync(jsonPath, JSON.stringify(wrapped, null, 2), 'utf-8');
    console.log(`✅ ${file} - Convertido a objeto con propiedad 'products'`);
  } else {
    console.log(`⚠️  ${file} - Ya es un objeto`);
  }
});

console.log('\n✨ Conversión completada!');
