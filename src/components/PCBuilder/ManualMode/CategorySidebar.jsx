import { usePCBuilder } from '../../../context/PCBuilderContext';

const CATEGORIES = [
  { key: 'Procesadores', label: 'Procesador', icon: '/images/icons/cpu_icon_tiny.webp', buildKey: 'cpu' },
  { key: 'Motherboards', label: 'Motherboard', icon: '/images/icons/motherboard_icon_tiny.webp', buildKey: 'motherboard' },
  { key: 'Memorias RAM', label: 'Memoria RAM', icon: '/images/icons/ram_icon_tiny.webp', buildKey: 'ram' },
  { key: 'Fuentes', label: 'Fuente', icon: '/images/icons/psu_icon_tiny.webp', buildKey: 'psu' },
  { key: 'Refrigeración', label: 'Refrigeracion', icon: '/images/icons/refrigeracion_icon_tiny.webp', buildKey: 'cooling' },
  { key: 'Almacenamiento', label: 'Almacenamiento', icon: '/images/icons/storage_icon_tiny.webp', buildKey: 'storage' }
];

const MiniComponentCard = ({ category, component, isSelected, onClick }) => {
  if (!component) {
    return (
      <button
        onClick={onClick}
        className={`
          w-full p-3 lg:p-3.5 rounded-xl border-2 border-dashed transition-all flex items-center gap-2.5 lg:gap-3
          ${isSelected 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'
          }
        `}
      >
        <div className="w-12 h-12 lg:w-14 lg:h-14 bg-white rounded-lg flex items-center justify-center flex-shrink-0 p-2">
          <img 
            src={category.icon} 
            alt={category.label}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex-1 text-left min-w-0">
          <p className="text-sm lg:text-base font-bold text-gray-600">{category.label}</p>
          <p className="text-xs lg:text-sm text-gray-400">Sin seleccionar</p>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`
        w-full p-3 lg:p-3.5 rounded-xl border-2 transition-all group flex items-center gap-2.5 lg:gap-3
        ${isSelected 
          ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-md' 
          : 'border-green-300 bg-gradient-to-r from-green-50 to-emerald-50 hover:border-green-400 hover:shadow-sm'
        }
      `}
    >
      {/* Mini Image */}
      <div className="w-14 h-14 lg:w-16 lg:h-16 bg-white rounded-lg p-1.5 flex items-center justify-center flex-shrink-0 overflow-hidden">
        <img 
          src={component.images?.[0] || component.image} 
          alt={component.name}
          className="max-w-full max-h-full object-contain"
        />
      </div>
      
      {/* Info */}
      <div className="flex-1 text-left min-w-0">
        <div className="flex items-center gap-1 mb-0.5">
          <span className="text-xs lg:text-sm font-bold text-gray-600">{category.label}</span>
          {isSelected && (
            <svg className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        <p className="text-xs lg:text-sm font-semibold text-gray-900 line-clamp-1 leading-tight mb-1">
          {component.name}
        </p>
        <p className="text-sm lg:text-base font-bold text-blue-600">
          ${component.price.toLocaleString()}
        </p>
      </div>
    </button>
  );
};

const CategorySidebar = ({ selectedCategory, onCategoryChange, onModeChange }) => {
  const { pcBuild } = usePCBuilder();
  
  const getComponent = (buildKey) => {
    const value = pcBuild[buildKey];
    if (Array.isArray(value)) {
      return value.length > 0 ? value[0] : null;
    }
    return value || null;
  };
  
  // Calculate total price
  const totalPrice = Object.values(pcBuild).reduce((sum, value) => {
    if (Array.isArray(value)) {
      return sum + value.reduce((s, item) => s + (item?.price || 0), 0);
    }
    return sum + (value?.price || 0);
  }, 0);
  
  const selectedCount = Object.values(pcBuild).filter(
    v => v && (Array.isArray(v) ? v.length > 0 : true)
  ).length;

  return (
    <aside className="w-64 lg:w-72 xl:w-80 bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 shadow-xl overflow-y-auto">
      <div className="p-3 lg:p-4 xl:p-5 space-y-3 lg:space-y-4">
        {/* Header */}
        <div className="text-center pb-3 lg:pb-4 border-b border-gray-200">
          <div className="inline-flex items-center justify-center w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-3 shadow-lg">
            <svg className="w-7 h-7 lg:w-9 lg:h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-sm lg:text-base font-bold text-gray-900 uppercase tracking-wide">Mi Build</h2>
          <p className="text-xs lg:text-sm text-gray-500 mt-1">{selectedCount} de 6 componentes</p>
        </div>
        
        {/* Component Cards */}
        <div className="space-y-3">
          {CATEGORIES.map((category) => {
            const component = getComponent(category.buildKey);
            const isSelected = selectedCategory === category.key;
            
            return (
              <MiniComponentCard
                key={category.key}
                category={category}
                component={component}
                isSelected={isSelected}
                onClick={() => onCategoryChange(category.key)}
              />
            );
          })}
        </div>
        
        {/* Total Price */}
        <div className="sticky bottom-0 bg-gradient-to-t from-white via-white to-transparent pt-3 lg:pt-4 mt-3 lg:mt-4 border-t border-gray-200">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-4 lg:p-5 shadow-xl">
            <p className="text-xs lg:text-sm font-semibold text-gray-400 uppercase tracking-wide mb-1">
              Total estimado
            </p>
            <p className="text-2xl lg:text-3xl xl:text-4xl font-black text-white">
              ${totalPrice.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default CategorySidebar;
