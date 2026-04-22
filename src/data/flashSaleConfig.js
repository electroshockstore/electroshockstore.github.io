

// Calcular fecha objetivo (SIEMPRE 3 días / 72 horas desde ahora)
const now = new Date();
const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000; // 3 días en milisegundos
const targetDate = new Date(now.getTime() + THREE_DAYS_MS);

export const flashSaleConfig = {
  // Fecha de finalización (automática: 3 días desde ahora)
  targetDate: targetDate.toISOString(),
  
  // Productos en oferta con sus descuentos individuales y stock
  products: [
    { id: 501, discountPercentage: 20, stock: 5 },  
    { id: 704, discountPercentage: 10, stock: 5}, 
    { id: 414, discountPercentage: 10, stock: 2 }   
  ],
  

  enabled: true
};

