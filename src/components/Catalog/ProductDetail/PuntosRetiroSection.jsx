import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import OffsetGlowCTA from '../../Shared/OffsetGlowCTA';
import { ImportantRulesBentoGrid } from '../../PuntosRetiro';
import { IMPORTANT_RULES } from '../../PuntosRetiro/constants';

const PuntosRetiroSection = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="relative">
        {/* Header Section — composición maximalista */}
        <div className="relative overflow-hidden text-center mb-4 sm:mb-6">
          {/* Número fantasma */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-2 top-0 select-none font-black leading-none text-gray-900/[0.05] text-[clamp(4rem,12vw,8rem)]"
            style={{ fontFamily: "'Bebas Neue','Arial Black',sans-serif" }}
          >
            02
          </span>

          {/* Eyebrow con reglas */}
          <div className="relative flex items-center justify-center gap-3 mb-4 sm:mb-5">
            <span className="hidden h-px w-10 bg-gray-300 sm:block" />
            <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 shadow-sm sm:px-4 sm:py-2">
              <MapPin className="h-3 w-3 text-purple-600 sm:h-4 sm:w-4" />
              <span className="text-xs font-bold text-gray-700 sm:text-sm">Sin local físico</span>
            </span>
            <span className="hidden h-px w-10 bg-gray-300 sm:block" />
          </div>

          <h2 className="relative font-black uppercase leading-[0.9] tracking-tight text-gray-900 text-[clamp(2.4rem,6vw,4.5rem)]">
            Coordiná la entrega
            <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Revisás y pagás
            </span>
          </h2>

          <p className="relative mt-3 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-gray-400 sm:text-[11px]">
            02 puntos · Revisás antes de pagar
          </p>
        </div>

        {/* Bento Grid */}
        <div className="mb-4 sm:mb-6">
          <ImportantRulesBentoGrid rules={IMPORTANT_RULES} />
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <OffsetGlowCTA
            size="lg"
            label="¿Dónde retiro mi producto?"
            onClick={() => navigate('/puntos-de-retiro')}
            className="text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default PuntosRetiroSection;
