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

  // Duplicar mensajes suficientes veces para scroll infinito suave
  const duplicatedMessages = [...promoMessages, ...promoMessages, ...promoMessages, ...promoMessages];

  return (
    <div className="sm:hidden w-full bg-slate-950 py-1 overflow-hidden relative border-y border-white/5">
      {/* Keyframes inline */}
      <style>{`
        @keyframes promo-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .promo-animate {
          animation: promo-scroll 30s linear infinite;
          will-change: transform;
        }
      `}</style>
      
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
      
      {/* Fade edges con mayor suavidad */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-950 via-slate-950/80 to-transparent z-10 pointer-events-none" />
      
      {/* Scrolling content - CSS Animation */}
      <div className="flex items-center whitespace-nowrap promo-animate">
        {duplicatedMessages.map((promo, index) => {
          const Icon = promo.icon;
          return (
            <div
              key={index}
              className="group flex items-center gap-4 px-8 flex-shrink-0"
            >
              {/* Icon Container */}
              <div className="relative w-5 h-5 flex items-center justify-center">
                <Icon className="w-5 h-5 text-white relative z-10" strokeWidth={2.5} />
              </div>
              
              {/* Gradient Text */}
              <span className={`
                text-sm font-black tracking-tight uppercase
                bg-gradient-to-r ${promo.gradient}
                bg-clip-text text-transparent
                filter drop-shadow-sm
              `}>
                {promo.text}
              </span>
              
              {/* Diamond Separator */}
              <div className="flex gap-1 ml-6 opacity-30">
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