import PropTypes from 'prop-types';

/**
 * TickerBanner - Banner animado con marquee horizontal
 */
const TickerBanner = ({ items = ['TIEMPO LIMITADO', 'STOCK LIMITADO', 'PRECIOS IRREPETIBLES'] }) => {
  // Renderizamos el contenido del ticker separando la lógica para mayor limpieza.
  const TickerItem = ({ text }) => (
    <span className="flex items-center gap-4 sm:gap-6 px-4 sm:px-6">
      <span className="font-sans text-[11px] sm:text-xs font-black tracking-[0.2em] uppercase text-[#09090d]">
        {text}
      </span>
      {/* Icono geométrico/técnico como separador en lugar de un punto básico */}
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#09090d" strokeWidth="2.5" className="opacity-30">
        <path d="M12 2v20M2 12h20M5 5l14 14M19 5 5 19" />
      </svg>
    </span>
  );

  return (
    <div className="relative bg-lime-400 py-3 sm:py-3.5 overflow-hidden flex border-y border-[#09090d]/10">
      {/* Fade gradients con mayor área de respiro para suavizar la entrada/salida */}
      <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-24 z-10 bg-gradient-to-r from-lime-400 to-transparent pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-24 z-10 bg-gradient-to-l from-lime-400 to-transparent pointer-events-none" />
      
      {/* Contenedor principal animado. 
        hover:[animation-play-state:paused] permite frenarlo si el usuario pone el mouse encima.
      */}
      <div className="flex w-max animate-ticker hover:[animation-play-state:paused] cursor-default">
        {/* Usamos 4 bloques idénticos para asegurar un loop infinito perfecto, incluso en monitores ultrawide */}
        <div className="flex items-center w-max">
          {items.map((item, i) => <TickerItem key={`g1-${i}`} text={item} />)}
        </div>
        <div className="flex items-center w-max">
          {items.map((item, i) => <TickerItem key={`g2-${i}`} text={item} />)}
        </div>
        <div className="flex items-center w-max">
          {items.map((item, i) => <TickerItem key={`g3-${i}`} text={item} />)}
        </div>
        <div className="flex items-center w-max">
          {items.map((item, i) => <TickerItem key={`g4-${i}`} text={item} />)}
        </div>
      </div>

      <style>{`
        @keyframes ticker {
          0% { transform: translate3d(0, 0, 0); }
          /* Se desplaza exactamente el 50% del contenedor total (2 de los 4 grupos) para un reinicio invisible */
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .animate-ticker {
          animation: ticker 30s linear infinite;
          /* translate3d y will-change fuerzan la aceleración por hardware para evitar cortes en el scroll */
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