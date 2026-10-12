import { ChevronLeft, ChevronRight, Zap } from 'lucide-react';

const STEPS = [
  { title: 'Hacé tu pedido', desc: 'Sin anticipos de pago' },
  { title: 'Elegí donde retirar', desc: 'No hacemos envíos · No tenemos local' },
  { title: 'Revisá y pagá', desc: 'Todo en el momento' },
  { title: 'Canales oficiales', desc: 'WhatsApp y web oficial' },
];

const STEP_FLEX = [1.05, 1.45, 0.85, 1.15];

const ShowcaseHero = ({ onCategoryClick }) => {
  return (
    <section
      data-centerpiece="0.46"
      className="relative flex h-[calc(100vh-104px)] flex-col overflow-x-clip"
    >

      {/* Grilla vertical */}
      <div
        className="pointer-events-none absolute inset-y-0 left-[72px] right-[72px] z-0 grid grid-cols-4"
        aria-hidden="true"
      >
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={i > 0 ? 'border-l border-[#9e9e9e]' : ''}
          />
        ))}
      </div>

      {/* Área principal */}
      <div className="relative z-10 mx-[72px] flex min-h-0 flex-1 flex-col">

        {/* Fila 1: título */}
        <div className="relative flex min-h-[220px] flex-1 items-center justify-center overflow-hidden border-b border-[#9e9e9e] pb-8">

          <div
            className="hero-dots pointer-events-none absolute inset-0"
            aria-hidden="true"
          />

          <div
            className="hero-scan pointer-events-none absolute inset-0"
            aria-hidden="true"
          />

          {/* Etiquetas superiores */}
          <div className="absolute left-[22px] right-[22px] top-[22px] flex items-center gap-3">
            <span className="hero-square" aria-hidden="true" />

            <span className="landing-mono bg-[#f6f6f6]/95 px-4 py-1.5 text-[15px] font-black uppercase tracking-[0.06em] text-[#0e0e0e] backdrop-blur-[2px]">
              Hardware · Periféricos · Gaming
            </span>

            <span
              className="hero-square ml-auto"
              aria-hidden="true"
            />
          </div>

          {/* Título Electro Shock */}
          <h1
            className="hero-title hero-title-tech relative z-[1] select-none whitespace-nowrap text-center"
            aria-label="Electro Shock"
          >
            <span
              className="hero-word"
              data-text="ELECTRO"
              aria-hidden="true"
            >
              ELECTRO
            </span>

            <span
              className="hero-title-accent hero-word"
              data-text="SHOCK"
              aria-hidden="true"
            >
              SHOCK
            </span>
          </h1>

          {/* Etiquetas inferiores */}
          <div className="absolute bottom-[22px] left-[22px] right-[22px] flex items-center gap-3">
            <span className="hero-square" aria-hidden="true" />

            <span className="landing-mono bg-[#f6f6f6]/95 px-4 py-1.5 text-[15px] font-black uppercase tracking-[0.06em] text-[#0e0e0e] backdrop-blur-[2px]">
              Catálogo virtual · Zona Sur, Buenos Aires
            </span>

            <span
              className="hero-square ml-auto"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Fila 2: descripción, espacio visual y categorías */}
        <div className="relative grid h-[clamp(260px,32vh,330px)] shrink-0 grid-cols-[1.35fr_1.65fr_1fr]">

        
{/* Columna 1: titular brutalista */}
<div className="flex flex-col justify-center p-5 xl:p-8">
  <p
    aria-label="Catálogo virtual de componentes y tecnología"
    className="leading-[0.88] tracking-[-0.055em] text-[#0e0e0e]"
    style={{ fontFamily: "'Outfit', 'Inter', sans-serif" }}
  >
    <span className="block whitespace-nowrap text-[clamp(2.8rem,5vw,5rem)] font-light">
      Catálogo
    </span>

    <span className="mt-2 block whitespace-nowrap text-[clamp(2.5rem,4.4vw,4.4rem)] font-light">
      virtual de
    </span>

    <span className="landing-pixel mt-3 block text-[clamp(3.5rem,6vw,6rem)] leading-[0.9]">
      tecnología
    </span>
  </p>
