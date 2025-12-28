import { useState } from 'react';
import { Zap } from 'lucide-react';

const SpecsSection = ({ specifications }) => {
  const [hoveredItem, setHoveredItem] = useState(null);

  if (!specifications) return null;

  const formatLabel = (key) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  };

  // Convertir especificaciones a array
  const specsArray = Object.entries(specifications).map(([key, value]) => ({
    key,
    value,
    label: formatLabel(key)
  }));

  // Dividir en 2 columnas para layout horizontal
  const itemsPerColumn = Math.ceil(specsArray.length / 2);
  const leftColumn = specsArray.slice(0, itemsPerColumn);
  const rightColumn = specsArray.slice(itemsPerColumn);

  const renderValue = (value) => {
    // Si es un objeto, convertirlo a lista
    if (typeof value === 'object' && value !== null) {
      return (
        <div className="space-y-1">
          {Object.entries(value).map(([subKey, subValue]) => (
            <div key={subKey} className="text-xs">
              <span className="text-gray-500">{subKey}:</span>{' '}
              <span className="font-semibold text-gray-900">{subValue}</span>
            </div>
          ))}
        </div>
      );
    }
    // Si es string o número, renderizar directamente
    return <span className="font-semibold text-gray-900">{value}</span>;
  };

  const SpecItem = ({ spec, index, isLeft }) => {
    const { key, value, label } = spec;
    const itemKey = `${isLeft ? 'left' : 'right'}-${index}`;
    const isHovered = hoveredItem === itemKey;
    
    return (
      <div 
        className={`group relative p-4 rounded-lg transition-all duration-200 cursor-pointer border
          ${isHovered 
            ? 'bg-gray-50 shadow-md border-gray-300 scale-[1.01]' 
            : 'bg-white border-gray-200 hover:border-gray-300'
          }`}
        onMouseEnter={() => setHoveredItem(itemKey)}
        onMouseLeave={() => setHoveredItem(null)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className={`w-1.5 h-6 rounded-full transition-all duration-200 ${
              isHovered 
                ? 'bg-gray-800' 
                : 'bg-gray-300'
            }`} />
            <dt className="text-sm font-medium text-gray-700 flex-1">
              {label}
            </dt>
          </div>
          <dd className="text-sm ml-4 text-right">
            {renderValue(value)}
          </dd>
        </div>
      </div>
    );
  };

  const SpecColumn = ({ specs, title, isLeft }) => {
    if (specs.length === 0) return null;
    
    return (
      <div className="space-y-4">
        {/* Minimalist header */}
        <div className="border-b border-gray-200 pb-3">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isLeft ? 'bg-gray-800' : 'bg-gray-600'}`} />
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <span className="text-xs text-gray-500 ml-auto">{specs.length}</span>
          </div>
        </div>
        
        {/* Specs list */}
        <div className="space-y-2">
          {specs.map((spec, index) => (
            <SpecItem 
              key={spec.key} 
              spec={spec} 
              index={index}
              isLeft={isLeft}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 shadow-lg overflow-hidden">
      <div className="p-6">
        {/* Minimalist header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
            <Zap className="h-4 w-4 text-gray-700" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Detalles Técnicos</h2>
            <p className="text-gray-600 text-sm">Especificaciones del producto</p>
          </div>
        </div>

        {/* Content - Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SpecColumn 
            specs={leftColumn} 
            title="Características Principales" 
            isLeft={true}
          />
          <SpecColumn 
            specs={rightColumn} 
            title="Información Adicional" 
            isLeft={false}
          />
        </div>
      </div>
    </div>
  );
};

export default SpecsSection;