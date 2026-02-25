const FEATURES = [
  { icon: '🔒', text: 'PUNTOS SEGUROS' },
  { icon: '📍', text: 'SIN ADELANTOS NI SEÑAS' },
  { icon: '⚡', text: 'RETIROS EN EL DIA' },
  { icon: '✅', text: 'CONFIRMACIÓN INSTANTÁNEA' },
];

const HeroFeatures = () => {
  return (
    <div className="hidden lg:flex flex-wrap justify-start gap-2.5 mt-6">
      {FEATURES.map((pill, i) => (
        <span 
          key={i} 
          className="hero-feature-pill inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-gray-400 border border-white/[0.08] bg-white/[0.03] transition-all duration-150"
        >
          <span>{pill.icon}</span>
          <span>{pill.text}</span>
        </span>
      ))}
    </div>
  );
};

export default HeroFeatures;
