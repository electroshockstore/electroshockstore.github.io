import { useRef } from 'react';
import { getCategoryIcon, getCategoryColor } from '../../../constants/categoryConfig';

/**
 * Carrusel de categorías (desktop).
 *
 * Sin botones de flecha: se navega arrastrando con el mouse, con el
 * trackpad o con el táctil. Los fundidos de los bordes indican
 * intuitivamente hacia dónde hay más contenido.
 */
const DesktopCarousel = ({
  categories,
  selectedCategory,
  onCategoryChange,
  canScrollLeft,
  canScrollRight,
  scrollContainerRef
}) => {
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: false });

  const beginDrag = (e) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, startLeft: el.scrollLeft, moved: false };
  };

  const moveDrag = (e) => {
    const d = drag.current;
    const el = scrollContainerRef.current;
    if (!d.active || !el) return;
    const dx = e.clientX - d.startX;
    if (Math.abs(dx) > 5) d.moved = true;
    if (d.moved) el.scrollLeft = d.startLeft - dx;
  };

  const endDrag = () => {
    drag.current.active = false;
  };

  // Si hubo arrastre, no disparar el click de la pill
  const guardClick = (e) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  // Máscara de fundido: el contenido se desvanece solo en los bordes
  // donde hay más para ver (nada se ve "rebanado"). 48px = zona de fundido.
  const maskImage =
    !canScrollLeft && !canScrollRight
      ? 'none'
      : `linear-gradient(to right, ${canScrollLeft ? 'transparent' : '#000'} 0, #000 48px, #000 calc(100% - 48px), ${canScrollRight ? 'transparent' : '#000'} 100%)`;

  return (
    <div className="hidden sm:block relative rounded-full p-2 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
      {/* Contenedor de Items (NUNCA WRAP, arrastrable, con snap) */}
      <div
        ref={scrollContainerRef}
        onPointerDown={beginDrag}
        onPointerMove={moveDrag}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={guardClick}
        className="flex flex-nowrap gap-2 overflow-x-auto scrollbar-hide w-full px-1 py-1 cursor-grab active:cursor-grabbing select-none snap-x snap-proximity scroll-px-12"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          maskImage,
          WebkitMaskImage: maskImage,
        }}
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
                liquid-pill-button flex-shrink-0 snap-start
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
    </div>
  );
};

export default DesktopCarousel;
