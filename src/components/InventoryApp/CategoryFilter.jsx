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
  Gamepad2
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
      'Joystick': Gamepad2
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
      'Joystick': isSelected ? 'text-emerald-600' : 'text-emerald-500'
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
      'Joystick': 'from-emerald-500 to-emerald-600'
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

  const SelectedIcon = getCategoryIcon(selectedCategory);

  return (
    <>
      {/* Mobile: Dropdown moderno estilo iOS */}
      <div className="sm:hidden relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between gap-3 px-5 py-3.5 
                     bg-white rounded-full border-2 border-gray-200
                     shadow-[0_2px_8px_rgba(0,0,0,0.06)]
                     hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)]
                     transition-all duration-200"
        >
          <div className="flex items-center gap-3">
            <div className={`p-1.5 rounded-lg bg-gradient-to-br ${getCategoryGradient(selectedCategory)} shadow-md`}>
              <SelectedIcon className="h-4 w-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-base text-gray-900">
              {selectedCategory}
            </span>
          </div>
          <ChevronDown 
            className={`h-5 w-5 text-gray-500 transition-transform duration-200 
                       ${isOpen ? 'rotate-180' : ''}`}
            strokeWidth={2.5}
          />
        </button>

        {/* Dropdown Menu - Fixed z-index y posicionamiento */}
        {isOpen && (
          <>
            {/* Overlay para cerrar al hacer click fuera */}
            <div 
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            <div className="absolute top-full left-0 right-0 mt-2 z-50
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
                      onClick={() => handleCategorySelect(category)}
                      className={`
                        w-full flex items-center gap-3 px-5 py-3.5
                        transition-all duration-150
                        ${isSelected 
                          ? 'bg-blue-50 text-blue-600' 
                          : 'text-gray-700 hover:bg-gray-50 active:bg-gray-100'
                        }
                      `}
                    >
                      <div className={`p-1.5 rounded-lg ${
                        isSelected 
                          ? `bg-gradient-to-br ${getCategoryGradient(category)} shadow-md` 
                          : 'bg-gray-100'
                      } transition-all duration-200`}>
                        <Icon 
                          className={`h-4 w-4 ${isSelected ? 'text-white' : getCategoryColor(category, false)}`} 
                          strokeWidth={2.5} 
                        />
                      </div>
                      <span className={`font-semibold text-base ${isSelected ? 'font-bold' : ''}`}>
                        {category}
                      </span>
                      {isSelected && (
                        <div className="ml-auto w-2 h-2 rounded-full bg-blue-600" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Desktop: Segmented Control estilo Apple */}
      <div className="hidden sm:inline-flex bg-gray-100 rounded-full p-2 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
        {categories.map((category) => {
          const Icon = getCategoryIcon(category);
          const isSelected = selectedCategory === category;
          
          return (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`
                flex items-center gap-3 px-6 py-3.5 rounded-full font-bold text-base
                transition-all duration-200 whitespace-nowrap
                ${isSelected 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-[0_4px_16px_rgba(59,130,246,0.4)] scale-105' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }
              `}
            >
              {isSelected ? (
                <div className="p-1.5 rounded-lg bg-white/20 backdrop-blur-sm">
                  <Icon className="h-4 w-4 text-white" strokeWidth={2.5} />
                </div>
              ) : (
                <Icon className={`h-5 w-5 ${getCategoryColor(category, false)}`} strokeWidth={2.5} />
              )}
              <span>{category}</span>
            </button>
          );
        })}
      </div>
    </>
  );
};

export default CategoryFilter;