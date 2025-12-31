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
  
  // Return product with compatibility field
  return {
    ...product,
    compatibility: compatibilityData || {}
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
