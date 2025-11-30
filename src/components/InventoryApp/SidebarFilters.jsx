import { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, X, SlidersHorizontal } from 'lucide-react';
import { useStock } from '../../context/StockContext';

// Función para normalizar valores complejos a opciones simples
const normalizeValue = (key, value) => {
    if (!value) return null;
    
    const valueStr = value.toString().toLowerCase();
    
    // Marca (normalizar para joystick)
    if (key === 'marca') {
      if (valueStr.includes('playstation') || valueStr.includes('sony')) return 'Sony/PlayStation';
      if (valueStr.includes('microsoft') || valueStr.includes('xbox')) return 'Microsoft/Xbox';
      return value;
    }
    
    // Iluminación
    if (key === 'Iluminación' || key === 'iluminacionRGB') {
      if (valueStr.includes('rgb') || valueStr.includes('argb')) return 'RGB';
      if (valueStr.includes('no') || valueStr.includes('sin') || valueStr.includes('posee')) return 'Sin RGB';
      return 'RGB';
    }
    
    // Conexión/Conectividad
    if (key === 'Conectividad' || key === 'Tipo de conexión' || key === 'inalambrico' || key === 'tipoConectividad') {
      if (valueStr.includes('inalámbrico') || valueStr.includes('wireless') || valueStr.includes('bluetooth') || valueStr.includes('sí') || valueStr.includes('2.4')) return 'Inalámbrico';
      if (valueStr.includes('alámbrico') || valueStr.includes('cable') || valueStr.includes('usb') || valueStr.includes('3.5') || valueStr.includes('no') || valueStr.includes('gaming, cableado')) return 'Alámbrico';
      return value;
    }
    
    // Sensor
    if (key === 'tipoSensor') {
      if (valueStr.includes('óptico')) return 'Óptico';
      if (valueStr.includes('láser')) return 'Láser';
      return value;
    }
    
    // DPI
    if (key === 'dpi') {
      const match = valueStr.match(/(\d+)/);
      if (match) return `${match[1]} DPI`;
      return value;
    }
    
    // Compatibilidad (simplificado para joystick)
    if (key === 'Compatibilidad' || key === 'compatibilidad') {
      const hasPC = valueStr.includes('pc') || valueStr.includes('windows');
      const hasConsole = valueStr.includes('ps') || valueStr.includes('xbox') || valueStr.includes('switch') || valueStr.includes('playstation');
      const hasMobile = valueStr.includes('android') || valueStr.includes('ios') || valueStr.includes('celular');
      
      if (hasPC && hasConsole && hasMobile) return 'PC/Consolas/Android';
      if (hasPC && hasConsole) return 'PC/Consolas';
      if (hasConsole) return 'Consolas';
      if (hasPC) return 'PC';
      return value;
    }
    
    // Potencia (simplificar)
    if (key === 'Potencia') {
      const match = valueStr.match(/(\d+)\s*w/);
      if (match) return `${match[1]}W`;
      return value;
    }
    
    // Certificación (simplificar)
    if (key === 'Certificacion') {
      if (valueStr.includes('gold')) return '80 Plus Gold';
      if (valueStr.includes('bronze')) return '80 Plus Bronze';
      if (valueStr.includes('white')) return '80 Plus White';
      if (valueStr.includes('silver')) return '80 Plus Silver';
      if (valueStr.includes('sin')) return 'Sin certificación';
      return value;
    }
    
    // Capacidad (simplificar)
    if (key === 'Capacidad' || key === 'Capacidad total' || key === 'capacidadTotal') {
      const match = valueStr.match(/(\d+)\s*(gb|tb)/);
      if (match) {
        const num = match[1];
        const unit = match[2].toUpperCase();
        return `${num}${unit}`;
      }
      return value;
    }
    
    // Tipo de memoria
    if (key === 'tipoMemoriaRAM') {
      return value.toUpperCase();
    }
    
    // Arquitectura/Tipo
    if (key === 'Arquitectura') {
      if (valueStr.includes('mecánico')) return 'Mecánico';
      if (valueStr.includes('membrana')) return 'Membrana';
      return value;
    }
    
    // Batería (para joystick)
    if (key === 'tipoBateria' || key === 'bateria') {
      if (valueStr.includes('recargable') || valueStr.includes('interna') || valueStr.includes('li-ion') || valueStr.includes('litio')) return 'Batería Interna';
      if (valueStr.includes('pilas aa') || valueStr.includes('aa (')) return 'Pilas AA';
      return value;
    }
    
    return value;
};

