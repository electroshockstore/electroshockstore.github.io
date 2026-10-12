import { memo } from 'react';
import { MessageCircle } from 'lucide-react';
import SecurityFeatures from '../SecurityFeatures';
import ScheduleGrid from '../ScheduleGrid';
import CardBackground from './CardBackground';
import PointBadge from './PointBadge';
import CardImage from './CardImage';
import LocationInfo from './LocationInfo';
import MapButton from './MapButton';

const waLink = (pointName) =>
  `https://wa.me/541125718382?text=${encodeURIComponent(`Hola, quiero coordinar el retiro en ${pointName}`)}`;

const PickupPointCard = memo(({ point }) => {
  return (
    <div className="h-full font-sans pickup-card-wrapper">
      {/* Card principal con diseño premium */}
      <div className="pickup-card-premium group relative h-full flex flex-col overflow-hidden transition-all duration-[350ms] cubic-bezier-smooth">

        {/* Background elements */}
        <CardBackground pointId={point.id} />

        {/* Foto cinematográfica con título */}
        <div className="relative flex-shrink-0">
          <CardImage image={point.image} name={point.name} index={point.id} />
          <PointBadge pointId={point.id} />
          <LocationInfo name={point.name} address={point.address} index={point.id} />
        </div>

        {/* Cuerpo */}
        <div className="relative flex-1 flex flex-col p-4 lg:p-5 gap-3 lg:gap-3.5">

          {/* Security features - Expandible */}
          <SecurityFeatures security={point.security} />

          {/* Horarios */}
          <ScheduleGrid
            days={point.days}
            schedule={point.schedule}
            weekendSchedule={point.weekendSchedule}
          />

          {/* Spacer flexible */}
          <div className="flex-1 min-h-[12px]" />

          {/* Separador punteado (solo desktop) */}
          <div
            aria-hidden="true"
            className="hidden border-t-2 border-dashed border-[#0e0e0e]/20 lg:block"
          />

          {/* CTA principal */}
          <MapButton mapUrl={point.mapUrl} />

          {/* CTA secundario: coordinar por WhatsApp */}
          <a
            href={waLink(point.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="landing-mono group/wa flex items-center justify-center gap-2 border-2 border-white/15 bg-transparent px-3 py-2.5 text-[11px] font-black uppercase tracking-[0.14em] text-white transition-all duration-150 hover:border-[#0e0e0e] hover:bg-[#0e0e0e] hover:text-[#c8f519] lg:border-[#0e0e0e] lg:text-[#0e0e0e] lg:hover:text-[#c8f519]"
          >
            <MessageCircle className="h-4 w-4 transition-transform duration-200 group-hover/wa:-rotate-12" strokeWidth={2.5} />
            Coordinar por WhatsApp
          </a>

        </div>
      </div>
    </div>
  );
});

PickupPointCard.displayName = 'PickupPointCard';

export default PickupPointCard;
