import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    tag: "VERIFICADO",
    title: "COMPRÁ CON SEGURIDAD",
    description: "¡NO TE DEJES ENGAÑAR!",
    points: [
      { text: "Solo venta web oficial, verificada y segura.", positive: true },
      { text: "¡ATENCIÓN! No tenemos Instagram ni Facebook.", highlight: true },
      { text: "Asesores autorizados solo en chat oficial.", positive: true }
    ],
    gradient: "from-blue-600 to-cyan-400",
    image: "/images/hero/megaphone_tiny.webp"
  },
  {
    id: 2,
    tag: "CONFIANZA",
    title: "SIN DEPÓSITOS",
    description: "¡NO TE DEJES ENGAÑAR!",
    points: [
      { text: "¡ATENCIÓN! NO pedimos dinero previo", highlight: true },
      { text: "Pagás al recibir el producto", positive: true },
      { text: "Revisás antes de abonar", positive: true }
    ],
    gradient: "from-emerald-500 to-teal-400",
    image: "/images/hero/stop_tiny.webp"
  },
  {
    id: 3,
    tag: "LEER ATENTAMENTE",
    title: "CONDICIONES",
    description: "Información importante sobre la operación.",
    points: [
      { text: "NO PERMUTO", highlight: true },
      { text: "Efectivo o transferencia INMEDIATA", positive: false },
      { text: "Recargo en transf. < $100.000", highlight: true }
    ],
    gradient: "from-orange-500 to-red-500",
    image: "/images/hero/methods_tiny.webp"
  },
  {
    id: 4,
    tag: "STOCK",
    title: "VENTA PARTICULAR",
    description: "Liquidación de stock sellado.",
    points: [
      { text: "SOY PARTICULAR - SIN LOCAL", highlight: true },
      { text: "Productos sellados de fábrica", positive: true },
      { text: "Sin factura ni garantía escrita", highlight: true }
    ],
    gradient: "from-purple-600 to-pink-500",
    image: "/images/hero/atenttion_tiny.webp"
  },
  {
    id: 5,
    tag: "ENTREGAS",
    title: "PUNTOS RETIRO",
    description: "Horarios fijos y seguros.",
    points: [
      { text: "Berazategui Centro (16:00hs)", positive: true },
      { text: "Cruce Varela - Bingo (16:30hs)", positive: true },
      { text: "NO viajo a otros puntos", highlight: true }
    ],
    gradient: "from-cyan-500 to-blue-600",
    image: "/images/hero/location_tiny.webp"
  }
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loadedImages, setLoadedImages] = useState(new Set([0])); // Precargar solo la primera
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const nextSlide = useCallback(() => setCurrentSlide((prev) => (prev + 1) % slides.length), []);
  const prevSlide = useCallback(() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length), []);

  // Touch handlers para swipe
  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  }, [nextSlide, prevSlide]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  useEffect(() => {
    const nextIndex = (currentSlide + 1) % slides.length;
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    
    setLoadedImages(prev => new Set([...prev, currentSlide, nextIndex, prevIndex]));
  }, [currentSlide]);

  const current = useMemo(() => slides[currentSlide], [currentSlide]);

  return (
    <section 
      className="relative w-full h-[280px] sm:h-[600px] md:h-[700px] lg:h-[800px] bg-[#020617] overflow-hidden z-10 touch-pan-y"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      
      {/* Background Image */}
      <div className="absolute right-0 top-0 w-full md:w-[70%] h-full z-0">
        {loadedImages.has(currentSlide) && (
          <img 
            key={current.id}
            src={current.image} 
            className="w-full h-full object-cover carousel-image-transition brightness-[0.8] sm:brightness-100" 
            alt=""
            loading={currentSlide === 0 ? "eager" : "lazy"}
            decoding="async"
            width="1920"
            height="1080"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/70 md:via-[#020617]/40 to-transparent" />
      </div>

      {/* Fade-out superior - Mobile y Desktop */}
      <div className="absolute top-0 left-0 right-0 h-16 sm:h-20 bg-gradient-to-b from-[#0a0a0f] to-transparent pointer-events-none z-10" />

      {/* Fade-out inferior - Mobile y Desktop */}
      <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent pointer-events-none z-10" />

      {/* Contenido - Landing style */}
      <div className="relative z-20 h-full flex items-center py-4 sm:py-0">
        <div className="container mx-0 sm:mx-2 px-5 sm:px-6 md:px-12 lg:px-16">
          <div className="max-w-2xl lg:max-w-4xl">
            <div key={current.id + '-text'} className="carousel-content-transition">
                {/* Tag - Landing style */}
                <div className="flex items-center gap-2 sm:gap-4 mb-2 sm:mb-4 md:mb-6">
                  <div className={`h-[3px] sm:h-[3px] w-8 sm:w-12 bg-gradient-to-r ${current.gradient}`} />
                  <span className="text-white font-black text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.4em] uppercase">
                    {current.tag}
                  </span>
                </div>

                {/* Título - GRANDE tipo landing */}
                <h1 className="text-[36px] sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white leading-[0.95] sm:leading-[0.85] tracking-tighter mb-2.5 sm:mb-4 md:mb-6 lg:mb-8">
                  {current.title}
                </h1>

                {/* Subtítulo - Destacado */}
                <p className="text-[15px] sm:text-xl md:text-2xl lg:text-3xl text-slate-200 font-bold mb-4 sm:mb-6 md:mb-8 lg:mb-12 italic leading-tight">
                  {current.description}
                </p>

                {/* Points - Legibles */}
                <div className="grid grid-cols-1 gap-2 sm:gap-4 md:grid-cols-2 md:gap-6 lg:gap-8">
                  {current.points.map((point, idx) => (
                    <div 
                      key={idx}
                      className="flex items-start gap-2 sm:gap-3 md:gap-4 group carousel-point-transition"
                      style={{ animationDelay: `${0.1 + idx * 0.05}s` }}
                    >
                      <div className="flex flex-col items-center pt-[3px] sm:pt-1">
                        <div className={`w-[2.5px] sm:w-[3px] h-4 sm:h-6 md:h-8 lg:h-10 bg-gradient-to-b ${point.highlight ? 'from-red-500 to-red-600' : current.gradient}`} />
                      </div>
                      <span className={`text-[12px] sm:text-base md:text-lg lg:text-xl font-bold tracking-tight leading-[1.4] sm:leading-snug ${point.highlight ? 'text-red-400' : 'text-white'}`}>
                        {point.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
          </div>
        </div>
      </div>

      {/* Navegación */}
      <div className="absolute bottom-3 sm:bottom-8 md:bottom-12 right-4 sm:right-8 md:right-12 z-30 flex flex-col items-end gap-2 sm:gap-4 md:gap-6">
        {/* Contador */}
        <div className="flex items-baseline gap-1.5 sm:gap-2 md:gap-3">
          <span className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-none">
            {String(currentSlide + 1).padStart(2, '0')}
          </span>
          <span className="text-white/20 font-black text-base sm:text-2xl md:text-3xl">
            / {String(slides.length).padStart(2, '0')}
          </span>
        </div>
        
        {/* Indicadores */}
        <div className="flex gap-1.5 sm:gap-1.5 md:gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Ir a slide ${idx + 1}`}
              className={`h-[2.5px] sm:h-[3px] md:h-[4px] transition-all duration-500 rounded-full ${
                idx === currentSlide 
                  ? `w-8 sm:w-12 md:w-16 bg-gradient-to-r ${current.gradient}` 
                  : 'w-3 sm:w-4 md:w-6 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* Botones - Solo desktop */}
        <div className="hidden sm:flex gap-3 md:gap-4">
          <button 
            onClick={prevSlide}
            aria-label="Slide anterior"
            className="p-3 md:p-4 rounded-full border border-white/10 text-white hover:bg-white hover:text-black transition-all group active:scale-95"
          >
            <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
          </button>
          <button 
            onClick={nextSlide}
            aria-label="Siguiente slide"
            className="p-3 md:p-4 rounded-full border border-white/10 text-white hover:bg-white hover:text-black transition-all group active:scale-95"
          >
            <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
          </button>
        </div>
      </div>

    </section>
  );
};

export default HeroCarousel;