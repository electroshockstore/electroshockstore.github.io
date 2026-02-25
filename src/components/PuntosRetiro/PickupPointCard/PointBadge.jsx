import { memo } from 'react';

const PointBadge = memo(({ pointId }) => (
  <div className="absolute top-3 left-3 sm:top-5 sm:left-5">
    <div className="ppc-badge point-badge relative inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full overflow-hidden backdrop-blur-sm">
      <div className="ppc-dot relative w-2 h-2 rounded-full flex-shrink-0 bg-emerald-400" />
      <span className="text-white font-black text-xs sm:text-sm tracking-wide">
        Punto {pointId}
      </span>
    </div>
  </div>
));

PointBadge.displayName = 'PointBadge';

export default PointBadge;
