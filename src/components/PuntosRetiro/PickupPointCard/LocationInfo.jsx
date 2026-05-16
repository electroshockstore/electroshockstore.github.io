import { memo } from 'react';
import { MapPin } from 'lucide-react';

const LocationInfo = memo(({ name, address }) => (
  <div className="absolute bottom-4 left-4 right-4 z-10">
    {/* Accent line cyan */}
    <span className="block w-12 h-[3px] rounded-full mb-3 bg-gradient-to-r from-[#22F5C7] to-[#00D9FF] shadow-[0_0_12px_rgba(34,245,199,0.5)]" />
    
    {/* Name - Más grande y dominante */}
    <h3 className="font-display text-[34px] leading-[0.95] text-white mb-3 tracking-[-1.5px] font-extrabold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
      {name}
    </h3>
    
    {/* Address chip flotante */}
    <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.4)] max-w-full bg-white/[0.98] backdrop-blur-md border border-white/20">
      <MapPin className="w-3.5 h-3.5 text-[#22F5C7] flex-shrink-0" strokeWidth={2.5} />
      <p className="text-xs font-bold text-[#0A1024] leading-none truncate">
        {address}
      </p>
    </div>
  </div>
));

LocationInfo.displayName = 'LocationInfo';

export default LocationInfo;
