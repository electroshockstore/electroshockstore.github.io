import { useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion, useDragControls } from 'framer-motion';
import Portal from './Portal';
import { useLockAppScroll } from '../../context/ScrollContext';

// Mismo lenguaje de movimiento que el resto de sheets (CategoryModal, filtros)
const SHEET_SPRING = { type: 'spring', stiffness: 320, damping: 34, mass: 0.9 };
const OVERLAY_FADE = { duration: 0.28, ease: [0.22, 1, 0.36, 1] };

/**
 * BottomSheet reutilizable (mobile-first).
 * - Entra deslizando desde abajo con spring, sale hacia abajo.
 * - Drag-to-dismiss desde el asa (el contenido interno scrollea libre).
 * - Overlay con fade, Escape, scroll-lock del container, reduced-motion.
 *
 * @param {boolean} isOpen
 * @param {() => void} onClose
 * @param {string} label - aria-label del dialog
 * @param {string} panelClassName - estilos del panel (fondo, etc.)
 * @param {string} contentClassName - estilos del contenedor de contenido
 *   (por defecto scrollea; pasar 'overflow-hidden' si el contenido
 *   maneja su propio scroll interno)
 * @param {React.ReactNode} children - contenido
 */
const BottomSheet = ({
  isOpen,
  onClose,
  label = 'Panel',
  panelClassName = 'bg-white',
  contentClassName = 'overflow-y-auto overscroll-contain',
  children
}) => {
  const reduceMotion = useReducedMotion();
  const dragControls = useDragControls();

  useLockAppScroll(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          <div
            key="bottom-sheet"
            className="fixed inset-0 z-[99999]"
            role="dialog"
            aria-modal="true"
            aria-label={label}
            data-bottom-sheet
          >
            {/* Overlay */}
            <motion.div
              className="absolute inset-0 bg-black/60"
              onClick={onClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={reduceMotion ? { duration: 0 } : OVERLAY_FADE}
            />

            {/* Panel */}
            <motion.div
              className={`absolute inset-x-0 bottom-0 flex max-h-[92dvh] flex-col overflow-hidden rounded-t-3xl shadow-[0_-20px_60px_-12px_rgba(0,0,0,0.45)] ${panelClassName}`}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={reduceMotion ? { duration: 0 } : SHEET_SPRING}
              drag={reduceMotion ? false : 'y'}
              dragListener={false}
              dragControls={dragControls}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.6 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 110 || info.velocity.y > 700) onClose();
              }}
            >
              {/* Asa para arrastrar y cerrar */}
              <div
                className="flex flex-shrink-0 cursor-grab justify-center pt-3 pb-1.5 active:cursor-grabbing"
                style={{ touchAction: 'none' }}
                onPointerDown={(e) => dragControls.start(e)}
                aria-hidden="true"
              >
                <div className="h-1.5 w-10 rounded-full bg-gray-400/70" />
              </div>

              {/* Contenido (por defecto con su propio scroll interno) */}
              <div className={`flex min-h-0 flex-1 flex-col ${contentClassName}`}>
                {children}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Portal>
  );
};

export default BottomSheet;
