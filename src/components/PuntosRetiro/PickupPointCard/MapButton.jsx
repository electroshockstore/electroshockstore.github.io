import { memo } from 'react';
import { Navigation } from 'lucide-react';

const MapButton = memo(({ mapUrl }) => (
  <a
    href={mapUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="ppc-cta relative flex items-center justify-center gap-2 sm:gap-3 w-full text-white font-black py-3.5 sm:py-4 rounded-xl sm:rounded-2xl shadow-lg overflow-hidden uppercase tracking-wider text-sm sm:text-base"
    style={{
      background: 'linear-gradient(160deg, #34d399 0%, #10b981 50%, #059669 100%)',
      boxShadow: '0 4px 24px rgba(16,185,129,0.3)',
    }}
  >
    <Navigation className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" strokeWidth={2.5} />
    <span>Abrir en Maps</span>
  </a>
));

MapButton.displayName = 'MapButton';

export default MapButton;
