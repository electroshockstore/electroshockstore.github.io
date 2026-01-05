import { useState, useRef, useEffect } from 'react';
import { categories } from '../../data';
import { 
  Grid3X3, Zap, HardDrive, MemoryStick, Cpu, CircuitBoard, 
  Fan, ChevronDown, Headphones, Keyboard, Mouse, Gamepad2, 
  Monitor, Wifi, Laptop, Layers, ChevronLeft, ChevronRight
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
      {/* CAPAS DE RESPLANDOR - SIEMPRE VISIBLES EN MOBILE Y DESKTOP */}
      <div className="absolute -inset-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-30 blur-xl -z-10"></div>
      <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full opacity-25 blur-lg animate-pulse -z-10"></div>

      <div className="relative">
        {/* MOBILE: DROPDOWN COMPACTO CON GLOW */}
        <div className="sm:hidden relative z-20" ref={dropdownRef}>
          {/* Botón principal - UNA SOLA LÍNEA */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative w-full flex items-center justify-between px-4 py-2.5 bg-white rounded-full shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-[1.01]"
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

          {/* Dropdown Menu - Estilo Apple moderno */}
          {isOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              {/* Lista de categorías - Grid compacto */}
              <div className="max-h-[70vh] overflow-y-auto p-3 space-y-1 scrollbar-custom scrollbar-light">
                {categories.map((category, index) => {
                  const Icon = getCategoryIcon(category);
                  const isSelected = selectedCategory === category;
                  
                  return (
                    <button
                      key={category}
                      onClick={() => {
                        onCategoryChange(category);
                        setIsOpen(false);
                      }}
                      style={{ animationDelay: `${index * 15}ms` }}
                      className={`
                        w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl font-semibold text-sm
                        transition-all duration-200 animate-in fade-in slide-in-from-left-1
                        ${isSelected 
                          ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25 scale-[1.01]' 
                          : 'text-gray-700 bg-white hover:bg-gray-50 active:scale-[0.98]'
                        }
                      `}
                    >
                      <div className={`
                        p-1.5 rounded-lg transition-all duration-200 flex-shrink-0
                        ${isSelected 
                          ? 'bg-white/20 backdrop-blur-sm' 
                          : 'bg-white shadow-sm border border-gray-100'
                        }
                      `}>
                        <Icon 
                          className={`h-4 w-4 ${isSelected ? 'text-white' : getCategoryColor(category, false)}`} 
                          strokeWidth={2.5} 
                        />
                      </div>
                      <span className="flex-1 text-left">
                        {category}
                      </span>
                      {isSelected && (
                        <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* DESKTOP: SEGMENTED CONTROL HORIZONTAL SIEMPRE EN UNA FILA */}
        <div className="hidden sm:flex relative items-center group/carousel bg-white rounded-3xl p-2 shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden">
          
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
  );
};

export default CategoryFilter;