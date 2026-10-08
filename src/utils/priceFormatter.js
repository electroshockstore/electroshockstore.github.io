/**
 * Formato canónico ARS: ver `formatPrice.js` ("$ 1.234.567").
 * Este módulo solo expone variantes sin símbolo para no duplicar.
 * @param {number} price - El precio a formatear
 * @returns {string} - El precio formateado sin símbolo
 */
export const formatPriceNumber = (price) => {
  return new Intl.NumberFormat('es-AR', {
    minimumFractionDigits: 0
  }).format(price);
};
