// Sección de especificaciones técnicas en grid de 3 columnas
import { Zap } from 'lucide-react';

const SpecificationsSection = ({ specifications }) => {
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

  // Dividir en 3 columnas balanceadas
  const itemsPerColumn = Math.ceil(specsArray.length / 3);
  const columns = [
    specsArray.slice(0, itemsPerColumn),
    specsArray.slice(itemsPerColumn, itemsPerColumn * 2),
    specsArray.slice(itemsPerColumn * 2)
  ];

  const SpecColumn = ({ specs, columnIndex }) => {
    if (specs.length === 0) return null;
    
    const renderValue = (value) => {
      // Si es un objeto, convertirlo a lista
      if (typeof value === 'object' && value !== null) {
        return (
          <div className="space-y-1">
            {Object.entries(value).map(([subKey, subValue]) => (
              <div key={subKey} className="text-xs">
                <span className="text-gray-600">{subKey}:</span>{' '}
                <span className="font-semibold text-gray-900">{subValue}</span>
              </div>
            ))}
          </div>
        );
      }
      // Si es string o número, renderizar directamente
      return value;
    };
    
    return (
      <div className="space-y-3">
        {specs.map(({ key, value, label }) => (
          <div key={key} className="space-y-1">
            <dt className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              {label}
            </dt>
            <dd className="text-sm font-bold text-gray-900">{renderValue(value)}</dd>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Zap className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-bold text-gray-900">Especificaciones Técnicas</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((columnSpecs, index) => (
          <SpecColumn key={index} specs={columnSpecs} columnIndex={index} />
        ))}
      </div>
    </div>
  );
};

export default SpecificationsSection;
