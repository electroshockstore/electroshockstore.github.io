import { useNavigate } from 'react-router-dom';
import { ChevronRight, MapPin } from 'lucide-react';

import ComboCard from './ComboCard';
import CardTag from './CardTag';
import FloatingBadge from './FloatingBadge';
import GhostNumber from './GhostNumber';
import InfoBand from './InfoBand';
import { FLOATING_BADGES } from './constants';

/** Card "Coordiná la Entrega" (puntos de retiro). */
const PuntosRetiroCard = () => {
  const navigate = useNavigate();

  const media = (
    <div className="relative aspect-[16/8] overflow-hidden bg-[#eaeaea]">
      {/* Grilla de fondo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          backgroundImage:
            'linear-gradient(#0e0e0e14 1px, transparent 1px), linear-gradient(90deg, #0e0e0e14 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />

      {/* Resplandor que pulsa al hover */}
      <div
        className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/25 transition-all duration-500 group-hover:scale-125 group-hover:bg-cyan-400/35"
        style={{ filter: 'blur(56px)' }}
        aria-hidden="true"
      />

      {FLOATING_BADGES.map((badge) => (
        <FloatingBadge
          key={badge.label}
          prefix={badge.label === 'Seguros' ? 'Puntos' : 'Sin'}
          label={badge.label}
          Icon={badge.Icon}
          className={badge.className}
        />
      ))}

      <img
        src="/images/puntos_retiro.webp"
        alt="Coordiná la entrega de tus productos"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-contain p-3 transition-transform duration-500 ease-out group-hover:scale-105"
      />
    </div>
  );

  const content = (
    <>
      <GhostNumber value="02" />

      <div className="relative">
        <span className="landing-mono inline-block bg-[#0e0e0e] px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-[#c8f519]">
          Puntos de retiro
        </span>
      </div>

      <h3 className="relative text-[clamp(2.6rem,4.2vw,4.4rem)] font-black uppercase leading-[0.8] tracking-[-0.05em] text-[#0e0e0e]">
        Coordiná la
        <br />
        <span className="bg-gradient-brand bg-clip-text text-transparent">
          Entrega
        </span>
        <span
          aria-hidden="true"
          className="mt-2 block h-[6px] w-28 origin-left scale-x-100 bg-[#0e0e0e] transition-all duration-300 group-hover:scale-x-150 group-hover:bg-[#c8f519]"
        />
      </h3>

      <InfoBand>
        <p className="landing-mono text-[12px] font-bold uppercase leading-relaxed tracking-[0.02em] text-white">
          <span className="text-[#c8f519]">Revisás y pagás</span> en el momento.
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          <CardTag>Sin anticipos</CardTag>
          <CardTag variant="lime">Puntos seguros</CardTag>
        </div>
      </InfoBand>

      <button
        type="button"
        onClick={() => navigate('/puntos-de-retiro')}
        className="landing-btn group/cta relative w-fit font-black shadow-[5px_5px_0_0_#0e0e0e] transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0_0_#0e0e0e] active:translate-x-[5px] active:translate-y-[5px] active:shadow-none"
      >
        <MapPin className="h-4 w-4 transition-transform duration-300 group-hover/cta:-translate-y-0.5" strokeWidth={3} />
        ¿Dónde Retiro los Productos?
        <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1" strokeWidth={3} />
      </button>
    </>
  );

  return (
    <ComboCard
      icon={MapPin}
      badge="Sin local físico"
      index="PUNTOS / 02"
      content={content}
      media={media}
    />
  );
};

export default PuntosRetiroCard;
