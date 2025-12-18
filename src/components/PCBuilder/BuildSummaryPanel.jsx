import { usePCBuilder } from '../../context/PCBuilderContext';
import { detectBottleneck } from '../../data/compatibility/performanceTiers';

const BuildSummaryPanel = () => {
  const { pcBuild, removeComponent, totalPrice, clearConfiguration } = usePCBuilder();
  
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
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-gray-900 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Tu Configuración
          </h2>
          {hasComponents && (
            <button
              onClick={clearConfiguration}
              className="text-sm text-red-600 hover:text-red-700 font-black px-4 py-2 rounded-full bg-red-50 hover:bg-red-100 transition-all duration-200 hover:scale-105 border-2 border-red-200"
            >
              🗑️ Limpiar
            </button>
          )}
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
                          ${item.price.toLocaleString()}
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
        
        {/* Total Price */}
        {hasComponents && (
          <>
            <div className="border-t-2 border-gray-200 pt-6 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-xl font-black text-gray-900">Total:</span>
                <span className="text-4xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  ${totalPrice.toLocaleString()}
                </span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="relative w-full px-6 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-black rounded-2xl transition-all duration-300 shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/70 hover:scale-[1.02] active:scale-[0.98] overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span className="text-xl">💾</span>
                  Guardar Configuración
                </span>
              </button>
              <button className="w-full px-6 py-4 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 font-black rounded-2xl transition-all duration-300 border-2 border-gray-300 hover:border-gray-400 hover:scale-[1.02] active:scale-[0.98]">
                <span className="flex items-center justify-center gap-2">
                  <span className="text-xl">📤</span>
                  Compartir
                </span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BuildSummaryPanel;