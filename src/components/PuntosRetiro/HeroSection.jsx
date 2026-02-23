import HeroBackground from './HeroSection/HeroBackground';
import HeroBadge from './HeroSection/HeroBadge';
import HeroTitleDesktop from './HeroSection/HeroTitleDesktop';
import HeroTitleMobile from './HeroSection/HeroTitleMobile';
import HeroIcon3D from './HeroSection/HeroIcon3D';
import HeroCTA from './HeroSection/HeroCTA';
import HeroFeatures from './HeroSection/HeroFeatures';

const HeroSection = () => {
  return (
    <section className="relative px-4 sm:px-6 lg:px-6 py-10 sm:py-12 lg:py-8 overflow-hidden min-h-[85vh] lg:min-h-[calc(100vh-140px)] lg:max-h-[calc(100vh-140px)] flex items-center">
      <HeroBackground />

      {/* Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Content */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left lg:order-1">
            
            {/* Badges */}
            <HeroBadge 
              text="Puntos de retiro disponibles" 
              icon="📍" 
              showDot 
              className="hidden lg:inline-flex" 
            />
            <HeroBadge 
              text="NO TENEMOS LOCAL FISICO" 
              icon="🚫" 
              className="inline-flex lg:hidden" 
            />

            {/* Titles */}
            <HeroTitleDesktop />
            <HeroTitleMobile />

            {/* Description */}
            <p className="text-base sm:text-xl lg:text-lg text-gray-400 max-w-2xl lg:max-w-xl mx-auto lg:mx-0 mb-7 sm:mb-9 lg:mb-6 leading-relaxed font-medium">
              Elegí el punto más cercano y coordiná el retiro{' '}
              <span className="font-black text-white relative inline-block px-1" style={{ background: 'rgba(59,130,246,0.15)' }}>
                seguro
              </span>
            </p>

            {/* CTA + Stats */}
            <HeroCTA />
          </div>

          {/* 3D Icon */}
          <HeroIcon3D />
        </div>

        {/* Feature pills */}
        <HeroFeatures />
      </div>
    </section>
  );
};

export default HeroSection;

