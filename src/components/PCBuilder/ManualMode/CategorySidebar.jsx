import { usePCBuilder } from '../../../context/PCBuilderContext';
import { Zap, Check, Plus, X } from 'lucide-react';

const CATEGORIES = [
  { key: 'Procesadores', label: 'Procesador', icon: '/images/icons/cpu_icon_tiny.webp', buildKey: 'cpu' },
  { key: 'Motherboards', label: 'Motherboard', icon: '/images/icons/motherboard_icon_tiny.webp', buildKey: 'motherboard' },
  { key: 'Memorias RAM', label: 'Memoria RAM', icon: '/images/icons/ram_icon_tiny.webp', buildKey: 'ram', allowMultiple: true, maxCount: 2 },
  { key: 'Placas de Video', label: 'Placa de Video', icon: '/images/icons/gpu_icon_tiny.webp', buildKey: 'gpu' },
  { key: 'Refrigeración', label: 'Refrigeracion', icon: '/images/icons/refrigeracion_icon_tiny.webp', buildKey: 'cooling' },
  { key: 'Almacenamiento', label: 'Almacenamiento', icon: '/images/icons/storage_icon_tiny.webp', buildKey: 'storage' },
  { key: 'Fuentes', label: 'Fuente', icon: '/images/icons/psu_icon_tiny.webp', buildKey: 'psu' },
  { key: 'Monitores', label: 'Monitor', icon: '/images/icons/monitor_icon_tiny.webp', buildKey: 'monitor' }
];

const MiniComponentCard = ({ category, component, isSelected, onClick, onRemove }) => {
  const hasComponent = !!component;
  const isMultiple = Array.isArray(component) && component.length > 0;
  const displayComponent = isMultiple ? component[0] : component;
  const count = isMultiple ? component.length : 0;
  
  if (!hasComponent && !isMultiple) {
    return (
      <button
        onClick={onClick}
        className={`
          w-full p-3 rounded-xl border-2 border-dashed transition-all duration-200 flex items-center gap-3
          ${isSelected 
            ? 'border-blue-500 bg-blue-50 shadow-sm' 
            : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
          }
        `}
      >
        <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-100">
          <Plus className="w-5 h-5 text-gray-400" />
        </div>
        <div className="flex-1 text-left min-w-0">
          <p className="text-sm font-bold text-gray-900 mb-0.5">{category.label}</p>
          <p className="text-xs text-gray-400">
            {category.allowMultiple ? `Agregar (máx ${category.maxCount})` : 'Agregar componente'}
          </p>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`
        w-full p-3 rounded-xl border-2 transition-all duration-200 group flex items-center gap-3 relative
        ${isSelected 
          ? 'border-blue-500 bg-blue-50 shadow-md' 
          : 'border-green-500 bg-green-50 hover:border-green-600 hover:shadow-sm'
        }
      `}
    >
      {/* Badge de cantidad para múltiples */}
      {isMultiple && count > 1 && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white z-10">
          <span className="text-xs font-black text-white">{count}</span>
        </div>
      )}
      
      <div className="w-12 h-12 bg-white rounded-lg p-1.5 flex items-center justify-center flex-shrink-0 border border-green-200">
        <img 
          src={displayComponent.images?.[0] || displayComponent.image} 
          alt={displayComponent.name}
          className="max-w-full max-h-full object-contain"
        />
      </div>
      
      <div className="flex-1 text-left min-w-0">
        <div className="flex items-center gap-1.5 mb-1">
          <span className={`text-xs font-bold uppercase tracking-wide ${isSelected ? 'text-blue-600' : 'text-green-600'}`}>
            {category.label}
          </span>
          <Check className={`w-3.5 h-3.5 ${isSelected ? 'text-blue-600' : 'text-green-600'}`} strokeWidth={3} />
        </div>
        <p className="text-sm font-semibold text-gray-900 truncate mb-1">
          {displayComponent.name}
          {isMultiple && count > 1 && <span className="text-purple-600"> x{count}</span>}
        </p>
        <div className="flex items-center gap-2">
          <p className="text-base font-black text-gray-900">
            ${(displayComponent.price * (isMultiple ? count : 1)).toLocaleString('es-AR')}
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="ml-auto p-1 hover:bg-red-100 rounded-md transition-colors group/remove"
            title="Eliminar componente"
          >
            <X className="w-4 h-4 text-gray-400 group-hover/remove:text-red-600" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </button>
  );
};

