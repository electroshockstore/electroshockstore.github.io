import useIOSDetection from '../../../hooks/useIOSDetection';

/**
 * Titular desktop (lg+): marker lima + tinta, mismo lenguaje que el
 * hero del landing (Orbitron/SHOCK en lima con trazo negro).
 */
const HeroTitleDesktop = () => {
  const isIOS = useIOSDetection();

  return (
    <h1 className="hidden lg:block font-black leading-none lg:leading-[0.95] mb-8 lg:mb-5 uppercase tracking-tight">
      {/* Línea 1: DÓNDE RETIRO */}
      <div className="block mb-2">
        <span className="inline-block relative whitespace-nowrap text-[8.5rem] xl:text-[10rem]">
          {/* Marker layers lima - efecto brutalista */}
          <span className="absolute inset-0 transform skew-x-[-6deg] rotate-[-1.5deg] translate-x-2 translate-y-2 opacity-100 bg-[#0e0e0e]" />
          <span className="absolute inset-0 transform skew-x-[-6deg] rotate-[-0.5deg] translate-x-1 translate-y-1 opacity-100 bg-[#a8d400]" />
          <span className="absolute inset-0 transform skew-x-[-6deg] opacity-100 bg-[#c8f519]" />

          {/* Corner accents */}
          <span
            className="absolute w-3 h-3 -top-1 -left-1 opacity-80 bg-[#0e0e0e]"
            style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
          />
          <span
            className="absolute w-3 h-3 -bottom-1 -right-1 opacity-80 bg-[#f6f6f6]"
            style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}
          />

          {/* Text */}
          <span className="hero-title-text relative text-[#0e0e0e] px-8 md:px-8 inline-block font-black uppercase tracking-tight">
            DÓNDE RETIRO
          </span>

          {/* Glow lima (only non-iOS) */}
          {!isIOS && (
            <span className="hero-marker-glow absolute inset-0 opacity-50 blur-[30px] bg-[#c8f519]" />
          )}
        </span>
      </div>

      {/* Línea 2: LOS PRODUCTOS */}
      <div className="block">
        <span className="text-[#0e0e0e] text-[8.5rem] xl:text-[10rem]">LOS PRODUCTOS</span>
        <span
          aria-hidden="true"
          className="mt-3 block h-[6px] w-64 bg-[#0e0e0e]"
        />
        <span
          aria-hidden="true"
          className="mt-1 block h-[6px] w-40 bg-[#c8f519]"
        />
      </div>
    </h1>
  );
};

export default HeroTitleDesktop;
