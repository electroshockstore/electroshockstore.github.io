import { memo } from 'react';

const TickerStrip = memo(() => {
  return (
    <div className="mt-16 sm:mt-20 overflow-hidden border-y border-amber-500/10 py-3 bg-amber-500/5">
      <div className="flex whitespace-nowrap rev-ticker">
        {[...Array(8)].map((_, i) => (
          <span key={i} className="inline-flex items-center gap-3 px-6 text-xs font-bold text-amber-400/60 uppercase tracking-widest">
            <span className="w-1 h-1 rounded-full bg-amber-500/50 flex-shrink-0" />
            Comprá al por mayor
            <span className="w-1 h-1 rounded-full bg-orange-500/50 flex-shrink-0" />
            Mejores precios
            <span className="w-1 h-1 rounded-full bg-red-500/50 flex-shrink-0" />
            promociones exclusivas
          </span>
        ))}
      </div>
    </div>
  );
});

TickerStrip.displayName = 'TickerStrip';
export default TickerStrip;
