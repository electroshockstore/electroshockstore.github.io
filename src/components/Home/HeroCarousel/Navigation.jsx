import { ChevronLeft, ChevronRight } from 'lucide-react';

const Navigation = ({ 
  currentSlide, 
  totalSlides, 
  currentHighlightColor, 
  isTransitioning,
  onPrevSlide,
  onNextSlide,
  onGoToSlide
}) => {
  return (
    <div className="absolute bottom-3 sm:bottom-8 md:bottom-12 right-3 sm:right-8 md:right-12 z-30 flex flex-col items-end gap-2 sm:gap-5">
      {/* Counter */}
      <div className="flex items-baseline gap-1.5 sm:gap-2">
        <span 
          className="text-3xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white leading-none"
          style={{
            textShadow: '2px 2px 0px rgba(0,0,0,0.8)'
          }}
        >
          {String(currentSlide + 1).padStart(2, '0')}
        </span>
        <span className="text-white/30 font-black text-base sm:text-3xl">
          /{String(totalSlides).padStart(2, '0')}
        </span>
      </div>
      
      {/* Indicators */}
      <div className="flex gap-2">
        {Array.from({ length: totalSlides }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => onGoToSlide(idx)}
            aria-label={`Ir a slide ${idx + 1}`}
            className={`transition-all duration-300 ${
              idx === currentSlide 
                ? `w-8 sm:w-12 h-[4px] sm:h-[6px] ${currentHighlightColor}` 
                : 'w-4 sm:w-6 h-[4px] sm:h-[6px] bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>

      {/* Buttons - Desktop only */}
      <div className="hidden sm:flex gap-3 md:gap-4">
        <button 
          onClick={onPrevSlide}
          aria-label="Slide anterior"
          disabled={isTransitioning}
          className="p-3 md:p-4 rounded-full border border-white/10 text-white hover:bg-white hover:text-black transition-all group active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
        </button>
        <button 
          onClick={onNextSlide}
          aria-label="Siguiente slide"
          disabled={isTransitioning}
          className="p-3 md:p-4 rounded-full border border-white/10 text-white hover:bg-white hover:text-black transition-all group active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
        </button>
      </div>
    </div>
  );
};

export default Navigation;
