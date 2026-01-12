import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mapeo de marcas a URLs (genéricas por categoría de producto)
const brandUrls = {
  // Memorias RAM
  'Kingston': 'https://www.kingston.com/es/memory/gaming',
  'Corsair': 'https://www.corsair.com/es/es/c/memory',
  'G.Skill': 'https://www.gskill.com/products/1/165/184/DDR4',
  'Team Group': 'https://www.teamgroupinc.com/en/product-category/memory',
  'Crucial': 'https://www.crucial.com/products/memory',
  'ADATA': 'https://www.adata.com/ar/consumer/category/memory/',
  'XPG': 'https://www.xpg.com/en/category/memory',
  
  // Fuentes
  'Thermaltake': 'https://www.thermaltake.com/power-supply.html',
  'Cooler Master': 'https://www.coolermaster.com/en/catalog/power-supplies/',
  'EVGA': 'https://www.evga.com/products/productlist.aspx?type=10',
  'Seasonic': 'https://seasonic.com/product',
  'be quiet!': 'https://www.bequiet.com/en/powersupply',
  'Gigabyte': 'https://www.gigabyte.com/Power-Supply',
  
  // Refrigeración
  'DeepCool': 'https://www.deepcool.com/products/Cooling/',
  'ID-Cooling': 'https://www.idcooling.com/Product/',
  'Noctua': 'https://noctua.at/en/products',
  'Arctic': 'https://www.arctic.de/en/products/cooling/',
  
  // Periféricos (Teclados, Mouse, Auriculares, Joystick)
  'Redragon': 'https://www.redragonzone.com/collections/',
  'Logitech': 'https://www.logitech.com/es-roam/products/',
  'Razer': 'https://www.razer.com/',
  'HyperX': 'https://www.hyperxgaming.com/latam/products/',
  'SteelSeries': 'https://steelseries.com/',
  'Genius': 'https://www.geniusnet.com/product/',
  
  // Conectividad
  'TP-Link': 'https://www.tp-link.com/ar/home-networking/',
  'D-Link': 'https://www.dlink.com/en/products/',
  'Asus': 'https://www.asus.com/networking-iot-servers/',
  
  // Monitores
  'Samsung': 'https://www.samsung.com/ar/monitors/',
  'LG': 'https://www.lg.com/ar/monitores/',
  'AOC': 'https://www.aoc.com/en/gaming-monitors/',
  'BenQ': 'https://www.benq.com/en-us/monitor/',
  
  // Portátiles
  'Lenovo': 'https://www.lenovo.com/ar/es/laptops/',
  'HP': 'https://www.hp.com/ar-es/shop/laptops.html',
  'Dell': 'https://www.dell.com/es-ar/shop/laptops/',
  
  // Placas de Video
  'Zotac': 'https://www.zotac.com/product/graphics_card/',
  'PNY': 'https://www.pny.com/graphics-cards',
  'Palit': 'https://www.palit.com/palit/vgapro.php',
  'NVIDIA': 'https://www.nvidia.com/es-la/geforce/graphics-cards/',
  'AMD': 'https://www.amd.com/es/products/graphics',
};

const categoriesToProcess = [
  'memorias.js',
  'fuentes.js',
  'refrigeracion.js',
  'teclados.js',
  'mouse.js',
  'auriculares.js',
  'joystick.js',
  'conectividad.js',
  'monitores.js',
  'portatiles.js',
  'placas_video.js',
  'mayorista.js'
];

function addManufacturerUrl(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const fileName = path.basename(filePath);
  
  console.log(`\n📁 Procesando: ${fileName}`);
  
  let modified = false;
  const lines = content.split('\n');
  const newLines = [];
  
  for (let i = 0; i < lines.length; i++) {
    newLines.push(lines[i]);
    
    // Buscar líneas con category
    if (lines[i].includes('category:') && lines[i].includes('"')) {
      // Verificar si ya tiene manufacturerUrl en las próximas líneas
      let hasUrl = false;
      for (let j = i + 1; j < Math.min(i + 5, lines.length); j++) {
        if (lines[j].includes('manufacturerUrl:')) {
          hasUrl = true;
          break;
        }
        if (lines[j].includes('price:') || lines[j].includes('stock:')) {
          break;
        }
      }
      
      if (!hasUrl) {
        // Buscar la marca en las líneas anteriores
        let brand = null;
        for (let j = Math.max(0, i - 10); j < i; j++) {
          const brandMatch = lines[j].match(/brand:\s*"([^"]+)"/);
          if (brandMatch) {
            brand = brandMatch[1];
            break;
          }
        }
        
        // Buscar el nombre para verificar si es usado
        let isUsed = false;
        for (let j = Math.max(0, i - 10); j < i; j++) {
          const nameMatch = lines[j].match(/name:\s*"([^"]+)"/);
          if (nameMatch && (nameMatch[1].toLowerCase().includes('usado') || nameMatch[1].toLowerCase().includes('usad@'))) {
            isUsed = true;
            break;
          }
        }
        
        if (brand && !isUsed && brandUrls[brand]) {
          const indent = lines[i].match(/^(\s*)/)[1];
          newLines.push(`${indent}manufacturerUrl: "${brandUrls[brand]}",`);
          console.log(`  ✅ Agregado URL para marca: ${brand}`);
          modified = true;
        }
      }
    }
  }
  
  if (modified) {
    fs.writeFileSync(filePath, newLines.join('\n'), 'utf-8');
    console.log(`✨ Archivo actualizado: ${fileName}`);
  } else {
    console.log(`ℹ️  Sin cambios en: ${fileName}`);
  }
}

console.log('🚀 Iniciando proceso de agregar URLs del fabricante...\n');

categoriesToProcess.forEach(fileName => {
  const filePath = path.join(__dirname, '../src/data/categories', fileName);
  if (fs.existsSync(filePath)) {
    addManufacturerUrl(filePath);
  } else {
    console.log(`⚠️  Archivo no encontrado: ${fileName}`);
  }
});

console.log('\n✅ Proceso completado!');
