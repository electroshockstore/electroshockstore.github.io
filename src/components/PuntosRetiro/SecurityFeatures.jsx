import { Shield } from 'lucide-react';

const SecurityFeatures = ({ security }) => {
  return (
    <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
      {/* Header con icono */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10">
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-emerald-400/40 rounded-xl blur-lg" />
          <div className="relative w-10 h-10 bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 rounded-xl flex items-center justify-center border border-emerald-400/30">
            <Shield className="w-5 h-5 text-emerald-400" strokeWidth={2} />
          </div>
        </div>
        <h4 className="text-base font-semibold text-white tracking-tight">Seguridad Verificada</h4>
      </div>
      
      {/* Lista minimalista */}
      <div className="px-6 py-5 space-y-3">
        {security.map((item, idx) => (
          <div key={idx} className="flex items-start gap-3 group/item">
            <div className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
            <span className="text-sm text-gray-300 leading-relaxed font-light">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecurityFeatures;
