import { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, X, SlidersHorizontal } from 'lucide-react';
import { useStock } from '../../context/StockContext';
import { useCategoryFilters } from '../../hooks/useCategoryFilters';
import { getFilterLabel } from '../../utils/filterConfig';

const SidebarFilters = ({ selectedCategory, filters, onFilterChange, onClearFilters }) => {
  const [expandedSections, setExpandedSections] = useState({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { products } = useStock();

  // Hook personalizado que maneja toda la lógica de filtros
  const categoryFilters = useCategoryFilters(selectedCategory, products);

  // Mapeo de imágenes de categorías
  const getCategoryImage = (category) => {
    const imageMap = {
      'Fuentes': '/images/category_filter/fuentes.webp',
      'Almacenamiento': '/images/category_filter/almacenamiento.webp',
      'Memorias RAM': '/images/category_filter/memorias_ram.webp',
      'Motherboards': '/images/category_filter/motherboard.webp',
      'Procesadores': '/images/category_filter/procesadores.webp',
      'Refrigeración': '/images/category_filter/refrigeracion.webp',
      'Auriculares': '/images/category_filter/auriculares.webp',
      'Conectividad': '/images/category_filter/conectividad.webp',
      'Monitores': '/images/category_filter/monitores.webp',
      'Joystick': '/images/category_filter/Joystikc.webp',
      'Placas de Video': '/images/category_filter/placas_video.webp',
      'Portátiles': '/images/category_filter/portatiles.webp',
      'Teclados': '/images/category_filter/teclado_mouse.webp',
      'Mouse': '/images/category_filter/teclado_mouse.webp'
    };
    return imageMap[category] || null;
  };

  const totalProducts = useMemo(() => {
    return products.filter(p => p.category === selectedCategory).length;
  }, [products, selectedCategory]);

  const hasActiveFilters = Object.values(filters).some(arr => arr && arr.length > 0);
  const activeFiltersCount = Object.values(filters).reduce((acc, arr) => acc + (arr?.length || 0), 0);

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

  const FilterContent = () => (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-200/50 p-5 backdrop-blur-sm h-full overflow-y-auto">
      {/* Imagen de categoría */}
      {getCategoryImage(selectedCategory) && (
        <div >
          <div className="relative flex flex-col items-center">
            {/* Sombra flotante debajo de la imagen */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 h-10 bg-gray-400/20 rounded-full blur-2xl"></div>
            
            {/* Contenedor de la imagen - tamaño máximo */}
            <div className="relative w-full max-w-[280px] h-84 flex items-center justify-center ">
              <img 
                src={getCategoryImage(selectedCategory)} 
                alt={selectedCategory}
                className="w-full h-full object-contain filter drop-shadow-2xl"
                loading="lazy"
              />
            </div>
            
          
          </div>
        </div>
      )}
      
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Filtros
        </h2>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="group text-sm text-red-500 hover:text-red-600 font-medium flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-all duration-300 transform hover:scale-105"
            >
              <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
              Limpiar
            </button>
          )}
          {/* Botón cerrar solo en mobile drawer */}
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
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
                  {getFilterLabel(filterType)}
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
  );

  return (
    <>
      {/* Botón para abrir drawer - SOLO MOBILE */}
      <button
        onClick={() => setIsDrawerOpen(true)}
        className="lg:hidden inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 h-10 sm:h-12 bg-gray-100 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.06)] text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200"
      >
        <SlidersHorizontal className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.5} />
        <span className="text-xs sm:text-sm font-bold">Filtros</span>
        {hasActiveFilters && (
          <span className="flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-blue-600 text-white text-[10px] font-bold rounded-full">
            {activeFiltersCount}
          </span>
        )}
      </button>

      {/* Drawer mobile */}
      <div className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-300 ${isDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        {/* Overlay */}
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsDrawerOpen(false)}
        />
        
        {/* Drawer */}
        <div className={`absolute top-0 left-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-300 pb-24 ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <FilterContent />
        </div>
      </div>

      {/* Sidebar desktop - NORMAL como antes */}
      <div className="hidden lg:block w-full lg:w-80">
        <FilterContent />
      </div>
    </>
  );
};

export default SidebarFilters;