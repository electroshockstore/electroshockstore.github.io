/**
 * Configuración de filtros por categoría - SOLID Open/Closed Principle
 * Fácil de extender sin modificar el código existente
 */

// Filtros importantes por categoría (máximo 4-5 por categoría)
export const CATEGORY_FILTERS = {
  'Memoria RAM': ['marca', 'rgb', 'tipoMemoriaRAM', 'capacidadTotal', 'formato'],
  'Memorias RAM': ['marca', 'rgb', 'tipoMemoriaRAM', 'capacidadTotal', 'formato'],
  'Procesadores': ['marca', 'socket', 'nucleos', 'frecuenciaBase'],
  'Motherboards': ['marca', 'socket', 'chipset', 'formato'],
  'Fuentes': ['Marca', 'Potencia', 'Certificacion', 'Cableado'],
  'Teclados': ['Marca', 'Arquitectura', 'Iluminación', 'Conectividad'],
  'Mouse': ['marca', 'rgb', 'tipoSensor', 'dpi', 'tipoConectividad'],
  'Auriculares': ['Marca', 'Tipo de conexión', 'Compatibilidad'],
  'Joystick': ['marca', 'inalambrico', 'compatibilidad', 'tipoBateria'],
  'Almacenamiento': ['marca', 'capacidadTotal', 'formato'],
  'Refrigeración': ['Marca', 'Tipo', 'TDP', 'Tamaño del ventilador']
};

// Mapeo de claves alternativas a clave principal
export const FILTER_KEY_ALIASES = {
  // RGB
  'iluminacionRGB': 'rgb',
  'Iluminación': 'rgb',
  'RGB': 'rgb',
  
  // Tipo de memoria
  'tipoMemoria': 'tipoMemoriaRAM',
  'Tipo de memoria': 'tipoMemoriaRAM',
  'tipo': 'tipoMemoriaRAM',
  
  // Marca
  'MARCA': 'Marca',
  'brand': 'Marca',
  'Marca de la fuente': 'Marca',
  
  // Capacidad
  'Capacidad total': 'capacidadTotal',
  'Capacidad Total': 'capacidadTotal',
  'capacidad': 'capacidadTotal',
  'Capacidad': 'capacidadTotal',
  
  // Formato (almacenamiento)
  'Factor de forma': 'formato',
  'Formato': 'formato',
  'Tipo': 'formato',
  'factorDeForma': 'formato',
  
  // Potencia (fuentes)
  'Potencia Continua': 'Potencia',
  
  // Certificación (fuentes)
  'Certificación': 'Certificacion',
  
  // Conexión (auriculares) - Conectividad es alias de Tipo de conexión
  'Conectividad': 'Tipo de conexión'
};

// Labels amigables para mostrar en UI
export const FILTER_LABELS = {
  // Memoria RAM
  'marca': 'Marca',
  'rgb': 'Iluminación RGB',
  'tipoMemoriaRAM': 'Tipo de Memoria',
  'capacidadTotal': 'Capacidad',
  // Procesadores
  'socket': 'Socket',
  'nucleos': 'Núcleos',
  'frecuenciaBase': 'Frecuencia',
  // Motherboards
  'chipset': 'Chipset',
  'formato': 'Formato',
  // Fuentes
  'Marca': 'Marca',
  'Potencia': 'Potencia',
  'Certificacion': 'Certificación',
  'Cableado': 'Cableado',
  // Teclados
  'Arquitectura': 'Tipo',
  'Iluminación': 'Iluminación RGB',
  'Conectividad': 'Conexión',
  // Mouse
  'tipoSensor': 'Sensor',
  'dpi': 'DPI',
  'tipoConectividad': 'Conexión',
  // Auriculares
  'Compatibilidad': 'Compatibilidad',
  'Tipo de conexión': 'Tipo de Conexión',
  // Joystick
  'inalambrico': 'Conexión',
  'compatibilidad': 'Compatibilidad',
  'tipoBateria': 'Batería',
  // Almacenamiento
  'Capacidad': 'Capacidad',
  'Interfaz': 'Interfaz',
  'Factor de forma': 'Formato',
  'formato': 'Formato',
  'Formato': 'Formato',
  'Tipo': 'Formato',
  // Refrigeración
  'Tipo': 'Tipo',
  'TDP': 'TDP',
  'Tamaño del ventilador': 'Tamaño'
};

/**
 * Obtiene los filtros permitidos para una categoría
 */
export const getAllowedFilters = (category) => {
  return CATEGORY_FILTERS[category] || [];
};

/**
 * Obtiene la clave principal de un filtro (resuelve aliases)
 */
export const getFilterKey = (key) => {
  return FILTER_KEY_ALIASES[key] || key;
};

/**
 * Obtiene el label amigable de un filtro
 */
export const getFilterLabel = (key) => {
  return FILTER_LABELS[key] || key;
};