</div>



          {/* Columna 2: espacio para el puño y el robot */}
          <div aria-hidden="true" />

          {/* Columna 4: tile y categorías */}
          <div className="flex flex-col justify-between">
            <div className="hero-tile relative flex h-[190px] w-[190px] items-center justify-center">
              <span
                className="hero-tile-corner left-[21px] top-[21px]"
                aria-hidden="true"
              />

              <span
                className="hero-tile-corner right-[21px] top-[21px]"
                aria-hidden="true"
              />

              <span
                className="hero-tile-corner bottom-[21px] left-[21px]"
                aria-hidden="true"
              />

              <span
                className="hero-tile-corner bottom-[21px] right-[21px]"
                aria-hidden="true"
              />

              <Zap
                className="h-16 w-16 text-cyber-lime"
                strokeWidth={1.5}
                fill="currentColor"
              />
            </div>

            {/* Barra de categorías */}
            <div className="flex h-[52px] items-stretch border-t border-[#9e9e9e] bg-[#f6f6f6]">
              <span className="landing-mono flex flex-1 items-center justify-center text-[16px] font-black uppercase tracking-[0.04em]">
                Categorías:
              </span>

              <button
                type="button"
                onClick={() => onCategoryClick?.('Procesadores')}
                className="flex w-[92px] items-center justify-center border-l border-[#9e9e9e] transition-colors duration-150 hover:bg-[#0e0e0e] hover:text-[#c8f519]"
                aria-label="Ver todas las categorías"
              >
                <ChevronLeft
                  className="h-5 w-5"
                  strokeWidth={2}
                />
              </button>

              <button
                type="button"
                onClick={() => onCategoryClick?.('Memorias RAM')}
                className="flex w-[92px] items-center justify-center border-l border-[#9e9e9e] transition-colors duration-150 hover:bg-[#0e0e0e] hover:text-[#c8f519]"
                aria-label="Ver más categorías"
              >
                <ChevronRight
                  className="h-5 w-5"
                  strokeWidth={2}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Fila de tarjetas */}
      <div className="relative z-30 mx-[72px] flex h-[clamp(120px,16vh,150px)] shrink-0">
        {STEPS.map(({ title, desc }, i) => (
          <div
            key={title}
            style={{ flex: `${STEP_FLEX[i]} 1 0%` }}
            className={`
              group relative flex h-full min-w-0
              flex-col items-center justify-center gap-1.5 overflow-hidden
              border border-[#9e9e9e] bg-[#f6f6f6] px-5
              transition-colors duration-200
              hover:bg-[#0e0e0e]
              ${i > 0 ? '-ml-px' : ''}
            `}
          >
            {/* Paso */}
            <span
              className="
                landing-mono absolute left-4 top-3
                text-[12px] font-black tracking-[0.12em]
                text-[#858585] transition-colors
                group-hover:text-[#c8f519]
              "
            >
              0{i + 1}
            </span>

            {/* Rayo decorativo de la tarjeta */}
            <Zap
              className="absolute right-4 top-3 h-4 w-4 text-[#9e9e9e] transition-colors duration-200 group-hover:text-[#c8f519]"
              strokeWidth={1.75}
              fill="currentColor"
              aria-hidden="true"
            />

            {/* Título del paso */}
            <span
              className="
                relative z-10 max-w-full text-center
                font-black uppercase
                text-[clamp(20px,2.2vw,34px)]
                leading-[0.95] tracking-[-0.04em]
                text-[#0e0e0e]
                transition-colors duration-200
                group-hover:text-[#c8f519]
              "
            >
              {title}
            </span>

            {/* Detalle del paso */}
            <span
              className="
                landing-mono relative z-10 max-w-full text-center
                text-[13px] font-bold leading-snug
                text-[#404040]
                transition-colors duration-200
                group-hover:text-[#f6f6f6]/90
              "
            >
              {desc}
            </span>

            {/* Acento inferior al pasar el cursor */}
            <span
              aria-hidden="true"
              className="
                absolute bottom-0 left-0 h-[5px] w-0
                bg-[#c8f519]
                transition-all duration-300
                group-hover:w-full
              "
            />
          </div>
        ))}
      </div>

      {/* Continuación de la grilla */}
      <div className="h-[28px] shrink-0" aria-hidden="true" />
    </section>
  );
};

export default ShowcaseHero;