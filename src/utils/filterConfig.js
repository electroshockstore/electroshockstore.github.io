/**
 * Configuración de filtros por categoría - SOLID Open/Closed Principle
 * Fácil de extender sin modificar el código existente
 */

// Filtros importantes por categoría (máximo 4-5 por categoría)
export const CATEGORY_FILTERS = {
  'Memoria RAM': ['Marca', 'Iluminación', 'Tipo de memoria', 'Capacidad', 'Formato'],
  'Memorias RAM': ['Marca', 'Iluminación', 'Tipo de memoria', 'Capacidad', 'Formato'],
  'Procesadores': ['Marca', 'Socket', 'Núcleos', 'Frecuencia base'],
  'Motherboards': ['Marca', 'Socket', 'Chipset', 'Formato'],
  'Fuentes': ['Marca', 'Potencia', 'Certificación', 'Cableado'],
  'Teclados': ['Marca', 'Arquitectura', 'Iluminación', 'Conectividad'],
  'Mouse': ['Marca', 'Iluminación', 'Sensor', 'DPI', 'Conectividad'],
  'Auriculares': ['Marca', 'Tipo de conexión', 'Compatibilidad'],
  'Joystick': ['Marca', 'Conectividad', 'Compatibilidad', 'Batería'],
  'Almacenamiento': ['Marca', 'Capacidad', 'Formato'],
  'Refrigeración': ['Marca', 'Tipo', 'TDP', 'Tamaño del ventilador']
};

// Mapeo de claves alternativas a clave principal (para compatibilidad con datos antiguos)
export const FILTER_KEY_ALIASES = {
  // RGB/Iluminación
  'iluminacionRGB': 'Iluminación',
  'RGB': 'Iluminación',
  'rgb': 'Iluminación',
  'IluminaciÃ³n': 'Iluminación',
  
  // Tipo de memoria
  'tipoMemoria': 'Tipo de memoria',
  'tipoMemoriaRAM': 'Tipo de memoria',
  'tipo': 'Tipo de memoria',
  'TipoMemoria': 'Tipo de memoria',
  'Tipo memoria': 'Tipo de memoria',
  
  // Marca
  'marca': 'Marca',
  'MARCA': 'Marca',
  'brand': 'Marca',
  'Marca de la fuente': 'Marca',
  
  // Capacidad
  'capacidad': 'Capacidad',
  'capacidadTotal': 'Capacidad',
  'Capacidad total': 'Capacidad',
  'Capacidad Total': 'Capacidad',
  
  // Formato (almacenamiento)
  'formato': 'Formato',
  'Factor de forma': 'Formato',
  'factorDeForma': 'Formato',
  'Tipo': 'Formato',
  
  // Potencia (fuentes)
  'Potencia Continua': 'Potencia',
  
  // Certificación (fuentes)
  'Certificacion': 'Certificación',
  'CertificaciÃ³n': 'Certificación',
  
  // Conectividad
  'conectividad': 'Conectividad',
  'tipoConectividad': 'Tipo de conexión',
  
  // Sensor
  'tipoSensor': 'Sensor',
  
  // DPI
  'dpi': 'DPI',
  
  // Socket
  'socket': 'Socket',
  
  // Núcleos
  'nucleos': 'Núcleos',
  
  // Chipset
  'chipset': 'Chipset',
  
  // TDP
  'tdp': 'TDP',
  'Consumo_TDP': 'TDP',
  'consumoTDP': 'TDP',
  
  // Arquitectura
  'arquitectura': 'Arquitectura',
  
  // Batería
  'bateria': 'Batería',
  'tipoBateria': 'Batería',
  
  // Compatibilidad
  'compatibilidad': 'Compatibilidad',
  
  // Frecuencia
  'frecuenciaBase': 'Frecuencia base',
  'Frecuencia': 'Frecuencia base',
  
  // Línea
  'linea': 'Línea',
  'LÃ­nea': 'Línea'
};

// Labels amigables para mostrar en UI
export const FILTER_LABELS = {
  // Memoria RAM
  'Marca': 'Marca',
  'Iluminación': 'Iluminación RGB',
  'Tipo de memoria': 'Tipo de Memoria',
  'Capacidad': 'Capacidad',
  // Procesadores
  'Socket': 'Socket',
  'Núcleos': 'Núcleos',
  'Frecuencia base': 'Frecuencia',
  // Motherboards
  'Chipset': 'Chipset',
  'Formato': 'Formato',
  // Fuentes
  'Potencia': 'Potencia',
  'Certificación': 'Certificación',
  'Cableado': 'Cableado',
  // Teclados
  'Arquitectura': 'Tipo',
  'Conectividad': 'Conexión',
  // Mouse
  'Sensor': 'Sensor',
  'DPI': 'DPI',
  // Auriculares
  'Compatibilidad': 'Compatibilidad',
  'Tipo de conexión': 'Tipo de Conexión',
  // Joystick
  'Batería': 'Batería',
  // Almacenamiento
  'Interfaz': 'Interfaz',
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
