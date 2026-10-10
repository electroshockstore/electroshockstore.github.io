import { useNavigate } from 'react-router-dom';
import { Search, FileText, MapPin, Home, Bot, ArrowRight } from 'lucide-react';
import CTAPill from '../Shared/CTAPill';

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
   
        <button
          onClick={() => showMobileSearch ? onSearchClose() : onSearchToggle()}
          className={`relative p-2.5 rounded-full text-white
                     transition-all duration-300
                     border
                     overflow-hidden group
                     hover:scale-110 active:scale-95
                     ${showMobileSearch
                       ? 'bg-cyber-surface border-cyber-cyan'
                       : 'bg-cyber-surface border-cyber-line'
                     }`}
          aria-label={showMobileSearch ? "Cerrar búsqueda" : "Abrir búsqueda"}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          <Search className="h-4 w-4 relative z-10 text-cyber-cyan" strokeWidth={2.5} />
        </button>

   
        <button
          onClick={() => navigate('/')}
          className="relative p-2.5
                   bg-cyber-surface
                   rounded-full
                   transition-all duration-300
                   border border-cyber-line
                   hover:scale-110 active:scale-95"
          aria-label="Inicio"
        >
          <Home className="h-4 w-4 text-cyber-lime" strokeWidth={2.5} />
        </button>
      </div>
    );
  }

  // Desktop
  return (
    <div className="flex items-center gap-2 flex-shrink-0">
      {/* Bot Helper */}
      <div className="flex items-center gap-2 mr-3 header-bot-enter">
        <div className="bg-cyber-surface rounded-full p-2 border border-cyber-line">
          <Bot className="w-4 h-4 text-cyber-cyan" strokeWidth={2.5} />
        </div>

        <ArrowRight className="w-4 h-4 text-cyber-cyan" strokeWidth={3} />

        <div className="bg-cyber-surface px-2 py-1 rounded-full border border-cyber-line">
          <p className="text-xs font-bold text-cyber-cyan whitespace-nowrap">
            ¡Info importante!
          </p>
        </div>
      </div>

      {/* Condiciones */}
      <CTAPill
        variant="dark"
        size="sm"
        label="Condiciones"
        prefix={<FileText className="h-4 w-4 shrink-0 text-cyber-lime" strokeWidth={2.5} />}
        onClick={onConditionsClick}
        className="hidden text-sm lg:inline-flex"
      />
      
      {/* Puntos de Retiro */}
      <CTAPill
        variant="dark"
        size="sm"
        label="Puntos de Retiro"
        prefix={<MapPin className="h-4 w-4 shrink-0 text-cyber-cyan" strokeWidth={2.5} />}
        onClick={() => navigate('/puntos-de-retiro')}
        labelClassName="text-gray-200"
        className="hidden text-sm font-medium lg:inline-flex"
      />

      {/* Inicio */}
      <CTAPill
        variant="dark"
        size="sm"
        label="Inicio"
        prefix={<Home className="h-4 w-4 shrink-0 text-cyber-lime" strokeWidth={2.5} />}
        onClick={() => navigate('/')}
        labelClassName="text-gray-200"
        className="hidden text-sm font-medium lg:inline-flex"
      />
    </div>
  );
};

export default HeaderActions;
