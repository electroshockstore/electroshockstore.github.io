const ElectroShockLogo = ({ onClick, size = 'default' }) => {
  const sizes = {
    small: {
      container: 'w-9 h-9',
      image: 'w-7 h-7'
    },
    default: {
      container: 'w-11 h-11',
      image: 'w-9 h-9'
    },
    large: {
      container: 'w-14 h-14',
      image: 'w-11 h-11'
    }
  };

  const currentSize = sizes[size] || sizes.default;

  return (
    <button 
      onClick={onClick}
      className="flex items-center gap-2.5 hover:opacity-90 transition-opacity group"
    >
      {/* Logo con glow verde premium */}
      <div className="relative">
        {/* Glow exterior */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity" />
        
        {/* Contenedor del logo */}
        <div>
          <img 
            src="/public/logo.webp" 
            alt="ElectroShock Logo" 
            className={`${currentSize.image} object-contain drop-shadow-lg`}
          />
        </div>
      </div>
      
      {/* Texto del logo */}
      <div className="flex flex-col">
        <span className="text-xl font-black text-white leading-none tracking-tight">
          Electro<span className="text-emerald-400">Shock</span>
        </span>
        <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-[0.15em]">
          Tecnología y Conectividad
        </span>
      </div>
    </button>
  );
};

export default ElectroShockLogo;
