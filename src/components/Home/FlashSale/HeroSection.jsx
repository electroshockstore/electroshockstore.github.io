import PropTypes from 'prop-types';
import { Zap, AlertTriangle, CheckCircle } from 'lucide-react';
import TimerDigit from './TimerDigit';

/**
 * HeroSection - Brutalist hero con título, badges y timer
 */
const HeroSection = ({ timeLeft, onNavigate }) => {
  return (
    <div className="relative px-4 sm:px-6 md:px-11 pt-6 sm:pt-8 md:pt-10 pb-0 bg-[#09090d] overflow-hidden">
      {/* Dot grid background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.032) 1px, transparent 1px)',
          backgroundSize: '22px 22px'
        }}
      />

      {/* Diagonal slash */}
      <div 
        className="absolute top-0 right-0 bottom-0 w-1/2 pointer-events-none hidden md:block"
        style={{
          background: 'linear-gradient(130deg, transparent 38%, rgba(200,245,25,0.028) 50%, transparent 62%)'
        }}
      />

      <div className="flex flex-col md:flex-row items-start justify-between gap-6 md:gap-8 relative z-10">
        {/* LEFT - Title & Trust Badges */}
        <div className="flex-1 min-w-0 w-full md:w-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-lime-400 text-[#09090d] text-[8.5px] sm:text-[9px] font-medium tracking-[0.18em] uppercase px-3 py-1.5 mb-3 sm:mb-4 clip-path-arrow">
            <span className="w-1.5 h-1.5 bg-[#09090d] rounded-full animate-pulse" />
            Ofertas relámpago
          </div>

          {/* Title */}
          <div className="relative mb-6 sm:mb-8">
            <h2 className="font-black italic leading-[0.87] tracking-tighter text-white uppercase m-0">
              <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
                OFERTAS
              </span>
              <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-lime-400 relative inline-block title-lime-underline">
                RELÁMPAGO
              </span>
            </h2>

            {/* Bolt SVG */}
            <div className="absolute -right-2 sm:-right-4 top-1/4 -translate-y-1/2 pointer-events-none animate-bolt-glow hidden lg:block">
              <svg width="60" height="82" viewBox="0 0 80 110" fill="none" className="w-12 h-16 lg:w-16 lg:h-20 xl:w-20 xl:h-28">
                <polygon points="48,0 14,60 38,60 30,110 66,42 42,42" fill="#c8f519" />
                <polygon points="48,0 14,60 38,60 30,110 66,42 42,42" fill="url(#bolt-grad)" opacity="0.35" />
                <defs>
                  <linearGradient id="bolt-grad" x1="48" y1="0" x2="30" y2="110" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#fff" />
                    <stop offset="100%" stopColor="#c8f519" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Trust badges - Solo desktop */}
          <div className="hidden sm:flex flex-col sm:flex-row gap-4 sm:gap-7 pt-4 sm:pt-5 border-t border-white/[0.055]">
            {[
              {
                icon: <AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />,
                text: "NO PEDIMOS\nDINERO PREVIO"
              },
              {
                icon: <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />,
                text: "REVISÁS Y PAGÁS\nAL MOMENTO"
              }
            ].map(({ icon, text }, i) => (
              <div key={i} className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 border border-white/20 bg-white/[0.035] flex items-center justify-center relative">
                  <div 
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(135deg, rgba(200,245,25,0.06) 0%, transparent 60%)' }}
                  />
                  <div className="relative text-white">
                    {icon}
                  </div>
                </div>
                <span className="font-mono text-[9px] sm:text-[10px] font-medium tracking-[0.09em] uppercase text-white leading-[1.5] whitespace-pre-line">
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT - Nav, Timer & CTA */}
        <div className="flex flex-col items-end gap-4 sm:gap-5 pb-6 sm:pb-8 flex-shrink-0 w-full md:w-auto">
         
          {/* Timer */}
          <div className="w-full md:w-auto">
            <div className="flex items-center gap-2 justify-end text-[#555565] text-[9px] sm:text-[10px] tracking-[0.28em] uppercase font-mono text-right mb-2.5">
              <span className="w-1.5 h-1.5 bg-lime-400 rounded-full animate-pulse" />
              Termina en
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 justify-end">
              <TimerDigit value={timeLeft.days} label="Días" />
              <span className="font-black italic text-2xl sm:text-3xl md:text-4xl text-lime-400/45 self-end mb-4 sm:mb-5 leading-none" style={{ textShadow: '0 0 14px rgba(200,245,25,0.25)' }}>:</span>
              <TimerDigit value={timeLeft.hours} label="Hrs" />
              <span className="font-black italic text-2xl sm:text-3xl md:text-4xl text-lime-400/45 self-end mb-4 sm:mb-5 leading-none" style={{ textShadow: '0 0 14px rgba(200,245,25,0.25)' }}>:</span>
              <TimerDigit value={timeLeft.minutes} label="Min" />
              <span className="font-black italic text-2xl sm:text-3xl md:text-4xl text-lime-400/45 self-end mb-4 sm:mb-5 leading-none" style={{ textShadow: '0 0 14px rgba(200,245,25,0.25)' }}>:</span>
              <TimerDigit value={timeLeft.seconds} label="Seg" />
            </div>
          </div>

         
        </div>
      </div>

      <style>{`
        .clip-path-arrow {
          clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 50%, calc(100% - 6px) 100%, 0 100%);
        }
        .clip-path-arrow-btn {
          clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%);
          padding-right: 2.5rem;
        }
        .title-lime-underline::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          height: 3px;
          width: 0;
          background: #c8f519;
          animation: underlineIn 0.8s 0.4s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        @keyframes underlineIn {
          to { width: 100%; }
        }
        @keyframes bolt-glow {
          0%, 100% { filter: drop-shadow(0 0 14px rgba(200,245,25,.55)) drop-shadow(0 0 30px rgba(200,245,25,.2)); }
          50% { filter: drop-shadow(0 0 24px rgba(200,245,25,.85)) drop-shadow(0 0 55px rgba(200,245,25,.35)); }
        }
        .animate-bolt-glow {
          animation: bolt-glow 2.2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

HeroSection.propTypes = {
  timeLeft: PropTypes.shape({
    days: PropTypes.number.isRequired,
    hours: PropTypes.number.isRequired,
    minutes: PropTypes.number.isRequired,
    seconds: PropTypes.number.isRequired,
  }).isRequired,
  onNavigate: PropTypes.func,
};

export default HeroSection;
