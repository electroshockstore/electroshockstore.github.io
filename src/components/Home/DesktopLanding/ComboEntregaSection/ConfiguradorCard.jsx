import { useNavigate } from 'react-router-dom';
import { ChevronRight, Wrench } from 'lucide-react';

import ComboCard from './ComboCard';
import CardTag from './CardTag';
import GhostNumber from './GhostNumber';
import InfoBand from './InfoBand';

/** Card "Armá tu Combo ideal" (configurador). */
const ConfiguradorCard = () => {
  const navigate = useNavigate();

  const media = (
    <div className="relative aspect-[16/8] overflow-hidden bg-[#f6f6f6]">
      <img
        src="/images/arma_tu_pc.webp"
        alt="Armá tu combo ideal"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Fundido inferior para integrar con el cuerpo */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#f6f6f6] via-transparent to-transparent opacity-70" />

      <span
        aria-hidden="true"
        className="landing-pixel absolute bottom-1.5 right-2.5 text-4xl leading-none text-[#0e0e0e]"
      >
        01
      </span>
    </div>
  );

  const content = (
    <>
      <GhostNumber value="01" />

      <div className="relative">
        <span className="landing-mono inline-block bg-[#0e0e0e] px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-[#c8f519]">
          Configurador
        </span>
      </div>

      <h3 className="relative text-[clamp(2.6rem,4.2vw,4.4rem)] font-black uppercase leading-[0.8] tracking-[-0.05em] text-[#0e0e0e]">
        Armá tu
        <br />
        <span className="relative mt-2 inline-block bg-[#c8f519] px-3 py-1 shadow-[6px_6px_0_0_#0e0e0e] transition-transform duration-300 group-hover:-rotate-1 group-hover:scale-[1.02]">
          Combo ideal
        </span>
      </h3>

      <InfoBand>
        <p className="landing-mono text-[12px] font-bold uppercase leading-relaxed tracking-[0.02em] text-white">
          Seleccioná cada pieza por tu cuenta.{' '}
          <span className="text-[#c8f519]">
            Te avisamos si algún componente no es compatible.
          </span>
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          <CardTag>Pieza por pieza</CardTag>
          <CardTag variant="lime">Compatibilidad</CardTag>
        </div>
      </InfoBand>

      <button
        type="button"
        onClick={() => navigate('/armatupc')}
        className="landing-btn group/cta relative w-fit font-black shadow-[5px_5px_0_0_#0e0e0e] transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0_0_#0e0e0e] active:translate-x-[5px] active:translate-y-[5px] active:shadow-none"
      >
        <Wrench className="h-4 w-4 transition-transform duration-300 group-hover/cta:rotate-12" strokeWidth={3} />
        Empezar a elegir
        <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1" strokeWidth={3} />
      </button>
    </>
  );

  return (
    <ComboCard
      icon={Wrench}
      badge="Elegí tus componentes"
      index="PC BUILD / 01"
      content={content}
      media={media}
    />
  );
};

export default ConfiguradorCard;
