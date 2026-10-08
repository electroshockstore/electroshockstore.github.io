import { useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion, useDragControls } from 'framer-motion';
import Portal from '../../Shared/Portal';
import { useLockAppScroll } from '../../../context/ScrollContext';
import CategoryModalHeader from './CategoryModalHeader';
import CategoryModalGrid from './CategoryModalGrid';
import CategoryModalFooter from './CategoryModalFooter';

// Spring tipo iOS: entra rápido, asienta suave, sin rebote exagerado
const SHEET_SPRING = { type: 'spring', stiffness: 300, damping: 33, mass: 0.9 };
const OVERLAY_FADE = { duration: 0.3, ease: [0.22, 1, 0.36, 1] };

const CategoryModal = ({ isOpen, onClose, categories, selectedCategory, onCategorySelect }) => {
  const reduceMotion = useReducedMotion();
  const dragControls = useDragControls();

  // Bloquear el scroll del container (el window ya está fijo globalmente)
  useLockAppScroll(isOpen);

  // Bloquear scroll del body cuando el modal está abierto
  useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  // Cerrar con Escape
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
          <div className="fixed inset-0 z-[99999] overflow-hidden" key="category-sheet">
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80"
              onClick={onClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={reduceMotion ? { duration: 0 } : OVERLAY_FADE}
            />

            {/* Bottom sheet */}
            <motion.div
              className="category-sheet absolute inset-x-0 bottom-0 top-0 flex flex-col overflow-hidden bg-[#0d0d0d] rounded-t-3xl shadow-[0_-20px_60px_-12px_rgba(0,0,0,0.7)]"
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
                if (info.offset.y > 120 || info.velocity.y > 800) onClose();
              }}
            >
              {/* Grabber: asa para arrastrar y cerrar (solo gesto desde acá) */}
              <div
                className="flex-shrink-0 flex justify-center pt-3 pb-1.5 bg-black cursor-grab active:cursor-grabbing"
                style={{ touchAction: 'none' }}
                onPointerDown={(e) => dragControls.start(e)}
              >
                <div className="w-10 h-1.5 rounded-full bg-gray-600" />
              </div>

              {/* Header */}
              <CategoryModalHeader onClose={onClose} categoriesCount={categories.length} />

              {/* Grid de categorías */}
              <CategoryModalGrid
                categories={categories}
                selectedCategory={selectedCategory}
                onCategorySelect={onCategorySelect}
              />

              {/* Footer */}
              <CategoryModalFooter />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Portal>
  );
};

export default CategoryModal;
