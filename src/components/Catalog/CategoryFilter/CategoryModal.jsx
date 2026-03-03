import { useEffect } from 'react';
import Portal from '../../Shared/Portal';
import CategoryModalHeader from './CategoryModalHeader';
import CategoryModalGrid from './CategoryModalGrid';
import CategoryModalFooter from './CategoryModalFooter';

const CategoryModal = ({ isOpen, onClose, categories, selectedCategory, onCategorySelect }) => {
  // Bloquear scroll del body cuando el modal está abierto
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

  if (!isOpen) return null;

  return (
    <Portal>
      <div className="fixed inset-0 z-[99999] overflow-hidden">
        {/* Backdrop - solo intercepta clicks fuera del contenido */}
        <div
          className="absolute inset-0 bg-black/80"
          onClick={onClose}
        />

        {/* Modal Content - con z-index mayor para estar encima del backdrop */}
        <div className="absolute inset-0 flex flex-col overflow-hidden pointer-events-none">
          <div className="pointer-events-auto flex flex-col h-full">
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
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default CategoryModal;
