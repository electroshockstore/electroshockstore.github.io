import { memo } from 'react';

const CardBackground = memo(({ pointId }) => (
  <>
    {/* Subtle grid texture */}
    <div className="absolute inset-0 pointer-events-none card-bg-grid" />

    {/* Green glow top-left corner */}
    <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full pointer-events-none card-bg-glow" />

    {/* Number watermark */}
    <span className="absolute right-[-8px] bottom-[-20px] pointer-events-none select-none font-display text-[140px] leading-none tracking-[-4px] text-emerald-400/[0.04]">
      {pointId}
    </span>
  </>
));

CardBackground.displayName = 'CardBackground';

export default CardBackground;
