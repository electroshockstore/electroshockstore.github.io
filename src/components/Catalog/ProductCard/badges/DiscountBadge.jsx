import { memo } from 'react';
import { TrendingDown } from 'lucide-react';

const DiscountBadge = memo(({ percentage }) => {
  return (
    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-20 flex items-center gap-1 sm:gap-1.5 
                    px-2 py-1 sm:px-3 sm:py-1.5 
                    bg-gradient-to-r from-green-500 to-emerald-600 
                    rounded-lg shadow-lg backdrop-blur-sm">
      <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 text-white" strokeWidth={2.5} />
      <span className="text-[10px] sm:text-sm font-black text-white">
        -{percentage}%
      </span>
    </div>
  );
});

DiscountBadge.displayName = 'DiscountBadge';
export default DiscountBadge;
