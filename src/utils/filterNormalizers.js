/**
 * Normalizadores de filtros - SOLID Single Responsibility
 * Cada función tiene una única responsabilidad de normalización
 */

// Normalizar marcas relacionadas
export const normalizeBrand = (value) => {
  const valueStr = value.toString().toLowerCase().trim();
  
  // Marcas especiales con variaciones
  if (valueStr.includes('xpg') || valueStr === 'adata') return 'ADATA';
  if (valueStr.includes('giga-byte') || valueStr.includes('gigabyte')) return 'Gigabyte';
  if (valueStr.includes('playstation') || valueStr.includes('sony')) return 'Sony/PlayStation';
  if (valueStr.includes('microsoft') || valueStr.includes('xbox')) return 'Microsoft/Xbox';
  
  // Mantener capitalización correcta para marcas conocidas
  const brandMap = {
    'gigabyte': 'Gigabyte',
    'giga-byte technology': 'Gigabyte',
    'thermaltake': 'Thermaltake',
    'aureox': 'Aureox',
    'kingston': 'Kingston',
    'adata': 'ADATA',
    'xpg': 'ADATA',
    'logitech': 'Logitech',
    'razer': 'Razer',
    'redragon': 'Redragon',
    'hyperx': 'HyperX',
    'corsair': 'Corsair',
    'asus': 'ASUS',
    'msi': 'MSI',
    'asrock': 'ASRock',
    'amd': 'AMD',
    'intel': 'Intel',
    'nvidia': 'NVIDIA',
    'western digital': 'Western Digital',
    'wd': 'WD',
    'seagate': 'Seagate',
    'sandisk': 'SanDisk',
    'samsung': 'Samsung',
    'crucial': 'Crucial',
    'patriot': 'Patriot',
    'lexar': 'Lexar',
    'netac': 'Netac',
    'hiksemi': 'Hiksemi'
  };
  
  return brandMap[valueStr] || value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};

// Normalizar RGB/Iluminación
export const normalizeRGB = (value) => {
  const valueStr = value.toString().toLowerCase().trim();
  
  const hasRGB = valueStr === 'sí' || valueStr === 'si' || 
                 valueStr.includes('rgb') || valueStr.includes('argb') ||
                 valueStr === 'yes' || valueStr === 'true';
  
  return hasRGB ? 'RGB' : 'Sin RGB';
};

// Normalizar tipo de memoria (DDR)
export const normalizeMemoryType = (value) => {
  const valueStr = value.toString().toLowerCase().trim();
  
  if (valueStr.includes('ddr5')) return 'DDR5';
  if (valueStr.includes('ddr4')) return 'DDR4';
  if (valueStr.includes('ddr3')) return 'DDR3';
  if (valueStr.includes('ddr2')) return 'DDR2';
  
  return value.toUpperCase();
};

// Normalizar conectividad
export const normalizeConnectivity = (value) => {
  const valueStr = value.toString().toLowerCase().trim();
  
  const isWireless = valueStr.includes('inalámbrico') || valueStr.includes('wireless') || 
                     valueStr.includes('bluetooth') || valueStr === 'sí' || valueStr.includes('2.4');
  
  return isWireless ? 'Inalámbrico' : 'Alámbrico';
};

// Normalizar conectividad para teclados (detecta cualquier tipo de inalámbrico)
export const normalizeKeyboardConnectivity = (value) => {
  const valueStr = value.toString().toLowerCase().trim();
  
  // Detectar inalámbrico (Bluetooth, 2.4GHz, Wireless, Dongle)
  const isWireless = valueStr.includes('inalámbrico') || 
                     valueStr.includes('wireless') || 
                     valueStr.includes('bluetooth') || 
                     valueStr.includes('2.4ghz') ||
                     valueStr.includes('2.4 ghz') ||
                     valueStr.includes('dongle') ||
                     valueStr.includes('triple modo') ||
                     valueStr.includes('3 modos');
  
  return isWireless ? 'Inalámbrico' : 'Alámbrico';
};

