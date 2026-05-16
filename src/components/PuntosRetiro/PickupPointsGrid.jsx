import { memo, useState, useRef, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import MotionReveal from '../Shared/MotionReveal';
import PickupPointCard from './PickupPointCard';

const PickupPointsGrid = memo(({ pickupPoints }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  // Detectar scroll para actualizar indicadores
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const containerWidth = container.offsetWidth;
      const cardWidth = containerWidth * 0.82 + 20; // 82vw + gap de 20px
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(index, pickupPoints.length - 1));
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [pickupPoints.length]);

  return (
    <div className="w-full">
      {/* Header Section optimizado */}
      <MotionReveal animation="fade-in" duration={0.6}>
        <div className="text-left md:text-center mb-8 md:mb-12 px-4 md:px-0">
          {/* Mobile Title */}
          <h2 className="text-[28px] leading-[1.1] md:hidden font-normal text-white mb-6 tracking-[-0.5px]">
            Elegí el que te<br />
            <span className="bg-gradient-to-r from-[#22F5C7] to-[#00D9FF] bg-clip-text text-transparent font-extrabold tracking-[-1px]">
              quede más cómodo
            </span>
          </h2>

          {/* Desktop Header */}
          <div className="hidden md:block">
            <div className="inline-flex items-center gap-3 sm:gap-4 bg-gradient-to-r from-[#22F5C7]/10 to-[#00D9FF]/10 px-6 py-3 sm:px-10 sm:py-5 rounded-full border border-[#22F5C7]/30 mb-6 sm:mb-8 shadow-[0_0_30px_rgba(34,245,199,0.15)] smooth-hover backdrop-blur-md">
              <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-[#22F5C7]" strokeWidth={2.5} />
              <span className="text-[#22F5C7] font-extrabold text-base sm:text-xl tracking-wide">Puntos de Retiro</span>
            </div>
            
            <p className="text-xl sm:text-2xl md:text-3xl text-[#D7E0FF] font-bold px-4">
              Elegí el que te quede más cómodo
            </p>
          </div>
        </div>
      </MotionReveal>

      {/* Mobile Carousel */}
      <MotionReveal animation="fade-in" duration={0.7} delay={0.2}>
        <div className="md:hidden">
          {/* Carousel Container - ASIMÉTRICO con overflow visible */}
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-5 pl-5 pr-16 pb-2"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {pickupPoints.map((point) => (
              <div 
                key={point.id} 
                className="flex-shrink-0 w-[82vw] snap-start"
              >
                <PickupPointCard point={point} />
              </div>
            ))}
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {pickupPoints.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  const container = scrollContainerRef.current;
                  if (container) {
                    const cardWidth = container.offsetWidth * 0.82 + 20; // 82vw + gap
                    container.scrollTo({
                      left: index * cardWidth,
                      behavior: 'smooth'
                    });
                  }
                }}
                className={`h-2 rounded-full transition-all duration-[350ms] cubic-bezier-smooth ${
                  index === activeIndex 
                    ? 'w-8 bg-gradient-to-r from-[#22F5C7] to-[#00D9FF] shadow-[0_0_12px_rgba(34,245,199,0.6)]' 
                    : 'w-2 bg-[#64748B] hover:bg-[#94A3B8]'
                }`}
                aria-label={`Ir al punto ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {pickupPoints.map((point) => (
            <PickupPointCard key={point.id} point={point} />
          ))}
        </div>
      </MotionReveal>
    </div>
  );
});

PickupPointsGrid.displayName = 'PickupPointsGrid';

export default PickupPointsGrid;
