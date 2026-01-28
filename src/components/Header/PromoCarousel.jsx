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

  // Duplicar 3 veces para scroll infinito perfecto (12 items total)
  const duplicatedMessages = [...promoMessages, ...promoMessages, ...promoMessages];

  return (
    <div className="sm:hidden w-full bg-slate-950 py-1 overflow-hidden relative border-y border-white/5">
      {/* Keyframes inline - Ajustado para mostrar todos los mensajes */}
      <style>{`
        @keyframes promo-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 3));
          }
        }
        .promo-animate {
          animation: promo-scroll 25s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .promo-animate {
            animation: promo-scroll 40s linear infinite;
          }
        }
      `}</style>
      
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
      
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />
      
      {/* Scrolling content - CSS Animation */}
      <div className="flex items-center whitespace-nowrap promo-animate">
        {duplicatedMessages.map((promo, index) => {
          const Icon = promo.icon;
          return (
            <div
              key={index}
              className="flex items-center gap-3 px-6 flex-shrink-0"
            >
              {/* Icon Container */}
              <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              
              {/* Gradient Text */}
              <span className={`
                text-xs font-black tracking-tight uppercase
                bg-gradient-to-r ${promo.gradient}
                bg-clip-text text-transparent
                drop-shadow-sm
              `}>
                {promo.text}
              </span>
              
              {/* Diamond Separator */}
              <div className="flex gap-1 ml-4 opacity-30 flex-shrink-0">
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