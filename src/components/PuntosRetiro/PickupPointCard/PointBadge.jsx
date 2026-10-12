import { memo } from 'react';

const PointBadge = memo(({ pointId }) => (
  <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
    <div className="point-badge-premium inline-flex items-center gap-2 px-3.5 py-2 rounded-full lg:rounded-none overflow-hidden backdrop-blur-md">
      <div className="relative w-2 h-2 rounded-full lg:rounded-none flex-shrink-0 bg-[#22F5C7] lg:bg-[#c8f519] shadow-[0_0_8px_rgba(34,245,199,0.8)] lg:shadow-[0_0_8px_rgba(200,245,25,0.9)]">
        <div className="absolute inset-0 rounded-full lg:rounded-none bg-[#22F5C7] lg:bg-[#c8f519] animate-ping opacity-75" />
      </div>
      <span className="landing-mono text-white font-extrabold text-xs tracking-[0.14em] uppercase">
        Punto {pointId}
      </span>
    </div>
    <span className="landing-mono hidden border border-white/40 bg-black/55 px-2 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-white backdrop-blur-sm lg:inline-block">
      Retiro
    </span>
  </div>
));

PointBadge.displayName = 'PointBadge';

export default PointBadge;
