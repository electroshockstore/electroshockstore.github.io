const SpecificationsSection = ({ specifications }) => {
  if (!specifications) return null;

  const formatLabel = (key) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  };

  const specsArray = Object.entries(specifications).map(([key, value]) => ({
    key,
    value,
    label: formatLabel(key)
  }));

  const renderValue = (value) => {
    if (typeof value === 'object' && value !== null) {
      return (
        <div className="space-y-1">
          {Object.entries(value).map(([subKey, subValue]) => (
            <div key={subKey} className="text-xs sm:text-sm text-gray-600">
              <span className="font-medium">{subKey}:</span> <span className="font-bold text-gray-900">{subValue}</span>
            </div>
          ))}
        </div>
      );
    }
    return value;
  };

  return (
    <div className="space-y-4">
      {/* Header simple */}
      <div className="flex items-center gap-3 pb-3 border-b-2 border-gray-200">
        <div className="w-2 h-8 bg-blue-600 rounded-full" />
        <div>
          <h3 className="text-lg sm:text-xl font-black text-gray-900">Detalles Técnicos</h3>
          <p className="text-xs sm:text-sm text-gray-500">Especificaciones del producto</p>
        </div>
      </div>

      {/* Grid limpio tipo tabla mejorada */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="divide-y divide-gray-100">
          {specsArray.map((spec, index) => (
            <div
              key={spec.key}
              className={`grid grid-cols-2 gap-4 p-4 sm:p-5 ${
                index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
              }`}
            >
              {/* Label */}
              <div className="flex items-center">
                <span className="text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wide">
                  {spec.label}
                </span>
              </div>

              {/* Value */}
              <div className="flex items-center justify-end text-right">
                <span className="text-sm sm:text-base font-black text-gray-900">
                  {renderValue(spec.value)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecificationsSection;
