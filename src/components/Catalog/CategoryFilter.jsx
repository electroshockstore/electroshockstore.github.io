import { useState, useRef, useEffect } from 'react';
import { categories } from '../../data';
import { 
  Grid3X3,
  Zap,
  HardDrive,
  MemoryStick,
  Cpu,
  CircuitBoard,
  Fan,
  ChevronDown,
  Headphones,
  Keyboard,
  Mouse,
  Gamepad2,
  Monitor,
  Wifi,
  Laptop,
  Layers
} from 'lucide-react';

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const getCategoryIcon = (category) => {
    const iconMap = {
      'Todos': Grid3X3,
      'Fuentes': Zap,
      'Almacenamiento': HardDrive,
      'Memorias RAM': MemoryStick,
      'Motherboards': CircuitBoard,
      'Procesadores': Cpu,
      'Refrigeración': Fan,
      'Auriculares': Headphones,
      'Teclados': Keyboard,
      'Mouse': Mouse,
      'Joystick': Gamepad2,
      'Monitores': Monitor,
      'Conectividad': Wifi,
      'Portátiles': Laptop,
      'Placas de Video': Layers
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

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCategorySelect = (category) => {
    onCategoryChange(category);
    setIsOpen(false);
  };

  const SelectedIcon = selectedCategory ? getCategoryIcon(selectedCategory) : Grid3X3;

  return (
    <div className="relative group z-30">
      {/* Capa de resplandor 1 - Animada */}
      <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-[2.5rem] opacity-30 blur-2xl group-hover:opacity-40 transition-opacity duration-500 -z-10"></div>
      
      {/* Capa de resplandor 2 - Pulsante */}
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-[2.5rem] opacity-20 blur-xl animate-pulse -z-10"></div>
      
      {/* Borde brillante */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-[2.2rem] opacity-50 blur-sm -z-10"></div>
      
      {/* Contenedor del CategoryFilter */}
      <div className="relative z-30">
        {/* Mobile: Dropdown moderno estilo iOS con borde indicador */}
        <div className="sm:hidden relative z-30" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between gap-3 px-5 py-3.5 
                     bg-white rounded-full border-2 
                     ${!selectedCategory 
                       ? 'border-blue-500 shadow-[0_0_0_3px_rgba(59,130,246,0.2)]' 
                       : 'border-gray-200'
                     }
                     shadow-[0_2px_8px_rgba(0,0,0,0.06)]
                     hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)]
                     transition-all duration-300`}
        >
          <span className="flex items-center gap-3">
            <span className={`p-1.5 rounded-lg bg-gradient-to-br ${selectedCategory ? getCategoryGradient(selectedCategory) : 'from-gray-400 to-gray-500'} shadow-md inline-flex`}>
              <SelectedIcon className="h-4 w-4 text-white" strokeWidth={2.5} />
            </span>
            <span className="font-bold text-base text-gray-900">
              {selectedCategory || 'Seleccionar categoría'}
            </span>
          </span>
          <ChevronDown 
            className={`h-5 w-5 text-gray-500 transition-transform duration-200 
                       ${isOpen ? 'rotate-180' : ''}`}
            strokeWidth={2.5}
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 z-[9999]
                          bg-white rounded-2xl border-2 border-gray-200
                          shadow-[0_8px_24px_rgba(0,0,0,0.12)]
                          max-h-[60vh] overflow-y-auto">
            <div className="py-2">
              {categories.map((category) => {
                const Icon = getCategoryIcon(category);
                const isSelected = selectedCategory === category;
                
                return (
                  <button
                    key={category}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCategorySelect(category);
                    }}
                    className={`
                      w-full flex items-center gap-3 px-5 py-3.5
                      transition-all duration-150
                      ${isSelected 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'text-gray-700 hover:bg-gray-50 active:bg-gray-100'
                      }
                    `}
                  >
                    <span className={`p-1.5 rounded-lg ${
                      isSelected 
                        ? `bg-gradient-to-br ${getCategoryGradient(category)} shadow-md` 
                        : 'bg-gray-100'
                    } transition-all duration-200 inline-flex`}>
                      <Icon 
                        className={`h-4 w-4 ${isSelected ? 'text-white' : getCategoryColor(category, false)}`} 
                        strokeWidth={2.5} 
                      />
                    </span>
                    <span className={`font-semibold text-base ${isSelected ? 'font-bold' : ''}`}>
                      {category}
                    </span>
                    {isSelected && (
                      <span className="ml-auto w-2 h-2 rounded-full bg-blue-600 inline-block" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

        {/* Desktop: Segmented Control con scroll horizontal en sm/md, wrap en lg+ */}
        <div className="hidden sm:block relative group/scroll">
          {/* Contenedor scrolleable */}
          <div 
            id="category-scroll-container"
            className="flex flex-nowrap lg:flex-wrap gap-2 bg-white rounded-3xl p-2 shadow-[0_2px_8px_rgba(0,0,0,0.06)] 
                       overflow-x-auto lg:overflow-x-visible scrollbar-hide scroll-smooth"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
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
                  {/* Contenedor del Icono */}
                  <div className={`
                    p-1 md:p-1.5 rounded-xl transition-all duration-300
                    ${isSelected 
                      ? 'bg-white/20 backdrop-blur-sm' 
                      : 'bg-white shadow-sm border border-slate-100 group-hover:scale-110'
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

          {/* Botones de navegación - Solo visibles en md cuando hay scroll */}
          <button
            onClick={() => {
              const container = document.getElementById('category-scroll-container');
              container.scrollBy({ left: -200, behavior: 'smooth' });
            }}
            className="hidden md:flex lg:hidden absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3
                       w-10 h-10 items-center justify-center rounded-full 
                       bg-white shadow-lg border border-gray-200
                       opacity-0 group-hover/scroll:opacity-100 transition-opacity duration-300
                       hover:bg-gray-50 active:scale-95 z-20"
            aria-label="Scroll izquierda"
          >
            <ChevronDown className="w-5 h-5 text-gray-700 -rotate-90" strokeWidth={2.5} />
          </button>

          <button
            onClick={() => {
              const container = document.getElementById('category-scroll-container');
              container.scrollBy({ left: 200, behavior: 'smooth' });
            }}
            className="hidden md:flex lg:hidden absolute right-0 top-1/2 -translate-y-1/2 translate-x-3
                       w-10 h-10 items-center justify-center rounded-full 
                       bg-white shadow-lg border border-gray-200
                       opacity-0 group-hover/scroll:opacity-100 transition-opacity duration-300
                       hover:bg-gray-50 active:scale-95 z-20"
            aria-label="Scroll derecha"
          >
            <ChevronDown className="w-5 h-5 text-gray-700 rotate-90" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;