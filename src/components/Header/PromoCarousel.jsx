import { Store, Truck, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const PromoCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true); // ⚡ NUEVO: Detectar si está visible
  const carouselRef = useRef(null); // ⚡ NUEVO: Ref para IntersectionObserver

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

  // ⚡ OPTIMIZACIÓN CRÍTICA: Detectar visibilidad
  useEffect(() => {
    if (!carouselRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { 
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    observer.observe(carouselRef.current);

    return () => {
      if (carouselRef.current) {
        observer.unobserve(carouselRef.current);
      }
    };
  }, []);

  // ⚡ Auto-rotate solo si está visible
  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % centerMessages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [centerMessages.length, isVisible]); // ⚡ Dependencia de isVisible

  return (
    <div 
      ref={carouselRef} 
      className="sm:hidden w-full bg-slate-950 py-2 overflow-hidden relative border-y border-white/5"
      style={{
        willChange: isVisible ? 'transform' : 'auto',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden'
      }}
    >
      <div className="flex items-center justify-between px-3 gap-2">
        {/* LEFT START - No hacemos envío */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <Truck className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" strokeWidth={2.5} />
          <span className="text-[10px] font-black tracking-tight uppercase bg-gradient-to-r from-blue-400 via-cyan-500 to-teal-500 bg-clip-text text-transparent whitespace-nowrap">
            No envíos
          </span>
        </div>

        {/* CENTER - Vertical Carousel con CSS transitions (mejor para iOS) */}
        <div className="flex-1 flex justify-center overflow-hidden h-5 relative">
          {centerMessages.map((promo, idx) => {
            const Icon = promo.icon;
            const isActive = idx === currentIndex;
            
            return (
              <div
                key={idx}
                className={`flex items-center justify-center gap-1.5 h-5 absolute inset-0 transition-all duration-400 ease-out ${
                  isActive 
                    ? 'opacity-100 translate-y-0' 
                    : idx < currentIndex 
                      ? 'opacity-0 -translate-y-5' 
                      : 'opacity-0 translate-y-5'
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-white flex-shrink-0" strokeWidth={2.5} />
                <span className={`text-[10px] font-black tracking-tight uppercase bg-gradient-to-r ${promo.gradient} bg-clip-text text-transparent whitespace-nowrap`}>
                  {promo.text}
                </span>
              </div>
            );
          })}
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
