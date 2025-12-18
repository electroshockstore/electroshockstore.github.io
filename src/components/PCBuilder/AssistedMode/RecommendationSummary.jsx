import { usePCBuilder } from '../../../context/PCBuilderContext';
import CompactProductCard from '../../PCBuilder/CompactProductCard';

const RecommendationSummary = ({ recommendation, onAdjustManually, onStartOver }) => {
  const { totalPrice } = usePCBuilder();
  
  const components = [
    { key: 'cpu', label: 'Procesador', value: recommendation.cpu },
    { key: 'motherboard', label: 'Motherboard', value: recommendation.motherboard },
    { key: 'ram', label: 'Memoria RAM', value: recommendation.ram?.[0] },
    { key: 'storage', label: 'Almacenamiento', value: recommendation.storage?.[0] },
    { key: 'psu', label: 'Fuente de Poder', value: recommendation.psu },
    { key: 'cooling', label: 'Refrigeración', value: recommendation.cooling }
  ].filter(comp => comp.value);
  
  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200 mb-6">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Tu PC Recomendada
          </h2>
          <p className="text-gray-600">
            Componentes seleccionados según tus preferencias
          </p>
        </div>
      </div>
      
      {/* Components Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
        {components.map(({ key, label, value }) => (
          <div key={key} className="flex flex-col">
            <div className="text-xs uppercase tracking-wide text-gray-500 font-bold mb-2 px-1">
              {label}
            </div>
            <CompactProductCard 
              product={value}
              compatibilityResult={{ status: 'green', reasons: ['Compatible con tu configuración'] }}
              isSelected={false}
              onClick={() => {}}
            />
          </div>
        ))}
      </div>
      
      {/* Summary Panel */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200 mb-6">
        <div className="grid sm:grid-cols-2 gap-6">
          {/* Total Price */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
            <div className="text-sm text-gray-600 font-semibold mb-1 uppercase tracking-wide">
              Precio Total
            </div>
            <div className="text-4xl font-bold text-blue-600 mb-1">
              ${totalPrice.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500">
              IVA incluido
            </div>
          </div>
          
          {/* Compatibility Status */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <div className="font-bold text-green-800 text-lg mb-1">
                  100% Compatible
                </div>
                <div className="text-sm text-green-700">
                  Todos los componentes son compatibles entre sí
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <div className="grid sm:grid-cols-2 gap-4">
          <button
            onClick={onAdjustManually}
            className="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Ajustar Manualmente
          </button>
          <button
            onClick={onStartOver}
            className="px-6 py-4 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-xl transition-all duration-200 border-2 border-gray-300 hover:border-gray-400"
          >
            Empezar de Nuevo
          </button>
        </div>
        
        <div className="mt-4 text-center text-sm text-gray-500">
          Puedes personalizar cualquier componente en el modo manual
        </div>
      </div>
    </div>
  );
};

export default RecommendationSummary;
