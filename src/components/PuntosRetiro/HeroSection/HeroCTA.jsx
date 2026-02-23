const HeroCTA = () => {
  return (
    <div className="hidden lg:flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
      <button 
        className="hero-cta-button relative w-full sm:w-auto px-8 py-4 lg:py-3.5 lg:px-7 font-black text-sm sm:text-base lg:text-sm uppercase tracking-wider text-black overflow-hidden border-none cursor-pointer transition-all duration-200"
        style={{
          background: 'linear-gradient(135deg, #60a5fa, #3b82f6)',
          clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)',
          boxShadow: '4px 4px 0 #1e3a8a'
        }}
      >
        <span className="relative z-10">VER PUNTOS DE RETIRO →</span>
      </button>

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
