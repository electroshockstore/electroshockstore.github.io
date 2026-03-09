import { memo } from 'react';
import SlashDivider from './SlashDivider';

const CardContent = memo(({ brand, quantity, name, accent, savings, horizontal = false }) => {
  return (
    <div className={`flex flex-col gap-0 flex-1 p-3 sm:p-6 ${horizontal ? 'justify-center' : ''}`}>
      {/* Brand + slash row */}
      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4">
        <span
          className="text-[11px] sm:text-sm font-black tracking-[0.15em] uppercase"
          style={{ color: accent }}
        >
          {brand}
        </span>
        <SlashDivider color={accent} />
        <span className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-white/30">
          PACK ×{quantity}
        </span>
      </div>

      {/* Product name */}
      <h3 className={`text-white font-black leading-[1.1] mb-3 sm:mb-6 text-[15px] sm:text-xl ${horizontal ? 'line-clamp-1' : 'line-clamp-2'}`}>
        {name}
      </h3>

      {/* Divider */}
      <div className="h-px mb-3 sm:mb-6" style={{ background: 'rgba(255,255,255,0.08)' }} />

      {/* Savings block */}
      <div className="mt-auto">
        <div className="flex items-end justify-between gap-2 sm:gap-4">
          {/* Label */}
          <div className="min-w-0 flex-1">
            <p className="text-[9px] sm:text-xs font-black tracking-[0.12em] uppercase mb-1 sm:mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Ahorrás
            </p>
            {/* Big saving number */}
            <p className="font-black leading-none mb-0.5 sm:mb-1 text-2xl sm:text-4xl" style={{ color: '#4ade80', letterSpacing: '-0.02em' }}>
              ${savings.toLocaleString('es-AR')}
            </p>
            <p className="text-[9px] sm:text-xs font-semibold tracking-wide uppercase leading-tight" style={{ color: 'rgba(74,222,128,0.6)' }}>
              en este pack
            </p>
          </div>

          {/* CTA arrow pill - solo desktop */}
          <div
            className="hidden sm:flex items-center justify-center w-12 h-12 rounded-xl flex-shrink-0"
            style={{ 
              background: accent, 
              color: '#000',
              transform: 'scale(1.1)'
            }}
          >
            <svg viewBox="0 0 16 16" fill="none" className="w-5 h-5">
              <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
});

CardContent.displayName = 'CardContent';
export default CardContent;
