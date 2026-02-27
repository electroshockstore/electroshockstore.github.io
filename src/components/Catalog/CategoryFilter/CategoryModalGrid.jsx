import { useIsIOS } from '../../../hooks/useDevice';
import CategoryModalCard from './CategoryModalCard';

const CategoryModalGrid = ({ categories, selectedCategory, onCategorySelect }) => {
  const isIOS = useIsIOS();

  return (
    <div 
      className="flex-1 overflow-y-auto overflow-x-hidden relative"
      style={{
        background: 'linear-gradient(to bottom, rgb(17, 24, 39), rgb(31, 41, 55))',
        WebkitOverflowScrolling: 'touch',
        overscrollBehavior: 'contain'
      }}
    >
      {/* Pattern decorativo sutil */}
      <div className="absolute inset-0 opacity-5 bg-grain pointer-events-none" />
      
      {/* Contenedor centrado con padding */}
      <div className="min-h-full flex items-start justify-center px-4 sm:px-6 py-6">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-md relative z-10">
          {categories.map((category, index) => (
            <CategoryModalCard
              key={category}
              category={category}
              index={index}
              isSelected={selectedCategory === category}
              isIOS={isIOS}
              onSelect={onCategorySelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryModalGrid;
