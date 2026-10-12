import { cpuCompatibilityData } from './cpuCompatibility';
import { motherboardCompatibilityData } from './motherboardCompatibility';
import { ramCompatibilityData } from './ramCompatibility';
import { psuCompatibilityData } from './psuCompatibility';
import { coolerCompatibilityData } from './coolerCompatibility';

/**
 * Extend a product with compatibility data
 * @param {Object} product - Original product object
 * @returns {Object} Product with compatibility field added
 */
export function extendProductWithCompatibility(product) {
  if (!product || !product.id) return product;
  
  let compatibilityData = null;
  
  // Determine which compatibility data to use based on category
  switch (product.category) {
    case 'Procesadores':
      compatibilityData = cpuCompatibilityData[product.id];
      break;
    case 'Motherboards':
      compatibilityData = motherboardCompatibilityData[product.id];
      break;
    case 'Memorias RAM':
      compatibilityData = ramCompatibilityData[product.id];
      break;
    case 'Fuentes':
      compatibilityData = psuCompatibilityData[product.id];
      break;
    case 'Refrigeración':
      compatibilityData = coolerCompatibilityData[product.id];
      break;
    default:
      // For other categories, create minimal compatibility data
      compatibilityData = {
        uso_principal: ['General']
      };
  }
  
  // Return product with compatibility field.
  // Si no hay entrada en el mapa (producto nuevo sin datos curados),
  // sintetizar un fallback desde los specifications para no dejar {}
  // vacío que envenene al motor.
  const firstInt = (v) => {
    if (v == null) return null;
    const m = String(v).match(/(\d+)/);
    return m ? parseInt(m[1], 10) : null;
  };
  const specs = product.specifications ?? {};
  const fallbackCap = firstInt(specs.capacidadTotal ?? specs.Capacidad ?? specs.capacidad)
    ?? (() => {
      const m = String(product.name ?? '').match(/(\d+)\s*GB/i);
      return m ? parseInt(m[1], 10) : null;
    })();
  const nameSpeed = (() => {
    const m = String(product.name ?? '').match(/(\d+)\s*MH?z/i);
    return m ? parseInt(m[1], 10) : null;
  })();
  const fallbackSpeed = firstInt(specs.Velocidad ?? specs.velocidad ?? specs.Frecuencia ?? specs.VelocidadTransferencia)
    ?? nameSpeed;
  const fallback = {
    ...(product.ddrType ? { tipo: product.ddrType, memoriaRAM: product.ddrType } : {}),
    ...(product.specifications?.Socket ? { socket: product.specifications.Socket } : {}),
    ...(product.specifications?.tipoMemoriaRAM && !product.ddrType
      ? { tipo: product.specifications.tipoMemoriaRAM }
      : {}),
    ...(fallbackCap != null ? { capacidad_gb: fallbackCap } : {}),
    ...(fallbackSpeed != null ? { velocidad_mhz: fallbackSpeed } : {}),
    ...(product.specifications?.formato ? { formato: product.specifications.formato } : {}),
    uso_principal: ['General'],
  };
  return {
    ...product,
    compatibility: { ...fallback, ...(compatibilityData || {}) }
  };
}

/**
 * Extend an array of products with compatibility data
 * @param {Array} products - Array of product objects
 * @returns {Array} Products with compatibility fields
 */
export function extendProductsWithCompatibility(products) {
  if (!Array.isArray(products)) return [];
  return products.map(extendProductWithCompatibility);
}

/**
 * Get all compatibility data maps
 */
export const compatibilityDataMaps = {
  cpu: cpuCompatibilityData,
  motherboard: motherboardCompatibilityData,
  ram: ramCompatibilityData,
  psu: psuCompatibilityData,
  cooler: coolerCompatibilityData
};

export {
  cpuCompatibilityData,
  motherboardCompatibilityData,
  ramCompatibilityData,
  psuCompatibilityData,
  coolerCompatibilityData
};
