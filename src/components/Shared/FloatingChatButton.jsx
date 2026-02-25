import { useState, useEffect } from 'react';
import { Send, X, MapPin, FileText } from 'lucide-react'; 
import { useLocation, useNavigate } from 'react-router-dom';
import Portal from './Portal';

const FloatingChatButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showConditionsModal, setShowConditionsModal] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isPCBuilderPage = location.pathname.includes('/armatupc') || 
                          location.pathname.includes('/pc-builder');

  // Mostrar botón después de un pequeño delay para fade-in suave
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
      // Mostrar hint después de que el botón aparezca
      setTimeout(() => {
        setShowHint(true);
        // Ocultar hint después de 3 segundos
        setTimeout(() => setShowHint(false), 3000);
      }, 1500);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Bloquear scroll cuando el menú está expandido
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isExpanded]);

  // Bloquear scroll cuando modal está abierto
  useEffect(() => {
    if (showConditionsModal) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [showConditionsModal]);

  // Don't render on PC Builder page - DESPUÉS de todos los hooks
  if (isPCBuilderPage) {
    return null;
  }

  const handleWhatsApp = () => {
    const phoneNumber = '5491125718382';
    const message = encodeURIComponent('Hola, vengo desde su catálogo web para realizar una consulta. ¿Podrían ayudarme?');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
    setIsExpanded(false);
  };

  const handlePuntosRetiro = () => {
    navigate('/puntos-de-retiro');
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
        <Portal>
          <div
            className="fixed inset-0 flex items-center justify-center p-4 bg-black/90 md:backdrop-blur-md animate-fadeIn"
            style={{ zIndex: 2147483647 }}
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
              className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 md:backdrop-blur-sm rounded-full p-2 transition-all duration-200 hover:scale-110 border border-white/20"
            >
              <X className="w-5 h-5 text-white" strokeWidth={2.5} />
            </button>

            {/* Header */}
            <div className="px-6 pt-6 pb-4">
              <div className="flex items-center gap-3">
                <div className="bg-orange-500/20 md:backdrop-blur-sm p-3 rounded-xl border border-orange-500/30">
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
        </Portal>
      )}

      <Portal>
        {/* Backdrop con blur cuando está expandido - Optimizado para mobile y desktop */}
        {isExpanded && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300 animate-in fade-in" 
            style={{ zIndex: 99998 }}
            onClick={() => setIsExpanded(false)}
          />
        )}

        <div className={isPCBuilderPage ? "floating-button-fixed-right" : "floating-button-fixed"}>
        
        {/* --- MENÚ EXPANDIDO --- */}
        {isExpanded && (
          <div className="relative flex flex-col items-stretch gap-2.5 sm:gap-3.5 mb-2.5 sm:mb-3 z-50 w-[280px] sm:w-[350px]">
            
            {/* WhatsApp */}
            <button
              onClick={handleWhatsApp}
              className="floating-menu-item group relative flex flex-col bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl sm:rounded-2xl shadow-xl hover:shadow-green-500/50 btn-premium md:backdrop-blur-md border border-white/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 overflow-hidden"
              style={{ animationDelay: '0ms' }}
            >
              {/* Header superior con icono y título */}
              <div className="relative flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-black/20 border-b border-white/10">
                <div className="w-8 h-8 sm:w-9 sm:h-9 bg-white/25 md:backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30 flex-shrink-0">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.785"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] sm:text-xs font-black text-white/80 uppercase tracking-wider leading-none">Atención Directa</div>
                  <div className="text-xs sm:text-sm font-bold text-white leading-tight mt-0.5">WhatsApp Oficial</div>
                </div>
                <div className="w-2 h-2 rounded-full bg-green-300 animate-pulse flex-shrink-0" />
              </div>
              
              {/* Contenido principal */}
              <div className="flex items-center gap-2.5 px-3 py-2.5 sm:px-4 sm:py-3">
                <div className="flex-1 min-w-0 text-left">
                  <div className="font-bold text-sm sm:text-base leading-tight text-white">Consultar por WhatsApp</div>
                  <div className="text-[10px] sm:text-xs leading-tight text-white/75 mt-0.5">Respuesta inmediata · Online ahora</div>
                </div>
                <Send className="w-4 h-4 sm:w-5 sm:h-5 text-white/60 group-hover:text-white/90 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" strokeWidth={2.5} />
              </div>
              
              {/* Decoración inferior */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            </button>

            {/* Puntos de Retiro - SOLO MOBILE */}
            <button
              onClick={handlePuntosRetiro}
              className="floating-menu-item sm:hidden group relative flex flex-col bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl shadow-xl hover:shadow-cyan-500/50 btn-premium md:backdrop-blur-md border border-white/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 overflow-hidden"
              style={{ animationDelay: '50ms' }}
            >
              {/* Header superior */}
              <div className="relative flex items-center gap-2 px-3 py-2 bg-black/20 border-b border-white/10">
                <div className="w-8 h-8 sm:w-9 sm:h-9 bg-white/25 md:backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30 flex-shrink-0">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-black text-white/80 uppercase tracking-wider leading-none">Ubicaciones</div>
                  <div className="text-xs font-bold text-white leading-tight mt-0.5">3 Puntos Disponibles</div>
                </div>
                <div className="px-2 py-0.5 bg-cyan-300/30 rounded-full">
                  <span className="text-[9px] font-black text-white">NUEVO</span>
                </div>
              </div>
              
              {/* Contenido principal */}
              <div className="flex items-center gap-2.5 px-3 py-2.5">
                <div className="flex-1 min-w-0 text-left">
                  <div className="font-bold text-sm leading-tight text-white">Puntos de Retiro</div>
                  <div className="text-[10px] leading-tight text-white/75 mt-0.5">Ver ubicaciones y horarios</div>
                </div>
                <Send className="w-4 h-4 text-white/60 group-hover:text-white/90 group-hover:translate-x-1 transition-fast-premium flex-shrink-0" strokeWidth={2.5} />
              </div>
              
              {/* Decoración inferior */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            </button>

            {/* Condiciones - SOLO MOBILE */}
            <button
              onClick={handleCondiciones}
              className="floating-menu-item sm:hidden group relative flex flex-col bg-gradient-to-br from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-xl shadow-xl hover:shadow-orange-500/50 btn-premium md:backdrop-blur-md border border-white/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 overflow-hidden"
              style={{ animationDelay: '100ms' }}
            >
              {/* Header superior */}
              <div className="relative flex items-center gap-2 px-3 py-2 bg-black/20 border-b border-white/10">
                <div className="w-8 h-8 sm:w-9 sm:h-9 bg-white/25 md:backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30 flex-shrink-0">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-black text-white/80 uppercase tracking-wider leading-none">Información</div>
                  <div className="text-xs font-bold text-white leading-tight mt-0.5">Términos y Políticas</div>
                </div>
                <div className="w-5 h-5 rounded-full bg-orange-300/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-[10px] font-black text-white">!</span>
                </div>
              </div>
              
              {/* Contenido principal */}
              <div className="flex items-center gap-2.5 px-3 py-2.5">
                <div className="flex-1 min-w-0 text-left">
                  <div className="font-bold text-sm leading-tight text-white">Condiciones de Venta</div>
                  <div className="text-[10px] leading-tight text-white/75 mt-0.5">Información importante</div>
                </div>
                <Send className="w-4 h-4 text-white/60 group-hover:text-white/90 group-hover:translate-x-1 transition-fast-premium flex-shrink-0" strokeWidth={2.5} />
              </div>
              
              {/* Decoración inferior */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            </button>
          </div>
        )}

        {/* --- BOTÓN PRINCIPAL CON EFECTOS Y FADE-IN SUAVE --- */}
        <button
          onClick={toggleExpanded}
          className={`chat-main-button group relative bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:from-green-600 hover:via-green-700 hover:to-green-800 text-white rounded-lg sm:rounded-xl shadow-lg sm:shadow-2xl hover:shadow-green-500/50 btn-premium overflow-hidden z-50
                     transition-all duration-500 ease-out
                     ${showButton 
                       ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' 
                       : 'opacity-0 translate-y-8 scale-90 pointer-events-none'
                     }`}
          style={{
            willChange: 'transform, opacity'
          }}
        >
          {/* Efecto Shine */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine" style={{ width: '50%' }} />

          {/* Efecto Pulse Ring ELIMINADO - Muy costoso, reemplazado por border estático */}
          <div className="absolute inset-0 rounded-lg sm:rounded-xl border-2 sm:border-4 border-green-400/40" />
          
          {/* Badge de notificación - Aparece cuando NO está expandido */}
          {!isExpanded && (
            <div className="notification-badge absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded-full border-2 border-white shadow-lg" />
          )}

          {/* Contenido */}
          <div className={`chat-button-content relative flex items-center gap-2 sm:gap-4 p-2.5 sm:p-4 ${isExpanded ? 'expanded' : ''}`}>
            
            {/* Icon Container con Wiggle */}
            <div className="chat-icon relative transition-fast-premium">
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white/20 md:backdrop-blur-sm rounded-md sm:rounded-lg flex items-center justify-center border border-white/30 group-hover:bg-white/30 transition-colors duration-300">
                {isExpanded ? (
                  <X className="w-4 h-4 sm:w-6 sm:h-6 group-hover:rotate-90 transition-transform duration-300" strokeWidth={2.5} />
                ) : (
                  <svg className="w-4 h-4 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.785"/>
                  </svg>
                )}
              </div>
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
            <div className="chat-arrow hidden sm:block transition-transform duration-300">
              <Send className="w-4 h-4 text-white/80" strokeWidth={2.5} />
            </div>
          </div>

          {/* Accent Line */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-white to-transparent animate-accent-line" />
          
          {/* Tooltip Hint - Solo mobile, aparece brevemente */}
          {showHint && !isExpanded && (
            <div className="hint-tooltip absolute -top-14 left-1/2 -translate-x-1/2 px-3 py-2 bg-gray-900/95 backdrop-blur-sm text-white text-xs font-bold rounded-lg whitespace-nowrap shadow-xl border border-white/10 sm:hidden">
              ¡Tocá para ayuda!
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900/95 border-r border-b border-white/10" />
            </div>
          )}
        </button>

        {/* Partículas flotantes - Solo cuando NO está expandido */}
        {!isExpanded && (
          <>
            <div className="absolute -top-4 sm:-top-8 left-4 sm:left-8 w-1 h-1 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-float-particle-1" />
            <div className="absolute -top-3 sm:-top-6 left-8 sm:left-16 w-1 h-1 bg-green-500 rounded-full animate-float-particle-2" />
            <div className="absolute -top-5 sm:-top-10 left-12 sm:left-20 w-0.5 h-0.5 sm:w-1 sm:h-1 bg-green-300 rounded-full animate-float-particle-3" />
          </>
        )}
      </div>
      </Portal>
    </>
  );
};

export default FloatingChatButton;
