import useIOSDetection from '../../../hooks/useIOSDetection';

const HeroTitleDesktop = () => {
  const isIOS = useIOSDetection();

  return (
    <h1 className="hidden lg:block font-black leading-none lg:leading-[0.95] mb-8 lg:mb-5 uppercase tracking-tight">
      {/* Línea 1: DÓNDE RETIRO */}
      <div className="block mb-2">
        <span className="inline-block relative whitespace-nowrap text-[8.5rem] xl:text-[10rem]">
          {/* Marker layers - Brutalist effect */}
          <span 
            className="absolute inset-0 transform skew-x-[-6deg] rotate-[-1.5deg] translate-x-2 translate-y-2 opacity-100"
            style={{ background: 'rgb(37, 99, 235)' }}
          />
          <span 
            className="absolute inset-0 transform skew-x-[-6deg] rotate-[-0.5deg] translate-x-1 translate-y-1 opacity-100"
            style={{ background: 'rgb(59, 130, 246)' }}
          />
          <span 
            className="absolute inset-0 transform skew-x-[-6deg] opacity-100"
            style={{ background: 'rgb(96, 165, 250)' }}
          />
          
          {/* Corner accents */}
          <span 
            className="absolute w-3 h-3 -top-1 -left-1 opacity-80"
            style={{ 
              background: 'white',
              clipPath: 'polygon(0 0, 100% 0, 0 100%)'
            }}
          />
          <span 
            className="absolute w-3 h-3 -bottom-1 -right-1 opacity-80"
            style={{ 
              background: 'rgb(30, 58, 138)',
              clipPath: 'polygon(100% 0, 100% 100%, 0 100%)'
            }}
          />
          
          {/* Text */}
          <span 
            className="relative text-black px-8 md:px-8 inline-block font-black uppercase tracking-tight"
            style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.2)' }}
          >
            DÓNDE RETIRO
          </span>
          
          {/* Glow effect (only non-iOS) */}
          {!isIOS && (
            <span 
              className="hero-marker-glow absolute inset-0 opacity-50 blur-[30px]"
              style={{ background: 'rgb(96, 165, 250)' }}
            />
          )}
        </span>
      </div>

      {/* Línea 2: LOS PRODUCTOS */}
      <div className="block">
        <span className="text-white text-[8.5rem] xl:text-[10rem]">LOS PRODUCTOS</span>
      </div>
    </h1>
  );
};

export default HeroTitleDesktop;
