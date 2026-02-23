import { memo } from 'react';
import SecurityFeatures from '../SecurityFeatures';
import ScheduleGrid from '../ScheduleGrid';
import CardBackground from './CardBackground';
import PointBadge from './PointBadge';
import CardImage from './CardImage';
import LocationInfo from './LocationInfo';
import InfoBlock from './InfoBlock';
import MapButton from './MapButton';

const PickupPointCard = memo(({ point }) => {
  return (
    <div className="h-full font-sans">
      <div 
        className="ppc-card relative h-full flex flex-col rounded-2xl sm:rounded-3xl border overflow-hidden shadow-2xl"
        style={{
          background: 'linear-gradient(160deg, #0f1923 0%, #111827 50%, #0d1520 100%)',
          borderColor: 'rgba(255,255,255,0.08)',
        }}
      >
        {/* Background elements */}
        <CardBackground pointId={point.id} />

        {/* Image header with badge and location */}
        <div className="relative">
          <CardImage image={point.image} name={point.name} />
          <PointBadge pointId={point.id} />
          <LocationInfo name={point.name} address={point.address} />
        </div>

        {/* Content area */}
        <div className="relative flex-1 flex flex-col p-4 sm:p-6 gap-4 sm:gap-5">
          
          {/* Security features */}
          <InfoBlock variant="security">
            <SecurityFeatures security={point.security} />
          </InfoBlock>

          {/* Separator */}
          <hr className="border-none border-t-[1.5px] border-dashed border-white/[0.07] m-0" />

          {/* Schedule */}
          <InfoBlock variant="schedule">
            <ScheduleGrid
              days={point.days}
              schedule={point.schedule}
              weekendSchedule={point.weekendSchedule}
            />
          </InfoBlock>

          {/* Spacer */}
          <div className="flex-1" />

          {/* CTA Button */}
          <MapButton mapUrl={point.mapUrl} />

        </div>
      </div>
    </div>
  );
});

PickupPointCard.displayName = 'PickupPointCard';

export default PickupPointCard;