// Normalizar tipo de conexión para auriculares (simple: Alámbrico o Inalámbrico)
export const normalizeHeadphoneConnection = (value) => {
  const valueStr = value.toString().toLowerCase().trim();
  
  // Detectar inalámbrico (Bluetooth, USB wireless, Lightspeed, etc.)
  const isWireless = valueStr.includes('bluetooth') || 
                     valueStr.includes('inalámbrico') || 
                     valueStr.includes('wireless') || 
                     valueStr.includes('2.4ghz') || 
                     valueStr.includes('lightspeed');
  
  return isWireless ? 'Inalámbrico' : 'Alámbrico';
};

// Normalizar compatibilidad para auriculares (simple: PC, Consola o Multiplataforma)
export const normalizeHeadphoneCompatibility = (value) => {
  const valueStr = value.toString().toLowerCase().trim();
  
  const hasPC = valueStr.includes('pc') || valueStr.includes('windows');
  const hasConsole = valueStr.includes('ps4') || valueStr.includes('ps5') || 
                     valueStr.includes('playstation') || valueStr.includes('xbox') || 
                     valueStr.includes('switch') || valueStr.includes('consola');
  const hasMobile = valueStr.includes('android') || valueStr.includes('ios') || 
                    valueStr.includes('celular') || valueStr.includes('móvil') ||
                    valueStr.includes('tablet') || valueStr.includes('dispositivos móviles');
  
  // Si tiene PC + Consola, o más de 2 plataformas = Multiplataforma
  const platformCount = (hasPC ? 1 : 0) + (hasConsole ? 1 : 0) + (hasMobile ? 1 : 0);
  
  if (platformCount >= 2) return 'Multiplataforma';
  if (hasConsole) return 'Consola';
  if (hasPC) return 'PC';
  
  return 'Multiplataforma'; // Por defecto
};

// Normalizar batería
export const normalizeBattery = (value) => {
  const valueStr = value.toString().toLowerCase().trim();
  
  const isInternal = valueStr.includes('recargable') || valueStr.includes('interna') || 
                     valueStr.includes('li-ion') || valueStr.includes('litio');
  
  return isInternal ? 'Batería Interna' : 'Pilas AA';
};

// Normalizar compatibilidad
export const normalizeCompatibility = (value) => {
  const valueStr = value.toString().toLowerCase().trim();
  
  const hasPC = valueStr.includes('pc') || valueStr.includes('windows');
  const hasConsole = valueStr.includes('ps') || valueStr.includes('xbox') || 
                     valueStr.includes('switch') || valueStr.includes('playstation');
  const hasMobile = valueStr.includes('android') || valueStr.includes('ios') || 
                    valueStr.includes('celular');
  
  if (hasPC && hasConsole && hasMobile) return 'PC/Consolas/Android';
  if (hasPC && hasConsole) return 'PC/Consolas';
  if (hasConsole) return 'Consolas';
  if (hasPC) return 'PC';
  
  return value;
};

// Normalizar potencia
export const normalizePower = (value) => {
  const match = value.toString().match(/(\d+)\s*w/i);
  return match ? `${match[1]}W` : value;
};

// Normalizar certificación
export const normalizeCertification = (value) => {
  const valueStr = value.toString().toLowerCase();
  
  if (valueStr.includes('gold')) return '80 Plus Gold';
  if (valueStr.includes('bronze')) return '80 Plus Bronze';
  if (valueStr.includes('white')) return '80 Plus White';
  if (valueStr.includes('silver')) return '80 Plus Silver';
  if (valueStr.includes('sin')) return 'Sin certificación';
  
  return value;
};

// Normalizar capacidad
export const normalizeCapacity = (value) => {
  const match = value.toString().match(/(\d+)\s*(gb|tb)/i);
  if (match) {
    const num = match[1];
    const unit = match[2].toUpperCase();
    return `${num}${unit}`;
  }
  return value;
};

