import { memo } from 'react';
import { MapPin } from 'lucide-react';
import useScrollReveal from '../../hooks/useScrollReveal';
import PickupPointCard from './PickupPointCard';

const PickupPointsGrid = memo(({ pickupPoints }) => {
  const { elementRef: headerRef, className: headerClass } = useScrollReveal({ threshold: 0.1, animation: 'fade-in' });
  const { elementRef: gridRef, className: gridClass } = useScrollReveal({ threshold: 0.1, animation: 'fade-in' });

  return (
    <div className="w-full">
      {/* Header Section optimizado */}
      <div ref={headerRef} className={`${headerClass} text-center mb-12 sm:mb-16`}>
        <div className="inline-flex items-center gap-3 sm:gap-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-6 py-3 sm:px-10 sm:py-5 rounded-full border border-blue-500/30 mb-6 sm:mb-8 shadow-lg smooth-hover">
          <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" strokeWidth={2.5} />
          <span className="text-blue-400 font-black text-base sm:text-xl">Puntos de Retiro</span>
        </div>
        
        <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 font-semibold px-4">
          Elegí el que te quede más cómodo
        </p>
      </div>

      {/* Grid */}
      <div ref={gridRef} className={`${gridClass} grid md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8`}>
        {pickupPoints.map((point, index) => (
          <div 
            key={point.id}
            style={{ animationDelay: `${index * 100}ms` }}
            className="animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
            <PickupPointCard point={point} />
          </div>
        ))}
      </div>
    </div>
  );
});

PickupPointsGrid.displayName = 'PickupPointsGrid';

export default PickupPointsGrid;
