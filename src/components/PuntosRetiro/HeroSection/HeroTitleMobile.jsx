const HeroTitleMobile = () => {
  return (
    <div className="flex lg:hidden flex-col mb-6 w-full">
      {/* Grid brutalist con desalineación intencional */}
      <div className="relative w-full">
        
        {/* Línea 1: DÓNDE - Alineado izquierda con marker effect azul */}
        <div className="mb-2">
          <div className="inline-block relative">
            <span className="inline-block relative text-[3.8rem] leading-[0.9]">
              <span 
                className="absolute inset-0 transform skew-x-[-6deg] rotate-[-1deg] translate-x-1 translate-y-1"
                style={{ background: 'rgb(37, 99, 235)' }}
              />
              <span 
                className="absolute inset-0 transform skew-x-[-6deg]"
                style={{ background: 'rgb(59, 130, 246)' }}
              />
              <span 
                className="relative text-black inline-block font-black uppercase tracking-[-0.03em] px-3 py-1"
                style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.2)' }}
              >
                DÓNDE
              </span>
            </span>
          </div>
        </div>

        {/* Línea 2: RETIRO - Alineado izquierda con marker effect naranja + SVG al final */}
        <div className="flex items-center gap-2 mb-2 pl-2">
          <div className="inline-block relative">
            <span className="inline-block relative text-[3.8rem] leading-[0.9]">
              <span 
                className="absolute inset-0 transform skew-x-[6deg] rotate-[1deg] translate-x-1 translate-y-1"
                style={{ background: 'rgb(234, 88, 12)' }}
              />
              <span 
                className="absolute inset-0 transform skew-x-[6deg]"
                style={{ background: 'rgb(249, 115, 22)' }}
              />
              <span 
                className="relative text-black inline-block font-black uppercase tracking-[-0.03em] px-16 py-1"
                style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.2)' }}
              >
                RETIRO
              </span>
            </span>
          </div>
          <svg
            viewBox="0 0 200 240"
            className="hero-question-bounce w-11 h-13 flex-shrink-0"
            style={{ filter: 'drop-shadow(0 4px 12px rgba(59,130,246,0.6))' }}
          >
            <defs>
              <linearGradient id="qGradMob1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
            </defs>
            <path
              d="M 68 74 Q 64 42 100 30 Q 148 16 152 54 Q 158 84 132 98 Q 118 108 112 122 L 108 148"
              fill="none"
              stroke="url(#qGradMob1)"
              strokeWidth="30"
              strokeLinecap="round"
            />
            <ellipse cx="100" cy="196" rx="17" ry="16" fill="url(#qGradMob1)" />
          </svg>
        </div>

        {/* Línea 3: LOS PRODUCTOS - Alineado izquierda con accent */}
        <div className="flex items-start gap-2">
          <div className="w-1 h-16 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full flex-shrink-0" />
          <div className="flex-1">
            <span className="text-white text-[3.8rem] font-black uppercase tracking-[-0.03em] leading-[0.9] block">
              LOS
            </span>
            <span className="text-white text-[3.8rem] font-black uppercase tracking-[-0.03em] leading-[0.9] block">
              PRODUCTOS
            </span>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -right-2 top-1/2 w-2 h-24 bg-gradient-to-b from-transparent via-blue-500/30 to-transparent rounded-full" />
      </div>
    </div>
  );
};

export default HeroTitleMobile;
