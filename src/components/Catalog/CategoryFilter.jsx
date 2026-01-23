import { useState, useRef, useEffect } from 'react';
import { categories } from '../../data';
import { Grid3X3, ChevronDown, ChevronLeft, ChevronRight, X } from 'lucide-react';
import {
  getCategoryIcon,
  getCategoryColor,
  getCategoryImage
} from '../../constants/categoryConfig';

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const dropdownRef = useRef(null);
  const scrollContainerRef = useRef(null);

  // Lógica de Scroll (optimizada sin dependencias circulares)
  useEffect(() => {
    const checkScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setShowLeftArrow(scrollLeft > 10);
        setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
      }
    };

    checkScroll();
    window.addEventListener('resize', checkScroll);
    
    const scrollEl = scrollContainerRef.current;
    if (scrollEl) {
      scrollEl.addEventListener('scroll', checkScroll, { passive: true });
    }

    return () => {
      window.removeEventListener('resize', checkScroll);
      if (scrollEl) {
        scrollEl.removeEventListener('scroll', checkScroll);
      }
    };
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

  // Bloquear scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;

      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';

      const preventTouch = (e) => {
        if (e.target.closest('.category-grid-scroll')) {
          return;
        }
        e.preventDefault();
      };

      document.addEventListener('touchmove', preventTouch, { passive: false });

      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        document.body.style.touchAction = '';
        document.removeEventListener('touchmove', preventTouch);
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleCategorySelect = (category) => {
    setIsOpen(false);
    onCategoryChange(category);
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

            {/* Modal Fullscreen - Diseño Oscuro */}
            {isOpen && (
              <>
                {/* Backdrop - Fijo y sin scroll */}
                <div
                  className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] animate-in fade-in duration-150"
                  onClick={() => setIsOpen(false)}
                  onTouchMove={(e) => e.preventDefault()}
                  style={{ touchAction: 'none' }}
                />

                {/* Modal Content - Completamente fijo */}
                <div
                  className="fixed inset-0 z-[101] flex flex-col animate-in slide-in-from-bottom duration-200"
                  onTouchMove={(e) => {
                    if (!e.target.closest('.category-grid-scroll')) {
                      e.preventDefault();
                    }
                  }}
                  style={{ touchAction: 'none' }}
                >
                  {/* Header del modal - Fijo en la parte superior */}
                  <div
                    className="flex-shrink-0 bg-black border-b border-gray-800 px-5 py-6 flex items-center justify-between shadow-2xl"
                    onTouchMove={(e) => e.preventDefault()}
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-xl">
                        <Grid3X3 className="h-7 w-7 text-white" strokeWidth={2.5} />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">Categorías</h2>
                        <p className="text-sm text-gray-400 font-medium mt-0.5">{categories.length} opciones disponibles</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-2.5 hover:bg-gray-800 rounded-xl transition-all duration-200 active:scale-90"
                    >
                      <X className="h-6 w-6 text-gray-400 hover:text-white transition-colors" strokeWidth={2.5} />
                    </button>
                  </div>

                  {/* Grid de categorías - Solo este contenedor tiene scroll */}
                  <div
                    className="category-grid-scroll flex-1 overflow-y-auto catalog-bg px-4 py-5"
                    style={{
                      overscrollBehavior: 'contain',
                      WebkitOverflowScrolling: 'touch',
                      touchAction: 'pan-y'
                    }}
                  >
                    <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                      {categories.map((category, index) => {
                        const isSelected = selectedCategory === category;
                        const categoryImage = getCategoryImage(category);
                        const isTopImage = index < 4;

                        return (
                          <button
                            key={category}
                            onClick={() => handleCategorySelect(category)}
                            style={{ animationDelay: `${index * 40}ms` }}
                            className={`
                              relative overflow-hidden rounded-2xl font-bold
                              transition-all duration-150 animate-in fade-in zoom-in-95
                              ${isSelected
                                ? 'shadow-[0_20px_50px_rgba(0,0,0,0.4)] scale-[1.03] ring-4 ring-blue-500/60'
                                : 'shadow-[0_10px_30px_rgba(0,0,0,0.25)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.35)] active:scale-[0.97]'
                              }
                            `}
                          >
                            <div className="relative aspect-[4/3] w-full">
                              <img
                                src={categoryImage}
                                alt={category}
                                className={`
                                  absolute inset-0 w-full h-full object-cover
                                  transition-all duration-150
                                  ${isSelected ? 'scale-110 brightness-110' : 'brightness-90'}
                                `}
                                loading={isTopImage ? "eager" : "lazy"}
                                fetchpriority={isTopImage ? "high" : "low"}
                                decoding="async"
                              />

                              <div className={`
                                absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent
                                transition-all duration-150
                                ${isSelected ? 'from-black/80 via-black/40' : ''}
                              `} />

                              {isSelected && (
                                <div className="absolute top-3 right-3 bg-blue-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-xl animate-in zoom-in-50 duration-200 flex items-center gap-1">
                                  <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                  Activa
                                </div>
                              )}

                              <div className="absolute inset-x-0 bottom-0 p-4 flex flex-col items-start gap-1.5">
                                <span className={`
                                  text-white font-bold leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]
                                  transition-all duration-150
                                  ${isSelected ? 'text-xl' : 'text-base'}
                                `}>
                                  {category}
                                </span>

                                {!isSelected && (
                                  <div className="flex items-center gap-1.5 opacity-80">
                                    <div className="w-1 h-1 rounded-full bg-gray-300" />
                                    <span className="text-xs text-gray-300 font-medium">Toca para filtrar</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Footer oscuro - Fijo en la parte inferior */}
                  <div
                    className="flex-shrink-0 bg-black/95 backdrop-blur-xl border-t border-gray-800 px-5 py-4 shadow-2xl"
                    onTouchMove={(e) => e.preventDefault()}
                  >
                    <div className="flex items-center justify-center gap-3 text-sm text-gray-400">
                      <div className="w-8 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                      <span className="font-semibold">Selecciona una categoría</span>
                      <div className="w-8 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
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
