const ElectroShockLogo = ({ onClick, size = 'default' }) => {
  const sizes = {
    small: {
      container: 'w-9 h-9',
      icon: 'w-5 h-5'
    },
    default: {
      container: 'w-11 h-11',
      icon: 'w-6 h-6'
    },
    large: {
      container: 'w-14 h-14',
      icon: 'w-8 h-8'
    }
  };

  const currentSize = sizes[size] || sizes.default;

  return (
    <button 
      onClick={onClick}
      className="flex items-center gap-2.5 hover:opacity-90 transition-opacity group"
    >
      {/* Logo cyberpunk: chip lima sólido sobre superficie oscura */}
      <div className="relative">
        {/* Contenedor del logo con SVG moderno */}
        <div className={`relative ${currentSize.container} bg-cyber-lime rounded-xl flex items-center justify-center border border-white/20`}>
          {/* SVG de rayo moderno y atractivo */}
          <svg 
            viewBox="0 0 24 24" 
            fill="none"
            stroke="currentColor"
            className={`${currentSize.icon} text-gray-900`}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" fill="currentColor" />
          </svg>
        </div>
      </div>
      
      {/* Texto del logo */}
      <div className="flex flex-col">
        <span className="text-xl font-black text-white leading-none tracking-tight">
          Electro<span className="text-cyber-lime">Shock</span>
        </span>
        <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-[0.15em]">
          Tecnología y Conectividad
        </span>
      </div>
    </button>
  );
};

export default ElectroShockLogo;
