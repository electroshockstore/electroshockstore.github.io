/**
 * Configuración de filtros por categoría - SOLID Open/Closed Principle
 * Fácil de extender sin modificar el código existente
 */

// Filtros importantes por categoría (máximo 4-5 por categoría)
export const CATEGORY_FILTERS = {
  'Memoria RAM': ['Marca', 'Iluminación', 'Tipo de memoria', 'Capacidad', 'Formato'],
  'Memorias RAM': ['Marca', 'Iluminación', 'Tipo de memoria', 'Capacidad', 'Formato'],
  'Procesadores': ['Marca', 'Socket', 'Núcleos', 'Frecuencia base', 'TDP'],
  'Motherboards': ['Marca', 'Socket', 'Chipset', 'Formato'],
  'Fuentes': ['Marca', 'Potencia', 'Certificación', 'Cableado'],
  'Teclados': ['Marca', 'Arquitectura', 'Iluminación', 'Conectividad'],
  'Mouse': ['Marca', 'Iluminación', 'Sensor', 'DPI', 'Conectividad'],
  'Auriculares': ['Marca', 'Conectividad', 'Compatibilidad'],
  'Joystick': ['Marca', 'Conectividad', 'Compatibilidad', 'Batería'],
  'Almacenamiento': ['Marca', 'Capacidad', 'Formato', 'Interfaz'],
  'Refrigeración': ['Marca', 'Iluminación', 'TDP', 'Socket'],
  'Placas de Video': ['Marca', 'Memoria', 'Arquitectura'],
  'Monitores': ['Marca', 'Tamaño pantalla', 'Tipo de panel', 'Resolución'],
  'Portátiles': ['Marca', 'Memoria RAM', 'Almacenamiento'],
  'Conectividad': ['Marca', 'Interfaz', 'Compatibilidad']
};

// Mapeo de claves alternativas a clave principal (para compatibilidad con datos antiguos)
export const FILTER_KEY_ALIASES = {
  // RGB/Iluminación
  'iluminacionRGB': 'Iluminación',
  'iluminacion': 'Iluminación',
  'RGB': 'Iluminación',
  'rgb': 'Iluminación',
  'Retroiluminación': 'Iluminación',
  'IluminaciÃ³n': 'Iluminación',
  'Iluminación RGB': 'Iluminación',
  
  // Tipo de memoria
  'tipoMemoria': 'Tipo de memoria',
  'tipoMemoriaRAM': 'Tipo de memoria',
  'TipoMemoria': 'Tipo de memoria',
  'Tipo memoria': 'Tipo de memoria',
  'memoria': 'Memoria',
  'memoriaRam': 'Memoria RAM',
  'almacenamiento': 'Almacenamiento',
  
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
  'Factor de Forma y Tipo': 'Formato',
  'Tipo de switch': 'Tipo de switch',

  'interfaz': 'Interfaz',
  'Protocolo': 'Interfaz',
  'Conector': 'Interfaz',
  
  // Potencia (fuentes)
  'Potencia Continua': 'Potencia',
  
  // Certificación (fuentes)
  'Certificacion': 'Certificación',
  'CertificaciÃ³n': 'Certificación',
  'Eficiencia': 'Certificación',

  // Conectividad
  'conectividad': 'Conectividad',
  'tipoConectividad': 'Conectividad',
  'Tipo de conexión': 'Conectividad',
  'Conexión': 'Conectividad',
  'bluetooth': 'Conectividad',
  'inalambrico': 'Conectividad',
  
  // Sensor
  'tipoSensor': 'Sensor',
  
  // DPI
  'dpi': 'DPI',
  
  // Socket
  'socket': 'Socket',

  // Núcleos
  'nucleos': 'Núcleos',
  'Nucleos': 'Núcleos',
  'hilos': 'Núcleos',

  // Chipset
  'chipset': 'Chipset',

  // TDP
  'tdp': 'TDP',
  'Consumo_TDP': 'TDP',
  'consumoTDP': 'TDP',
  'consumo': 'TDP',
  'Consumo energético': 'TDP',
  'tdpSoportado': 'TDP',

  // Arquitectura
  'arquitectura': 'Arquitectura',
  'Arquitectura del teclado': 'Arquitectura',

  'tamanoPantalla': 'Tamaño pantalla',
  'Tamaño Pantalla': 'Tamaño pantalla',
  'tipoPanel': 'Tipo de panel',
  'Tipo de panel': 'Tipo de panel',
  'resolucion': 'Resolución',
  'Resolución comercial': 'Resolución',
  'frecuenciaActualizacion': 'Frecuencia refresco',
  'Frecuencia refresco': 'Frecuencia refresco',

  // Batería
  'bateria': 'Batería',
  'tipoBateria': 'Batería',
  'Bateria': 'Batería',
  'Autonomía': 'Batería',
  'AutonomÃ­a': 'Batería',
  'capacidadBateria': 'Batería',

  // Compatibilidad
  'compatibilidad': 'Compatibilidad',

  // Frecuencia
  'frecuenciaBase': 'Frecuencia base',
  'FrecuenciaBase': 'Frecuencia base',
  'Frecuencia': 'Frecuencia base',
  'frecuenciaTurbo': 'Frecuencia base',
  'Frecuencia turbo': 'Frecuencia base',
  'frecuencias': 'Frecuencia base',
  'Velocidad': 'Frecuencia base',

  // Línea
  'linea': 'Línea',
  'Linea': 'Línea',
  'LÃ­nea': 'Línea',

  'Modular': 'Cableado'
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
  'TDP': 'TDP',
  'Socket': 'Socket',
  'Tamaño del ventilador': 'Tamaño',
  'Memoria': 'Memoria VRAM',
  'Memoria RAM': 'Memoria RAM',
  'Tamaño pantalla': 'Tamaño',
  'Tipo de panel': 'Panel',
  'Resolución': 'Resolución',
  'Frecuencia refresco': 'Frecuencia',
  'Interfaz': 'Interfaz',
  'Almacenamiento': 'Almacenamiento'
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

const REVERSE_ALIAS_MAP = (() => {
  const map = {};
  for (const [alias, canonical] of Object.entries(FILTER_KEY_ALIASES)) {
    if (!map[canonical]) map[canonical] = [];
    map[canonical].push(alias);
  }
  return map;
})();

export const getSpecValue = (specifications, filterType) => {
  if (!specifications) return undefined;
  if (specifications[filterType] != null) return specifications[filterType];
  const canonical = FILTER_KEY_ALIASES[filterType];
  if (canonical && specifications[canonical] != null) return specifications[canonical];
  const variants = REVERSE_ALIAS_MAP[filterType];
  if (!variants) return undefined;
  for (const key of variants) {
    if (specifications[key] != null) return specifications[key];
  }
  return undefined;
};
