import { useNavigate } from 'react-router-dom';
import { Search, FileText, MapPin, Home, Bot, ArrowRight } from 'lucide-react';

const HeaderActions = ({ 
  isMobile = false, 
  showMobileSearch,
  onSearchToggle,
  onSearchClose,
  onConditionsClick 
}) => {
  const navigate = useNavigate();

  if (isMobile) {
    return (
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Search Icon - Mobile - SIEMPRE VISIBLE con toggle */}
        <button
          onClick={() => showMobileSearch ? onSearchClose() : onSearchToggle()}
          className={`relative p-2.5 rounded-full text-white
                     transition-all duration-300 
                     shadow-lg hover:shadow-blue-500/60
                     border-2
                     overflow-hidden group
                     hover:scale-110 active:scale-95
                     ${showMobileSearch 
                       ? 'bg-gradient-to-r from-purple-600 to-blue-600 border-blue-400 ring-2 ring-blue-400/50' 
                       : 'bg-gradient-to-r from-blue-600 to-purple-600 border-blue-400/40 shadow-blue-500/40'
                     }`}
          aria-label={showMobileSearch ? "Cerrar búsqueda" : "Abrir búsqueda"}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          <Search className="h-4 w-4 relative z-10" strokeWidth={2.5} />
        </button>

        {/* Inicio */}
        <button
          onClick={() => navigate('/')}
          className="relative p-2.5
                   bg-gradient-to-br from-green-500/20 to-emerald-500/20
                   hover:from-green-500/30 hover:to-emerald-500/30
                   backdrop-blur-sm rounded-full
                   transition-all duration-300 
                   border border-green-400/30 hover:border-green-400/50
                   shadow-lg shadow-green-500/20
                   hover:scale-110 active:scale-95"
          aria-label="Inicio"
        >
          <Home className="h-4 w-4 text-green-300" strokeWidth={2.5} />
        </button>
      </div>
    );
  }

  // Desktop
  return (
    <div className="flex items-center gap-2 flex-shrink-0">
      {/* Bot Helper */}
      <div className="flex items-center gap-2 mr-3 header-bot-enter">
        <div className="relative">
          <div className="relative animate-bot-pulse">
            <div className="bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 rounded-full p-2 shadow-xl border-2 border-cyan-300/50">
              <Bot className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <div className="absolute inset-0 bg-cyan-400 rounded-full blur-md animate-bot-glow" />
          </div>
        </div>
        
        <div className="animate-arrow-wiggle">
          <ArrowRight className="w-4 h-4 text-cyan-400" strokeWidth={3} />
        </div>
        
        <div className="bg-gradient-to-r from-cyan-500/20 to-blue-600/20 backdrop-blur-sm px-2 py-1 rounded-full border border-cyan-400/30">
          <p className="text-xs font-bold text-cyan-300 whitespace-nowrap">
            ¡Info importante!
          </p>
        </div>
      </div>

      {/* Condiciones */}
      <div className="relative">
        <div className="absolute -inset-2 bg-gradient-to-r from-orange-500/30 to-red-600/30 blur-lg opacity-60 rounded-full animate-pulse" />
        
        <button
          onClick={onConditionsClick}
          className="relative flex items-center gap-2 px-6 py-2.5
                   bg-gradient-to-r from-orange-500 to-red-600
                   hover:from-orange-600 hover:to-red-700
                   rounded-full text-white font-bold text-sm
                   transition-all duration-300 
                   shadow-lg shadow-orange-500/40 hover:shadow-orange-500/60
                   border-2 border-orange-400/40
                   overflow-hidden group
                   hover:scale-105 active:scale-95
                   animate-button-float"
        >
          <div className="absolute inset-0 bg-orange-400 rounded-full blur-lg opacity-50 animate-button-glow" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          
          <FileText className="h-4 w-4 relative z-10" strokeWidth={2.5} />
          <span className="hidden lg:inline relative z-10">Condiciones</span>
        </button>
      </div>
      
      {/* Puntos de Retiro */}
      <button
        onClick={() => navigate('/puntos-de-retiro')}
        className="relative flex items-center gap-2 px-6 py-2.5
                 bg-gradient-to-br from-blue-500/20 to-indigo-500/20
                 hover:from-blue-500/30 hover:to-indigo-500/30
                 backdrop-blur-sm rounded-full font-medium text-sm
                 transition-all duration-300 
                 border border-blue-400/30 hover:border-blue-400/50
                 shadow-lg shadow-blue-500/20
                 hover:scale-105 active:scale-95"
      >
        <MapPin className="h-4 w-4 text-blue-300" strokeWidth={2.5} />
        <span className="hidden lg:inline text-blue-100">Puntos de Retiro</span>
      </button>

      {/* Inicio */}
      <button
        onClick={() => navigate('/')}
        className="relative flex items-center gap-2 px-6 py-2.5
                 bg-gradient-to-br from-green-500/20 to-emerald-500/20
                 hover:from-green-500/30 hover:to-emerald-500/30
                 backdrop-blur-sm rounded-full font-medium text-sm
                 transition-all duration-300 
                 border border-green-400/30 hover:border-green-400/50
                 shadow-lg shadow-green-500/20
                 hover:scale-105 active:scale-95"
      >
        <Home className="h-4 w-4 text-green-300" strokeWidth={2.5} />
        <span className="hidden lg:inline text-green-100">Inicio</span>
      </button>
    </div>
  );
};

export default HeaderActions;
