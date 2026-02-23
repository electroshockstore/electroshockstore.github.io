import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getCategoryIcon, getCategoryColor } from '../../../constants/categoryConfig';

const DesktopCarousel = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange,
  showLeftArrow,
  showRightArrow,
  onScroll,
  scrollContainerRef 
}) => {
  return (
    <div className="hidden sm:flex relative items-center group/carousel rounded-full p-2 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
      {/* Indicador Izquierdo */}
      {showLeftArrow && (
        <button
          onClick={() => onScroll('left')}
          className="absolute left-2 z-30 p-1.5 bg-white/90 rounded-full shadow-lg border border-gray-100 text-gray-700 hover:text-blue-600 transition-all hover:scale-110 active:scale-95"
          style={{ backdropFilter: 'blur(12px)' }}
        >
          <ChevronLeft size={20} strokeWidth={3} />
        </button>
      )}

      {/* Contenedor de Items (NUNCA WRAP) */}
      <div
        ref={scrollContainerRef}
        className="flex flex-nowrap gap-2 overflow-x-auto scrollbar-hide scroll-smooth w-full px-1 py-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((category) => {
          const Icon = getCategoryIcon(category);
          const iconColor = getCategoryColor(category, false);
          const isSelected = selectedCategory === category;

          return (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`
                liquid-pill-button flex-shrink-0
                ${isSelected ? 'liquid-pill-active' : ''}
              `}
              data-icon-color={iconColor}
            >
              {/* Círculo líquido que crece desde abajo */}
              <span className="liquid-circle" aria-hidden="true"></span>
              
              {/* Contenido del botón */}
              <span className="liquid-content">
                <span className="liquid-icon">
                  <Icon 
                    className={`h-4 w-4 md:h-5 md:w-5 ${isSelected ? 'text-white' : iconColor}`}
                    strokeWidth={2.5}
                  />
                </span>
                
                {/* Texto original que se desliza hacia arriba */}
                <span className="liquid-text-wrapper">
                  <span className="liquid-text liquid-text-original">
                    {category}
                  </span>
                  
                  {/* Texto duplicado que aparece desde abajo */}
                  <span className="liquid-text liquid-text-hover" aria-hidden="true">
                    {category}
                  </span>
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Indicador Derecho */}
      {showRightArrow && (
        <button
          onClick={() => onScroll('right')}
          className="absolute right-2 z-30 p-1.5 bg-white/90 rounded-full shadow-lg border border-gray-100 text-gray-700 hover:text-blue-600 transition-all hover:scale-110 active:scale-95"
          style={{ backdropFilter: 'blur(12px)' }}
        >
          <ChevronRight size={20} strokeWidth={3} />
        </button>
      )}
    </div>
  );
};

export default DesktopCarousel;
