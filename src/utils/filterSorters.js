/**
 * Funciones de ordenamiento personalizadas para filtros
 * SOLID: Single Responsibility - Cada función ordena un tipo específico
 */

/**
 * Ordena capacidades de menor a mayor (240GB, 256GB, 480GB, 500GB, 512GB, 960GB, 1TB, 2TB, 4TB)
 */
export const sortCapacity = (a, b) => {
  // Extraer número y unidad
  const extractValue = (str) => {
    const match = str.match(/(\d+)\s*(GB|TB)/i);
    if (!match) return 0;
    
    const num = parseInt(match[1]);
    const unit = match[2].toUpperCase();
    
    // Convertir todo a GB para comparar
    return unit === 'TB' ? num * 1000 : num;
  };
  
  return extractValue(a) - extractValue(b);
};

/**
 * Ordena formatos de almacenamiento en orden específico:
 * 1. SSD 2.5" (SATA)
 * 2. M.2, NVMe
 * 3. HDD
 * 4. Externo
 */
export const sortStorageFormat = (a, b) => {
  const order = {
    'SSD 2.5" (SATA)': 1,
    'M.2, NVMe': 2,
    'HDD': 3,
    'Externo': 4
  };
  
  const orderA = order[a] || 999;
  const orderB = order[b] || 999;
  
  return orderA - orderB;
};

/**
 * Mapa de funciones de ordenamiento por tipo de filtro
 */
export const SORTER_MAP = {
  'capacidadTotal': sortCapacity,
  'Capacidad': sortCapacity,
  'capacidad': sortCapacity,
  'formato': sortStorageFormat,
  'Formato': sortStorageFormat,
  'Factor de forma': sortStorageFormat
};

/**
 * Obtiene la función de ordenamiento para un tipo de filtro
 * Si no existe, retorna ordenamiento alfabético por defecto
 */
export const getSorterForFilter = (filterType) => {
  return SORTER_MAP[filterType] || ((a, b) => a.localeCompare(b));
};
