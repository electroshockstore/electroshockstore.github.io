// Función para convertir texto a slug URL-friendly
export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Reemplazar espacios con -
    .replace(/[^\w\-]+/g, '')       // Remover caracteres no alfanuméricos
    .replace(/\-\-+/g, '-')         // Reemplazar múltiples - con uno solo
    .replace(/^-+/, '')             // Remover - del inicio
    .replace(/-+$/, '');            // Remover - del final
};

// Función para generar SKU desde nombre de producto
export const generateSKU = (productName, brand) => {
  const brandSlug = brand ? slugify(brand) : '';
  const nameSlug = slugify(productName);
  return brandSlug ? `${brandSlug}-${nameSlug}` : nameSlug;
};

// Función para obtener categoría desde slug
export const getCategoryFromSlug = (slug) => {
  const categoryMap = {
    'todos': 'Todos',
    'fuentes': 'Fuentes',
    'almacenamiento': 'Almacenamiento',
    'memorias-ram': 'Memorias RAM',
    'motherboards': 'Motherboards',
    'procesadores': 'Procesadores',
    'refrigeracion': 'Refrigeración',
    'auriculares': 'Auriculares',
    'teclados': 'Teclados',
    'mouse': 'Mouse',
    'joystick': 'Joystick',
    'mayorista': 'Mayorista'
  };
  return categoryMap[slug] || null;
};

// Función para obtener slug desde categoría
export const getSlugFromCategory = (category) => {
  const slugMap = {
    'Todos': 'todos',
    'Fuentes': 'fuentes',
    'Almacenamiento': 'almacenamiento',
    'Memorias RAM': 'memorias-ram',
    'Motherboards': 'motherboards',
    'Procesadores': 'procesadores',
    'Refrigeración': 'refrigeracion',
    'Auriculares': 'auriculares',
    'Teclados': 'teclados',
    'Mouse': 'mouse',
    'Joystick': 'joystick',
    'Mayorista': 'mayorista'
  };
  return slugMap[category] || slugify(category);
};