const SidebarFilters = ({ selectedCategory, filters, onFilterChange, onClearFilters }) => {
  const [expandedSections, setExpandedSections] = useState({});
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const { products } = useStock();

  const categoryFilters = useMemo(() => {
    if (selectedCategory === 'Todos') return {};

    const categoryProducts = products.filter(p => p.category === selectedCategory);
    const dynamicFilters = {};

    // Definir filtros importantes por categoría (máximo 5)
    const importantFilters = {
      'Memoria RAM': ['marca', 'iluminacionRGB', 'tipoMemoriaRAM', 'capacidadTotal'],
      'Memorias RAM': ['marca', 'iluminacionRGB', 'tipoMemoriaRAM', 'capacidadTotal'],
      'Procesadores': ['marca', 'socket', 'nucleos', 'frecuenciaBase'],
      'Motherboards': ['marca', 'socket', 'chipset', 'formato'],
      'Fuentes': ['Marca', 'Potencia', 'Certificacion', 'Cableado'],
      'Teclados': ['Marca', 'Arquitectura', 'Iluminación', 'Conectividad'],
      'Mouse': ['marca', 'iluminacionRGB', 'tipoSensor', 'dpi', 'tipoConectividad'],
      'Auriculares': ['Marca', 'Tipo de conexión', 'Compatibilidad'],
      'Joystick': ['marca', 'inalambrico', 'compatibilidad', 'tipoBateria'],
      'Almacenamiento': ['Marca', 'Capacidad', 'Interfaz', 'Factor de forma'],
      'Refrigeración': ['Marca', 'Tipo', 'TDP', 'Tamaño del ventilador']
    };

    const allowedFilters = importantFilters[selectedCategory] || [];

    categoryProducts.forEach(product => {
      if (product.specifications) {
        Object.entries(product.specifications).forEach(([key, value]) => {
          // Solo incluir filtros importantes
          if (allowedFilters.includes(key)) {
            if (!dynamicFilters[key]) {
              dynamicFilters[key] = new Set();
            }
            if (value && typeof value === 'string') {
              const normalized = normalizeValue(key, value);
              if (normalized) {
                dynamicFilters[key].add(normalized);
              }
            }
          }
        });
      }
    });

    const result = {};
    Object.entries(dynamicFilters).forEach(([key, valueSet]) => {
      if (valueSet.size > 0) {
        result[key] = Array.from(valueSet).sort();
      }
    });

    return result;
  }, [selectedCategory, products]);

  const totalProducts = useMemo(() => {
    return products.filter(p => p.category === selectedCategory).length;
  }, [products, selectedCategory]);

  const hasActiveFilters = Object.values(filters).some(arr => arr && arr.length > 0);

  if (selectedCategory === 'Todos' || Object.keys(categoryFilters).length === 0) {
    return null;
  }

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFilterToggle = (filterType, value) => {
    const currentFilters = filters[filterType] || [];
    const newFilters = currentFilters.includes(value)
      ? currentFilters.filter(v => v !== value)
      : [...currentFilters, value];

    onFilterChange(filterType, newFilters);
  };

  const formatFilterLabel = (key) => {
    const labels = {
      // Memoria RAM
      'marca': 'Marca',
      'iluminacionRGB': 'Iluminación',
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
      'Iluminación': 'Iluminación',
      'Conectividad': 'Conexión',
      // Mouse
      'tipoSensor': 'Sensor',
      'dpi': 'DPI',
      'tipoConectividad': 'Conexión',
      'Sensor del mouse': 'Sensor',
      'DPI del mouse': 'DPI',
      'Tipo de conexión': 'Conexión',
      // Auriculares
      'Compatibilidad': 'Compatibilidad',
      // Joystick
      'inalambrico': 'Conexión',
      'compatibilidad': 'Compatibilidad',
      'tipoBateria': 'Batería',
      // Almacenamiento
      'Capacidad': 'Capacidad',
      'Interfaz': 'Interfaz',
      'Factor de forma': 'Formato',
      // Refrigeración
      'Tipo': 'Tipo',
      'TDP': 'TDP',
      'Tamaño del ventilador': 'Tamaño'
    };
    return labels[key] || key;
  };

  return (
    <div className="w-full lg:w-80">
      {/* Botón para mobile - Colapsar/Expandir filtros */}
      <button
        onClick={() => setIsFiltersOpen(!isFiltersOpen)}
        className="lg:hidden w-full flex items-center justify-between bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-4 mb-4 shadow-lg hover:shadow-xl transition-all"
      >
        <div className="flex items-center gap-3">
          <SlidersHorizontal className="h-5 w-5" />
          <span className="font-bold text-base">Filtros</span>
          {hasActiveFilters && (
            <span className="flex items-center justify-center min-w-[24px] h-6 px-2 bg-white text-blue-600 text-xs font-bold rounded-full">
              {Object.values(filters).reduce((acc, arr) => acc + (arr?.length || 0), 0)}
            </span>
          )}
        </div>
        {isFiltersOpen ? (
          <ChevronUp className="h-5 w-5" />
        ) : (
          <ChevronDown className="h-5 w-5" />
        )}
      </button>

      {/* Panel de filtros */}
      <div className={`bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-200/50 p-5 backdrop-blur-sm transition-all duration-300 ${
        isFiltersOpen ? 'block' : 'hidden lg:block'
      }`}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Filtros
          </h2>
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="group text-sm text-red-500 hover:text-red-600 font-medium flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-all duration-300 transform hover:scale-105"
            >
              <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
              Limpiar
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 text-sm mb-5 pb-5 border-b border-gray-200">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold text-xs shadow-md">
            {totalProducts}
          </div>
          <span className="text-gray-700 font-medium">productos disponibles</span>
        </div>

        <div className="space-y-3">
        {Object.entries(categoryFilters).map(([filterType, options]) => {
          const isExpanded = expandedSections[filterType] !== false;
          const activeCount = (filters[filterType] || []).length;

          return (
            <div
              key={filterType}
              className="group bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              <button
                onClick={() => toggleSection(filterType)}
                className="w-full flex items-center justify-between p-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <span className="text-base font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {formatFilterLabel(filterType)}
                  </span>
                  {activeCount > 0 && (
                    <span className="flex items-center justify-center min-w-[24px] h-6 px-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold rounded-full shadow-md animate-pulse">
                      {activeCount}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-all duration-300 transform group-hover:scale-110" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-all duration-300 transform group-hover:scale-110" />
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 space-y-2 bg-gradient-to-b from-gray-50/50 to-transparent">
                  {options.map((option) => {
                    const isSelected = (filters[filterType] || []).includes(option);
                    return (
                      <label
                        key={option}
                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md ${
                          isSelected
                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                            : 'bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 border border-gray-200'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleFilterToggle(filterType, option)}
                          className="w-5 h-5 rounded-md border-2 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer transition-all"
                          style={{
                            accentColor: isSelected ? '#3b82f6' : undefined
                          }}
                        />
                        <span className={`text-sm font-medium transition-colors ${
                          isSelected ? 'text-white' : 'text-gray-700'
                        }`}>
                          {option}
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
};

export default SidebarFilters;