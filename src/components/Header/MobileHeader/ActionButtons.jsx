import { Bell, Search } from 'lucide-react';

const ActionButtons = ({ onSearchClick, onNotificationsClick }) => {
  return (
    <div className="flex items-center gap-2">
      {/* Botón de Búsqueda */}
      <button
        onClick={onSearchClick}
        className="relative p-2.5 bg-gradient-to-br from-gray-800/90 to-gray-900/90 hover:from-gray-700/90 hover:to-gray-800/90 rounded-xl transition-all duration-200 border border-gray-700/50 hover:border-gray-600/50 shadow-lg hover:shadow-xl active:scale-95"
        aria-label="Buscar"
      >
        <Search className="h-5 w-5 text-gray-300" strokeWidth={2.2} />
      </button>

      {/* Botón de Notificaciones */}
      <button
        onClick={onNotificationsClick}
        className="relative p-2.5 bg-gradient-to-br from-gray-800/90 to-gray-900/90 hover:from-gray-700/90 hover:to-gray-800/90 rounded-xl transition-all duration-200 border border-gray-700/50 hover:border-gray-600/50 shadow-lg hover:shadow-xl active:scale-95"
        aria-label="Notificaciones"
      >
        {/* Badge morado premium */}
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center border-2 border-gray-900 shadow-lg shadow-purple-500/50">
          <span className="text-[9px] font-bold text-white">1</span>
        </div>
        <Bell className="h-5 w-5 text-gray-300" strokeWidth={2.2} />
      </button>
    </div>
  );
};

export default ActionButtons;
