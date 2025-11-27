import { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, X, SlidersHorizontal } from 'lucide-react';
import { useStock } from '../../context/StockContext';

const SidebarFilters = ({ selectedCategory, filters, onFilterChange, onClearFilters }) => {
  const [expandedSections, setExpandedSections] = useState({});
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
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