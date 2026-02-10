import { useNavigate, useLocation } from 'react-router-dom';

const Logo = ({ onGoHome, isMobile = false }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    // No navegar si ya estás en home
    if (location.pathname === '/') {
      return;
    }
    navigate('/');
    onGoHome?.();
  };

  if (isMobile) {
    return (
      <button 
        onClick={handleClick}
        className="flex items-center hover:opacity-80 transition-opacity flex-shrink-0"
      >
        <img 
          src="/logotipo_tiny.png" 
          alt="ElectroShock Logo" 
          className="h-14 w-auto object-contain"
        />
      </button>
    );
  }

  return (
    <button 
      onClick={handleClick}
      className="relative flex items-center gap-4 flex-shrink-0 group"
    >
      {/* Resplandor de fondo */}
      <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 via-purple-600/15 to-blue-600/20 blur-xl rounded-full animate-pulse" style={{ animationDuration: '6s' }} />
      
      {/* Contenedor del Logo */}
      <div className="relative">
        <div className="absolute inset-0 bg-blue-500/30 blur-lg rounded-full" />
        
        <div className="relative p-2.5 bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl border border-white/20 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
          <img 
            src="/logotipo_tiny.png" 
            alt="ElectroShock Logo" 
            className="h-10 w-auto object-contain relative z-10 filter drop-shadow-[0_0_12px_rgba(59,130,246,0.8)]" 
          />
        </div>
      </div>
      
      {/* Texto */}
      <div className="relative z-10 flex flex-col items-start">
        <h1 className="text-5xl font-black tracking-tighter bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
          Shock Store
        </h1>
        <div className="flex items-center gap-2">
          <div className="h-[3px] w-10 bg-gradient-to-r from-blue-400 to-transparent rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 drop-shadow-[0_0_5px_rgba(96,165,250,0.5)]">
            Catálogo
          </h2>
        </div>
      </div>
    </button>
  );
};

export default Logo;
