import { MapPin } from 'lucide-react';
import PickupPointCard from './PickupPointCard';

const PickupPointsGrid = ({ pickupPoints }) => {
  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="text-center mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-3 sm:gap-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md px-6 py-3 sm:px-10 sm:py-5 rounded-full border border-blue-500/30 mb-6 sm:mb-8 shadow-lg shadow-blue-500/20">
          <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" strokeWidth={2.5} />
          <span className="text-blue-400 font-black text-base sm:text-xl">Puntos de Retiro</span>
        </div>
        
        <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 font-semibold px-4">
          Elegí el que te quede más cómodo
        </p>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
        {pickupPoints.map((point) => (
          <PickupPointCard key={point.id} point={point} />
        ))}
      </div>
    </div>
  );
};

export default PickupPointsGrid;
