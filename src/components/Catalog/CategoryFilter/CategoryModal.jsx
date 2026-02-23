import Portal from '../../Shared/Portal';
import CategoryModalHeader from './CategoryModalHeader';
import CategoryModalGrid from './CategoryModalGrid';
import CategoryModalFooter from './CategoryModalFooter';

const CategoryModal = ({ isOpen, onClose, categories, selectedCategory, onCategorySelect }) => {
  if (!isOpen) return null;

  return (
    <Portal>
      <div className="fixed inset-0 z-[99999] overflow-hidden">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/80"
          onClick={onClose}
        />

        {/* Modal Content */}
        <div className="absolute inset-0 flex flex-col overflow-hidden">
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
    </Portal>
  );
};

export default CategoryModal;
