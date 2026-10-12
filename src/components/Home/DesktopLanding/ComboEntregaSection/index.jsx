import MotionReveal from '../../../Shared/MotionReveal';
import ConfiguradorCard from './ConfiguradorCard';
import PuntosRetiroCard from './PuntosRetiroCard';

/**
 * ComboEntregaSection — sección del landing desktop (lg+).
 *
 * Momento de viewport completo ("02 / El circuito"): encabezado propio +
 * dos cards brutalistas (Configurador + Puntos de Retiro) separadas por un
 * CANAL CENTRAL que deja pasar el puño/rayo del centerpiece.
 *
 * Estructura:
 *   · index.jsx          → sección + encabezado + grilla + canal
 *   · ComboCard.jsx      → shell de card (borde + sombra + slots)
 *   · ConfiguradorCard   → card 1
 *   · PuntosRetiroCard   → card 2
 *   · CardHeader / GhostNumber / CardTag / FloatingBadge → piezas
 */
const ComboEntregaSection = () => (
  <section
    data-centerpiece="0.58"
    className="relative flex min-h-[calc(100vh-104px)] flex-col"
  >
    <div className="mx-[72px] flex flex-1 flex-col py-10">
      {/* Encabezado de sección */}
      <div className="relative border-b border-[#9e9e9e] pb-6">
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

        <div className="relative z-10 flex flex-wrap items-end justify-between gap-4 px-1">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="hero-square" aria-hidden="true" />
              <span className="landing-mono bg-[#f6f6f6]/95 px-3 py-1 text-[12px] font-black uppercase tracking-[0.08em] text-[#0e0e0e]">
                Cómo funciona · Sin letra chica
              </span>
            </div>

            <h2 className="font-black uppercase leading-[0.9] tracking-[-0.04em] text-[#0e0e0e] text-[clamp(2rem,4.2vw,3.8rem)]">
              Armá{' '}
              <span
                className="text-[#c8f519]"
                style={{ WebkitTextStroke: '2px #0e0e0e' }}
              >
                y retirá
              </span>
            </h2>
          </div>

          <span className="landing-mono text-[12px] font-black uppercase tracking-[0.18em] text-[#858585]">
            02 / El circuito
          </span>
        </div>
      </div>

      {/* Cards (el rayo baja por el canal central) */}
      <div className="mt-8 grid flex-1 grid-cols-1 items-stretch gap-6 lg:grid-cols-[minmax(0,1fr)_clamp(240px,22vw,460px)_minmax(0,1fr)] lg:gap-0">
        <MotionReveal
          animation="slide-up"
          duration={0.7}
          className="min-h-[520px] w-full"
        >
          <ConfiguradorCard />
        </MotionReveal>

        {/* Canal central para el rayo */}
        <div className="hidden lg:block" aria-hidden="true" />

        <MotionReveal
          animation="slide-up"
          duration={0.7}
          delay={0.12}
          className="min-h-[520px] w-full"
        >
          <PuntosRetiroCard />
        </MotionReveal>
      </div>
    </div>
  </section>
);

export default ComboEntregaSection;
