import OffsetGlowCTA from '../../Shared/OffsetGlowCTA';

const HeroCTA = ({ onSeePoints }) => {
  return (
    <div className="hidden lg:flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
      <OffsetGlowCTA label="Ver puntos de retiro" size="lg" onClick={onSeePoints} className="text-sm uppercase tracking-wider" />

      <div className="flex items-center gap-4 sm:gap-6">
        <div className="text-center">
          <div className="landing-pixel text-2xl sm:text-3xl lg:text-2xl text-white lg:text-[#0e0e0e] tracking-tight">3</div>
          <div className="landing-mono text-xs text-gray-500 lg:text-[#0e0e0e]/60 uppercase tracking-[0.18em] font-black">Puntos</div>
        </div>
        <span className="w-px self-stretch bg-white/10 lg:bg-[#0e0e0e]/15" aria-hidden="true" />
        <div className="text-center">
          <div className="landing-mono text-2xl sm:text-3xl lg:text-2xl font-black text-white lg:text-[#0e0e0e] tracking-tight">Coordinar</div>
          <div className="landing-mono text-xs text-gray-500 lg:text-[#0e0e0e]/60 uppercase tracking-[0.18em] font-black">Horarios</div>
        </div>
      </div>
    </div>
  );
};

export default HeroCTA;
