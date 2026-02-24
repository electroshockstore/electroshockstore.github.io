/**
 * Script de normalización de datos de productos
 * Estandariza los nombres de campos en specifications para que coincidan con filterConfig
 * 
 * Uso: node scripts/normalizeProductData.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mapeo de campos a normalizar (de nombre inconsistente -> nombre estándar)
const FIELD_NORMALIZATIONS = {
  // Capacidad (RAM y Almacenamiento)
  'capacidad': 'capacidadTotal',
  'Capacidad': 'capacidadTotal',
  'Capacidad total': 'capacidadTotal',
  'Capacidad Total': 'capacidadTotal',
  
  // Marca
  'MARCA': 'Marca',
  'brand': 'Marca',
  'Marca de la fuente': 'Marca',
  
  // RGB/Iluminación
  'iluminacionRGB': 'rgb',
  'Iluminación': 'rgb',
  'RGB': 'rgb',
  
  // Tipo de memoria
  'tipoMemoria': 'tipoMemoriaRAM',
  'Tipo de memoria': 'tipoMemoriaRAM',
  'tipo': 'tipoMemoriaRAM',
  
  // Formato (almacenamiento)
  'Factor de forma': 'formato',
  'Formato': 'formato',
  'Tipo': 'formato',
  'factorDeForma': 'formato',
  
  // Potencia (fuentes)
  'Potencia Continua': 'Potencia',
  
  // Certificación (fuentes)
  'Certificación': 'Certificacion',
  
  // Conectividad
  'Conectividad': 'tipoConectividad',
  'tipoConectividad': 'tipoConectividad',
  
  // Compatibilidad
  'compatibilidad': 'Compatibilidad'
};

// Categorías a procesar
const CATEGORIES = [
  'memorias',
  'procesadores',
  'motherboards',
  'fuentes',
  'teclados',
  'mouse',
  'auriculares',
  'joystick',
  'almacenamiento',
  'refrigeracion',
  'conectividad',
  'monitores',
  'placas_video',
  'gabinetes'
];

/**
 * Normaliza los campos de specifications de un producto
 */
function normalizeProductSpecifications(product) {
  if (!product.specifications) {
    return product;
  }

  const normalizedSpecs = {};
  
  Object.entries(product.specifications).forEach(([key, value]) => {
    // Si el campo tiene un mapeo, usar el nombre normalizado
    const normalizedKey = FIELD_NORMALIZATIONS[key] || key;
    normalizedSpecs[normalizedKey] = value;
  });

  return {
    ...product,
    specifications: normalizedSpecs
  };
}

/**
 * Procesa un archivo de categoría
 */
