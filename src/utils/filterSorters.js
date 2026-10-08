/**
 * Funciones de ordenamiento personalizadas para filtros
 * SOLID: Single Responsibility - Cada función ordena un tipo específico
 * Las claves se resuelven a canónicas (ver filterConfig.getFilterKey).
 */
import { getFilterKey } from './filterConfig.js';

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
 * 1. M.2 / NVMe
 * 2. SATA (SSD 2.5")
 * 3. HDD (3.5")
 * 4. Externo
 * (Coincide con los valores normalizados de normalizeStorageFormat)
 */
export const sortStorageFormat = (a, b) => {
  const order = {
    'M.2': 1,
    'SATA': 2,
    'HDD': 3,
    'Externo': 4
  };

  const orderA = order[a] || 999;
  const orderB = order[b] || 999;

  if (orderA !== orderB) return orderA - orderB;
  return a.localeCompare(b);
};

/**
 * Ordena potencia / TDP por número ("550W", "120 W")
 */
export const sortPower = (a, b) => {
  const num = (s) => {
    const m = s.match(/(\d+(?:[.,]\d+)?)/);
    return m ? parseFloat(m[1].replace(',', '.')) : 0;
  };
  return num(a) - num(b);
};

/**
 * Ordena tamaños de monitor ("19 pulgadas" < "24 pulgadas")
 */
export const sortMonitorSize = (a, b) => {
  const num = (s) => {
    const m = s.match(/(\d+(?:[.,]\d+)?)/);
    return m ? parseFloat(m[1].replace(',', '.')) : 0;
  };
  return num(a) - num(b);
};

/**
 * Mapa de funciones de ordenamiento por tipo de filtro (claves canónicas)
 */
export const SORTER_MAP = {
  'Capacidad': sortCapacity,
  'Memoria': sortCapacity,
  'Memoria RAM': sortCapacity,
  'Almacenamiento': sortCapacity,
  'Formato': sortStorageFormat,
  'Potencia': sortPower,
  'TDP': sortPower,
  'Tamaño pantalla': sortMonitorSize,
  'Frecuencia base': sortPower,
  'Frecuencia refresco': sortPower,
  'DPI': sortPower
};

/**
 * Obtiene la función de ordenamiento para un tipo de filtro
 * Si no existe, retorna ordenamiento alfabético por defecto
 * (resuelve alias a clave canónica primero)
 */
export const getSorterForFilter = (filterType) => {
  return SORTER_MAP[getFilterKey(filterType)] || SORTER_MAP[filterType] || ((a, b) => a.localeCompare(b));
};
