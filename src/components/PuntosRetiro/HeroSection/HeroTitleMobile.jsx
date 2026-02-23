const HeroTitleMobile = () => {
  return (
    <div className="flex lg:hidden flex-col items-center gap-3 mb-6">
      <h1 className="font-black leading-[1.1] tracking-tight text-center">
        {/* Línea 1: DÓNDE RETIRO con efecto brutalist */}
        <span className="block mb-2">
          <span className="inline-block relative text-[2.5rem] sm:text-[3.5rem] px-2 sm:px-3">
            {/* Marker layers mobile - Más pequeños */}
            <span 
              className="absolute inset-0 transform skew-x-[-6deg] rotate-[-1.5deg] translate-x-1 translate-y-1 opacity-100"
              style={{ background: 'rgb(37, 99, 235)' }}
            />
            <span 
              className="absolute inset-0 transform skew-x-[-6deg] rotate-[-0.5deg] translate-x-0.5 translate-y-0.5 opacity-100"
              style={{ background: 'rgb(59, 130, 246)' }}
            />
            <span 
              className="absolute inset-0 transform skew-x-[-6deg] opacity-100"
              style={{ background: 'rgb(96, 165, 250)' }}
            />
            
            {/* Text */}
            <span 
              className="relative text-black inline-block font-black uppercase tracking-tight"
              style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.2)' }}
            >
              DÓNDE RETIRO
            </span>
          </span>
        </span>
        
        {/* Línea 2: los productos + SVG interactivo después */}
        <span className="flex items-center justify-center gap-2 flex-wrap">
          <span className="text-white text-[2.5rem] sm:text-[3.5rem] font-bold normal-case">
            los productos
          </span>
          
          {/* SVG interactivo después del texto */}
          <svg
            viewBox="0 0 200 240"
            className="hero-question-svg-mobile w-10 h-12 sm:w-12 sm:h-[3.6rem] flex-shrink-0"
            style={{ filter: 'drop-shadow(0 4px 12px rgba(59,130,246,0.6))' }}
          >
            <defs>
              <linearGradient id="qGradMobileSmall" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
            </defs>
            <path
              d="M 68 74 Q 64 42 100 30 Q 148 16 152 54 Q 158 84 132 98 Q 118 108 112 122 L 108 148"
              fill="none"
              stroke="url(#qGradMobileSmall)"
              strokeWidth="30"
              strokeLinecap="round"
            />
            <ellipse cx="100" cy="196" rx="17" ry="16" fill="url(#qGradMobileSmall)" />
          </svg>
        </span>
      </h1>
    </div>
  );
};

export default HeroTitleMobile;
