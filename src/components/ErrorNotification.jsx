import { memo } from 'react';
import { X, RefreshCw, Wifi, WifiOff, AlertCircle } from 'lucide-react';

const ErrorNotification = ({ error, onClose, onReload }) => {
  if (!error) return null;

  const getErrorIcon = () => {
    switch (error.type) {
      case 'network':
        return <WifiOff className="w-5 h-5" />;
      case 'css':
      case 'js':
        return <AlertCircle className="w-5 h-5" />;
      case 'api':
        return <Wifi className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  const getErrorColor = () => {
    switch (error.type) {
      case 'network':
        return 'from-red-500 to-red-600';
      case 'css':
      case 'js':
        return 'from-orange-500 to-orange-600';
      case 'api':
        return 'from-yellow-500 to-yellow-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="fixed top-4 left-4 right-4 z-[100] mx-auto max-w-md animate-in fade-in slide-in-from-top-2 duration-300">
      <div className={`bg-gradient-to-r ${getErrorColor()} text-white rounded-2xl shadow-2xl p-4 border border-white/20`}>
        <div className="flex items-start gap-3">
          {/* Icono */}
          <div className="flex-shrink-0 mt-0.5">
            {getErrorIcon()}
          </div>

          {/* Contenido */}
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-sm mb-1">
              {error.message}
            </h4>
            <p className="text-xs text-white/90 mb-3">
              {error.action}
            </p>

            {/* Botones de acción */}
            <div className="flex gap-2">
              <button
                onClick={onReload}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-medium transition-all duration-200 backdrop-blur-sm active:scale-95"
              >
                <RefreshCw className="w-3 h-3" />
                Recargar
              </button>
              
              <button
                onClick={onClose}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-medium transition-all duration-200 backdrop-blur-sm active:scale-95"
              >
                Cerrar
              </button>
            </div>
          </div>

          {/* Botón cerrar */}
          <button
            onClick={onClose}
            className="flex-shrink-0 p-1 hover:bg-white/20 rounded-lg transition-colors duration-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(ErrorNotification);