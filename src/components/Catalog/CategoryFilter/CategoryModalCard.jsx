import { useRef } from 'react';
import { getCategoryImage } from '../../../constants/categoryConfig';
import { Check, Zap } from 'lucide-react';

const CategoryModalCard = ({ category, index, isSelected, isIOS, onSelect }) => {
  const categoryImage = getCategoryImage(category);
  const isTopImage = index < 4;

  const touchStartPos = useRef({ x: 0, y: 0 });
  const touchStartTime = useRef(0);
  const isTouchMoving = useRef(false);

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    touchStartPos.current = { x: touch.clientX, y: touch.clientY };
    touchStartTime.current = Date.now();
    isTouchMoving.current = false;
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    const deltaX = Math.abs(touch.clientX - touchStartPos.current.x);
    const deltaY = Math.abs(touch.clientY - touchStartPos.current.y);
    if (deltaX > 10 || deltaY > 10) {
      isTouchMoving.current = true;
    }
  };

  const handleTouchEnd = (e) => {
    const touchDuration = Date.now() - touchStartTime.current;
    if (!isTouchMoving.current && touchDuration < 300) {
      e.preventDefault();
      onSelect(category);
    }
    isTouchMoving.current = false;
  };

  const handleClick = () => {
    onSelect(category);
  };

  return (
    <button
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        animationDelay: `${index * 55}ms`,
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'pan-y',
        fontFamily: "'Barlow Condensed', sans-serif",
      }}
      className={`
        relative overflow-hidden group
        transition-all duration-200
        ${!isIOS ? 'animate-in fade-in zoom-in-95' : ''}
        ${isSelected
          ? 'scale-[1.03]'
          : 'active:scale-[0.95]'
        }
      `}
    >
      {/* Clip-path container for angled corners */}
      <div
        style={{
          clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
          position: 'relative',
        }}
      >
        {/* Aspect ratio box */}
        <div className="relative" style={{ aspectRatio: '4/3' }}>
          {/* Image */}
          <img
            src={categoryImage}
            alt={category}
            className={`
              absolute inset-0 w-full h-full object-cover pointer-events-none
              transition-all duration-500
              ${isSelected ? 'scale-110 saturate-150' : 'saturate-50 group-hover:saturate-100 group-hover:scale-105'}
            `}
            loading={isTopImage ? 'eager' : 'lazy'}
            fetchpriority={isTopImage ? 'high' : 'low'}
            decoding="async"
          />

          {/* Dark overlay */}
          <div
            className="absolute inset-0 pointer-events-none transition-all duration-300"
            style={{
              background: isSelected
                ? 'linear-gradient(160deg, rgba(0,0,0,0.1) 0%, rgba(234,88,12,0.5) 60%, rgba(0,0,0,0.85) 100%)'
                : 'linear-gradient(160deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.9) 100%)',
            }}
          />

          {/* Scanlines texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
            }}
          />

          {/* Corner accent top-right */}
          <div
            className="absolute top-0 right-0 pointer-events-none"
            style={{
              width: 0,
              height: 0,
              borderStyle: 'solid',
              borderWidth: '0 22px 22px 0',
              borderColor: `transparent ${isSelected ? '#ea580c' : '#374151'} transparent transparent`,
              transition: 'border-color 0.3s',
            }}
          />

          {/* Selected badge */}
          {isSelected && (
            <div
              className={`
                absolute top-2 left-2 flex items-center gap-1
                px-2 py-1 text-white text-xs font-black tracking-widest uppercase
                ${!isIOS ? 'animate-in zoom-in-50' : ''}
              `}
              style={{
                background: 'linear-gradient(90deg, #ea580c, #f97316)',
                clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 50%, calc(100% - 6px) 100%, 0 100%)',
                fontFamily: "'Barlow Condensed', sans-serif",
                letterSpacing: '0.1em',
              }}
            >
              <Check className="w-3 h-3" strokeWidth={3} />
              ACTIVA
            </div>
          )}

          {/* Bottom content */}
          <div className="absolute inset-x-0 bottom-0 p-3 pointer-events-none">
            {/* Category name */}
            <span
              className={`
                block text-white font-black leading-none tracking-tight transition-all duration-300
                ${isSelected ? 'text-lg' : 'text-base'}
              `}
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                textTransform: 'uppercase',
                letterSpacing: '0.03em',
                textShadow: '0 2px 8px rgba(0,0,0,1)',
              }}
            >
              {category}
            </span>

            {/* Tap hint */}
            {!isSelected && (
              <div className="flex items-center gap-1 mt-1 opacity-70 group-hover:opacity-100 transition-opacity">
                <Zap className="w-2.5 h-2.5 text-orange-400" fill="#f97316" />
                <span
                  className="text-orange-300 text-xs font-bold tracking-widest uppercase"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '9px', letterSpacing: '0.15em' }}
                >
                  Ver productos
                </span>
              </div>
            )}
          </div>

          {/* Selected glow border */}
          {isSelected && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                boxShadow: 'inset 0 0 0 2px #ea580c, inset 0 0 20px rgba(234,88,12,0.2)',
              }}
            />
          )}
        </div>
      </div>

      {/* Bottom label bar for selected */}
      {isSelected && (
        <div
          className="h-0.5 w-full"
          style={{
            background: 'linear-gradient(90deg, transparent, #ea580c, #f97316, transparent)',
          }}
        />
      )}
    </button>
  );
};

export default CategoryModalCard;