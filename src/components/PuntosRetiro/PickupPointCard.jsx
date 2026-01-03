import { memo } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import SecurityFeatures from './SecurityFeatures';
import ScheduleGrid from './ScheduleGrid';

const PickupPointCard = memo(({ point }) => {
  return (
    <div className="h-full">
      {/* Card ultra-optimizado - sin backdrop-blur, sin efectos costosos */}
      <div className="relative h-full flex flex-col bg-gray-900/95 rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden hover:border-emerald-500/30 transition-colors duration-300 shadow-xl">
        
        {/* Gradient background estático - sin blur */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5 pointer-events-none" />

        {/* Image header ultra-optimizado */}
        <div className="relative h-48 sm:h-64 overflow-hidden">
          <img 
            src={point.image} 
            alt={point.name}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
          {/* Gradient overlay simple */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
          
          {/* Badge simplificado - sin backdrop-blur */}
          <div className="absolute top-3 left-3 sm:top-6 sm:left-6">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-gray-900/90 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-emerald-500/30">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400" />
              <span className="text-white font-semibold text-xs sm:text-sm">Punto {point.id}</span>
            </div>
          </div>

          {/* Title optimizado */}
          <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6">
            <h3 className="text-xl sm:text-3xl font-black text-white mb-2 sm:mb-3 tracking-tight leading-tight">{point.name}</h3>
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-2xl shadow-lg">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600 flex-shrink-0" strokeWidth={2} />
              <p className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-1">{point.address}</p>
            </div>
          </div>
        </div>

        {/* Content optimizado */}
        <div className="relative flex-1 flex flex-col p-4 sm:p-8 space-y-4 sm:space-y-6">
          <SecurityFeatures security={point.security} />
          <ScheduleGrid 
            days={point.days}
            schedule={point.schedule}
            weekendSchedule={point.weekendSchedule}
          />

          {/* CTA button optimizado */}
          <a
            href={point.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 sm:gap-3 w-full bg-gradient-to-b from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-colors duration-200 shadow-lg mt-auto"
          >
            <Navigation className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2} />
            <span className="text-sm sm:text-base">Abrir en Maps</span>
          </a>
        </div>
      </div>
    </div>
  );
});

PickupPointCard.displayName = 'PickupPointCard';

export default PickupPointCard;
