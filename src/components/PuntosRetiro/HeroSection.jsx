import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import HeroBackground from './HeroSection/HeroBackground';
import HeroBadge from './HeroSection/HeroBadge';
import HeroTitleDesktop from './HeroSection/HeroTitleDesktop';
import HeroTitleMobile from './HeroSection/HeroTitleMobile';
import HeroIcon3D from './HeroSection/HeroIcon3D';
import HeroCTA from './HeroSection/HeroCTA';
import HeroFeatures from './HeroSection/HeroFeatures';

const HeroSection = () => {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight * 0.75,
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative px-4 sm:px-6 lg:px-6 pt-2 pb-20 sm:pb-24 lg:pb-28 overflow-hidden min-h-[75vh] lg:min-h-[85vh] flex items-start sm:items-center">
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

      {/* Indicador de scroll simple y efectivo */}
      <motion.button
        onClick={scrollToContent}
        className="absolute bottom-8 lg:bottom-12 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer group"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <span className="text-xs lg:text-sm text-blue-400/80 font-medium">Ver más</span>
        <motion.div
          className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 lg:w-6 lg:h-6 text-blue-400" />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default HeroSection;