const CategorySidebar = ({ selectedCategory, onCategoryChange }) => {
  const { pcBuild, totalWattage, recommendedWattage, removeComponent } = usePCBuilder();
  
  const getComponent = (buildKey) => {
    const value = pcBuild[buildKey];
    // Para RAM, devolver el array completo si tiene elementos
    if (buildKey === 'ram' && Array.isArray(value) && value.length > 0) {
      return value;
    }
    // Para otros componentes, devolver el primer elemento del array o el valor directo
    return Array.isArray(value) ? (value.length > 0 ? value[0] : null) : (value || null);
  };
  
  const totalPrice = Object.values(pcBuild).reduce((sum, value) => {
    if (Array.isArray(value)) return sum + value.reduce((s, item) => s + (item?.price || 0), 0);
    return sum + (value?.price || 0);
  }, 0);
  
  const selectedCount = Object.values(pcBuild).filter(
    v => v && (Array.isArray(v) ? v.length > 0 : true)
  ).length;
  
  const maxWattage = pcBuild.psu?.wattage || recommendedWattage || 500;
  const percentage = Math.min((totalWattage / maxWattage) * 100, 100);
  
  const getColorClass = () => {
    if (percentage < 60) return 'bg-green-500';
    if (percentage < 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  const getTextColorClass = () => {
    if (percentage < 60) return 'text-green-600';
    if (percentage < 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <aside className="w-[22vw] min-w-[18rem] max-w-[24rem] bg-gray-50 border-r border-gray-200 flex flex-col h-screen sticky top-0">
      
      {/* Header compacto y moderno */}
      <div className="flex-shrink-0 p-4 bg-white border-b border-gray-200">
        {/* Título y progreso en una línea */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-base font-black text-gray-900">Mi Combo</h2>
              <p className="text-[10px] text-gray-500 font-semibold">{selectedCount} de 8</p>
            </div>
          </div>
          
          {/* Barra de progreso compacta */}
          <div className="flex items-center gap-2">
            <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                style={{ width: `${(selectedCount/8)*100}%` }}
              />
            </div>
            <span className="text-xs font-black text-blue-600 min-w-[2rem] text-right">{Math.round((selectedCount/8)*100)}%</span>
          </div>
        </div>
        
        {/* Stats en dos columnas */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-2.5 border border-amber-200">
            <div className="flex items-center gap-1.5 mb-1">
              <div className={`p-1 rounded ${percentage < 60 ? 'bg-green-100' : percentage < 80 ? 'bg-yellow-100' : 'bg-red-100'}`}>
                <Zap className={`w-3 h-3 ${getTextColorClass()}`} strokeWidth={2.5} fill="currentColor" />
              </div>
              <span className="text-[10px] font-bold text-gray-600 uppercase">Consumo</span>
            </div>
            <p className={`text-2xl font-black ${getTextColorClass()}`}>
              {totalWattage}W
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-2.5 border border-blue-200">
            <div className="flex items-center gap-1.5 mb-1">
              <div className="p-1 rounded bg-blue-100">
                <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-[10px] font-bold text-gray-600 uppercase">Total</span>
            </div>
            <p className="text-2xl font-black text-gray-900">
              ${totalPrice.toLocaleString('es-AR')}
            </p>
          </div>
        </div>
        
        {/* Botón WhatsApp */}
        <button
          onClick={() => {
            const components = Object.entries(pcBuild)
              .filter(([_, value]) => value && (Array.isArray(value) ? value.length > 0 : true))
              .map(([, value]) => {
                const item = Array.isArray(value) ? value[0] : value;
                return `• ${item.name}`;
              })
              .join('%0A');
            
            const message = `¡Hola! Quiero este combo de PC:%0A%0A${components}%0A%0ATotal: $${totalPrice.toLocaleString('es-AR')}%0A%0A¿Está disponible?`;
            
            window.open(`https://wa.me/5491125718382?text=${message}`, '_blank');
          }}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-3 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 active:scale-95 font-bold text-sm"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.785"/>
          </svg>
          <span>Quiero este Combo</span>
        </button>
      </div>
      
      {/* Lista de componentes */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {CATEGORIES.map((category) => (
          <MiniComponentCard
            key={category.key}
            category={category}
            component={getComponent(category.buildKey)}
            isSelected={selectedCategory === category.key}
            onClick={() => onCategoryChange(category.key)}
            onRemove={() => removeComponent(category.key)}
          />
        ))}
      </div>
      
      {/* Footer con total - diseño limpio */}
      <div className="flex-shrink-0 p-4 bg-gradient-to-br from-gray-900 to-gray-800 border-t border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Total Inversión</p>
            <p className="text-2xl font-black text-white">
              ${totalPrice.toLocaleString('es-AR')}
            </p>
          </div>
          <div className="text-right">
            <div className="inline-flex items-center gap-1.5 bg-white/10 rounded-lg px-3 py-2 backdrop-blur-sm">
              <div className={`w-2 h-2 rounded-full ${getColorClass()} animate-pulse`} />
              <span className="text-sm font-bold text-white">{selectedCount}/8</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default CategorySidebar;