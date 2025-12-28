import { useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import { useTawkTo } from '../../hooks/useTawkTo';

const FloatingChatButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { isOnline, openChat } = useTawkTo();

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
      const success = window.openTawkChat(initialMessage);
      if (!success) {
        alert('El chat en vivo se está cargando. Por favor, intenta nuevamente en unos segundos.');
      }
    } else {
      const success = openChat(initialMessage);
      if (!success) {
        alert('El chat en vivo se está cargando. Por favor, intenta nuevamente en unos segundos.');
      }
    }
    setIsExpanded(false);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="fixed bottom-4 left-6 sm:bottom-6 sm:left-8 z-50 floating-chat-enter">
      
      {/* Opciones expandidas */}
      {isExpanded && (
        <div className="absolute bottom-full mb-4 left-0 flex flex-col gap-3 chat-options-enter">
          
          {/* WhatsApp Option */}
          <button
            onClick={handleWhatsApp}
            className="flex items-center gap-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-4 rounded-2xl shadow-xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-105 hover:translate-x-1"
          >
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.785"/>
              </svg>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-sm font-bold">WhatsApp</span>
              <span className="text-xs opacity-90">Respuesta inmediata</span>
            </div>
          </button>

          {/* Chat en Vivo Option */}
          <button
            onClick={handleLiveChat}
            className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-4 rounded-2xl shadow-xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 hover:translate-x-1"
          >
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
              </svg>
            </div>
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold">Chat en Vivo</span>
                {isOnline && (
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                )}
              </div>
              <span className="text-xs opacity-90">
                {isOnline ? 'Agente disponible' : 'Te responderemos pronto'}
              </span>
            </div>
          </button>
        </div>
      )}

      {/* Main Button */}
      <button
        onClick={toggleExpanded}
        className="group relative bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:from-green-600 hover:via-green-700 hover:to-green-800 text-white rounded-2xl shadow-2xl hover:shadow-green-500/50 transition-all duration-300 overflow-hidden hover:scale-105 hover:-translate-y-1"
      >
        {/* Animated background shine */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine" style={{ width: '50%' }} />

        {/* Pulse ring effect */}
        <div className="absolute inset-0 rounded-2xl border-4 border-green-400 animate-pulse-ring" />

        {/* Button content - Mobile: solo ícono */}
        <div className="relative flex items-center gap-3 p-3 sm:gap-5 sm:px-10 sm:py-6">
          
          {/* Icon container */}
          <div className={`relative transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'animate-wiggle'}`}>
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
              {isExpanded ? (
                <X className="w-6 h-6 sm:w-9 sm:h-9" strokeWidth={2.5} />
              ) : (
                <svg className="w-6 h-6 sm:w-9 sm:h-9" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.785"/>
                </svg>
              )}
            </div>
            
            {/* Online indicator */}
            <div className={`absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-white shadow-lg animate-pulse ${isOnline ? 'bg-green-400' : 'bg-orange-400'}`} />
          </div>

          {/* Text content - Solo visible en desktop */}
          <div className="hidden sm:flex flex-col items-start">
            <span className="text-xs sm:text-base font-semibold text-green-100 uppercase tracking-wide leading-tight">
              ¿Necesitás ayuda?
            </span>
            <span className="text-sm sm:text-xl font-black text-white leading-tight">
              Chatea con nosotros
            </span>
          </div>

          {/* Arrow icon - Solo visible en desktop */}
          <div className={`hidden sm:block transition-transform duration-300 ${isExpanded ? 'rotate-90' : 'animate-arrow-bounce'}`}>
            <Send className="w-6 h-6 text-white/80" strokeWidth={2.5} />
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent animate-accent-line" />
      </button>

      {/* Floating particles effect */}
      <div className="absolute -top-8 right-8 w-2 h-2 bg-green-400 rounded-full animate-float-particle-1" />
      <div className="absolute -top-6 right-16 w-1.5 h-1.5 bg-green-500 rounded-full animate-float-particle-2" />
    </div>
  );
};

export default FloatingChatButton;
