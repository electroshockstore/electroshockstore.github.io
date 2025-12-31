import { usePCBuilder } from '../../context/PCBuilderContext';

const PCCategoryFilter = ({ selectedCategory, onCategoryChange, vertical = false }) => {
  const { pcBuild } = usePCBuilder();
  
  const pcCategories = [
    { key: 'Procesadores', label: 'CPU', icon: '🖥️', buildKey: 'cpu', image: '/images/category_filter/procesadores.png' },
    { key: 'Motherboards', label: 'Motherboard', icon: '🔌', buildKey: 'motherboard', image: '/images/category_filter/db9865e3d3dd4131bd5f2f45b6660410.png' },
    { key: 'Memorias RAM', label: 'RAM', icon: '💾', buildKey: 'ram', image: '/images/category_filter/memorias_ram.png' },
    { key: 'Fuentes', label: 'PSU', icon: '⚡', buildKey: 'psu', image: '/images/category_filter/fuentes.webp' },
    { key: 'Refrigeración', label: 'Cooler', icon: '❄️', buildKey: 'cooling', image: '/images/category_filter/refrigeracion.png' },
    { key: 'Almacenamiento', label: 'Storage', icon: '💿', buildKey: 'storage', image: '/images/category_filter/almacenamiento.png' }
  ];
  
  const hasComponent = (buildKey) => {
    if (!buildKey) return false;
    const value = pcBuild[buildKey];
    return Array.isArray(value) ? value.length > 0 : value !== null;
  };

  // Vertical mode (sidebar with icons)
  if (vertical) {
    return (
      <div className="flex flex-col gap-3 w-full px-2">
        {pcCategories.map((category) => {
          const isSelected = selectedCategory === category.key;
          const isCompleted = hasComponent(category.buildKey);
          
          return (
            <button
              key={category.key}
              onClick={() => onCategoryChange(category.key)}
              className={`
                relative w-full h-24 rounded-2xl flex flex-col items-center justify-center 
                transition-all duration-300 group overflow-hidden
                ${isSelected
                  ? 'bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 text-white shadow-2xl shadow-blue-500/40 scale-105'
                  : isCompleted
                    ? 'bg-gradient-to-br from-green-400 to-emerald-600 text-white hover:scale-105 shadow-lg shadow-green-500/30'
                    : 'bg-gradient-to-br from-gray-700 to-gray-600 text-gray-300 hover:from-gray-600 hover:to-gray-500 hover:scale-105 shadow-lg'
                }
              `}
              title={category.label}
            >
              {/* Animated background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
              
              {/* Floating Image */}
              <div className="relative mb-1 transform group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300">
                <img 
                  src={category.image} 
                  alt={category.label}
                  className="w-12 h-12 object-contain filter drop-shadow-lg"
                  loading="lazy"
                />
              </div>
              
              <span className="text-[9px] font-black uppercase tracking-wider">
                {category.label}
              </span>
              
              {isCompleted && !isSelected && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-white border-3 border-green-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <span className="text-green-600 text-sm font-black">✓</span>
                </div>
              )}
              
              {isSelected && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    );
  }

  // Horizontal mode
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
      {pcCategories.map((category) => {
        const isSelected = selectedCategory === category.key;
        const isCompleted = hasComponent(category.buildKey);
        
        return (
          <button
            key={category.key}
            onClick={() => onCategoryChange(category.key)}
            className={`
              relative flex items-center gap-3 px-6 py-3 rounded-2xl font-black whitespace-nowrap 
              transition-all duration-300 group overflow-hidden
              ${isSelected
                ? 'bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white shadow-2xl shadow-blue-500/50 scale-105'
                : isCompleted
                  ? 'bg-gradient-to-r from-green-400 to-emerald-600 text-white shadow-xl shadow-green-500/30 hover:shadow-2xl hover:scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-blue-300 shadow-md hover:shadow-xl hover:scale-105'
              }
            `}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            
            <span className="text-2xl transform group-hover:scale-110 transition-transform duration-300 relative z-10">
              {category.icon}
            </span>
            <span className="uppercase tracking-wide text-sm relative z-10">{category.label}</span>
            
            {isCompleted && !isSelected && (
              <div className="ml-2 w-5 h-5 bg-white rounded-full flex items-center justify-center relative z-10">
                <span className="text-green-600 text-xs font-black">✓</span>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default PCCategoryFilter;