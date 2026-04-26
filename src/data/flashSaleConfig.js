/**
 * Configuración de Flash Sale
 * 
 * CÓMO CONFIGURAR UNA OFERTA RELÁMPAGO:
 * 
 * 1. DURACIÓN:
 *    - Las ofertas relámpago SIEMPRE duran 3 días (72 horas)
 *    - La fecha se guarda en localStorage para mantener consistencia
 *    - Para REINICIAR el contador: cambia FLASH_SALE_VERSION
 * 
 * 2. PRODUCTOS, DESCUENTOS Y STOCK:
 *    - Agrega los productos en el array 'products'
 *    - Cada producto necesita:
 *      * id: ID del producto en el catálogo
 *      * discountPercentage: % de descuento (ej: 25 = 25% OFF)
 *      * stock: Cantidad disponible (si es ≤5 muestra badge "¡Últimas X!")
 * 
 * 3. ENCONTRAR IDs DE PRODUCTOS:
 *    - Busca en src/data/categories/*.json
 *    - Cada producto tiene un campo "id" único
 * 
 * 4. ACTIVAR/DESACTIVAR:
 *    - enabled: true (mostrar oferta) o false (ocultar oferta)
 * 
 * 5. REINICIAR CONTADOR:
 *    - Cambia FLASH_SALE_VERSION a un nuevo número (ej: 2, 3, 4...)
 *    - Esto reiniciará el contador de 3 días automáticamente
 * 
 * NOTA: Los productos en oferta relámpago NUNCA tienen envío gratis
 */

// VERSIÓN DE LA OFERTA - Cambia este número para reiniciar el contador
const FLASH_SALE_VERSION = 1;

// Función para obtener o crear la fecha de finalización
const getTargetDate = () => {
  const STORAGE_KEY = `flash_sale_target_v${FLASH_SALE_VERSION}`;
  const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000; // 3 días en milisegundos
  
  // Intentar obtener fecha guardada
  const stored = localStorage.getItem(STORAGE_KEY);
  
  if (stored) {
    const storedDate = new Date(stored);
    // Verificar si la fecha guardada aún es válida (no ha expirado)
    if (storedDate.getTime() > Date.now()) {
      return storedDate.toISOString();
    }
  }
  
  // Si no hay fecha guardada o ya expiró, crear una nueva
  const now = new Date();
  const targetDate = new Date(now.getTime() + THREE_DAYS_MS);
  
  // Guardar en localStorage
  try {
    localStorage.setItem(STORAGE_KEY, targetDate.toISOString());
  } catch (e) {
    console.warn('No se pudo guardar la fecha de flash sale en localStorage:', e);
  }
  
  return targetDate.toISOString();
};

export const flashSaleConfig = {
  // Fecha de finalización (persistente en localStorage)
  targetDate: getTargetDate(),
  
  // Productos en oferta con sus descuentos individuales y stock
  products: [
    { id: 501, discountPercentage: 20, stock: 5 },  // Logitech G203 - 20% OFF - 5 unidades
    { id: 704, discountPercentage: 10, stock: 5 },  // Producto 704 - 10% OFF - 5 unidades
    { id: 414, discountPercentage: 10, stock: 2 }   // Producto 414 - 10% OFF - 2 unidades
  ],
  
  // Habilitar/deshabilitar la oferta flash
  enabled: true
};

/**
 * EJEMPLO DE CONFIGURACIÓN:
 * 
 * Para cambiar la oferta:
 * 1. Cambia FLASH_SALE_VERSION a un nuevo número (ej: 2)
 * 2. Edita el array de productos:
 * 
 * const FLASH_SALE_VERSION = 2; // ← Cambiar esto reinicia el contador
 * 
 * export const flashSaleConfig = {
 *   targetDate: getTargetDate(), // No tocar - se calcula automáticamente
 *   products: [
 *     { id: 501, discountPercentage: 35, stock: 2 },  // Mouse - 35% OFF - ¡Últimas 2!
 *     { id: 1002, discountPercentage: 20, stock: 10 }, // Monitor - 20% OFF - 10 unidades
 *     { id: 408, discountPercentage: 25, stock: 4 }    // RAM - 25% OFF - ¡Últimas 4!
 *   ],
 *   enabled: true
 * };
 * 
 * TIPS:
 * - Si stock es ≤5, se muestra el badge "¡Últimas X!" en amarillo
 * - Si stock es >5, no se muestra badge de stock
 * - El stock que pongas aquí SOBRESCRIBE el stock del catálogo
 * - Para reiniciar el contador de 3 días, solo cambia FLASH_SALE_VERSION
 */
