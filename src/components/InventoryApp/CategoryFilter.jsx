import React, { useState, useRef, useEffect } from 'react';
import { categories } from '../../data';
import { 
  Grid3X3,
  Zap,
  HardDrive,
  MemoryStick,
  Cpu,
  CircuitBoard,
  Fan,
  ChevronDown
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
      'Refrigeración': Fan
    };
    return iconMap[category] || Grid3X3;
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
            <SelectedIcon className="h-5 w-5 text-blue-600" strokeWidth={2.5} />
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

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 z-50
                          bg-white rounded-2xl border-2 border-gray-200
                          shadow-[0_8px_24px_rgba(0,0,0,0.12)]
                          overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
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
                    <Icon 
                      className={`h-5 w-5 ${isSelected ? 'text-blue-600' : 'text-gray-500'}`} 
                      strokeWidth={2.5} 
                    />
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
        )}
      </div>

      {/* Desktop: Segmented Control estilo Apple */}
      <div className="hidden sm:inline-flex bg-gray-100 rounded-full p-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
        {categories.map((category) => {
          const Icon = getCategoryIcon(category);
          const isSelected = selectedCategory === category;
          
          return (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`
                flex items-center gap-2.5 px-5 py-3 rounded-full font-bold text-base
                transition-all duration-200 whitespace-nowrap
                ${isSelected 
                  ? 'bg-blue-600 text-white shadow-[0_4px_12px_rgba(37,99,235,0.3)] scale-105' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }
              `}
            >
              <Icon className="h-5 w-5" strokeWidth={2.5} />
              <span>{category}</span>
            </button>
          );
        })}
      </div>
    </>
  );
};

export default CategoryFilter;
