import OffsetGlowCTA from '../../Shared/OffsetGlowCTA';

const HeroCTA = () => {
  return (
    <div className="hidden lg:flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
      <OffsetGlowCTA label="Ver puntos de retiro" size="lg" className="text-sm uppercase tracking-wider" />

      <div className="flex items-center gap-4 sm:gap-6">
        <div className="text-center">
          <div className="text-2xl sm:text-3xl lg:text-2xl font-black text-white tracking-tight">3</div>
          <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">PUNTOS</div>
        </div>
        <div className="text-center">
          <div className="text-2xl sm:text-3xl lg:text-2xl font-black text-white tracking-tight">COORDINAR</div>
          <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">HORARIOS</div>
        </div>
      </div>
    </div>
  );
};

export default HeroCTA;
