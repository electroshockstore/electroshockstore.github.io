import { Lock, MapPin, Zap, BadgeCheck } from 'lucide-react';

const FEATURES = [
  { Icon: Lock, text: 'Puntos seguros' },
  { Icon: MapPin, text: 'Sin adelantos ni señas' },
  { Icon: Zap, text: 'Retiros en el día' },
  { Icon: BadgeCheck, text: 'Confirmación instantánea' },
];

/**
 * Feature pills desktop (lg+): celdas brutalistas claras con
 * chip negro + icono lima, mismo lenguaje que el landing.
 */
const HeroFeatures = () => {
  return (
    <div className="hidden lg:flex flex-wrap justify-start gap-2.5 mt-6">
      {FEATURES.map(({ Icon, text }, i) => (
        <span
          key={i}
          className="group inline-flex items-center gap-2 border border-[#0e0e0e] bg-[#f6f6f6] py-1.5 pl-1.5 pr-3 shadow-[3px_3px_0_0_#0e0e0e] transition-all duration-150 hover:-translate-y-px hover:bg-[#0e0e0e]"
        >
          <span className="flex h-6 w-6 items-center justify-center bg-[#0e0e0e] transition-colors group-hover:bg-[#c8f519]">
            <Icon className="h-3.5 w-3.5 text-[#c8f519] transition-colors group-hover:text-[#0e0e0e]" strokeWidth={2.5} />
          </span>
          <span className="landing-mono text-[11px] font-black uppercase tracking-[0.12em] text-[#0e0e0e] transition-colors group-hover:text-[#c8f519]">
            {text}
          </span>
        </span>
      ))}
    </div>
  );
};

export default HeroFeatures;
