import { Store, Truck, ShieldCheck, CheckCircle2 } from 'lucide-react';

const PromoCarousel = () => {
  const promoMessages = [
    { 
      icon: Store, 
      text: 'No tenemos local físico', 
      gradient: 'from-rose-400 via-pink-500 to-fuchsia-600',
    },
    { 
      icon: Truck, 
      text: 'No hacemos envíos', 
      gradient: 'from-blue-400 via-cyan-500 to-teal-500',
    },
    { 
      icon: ShieldCheck, 
      text: 'Sin señas ni pagos previos', 
      gradient: 'from-purple-400 via-violet-500 to-indigo-600',
    },
    { 
      icon: CheckCircle2, 
      text: 'Revisás y pagás al momento', 
      gradient: 'from-emerald-400 via-green-500 to-teal-500',
    }
  ];

  // Duplicar 3 veces para scroll infinito
  const duplicatedMessages = [...promoMessages, ...promoMessages, ...promoMessages];

  return (
    <div className="sm:hidden w-full bg-slate-950 py-1.5 overflow-hidden relative border-y border-white/5">
      {/* Keyframes optimizado - 15s para velocidad óptima */}
      <style>{`
        @keyframes promo-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
        .promo-animate {
          animation: promo-scroll 15s linear infinite;
          transform: translateZ(0);
        }
      `}</style>
      
      {/* Fade edges más cortos */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />
      
      {/* Scrolling content */}
      <div className="flex items-center whitespace-nowrap promo-animate">
        {duplicatedMessages.map((promo, index) => {
          const Icon = promo.icon;
          return (
            <div key={index} className="flex items-center gap-2.5 px-5 flex-shrink-0">
              <Icon className="w-4 h-4 text-white flex-shrink-0" strokeWidth={2.5} />
              <span className={`text-xs font-black tracking-tight uppercase bg-gradient-to-r ${promo.gradient} bg-clip-text text-transparent`}>
                {promo.text}
              </span>
              <div className="flex gap-1 ml-3 opacity-30 flex-shrink-0">
                <div className="w-1 h-1 rotate-45 bg-white" />
                <div className="w-1 h-1 rotate-45 bg-white" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PromoCarousel;