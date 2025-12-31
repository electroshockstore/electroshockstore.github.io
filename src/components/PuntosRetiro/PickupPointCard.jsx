import { MapPin, Navigation } from 'lucide-react';
import SecurityFeatures from './SecurityFeatures';
import ScheduleGrid from './ScheduleGrid';

const PickupPointCard = ({ point }) => {
  return (
    <div className="group">
      {/* Apple-style card con glassmorphism */}
      <div className="relative bg-white/5 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden hover:bg-white/[0.07] transition-all duration-500 shadow-2xl hover:shadow-emerald-500/20">
        {/* Subtle mesh gradient background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-transparent to-blue-500/20" />
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`
          }} />
        </div>

        {/* Image header con overlay sofisticado */}
        <div className="relative h-48 sm:h-64 overflow-hidden">
          <img 
            src={point.image} 
            alt={point.name}
            className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
            loading="lazy"
          />
          {/* Apple-style gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          
          {/* Floating badge - minimalista */}
          <div className="absolute top-3 left-3 sm:top-6 sm:left-6">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-xl px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/20 shadow-lg">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white font-semibold text-xs sm:text-sm">Punto {point.id}</span>
            </div>
          </div>

          {/* Title - Apple typography con mejor jerarquía */}
          <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6">
            <h3 className="text-xl sm:text-3xl font-black text-white mb-2 sm:mb-3 tracking-tight leading-tight">{point.name}</h3>
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/95 backdrop-blur-xl px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-2xl shadow-xl">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600 flex-shrink-0" strokeWidth={2} />
              <p className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-1">{point.address}</p>
            </div>
          </div>
        </div>

        {/* Content - espaciado Apple */}
        <div className="relative p-4 sm:p-8 space-y-4 sm:space-y-6">
          <SecurityFeatures security={point.security} />
          <ScheduleGrid 
            days={point.days}
            schedule={point.schedule}
            weekendSchedule={point.weekendSchedule}
          />

          {/* Apple-style CTA button */}
          <a
            href={point.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn relative flex items-center justify-center gap-2 sm:gap-3 w-full bg-gradient-to-b from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/40 hover:-translate-y-0.5"
          >
            <Navigation className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2} />
            <span className="text-sm sm:text-base">Abrir en Maps</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PickupPointCard;