function processCategoryFile(categoryName) {
  const filePath = path.join(__dirname, '..', 'src', 'data', 'categories', `${categoryName}.json`);
  
  // Verificar si el archivo existe
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Archivo no encontrado: ${categoryName}.json`);
    return { processed: false, changes: 0 };
  }

  try {
    // Leer archivo
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);

    if (!data.products || !Array.isArray(data.products)) {
      console.log(`⚠️  Formato inválido en ${categoryName}.json`);
      return { processed: false, changes: 0 };
    }

    let changesCount = 0;
    
    // Normalizar cada producto (claves Y valores)
    const normalizedProducts = data.products.map(product => {
      const normalized = normalizeProductValues(product);
      
      // Contar cambios
      if (JSON.stringify(product.specifications) !== JSON.stringify(normalized.specifications)) {
        changesCount++;
      }
      
      return normalized;
    });

    // Solo escribir si hubo cambios
    if (changesCount > 0) {
      const updatedData = {
        ...data,
        products: normalizedProducts
      };

      // Escribir archivo con formato bonito
      fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2), 'utf8');
      console.log(`✅ ${categoryName}.json - ${changesCount} productos normalizados`);
    } else {
      console.log(`✓  ${categoryName}.json - Sin cambios necesarios`);
    }

    return { processed: true, changes: changesCount };

  } catch (error) {
    console.error(`❌ Error procesando ${categoryName}.json:`, error.message);
    return { processed: false, changes: 0 };
  }
}

/**
 * Función principal
 */
function main() {
  console.log('🔧 Iniciando normalización de datos de productos...\n');
  
  let totalProcessed = 0;
  let totalChanges = 0;
  let totalErrors = 0;

  CATEGORIES.forEach(category => {
    const result = processCategoryFile(category);
    
    if (result.processed) {
      totalProcessed++;
      totalChanges += result.changes;
    } else {
      totalErrors++;
    }
  });

  console.log('\n📊 Resumen:');
  console.log(`   Archivos procesados: ${totalProcessed}`);
  console.log(`   Productos normalizados: ${totalChanges}`);
  console.log(`   Errores: ${totalErrors}`);
  console.log('\n✨ Normalización completada!\n');
}

// Ejecutar
main();


/**
 * Normaliza el valor de capacidad para que tenga formato consistente
 */
function normalizeCapacityValue(value) {
  if (!value) return value;
  
  const valueStr = value.toString().trim();
  
  // Extraer número y unidad (con o sin espacio)
  const match = valueStr.match(/^(\d+)\s*(GB|TB|gb|tb)$/i);
  
  if (match) {
    const num = match[1];
    const unit = match[2].toUpperCase();
    // Formato consistente: número + espacio + unidad
    return `${num} ${unit}`;
  }
  
  return value;
}

/**
 * Normaliza el valor de certificación de fuentes
 */
function normalizeCertificationValue(value) {
  if (!value) return value;
  
  const valueStr = value.toString().toLowerCase().trim();
  
  if (valueStr.includes('gold')) return '80 Plus Gold';
  if (valueStr.includes('bronze')) return '80 Plus Bronze';
  if (valueStr.includes('white')) return '80 Plus White';
  if (valueStr.includes('silver')) return '80 Plus Silver';
  if (valueStr.includes('platinum')) return '80 Plus Platinum';
  if (valueStr.includes('titanium')) return '80 Plus Titanium';
  if (valueStr.includes('sin')) return 'Sin certificación';
  
  return value;
}

/**
 * Normaliza el valor de conectividad
 */
function normalizeConnectivityValue(value) {
  if (!value) return value;
  
  const valueStr = value.toString().toLowerCase().trim();
  
  // Detectar inalámbrico
  const isWireless = valueStr.includes('inalámbrico') || 
                     valueStr.includes('wireless') || 
                     valueStr.includes('bluetooth') || 
                     valueStr.includes('2.4ghz') ||
                     valueStr.includes('2.4 ghz') ||
                     valueStr.includes('dongle') ||
                     valueStr.includes('triple modo') ||
                     valueStr.includes('3 modos');
  
  return isWireless ? 'Inalámbrico' : 'Alámbrico';
}

/**
 * Normaliza el valor de arquitectura de teclado
 */
function normalizeArchitectureValue(value) {
  if (!value) return value;
  
  const valueStr = value.toString().toLowerCase().trim();
  
  if (valueStr.includes('mecánico') && valueStr.includes('inalámbrico')) return 'Mecánico';
  if (valueStr.includes('membrana') && valueStr.includes('inalámbrico')) return 'Membrana';
  if (valueStr.includes('mecánico')) return 'Mecánico';
  if (valueStr.includes('membrana')) return 'Membrana';
  
  return value;
}
/**
 * Normaliza el valor de marca para que tenga capitalización consistente
 */
function normalizeBrandValue(value) {
  if (!value) return value;
  
  const valueStr = value.toString().toLowerCase().trim();
  
  // Marcas especiales con variaciones
  if (valueStr.includes('xpg') || valueStr === 'adata') return 'ADATA';
  if (valueStr.includes('giga-byte') || valueStr.includes('gigabyte')) return 'Gigabyte';
  if (valueStr.includes('playstation') || valueStr.includes('sony')) return 'Sony/PlayStation';
  if (valueStr.includes('microsoft') || valueStr.includes('xbox')) return 'Microsoft/Xbox';
  
  // Mantener capitalización correcta para marcas conocidas
  const brandMap = {
    'gigabyte': 'Gigabyte',
    'giga-byte technology': 'Gigabyte',
    'thermaltake': 'Thermaltake',
    'aureox': 'Aureox',
    'kingston': 'Kingston',
    'adata': 'ADATA',
    'xpg': 'ADATA',
    'logitech': 'Logitech',
    'razer': 'Razer',
    'redragon': 'Redragon',
    'hyperx': 'HyperX',
    'corsair': 'Corsair',
    'asus': 'ASUS',
    'msi': 'MSI',
    'asrock': 'ASRock',
    'amd': 'AMD',
    'intel': 'Intel',
    'nvidia': 'NVIDIA',
    'western digital': 'Western Digital',
    'wd': 'WD',
    'seagate': 'Seagate',
    'sandisk': 'SanDisk',
    'samsung': 'Samsung',
    'crucial': 'Crucial',
    'patriot': 'Patriot',
    'lexar': 'Lexar',
    'netac': 'Netac',
    'hiksemi': 'Hiksemi',
    'neo forza': 'Neo Forza',
    'neoforza': 'Neo Forza'
  };
  
  return brandMap[valueStr] || value.charAt(0).toUpperCase() + value.slice(1);
}

/**
 * Normaliza los valores de specifications además de las claves
 */
function normalizeProductValues(product) {
  if (!product.specifications) {
    return product;
  }

  const normalizedSpecs = {};
  
  Object.entries(product.specifications).forEach(([key, value]) => {
    // Normalizar la clave
    const normalizedKey = FIELD_NORMALIZATIONS[key] || key;
    
    // Normalizar el valor según el tipo de campo
    let normalizedValue = value;
    
    if (normalizedKey === 'capacidadTotal' || normalizedKey === 'Capacidad') {
      normalizedValue = normalizeCapacityValue(value);
    } else if (normalizedKey === 'Marca') {
      normalizedValue = normalizeBrandValue(value);
    } else if (normalizedKey === 'Certificacion') {
      normalizedValue = normalizeCertificationValue(value);
    } else if (normalizedKey === 'tipoConectividad') {
      normalizedValue = normalizeConnectivityValue(value);
    } else if (normalizedKey === 'Arquitectura') {
      normalizedValue = normalizeArchitectureValue(value);
    }
    
    normalizedSpecs[normalizedKey] = normalizedValue;
  });

  return {
    ...product,
    specifications: normalizedSpecs
  };
}

// Exportar para testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { normalizeCapacityValue, normalizeBrandValue, normalizeProductValues };
}
