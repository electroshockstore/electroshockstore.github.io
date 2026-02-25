import HeroBackground from './HeroSection/HeroBackground';
import HeroBadge from './HeroSection/HeroBadge';
import HeroTitleDesktop from './HeroSection/HeroTitleDesktop';
import HeroTitleMobile from './HeroSection/HeroTitleMobile';
import HeroIcon3D from './HeroSection/HeroIcon3D';
import HeroCTA from './HeroSection/HeroCTA';
import HeroFeatures from './HeroSection/HeroFeatures';

const HeroSection = () => {
  return (
    <section className="relative px-4 sm:px-6 lg:px-6 pt-2 pb-8 sm:py-16 lg:py-8 overflow-hidden min-h-[80vh] lg:min-h-[calc(100vh-140px)] lg:max-h-[calc(100vh-140px)] flex items-start sm:items-center">
      <HeroBackground />

      {/* Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Content */}
        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-6 lg:gap-12">
          
          {/* Text Content */}
          <div className="flex-1 text-left lg:text-left lg:order-1 w-full">
            
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

            {/* Description - Layout moderno con highlight */}
            <div className="mb-4 lg:mb-6 max-w-md lg:max-w-xl">
              <p className="text-base lg:text-lg text-gray-300 leading-relaxed font-medium">
                Elegí el punto más cercano y coordiná el retiro{' '}
                <span className="font-black text-black relative inline-block px-2 py-0.5 ml-1 bg-blue-500">
                  seguro
                </span>
              </p>
            </div>

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

