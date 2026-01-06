import { useNavigate } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import { ImportantRulesBentoGrid } from '../../PuntosRetiro';
import { IMPORTANT_RULES } from '../../PuntosRetiro/constants';

const PuntosRetiroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-purple-50 p-4 sm:p-6 rounded-xl relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-5 right-5 w-32 h-32 bg-purple-200/20 rounded-full blur-2xl" />
        <div className="absolute bottom-5 left-5 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl" />
      </div>

      <div className="relative">
        {/* Header Section */}
        <div className="text-center mb-4 sm:mb-6">
          <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 bg-white rounded-full border-2 border-purple-200 shadow-sm mb-3 sm:mb-4">
            <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
            <span className="text-xs sm:text-sm font-bold text-gray-700">Sin local físico</span>
          </div>
          
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-2 sm:mb-4 px-4">
            Coordiná la entrega
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mt-1 sm:mt-2">
              Revisás y pagás
            </span>
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="mb-4 sm:mb-6">
          <ImportantRulesBentoGrid rules={IMPORTANT_RULES} />
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <button
            onClick={() => navigate('/puntos-de-retiro')}
            className="group relative inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base shadow-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
          >
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            <MapPin className="h-5 w-5 sm:h-6 sm:w-6 relative z-10" strokeWidth={2.5} />
            <span className="relative z-10">¿Dónde retiro mi producto?</span>
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PuntosRetiroSection;
