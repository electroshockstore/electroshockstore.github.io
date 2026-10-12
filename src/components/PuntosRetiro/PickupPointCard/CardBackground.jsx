import { memo } from 'react';

const CardBackground = memo(({ pointId }) => (
  <>
    {/* Subtle grid texture */}
    <div className="absolute inset-0 pointer-events-none card-bg-grid" />

    {/* Green glow top-left corner */}
    <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full pointer-events-none card-bg-glow" />

    {/* Number watermark */}
    <span className="ppc-ghost absolute right-[-8px] bottom-[-20px] pointer-events-none select-none font-display lg:landing-pixel text-[140px] leading-none tracking-[-4px] text-emerald-400/[0.04]">
      {String(pointId).padStart(2, '0')}
    </span>
  </>
));

CardBackground.displayName = 'CardBackground';

export default CardBackground;
