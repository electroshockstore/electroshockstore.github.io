import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rutas
const CATEGORIES_DIR = path.join(__dirname, '../src/data/categories');
const HISTORY_FILE = path.join(__dirname, '../public/data/price-history.json');
const DATA_DIR = path.join(__dirname, '../public/data');

// Colores para consola
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
  red: '\x1b[31m'
};

// Leer todos los productos de las categorías
async function getAllProducts() {
  const files = fs.readdirSync(CATEGORIES_DIR).filter(f => f.endsWith('.js'));
  const allProducts = [];

  for (const file of files) {
    const filePath = path.join(CATEGORIES_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Extraer productos usando regex (más robusto que import dinámico)
    const match = content.match(/export const \w+Products = \[([\s\S]*?)\];/);
    if (match) {
      try {
        // Evaluar el array de productos
        const productsArray = eval(`[${match[1]}]`);
        allProducts.push(...productsArray);
      } catch (error) {
        console.error(`${colors.red}✗ Error parseando ${file}:${colors.reset}`, error.message);
      }
    }
  }

  return allProducts;
}

// Leer histórico existente
function loadHistory() {
  if (!fs.existsSync(HISTORY_FILE)) {
    return {};
  }
  try {
    return JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf-8'));
  } catch (error) {
    console.error(`${colors.red}✗ Error leyendo histórico:${colors.reset}`, error.message);
    return {};
  }
}

// Guardar histórico
function saveHistory(history) {
  // Crear directorio si no existe
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2), 'utf-8');
}

// Formatear precio para mostrar
function formatPrice(price) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0
  }).format(price);
}

// Main
async function main() {
  console.log(`\n${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  console.log(`${colors.blue}  📊 Actualizador de Histórico de Precios${colors.reset}`);
  console.log(`${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

  // Leer productos actuales
  console.log(`${colors.yellow}⏳ Leyendo productos...${colors.reset}`);
  const products = await getAllProducts();
  console.log(`${colors.green}✓ ${products.length} productos encontrados${colors.reset}\n`);

  // Leer histórico
  const history = loadHistory();
  const timestamp = Date.now();
  const date = new Date(timestamp).toLocaleDateString('es-AR');

  let changesCount = 0;
  let newProductsCount = 0;
  const changes = [];

  // Procesar cada producto
  for (const product of products) {
    const { id, price, name } = product;
    
    if (!id || price === undefined) continue;

    const productId = String(id);
    
    // Si el producto no existe en el histórico
    if (!history[productId]) {
      history[productId] = {
        name: name,
        h: [[timestamp, price]]
      };
      newProductsCount++;
      changes.push({
        id,
        name,
        oldPrice: null,
        newPrice: price,
        isNew: true
      });
      continue;
    }

    // Obtener último precio guardado
    const lastEntry = history[productId].h[history[productId].h.length - 1];
    const lastPrice = lastEntry[1];

    // Si el precio cambió
    if (lastPrice !== price) {
      history[productId].h.push([timestamp, price]);
      history[productId].name = name; // Actualizar nombre por si cambió
      changesCount++;
      changes.push({
        id,
        name,
        oldPrice: lastPrice,
        newPrice: price,
        isNew: false
      });
    }
  }

  // Mostrar resultados
  console.log(`${colors.blue}📅 Fecha: ${date}${colors.reset}\n`);

  if (changes.length === 0) {
    console.log(`${colors.yellow}ℹ No se detectaron cambios de precio${colors.reset}\n`);
  } else {
    if (newProductsCount > 0) {
      console.log(`${colors.green}✓ ${newProductsCount} productos nuevos agregados${colors.reset}`);
    }
    if (changesCount > 0) {
      console.log(`${colors.green}✓ ${changesCount} cambios de precio detectados${colors.reset}\n`);
      
      console.log(`${colors.blue}Cambios:${colors.reset}`);
      changes.filter(c => !c.isNew).forEach(({ id, name, oldPrice, newPrice }) => {
        const diff = newPrice - oldPrice;
        const diffPercent = ((diff / oldPrice) * 100).toFixed(1);
        const arrow = diff > 0 ? '↑' : '↓';
        const color = diff > 0 ? colors.red : colors.green;
        
        console.log(`  ${color}${arrow}${colors.reset} ID ${id}: ${name.substring(0, 40)}...`);
        console.log(`    ${formatPrice(oldPrice)} → ${formatPrice(newPrice)} (${color}${diffPercent > 0 ? '+' : ''}${diffPercent}%${colors.reset})`);
      });
    }

    // Guardar
    console.log(`\n${colors.yellow}⏳ Guardando histórico...${colors.reset}`);
    saveHistory(history);
    console.log(`${colors.green}✓ Histórico actualizado en ${HISTORY_FILE}${colors.reset}`);
  }

  // Estadísticas
  const totalProducts = Object.keys(history).length;
  const totalEntries = Object.values(history).reduce((sum, p) => sum + p.h.length, 0);
  const avgEntriesPerProduct = (totalEntries / totalProducts).toFixed(1);

  console.log(`\n${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  console.log(`${colors.blue}  📈 Estadísticas del Histórico${colors.reset}`);
  console.log(`${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  console.log(`  Total productos: ${totalProducts}`);
  console.log(`  Total registros: ${totalEntries}`);
  console.log(`  Promedio por producto: ${avgEntriesPerProduct} registros`);
  
  // Calcular tamaño del archivo
  if (fs.existsSync(HISTORY_FILE)) {
    const stats = fs.statSync(HISTORY_FILE);
    const sizeKB = (stats.size / 1024).toFixed(2);
    console.log(`  Tamaño del archivo: ${sizeKB} KB`);
  }
  
  console.log(`${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);
}

main().catch(error => {
  console.error(`${colors.red}✗ Error:${colors.reset}`, error);
  process.exit(1);
});
