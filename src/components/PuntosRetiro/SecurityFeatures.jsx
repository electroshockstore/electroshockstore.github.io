import { memo, useState } from 'react';
import { Shield, ChevronDown } from 'lucide-react';

const SecurityFeatures = memo(({ security }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="security-block-premium relative overflow-hidden backdrop-blur-xl">
      {/* Header clickeable */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3.5 transition-all duration-[350ms] cubic-bezier-smooth hover:bg-white/[0.02]"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#22F5C7]/10 lg:bg-[#0e0e0e] rounded-xl lg:rounded-none flex items-center justify-center border border-[#22F5C7]/30 lg:border-[#0e0e0e] shadow-[0_0_20px_rgba(34,245,199,0.15)] lg:shadow-[3px_3px_0_0_rgba(14,14,14,0.3)]">
            <Shield className="w-4.5 h-4.5 text-[#22F5C7] lg:text-[#c8f519]" strokeWidth={2.5} />
          </div>
          <h4 className="landing-mono text-sm font-extrabold text-white lg:text-[#0e0e0e] tracking-tight uppercase">Seguridad verificada</h4>
        </div>
        
        <ChevronDown 
          className={`w-5 h-5 text-[#22F5C7] lg:text-[#0e0e0e] transition-transform duration-300 ${
            isExpanded ? 'rotate-180' : ''
          }`}
          strokeWidth={2.5}
        />
      </button>
      
      {/* Contenido expandible */}
      <div 
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-4 pt-1 space-y-2.5">
          {security.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2.5">
              <div className="mt-1.5 w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full lg:rounded-none bg-[#22F5C7] lg:bg-[#0e0e0e] flex-shrink-0 shadow-[0_0_6px_rgba(34,245,199,0.8)] lg:shadow-none" />
              <span className="text-xs text-[#D7E0FF] lg:text-[#0e0e0e]/75 leading-relaxed font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

SecurityFeatures.displayName = 'SecurityFeatures';

export default SecurityFeatures;
