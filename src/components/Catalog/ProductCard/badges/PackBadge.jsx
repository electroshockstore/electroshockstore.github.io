import { memo } from 'react';
import { Package } from 'lucide-react';

const PackBadge = memo(({ quantity }) => {
  return (
    <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-20 flex items-center gap-1 sm:gap-1.5 
                    px-2 py-1 sm:px-3 sm:py-1.5 
                    bg-gradient-to-r from-amber-500 to-orange-600 
                    rounded-lg shadow-lg backdrop-blur-sm">
      <Package className="w-3 h-3 sm:w-4 sm:h-4 text-white" strokeWidth={2.5} />
      <span className="text-[10px] sm:text-sm font-black text-white uppercase tracking-wider">
        ×{quantity}
      </span>
    </div>
  );
});

PackBadge.displayName = 'PackBadge';
export default PackBadge;
