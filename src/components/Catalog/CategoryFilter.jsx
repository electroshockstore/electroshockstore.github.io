import { useState, useRef, useEffect } from 'react';
import { categories } from '../../data';
import { 
  Grid3X3, Zap, HardDrive, MemoryStick, Cpu, CircuitBoard, 
  Fan, ChevronDown, Headphones, Keyboard, Mouse, Gamepad2, 
  Monitor, Wifi, Laptop, Layers, ChevronLeft, ChevronRight, X
} from 'lucide-react';

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  
  const dropdownRef = useRef(null);
  const scrollContainerRef = useRef(null);

  // Mapeo de imágenes para mobile - usar thumbnails optimizados
  const getCategoryImage = (category) => {
    const imageMap = {
      'Todos': '/images/category_filter/thumbs/builder.webp',
      'Fuentes': '/images/category_filter/thumbs/fuentes.webp',
      'Almacenamiento': '/images/category_grid/thumbs/almacenamiento_grid_tiny.webp',
      'Memorias RAM': '/images/category_filter/thumbs/memorias_ram.webp',
      'Motherboards': '/images/category_filter/thumbs/motherboard.webp',
      'Procesadores': '/images/category_filter/thumbs/procesadores.webp',
      'Refrigeración': '/images/category_filter/thumbs/refrigeracion.webp',
      'Auriculares': '/images/category_grid/thumbs/auriculares_grid_tiny.webp',
      'Teclados': '/images/category_grid/thumbs/teclados_grid_tiny.webp',
      'Mouse': '/images/category_grid/thumbs/mouse_grid_tiny.webp',
      'Joystick': '/images/category_filter/thumbs/Joystikc.webp',
      'Monitores': '/images/category_filter/thumbs/monitores.webp',
      'Conectividad': '/images/category_filter/thumbs/conectividad.webp',
      'Portátiles': '/images/category_filter/thumbs/portatiles.webp',
      'Placas de Video': '/images/category_filter/thumbs/placas_video.webp'
    };
    return imageMap[category] || '/images/category_filter/thumbs/builder.webp';
  };

  // Mappers originales de iconos y colores
  const getCategoryIcon = (category) => {
    const iconMap = {
      'Todos': Grid3X3, 'Fuentes': Zap, 'Almacenamiento': HardDrive,
      'Memorias RAM': MemoryStick, 'Motherboards': CircuitBoard, 'Procesadores': Cpu,
      'Refrigeración': Fan, 'Auriculares': Headphones, 'Teclados': Keyboard,
      'Mouse': Mouse, 'Joystick': Gamepad2, 'Monitores': Monitor,
      'Conectividad': Wifi, 'Portátiles': Laptop, 'Placas de Video': Layers
    };
    return iconMap[category] || Grid3X3;
  };

  const getCategoryColor = (category, isSelected) => {
    const colorMap = {
      'Todos': isSelected ? 'text-blue-600' : 'text-blue-500',
      'Fuentes': isSelected ? 'text-amber-600' : 'text-amber-500',
      'Almacenamiento': isSelected ? 'text-purple-600' : 'text-purple-500',
      'Memorias RAM': isSelected ? 'text-green-600' : 'text-green-500',
      'Motherboards': isSelected ? 'text-indigo-600' : 'text-indigo-500',
      'Procesadores': isSelected ? 'text-red-600' : 'text-red-500',
      'Refrigeración': isSelected ? 'text-cyan-600' : 'text-cyan-500',
      'Auriculares': isSelected ? 'text-pink-600' : 'text-pink-500',
      'Teclados': isSelected ? 'text-violet-600' : 'text-violet-500',
      'Mouse': isSelected ? 'text-orange-600' : 'text-orange-500',
      'Joystick': isSelected ? 'text-emerald-600' : 'text-emerald-500',
      'Monitores': isSelected ? 'text-slate-600' : 'text-slate-500',
      'Conectividad': isSelected ? 'text-teal-600' : 'text-teal-500',
      'Portátiles': isSelected ? 'text-sky-600' : 'text-sky-500',
      'Placas de Video': isSelected ? 'text-lime-600' : 'text-lime-500'
    };
    return colorMap[category] || (isSelected ? 'text-gray-600' : 'text-gray-500');
  };

  const getCategoryGradient = (category) => {
    const gradientMap = {
      'Todos': 'from-blue-500 to-blue-600',
      'Fuentes': 'from-amber-500 to-amber-600',
      'Almacenamiento': 'from-purple-500 to-purple-600',
      'Memorias RAM': 'from-green-500 to-green-600',
      'Motherboards': 'from-indigo-500 to-indigo-600',
      'Procesadores': 'from-red-500 to-red-600',
      'Refrigeración': 'from-cyan-500 to-cyan-600',
      'Auriculares': 'from-pink-500 to-pink-600',
      'Teclados': 'from-violet-500 to-violet-600',
      'Mouse': 'from-orange-500 to-orange-600',
      'Joystick': 'from-emerald-500 to-emerald-600',
      'Monitores': 'from-slate-500 to-slate-600',
      'Conectividad': 'from-teal-500 to-teal-600',
      'Portátiles': 'from-sky-500 to-sky-600',
      'Placas de Video': 'from-lime-500 to-lime-600'
    };
    return gradientMap[category] || 'from-gray-500 to-gray-600';
  };

  // Lógica de Scroll
  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative group z-20 w-full">
      {/* CAPAS DE RESPLANDOR ORIGINALES */}
      <div className="absolute -inset-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-30 blur-xl -z-10"></div>
      <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full opacity-25 blur-lg animate-pulse -z-10"></div>
      
      {/* RGB FLOWING BORDER - Contenedor con borde animado */}
      <div className="relative rounded-full overflow-hidden p-[3px] animate-border-rotate">
        <div className="relative bg-white rounded-full z-10">
        {/* MOBILE: DROPDOWN COMPACTO CON GLOW */}
        <div className="sm:hidden relative z-20" ref={dropdownRef}>
          {/* Botón principal mejorado con imagen */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-white to-gray-50 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border border-gray-100"
          >
            <div className="flex items-center gap-3">
              {selectedCategory ? (
                <>
                  {/* Mini preview de la imagen de categoría */}
                  <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-md ring-2 ring-white">
                    <img 
                      src={getCategoryImage(selectedCategory)}
                      alt={selectedCategory}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-xs text-gray-500 font-medium">Categoría</span>
                    <span className="font-bold text-gray-900 text-sm leading-tight">{selectedCategory}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-md">
                    <Grid3X3 className="h-5 w-5 text-white" strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-xs text-gray-500 font-medium">Explorar</span>
                    <span className="font-bold text-gray-800 text-sm leading-tight">Todas las categorías</span>
                  </div>
                </>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 font-medium hidden xs:block">Ver más</span>
              <ChevronDown 
                className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                strokeWidth={2.5}
              />
            </div>
          </button>

          {/* Modal Fullscreen - Mejor UX */}
          {isOpen && (
            <>
              {/* Backdrop */}
              <div 
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] animate-in fade-in duration-200"
                onClick={() => setIsOpen(false)}
              />
              
              {/* Modal Content */}
              <div className="fixed inset-0 z-[101] flex flex-col animate-in slide-in-from-bottom duration-300">
                {/* Header del modal mejorado */}
                <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-5 py-5 flex items-center justify-between shadow-2xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-md shadow-lg border border-white/30">
                      <Grid3X3 className="h-6 w-6 text-white" strokeWidth={2.5} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white drop-shadow-lg">Categorías</h2>
                      <p className="text-xs text-white/80 font-medium">{categories.length} opciones disponibles</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-white/20 rounded-full transition-all duration-200 active:scale-90 backdrop-blur-sm"
                  >
                    <X className="h-6 w-6 text-white" strokeWidth={2.5} />
                  </button>
                </div>

                {/* Grid de categorías con imágenes - Mobile optimizado */}
                <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-white px-3 py-4">
                  <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                    {categories.map((category, index) => {
                      const isSelected = selectedCategory === category;
                      const gradient = getCategoryGradient(category);
                      const categoryImage = getCategoryImage(category);
                      
                      return (
                        <button
                          key={category}
                          onClick={() => {
                            onCategoryChange(category);
                            setIsOpen(false);
                          }}
                          style={{ animationDelay: `${index * 40}ms` }}
                          className={`
                            relative overflow-hidden rounded-2xl font-bold text-sm
                            transition-all duration-300 animate-in fade-in zoom-in-95
                            ${isSelected 
                              ? 'shadow-2xl scale-[1.02] ring-4 ring-blue-500/50' 
                              : 'shadow-lg hover:shadow-xl active:scale-[0.97]'
                            }
                          `}
                        >
                          {/* Imagen de fondo */}
                          <div className="relative aspect-[4/3] w-full">
                            <img 
                              src={categoryImage}
                              alt={category}
                              className={`
                                absolute inset-0 w-full h-full object-cover
                                transition-all duration-300
                                ${isSelected ? 'scale-110 brightness-110' : 'brightness-90 group-hover:brightness-100'}
                              `}
                              loading="lazy"
                              decoding="async"
                            />
                            
                            {/* Overlay gradient */}
                            <div className={`
                              absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent
                              transition-all duration-300
                              ${isSelected ? 'from-black/70 via-black/30' : ''}
                            `} />
                            
                            {/* Badge de selección */}
                            {isSelected && (
                              <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg animate-in zoom-in-50 duration-200">
                                ✓
                              </div>
                            )}
                            
                            {/* Texto sobre la imagen */}
                            <div className="absolute inset-x-0 bottom-0 p-3 flex flex-col items-start gap-1">
                              <span className={`
                                text-white font-bold leading-tight drop-shadow-lg
                                transition-all duration-300
                                ${isSelected ? 'text-base' : 'text-sm'}
                              `}>
                                {category}
                              </span>
                              
                              {isSelected && (
                                <div className="flex items-center gap-1 animate-in slide-in-from-bottom-2 duration-200">
                                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                                  <span className="text-xs text-blue-200 font-semibold">Activa</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Footer mejorado */}
                <div className="bg-white/95 backdrop-blur-xl border-t border-gray-200 px-5 py-3 shadow-lg">
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                    <div className="w-6 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
                    <span className="font-semibold">Toca una categoría para filtrar</span>
                    <div className="w-6 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* DESKTOP: SEGMENTED CONTROL HORIZONTAL SIEMPRE EN UNA FILA */}
        <div className="hidden sm:flex relative items-center group/carousel rounded-full p-2 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
          
          {/* Indicador Izquierdo */}
          {showLeftArrow && (
            <button 
              onClick={() => handleScroll('left')}
              className="absolute left-2 z-30 p-1.5 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-gray-100 text-gray-700 hover:text-blue-600 transition-all hover:scale-110 active:scale-95"
            >
              <ChevronLeft size={20} strokeWidth={3} />
            </button>
          )}

          {/* Contenedor de Items (NUNCA WRAP) */}
          <div 
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className="flex flex-nowrap gap-2 overflow-x-auto scrollbar-hide scroll-smooth w-full px-1 py-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map((category) => {
              const Icon = getCategoryIcon(category);
              const isSelected = selectedCategory === category;
              
              return (
                <button
                  key={category}
                  onClick={() => onCategoryChange(category)}
                  className={`
                    flex items-center gap-2 px-4 py-2.5 md:px-4 md:py-3 rounded-full font-bold 
                    transition-all duration-300 whitespace-nowrap flex-shrink-0
                    ${isSelected 
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-[0_8px_20px_-4px_rgba(37,99,235,0.4)] scale-105 z-10' 
                      : 'text-gray-500 bg-slate-100/80 hover:bg-slate-100 hover:text-blue-600 border border-slate-100/50 hover:border-blue-200 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]'
                    }
                  `}
                >
                  <div className={`
                    p-1 md:p-1.5 rounded-xl transition-all duration-300
                    ${isSelected 
                      ? 'bg-white/20 backdrop-blur-sm' 
                      : 'bg-white shadow-sm border border-slate-100'
                    }
                  `}>
                    <Icon 
                      className={`h-3.5 w-3.5 md:h-5 md:w-5 ${isSelected ? 'text-white' : getCategoryColor(category, false)}`} 
                      strokeWidth={2.0} 
                    />
                  </div>
                  <span className="text-xs md:text-base tracking-tight">{category}</span>
                </button>
              );
            })}
          </div>

          {/* Indicador Derecho */}
          {showRightArrow && (
            <button 
              onClick={() => handleScroll('right')}
              className="absolute right-2 z-30 p-1.5 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-gray-100 text-gray-700 hover:text-blue-600 transition-all hover:scale-110 active:scale-95"
            >
              <ChevronRight size={20} strokeWidth={3} />
            </button>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;