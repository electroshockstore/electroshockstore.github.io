import { useState, useEffect, useCallback } from "react";
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import HeroSection from './HeroSection';
import TickerBanner from './TickerBanner';
import ProductsGrid from './ProductsGrid';

/**
 * HotSaleSection - Componente principal brutalist con Tailwind
 * Diseño moderno y atractivo para millennials
 */
const HotSaleSection = ({ targetMs, products = [], onNavigate }) => {
  const calcTimeLeft = useCallback(() => {
    const diff = Math.max(0, targetMs - Date.now());
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff / 3600000) % 24),
      minutes: Math.floor((diff / 60000) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      expired: diff <= 0,
    };
  }, [targetMs]);

  const [timeLeft, setTimeLeft] = useState(calcTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calcTimeLeft()), 1000);
    return () => clearInterval(id);
  }, [calcTimeLeft]);

  if (timeLeft.expired) return null;

  return (
    <section className="w-full bg-[#09090d] font-sans relative overflow-hidden">
      {/* Tech Pattern Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        {/* Circuit board pattern */}
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              {/* Horizontal lines */}
              <line x1="0" y1="20" x2="100" y2="20" stroke="#c8f519" strokeWidth="0.5"/>
              <line x1="0" y1="50" x2="100" y2="50" stroke="#c8f519" strokeWidth="0.5"/>
              <line x1="0" y1="80" x2="100" y2="80" stroke="#c8f519" strokeWidth="0.5"/>
              {/* Vertical lines */}
              <line x1="20" y1="0" x2="20" y2="100" stroke="#c8f519" strokeWidth="0.5"/>
              <line x1="50" y1="0" x2="50" y2="100" stroke="#c8f519" strokeWidth="0.5"/>
              <line x1="80" y1="0" x2="80" y2="100" stroke="#c8f519" strokeWidth="0.5"/>
              {/* Circuit nodes */}
              <circle cx="20" cy="20" r="2" fill="#c8f519"/>
              <circle cx="50" cy="50" r="2" fill="#c8f519"/>
              <circle cx="80" cy="80" r="2" fill="#c8f519"/>
              <circle cx="20" cy="80" r="1.5" fill="#c8f519"/>
              <circle cx="80" cy="20" r="1.5" fill="#c8f519"/>
              {/* Small squares */}
              <rect x="48" y="18" width="4" height="4" fill="none" stroke="#c8f519" strokeWidth="0.5"/>
              <rect x="78" y="48" width="4" height="4" fill="none" stroke="#c8f519" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)"/>
        </svg>
      </div>

      {/* Animated grid overlay */}
      <motion.div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        animate={{ 
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          backgroundImage: `
            linear-gradient(90deg, transparent 0%, rgba(200,245,25,0.1) 50%, transparent 100%),
            linear-gradient(0deg, transparent 0%, rgba(200,245,25,0.1) 50%, transparent 100%)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,700;0,800;0,900;1,700;1,800;1,900&family=DM+Mono:wght@400;500&family=Barlow:wght@400;600;700;800;900&display=swap');
        
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Top accent line */}
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative h-[3px] origin-left" 
        style={{
          background: 'linear-gradient(90deg, #c8f519 0%, rgba(200,245,25,0.2) 55%, transparent 100%)'
        }}
      >
        <motion.div 
          animate={{ 
            opacity: [0.6, 1, 0.6],
            x: [0, 120, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute left-0 top-0 w-[120px] h-[3px] opacity-60 blur-[6px]"
          style={{ background: '#c8f519' }}
        />
      </motion.div>

      {/* Hero Section */}
      <HeroSection timeLeft={timeLeft} onNavigate={onNavigate} />

      {/* Ticker Banner */}
      <TickerBanner />

      {/* Products Grid */}
      <ProductsGrid products={products} />

      {/* Fade bottom */}
     
    </section>
  );
};

HotSaleSection.propTypes = {
  targetMs: PropTypes.number.isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      discountPercentage: PropTypes.number,
      subtitle: PropTypes.string,
      images: PropTypes.arrayOf(PropTypes.string),
      stock: PropTypes.number,
    })
  ),
  onNavigate: PropTypes.func,
};

export default HotSaleSection;
