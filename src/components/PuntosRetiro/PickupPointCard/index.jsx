import { memo } from 'react';
import SecurityFeatures from '../SecurityFeatures';
import ScheduleGrid from '../ScheduleGrid';
import CardBackground from './CardBackground';
import PointBadge from './PointBadge';
import CardImage from './CardImage';
import LocationInfo from './LocationInfo';
import MapButton from './MapButton';

const PickupPointCard = memo(({ point }) => {
  return (
    <div className="h-full font-sans pickup-card-wrapper">
      {/* Card principal con diseño premium */}
      <div className="pickup-card-premium relative h-full flex flex-col overflow-hidden transition-all duration-[350ms] cubic-bezier-smooth">
        
        {/* Background elements */}
        <CardBackground pointId={point.id} />

        {/* Imagen dominante más grande */}
        <div className="relative flex-shrink-0">
          <CardImage image={point.image} name={point.name} />
          <PointBadge pointId={point.id} />
          <LocationInfo name={point.name} address={point.address} />
        </div>

        {/* Content area - Diseño flotante moderno */}
        <div className="relative flex-1 flex flex-col p-5 gap-3.5">
          
          {/* Security features - Expandible con glassmorphism */}
          <SecurityFeatures security={point.security} />

          {/* Schedule - Diseño moderno sin separador */}
          <ScheduleGrid
            days={point.days}
            schedule={point.schedule}
            weekendSchedule={point.weekendSchedule}
          />

          {/* Spacer flexible */}
          <div className="flex-1 min-h-[12px]" />

          {/* CTA Button - Gigante y dominante */}
          <MapButton mapUrl={point.mapUrl} />

        </div>
      </div>
    </div>
  );
});

PickupPointCard.displayName = 'PickupPointCard';

export default PickupPointCard;
