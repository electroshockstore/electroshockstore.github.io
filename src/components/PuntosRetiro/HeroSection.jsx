import { motion } from 'framer-motion';
import { ChevronDown, MapPin, Ban } from 'lucide-react';
import { getAppScroller } from '../../context/ScrollContext';
import HeroBackground from './HeroSection/HeroBackground';
import HeroBadge from './HeroSection/HeroBadge';
import HeroTitleDesktop from './HeroSection/HeroTitleDesktop';
import HeroTitleMobile from './HeroSection/HeroTitleMobile';
import HeroIcon3D from './HeroSection/HeroIcon3D';
import HeroCTA from './HeroSection/HeroCTA';
import HeroFeatures from './HeroSection/HeroFeatures';

const HERO_STRIP = [
  'Sin local · Solo retiro',
  'Lun a Dom · 9 a 21 h',
  'Revisás y pagás en el momento',
];

const HeroSection = () => {
  const scrollToContent = () => {
    const el = getAppScroller();
    const top = window.innerHeight * 0.75;
    if (el) {
      el.scrollTo({ top, behavior: 'smooth' });
      return;
    }
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <section className="relative px-4 sm:px-6 lg:px-0 pt-2 pb-20 sm:pb-24 lg:pb-0 overflow-hidden min-h-[75vh] lg:min-h-[85vh] flex flex-col items-start sm:items-center lg:items-stretch lg:justify-center">
      <HeroBackground />

      {/* Texturas del landing (solo desktop) */}
      <div className="hero-dots pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true" />
      <div className="hero-scan pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true" />

      {/* Container */}
      <div className="relative z-10 mx-auto w-full max-w-7xl lg:px-6">
        {/* Fila de índice (solo desktop) */}
        <div className="mb-5 hidden items-center gap-3 lg:flex" aria-hidden="true">
          <span className="hero-square" />
          <span className="landing-mono text-[12px] font-black uppercase tracking-[0.18em] text-[#0e0e0e]/60">
            01 / Retiros personales
          </span>
          <span className="h-px flex-1 bg-[#0e0e0e]/15" />
          <span className="landing-mono text-[12px] font-black uppercase tracking-[0.18em] text-[#0e0e0e]/60">
            Zona Sur · FV
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-6 lg:gap-12">

          {/* Text Content */}
          <div className="flex-1 text-left lg:text-left lg:order-1 w-full">

            {/* Badges */}
            <HeroBadge
              text="Puntos de retiro disponibles"
              icon={<MapPin strokeWidth={2.5} />}
              showDot
              className="hidden lg:inline-flex"
            />
            <HeroBadge
              text="NO TENEMOS LOCAL FISICO"
              icon={<Ban strokeWidth={2.5} />}
              className="inline-flex lg:hidden"
            />

            {/* Titles */}
            <HeroTitleDesktop />
            <HeroTitleMobile />

            {/* Description - Layout moderno con highlight */}
            <div className="mb-4 lg:mb-6 max-w-md lg:max-w-xl">
              <p className="text-base lg:text-lg text-gray-300 lg:text-[#0e0e0e] leading-relaxed font-medium">
                Elegí el punto más cercano y coordiná el retiro{' '}
                <span className="font-black text-[#0e0e0e] relative inline-block px-2 py-0.5 ml-1 bg-[#c8f519] shadow-[3px_3px_0_0_#0e0e0e]">
                  seguro
                </span>
              </p>
            </div>

            {/* CTA + Stats */}
            <HeroCTA onSeePoints={scrollToContent} />
          </div>

          {/* 3D Icon */}
          <HeroIcon3D />
        </div>

        {/* Feature pills */}
        <HeroFeatures />
      </div>

      {/* Tira inferior de wayfinding (solo desktop, reemplaza el "Ver más") */}
      <div className="relative z-10 mt-10 hidden border-t border-[#9e9e9e] bg-[#f6f6f6] lg:block" aria-hidden="true">
        <div className="mx-auto flex max-w-7xl items-stretch px-6">
          {HERO_STRIP.map((item, i) => (
            <div
              key={item}
              className={`landing-mono flex flex-1 items-center justify-center gap-2.5 py-3.5 text-[12px] font-black uppercase tracking-[0.12em] text-[#0e0e0e] ${i > 0 ? 'border-l border-[#9e9e9e]' : ''}`}
            >
              <span className="hero-square" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Indicador de scroll (solo mobile) */}
      <motion.button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex-col items-center gap-2 cursor-pointer group flex lg:hidden"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <span className="text-xs text-cyber-cyan/80 font-medium">Ver más</span>
        <motion.div
          className="w-8 h-8 rounded-full bg-cyber-surface border border-cyber-line flex items-center justify-center transition-colors"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-cyber-cyan" />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default HeroSection;
