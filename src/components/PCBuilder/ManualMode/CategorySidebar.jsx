import { usePCBuilder } from '../../../context/PCBuilderContext';

const CATEGORIES = [
  { key: 'Procesadores', label: 'Procesador', icon: '/images/icons/cpu_icon_tiny.webp', buildKey: 'cpu' },
  { key: 'Motherboards', label: 'Motherboard', icon: '/images/icons/motherboard_icon_tiny.webp', buildKey: 'motherboard' },
  { key: 'Memorias RAM', label: 'Memoria RAM', icon: '/images/icons/ram_icon_tiny.webp', buildKey: 'ram' },
  { key: 'Refrigeración', label: 'Refrigeracion', icon: '/images/icons/refrigeracion_icon_tiny.webp', buildKey: 'cooling' },
  { key: 'Almacenamiento', label: 'Almacenamiento', icon: '/images/icons/storage_icon_tiny.webp', buildKey: 'storage' },
  { key: 'Fuentes', label: 'Fuente', icon: '/images/icons/psu_icon_tiny.webp', buildKey: 'psu' }
];

const MiniComponentCard = ({ category, component, isSelected, onClick }) => {
  // Estado base para categorías vacías
  if (!component) {
    return (
      <button
        onClick={onClick}
        className={`
          w-full p-[0.75rem] rounded-[0.75rem] border-2 border-dashed transition-all flex items-center gap-[0.75rem]
          ${isSelected 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'
          }
        `}
      >
        <div className="w-[2.5rem] h-[2.5rem] bg-white rounded-[0.5rem] flex items-center justify-center flex-shrink-0 p-[0.25rem]">
          <img 
            src={category.icon} 
            alt={category.label}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex-1 text-left min-w-0">
          <p className="text-[0.75rem] font-bold text-gray-600 truncate leading-none mb-[0.2rem]">{category.label}</p>
          <p className="text-[0.7rem] text-gray-400">Sin seleccionar</p>
        </div>
      </button>
    );
  }

  // Estado con componente seleccionado
  return (
    <button
      onClick={onClick}
      className={`
        w-full p-[0.75rem] rounded-[0.75rem] border-2 transition-all group flex items-center gap-[0.75rem]
        ${isSelected 
          ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-md scale-[1.02]' 
          : 'border-green-200 bg-white hover:border-green-400 hover:shadow-sm'
        }
      `}
    >
      <div className="w-[3rem] h-[3rem] bg-white rounded-[0.5rem] p-[0.2rem] flex items-center justify-center flex-shrink-0 overflow-hidden shadow-sm">
        <img 
          src={component.images?.[0] || component.image} 
          alt={component.name}
          className="max-w-full max-h-full object-contain"
        />
      </div>
      
      <div className="flex-1 text-left min-w-0">
        <div className="flex items-center gap-[0.25rem] mb-[0.1rem]">
          <span className="text-[0.7rem] font-bold text-blue-600 uppercase tracking-wider truncate">{category.label}</span>
          {isSelected && (
            <svg className="w-[0.75rem] h-[0.75rem] text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        <p className="text-[0.85rem] font-semibold text-gray-900 line-clamp-1 leading-tight mb-[0.1rem]">
          {component.name}
        </p>
        <p className="text-[0.9rem] font-black text-gray-800">
          ${component.price.toLocaleString()}
        </p>
      </div>
    </button>
  );
};

const CategorySidebar = ({ selectedCategory, onCategoryChange }) => {
  const { pcBuild } = usePCBuilder();
  
  const getComponent = (buildKey) => {
    const value = pcBuild[buildKey];
    return Array.isArray(value) ? (value.length > 0 ? value[0] : null) : (value || null);
  };
  
  const totalPrice = Object.values(pcBuild).reduce((sum, value) => {
    if (Array.isArray(value)) return sum + value.reduce((s, item) => s + (item?.price || 0), 0);
    return sum + (value?.price || 0);
  }, 0);
  
  const selectedCount = Object.values(pcBuild).filter(
    v => v && (Array.isArray(v) ? v.length > 0 : true)
  ).length;

  return (
    /* Ancho relativo al viewport para que no se vea pequeño en 22" */
    <aside className="w-[22vw] min-w-[16rem] max-w-[22rem] bg-white border-r border-gray-200 shadow-2xl flex flex-col h-screen sticky top-0">
      
      {/* Header más espacioso */}
      <div className="flex-shrink-0 text-center p-[1.5rem] border-b border-gray-100 bg-gray-50/50">
        <div className="inline-flex items-center justify-center w-[3.5rem] h-[3.5rem] bg-blue-600 rounded-[1rem] mb-[0.75rem] shadow-lg shadow-blue-200">
          <svg className="w-[1.75rem] h-[1.75rem] text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-[1rem] font-black text-gray-900 uppercase tracking-widest">Mi Build</h2>
        <div className="mt-[0.25rem] inline-block px-[0.75rem] py-[0.1rem] bg-blue-100 text-blue-700 rounded-full text-[0.75rem] font-bold">
          {selectedCount} de 6 componentes
        </div>
      </div>
      
      {/* Lista de tarjetas con scroll suave */}
      <div className="flex-1 overflow-y-auto p-[1rem] space-y-[0.75rem] scrollbar-hide">
        {CATEGORIES.map((category) => (
          <MiniComponentCard
            key={category.key}
            category={category}
            component={getComponent(category.buildKey)}
            isSelected={selectedCategory === category.key}
            onClick={() => onCategoryChange(category.key)}
          />
        ))}
      </div>
      
      {/* Total con mayor jerarquía visual */}
      <div className="flex-shrink-0 p-[1.25rem] bg-white border-t border-gray-100">
        <div className="bg-gray-900 rounded-[1rem] p-[1.25rem] shadow-xl">
          <p className="text-[0.7rem] font-bold text-gray-400 uppercase tracking-[0.15em] mb-[0.25rem]">
            Inversión Total
          </p>
          <p className="text-[1.5rem] font-black text-white leading-none">
            ${totalPrice.toLocaleString()}
          </p>
        </div>
      </div>
    </aside>
  );
};

export default CategorySidebar;