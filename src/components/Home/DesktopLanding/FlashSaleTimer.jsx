import PropTypes from 'prop-types';

/**
 * FlashSaleTimer — Contador del Flash Sale para el landing desktop.
 *
 * Tipografía Orbitron (cargada en index.html) para dígitos grandes y
 * legibles, tiles negros coherentes con el hero y el rayo lima con el
 * efecto de glow reutilizado de FlashSale/HeroSection.
 */
const DIGIT_FONT = "'Orbitron', 'Chakra Petch', ui-sans-serif, system-ui, sans-serif";

const Tile = ({ value, label }) => (
  <div className="flex flex-col items-center gap-2">
    <div className="flash-timer-tile flex h-[76px] w-[64px] items-center justify-center">
      <span
        className="relative z-10 font-black leading-none text-white tabular-nums text-[40px]"
        style={{
          fontFamily: DIGIT_FONT,
          textShadow: '0 0 12px rgba(200,245,25,0.45)',
        }}
      >
        {String(value).padStart(2, '0')}
      </span>
    </div>
    <span className="landing-mono text-[11px] font-black uppercase tracking-[0.18em] text-[#0e0e0e]">
      {label}
    </span>
  </div>
);

Tile.propTypes = {
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
};

const FlashSaleTimer = ({ timeLeft }) => (
  <div className="flex flex-col items-start gap-4 lg:items-end">
    {/* Etiqueta + rayo */}
    <div className="flex items-center gap-2.5">
      <svg
        className="flash-bolt-glow h-6 w-4 shrink-0"
        viewBox="0 0 80 110"
        fill="none"
        aria-hidden="true"
      >
        <polygon
          points="48,0 14,60 38,60 30,110 66,42 42,42"
          fill="#c8f519"
          stroke="#0e0e0e"
          strokeWidth="4"
          strokeLinejoin="round"
        />
      </svg>

      <span className="landing-mono text-[12px] font-black uppercase tracking-[0.28em] text-[#0e0e0e]">
        Termina en
      </span>
    </div>

    {/* Tiles + rayo grande al lado */}
    <div className="flex items-center gap-4">
      <svg
        className="flash-bolt-glow hidden h-16 w-12 shrink-0 lg:block"
        viewBox="0 0 80 110"
        fill="none"
        aria-hidden="true"
      >
        <polygon
          points="48,0 14,60 38,60 30,110 66,42 42,42"
          fill="#c8f519"
          stroke="#0e0e0e"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </svg>

      <div className="flex items-end gap-2">
        <Tile value={timeLeft.days} label="Días" />
        <span className="mb-9 self-end text-3xl font-black leading-none text-[#0e0e0e]">
          :
        </span>
        <Tile value={timeLeft.hours} label="Hrs" />
        <span className="mb-9 self-end text-3xl font-black leading-none text-[#0e0e0e]">
          :
        </span>
        <Tile value={timeLeft.minutes} label="Min" />
        <span className="mb-9 self-end text-3xl font-black leading-none text-[#0e0e0e]">
          :
        </span>
        <Tile value={timeLeft.seconds} label="Seg" />
      </div>
    </div>
  </div>
);

FlashSaleTimer.propTypes = {
  timeLeft: PropTypes.shape({
    days: PropTypes.number.isRequired,
    hours: PropTypes.number.isRequired,
    minutes: PropTypes.number.isRequired,
    seconds: PropTypes.number.isRequired,
    expired: PropTypes.bool.isRequired,
  }).isRequired,
};

export default FlashSaleTimer;
