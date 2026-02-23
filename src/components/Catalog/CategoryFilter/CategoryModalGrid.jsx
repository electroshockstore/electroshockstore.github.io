import { useIsIOS } from '../../../hooks/useDevice';
import CategoryModalCard from './CategoryModalCard';

const CategoryModalGrid = ({ categories, selectedCategory, onCategorySelect }) => {
  const isIOS = useIsIOS();

  return (
    <div 
      className="flex-1 overflow-y-auto overflow-x-hidden px-6 py-6"
      style={{
        background: 'linear-gradient(to bottom, rgb(17, 24, 39), rgb(31, 41, 55))',
        WebkitOverflowScrolling: 'touch',
        overscrollBehavior: 'contain'
      }}
    >
      {/* Pattern decorativo sutil */}
      <div className="absolute inset-0 opacity-5 bg-grain pointer-events-none" />
      
      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto relative z-10">
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
  );
};

export default CategoryModalGrid;
