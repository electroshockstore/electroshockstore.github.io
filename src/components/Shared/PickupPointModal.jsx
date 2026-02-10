import { memo, useEffect } from 'react';
import { MapPin, X, Calendar, Clock, Shield, Camera, MapPinned } from 'lucide-react';
import { PICKUP_POINTS } from '../PuntosRetiro/constants';

const PickupPointModal = memo(({ isOpen, onClose, onSelectPoint, selectedPoint }) => {
  // Bloquear scroll del body cuando el modal está abierto (iOS compatible)
  useEffect(() => {
    if (isOpen) {
      // Guardar posición actual del scroll
      const scrollY = window.scrollY;
      
      // Aplicar estilos para bloquear scroll (iOS compatible)
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      return () => {
        // Restaurar estilos
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        
        // Restaurar posición del scroll
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop - Blur solo en desktop */}
      <div 
        className="fixed inset-0 bg-black/60 md:backdrop-blur-sm z-[9998] animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 animate-in zoom-in-95 fade-in duration-200">
        <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-2xl border border-gray-700/50 overflow-hidden max-h-[95vh] flex flex-col">
          {/* Decorative glow - Solo desktop */}
          <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-green-500/20 rounded-full blur-3xl" />
          
          {/* Header */}
          <div className="relative px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 border-b border-gray-700/50 flex-shrink-0">
            <button
              onClick={onClose}
              className="absolute top-3 sm:top-4 right-3 sm:right-4 p-2 hover:bg-white/10 rounded-xl transition-colors z-10"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
            
            <div className="space-y-3 sm:space-y-4">
              {/* Título principal */}
              <div className="flex items-center gap-3">
                <div className="p-2 sm:p-3 rounded-xl bg-green-500/20 border border-green-500/30">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-white">Puntos de Retiro</h3>
                  <p className="text-xs sm:text-sm text-gray-400">No tenemos local físico. Elegí dónde retirar.</p>
                </div>
              </div>

              {/* Información de seguridad general */}
              <div className="bg-emerald-500/10 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 border border-emerald-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" strokeWidth={2} />
                  <p className="text-xs sm:text-sm font-bold text-emerald-400 uppercase">Todos los puntos cuentan con:</p>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400/70 flex-shrink-0" strokeWidth={2} />
                    <span className="text-[10px] sm:text-xs text-gray-300 whitespace-nowrap">Seguridad Policial</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Camera className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400/70 flex-shrink-0" strokeWidth={2} />
                    <span className="text-[10px] sm:text-xs text-gray-300 whitespace-nowrap">Cámaras de Seguridad</span>
                  </div>
                
                </div>
              </div>
            </div>
          </div>

          {/* Content - Scrollable */}
          <div className="relative flex-1 overflow-y-auto scrollbar-custom">
            <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
              {PICKUP_POINTS.map((point) => {
                const isSelected = selectedPoint?.id === point.id;
                
                return (
                  <button
                    key={point.id}
                    onClick={() => onSelectPoint(point)}
                    className={`relative w-full flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] text-left ${
                      isSelected
                        ? 'border-green-500 bg-green-500/10 shadow-lg shadow-green-500/20'
                        : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                    }`}
                  >
                    {/* Imagen circular del punto */}
                    <div className="relative flex-shrink-0">
                      <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 ${
                        isSelected ? 'border-green-500' : 'border-gray-600'
                      }`}>
                        <img 
                          src={point.image} 
                          alt={point.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      {/* Badge número */}
                      <div className={`absolute -top-1 -right-1 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-black text-white shadow-lg bg-gradient-to-br ${point.color}`}>
                        {point.id}
                      </div>
                    </div>

                    {/* Contenido */}
                    <div className="flex-1 min-w-0 space-y-2 sm:space-y-2.5">
                      {/* Título y dirección */}
                      <div>
                        <div className="flex items-start gap-2 mb-1">
                          <h4 className="text-base sm:text-lg font-black text-white flex-1 min-w-0">
                            {point.name}
                          </h4>
                          {isSelected && (
                            <span className="flex-shrink-0 inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 bg-green-500 text-white text-[9px] sm:text-[10px] font-bold rounded-full whitespace-nowrap">
                              ✓ <span className="hidden xs:inline">Seleccionado</span>
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-400">
                          <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" strokeWidth={2} />
                          <span className="line-clamp-1">{point.address}</span>
                        </div>
                      </div>

                      {/* Horarios en grid compacto */}
                      <div className="grid grid-cols-2 gap-2">
                        {/* Días */}
                        <div className="flex items-center gap-2 bg-gray-900/50 rounded-lg px-2 py-1.5 border border-gray-700/50">
                          <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400 flex-shrink-0" strokeWidth={2} />
                          <div className="min-w-0 flex-1">
                            <p className="text-[9px] sm:text-[10px] text-gray-500 uppercase font-medium">Días</p>
                            <p className="text-xs sm:text-sm font-bold text-white leading-tight">
                              <span className="sm:hidden">{point.days === 'Lunes a Viernes' ? 'Lun a Vie' : point.days === 'Todos los días' ? 'Todos' : point.days}</span>
                              <span className="hidden sm:inline">{point.days}</span>
                            </p>
                          </div>
                        </div>

                        {/* Horario */}
                        <div className="flex items-center gap-2 bg-gray-900/50 rounded-lg px-2 py-1.5 border border-gray-700/50">
                          <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 flex-shrink-0" strokeWidth={2} />
                          <div className="min-w-0 flex-1">
                            <p className="text-[9px] sm:text-[10px] text-gray-500 uppercase font-medium">Horario</p>
                            <p className="text-xs sm:text-sm font-bold text-white leading-tight">{point.schedule}</p>
                          </div>
                        </div>
                      </div>

                    
                     
                   
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="relative px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-700/50 bg-gray-900/50 flex-shrink-0">
            <p className="text-xs text-center text-gray-400">
              Al seleccionar un punto, se enviará el mensaje automáticamente por WhatsApp
            </p>
          </div>
        </div>
      </div>
    </>
  );
});

PickupPointModal.displayName = 'PickupPointModal';

export default PickupPointModal;
