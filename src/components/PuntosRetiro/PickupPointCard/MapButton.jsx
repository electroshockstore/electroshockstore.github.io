import { memo } from 'react';
import { Navigation } from 'lucide-react';

const MapButton = memo(({ mapUrl }) => (
  <a
    href={mapUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="ppc-cta map-button-gradient relative flex items-center justify-center gap-2 sm:gap-3 w-full text-white font-black py-3.5 sm:py-4 rounded-xl sm:rounded-2xl overflow-hidden uppercase tracking-wider text-sm sm:text-base"
  >
    <Navigation className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" strokeWidth={2.5} />
    <span>Abrir en Maps</span>
  </a>
));

MapButton.displayName = 'MapButton';

export default MapButton;
