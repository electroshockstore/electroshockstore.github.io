/**
 * Formatea un precio en formato argentino
 * @param {number} value - El valor a formatear
 * @returns {string} - El precio formateado
 */
export const formatPrice = (value) => {
  return "$ " + Math.round(value).toLocaleString("es-AR");
};
