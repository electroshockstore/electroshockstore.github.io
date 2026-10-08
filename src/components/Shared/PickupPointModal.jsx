import { memo, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { MapPin, X, Calendar, Clock, Shield, Camera, ChevronRight, MessageCircle } from 'lucide-react';
import { PICKUP_POINTS } from '../PuntosRetiro/constants';
import { useLockAppScroll } from '../../context/ScrollContext';
import { useIsDesktop } from '../../hooks/useMediaQuery';
import Portal from './Portal';
import BottomSheet from './BottomSheet';

/**
 * Modal de selección de punto de retiro.
 * Mobile: bottom sheet nativo (spring + drag + grabber).
 * Desktop: modal centrado con fade/scale (mismo contenido).
 */

const OVERLAY_FADE = { duration: 0.25, ease: [0.22, 1, 0.36, 1] };
const MODAL_SPRING = { type: 'spring', stiffness: 380, damping: 32, mass: 0.9 };

const PickupPointHeader = ({ onClose, subtitle }) => (
  <div className="relative px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 border-b border-gray-700/50 flex-shrink-0">
    <button
      onClick={onClose}
      aria-label="Cerrar puntos de retiro"
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
        <div className="min-w-0 flex-1">
          <h3 className="text-lg sm:text-xl font-black text-white">Puntos de Retiro</h3>
          <p className="text-xs sm:text-sm text-gray-400">No tenemos local físico. Elegí dónde retirar.</p>
        </div>
      </div>

      {/* Contexto: por qué producto se consulta */}
      {subtitle && (
        <div className="flex items-center gap-2 rounded-xl border border-blue-500/25 bg-blue-500/10 px-3 py-2">
          <MessageCircle className="h-4 w-4 flex-shrink-0 text-blue-400" strokeWidth={2.5} />
          <p className="min-w-0 flex-1 truncate text-xs text-gray-300">
            Consultando por <span className="font-bold text-white">{subtitle}</span>
          </p>
        </div>
      )}

      {/* Stepper: 1 elegí → 2 abrimos WhatsApp */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-[10px] font-black text-white">
            1
          </span>
          <span className="text-[11px] font-bold text-white">Elegí el punto</span>
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-green-500/60 to-gray-700" />
        <div className="flex items-center gap-1.5">
          <span className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-600 text-[10px] font-black text-gray-400">
            2
          </span>
          <span className="text-[11px] font-bold text-gray-400">Te abrimos WhatsApp</span>
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
);

const PickupPointList = ({ onSelectPoint, selectedPoint }) => (
  <div className="relative flex-1 min-h-0 overflow-y-auto overscroll-contain scrollbar-custom">
    <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
      {PICKUP_POINTS.map((point, index) => {
        const isSelected = selectedPoint?.id === point.id;

        return (
          <motion.button
            key={point.id}
            onClick={() => onSelectPoint(point)}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(index * 0.06, 0.24), duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            whileTap={{ scale: 0.99 }}
            className={`relative w-full flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-[border-color,background-color,box-shadow] duration-200 hover:scale-[1.01] text-left ${
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
                    <motion.span
                      key={`selected-${point.id}`}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 22 }}
                      className="flex-shrink-0 inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 bg-green-500 text-white text-[9px] sm:text-[10px] font-bold rounded-full whitespace-nowrap"
                    >
                      ✓ <span className="hidden xs:inline">Seleccionado</span>
                    </motion.span>
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

            {/* Affordance: chevron que se enciende al seleccionar */}
            <div
              className={`flex h-9 w-9 flex-shrink-0 self-center items-center justify-center rounded-full transition-colors duration-200 ${
                isSelected ? 'bg-green-500 text-white shadow-lg shadow-green-500/40' : 'bg-gray-800 text-gray-500'
              }`}
            >
              <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
            </div>
          </motion.button>
        );
      })}
    </div>
  </div>
);

const PickupPointFooter = () => (
  <div className="relative px-4 sm:px-6 pt-3 sm:pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] border-t border-gray-700/50 bg-gray-900/50 flex-shrink-0">
    <div className="flex items-center justify-center gap-2">
      <svg className="h-4 w-4 flex-shrink-0 text-green-400" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
      <p className="text-xs text-center text-gray-400">
        Al seleccionar un punto, se enviará el mensaje automáticamente por WhatsApp
      </p>
    </div>
  </div>
);

const PickupPointModal = memo(({ isOpen, onClose, onSelectPoint, selectedPoint, subtitle }) => {
  const isDesktop = useIsDesktop();
  const reduceMotion = useReducedMotion();

  // Bloquear scroll del container cuando modal/sheet está abierto
  useLockAppScroll(isOpen);

  // Bloquear scroll del body cuando modal está abierto (legacy, inofensivo)
  useEffect(() => {
    if (isOpen) {
      // Guardar el scroll actual
      const scrollY = window.scrollY;

      // Bloquear scroll
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';

      return () => {
        // Restaurar scroll
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  return (
    <>
      {/* Mobile: bottom sheet nativo */}
      {!isDesktop && (
        <BottomSheet
          isOpen={isOpen}
          onClose={onClose}
          label="Puntos de retiro"
          panelClassName="bg-[#0d0d0d]"
          contentClassName="overflow-hidden"
        >
          <div className="flex h-full min-h-0 flex-col">
            <PickupPointHeader onClose={onClose} subtitle={subtitle} />
            <PickupPointList onSelectPoint={onSelectPoint} selectedPoint={selectedPoint} />
            <PickupPointFooter />
          </div>
        </BottomSheet>
      )}

      {/* Desktop: modal centrado */}
      {isDesktop && (
        <Portal>
          <AnimatePresence>
            {isOpen && (
              <div key="pickup-modal" className="fixed inset-0 z-[99999] overflow-hidden">
                {/* Backdrop */}
                <motion.div
                  className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                  onClick={onClose}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={reduceMotion ? { duration: 0 } : OVERLAY_FADE}
                />

                {/* Modal Content */}
                <div className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none">
                  <motion.div
                    className="pointer-events-auto relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-2xl border border-gray-700/50 overflow-hidden max-h-[90vh] flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                    initial={{ opacity: 0, scale: 0.96, y: 14 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, y: 10 }}
                    transition={reduceMotion ? { duration: 0 } : MODAL_SPRING}
                  >
                    {/* Decorative glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-green-500/20 rounded-full blur-3xl pointer-events-none" />

                    <PickupPointHeader onClose={onClose} subtitle={subtitle} />
                    <PickupPointList onSelectPoint={onSelectPoint} selectedPoint={selectedPoint} />
                    <PickupPointFooter />
                  </motion.div>
                </div>
              </div>
            )}
          </AnimatePresence>
        </Portal>
      )}
    </>
  );
});

PickupPointModal.displayName = 'PickupPointModal';

export default PickupPointModal;
