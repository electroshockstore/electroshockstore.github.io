import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * TimerDigit — Brutalist timer digit con acento lime
 */
const TimerDigit = ({ value, label }) => {
  const fmt = String(value).padStart(2, '0');
  const [display, setDisplay] = useState(fmt);
  const [flipping, setFlipping] = useState(false);
  const prevRef = useRef(fmt);

  useEffect(() => {
    if (prevRef.current !== fmt) {
      setFlipping(true);
      const t = setTimeout(() => {
        setDisplay(fmt);
        setFlipping(false);
        prevRef.current = fmt;
      }, 120);
      return () => clearTimeout(t);
    }
  }, [fmt]);

  return (
    <div className="flex flex-col items-center gap-1.5 sm:gap-2">
      <div className="relative w-12 h-14 sm:w-16 sm:h-20 md:w-20 md:h-24 bg-gradient-to-b from-[#161621] to-[#0f0f18] border border-white/10 overflow-hidden flex items-center justify-center">
        {/* Top shadow */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-black/15 pointer-events-none z-[1]" />
        
        {/* Separator glow */}
        <div 
          className="absolute left-0 right-0 top-1/2 h-[1.5px] z-[3]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(200,245,25,0.7) 50%, transparent 100%)',
            boxShadow: '0 0 8px rgba(200,245,25,0.35), 0 0 20px rgba(200,245,25,0.12)'
          }}
        />
        
        {/* Corner screws */}
        {[
          'top-0.5 left-0.5',
          'top-0.5 right-0.5',
          'bottom-0.5 left-0.5',
          'bottom-0.5 right-0.5'
        ].map((pos, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full bg-white/7 border border-white/5 z-[4] ${pos}`}
          />
        ))}
        
        {/* Number */}
        <span
          className={`relative z-[2] font-black italic text-4xl sm:text-5xl md:text-6xl tracking-tighter text-white select-none transition-opacity duration-[120ms] ${
            flipping ? 'opacity-30' : 'opacity-100'
          }`}
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {display}
        </span>
      </div>
      
      {/* Label */}
      <span 
        className="text-[8px] sm:text-[9px] font-medium tracking-[0.22em] uppercase text-lime-400 opacity-85"
        style={{ fontFamily: "'DM Mono', monospace" }}
      >
        {label}
      </span>
    </div>
  );
};

TimerDigit.propTypes = {
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
};

export default TimerDigit;