import { motion } from 'framer-motion';
import { useTawkTo } from '../../hooks/useTawkTo';

const LiveChatButton = ({ productName, className = "" }) => {
  const { isLoaded, isOnline, openChat, sendMessage } = useTawkTo();

  const handleLiveChat = () => {
    const initialMessage = productName 
      ? `Hola, estoy interesado en este producto: "${productName}". ¿Podrían darme más información?`
      : 'Hola, vengo desde su catálogo web para realizar una consulta. ¿Podrían ayudarme?';
      
    // Usar la función global que abre directamente maximizado
    if (window.openTawkChat) {
      const success = window.openTawkChat(initialMessage);
      if (!success) {
        alert('El chat en vivo se está cargando. Por favor, intenta nuevamente en unos segundos.');
      }
    } else {
      // Fallback
      const success = openChat(initialMessage);
      if (!success) {
        alert('El chat en vivo se está cargando. Por favor, intenta nuevamente en unos segundos.');
      }
    }
  };

  return (
    <motion.button
      onClick={handleLiveChat}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      disabled={!isLoaded}
      className={`w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-4 py-3 sm:px-6 sm:py-4 rounded-xl shadow-lg hover:shadow-blue-500/50 transition-all duration-300 font-bold text-sm sm:text-base ${className}`}
    >
      {/* Chat Icon */}
      <div className="flex-shrink-0 relative">
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
        </svg>
        
        {/* Status indicator */}
        {isLoaded && (
          <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border border-white ${
            isOnline ? 'bg-green-400 animate-pulse' : 'bg-orange-400'
          }`} />
        )}
      </div>

      {/* Text */}
      <div className="flex flex-col items-start">
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm font-semibold opacity-90">
            Chat en Vivo
          </span>
          {isOnline && (
            <span className="text-[10px] sm:text-xs bg-green-400 text-green-900 px-2 py-0.5 rounded-full font-bold">
              ONLINE
            </span>
          )}
        </div>
        <span className="text-sm sm:text-base font-black">
          {isLoaded ? (isOnline ? 'Hablar ahora' : 'Dejar mensaje') : 'Cargando...'}
        </span>
      </div>

      {/* Arrow */}
      <motion.div
        animate={{ x: [0, 3, 0] }}
        transition={{ 
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="flex-shrink-0"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </motion.div>

      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-xl" />
    </motion.button>
  );
};

export default LiveChatButton;