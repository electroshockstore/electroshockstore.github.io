import { Zap } from 'lucide-react';
import { usePCBuilder } from '../../context/PCBuilderContext';

const PowerConsumptionBar = () => {
  const { totalWattage, recommendedWattage, pcBuild } = usePCBuilder();
  
  // Calcular porcentaje para la barra visual
  const maxWattage = pcBuild.psu?.compatibility?.capacidad_watts || recommendedWattage || 500;
  const percentage = Math.min((totalWattage / maxWattage) * 100, 100);
  
  // Determinar color según el consumo
  const getColorClass = () => {
    if (percentage < 60) return 'from-green-500 via-emerald-500 to-green-600';
    if (percentage < 80) return 'from-yellow-500 via-orange-400 to-orange-500';
    return 'from-orange-500 via-red-500 to-red-600';
  };
  
  const getTextColorClass = () => {
    if (percentage < 60) return 'text-green-400';
    if (percentage < 80) return 'text-yellow-400';
    return 'text-red-400';
  };
  
  const getBgGlowClass = () => {
    if (percentage < 60) return 'shadow-green-500/20';
    if (percentage < 80) return 'shadow-yellow-500/20';
    return 'shadow-red-500/20';
  };

  return (
    <div className={`bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-900/95 backdrop-blur-xl rounded-2xl p-4 border border-white/10 shadow-2xl ${getBgGlowClass()} mb-4`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl bg-gradient-to-br ${getColorClass()} shadow-lg`}>
            <Zap className="w-5 h-5 text-white drop-shadow-lg" strokeWidth={2.5} fill="currentColor" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-wide">Consumo</h3>
            <p className="text-[10px] text-gray-400">Con margen de seguridad</p>
          </div>
        </div>
        
        <div className="text-right">
          <p className={`text-2xl font-black ${getTextColorClass()} drop-shadow-lg`}>
            {totalWattage}W
          </p>
          <p className="text-xs text-gray-400">
            Min: <span className="font-semibold text-gray-300">{recommendedWattage}W</span>
          </p>
        </div>
      </div>
      
      {/* Barra de progreso mejorada */}
      <div className="relative w-full h-3 bg-gray-700/50 rounded-full overflow-hidden shadow-inner">
        <div 
          className={`absolute inset-y-0 left-0 bg-gradient-to-r ${getColorClass()} transition-all duration-700 ease-out rounded-full shadow-lg`}
          style={{ width: `${percentage}%` }}
        >
          {/* Efecto de brillo animado */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" 
               style={{ 
                 backgroundSize: '200% 100%',
                 animation: 'shimmer 2s infinite'
               }} 
          />
        </div>
        
        {/* Marcador de 80% (zona de advertencia) */}
        <div className="absolute top-0 bottom-0 left-[80%] w-0.5 bg-white/30" />
      </div>
      
      {/* Indicador de fuente seleccionada */}
      {pcBuild.psu && (
        <div className="mt-3 flex items-center justify-between text-xs bg-gray-800/50 rounded-lg px-3 py-2 border border-gray-700/50">
          <span className="text-gray-400">Fuente seleccionada:</span>
          <span className={`font-bold flex items-center gap-1 ${
            pcBuild.psu.compatibility?.capacidad_watts >= recommendedWattage ? 'text-green-400' : 'text-red-400'
          }`}>
            {pcBuild.psu.compatibility?.capacidad_watts}W 
            <span className="text-base">
              {pcBuild.psu.compatibility?.capacidad_watts >= recommendedWattage ? '✓' : '⚠️'}
            </span>
          </span>
        </div>
      )}
      
      {/* Mensaje de estado */}
      {percentage >= 80 && (
        <div className="mt-2 text-xs text-center">
          <span className={`${percentage >= 100 ? 'text-red-400' : 'text-yellow-400'} font-semibold`}>
            {percentage >= 100 ? '⚠️ Fuente insuficiente' : '⚠️ Consumo alto, considere una fuente mayor'}
          </span>
        </div>
      )}
    </div>
  );
};

export default PowerConsumptionBar;
