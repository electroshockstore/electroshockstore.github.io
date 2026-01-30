import { 
  Banknote, 
  CreditCard, 
  Truck,
  X,
  Ban,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Percent,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { IMPORTANT_RULES } from './constants';

const ImportantRulesBentoGrid = ({ rules = [] }) => {
  const rulesData = rules.length > 0 ? rules : IMPORTANT_RULES;

  return (
    <div className="w-full bg-transparent p-2 sm:p-4 lg:p-6 font-sans">
      <div className="w-full max-w-6xl mx-auto">
        
        {/* Layout Mobile Optimizado */}
        <div className="lg:hidden max-w-md mx-auto">
          <div className="grid grid-cols-2 gap-3">
            
            {/* CARD 1: SIN DEPÓSITOS */}
            <div className="bg-pink-50 rounded-[2rem] p-4 border border-pink-100 flex flex-col justify-between relative overflow-hidden">
              <ShieldCheck className="absolute -right-2 -bottom-2 w-16 h-16 text-pink-300 opacity-20" />
              <div className="relative z-10">
                <span className="inline-block px-2 py-0.5 bg-pink-600 text-white text-[8px] font-black rounded-full uppercase mb-2">
                  Seguridad
                </span>
                <h3 className="text-lg font-black text-gray-900 leading-tight mb-1">
                  Sin Depósitos Previos
                </h3>
                <p className="text-[10px] font-bold text-pink-600 uppercase mb-2">
                  Pagas al retirar
                </p>
                <p className="text-[11px] text-gray-600 font-medium leading-tight">
                  Revisas y Pagas. No se deje engañar
                </p>
              </div>
            </div>

            {/* CARD 2: PAGO INMEDIATO */}
            <div className="bg-white rounded-[2rem] p-4 border border-gray-100 shadow-lg flex flex-col justify-between relative overflow-hidden">
              <AlertTriangle className="absolute -right-2 -bottom-2 w-16 h-16 text-orange-300 opacity-15" />
              <div className="relative z-10">
                <span className="inline-block px-2 py-0.5 bg-black text-white text-[8px] font-black rounded-full uppercase mb-2">
                  Transparencia
                </span>
                <h3 className="text-lg font-black text-gray-900 leading-tight mb-2">
                  Pago Inmediato
                </h3>
                <div className="flex flex-col gap-1 mb-2">
                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-700">
                    <Banknote className="w-3 h-3" />
                    Efectivo
                  </div>
                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-blue-700">
                    <CreditCard className="w-3 h-3" />
                    Transferencia
                  </div>
                </div>
                <p className="text-[11px] text-gray-600 font-medium leading-tight">
                  Ni lo intenten estafadores
                </p>
              </div>
            </div>

            {/* CARD 3: IMAGEN */}
            <div className="row-span-2 bg-white rounded-[2rem] border border-pink-100 relative flex items-center justify-center overflow-hidden shadow-sm">
              <div className="absolute w-32 h-32 bg-pink-100 rounded-full blur-3xl opacity-40" />
              <img 
                src="/images/puntos_retiro.webp" 
                alt="Condiciones" 
                className="w-full h-full object-contain p-2 relative z-10 scale-110"
              />
            </div>

            {/* CARD 4: RECARGO 10% */}
            <div className="bg-gradient-to-br from-red-50 to-rose-100 rounded-[2rem] p-3 border border-red-200 flex flex-col justify-center relative overflow-hidden">
              <Percent className="absolute -right-1 -bottom-2 w-16 h-16 text-red-300 opacity-20" />
              <div className="relative z-10">
                <span className="inline-block px-2 py-0.5 bg-red-600 text-white text-[8px] font-black rounded-full uppercase mb-2">
                  Atención
                </span>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-black text-red-600 leading-none">10%</span>
                  <span className="text-sm font-black text-red-700 leading-none">Recargo</span>
                </div>
                <p className="text-[9px] font-bold text-red-600 leading-tight">
                  transferencias menores a $100.000
                </p>
              </div>
            </div>

            {/* CARD 5: NO ENVÍOS */}
            <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-[2rem] p-4 border border-slate-200 flex flex-col justify-center relative overflow-hidden">
              <Truck className="absolute -right-2 -bottom-2 w-16 h-16 text-slate-400 opacity-20 rotate-12" />
              <div className="relative z-10">
                <span className="inline-block px-2 py-0.5 bg-green-600 text-white text-[8px] font-black rounded-full uppercase mb-2">
                  Importante
                </span>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-3xl font-black text-red-600 leading-none">NO</span>
                  <span className="text-sm font-black text-red-700 uppercase leading-none">Envíos</span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-red-700">
                    <Ban className="w-3 h-3" />
                    NO Domicilio
                  </div>
                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-red-700">
                    <Ban className="w-3 h-3" />
                    NO Mercadolibre
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 6: VENTA PARTICULAR */}
            <div className="col-span-2 bg-blue-100 rounded-[2rem] p-4 border border-blue-200 relative overflow-hidden">
              <Zap className="absolute -right-2 -bottom-2 w-20 h-20 text-blue-300 opacity-15" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <h3 className="text-base font-black text-gray-900 leading-tight whitespace-nowrap">
                    Sin Local físico
                  </h3>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="px-2 py-0.5 bg-blue-600 text-white text-[8px] font-black rounded-full uppercase whitespace-nowrap">
                      Stock de local
                    </span>
                    <span className="px-2 py-0.5 bg-blue-600 text-white text-[8px] font-black rounded-full uppercase whitespace-nowrap">
                      Sin Garantía
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-blue-800 font-bold leading-tight">
                  Productos sellados de Fábrica, Pago previo por apertura.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Layout Desktop: Bento Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-4 auto-rows-min">

          {/* --- CARD 1: SEGURIDAD --- */}
          <div className="lg:row-span-2 rounded-[2rem] bg-pink-100 p-5 sm:p-6 flex flex-col justify-between border border-pink-200 relative overflow-hidden group">
            <DollarSign className="absolute -right-4 -bottom-4 w-32 h-32 text-pink-600 opacity-5 -rotate-12 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500" />
            <div className="relative z-10">
              <span className="px-3 py-1 rounded-full bg-pink-600 text-white text-[10px] font-black uppercase tracking-widest mb-3 sm:mb-4 inline-block">
                Seguridad
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-5xl font-black text-gray-900 leading-none tracking-tighter mb-3 sm:mb-4">
                {rulesData[0]?.title}
              </h3>
              <p className="text-base sm:text-lg font-bold text-pink-800 leading-tight mb-2">
                "{rulesData[0]?.subtitle}"
              </p>
              <p className="text-sm text-gray-700 font-medium">
                {rulesData[0]?.description}
              </p>
            </div>
          </div>

          {/* --- CARD 2: IMAGEN CENTRAL --- */}
          <div className="lg:row-span-3 rounded-[2rem] bg-white border border-pink-100 relative flex items-center justify-center overflow-visible shadow-sm min-h-[300px] sm:min-h-[400px]">
            <div className="absolute w-48 h-48 bg-pink-100 rounded-full blur-3xl opacity-50" />
            <img 
              src="/images/puntos_retiro.webp" 
              alt="Condiciones" 
              className="w-full h-full object-contain p-4 relative z-20 -translate-y-2.5 scale-120 drop-shadow-[0_15px_30px_rgba(219,39,119,0.25)]"
            />
          </div>

          {/* --- CARD 3: PAGO --- */}
          <div className="lg:row-span-2 rounded-[2rem] bg-white p-5 sm:p-6 border border-gray-100 shadow-sm relative overflow-hidden group">
            <AlertTriangle className="absolute -right-4 -bottom-4 w-32 h-32 text-orange-400 opacity-5 group-hover:opacity-10 transition-all duration-500" />
            <span className="px-3 py-1 rounded-full bg-black text-white text-[10px] font-black uppercase tracking-widest mb-3 sm:mb-4 inline-block">
              Transparencia
            </span>
            <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-none tracking-tighter mb-3 sm:mb-4">
              {rulesData[1]?.title}
            </h3>
            <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-black uppercase">
                <Banknote className="w-4 h-4" /> Efectivo
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-100 text-xs font-black uppercase">
                <CreditCard className="w-4 h-4" /> Transferencia
              </div>
            </div>
            <p className="text-sm text-gray-600 font-medium leading-snug">
              {rulesData[1]?.description}
            </p>
          </div>

          {/* --- CARD 4: RECARGO --- */}
          <div className="rounded-[2rem] bg-gradient-to-br from-red-50 to-rose-100 p-5 sm:p-6 border border-red-200 relative overflow-hidden flex flex-col">
            <Percent className="absolute -right-2 -bottom-2 w-24 h-24 text-red-600 opacity-5" />
            <span className="px-3 py-1 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-widest mb-2 sm:mb-3 inline-block">
              {rulesData[3]?.description}
            </span>
            <div className="flex items-baseline gap-2 mb-1 sm:mb-2">
              <span className="text-5xl sm:text-6xl font-black text-red-600 tracking-tighter leading-none">10%</span>
              <span className="text-xl sm:text-2xl font-bold text-red-800 uppercase leading-none">
                {rulesData[3]?.title.split(' ')[1]}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-red-700 uppercase leading-tight">
              {rulesData[3]?.subtitle}
            </p>
          </div>

          {/* --- CARD 5: NO ENVÍOS --- */}
          <div className="rounded-[2rem] bg-gradient-to-br from-slate-50 to-gray-100 p-5 sm:p-6 border border-slate-200 relative overflow-hidden flex flex-col">
            <Truck className="absolute -right-6 -bottom-6 w-24 h-24 text-slate-500 opacity-5 rotate-12" />
            <X className="absolute right-4 bottom-4 w-10 h-10 text-red-600 opacity-20" />
            <span className="px-3 py-1 rounded-full bg-green-600 text-white text-[10px] font-black uppercase tracking-widest mb-2 sm:mb-3 inline-block">
              {rulesData[4]?.description}
            </span>
            <div className="flex items-baseline gap-2 mb-2 sm:mb-3">
              <span className="text-5xl sm:text-6xl font-black text-red-600 tracking-tighter leading-none">NO</span>
              <span className="text-xl sm:text-2xl font-bold text-red-800 uppercase leading-none">
                {rulesData[4]?.title}
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-red-700">
                <Ban className="w-4 h-4" />
                NO se retira en mi Domicilio
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-red-700">
                <Ban className="w-4 h-4" />
                NO vendo por Mercadolibre
              </div>
            </div>
          </div>

          {/* --- CARD 6: VENTA PARTICULAR --- */}
          <div className="lg:col-span-3 rounded-[2rem] sm:rounded-[2.5rem] bg-blue-100 p-5 sm:p-6 lg:p-8 border border-blue-200 relative overflow-hidden">

            {/* Watermark */}
            <CheckCircle className="absolute right-10 -bottom-6 w-48 h-48 text-blue-600 opacity-5" />

            {/* ✅ BADGES ARRIBA */}
            <div className="flex flex-wrap gap-2 mb-4 sm:mb-0 sm:absolute sm:top-4 sm:right-4 z-20">
              <span className="px-2 sm:px-3 py-1 bg-blue-600 rounded-lg text-white text-[10px] sm:text-[11px] font-black uppercase">
                Stock de local cerrado
              </span>
              <span className="px-2 sm:px-3 py-1 bg-blue-600 rounded-lg text-white text-[10px] sm:text-[11px] font-black uppercase">
                Sin Garantía Escrita
              </span>
              <span className="px-2 sm:px-3 py-1 bg-blue-600 rounded-lg text-white text-[10px] sm:text-[11px] font-black uppercase">
                Atención
              </span>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-8 relative z-10 sm:pt-8 lg:pt-0">
              <div className="flex-1 text-center lg:text-left lg:pr-56">
                <h3 className="text-2xl sm:text-3xl lg:text-5xl font-black text-gray-900 leading-none tracking-tighter mb-2 sm:mb-3">
                  {rulesData[2]?.title}
                </h3>
                <p className="text-sm lg:text-base text-gray-700 font-bold max-w-2xl leading-tight mx-auto lg:mx-0">
                  {rulesData[2]?.description}
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ImportantRulesBentoGrid;
