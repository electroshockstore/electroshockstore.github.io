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
import useInViewport from '../../hooks/useInViewport';
import { IMPORTANT_RULES } from './constants';

const ImportantRulesBentoGrid = ({ rules = [] }) => {
  const rulesData = rules.length > 0 ? rules : IMPORTANT_RULES;
  const [mobileRef, mobileInView] = useInViewport({ threshold: 0.1 });
  const [desktopRef, desktopInView] = useInViewport({ threshold: 0.1 });

  return (
    <div className="w-full bg-transparent p-2 sm:p-4 lg:p-6 font-sans">
      <div className="w-full max-w-6xl mx-auto">
        
        {/* ============================================
            LAYOUT MOBILE
            ============================================ */}
          <div ref={mobileRef} className={`lg:hidden max-w-md mx-auto ${mobileInView ? 'bento-grid-visible' : 'bento-grid-hidden'}`}>
            <div className="grid grid-cols-2 gap-3">
            
            {/* MOBILE CARD 1: SIN DEPÓSITOS */}
            <div className="bento-card-branch bg-pink-50 rounded-2xl p-3 border-2 border-pink-200 flex flex-col justify-between relative overflow-hidden group" style={{ animationDelay: '0.3s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-pink-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <ShieldCheck className="absolute -right-2 -bottom-2 w-14 h-14 text-pink-300 opacity-20 group-hover:opacity-30 transition-opacity" />
              <div className="relative z-10">
                <span className="inline-block px-1.5 py-0.5 bg-pink-600 text-white text-[7px] font-black rounded-full uppercase mb-1.5 shadow-sm">
                  Seguridad
                </span>
                <h3 className="text-base font-black text-gray-900 leading-tight mb-1">
                  Sin Depósitos Previos
                </h3>
                <p className="text-[9px] font-bold text-pink-600 uppercase mb-1">
                  Pagas al retirar
                </p>
                <p className="text-[10px] text-gray-600 font-medium leading-tight">
                  Revisas y Pagas. No se deje engañar
                </p>
              </div>
            </div>

            {/* MOBILE CARD 2: PAGO INMEDIATO */}
            <div className="bento-card-branch bg-white rounded-2xl p-3 border-2 border-gray-200 shadow-lg flex flex-col justify-between relative overflow-hidden group" style={{ animationDelay: '0.4s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <AlertTriangle className="absolute -right-2 -bottom-2 w-14 h-14 text-orange-300 opacity-15 group-hover:opacity-25 transition-opacity" />
              <div className="relative z-10">
                <span className="inline-block px-1.5 py-0.5 bg-black text-white text-[7px] font-black rounded-full uppercase mb-1.5 shadow-sm">
                  Transparencia
                </span>
                <h3 className="text-base font-black text-gray-900 leading-tight mb-1.5">
                  Pago Inmediato
                </h3>
                <div className="flex flex-col gap-1 mb-1.5">
                  <div className="flex items-center gap-1 text-[8px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                    <Banknote className="w-2.5 h-2.5" />
                    Efectivo
                  </div>
                  <div className="flex items-center gap-1 text-[8px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">
                    <CreditCard className="w-2.5 h-2.5" />
                    Transferencia
                  </div>
                </div>
                <p className="text-[10px] text-gray-600 font-medium leading-tight">
                  Ni lo intenten estafadores
                </p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 via-blue-500 to-transparent" />
            </div>

            {/* MOBILE CARD 3: IMAGEN - FIJA Y PRIMERA */}
            <div className="bento-card-root row-span-2 bg-white rounded-2xl border-2 border-pink-200 relative flex items-center justify-center overflow-hidden shadow-sm group">
              <div 
                className="absolute w-28 h-28 bg-pink-100 rounded-full opacity-40 group-hover:opacity-60 transition-opacity duration-500" 
                style={{ filter: 'blur(40px)' }}
              />
              <img 
                src="/images/puntos_retiro.webp" 
                alt="Condiciones" 
                className="w-full h-full object-contain p-2 relative z-10 scale-110 group-hover:scale-115 transition-transform duration-500"
              />
            </div>

            {/* MOBILE CARD 4: RECARGO 10% */}
            <div className="bento-card-branch bg-gradient-to-br from-red-50 to-rose-100 rounded-2xl p-2.5 border-2 border-red-300 flex flex-col justify-center relative overflow-hidden group" style={{ animationDelay: '0.5s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-red-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Percent className="absolute -right-1 -bottom-2 w-14 h-14 text-red-300 opacity-20 group-hover:opacity-30 transition-opacity" />
              <div className="relative z-10">
                <span className="inline-block px-1.5 py-0.5 bg-red-600 text-white text-[7px] font-black rounded-full uppercase mb-1 shadow-sm">
                  Atención
                </span>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-black text-red-600 leading-none" style={{ textShadow: '2px 2px 0 rgba(220,38,38,0.2)' }}>10%</span>
                  <span className="text-sm font-black text-red-700 leading-none">Recargo</span>
                </div>
                <p className="text-[8px] font-bold text-red-600 leading-tight">
                  transferencias menores a $100.000
                </p>
              </div>
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-red-600/5 to-transparent transform rotate-12" />
            </div>

            {/* MOBILE CARD 5: NO ENVÍOS */}
            <div className="bento-card-branch bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl p-3 border-2 border-slate-300 flex flex-col justify-center relative overflow-hidden group" style={{ animationDelay: '0.6s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-slate-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Truck className="absolute -right-2 -bottom-2 w-14 h-14 text-slate-400 opacity-20 rotate-12 group-hover:opacity-30 transition-opacity" />
              <div className="relative z-10">
                <span className="inline-block px-1.5 py-0.5 bg-green-600 text-white text-[7px] font-black rounded-full uppercase mb-1.5 shadow-sm">
                  Importante
                </span>
                <div className="flex items-baseline gap-1 mb-1.5">
                  <span className="text-3xl font-black text-red-600 leading-none" style={{ textShadow: '2px 2px 0 rgba(220,38,38,0.2)' }}>NO</span>
                  <span className="text-xs font-black text-red-700 uppercase leading-none">Envíos</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-1 text-[8px] font-bold text-red-700 bg-red-50 px-1.5 py-0.5 rounded">
                    <Ban className="w-2.5 h-2.5" />
                    NO Domicilio
                  </div>
                  <div className="flex items-center gap-1 text-[8px] font-bold text-red-700 bg-red-50 px-1.5 py-0.5 rounded">
                    <Ban className="w-2.5 h-2.5" />
                    NO Mercadolibre
                  </div>
                </div>
              </div>
              <X className="absolute top-2 right-2 w-5 h-5 text-red-600 opacity-10" />
            </div>

            {/* MOBILE CARD 6: VENTA PARTICULAR */}
            <div className="bento-card-branch col-span-2 bg-gray-900/95 rounded-2xl p-3 border border-white/10 relative overflow-hidden group" style={{ animationDelay: '0.7s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-yellow-500/5 rounded-full pointer-events-none" />
              
              <div className="relative z-10 flex items-start gap-2.5">
                <div className="flex-shrink-0 bg-gradient-to-br from-gray-800 to-gray-900 p-2 rounded-xl border border-yellow-500/50 shadow-md">
                  <AlertTriangle className="w-4 h-4 text-yellow-400" strokeWidth={2.5} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 mb-1.5 flex-wrap">
                    <span className="px-1.5 py-0.5 bg-yellow-500/10 border border-yellow-500/20 rounded text-[7px] font-black uppercase text-yellow-500/90 whitespace-nowrap">
                      Stock local
                    </span>
                    <span className="px-1.5 py-0.5 bg-yellow-500/10 border border-yellow-500/20 rounded text-[7px] font-black uppercase text-yellow-500/90 whitespace-nowrap">
                      Sin Garantía
                    </span>
                    <span className="px-1.5 py-0.5 bg-yellow-500/10 border border-yellow-500/20 rounded text-[7px] font-black uppercase text-yellow-500/90 whitespace-nowrap">
                      Atención
                    </span>
                  </div>
                  
                  <h3 className="text-sm font-black text-white leading-tight mb-1">
                    Sin Local <span className="bg-gradient-to-r from-yellow-200 via-yellow-400 to-orange-400 bg-clip-text text-transparent">físico</span>
                  </h3>
                  
                  <p className="text-[9px] text-gray-300 font-medium leading-tight">
                    Productos sellados de Fábrica, Pago previo por apertura.
                  </p>
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-500/40 via-orange-500/40 to-transparent" />
            </div>

            </div>
          </div>

        {/* ============================================
            LAYOUT DESKTOP
            ============================================ */}
          <div ref={desktopRef} className={`hidden lg:grid lg:grid-cols-3 gap-4 auto-rows-min ${desktopInView ? 'bento-grid-visible' : 'bento-grid-hidden'}`}>

          {/* --- CARD 1: SEGURIDAD --- */}
          <div className="bento-card-branch lg:row-span-2 rounded-[2rem] bg-pink-100 p-6 flex flex-col justify-between border-2 border-pink-300 relative overflow-hidden group shadow-lg hover:shadow-xl transition-shadow duration-300" style={{ animationDelay: '0.3s' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-pink-200/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <DollarSign className="absolute -right-4 -bottom-4 w-32 h-32 text-pink-600 opacity-5 -rotate-12 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500" />
            
            <div className="relative z-10">
              <span className="px-3 py-1.5 rounded-full bg-pink-600 text-white text-[10px] font-black uppercase tracking-widest mb-4 inline-block shadow-md">
                Seguridad
              </span>
              <h3 className="text-5xl font-black text-gray-900 leading-none tracking-tighter mb-4" style={{ textShadow: '3px 3px 0 rgba(219,39,119,0.1)' }}>
                {rulesData[0]?.title}
              </h3>
              <p className="text-lg font-bold text-pink-800 leading-tight mb-2 uppercase">
                "{rulesData[0]?.subtitle}"
              </p>
              <p className="text-sm text-gray-700 font-medium">
                {rulesData[0]?.description}
              </p>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-pink-600 via-pink-400 to-transparent" />
          </div>

          {/* --- CARD 2: IMAGEN CENTRAL - FIJA Y PRIMERA --- */}
          <div className="bento-card-root lg:row-span-3 rounded-[2rem] bg-white border-2 border-pink-300 relative flex items-center justify-center overflow-visible shadow-lg min-h-[400px] group">
            <div 
              className="absolute w-48 h-48 bg-pink-100 rounded-full opacity-50 group-hover:opacity-70 transition-opacity duration-500" 
              style={{ filter: 'blur(48px)' }}
            />
            
            <img 
              src="/images/puntos_retiro.webp" 
              alt="Condiciones" 
              className="w-full h-full object-contain p-4 relative z-20 -translate-y-2.5 scale-120 drop-shadow-[0_15px_30px_rgba(219,39,119,0.25)] group-hover:scale-125 transition-transform duration-500"
            />
          </div>

          {/* --- CARD 3: PAGO --- */}
          <div className="bento-card-branch lg:row-span-2 rounded-[2rem] bg-white p-6 border-2 border-gray-300 shadow-lg relative overflow-hidden group hover:shadow-xl transition-shadow duration-300" style={{ animationDelay: '0.4s' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <AlertTriangle className="absolute -right-4 -bottom-4 w-32 h-32 text-orange-400 opacity-5 group-hover:opacity-10 transition-all duration-500" />
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-gray-900/5 to-transparent transform rotate-12" />
            
            <div className="relative z-10">
              <span className="px-3 py-1.5 rounded-full bg-black text-white text-[10px] font-black uppercase tracking-widest mb-4 inline-block shadow-md">
                Transparencia
              </span>
              <h3 className="text-5xl font-black text-gray-900 leading-none tracking-tighter mb-4" style={{ textShadow: '3px 3px 0 rgba(0,0,0,0.05)' }}>
                {rulesData[1]?.title}
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border-2 border-emerald-200 text-xs font-black uppercase shadow-sm">
                  <Banknote className="w-4 h-4" /> Efectivo
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 border-2 border-blue-200 text-xs font-black uppercase shadow-sm">
                  <CreditCard className="w-4 h-4" /> Transferencia
                </div>
              </div>
              <p className="text-sm text-gray-600 font-medium leading-snug">
                {rulesData[1]?.description}
              </p>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-blue-500 to-transparent" />
          </div>

          {/* --- CARD 4: RECARGO --- */}
          <div className="bento-card-branch rounded-[2rem] bg-gradient-to-br from-red-50 to-rose-100 p-6 border-2 border-red-300 relative overflow-hidden flex flex-col group shadow-lg hover:shadow-xl transition-shadow duration-300" style={{ animationDelay: '0.5s' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-red-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Percent className="absolute -right-2 -bottom-2 w-24 h-24 text-red-600 opacity-5 group-hover:opacity-10 transition-opacity duration-500" />
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-red-600/5 to-transparent transform rotate-12" />
            
            <div className="relative z-10">
              <span className="px-3 py-1.5 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-widest mb-3 inline-block shadow-md">
                {rulesData[3]?.description}
              </span>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-8xl font-black text-red-600 tracking-tighter leading-none" style={{ textShadow: '4px 4px 0 rgba(220,38,38,0.15)' }}>10%</span>
                <span className="text-2xl font-bold text-red-800 uppercase leading-none">
                  {rulesData[3]?.title.split(' ')[1]}
                </span>
              </div>
              <p className="text-sm font-bold text-red-700 uppercase leading-tight">
                {rulesData[3]?.subtitle}
              </p>
            </div>
          </div>

          {/* --- CARD 5: NO ENVÍOS --- */}
          <div className="bento-card-branch rounded-[2rem] bg-gradient-to-br from-slate-50 to-gray-100 p-6 border-2 border-slate-300 relative overflow-hidden flex flex-col group shadow-lg hover:shadow-xl transition-shadow duration-300" style={{ animationDelay: '0.6s' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-slate-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Truck className="absolute -right-6 -bottom-6 w-24 h-24 text-slate-500 opacity-5 rotate-12 group-hover:opacity-10 transition-opacity duration-500" />
            <X className="absolute right-4 bottom-4 w-10 h-10 text-red-600 opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <span className="px-3 py-1.5 rounded-full bg-green-600 text-white text-[10px] font-black uppercase tracking-widest mb-3 inline-block shadow-md">
                {rulesData[4]?.description}
              </span>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-6xl font-black text-red-600 tracking-tighter leading-none" style={{ textShadow: '4px 4px 0 rgba(220,38,38,0.15)' }}>NO</span>
                <span className="text-2xl font-bold text-red-800 uppercase leading-none">
                  {rulesData[4]?.title}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-sm font-bold text-red-700 bg-red-50 px-2 py-1 rounded border border-red-200">
                  <Ban className="w-4 h-4" />
                  NO se retira en mi Domicilio
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-red-700 bg-red-50 px-2 py-1 rounded border border-red-200">
                  <Ban className="w-4 h-4" />
                  NO vendo por Mercadolibre
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-slate-400 to-transparent" />
          </div>

        {/* --- CARD 6: VENTA PARTICULAR --- */}
<div className="bento-card-branch lg:col-span-3 rounded-[2.5rem] bg-gray-900/95 p-8 border border-white/10 relative overflow-hidden group shadow-2xl hover:shadow-3xl transition-shadow duration-300" style={{ animationDelay: '0.7s' }}>
  
  <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
  <div className="absolute -top-24 -right-24 w-48 h-48 bg-yellow-500/5 rounded-full pointer-events-none" />
  <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-orange-600/5 rounded-full pointer-events-none" />

  <div className="flex items-start gap-6 relative z-10">
    <div className="flex-shrink-0 bg-gradient-to-br from-gray-800 to-gray-900 p-5 rounded-2xl border border-yellow-500/50 shadow-lg">
      <AlertTriangle className="w-10 h-10 text-yellow-400" strokeWidth={2.5} />
    </div>
    
    <div className="flex-1">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
        <h3 className="text-5xl font-black text-white leading-none tracking-tighter">
          Sin Local <span className="bg-gradient-to-r from-yellow-200 via-yellow-400 to-orange-400 bg-clip-text text-transparent">físico</span>
        </h3>

        <div className="flex items-center gap-2 flex-wrap md:justify-end">
          <span className="px-2.5 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-yellow-500/90 whitespace-nowrap">
            Stock local cerrado
          </span>
          <span className="px-2.5 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-yellow-500/90 whitespace-nowrap">
            Sin Garantía
          </span>
          <span className="px-2.5 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-yellow-500/90 whitespace-nowrap">
            Atención
          </span>
        </div>
      </div>
      
      <hr className="dotted-sep mb-4" />
      
      <p className="text-base text-gray-200 font-medium max-w-2xl leading-relaxed">
        Los productos se entregan sellados, <strong className="text-yellow-400 font-black">Pago previo para apertura</strong>.
      </p>
    </div>
  </div>
  
  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent" />
</div>
          </div>

      </div>
    </div>
  );
};

export default ImportantRulesBentoGrid;
