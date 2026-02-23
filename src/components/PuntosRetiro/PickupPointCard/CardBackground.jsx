import { memo } from 'react';

const CardBackground = memo(({ pointId }) => (
  <>
    {/* Subtle grid texture */}
    <div 
      className="absolute inset-0 pointer-events-none" 
      style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.015) 1px, transparent 0)',
        backgroundSize: '28px 28px'
      }} 
    />

    {/* Green glow top-left corner */}
    <div 
      className="absolute -top-16 -left-16 w-48 h-48 rounded-full pointer-events-none" 
      style={{
        background: 'radial-gradient(circle, rgba(52,211,153,0.08) 0%, transparent 70%)'
      }} 
    />

    {/* Number watermark */}
    <span 
      className="absolute right-[-8px] bottom-[-20px] pointer-events-none select-none font-display text-[140px] leading-none tracking-[-4px]"
      style={{ color: 'rgba(52,211,153,0.04)' }}
    >
      {pointId}
    </span>
  </>
));

CardBackground.displayName = 'CardBackground';

export default CardBackground;
