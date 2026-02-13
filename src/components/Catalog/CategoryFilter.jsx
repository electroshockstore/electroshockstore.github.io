import { useState, useRef, useEffect } from 'react';
import { categories } from '../../data';
import { Grid3X3, ChevronDown, ChevronLeft, ChevronRight, X } from 'lucide-react';
import Portal from '../Shared/Portal';
import {
  getCategoryIcon,
  getCategoryColor,
  getCategoryImage
} from '../../constants/categoryConfig';

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [savedScrollPosition, setSavedScrollPosition] = useState(0);

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
      // Guardar posición actual del scroll
      const scrollY = window.scrollY;
      setSavedScrollPosition(scrollY);
      
      // Bloquear scroll del body
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    }
    
    // NO restaurar aquí, se hace manualmente en handleCategorySelect
  }, [isOpen]);
  
  // Cleanup cuando el componente se desmonta
  useEffect(() => {
    return () => {
      // Solo limpiar si el modal estaba abierto
      if (isOpen) {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
      }
    };
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

  const handleCategorySelect = (category) => {
    // 1. Restaurar el body SINCRONAMENTE
    const scrollPosition = savedScrollPosition;
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    document.body.style.overflow = '';
    window.scrollTo(0, scrollPosition);
    
    // 2. Cerrar el modal
    setIsOpen(false);
    
    // 3. Ejecutar la navegación inmediatamente
    onCategoryChange(category);
  };

  // Renderizar modal usando Portal genérico
  const renderModal = () => {
    if (!isOpen) return null;

    return (
      <Portal>
        <div className="modal-fullscreen-wrapper">
        {/* Backdrop */}
        <div
          className="modal-fullscreen-backdrop"
          onClick={() => setIsOpen(false)}
        />

        {/* Modal Content */}
        <div className="modal-fullscreen-content">
          {/* Header del modal */}
          <div className="modal-fullscreen-header">
            {/* Glow decorativo */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
            <div className="absolute top-0 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
            
            <div className="flex items-center gap-4 relative z-10">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 shadow-xl box-glow-blue">
                <Grid3X3 className="h-7 w-7 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white tracking-tight text-glow-blue">Categorías</h2>
                <p className="text-sm text-gray-400 font-semibold mt-0.5">{categories.length} opciones disponibles</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2.5 hover:bg-white/10 rounded-xl transition-all duration-200 active:scale-90 backdrop-blur-sm border border-white/10 relative z-10"
            >
              <X className="h-6 w-6 text-gray-300 hover:text-white transition-colors" strokeWidth={2.5} />
            </button>
          </div>

          {/* Grid de categorías */}
          <div className="modal-fullscreen-scroll category-grid-scroll">
            {/* Pattern decorativo sutil */}
            <div className="absolute inset-0 opacity-5 bg-grain pointer-events-none" />
            
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto relative z-10">
              {categories.map((category, index) => {
                const isSelected = selectedCategory === category;
                const categoryImage = getCategoryImage(category);
                const isTopImage = index < 4;

                return (
                  <button
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    onTouchEnd={(e) => {
                      e.preventDefault();
                      handleCategorySelect(category);
                    }}
                    style={{ 
                      animationDelay: `${index * 30}ms`,
                      WebkitTapHighlightColor: 'transparent',
                      touchAction: 'manipulation'
                    }}
                    className={`
                      relative overflow-hidden rounded-2xl font-bold
                      transition-all duration-200 animate-in fade-in zoom-in-95
                      ${isSelected
                        ? 'shadow-[0_8px_30px_rgba(59,130,246,0.6),0_0_60px_rgba(59,130,246,0.3)] scale-[1.05] ring-2 ring-blue-400/80 box-glow-blue'
                        : 'shadow-[0_8px_24px_rgba(0,0,0,0.3),0_4px_12px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.4),0_6px_16px_rgba(0,0,0,0.25)] active:scale-[0.97] hover:scale-[1.02]'
                      }
                    `}
                  >
                    <div className="relative aspect-[4/3] w-full pointer-events-none">
                      <img
                        src={categoryImage}
                        alt={category}
                        className={`
                          absolute inset-0 w-full h-full object-cover pointer-events-none
                          transition-all duration-200
                          ${isSelected ? 'scale-110 brightness-110' : 'brightness-90 hover:brightness-100'}
                        `}
                        loading={isTopImage ? "eager" : "lazy"}
                        fetchpriority={isTopImage ? "high" : "low"}
                        decoding="async"
                      />

                      <div className={`
                        absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent pointer-events-none
                        transition-all duration-200
                        ${isSelected ? 'from-blue-900/90 via-black/50' : ''}
                      `} />

                      {isSelected && (
                        <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-black shadow-xl animate-in zoom-in-50 duration-200 flex items-center gap-1.5 border border-white/20 pointer-events-none">
                          <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          Activa
                        </div>
                      )}

                      <div className="absolute inset-x-0 bottom-0 p-4 flex flex-col items-start gap-1.5 pointer-events-none">
                        <span className={`
                          text-white font-black leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]
                          transition-all duration-200
                          ${isSelected ? 'text-xl text-glow-blue' : 'text-base'}
                        `}>
                          {category}
                        </span>

                        {!isSelected && (
                          <div className="flex items-center gap-1.5 opacity-90">
                            <div className="w-1 h-1 rounded-full bg-blue-400" />
                            <span className="text-xs text-gray-300 font-semibold">Toca para filtrar</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="modal-fullscreen-footer">
            {/* Glow decorativo inferior */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-gradient-to-t from-blue-500/10 to-transparent blur-2xl" />
            
            <div className="flex items-center justify-center gap-3 text-sm text-gray-300 relative z-10">
              <div className="w-10 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full" />
              <span className="font-bold">Selecciona una categoría</span>
              <div className="w-10 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full" />
            </div>
          </div>
        </div>
      </div>
      </Portal>
    );
  };

  return (
    <>
      {/* Modal renderizado con Portal */}
      {renderModal()}

      <div className="relative group z-20 w-full category-filter">
        {/* CAPAS DE RESPLANDOR ORIGINALES */}
        <div className="absolute -inset-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-30 blur-xl -z-10"></div>
        <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full opacity-25 blur-lg animate-pulse -z-10"></div>

        {/* RGB FLOWING BORDER - Contenedor con borde animado */}
        <div className="relative rounded-full overflow-hidden p-[3px] animate-border-rotate">
          <div className="relative bg-white rounded-full z-10">
            {/* MOBILE: DROPDOWN COMPACTO CON GLOW */}
            <div className={`category-dropdown sm:hidden relative z-20 ${isOpen ? 'dropdown-open' : ''}`} ref={dropdownRef}>
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
                  className="dropdown-icon h-5 w-5 text-gray-400 transition-transform duration-300"
                  strokeWidth={2.5}
                />
              </div>
            </button>

              {/* Modal renderizado con Portal - Ver función renderModal() arriba */}
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
    </>
  );
};

export default CategoryFilter;
