import { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { useStock } from '../../context/StockContext';

const SidebarFilters = ({ selectedCategory, filters, onFilterChange, onClearFilters }) => {
  const [expandedSections, setExpandedSections] = useState({});
  const { products } = useStock();

  const categoryFilters = useMemo(() => {
    if (selectedCategory === 'Todos') return {};

    const categoryProducts = products.filter(p => p.category === selectedCategory);
    const dynamicFilters = {};

    categoryProducts.forEach(product => {
      if (product.specifications) {
        Object.entries(product.specifications).forEach(([key, value]) => {
          if (!dynamicFilters[key]) {
            dynamicFilters[key] = new Set();
          }
          if (value && typeof value === 'string') {
            dynamicFilters[key].add(value);
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
      tipo: 'Tipo',
      capacidad: 'Capacidad',
      velocidad: 'Velocidad',
      marca: 'Marca',
      generacion: 'Generación',
      socket: 'Socket',
      chipset: 'Chipset',
      potencia: 'Potencia',
      certificacion: 'Certificación',
      tamaño: 'Tamaño',
      conexion: 'Conexión',
      plataforma: 'Plataforma',
      sensor: 'Sensor',
      switch: 'Switch',
      interfaz: 'Interfaz'
    };
    return labels[key] || key.charAt(0).toUpperCase() + key.slice(1);
  };

  const hasActiveFilters = Object.values(filters).some(arr => arr && arr.length > 0);
  const totalProducts = useMemo(() => {
    return products.filter(p => p.category === selectedCategory).length;
  }, [products, selectedCategory]);

  return (
    <div className="w-full lg:w-72 bg-white rounded-2xl border-2 border-gray-200 shadow-lg p-4 sm:p-6 sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-black text-gray-900">Filtros</h3>
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-red-600 hover:text-red-700 hover:bg-red-50 rounded-full transition-all"
            >
              <X className="h-3 w-3" strokeWidth={3} />
              Limpiar
            </button>
          )}
        </div>
        <p className="text-xs font-semibold text-gray-500">
          {totalProducts} productos disponibles
        </p>
      </div>

      <div className="space-y-4">
        {Object.entries(categoryFilters).map(([filterType, options]) => {
          const isExpanded = expandedSections[filterType] !== false;
          const activeCount = (filters[filterType] || []).length;

          return (
            <div key={filterType} className="border-b border-gray-200 pb-4 last:border-0">
              <button
                onClick={() => toggleSection(filterType)}
                className="w-full flex items-center justify-between py-2 hover:bg-gray-50 rounded-lg px-2 transition-all"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-gray-900">
                    {formatFilterLabel(filterType)}
                  </span>
                  {activeCount > 0 && (
                    <span className="px-2 py-0.5 bg-blue-600 text-white text-xs font-black rounded-full">
                      {activeCount}
                    </span>
                  )}
                </div>
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4 text-gray-500" strokeWidth={2.5} />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-500" strokeWidth={2.5} />
                )}
              </button>

              {isExpanded && (
                <div className="mt-2 space-y-1.5 pl-2">
                  {options.map((option) => {
                    const isSelected = (filters[filterType] || []).includes(option);
                    
                    return (
                      <label
                        key={option}
                        className="flex items-center gap-3 py-2 px-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-all group"
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleFilterToggle(filterType, option)}
                          className="w-4 h-4 text-blue-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                        />
                        <span className={`text-sm font-semibold transition-colors ${
                          isSelected ? 'text-blue-600' : 'text-gray-700 group-hover:text-gray-900'
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
  );
};

export default SidebarFilters;
