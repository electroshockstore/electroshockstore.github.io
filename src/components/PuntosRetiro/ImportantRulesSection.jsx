import { useState } from 'react';
import { Shield, ChevronDown, Zap } from 'lucide-react';

const ImportantRulesSection = ({ rules }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleRule = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // Reordenar: Pago INMEDIATO primero (index 1 → 0)
  const reorderedRules = [rules[1], rules[0], rules[2]];

  return (
    <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-3 sm:p-8 md:p-12 border border-white/10 mb-4 sm:mb-12 md:mb-16 overflow-hidden">
      {/* Decorative gradient overlay - Solo desktop */}
      <div className="hidden sm:block absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none" />
      
      <div className="relative">
        {/* Header minimalista */}
        <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-8 md:mb-10">
          <div className="relative">
            <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-50" />
            <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 p-1.5 sm:p-4 rounded-lg sm:rounded-2xl border border-blue-400/30">
              <Shield className="w-4 h-4 sm:w-8 sm:h-8 text-white" strokeWidth={2.5} />
            </div>
          </div>
          <div>
            <h2 className="text-base sm:text-3xl md:text-4xl font-black text-white">Reglas de Compra</h2>
            <p className="text-[10px] sm:text-base text-gray-400 font-medium">Leé antes de coordinar</p>
          </div>
        </div>
        
        {/* MOBILE: Acordeón compacto */}
        <div className="sm:hidden space-y-2">
          {reorderedRules.map((rule, index) => (
            <div key={index} className="relative">
              {/* Botón de acordeón */}
              <button
                onClick={() => toggleRule(index)}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 border ${
                  expandedIndex === index 
                    ? `bg-gradient-to-br ${rule.bgGradient} ${rule.borderColor} border-opacity-60` 
                    : 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-800/70'
                }`}
              >
                <div className="flex items-center gap-2.5 flex-1">
                  {/* Icon compacto */}
                  <div className={`bg-gradient-to-br ${rule.iconBg} p-1.5 rounded-lg border ${rule.borderColor}`}>
                    <rule.icon className="w-4 h-4 text-white" strokeWidth={2.5} />
                  </div>
                  
                  {/* Título compacto */}
                  <div className="text-left flex-1">
                    <h3 className="text-sm font-bold text-white leading-tight">
                      {rule.title}
                    </h3>
                    <div className={`inline-flex px-1.5 py-0.5 bg-gradient-to-r ${rule.gradient} rounded-full mt-0.5`}>
                      <p className="text-[8px] font-bold text-white uppercase tracking-wide">
                        {rule.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Chevron */}
                <ChevronDown 
                  className={`w-4 h-4 text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                    expandedIndex === index ? 'rotate-180' : ''
                  }`}
                  strokeWidth={2.5}
                />
              </button>
              
              {/* Contenido expandible */}
              <div className={`overflow-hidden transition-all duration-300 ${
                expandedIndex === index ? 'max-h-40 mt-2' : 'max-h-0'
              }`}>
                <div className={`p-3 rounded-xl bg-gradient-to-br ${rule.bgGradient} border ${rule.borderColor}`}>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {rule.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* DESKTOP: Grid rediseñado con alturas iguales */}
        <div className="hidden sm:grid gap-6 md:grid-cols-3 auto-rows-fr">
          {reorderedRules.map((rule, index) => {
            const isHighlighted = index === 0; // Pago INMEDIATO
            
            return (
              <div key={index} className="relative group h-full">
                {/* Glow effect más intenso para destacado */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${rule.gradient} rounded-2xl opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-500 ${
                  isHighlighted ? 'opacity-20 group-hover:opacity-40' : ''
                }`} />
                
                <div className={`relative h-full flex flex-col bg-gradient-to-br ${rule.bgGradient} backdrop-blur-sm rounded-2xl p-6 border ${rule.borderColor} overflow-hidden transition-all duration-300 hover:border-opacity-80 ${
                  isHighlighted ? 'border-2 scale-[1.02] shadow-2xl' : ''
                }`}>
                  {/* Badge "IMPORTANTE" solo para destacado */}
                  {isHighlighted && (
                    <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-pulse">
                      <Zap className="w-3 h-3 text-white" strokeWidth={3} />
                      <span className="text-[10px] font-black text-white uppercase tracking-wider">Crítico</span>
                    </div>
                  )}
                  
                  {/* Subtle shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Icon GRANDE - visual primero */}
                  <div className="relative mb-5">
                    <div className="relative inline-flex">
                      <div className={`absolute inset-0 bg-gradient-to-r ${rule.gradient} rounded-2xl blur-lg opacity-50`} />
                      <div className={`relative bg-gradient-to-br ${rule.iconBg} backdrop-blur-sm p-5 rounded-2xl border-2 ${rule.borderColor} ${
                        isHighlighted ? 'scale-110' : ''
                      }`}>
                        <rule.icon className={`text-white ${isHighlighted ? 'w-12 h-12' : 'w-10 h-10'}`} strokeWidth={2.5} />
                      </div>
                    </div>
                  </div>
                  
                  {/* Content - flex-1 para ocupar espacio disponible */}
                  <div className="relative flex-1 flex flex-col">
                    {/* Título grande y claro */}
                    <h3 className={`font-black text-white leading-tight mb-3 ${
                      isHighlighted ? 'text-3xl' : 'text-2xl'
                    }`}>
                      {rule.title}
                    </h3>
                    
                    {/* Badge con gradiente */}
                    <div className={`inline-flex self-start px-3 py-1.5 bg-gradient-to-r ${rule.gradient} rounded-full mb-4 ${
                      isHighlighted ? 'animate-pulse' : ''
                    }`}>
                      <p className="text-xs font-black text-white uppercase tracking-wider">
                        {rule.subtitle}
                      </p>
                    </div>
                    
                    {/* Descripción compacta - al final */}
                    <p className={`text-gray-300 leading-relaxed mt-auto ${
                      isHighlighted ? 'text-base font-medium' : 'text-sm'
                    }`}>
                      {rule.description}
                    </p>
                  </div>

                  {/* Decorative corner accent */}
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${rule.gradient} opacity-10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ImportantRulesSection;
