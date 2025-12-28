import { useState } from 'react';
import { Shield, ChevronDown, ChevronUp } from 'lucide-react';
import RuleCard from './RuleCard';

const ImportantRulesSection = ({ rules }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-12 border border-white/10 mb-6 sm:mb-12 md:mb-16 overflow-hidden">
      {/* Decorative gradient overlay - Solo desktop */}
      <div className="hidden sm:block absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none" />
      
      <div className="relative">
        {/* Header minimalista */}
        <div className="flex items-center justify-between gap-3 mb-4 sm:mb-10 md:mb-12">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative">
              <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-50" />
              <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 p-2 sm:p-4 rounded-xl sm:rounded-2xl border border-blue-400/30">
                <Shield className="w-5 h-5 sm:w-8 sm:h-8 text-white" strokeWidth={2.5} />
              </div>
            </div>
            <div>
              <h2 className="text-lg sm:text-3xl md:text-4xl font-black text-white">Condiciones Importantes</h2>
              <p className="text-xs sm:text-base text-gray-400 font-medium hidden sm:block">Leé antes de coordinar tu retiro</p>
            </div>
          </div>
          
          {/* Botón expandir/colapsar - Solo mobile */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="sm:hidden flex items-center justify-center w-10 h-10 bg-blue-600 rounded-xl text-white transition-transform duration-300"
          >
            {isExpanded ? (
              <ChevronUp className="w-5 h-5" strokeWidth={2.5} />
            ) : (
              <ChevronDown className="w-5 h-5" strokeWidth={2.5} />
            )}
          </button>
        </div>
        
        {/* Grid de reglas - Colapsable en mobile */}
        <div className={`grid gap-3 sm:gap-5 md:gap-6 md:grid-cols-3 transition-all duration-300 ${
          isExpanded ? 'block' : 'hidden sm:grid'
        }`}>
          {rules.map((rule, index) => (
            <RuleCard key={index} rule={rule} index={index} />
          ))}
        </div>
        
        {/* Indicador de contenido colapsado - Solo mobile */}
        {!isExpanded && (
          <div className="sm:hidden text-center">
            <p className="text-sm text-gray-400">Toca para ver las {rules.length} condiciones</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImportantRulesSection;
