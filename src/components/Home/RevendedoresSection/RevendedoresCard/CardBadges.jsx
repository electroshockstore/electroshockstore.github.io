import { memo } from 'react';
import { Package, TrendingDown } from 'lucide-react';

const CardBadges = memo(({ quantity, discountPercentage, accent }) => {
  return (
    <div className="absolute top-1.5 left-1.5 sm:top-3 sm:left-3 flex flex-col gap-1 sm:gap-2 z-10">
      {/* PACK badge */}
      <div
        className="flex items-center gap-1 px-1.5 py-0.5 sm:gap-1.5 sm:px-3 sm:py-1.5 rounded-md sm:rounded-lg shadow-lg rev-badge-pack"
        style={{
          background: accent,
          boxShadow: `0 4px 12px ${accent}40`,
        }}
      >
        <Package className="w-2 h-2 sm:w-3.5 sm:h-3.5 text-black" strokeWidth={3} />
        <span className="text-[9px] sm:text-sm font-black text-black tracking-wider uppercase">
          ×{quantity}
        </span>
      </div>
      
      {/* DESCUENTO badge */}
      <div
        className="flex items-center gap-1 px-1.5 py-0.5 sm:gap-1.5 sm:px-3 sm:py-1.5 rounded-md sm:rounded-lg shadow-lg rev-badge-discount"
        style={{
          border: `1px solid ${accent}60`,
          boxShadow: `0 4px 12px ${accent}30`,
        }}
      >
        <TrendingDown className="w-2 h-2 sm:w-3.5 sm:h-3.5" style={{ color: accent }} strokeWidth={2.5} />
        <span className="text-[9px] sm:text-sm font-black tracking-wider" style={{ color: accent }}>
          −{discountPercentage}%
        </span>
      </div>
    </div>
  );
});

CardBadges.displayName = 'CardBadges';
export default CardBadges;
