import {
  Banknote,
  CreditCard,
  Truck,
  X,
  Ban,
  DollarSign,
  AlertTriangle,
  Percent,
  ShieldCheck,
  Shield,
  Zap,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { IMPORTANT_RULES } from './constants';

const ImportantRulesBentoGrid = ({ rules = [] }) => {
  const rulesData = rules.length > 0 ? rules : IMPORTANT_RULES;

  // Variants para animación sin parpadeo
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <div className="w-full bg-transparent p-2 sm:p-4 lg:p-6 font-sans">
      <div className="w-full max-w-6xl mx-auto">
        
        {/* ============================================
            LAYOUT MOBILE
            ============================================ */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="lg:hidden max-w-md mx-auto"
          >
            <div className="grid grid-cols-2 gap-3">
            
            {/* MOBILE CARD 1: SIN DEPÓSITOS */}
            <motion.div
              variants={cardVariants}
              className="bg-pink-50 bg-wash-pink rounded-2xl p-3 border-2 border-pink-200 flex flex-col justify-between relative overflow-hidden group"
            >
              <ShieldCheck className="absolute -right-2 -bottom-2 w-14 h-14 text-pink-300 opacity-20 group-hover:opacity-30 transition-opacity" />
              <div className="relative z-10">
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-pink-600 text-white text-[7px] font-black rounded-full uppercase mb-1.5 shadow-sm">
                  <ShieldCheck className="w-2.5 h-2.5" />
                  Seguridad
                </span>
                <h3 className="font-black leading-[0.95] tracking-tight mb-1">
                  <span className="block text-base text-gray-900">Sin Depósitos</span>
                  <span className="block text-xl bg-gradient-to-r from-pink-600 to-rose-400 bg-clip-text text-transparent">Previos</span>
                </h3>
                <p className="text-[9px] font-black text-gray-900 uppercase tracking-wide">
                  "Sin anticipos ni señas"
                </p>
                <div className="h-0.5 w-8 bg-pink-600 rounded-full my-1.5" />
                <p className="text-[10px] text-gray-600 font-medium leading-tight">
                  Revisas y Pagas. No se deje engañar
                </p>
              </div>
            </motion.div>

            {/* MOBILE CARD 2: PAGO INMEDIATO */}
            <motion.div
              variants={cardVariants}
              className="bg-white bg-wash-mint rounded-2xl p-3 border-2 border-gray-200 shadow-lg flex flex-col justify-between relative overflow-hidden group"
            >
              <AlertTriangle className="absolute -right-2 -bottom-2 w-14 h-14 text-orange-300 opacity-15 group-hover:opacity-25 transition-opacity" />
              <div className="relative z-10">
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-emerald-800 text-white text-[7px] font-black rounded-full uppercase mb-1.5 shadow-sm">
                  <Zap className="w-2.5 h-2.5" />
                  Transparencia
                </span>
                <h3 className="font-black leading-[0.95] tracking-tight mb-1">
                  <span className="block text-base text-gray-900">Pago</span>
                  <span className="block text-xl bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">Inmediato</span>
                </h3>
                <div className="h-1 w-12 bg-emerald-400 rounded-full -rotate-1 mb-1.5" />
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
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500" />
            </motion.div>

            {/* MOBILE CARD 3: IMAGEN - FIJA Y PRIMERA */}
            <motion.div
              variants={cardVariants}
              className="row-span-2 bg-white rounded-2xl border-2 border-pink-200 relative flex items-center justify-center overflow-hidden shadow-sm group"
            >
              <img 
                src="/images/puntos_retiro.webp" 
                alt="Condiciones" 
                className="w-full h-full object-contain p-2 relative z-10 scale-110 group-hover:scale-115 transition-transform duration-500"
              />
            </motion.div>

            {/* MOBILE CARD 4: RECARGO 10% */}
            <motion.div
              variants={cardVariants}
              className="bg-gradient-to-br from-red-50 to-rose-100 bg-wash-pink rounded-2xl p-2.5 border-2 border-red-300 flex flex-col justify-center relative overflow-hidden group"
            >
              <Percent className="absolute -right-1 -bottom-2 w-14 h-14 text-red-300 opacity-20 group-hover:opacity-30 transition-opacity" />
              <div className="relative z-10 pr-7">
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-pink-100 border border-pink-200 text-pink-700 text-[6px] font-black rounded-full uppercase mb-1.5 shadow-sm">
                  <Truck className="w-2.5 h-2.5 shrink-0" />
                  Cargos extras aplicables
                </span>
                <p className="text-5xl font-black leading-none bg-gradient-to-r from-pink-600 to-rose-400 bg-clip-text text-transparent">
                  10%
                </p>
                <p className="text-sm font-black text-gray-900 uppercase tracking-wide mt-0.5">
                  Recargo
                </p>
                <div className="h-px bg-red-200 my-1.5" />
                <p className="text-[8px] font-bold text-gray-900 uppercase leading-snug">
                  Transferencias menores a <span className="font-black">$100.000</span>
                </p>
              </div>
            </motion.div>

            {/* MOBILE CARD 5: NO ENVÍOS */}
            <motion.div
              variants={cardVariants}
              className="bg-gradient-to-br from-slate-50 to-gray-100 bg-wash-pink rounded-2xl p-3 border-2 border-slate-300 flex flex-col justify-center relative overflow-hidden group"
            >
              <Truck className="absolute -right-2 -bottom-2 w-14 h-14 text-slate-400 opacity-20 rotate-12 group-hover:opacity-30 transition-opacity" />
              <div className="relative z-10">
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-red-600 text-white text-[7px] font-black rounded-full uppercase mb-1.5 shadow-sm">
                  <Shield className="w-2.5 h-2.5" />
                  Puntos seguros
                </span>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="text-4xl font-black leading-none bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">NO</span>
                  <span className="text-xs font-black text-gray-900 uppercase leading-tight">Hacemos<br />Envíos</span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-0.5 text-[7px] font-bold text-red-700 bg-red-50 px-1.5 py-0.5 rounded-full">
                    <Ban className="w-2 h-2 shrink-0" />
                    NO Domicilio
                  </div>
                  <div className="flex items-center gap-0.5 text-[7px] font-bold text-red-700 bg-red-50 px-1.5 py-0.5 rounded-full">
                    <Ban className="w-2 h-2 shrink-0" />
                    NO Mercadolibre
                  </div>
                </div>
              </div>
              <X className="absolute top-2 right-2 w-5 h-5 text-red-600 opacity-10" />
            </motion.div>

            {/* MOBILE CARD 6: VENTA PARTICULAR */}
            <motion.div
              variants={cardVariants}
              className="col-span-2 bg-gray-900/95 rounded-2xl p-3 border border-white/10 relative overflow-hidden group"
            >
              <div className="relative z-10 flex items-start gap-2.5">
                <div className="flex-shrink-0 bg-gray-800 p-2 rounded-xl border border-yellow-500/50 shadow-md">
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
                    Sin Local <span className="text-yellow-400">físico</span>
                  </h3>
                  
                  <p className="text-[9px] text-gray-300 font-medium leading-tight">
                    Productos sellados de Fábrica, Pago previo por apertura.
                  </p>
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-500/60" />
            </motion.div>

            </div>
          </motion.div>

        {/* ============================================
            LAYOUT DESKTOP
            ============================================ */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  duration: 0.3,
                  staggerChildren: 0.15,
                  delayChildren: 0.2
                }
              }
            }}
            className="hidden lg:grid lg:grid-cols-3 gap-4 auto-rows-min"
          >

          {/* --- CARD 2: IMAGEN CENTRAL - APARECE PRIMERO (ANCLA) --- */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { 
                opacity: 1, 
                scale: 1,
                transition: { 
                  duration: 0.6, 
                  ease: [0.34, 1.56, 0.64, 1]
                }
              }
            }}
            className="lg:row-span-3 rounded-[2rem] bg-white border-2 border-pink-300 relative flex items-center justify-center overflow-visible shadow-lg min-h-[400px] group lg:order-2"
          >
            <img 
              src="/images/puntos_retiro.webp" 
              alt="Condiciones" 
              className="w-full h-full object-contain p-4 relative z-20 -translate-y-2.5 scale-120 drop-shadow-[0_15px_30px_rgba(219,39,119,0.25)] group-hover:scale-125 transition-transform duration-500"
            />
          </motion.div>

          {/* --- CARD 1: SEGURIDAD (Izquierda arriba) --- */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -40, y: 20 },
              visible: { 
                opacity: 1, 
                x: 0, 
                y: 0,
                transition: { 
                  duration: 0.5, 
                  ease: [0.34, 1.56, 0.64, 1]
                }
              }
            }}
            className="lg:row-span-2 rounded-[2rem] bg-pink-100 bg-wash-pink p-6 flex flex-col justify-between border-2 border-pink-300 relative overflow-hidden group shadow-lg hover:shadow-xl transition-shadow duration-300 lg:order-1"
          >
            <DollarSign className="absolute -right-4 -bottom-4 w-32 h-32 text-pink-600 opacity-5 -rotate-12 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500" />
            
            <div className="relative z-10">
              <span className="px-3 py-1.5 rounded-full bg-pink-600 text-white text-[10px] font-black uppercase tracking-widest mb-4 inline-flex items-center gap-1.5 shadow-md">
                <ShieldCheck className="w-3.5 h-3.5" />
                Seguridad
              </span>
              <h3 className="font-black leading-[0.95] tracking-tighter mb-3">
                <span className="block text-5xl text-gray-900">Sin Depósitos</span>
                <span className="block text-6xl bg-gradient-to-r from-pink-600 to-rose-400 bg-clip-text text-transparent">Previos</span>
              </h3>
              <p className="text-base font-black text-gray-900 uppercase tracking-wide">
                "{rulesData[0]?.subtitle}"
              </p>
              <div className="h-1 w-12 bg-pink-600 rounded-full my-3" />
              <p className="text-sm text-gray-700 font-medium">
                {rulesData[0]?.description}
              </p>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-pink-600" />
          </motion.div>

          {/* --- CARD 3: PAGO (Derecha arriba) --- */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 40, y: 20 },
              visible: { 
                opacity: 1, 
                x: 0, 
                y: 0,
                transition: { 
                  duration: 0.5, 
                  ease: [0.34, 1.56, 0.64, 1]
                }
              }
            }}
            className="lg:row-span-2 rounded-[2rem] bg-white bg-wash-mint p-6 border-2 border-gray-300 shadow-lg relative overflow-hidden group hover:shadow-xl transition-shadow duration-300 lg:order-3"
          >
            <AlertTriangle className="absolute -right-4 -bottom-4 w-32 h-32 text-orange-400 opacity-5 group-hover:opacity-10 transition-all duration-500" />
            
            <div className="relative z-10">
              <span className="px-3 py-1.5 rounded-full bg-emerald-800 text-white text-[10px] font-black uppercase tracking-widest mb-4 inline-flex items-center gap-1.5 shadow-md">
                <Zap className="w-3.5 h-3.5" />
                Transparencia
              </span>
              <h3 className="font-black leading-[0.95] tracking-tighter mb-2">
                <span className="block text-5xl text-gray-900">Pago</span>
                <span className="block text-6xl bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">Inmediato</span>
              </h3>
              <div className="h-1.5 w-20 bg-emerald-400 rounded-full -rotate-1 mb-4" />
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
            
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-emerald-500" />
          </motion.div>

          {/* --- CARD 4: RECARGO (Izquierda abajo) --- */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -40, y: -20 },
              visible: { 
                opacity: 1, 
                x: 0, 
                y: 0,
                transition: { 
                  duration: 0.5, 
                  ease: [0.34, 1.56, 0.64, 1]
                }
              }
            }}
            className="rounded-[2rem] bg-gradient-to-br from-red-50 to-rose-100 bg-wash-pink p-6 border-2 border-red-300 relative overflow-hidden flex flex-col group shadow-lg hover:shadow-xl transition-shadow duration-300 lg:order-4"
          >
            <Percent className="absolute -right-2 -bottom-2 w-24 h-24 text-red-600 opacity-5 group-hover:opacity-10 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <span className="px-3 py-1.5 rounded-full bg-pink-100 border border-pink-200 text-pink-700 text-[10px] font-black uppercase tracking-widest mb-3 inline-flex items-center gap-1.5 shadow-md">
                <Truck className="w-3.5 h-3.5" />
                Cargos extras aplicables
              </span>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-8xl font-black tracking-tighter leading-none bg-gradient-to-r from-pink-600 to-rose-400 bg-clip-text text-transparent">10%</span>
                <span className="text-2xl font-bold text-gray-900 uppercase leading-none">
                  Recargo
                </span>
              </div>
              <div className="h-px bg-red-200 mb-2" />
              <p className="text-sm font-bold text-gray-900 uppercase leading-tight">
                Transferencias menores a <span className="font-black">$100.000</span>
              </p>
            </div>
          </motion.div>

          {/* --- CARD 5: NO ENVÍOS (Derecha abajo) --- */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 40, y: -20 },
              visible: { 
                opacity: 1, 
                x: 0, 
                y: 0,
                transition: { 
                  duration: 0.5, 
                  ease: [0.34, 1.56, 0.64, 1]
                }
              }
            }}
            className="rounded-[2rem] bg-gradient-to-br from-slate-50 to-gray-100 bg-wash-pink p-6 border-2 border-slate-300 relative overflow-hidden flex flex-col group shadow-lg hover:shadow-xl transition-shadow duration-300 lg:order-5"
          >
            <Truck className="absolute -right-6 -bottom-6 w-24 h-24 text-slate-500 opacity-5 rotate-12 group-hover:opacity-10 transition-opacity duration-500" />
            <X className="absolute right-4 bottom-4 w-10 h-10 text-red-600 opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <span className="px-3 py-1.5 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-widest mb-3 inline-flex items-center gap-1.5 shadow-md">
                <Shield className="w-3.5 h-3.5" />
                Puntos seguros
              </span>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-6xl font-black tracking-tighter leading-none bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">NO</span>
                <span className="text-2xl font-bold text-gray-900 uppercase leading-tight">
                  Hacemos<br />Envíos
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-sm font-bold text-red-700 bg-red-50 px-3 py-1 rounded-full border border-red-200">
                  <Ban className="w-4 h-4" />
                  NO se retira en mi Domicilio
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-red-700 bg-red-50 px-3 py-1 rounded-full border border-red-200">
                  <Ban className="w-4 h-4" />
                  NO vendo por Mercadolibre
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-red-600" />
          </motion.div>

        {/* --- CARD 6: VENTA PARTICULAR (Abajo completo) --- */}
<motion.div
  variants={{
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.34, 1.56, 0.64, 1]
      }
    }
  }}
  className="lg:col-span-3 rounded-[2.5rem] bg-gray-900/95 p-8 border border-white/10 relative overflow-hidden group shadow-2xl hover:shadow-3xl transition-shadow duration-300 lg:order-6"
>
  
  <div className="flex items-start gap-6 relative z-10">
    <div className="flex-shrink-0 bg-gray-800 p-5 rounded-2xl border border-yellow-500/50 shadow-lg">
      <AlertTriangle className="w-10 h-10 text-yellow-400" strokeWidth={2.5} />
    </div>
    
    <div className="flex-1">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
          <h3 className="text-5xl font-black text-white leading-none tracking-tighter">
            Sin Local <span className="text-yellow-400">físico</span>
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
  
  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-yellow-500/40" />
</motion.div>
          </motion.div>

      </div>
    </div>
  );
};

export default ImportantRulesBentoGrid;
