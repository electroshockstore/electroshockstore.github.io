import { Bell, Search } from 'lucide-react';

const ActionButtons = ({ onSearchClick, onNotificationsClick }) => {
  return (
    <div className="flex items-center gap-2">
      {/* Botón de Búsqueda */}
      <button
        onClick={onSearchClick}
        className="relative p-2.5 bg-cyber-surface rounded-xl transition-all duration-200 border border-cyber-line active:scale-95"
        aria-label="Buscar"
      >
        <Search className="h-5 w-5 text-cyber-cyan" strokeWidth={2.2} />
      </button>

      {/* Botón de Notificaciones */}
      <button
        onClick={onNotificationsClick}
        className="relative p-2.5 bg-cyber-surface rounded-xl transition-all duration-200 border border-cyber-line active:scale-95"
        aria-label="Notificaciones"
      >
        {/* Badge lima */}
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-cyber-lime rounded-full flex items-center justify-center border-2 border-cyber-bg">
          <span className="text-[9px] font-bold text-cyber-bg">1</span>
        </div>
        <Bell className="h-5 w-5 text-gray-300" strokeWidth={2.2} />
      </button>
    </div>
  );
};

export default ActionButtons;
