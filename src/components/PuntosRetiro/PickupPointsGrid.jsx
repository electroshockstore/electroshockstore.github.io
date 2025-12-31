import PickupPointCard from './PickupPointCard';

const PickupPointsGrid = ({ pickupPoints }) => {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12 md:mb-16">
      {pickupPoints.map((point) => (
        <PickupPointCard key={point.id} point={point} />
      ))}
    </div>
  );
};

export default PickupPointsGrid;
