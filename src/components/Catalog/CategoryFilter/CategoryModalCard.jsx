import { getCategoryImage } from '../../../constants/categoryConfig';

const CategoryModalCard = ({ category, index, isSelected, isIOS, onSelect }) => {
  const categoryImage = getCategoryImage(category);
  const isTopImage = index < 4;

  const handleClick = () => {
    onSelect(category);
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    onSelect(category);
  };

  return (
    <button
      onClick={handleClick}
      onTouchEnd={handleTouchEnd}
      style={{ 
        animationDelay: `${index * 30}ms`,
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'manipulation',
        ...(isSelected ? { filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.6))' } : {})
      }}
      className={`
        relative overflow-hidden rounded-2xl font-bold
        transition-all duration-200 ${!isIOS ? 'animate-in fade-in zoom-in-95' : ''}
        ${isSelected
          ? 'shadow-[0_8px_24px_rgba(59,130,246,0.5)] scale-[1.05] ring-2 ring-blue-400/80'
          : 'shadow-[0_8px_24px_rgba(0,0,0,0.3),0_4px_12px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.4),0_6px_16px_rgba(0,0,0,0.25)] active:scale-[0.97] hover:scale-[1.02]'
        }
      `}
    >
      <div className="relative aspect-[4/3] w-full pointer-events-none">
        <img
          src={categoryImage}
          alt={category}
          className={`
            absolute inset-0 w-full h-full object-cover pointer-events-none
            transition-all duration-200
            ${isSelected ? 'scale-110 brightness-110' : 'brightness-90 hover:brightness-100'}
          `}
          loading={isTopImage ? "eager" : "lazy"}
          fetchpriority={isTopImage ? "high" : "low"}
          decoding="async"
        />

        <div className={`
          absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent pointer-events-none
          transition-all duration-200
          ${isSelected ? 'from-blue-900/90 via-black/50' : ''}
        `} />

        {isSelected && (
          <div className={`
            absolute top-3 right-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white 
            px-3 py-1.5 rounded-full text-xs font-black shadow-xl 
            ${!isIOS ? 'animate-in zoom-in-50' : ''} 
            duration-200 flex items-center gap-1.5 border border-white/20 pointer-events-none
          `}>
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
            Activa
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 p-4 flex flex-col items-start gap-1.5 pointer-events-none">
          <span 
            className={`
              text-white font-black leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]
              transition-all duration-200
              ${isSelected ? 'text-xl' : 'text-base'}
            `}
            style={isSelected ? { filter: 'drop-shadow(0 2px 8px rgba(59, 130, 246, 0.6))' } : undefined}
          >
            {category}
          </span>

          {!isSelected && (
            <div className="flex items-center gap-1.5 opacity-90">
              <div className="w-1 h-1 rounded-full bg-blue-400" />
              <span className="text-xs text-gray-300 font-semibold">Toca para filtrar</span>
            </div>
          )}
        </div>
      </div>
    </button>
  );
};

export default CategoryModalCard;
