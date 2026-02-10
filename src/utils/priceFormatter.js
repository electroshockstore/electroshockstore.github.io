/**
 * Formatea un precio en pesos argentinos
 * @param {number} price - El precio a formatear
 * @returns {string} - El precio formateado con símbolo de moneda
 */
export const formatPrice = (price) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0
  }).format(price);
};

/**
 * Formatea un precio sin el símbolo de moneda
 * @param {number} price - El precio a formatear
 * @returns {string} - El precio formateado sin símbolo
 */
export const formatPriceNumber = (price) => {
  return new Intl.NumberFormat('es-AR', {
    minimumFractionDigits: 0
  }).format(price);
};
