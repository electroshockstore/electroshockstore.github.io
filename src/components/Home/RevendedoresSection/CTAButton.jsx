import { memo } from 'react';
import { Package, ArrowRight } from 'lucide-react';

const CTAButton = memo(({ onClick }) => {
  return (
    <div className="flex justify-center pt-10 sm:pt-14 px-4">
      <button
        onClick={onClick}
        className="group relative overflow-hidden inline-flex items-center gap-3 sm:gap-4 px-8 sm:px-12 py-4 sm:py-5 rounded-2xl font-bold text-white text-sm sm:text-base transition-all duration-300 hover:scale-105 active:scale-95 cta-shimmer rev-cta-bg rev-cta-shadow hover:rev-cta-shadow-hover"
      >
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300 rounded-2xl" />

        <Package className="relative z-10 w-5 h-5 group-hover:rotate-12 transition-transform duration-300 flex-shrink-0" />
        <span className="relative z-10 tracking-wide font-black uppercase text-xs sm:text-sm">
          Ver todos los kits mayoristas
        </span>
        <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300 flex-shrink-0" />
      </button>
    </div>
  );
});

CTAButton.displayName = 'CTAButton';
export default CTAButton;
