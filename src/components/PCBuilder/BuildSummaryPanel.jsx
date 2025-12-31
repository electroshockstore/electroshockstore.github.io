import { usePCBuilder } from '../../context/PCBuilderContext';
import { detectBottleneck } from '../../data/compatibility/performanceTiers';

const BuildSummaryPanel = () => {
  const { pcBuild, removeComponent, totalPrice, clearConfiguration, totalPowerConsumption } = usePCBuilder();
  
  // Check for bottlenecks
  const bottleneck = pcBuild.cpu && pcBuild.gpu 
    ? detectBottleneck(pcBuild.cpu, pcBuild.gpu)
    : null;
  
  const componentCategories = [
    { key: 'cpu', label: 'CPU', icon: '🖥️' },
    { key: 'motherboard', label: 'Motherboard', icon: '🔌' },
    { key: 'ram', label: 'RAM', icon: '💾', isArray: true },
    { key: 'gpu', label: 'GPU', icon: '🎮' },
    { key: 'psu', label: 'PSU', icon: '⚡' },
    { key: 'storage', label: 'Storage', icon: '💿', isArray: true },
    { key: 'case', label: 'Case', icon: '📦' },
    { key: 'cooling', label: 'Cooler', icon: '❄️' }
  ];
  
  const hasComponents = Object.values(pcBuild).some(value => 
    Array.isArray(value) ? value.length > 0 : value !== null
  );
  
  return (
    <div className="bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-3xl shadow-2xl p-6 sticky top-24 border-2 border-gray-200 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500 to-purple-600 opacity-5 blur-3xl rounded-full" />
      
      <div className="relative z-10">
        {/* Modern Header with Voltage */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-bold text-gray-900">Mi Build</h2>
            {hasComponents && (
              <button
                onClick={clearConfiguration}
                className="text-xs text-red-600 hover:text-red-700 font-semibold px-3 py-1.5 rounded-lg hover:bg-red-50 transition-all"
              >
                Limpiar
              </button>
            )}
          </div>
          
          {/* Voltage Display - Prominent */}
          <div className="bg-white rounded-xl p-4 border-2 border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-xl">⚡</span>
              </div>
              <div>
                <div className="text-xs text-gray-500 font-medium">Voltaje Total</div>
                <div className="text-2xl font-black text-gray-900">
                  {totalPowerConsumption || 0}W
                </div>
              </div>
            </div>
            {hasComponents && (
              <div className="text-right">
                <div className="text-xs text-gray-500 font-medium">Componentes</div>
                <div className="text-lg font-bold text-gray-700">
                  {Object.values(pcBuild).reduce((count, value) => {
                    if (Array.isArray(value)) return count + value.length;
                    return value ? count + 1 : count;
                  }, 0)}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Bottleneck Warning */}
        {bottleneck && bottleneck.hasBottleneck && (
          <div className="mb-6 p-4 bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-300 rounded-2xl shadow-lg">
            <div className="flex items-start gap-3">
              <span className="text-yellow-600 text-2xl">⚠️</span>
              <div className="flex-1">
                <p className="text-sm text-yellow-900 font-black">
                  {bottleneck.message}
                </p>
                {bottleneck.suggestion && (
                  <p className="text-xs text-yellow-800 font-bold mt-2">
                    {bottleneck.suggestion}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Components List */}
        <div className="space-y-3 mb-6 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {!hasComponents ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl animate-bounce">
                <span className="text-5xl">🖥️</span>
              </div>
              <p className="text-sm font-bold text-gray-500">
                Selecciona componentes<br/>para armar tu PC
              </p>
            </div>
          ) : (
            componentCategories.map(({ key, label, icon, isArray }) => {
              const value = pcBuild[key];
              if (!value || (isArray && value.length === 0)) return null;
              
              const items = isArray ? value : [value];
              
              return items.map((item, idx) => (
                <div 
                  key={`${key}-${idx}`} 
                  className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl p-4 hover:shadow-xl transition-all duration-300 border-2 border-gray-200 hover:border-blue-300 hover:scale-[1.02]"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl">{icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] text-gray-500 uppercase font-black tracking-wider mb-1">
                        {label}
                      </div>
                      <div className="text-sm font-black text-gray-900 truncate mb-1">
                        {item.name}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-base font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                          ${item.price.toLocaleString('es-AR')}
                        </span>
                        {item.stock === 0 && (
                          <span className="text-xs text-red-600 font-black bg-red-50 px-2 py-1 rounded-full border border-red-200">
                            Sin stock
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => removeComponent(key, item.id)}
                      className="text-gray-400 hover:text-red-600 transition-all duration-200 hover:scale-125 p-2 hover:bg-red-50 rounded-full"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ));
            })
          )}
        </div>
        
        {/* Total Price at Bottom */}
        {hasComponents && (
          <div className="space-y-3">
            {/* Price Card */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl p-5 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="text-white">
                  <div className="text-sm font-medium opacity-90 mb-1">Total</div>
                  <div className="text-3xl font-black">
                    ${totalPrice.toLocaleString('es-AR')}
                  </div>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">💰</span>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <button className="w-full px-5 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]">
              Guardar Configuración
            </button>
            <button className="w-full px-5 py-3 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-xl transition-all border-2 border-gray-200 hover:border-gray-300">
              Compartir
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuildSummaryPanel;