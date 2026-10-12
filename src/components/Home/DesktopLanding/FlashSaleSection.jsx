import PropTypes from 'prop-types';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { useCountdown } from '../../../hooks/useCountdown';
import { TickerBanner } from '../FlashSale';
import MotionReveal from '../../Shared/MotionReveal';
import FlashSaleCard from './FlashSaleCard';
import FlashSaleTimer from './FlashSaleTimer';

const TICKER_ITEMS = [
  'OFERTAS RELÁMPAGO',
  'STOCK LIMITADO',
  'PRECIOS IRREPETIBLES',
];

const TRUST = [
  { icon: AlertTriangle, text: 'NO PEDIMOS DINERO PREVIO' },
  { icon: CheckCircle, text: 'REVISÁS Y PAGÁS AL MOMENTO' },
];

/**
 * FlashSaleSection — Ofertas relámpago para el landing desktop.
 * Misma lógica que el Flash Sale mobile pero en el lenguaje del landing
 * (tema claro + grilla blueprint + acento lima). Reutiliza el contador
 * (useCountdown), el ticker y el botón de WhatsApp.
 *
 * Full width como el resto de secciones del landing: el contenido vive
 * dentro del área de contenido (mx-[72px]) para no pisar los sidebars.
 */
const FlashSaleSection = ({ targetMs, products = [], onNavigate }) => {
  const timeLeft = useCountdown(targetMs);

  if (timeLeft.expired || products.length === 0) return null;

  const avgDiscount = Math.round(
    products.reduce((sum, p) => sum + p.discountPercentage, 0) / products.length,
  );

  return (
    <section className="relative">
      <div className="mx-[72px]">
        {/* Ticker lima */}
        <TickerBanner items={TICKER_ITEMS} />

        {/* Encabezado + contador */}
        <div className="relative border-b border-[#9e9e9e]">
          {/* Grilla vertical */}
          <div
            className="pointer-events-none absolute inset-0 z-0 grid grid-cols-4"
            aria-hidden="true"
          >
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={i > 0 ? 'border-l border-[#9e9e9e]' : ''}
              />
            ))}
          </div>

          <div className="relative z-10 flex flex-col gap-8 px-8 py-10 lg:flex-row lg:items-end lg:justify-between">
            {/* Título + badges */}
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <span className="hero-square" aria-hidden="true" />
                <span className="landing-mono bg-[#f6f6f6]/95 px-4 py-1.5 text-[13px] font-black uppercase tracking-[0.08em] text-[#0e0e0e] backdrop-blur-[2px]">
                  Ofertas relámpago · Por tiempo limitado
                </span>
              </div>

              <h2 className="font-black uppercase leading-[0.9] tracking-[-0.04em] text-[#0e0e0e] text-[clamp(2.4rem,5vw,4.75rem)]">
                Ofertas <span className="flash-title-glow">relámpago</span>
              </h2>

              <div className="flex flex-wrap items-center gap-6 border-t border-[#9e9e9e] pt-5">
                {TRUST.map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="group/trust flex items-center gap-2.5"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#9e9e9e] bg-[#f6f6f6] text-[#0e0e0e] transition-colors duration-200 group-hover/trust:bg-[#0e0e0e] group-hover/trust:text-[#c8f519]">
                      <Icon className="h-4 w-4" strokeWidth={2.25} />
                    </span>
                    <span className="landing-mono text-[12px] font-black uppercase leading-[1.4] tracking-[0.08em] text-[#0e0e0e]">
                      {text}
                    </span>
                  </div>
                ))}

                <span className="ml-auto flex items-center gap-2 border border-[#0e0e0e] bg-[#c8f519] px-3 py-1.5 font-mono text-[12px] font-black uppercase tracking-[0.06em] text-[#0e0e0e] transition-transform duration-200 hover:scale-105">
                  Hasta {avgDiscount}% off
                </span>
              </div>
            </div>

            {/* Contador (con rayo y tipografía Orbitron) */}
            <FlashSaleTimer timeLeft={timeLeft} />
          </div>
        </div>

        {/* Grilla de productos: fila full width, cards con tope de ancho */}
        <div className="flex justify-center gap-0 p-8">
          {products.slice(0, 3).map((product, index) => (
            <MotionReveal
              key={product.id}
              animation="slide-up"
              delay={index * 0.1}
              className="w-full max-w-[420px] flex-1"
            >
              <FlashSaleCard product={product} index={index} />
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

FlashSaleSection.propTypes = {
  targetMs: PropTypes.number.isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      discountPercentage: PropTypes.number.isRequired,
      subtitle: PropTypes.string,
      images: PropTypes.arrayOf(PropTypes.string),
      stock: PropTypes.number,
    }),
  ),
  onNavigate: PropTypes.func,
};

export default FlashSaleSection;