// Normalizar arquitectura
export const normalizeArchitecture = (value) => {
  const valueStr = value.toString().toLowerCase();
  
  if (valueStr.includes('mecánico') && valueStr.includes('inalámbrico')) return 'Inalámbrico';
  if (valueStr.includes('membrana') && valueStr.includes('inalámbrico')) return 'Inalámbrico';
  if (valueStr.includes('mecánico')) return 'Mecánico';
  if (valueStr.includes('membrana')) return 'Membrana';
  
  return value;
};

// Normalizar sensor
export const normalizeSensor = (value) => {
  const valueStr = value.toString().toLowerCase();
  
  if (valueStr.includes('óptico')) return 'Óptico';
  if (valueStr.includes('láser')) return 'Láser';
  
  return value;
};

// Normalizar DPI
export const normalizeDPI = (value) => {
  const match = value.toString().match(/(\d+)/);
  return match ? `${match[1]} DPI` : value;
};

// Normalizar formato de almacenamiento
export const normalizeStorageFormat = (value) => {
  const valueStr = value.toString().toLowerCase().trim();
  
  // Externo - debe detectarse primero
  if (valueStr.includes('externo') || valueStr.includes('portable') || valueStr.includes('hdd externo') || valueStr.includes('elements')) {
    return 'Externo';
  }
  
  // M.2 (cualquier variante: M.2 2280, M.2 NVMe, NVMe, PCIe Gen)
  if (valueStr.includes('m.2') || valueStr.includes('m2') || 
      valueStr.includes('nvme') || valueStr.includes('pcie gen')) {
    return 'M.2';
  }
  
  // SSD 2.5" SATA
  if (valueStr.includes('2.5') || (valueStr.includes('sata') && !valueStr.includes('3.5') && !valueStr.includes('externo'))) {
    return 'SATA';
  }
  
  // HDD 3.5"
  if (valueStr.includes('3.5')) {
    return 'HDD';
  }
  
  return value;
};

// Mapa de normalizadores por tipo de filtro
const NORMALIZER_MAP = {
  'marca': normalizeBrand,
  'Marca': normalizeBrand,
  'Marca de la fuente': normalizeBrand,
  'rgb': normalizeRGB,
  'iluminacionRGB': normalizeRGB,
  'Iluminación': normalizeRGB,
  'tipoMemoriaRAM': normalizeMemoryType,
  'tipoMemoria': normalizeMemoryType,
  'tipoConectividad': normalizeConnectivity,
  'Conectividad': normalizeKeyboardConnectivity,
  'Tipo de conexión': normalizeHeadphoneConnection,
  'inalambrico': normalizeConnectivity,
  'tipoBateria': normalizeBattery,
  'bateria': normalizeBattery,
  'compatibilidad': normalizeCompatibility,
  'Compatibilidad': normalizeHeadphoneCompatibility,
  'Potencia': normalizePower,
  'Potencia Continua': normalizePower,
  'Certificacion': normalizeCertification,
  'Certificación': normalizeCertification,
  'capacidadTotal': normalizeCapacity,
  'Capacidad': normalizeCapacity,
  'Capacidad total': normalizeCapacity,
  'Arquitectura': normalizeArchitecture,
  'tipoSensor': normalizeSensor,
  'dpi': normalizeDPI,
  'formato': normalizeStorageFormat,
  'Factor de forma': normalizeStorageFormat,
  'Formato': normalizeStorageFormat,
  'Tipo': normalizeStorageFormat
};

/**
 * Función principal de normalización
 * Aplica el normalizador correspondiente según el tipo de filtro
 */
export const normalizeFilterValue = (filterType, value) => {
  if (!value) return null;
  
  const normalizer = NORMALIZER_MAP[filterType];
  return normalizer ? normalizer(value) : value;
};
