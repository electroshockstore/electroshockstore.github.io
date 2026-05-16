import { memo } from 'react';

const PointBadge = memo(({ pointId }) => (
  <div className="absolute top-4 left-4 z-10">
    <div className="point-badge-premium inline-flex items-center gap-2 px-3.5 py-2 rounded-full overflow-hidden backdrop-blur-md">
      <div className="relative w-2 h-2 rounded-full flex-shrink-0 bg-[#22F5C7] shadow-[0_0_8px_rgba(34,245,199,0.8)]">
        <div className="absolute inset-0 rounded-full bg-[#22F5C7] animate-ping opacity-75" />
      </div>
      <span className="text-white font-extrabold text-xs tracking-wider uppercase">
        Punto {pointId}
      </span>
    </div>
  </div>
));

PointBadge.displayName = 'PointBadge';

export default PointBadge;
