import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const HISTORY_FILE = path.join(__dirname, '../public/data/price-history.json');
const PROCESADORES_FILE = path.join(__dirname, '../src/data/categories/procesadores.json');

// Leer archivos
const history = JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf-8'));
const procesadores = JSON.parse(fs.readFileSync(PROCESADORES_FILE, 'utf-8'));

// Buscar Ryzen 5 5600 y 5600GT
const ryzen5600 = procesadores.products.find(p => p.id === 306);
const ryzen5600gt = procesadores.products.find(p => p.id === 308);

console.log('\n=== VERIFICACIÓN DE HISTÓRICO ===\n');

console.log('📦 Ryzen 5 5600 (ID 306):');
console.log('  Nombre en productos:', ryzen5600?.name);
console.log('  Precio actual:', ryzen5600?.price);
console.log('  Nombre en historial:', history['306']?.name);
console.log('  Historial de precios:');
history['306']?.h.forEach(([timestamp, price]) => {
  const date = new Date(timestamp).toLocaleDateString('es-AR');
  console.log(`    ${date}: $${price.toLocaleString('es-AR')}`);
});

console.log('\n📦 Ryzen 5 5600GT (ID 308):');
console.log('  Nombre en productos:', ryzen5600gt?.name);
console.log('  Precio actual:', ryzen5600gt?.price);
console.log('  Nombre en historial:', history['308']?.name);
console.log('  Historial de precios:');
history['308']?.h.forEach(([timestamp, price]) => {
  const date = new Date(timestamp).toLocaleDateString('es-AR');
  console.log(`    ${date}: $${price.toLocaleString('es-AR')}`);
});

console.log('\n=== VERIFICACIÓN COMPLETADA ===\n');
