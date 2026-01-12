// Script para agregar manufacturerUrl a todos los productos
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mapeo de marcas a URLs base
const brandUrls = {
  // Almacenamiento
  'ADATA': 'https://www.adata.com/ar/consumer/',
  'Lexar': 'https://www.lexar.com/product/',
  'Kingston': 'https://www.kingston.com/es/ssd/',
  'SanDisk': 'https://www.westerndigital.com/es-la/products/internal-drives/',
  'Patriot': 'https://viper.patriotmemory.com/products/',
  'Netac': 'https://www.netac.com/product/',
  'Western Digital': 'https://www.westerndigital.com/es-la/products/',
  'Seagate': 'https://www.seagate.com/la/es/products/',
  
  // Procesadores
  'AMD': 'https://www.amd.com/es/products/',
  'Intel': 'https://www.intel.la/content/www/xl/es/products/',
  
  // Motherboards
  'ASUS': 'https://www.asus.com/motherboards-components/',
  'MSI': 'https://www.msi.com/Motherboard/',
  'Gigabyte': 'https://www.gigabyte.com/Motherboard/',
  'ASRock': 'https://www.asrock.com/mb/',
  
  // Memorias RAM
  'Corsair': 'https://www.corsair.com/es/es/p/',
  'G.Skill': 'https://www.gskill.com/product/',
  'Team Group': 'https://www.teamgroupinc.com/en/product/',
  'Crucial': 'https://www.crucial.com/products/memory/',
  
  // Placas de Video
  'NVIDIA': 'https://www.nvidia.com/es-la/geforce/graphics-cards/',
  'Zotac': 'https://www.zotac.com/product/graphics_card/',
  'PNY': 'https://www.pny.com/graphics-cards/',
  'Palit': 'https://www.palit.com/palit/vgapro.php',
  
  // Fuentes
  'EVGA': 'https://www.evga.com/products/product.aspx',
  'Thermaltake': 'https://www.thermaltake.com/products/',
  'Cooler Master': 'https://www.coolermaster.com/catalog/',
  'Seasonic': 'https://seasonic.com/product/',
  
  // Refrigeración
  'Noctua': 'https://noctua.at/en/products/',
  'be quiet!': 'https://www.bequiet.com/en/products/',
  'Arctic': 'https://www.arctic.de/en/products/',
  'DeepCool': 'https://www.deepcool.com/products/',
  
  // Periféricos
  'Logitech': 'https://www.logitech.com/es-roam/products/',
  'Razer': 'https://www.razer.com/gaming/',
  'HyperX': 'https://www.hyperxgaming.com/latam/products/',
  'SteelSeries': 'https://steelseries.com/gaming/',
  'Redragon': 'https://www.redragonzone.com/products/',
  'Genius': 'https://www.geniusnet.com/product/',
  
  // Monitores
  'Samsung': 'https://www.samsung.com/ar/monitors/',
  'LG': 'https://www.lg.com/ar/monitores/',
  'AOC': 'https://www.aoc.com/en/gaming-monitors/',
  'BenQ': 'https://www.benq.com/en-us/monitor/',
  'ViewSonic': 'https://www.viewsonic.com/latam/products/monitors/',
  
  // Conectividad
  'TP-Link': 'https://www.tp-link.com/ar/home-networking/',
  'D-Link': 'https://www.dlink.com/en/products/',
  'Netgear': 'https://www.netgear.com/home/wifi/',
  'Asus': 'https://www.asus.com/networking-iot-servers/',
};

// Función para generar URL basada en marca y modelo
function generateManufacturerUrl(brand, model, category) {
  const baseUrl = brandUrls[brand];
  if (!baseUrl) {
    console.warn(`⚠️  No hay URL base para la marca: ${brand}`);
    return null;
  }
  
  // Para marcas específicas, retornar URL genérica de la categoría
  return baseUrl;
}

// Procesar archivo de categoría
function processCategory(categoryFile) {
  const filePath = path.join(__dirname, '../src/data/categories', categoryFile);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  console.log(`\n📁 Procesando: ${categoryFile}`);
  
  // Buscar todos los productos que NO tienen manufacturerUrl
  const productRegex = /{\s*id:\s*\d+,\s*name:\s*"([^"]+)",\s*brand:\s*"([^"]+)",\s*model:\s*"([^"]+)",\s*category:\s*"([^"]+)",/g;
  
  let match;
  let updatedCount = 0;
  
  while ((match = productRegex.exec(content)) !== null) {
    const [fullMatch, name, brand, model, category] = match;
    const startIndex = match.index;
    
    // Verificar si ya tiene manufacturerUrl
    const nextLines = content.substring(startIndex, startIndex + 500);
    if (nextLines.includes('manufacturerUrl:')) {
      continue; // Ya tiene URL, saltar
    }
    
    // Verificar si es producto usado (no agregar URL)
    if (name.toLowerCase().includes('usado') || name.toLowerCase().includes('usad@')) {
      console.log(`  ⏭️  Saltando producto usado: ${name}`);
      continue;
    }
    
    const url = generateManufacturerUrl(brand, model, category);
    if (!url) continue;
    
    // Encontrar la posición después de "category"
    const categoryLineEnd = content.indexOf(',', startIndex + fullMatch.length);
    if (categoryLineEnd === -1) continue;
    
    // Insertar manufacturerUrl después de category
    const before = content.substring(0, categoryLineEnd + 1);
    const after = content.substring(categoryLineEnd + 1);
    
    content = before + `\n    manufacturerUrl: "${url}",` + after;
    updatedCount++;
    
    console.log(`  ✅ Agregado URL para: ${name}`);
  }
  
  // Guardar archivo actualizado
  if (updatedCount > 0) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✨ ${updatedCount} productos actualizados en ${categoryFile}`);
  } else {
    console.log(`ℹ️  No se encontraron productos para actualizar en ${categoryFile}`);
  }
}

// Procesar todas las categorías
const categoriesDir = path.join(__dirname, '../src/data/categories');
const categoryFiles = fs.readdirSync(categoriesDir).filter(f => f.endsWith('.js'));

console.log('🚀 Iniciando proceso de agregar URLs del fabricante...\n');

categoryFiles.forEach(processCategory);

console.log('\n✅ Proceso completado!');
