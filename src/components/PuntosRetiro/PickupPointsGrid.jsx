import { memo, useState, useRef, useEffect } from 'react';
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
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="hero-square" aria-hidden="true" />
              <span className="landing-mono bg-[#0e0e0e] px-4 py-1.5 text-sm font-black uppercase tracking-[0.14em] text-[#c8f519] shadow-[4px_4px_0_0_rgba(14,14,14,0.25)]">
                Puntos de retiro
              </span>
              <span className="hero-square" aria-hidden="true" />
            </div>

            <p className="font-black uppercase leading-[0.9] tracking-[-0.04em] text-[#0e0e0e] text-[clamp(2rem,4.2vw,3.6rem)] px-4">
              Elegí el que te{' '}
              <span className="text-[#c8f519]" style={{ WebkitTextStroke: '2px #0e0e0e' }}>
                quede más cómodo
              </span>
            </p>
            <p className="landing-mono mt-3 text-[12px] font-black uppercase tracking-[0.18em] text-[#0e0e0e]/50">
              03 · {pickupPoints.length} ubicaciones · Sin local físico
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
