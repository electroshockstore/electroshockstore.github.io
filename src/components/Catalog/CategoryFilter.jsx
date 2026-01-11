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
          {/* Botón principal - UNA SOLA LÍNEA */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative w-full flex items-center justify-between px-4 py-2.5 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01]"
          >
            <div className="flex items-center gap-2.5">
              {selectedCategory ? (
                <>
                  {(() => {
                    const Icon = getCategoryIcon(selectedCategory);
                    return (
                      <div className={`p-1.5 rounded-lg bg-gradient-to-br ${getCategoryGradient(selectedCategory)} shadow-md`}>
                        <Icon className="h-4 w-4 text-white" strokeWidth={2.5} />
                      </div>
                    );
                  })()}
                  <span className="font-bold text-gray-800 text-sm">{selectedCategory}</span>
                </>
              ) : (
                <>
                  <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 shadow-md">
                    <Grid3X3 className="h-4 w-4 text-white" strokeWidth={2.5} />
                  </div>
                  <span className="font-semibold text-gray-700 text-sm">Presiona para ver categorías</span>
                </>
              )}
            </div>
            <ChevronDown 
              className={`h-4 w-4 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
              strokeWidth={2.5}
            />
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
                {/* Header del modal */}
                <div className="bg-white/95 backdrop-blur-xl border-b border-gray-200 px-5 py-4 flex items-center justify-between shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
                      <Grid3X3 className="h-5 w-5 text-white" strokeWidth={2.5} />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">Categorías</h2>
                      <p className="text-xs text-gray-500">{categories.length} disponibles</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="h-6 w-6 text-gray-600" strokeWidth={2.5} />
                  </button>
                </div>

                {/* Lista de categorías con scroll suave */}
                <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-white px-4 py-6">
                  <div className="max-w-md mx-auto space-y-3">
                    {categories.map((category, index) => {
                      const Icon = getCategoryIcon(category);
                      const isSelected = selectedCategory === category;
                      const gradient = getCategoryGradient(category);
                      
                      return (
                        <button
                          key={category}
                          onClick={() => {
                            onCategoryChange(category);
                            setIsOpen(false);
                          }}
                          style={{ animationDelay: `${index * 30}ms` }}
                          className={`
                            w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-semibold text-base
                            transition-all duration-200 animate-in fade-in slide-in-from-bottom-2
                            ${isSelected 
                              ? `bg-gradient-to-r ${gradient} text-white shadow-xl scale-[1.02]` 
                              : 'text-gray-700 bg-white hover:bg-gray-50 shadow-md hover:shadow-lg active:scale-[0.98]'
                            }
                          `}
                        >
                          <div className={`
                            p-3 rounded-xl transition-all duration-200 flex-shrink-0
                            ${isSelected 
                              ? 'bg-white/20 backdrop-blur-sm shadow-inner' 
                              : `bg-gradient-to-br ${gradient} shadow-md`
                            }
                          `}>
                            <Icon 
                              className={`h-6 w-6 ${isSelected ? 'text-white' : 'text-white'}`} 
                              strokeWidth={2.5} 
                            />
                          </div>
                          <span className="flex-1 text-left">
                            {category}
                          </span>
                          {isSelected && (
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold opacity-90">Actual</span>
                              <div className="w-2 h-2 rounded-full bg-white animate-pulse shadow-lg" />
                            </div>
                          )}
                          {!isSelected && (
                            <ChevronRight className="h-5 w-5 text-gray-400" strokeWidth={2.5} />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Footer con indicador */}
                <div className="bg-white/95 backdrop-blur-xl border-t border-gray-200 px-5 py-4 shadow-lg">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <div className="w-8 h-1 bg-gray-300 rounded-full" />
                    <span className="font-medium">Desliza para explorar</span>
                    <div className="w-8 h-1 bg-gray-300 rounded-full" />
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