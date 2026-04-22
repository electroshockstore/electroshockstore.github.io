import { useState, useEffect, useCallback } from "react";
import PropTypes from 'prop-types';
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
    <section className="w-full bg-[#09090d] font-sans">
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,700;0,800;0,900;1,700;1,800;1,900&family=DM+Mono:wght@400;500&family=Barlow:wght@400;600;700;800;900&display=swap');
        
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Top accent line */}
      <div className="relative h-[3px]" style={{
        background: 'linear-gradient(90deg, #c8f519 0%, rgba(200,245,25,0.2) 55%, transparent 100%)'
      }}>
        <div 
          className="absolute left-0 top-0 w-[120px] h-[3px] opacity-60 blur-[6px]"
          style={{ background: '#c8f519' }}
        />
      </div>

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
