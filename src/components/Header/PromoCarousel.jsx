import { Store, Truck, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';

const PromoCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Mensajes del carousel central (vertical)
  const centerMessages = [
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

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % centerMessages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [centerMessages.length]);

  return (
    <div className="sm:hidden w-full bg-slate-950 py-2 overflow-hidden relative border-y border-white/5">
      <div className="flex items-center justify-between px-3 gap-2">
        {/* LEFT START - No hacemos envío */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <Truck className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" strokeWidth={2.5} />
          <span className="text-[10px] font-black tracking-tight uppercase bg-gradient-to-r from-blue-400 via-cyan-500 to-teal-500 bg-clip-text text-transparent whitespace-nowrap">
            No envíos
          </span>
        </div>

        {/* CENTER - Vertical Carousel */}
        <div className="flex-1 flex justify-center overflow-hidden h-5 relative">
          <div 
            className="flex flex-col transition-transform duration-500 ease-in-out"
            style={{ transform: `translateY(-${currentIndex * 100}%)` }}
          >
            {centerMessages.map((promo, index) => {
              const Icon = promo.icon;
              return (
                <div key={index} className="flex items-center justify-center gap-1.5 h-5 flex-shrink-0">
                  <Icon className="w-3.5 h-3.5 text-white flex-shrink-0" strokeWidth={2.5} />
                  <span className={`text-[10px] font-black tracking-tight uppercase bg-gradient-to-r ${promo.gradient} bg-clip-text text-transparent whitespace-nowrap`}>
                    {promo.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT END - No tenemos local físico */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <Store className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" strokeWidth={2.5} />
          <span className="text-[10px] font-black tracking-tight uppercase bg-gradient-to-r from-rose-400 via-pink-500 to-fuchsia-600 bg-clip-text text-transparent whitespace-nowrap">
            Sin local
          </span>
        </div>
      </div>
    </div>
  );
};

export default PromoCarousel;
