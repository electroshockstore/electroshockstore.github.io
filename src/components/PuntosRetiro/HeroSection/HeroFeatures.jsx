import { Lock, MapPin, Zap, BadgeCheck } from 'lucide-react';

const FEATURES = [
  { Icon: Lock, text: 'PUNTOS SEGUROS' },
  { Icon: MapPin, text: 'SIN ADELANTOS NI SEÑAS' },
  { Icon: Zap, text: 'RETIROS EN EL DIA' },
  { Icon: BadgeCheck, text: 'CONFIRMACIÓN INSTANTÁNEA' },
];

const HeroFeatures = () => {
  return (
    <div className="hidden lg:flex flex-wrap justify-start gap-2.5 mt-6">
      {FEATURES.map(({ Icon, text }, i) => (
        <span
          key={i}
          className="hero-feature-pill inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-gray-400 border border-white/[0.08] bg-white/[0.03] transition-all duration-150"
        >
          <Icon className="h-3.5 w-3.5 text-cyber-cyan" strokeWidth={2.5} />
          <span>{text}</span>
        </span>
      ))}
    </div>
  );
};

export default HeroFeatures;
