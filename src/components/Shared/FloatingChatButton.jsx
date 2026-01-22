import { useState } from 'react';
import { Send, X, MapPin, FileText } from 'lucide-react'; 
import { useLocation, useNavigate } from 'react-router-dom';
import { useTawkTo } from '../../hooks/useTawkTo';

const FloatingChatButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showConditionsModal, setShowConditionsModal] = useState(false);
  const { isOnline, openChat } = useTawkTo();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Ocultar en PC Builder ya que tiene su propio botón de WhatsApp
  if (location.pathname.includes('/pc-builder')) {
    return null;
  }

  const handleWhatsApp = () => {
    const phoneNumber = '5491125718382';
    const message = encodeURIComponent('Hola, vengo desde su catálogo web para realizar una consulta. ¿Podrían ayudarme?');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
    setIsExpanded(false);
  };

  const handleLiveChat = () => {
    const initialMessage = 'Hola, vengo desde su catálogo web para realizar una consulta. ¿Podrían ayudarme?';
    if (window.openTawkChat) {
      window.openTawkChat(initialMessage);
    } else {
      openChat(initialMessage);
    }
    setIsExpanded(false);
  };

  const handlePuntosRetiro = () => {
    navigate('/puntos-de-retiro');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsExpanded(false);
  };

  const handleCondiciones = () => {
    setShowConditionsModal(true);
    setIsExpanded(false);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {/* Modal de Condiciones */}
      {showConditionsModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setShowConditionsModal(false)}
        >
          <div
            className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl shadow-2xl max-w-2xl w-full border border-gray-700/50 overflow-hidden modal-scale-enter"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-blue-500/10 pointer-events-none" />
            
            {/* Close button */}
            <button
              onClick={() => setShowConditionsModal(false)}
              className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-2 transition-all duration-200 hover:scale-110 border border-white/20"
            >
              <X className="w-5 h-5 text-white" strokeWidth={2.5} />
            </button>

            {/* Header */}
            <div className="px-6 pt-6 pb-4">
              <div className="flex items-center gap-3">
                <div className="bg-orange-500/20 backdrop-blur-sm p-3 rounded-xl border border-orange-500/30">
                  <FileText className="w-6 h-6 text-orange-400" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Condiciones de Venta</h3>
                  <p className="text-sm text-gray-400">Información importante</p>
                </div>
              </div>
            </div>

            {/* Contenido */}
            <div className="px-4 sm:px-6 pb-6 flex items-center justify-center">
              <div className="relative group">
                <img
                  src="/images/condiciones_tiny.webp"
                  alt="Condiciones de Venta"
                  className="max-w-full max-h-[60vh] sm:max-h-[70vh] w-auto h-auto object-contain rounded-xl shadow-2xl border border-gray-700/50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 pb-6 flex justify-center">
              <button
                onClick={() => setShowConditionsModal(false)}
                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-orange-500/50 hover:scale-105"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop con blur cuando está expandido */}
      {isExpanded && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-all duration-300 animate-in fade-in" />
      )}

      <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 floating-chat-enter">
        
        {/* --- MENÚ EXPANDIDO --- */}
        {isExpanded && (
          <div className="relative flex flex-col items-start gap-2 sm:gap-3 mb-2 sm:mb-3 chat-options-enter animate-in slide-in-from-bottom-4 fade-in duration-300 z-50">
            
            {/* WhatsApp */}
            <button
              onClick={handleWhatsApp}
              className="flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-105 hover:translate-x-1"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-md sm:rounded-lg flex items-center justify-center border border-white/10">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.785"/>
                </svg>
              </div>
              <div className="flex flex-col items-start min-w-0">
                <span className="text-xs sm:text-sm font-bold leading-tight">WhatsApp</span>
                <span className="text-xs opacity-90 hidden sm:block">Respuesta inmediata</span>
              </div>
            </button>

            {/* Chat en Vivo */}
            <button
              onClick={handleLiveChat}
              className="flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 hover:translate-x-1"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-md sm:rounded-lg flex items-center justify-center border border-white/10">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
              </div>
              <div className="flex flex-col items-start min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-xs sm:text-sm font-bold leading-tight">Chat en Vivo</span>
                  {isOnline && <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(74,222,128,1)]"></div>}
                </div>
                <span className="text-xs opacity-90 hidden sm:block">
                  {isOnline ? 'Agente disponible' : 'Deja tu mensaje'}
                </span>
              </div>
            </button>

            {/* Puntos de Retiro - SOLO MOBILE */}
            <button
              onClick={handlePuntosRetiro}
              className="sm:hidden flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white p-2 rounded-lg shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 hover:translate-x-1"
            >
              <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-md flex items-center justify-center border border-white/10">
                <MapPin className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col items-start min-w-0">
                <span className="text-xs font-bold leading-tight">Puntos de Retiro</span>
              </div>
            </button>

            {/* Condiciones - SOLO MOBILE */}
            <button
              onClick={handleCondiciones}
              className="sm:hidden flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white p-2 rounded-lg shadow-lg hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 hover:translate-x-1"
            >
              <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-md flex items-center justify-center border border-white/10">
                <FileText className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col items-start min-w-0">
                <span className="text-xs font-bold leading-tight">Condiciones</span>
              </div>
            </button>
          </div>
        )}

        {/* --- BOTÓN PRINCIPAL CON EFECTOS --- */}
        <button
          onClick={toggleExpanded}
          className="group relative bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:from-green-600 hover:via-green-700 hover:to-green-800 text-white rounded-lg sm:rounded-xl shadow-lg sm:shadow-2xl hover:shadow-green-500/50 transition-all duration-300 overflow-hidden hover:scale-105 hover:-translate-y-1 z-50"
        >
          {/* Efecto Shine */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine" style={{ width: '50%' }} />

          {/* Efecto Pulse Ring */}
          <div className="absolute inset-0 rounded-lg sm:rounded-xl border-2 sm:border-4 border-green-400 animate-pulse-ring" />

          {/* Contenido */}
          <div className="relative flex items-center gap-2 sm:gap-4 p-3 sm:p-4">
            
            {/* Icon Container con Wiggle */}
            <div className={`relative transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'animate-wiggle'}`}>
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-md sm:rounded-lg flex items-center justify-center border border-white/30">
                {isExpanded ? (
                  <X className="w-4 h-4 sm:w-6 sm:h-6" strokeWidth={2.5} />
                ) : (
                  <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.785"/>
                  </svg>
                )}
              </div>
              
              {/* Online Indicator */}
              <div className={`absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-white shadow-lg animate-pulse ${isOnline ? 'bg-green-400' : 'bg-orange-400'}`} />
            </div>

            {/* Texto (solo Desktop) */}
            <div className="hidden sm:flex flex-col items-start">
              <span className="text-xs font-semibold text-green-100 uppercase tracking-wide leading-tight">
                ¿Necesitás ayuda?
              </span>
              <span className="text-sm font-black text-white leading-tight">
                Chatea con nosotros
              </span>
            </div>

            {/* Arrow Icon con Bounce */}
            <div className={`hidden sm:block transition-transform duration-300 ${isExpanded ? 'rotate-90' : 'animate-arrow-bounce'}`}>
              <Send className="w-4 h-4 text-white/80" strokeWidth={2.5} />
            </div>
          </div>

          {/* Accent Line */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-white to-transparent animate-accent-line" />
        </button>

        {/* Partículas flotantes */}
        <div className="absolute -top-4 sm:-top-8 left-4 sm:left-8 w-1 h-1 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-float-particle-1" />
        <div className="absolute -top-3 sm:-top-6 left-8 sm:left-16 w-1 h-1 bg-green-500 rounded-full animate-float-particle-2" />
      </div>
    </>
  );
};

export default FloatingChatButton;
