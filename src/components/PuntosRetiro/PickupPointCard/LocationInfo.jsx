import { memo } from 'react';
import { MapPin } from 'lucide-react';

const LocationInfo = memo(({ name, address }) => (
  <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5">
    {/* Accent line */}
    <span className="location-accent-line block w-10 h-[3px] rounded-sm mb-2" />
    
    {/* Name */}
    <h3 className="font-display text-3xl sm:text-4xl text-white mb-2.5 leading-none tracking-wide">
      {name}
    </h3>
    
    {/* Address chip */}
    <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl shadow-lg max-w-full bg-white/[0.96]">
      <MapPin className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" strokeWidth={2.5} />
      <p className="text-xs sm:text-sm font-bold text-gray-900 leading-none truncate">
        {address}
      </p>
    </div>
  </div>
));

LocationInfo.displayName = 'LocationInfo';

export default LocationInfo;
