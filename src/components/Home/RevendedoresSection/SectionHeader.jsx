import { memo } from 'react';
import { TrendingUp, Zap } from 'lucide-react';

const SectionHeader = memo(() => {
  return (
    <div className="text-center mb-16 sm:mb-20 md:mb-24 px-4">
      {/* Eyebrow pill */}
      <div className="inline-flex items-center gap-2 mb-8">
        <div className="relative inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-amber-400/40 bg-amber-500/10 backdrop-blur-md badge-bounce">
          <div className="relative flex-shrink-0 pulse-ring-el">
            <div className="w-2 h-2 rounded-full bg-amber-400" />
          </div>
          <span className="text-xs font-bold text-amber-300 uppercase tracking-[0.2em]">
            Mayoristas
          </span>
          <Zap className="w-3.5 h-3.5 text-amber-400" />
        </div>
      </div>

      {/* Main title block */}
      <div className="relative max-w-5xl mx-auto">
        {/* Headline */}
        <h2 className="font-black leading-[0.9] tracking-tighter mb-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <span className="inline text-6xl sm:text-6xl md:text-7xl lg:text-8xl text-white" style={{ letterSpacing: '-0.03em' }}>
            Kit{' '}
          </span>
          <span className="inline text-7xl sm:text-7xl md:text-9xl lg:text-[10rem] relative text-glow rev-header-gradient-text" style={{ letterSpacing: '-0.04em' }}>
            Ahorro
            <span className="absolute -right-4 sm:-right-6 top-0 text-amber-500/20 text-[0.5em] font-thin select-none hidden md:block">/</span>
          </span>
          
          {/* SVG tag */}
          <span className="relative inline-flex tag-float">
            <span className="hidden md:block absolute inset-0 rounded-full rev-tag-glow" />
            <span className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center rounded-2xl border border-amber-400/30 rev-tag-box">
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8 8a2 2 0 0 0 2.828 0l7.172-7.172a2 2 0 0 0 0-2.828l-8-8z"
                  fill="#fb923c"
                />
                <circle cx="7" cy="7" r="1.5" fill="#0f172a" fillOpacity="0.8" />
                <line x1="9" y1="14" x2="15" y2="9" stroke="#ffffff" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
          </span>
        </h2>

        {/* Subheadline */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
          <p className="text-base sm:text-xl md:text-2xl text-gray-300 font-medium max-w-xl leading-relaxed">
            Comprá al por mayor y{' '}
            <span className="text-amber-300 font-bold">maximizá tu ganancia</span>.
          </p>

          {/* Stats pill */}
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-bold text-emerald-300">Hasta 40% OFF</span>
          </div>
        </div>

        {/* Decorative horizontal rule */}
        <div className="flex items-center gap-4 mt-10 max-w-xs sm:max-w-sm mx-auto">
          <div className="flex-1 h-px rev-divider-left" />
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <div className="flex-1 h-px rev-divider-right" />
        </div>
      </div>
    </div>
  );
});

SectionHeader.displayName = 'SectionHeader';
export default SectionHeader;
