import { useState } from 'react';
import { Send, X, MapPin, FileText } from 'lucide-react'; 
import { useLocation, useNavigate } from 'react-router-dom';

const FloatingChatButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showConditionsModal, setShowConditionsModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Debug para iOS
  console.log('FloatingChatButton renderizado', { 
    pathname: location.pathname,
    shouldHide: location.pathname.includes('/pc-builder')
  });
  
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
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 md:backdrop-blur-md animate-fadeIn"
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
      )}

      {/* Backdrop con blur cuando está expandido - Blur en mobile también */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-all duration-300 animate-in fade-in"
          style={{ 
            zIndex: 9998,
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'block',
            visibility: 'visible'
          }}
          onClick={() => setIsExpanded(false)}
        />
      )}

      <div 
        className="ios-floating-button"
        style={{
          position: 'fixed',
          bottom: '1rem',
          left: '1rem',
          zIndex: 9999,
          display: 'block',
          visibility: 'visible',
          opacity: 1,
          pointerEvents: 'auto'
        }}
      >
        
        {/* --- MENÚ EXPANDIDO --- */}
        {isExpanded && (
          <div 
            className="relative flex flex-col items-stretch gap-3.5 mb-3 chat-options-enter animate-in slide-in-from-bottom-4 fade-in duration-300 z-50 w-[350px] sm:w-auto"
            style={{
              position: 'relative',
              zIndex: 50,
              display: 'flex',
              visibility: 'visible',
              opacity: 1
            }}
          >
            
            {/* WhatsApp */}
            <button
              onClick={handleWhatsApp}
              className="group flex items-center gap-3.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-3.5 rounded-2xl shadow-xl hover:shadow-green-500/50 btn-premium md:backdrop-blur-md border border-white/20"
            >
              <div className="w-14 h-14 bg-white/25 md:backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.785"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="font-bold text-base leading-tight text-white">Consultar por WhatsApp</div>
                <div className="text-xs leading-tight text-white/75 mt-1">Respuesta inmediata </div>
              </div>
              <Send className="w-5 h-5 text-white/60 group-hover:text-white/90 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" strokeWidth={2.5} />
            </button>

            {/* Puntos de Retiro - SOLO MOBILE */}
            <button
              onClick={handlePuntosRetiro}
              className="sm:hidden group flex items-center gap-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-4 py-3.5 rounded-2xl shadow-xl hover:shadow-cyan-500/50 btn-premium md:backdrop-blur-md border border-white/20"
            >
              <div className="w-14 h-14 bg-white/25 md:backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30 hover-scale flex-shrink-0">
                <MapPin className="w-7 h-7" strokeWidth={2.5} />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="font-bold text-base leading-tight text-white">Puntos de Retiro</div>
                <div className="text-xs leading-tight text-white/75 mt-1">Ver ubicaciones y horarios</div>
              </div>
              <Send className="w-5 h-5 text-white/60 group-hover:text-white/90 group-hover:translate-x-1 transition-fast-premium flex-shrink-0" strokeWidth={2.5} />
            </button>

            {/* Condiciones - SOLO MOBILE */}
            <button
              onClick={handleCondiciones}
              className="sm:hidden group flex items-center gap-3.5 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-4 py-3.5 rounded-2xl shadow-xl hover:shadow-orange-500/50 btn-premium md:backdrop-blur-md border border-white/20"
            >
              <div className="w-14 h-14 bg-white/25 md:backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30 hover-scale flex-shrink-0">
                <FileText className="w-7 h-7" strokeWidth={2.5} />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="font-bold text-base leading-tight text-white">Condiciones de Venta</div>
                <div className="text-xs leading-tight text-white/75 mt-1">Informacion Importante</div>
              </div>
              <Send className="w-5 h-5 text-white/60 group-hover:text-white/90 group-hover:translate-x-1 transition-fast-premium flex-shrink-0" strokeWidth={2.5} />
            </button>
          </div>
        )}

        {/* --- BOTÓN PRINCIPAL CON EFECTOS OPTIMIZADOS --- */}
        <button
          onClick={toggleExpanded}
          className="group relative bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:from-green-600 hover:via-green-700 hover:to-green-800 text-white rounded-lg sm:rounded-xl shadow-lg sm:shadow-2xl hover:shadow-green-500/50 btn-premium overflow-hidden floating-chat-button"
        >
          {/* Efecto Shine - Deshabilitado en mobile para performance */}
          <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine shine-effect" />

          {/* Efecto Pulse Ring - Simplificado en mobile */}
          <div className="absolute inset-0 rounded-lg sm:rounded-xl border-2 sm:border-4 border-green-400 animate-pulse-ring pulse-ring-effect" />

          {/* Contenido */}
          <div className={`chat-button-content relative flex items-center gap-2 sm:gap-4 p-3 sm:p-4 ${isExpanded ? 'expanded' : ''}`}>
            
            {/* Icon Container con Wiggle */}
            <div className="chat-icon relative transition-fast-premium chat-icon-container">
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white/20 md:backdrop-blur-sm rounded-md sm:rounded-lg flex items-center justify-center border border-white/30">
                {isExpanded ? (
                  <X className="w-4 h-4 sm:w-6 sm:h-6" strokeWidth={2.5} />
                ) : (
                  <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
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

          {/* Accent Line - Deshabilitado en mobile */}
          <div className="hidden sm:block absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-white to-transparent animate-accent-line accent-line-effect" />
        </button>

        {/* Partículas flotantes - Solo desktop para mejor performance */}
        <div className="hidden sm:block absolute -top-4 sm:-top-8 left-4 sm:left-8 w-1 h-1 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-float-particle-1" />
        <div className="hidden sm:block absolute -top-3 sm:-top-6 left-8 sm:left-16 w-1 h-1 bg-green-500 rounded-full animate-float-particle-2" />
      </div>
    </>
  );
};

export default FloatingChatButton;
