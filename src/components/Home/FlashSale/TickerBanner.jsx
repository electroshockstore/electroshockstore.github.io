import PropTypes from 'prop-types';

/**
 * TickerBanner - Banner animado con marquee horizontal
 */
const TickerBanner = ({ items = ['Tiempo limitado', 'Stock limitado', 'Precios irrepetibles'] }) => {
  const tickerRepeated = [...items, ...items, ...items, ...items, ...items, ...items];

  return (
    <div className="relative bg-lime-400 py-2 sm:py-2.5 overflow-hidden whitespace-nowrap">
      {/* Fade gradients */}
      <div className="absolute top-0 bottom-0 left-0 w-10 sm:w-12 z-[2] bg-gradient-to-r from-lime-400 to-transparent pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-10 sm:w-12 z-[2] bg-gradient-to-l from-lime-400 to-transparent pointer-events-none" />
      
      {/* Ticker content */}
      <div className="inline-flex items-center animate-ticker-move">
        {tickerRepeated.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 sm:gap-3.5 px-5 sm:px-6">
            <span className="font-mono text-[9px] sm:text-[10px] font-medium tracking-[0.2em] uppercase text-[#09090d]">
              - {item}
            </span>
            <span className="inline-block w-1 h-1 bg-[#09090d] rounded-full opacity-55" />
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes ticker-move {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-ticker-move {
          animation: ticker-move 18s linear infinite;
          will-change: transform;
        }
      `}</style>
    </div>
  );
};

TickerBanner.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
};

export default TickerBanner;
