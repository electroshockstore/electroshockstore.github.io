import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Hook para detectar desktop (sin parallax)
const useDesktopDetection = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 769);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);

    return () => {
      window.removeEventListener('resize', checkDesktop);
    };
  }, []);

  return { isDesktop };
};

const slides = [
  {
    id: 1,
    tag: "VERIFICADO",
    title: "COMPRÁ",
    titleHighlight: "SEGURO",
    description: "¡NO TE DEJES ENGAÑAR!",
    points: [
      { text: "No tenemos Instagram ni Facebook.", highlight: true },
      { text: "Solo Whatsapp Oficial.", positive: true }
    ],
    gradient: "from-blue-600 to-cyan-400",
    highlightColor: "bg-blue-500",
    image: "/images/hero/megaphone_tiny.webp",
    imagePosition: "left" // Imagen más a la izquierda
  },
  {
    id: 2,
    tag: "CONFIANZA",
    title: "SIN",
    titleHighlight: "DEPÓSITOS",
    description: "¡NO TE DEJES ENGAÑAR!",
    points: [
      { text: "NO pedimos dinero previo", highlight: true },
      { text: "Revisás y Pagás al momento", positive: true },
    
    ],
    gradient: "from-emerald-500 to-teal-400",
    highlightColor: "bg-emerald-500",
    image: "/images/hero/stop_tiny.webp",
    imagePosition: "right" // Imagen más a la derecha
  },
  {
    id: 3,
    tag: "LEER ATENTAMENTE",
    title: "CONDICIONES",
    titleHighlight: "IMPORTANTES",
    description: "Condiciones De Venta.",
    points: [
       { text: "Efectivo o transferencia INMEDIATA", positive: false },
      { text: "NO PERMUTO", highlight: true },
      { text: "Recargo en transf. < $100.000", highlight: true }
    ],
    gradient: "from-orange-500 to-red-500",
    highlightColor: "bg-orange-500",
    image: "/images/hero/methods_tiny.webp",
    imagePosition: "left" 
  },
  {
    id: 4,
    tag: "STOCK",
    title: "VENTA",
    titleHighlight: "PARTICULAR",
    description: "Liquidación de stock sellado.",
    points: [
      { text: "SOY PARTICULAR - SIN LOCAL", highlight: true },
      { text: "Productos sellados de fábrica", positive: true },
      { text: "Sin factura ni garantía escrita", highlight: true }
    ],
    gradient: "from-purple-600 to-pink-500",
    highlightColor: "bg-purple-500",
    image: "/images/hero/atenttion_tiny.webp",
    imagePosition: "right" // Imagen más a la derecha
  },
  {
    id: 5,
    tag: "ENTREGAS",
    title: "PUNTOS",
    titleHighlight: "RETIRO",
    description: "Horarios fijos y seguros.",
    points: [
      { text: "Berazategui Centro (16:00hs)", positive: true },
      { text: "Cruce Varela - Bingo (16:30hs)", positive: true },
      { text: "NO viajo a otros puntos", highlight: true }
    ],
    gradient: "from-cyan-500 to-blue-600",
    highlightColor: "bg-cyan-500",
    image: "/images/hero/location_tiny.webp",
    imagePosition: "left" // Imagen más a la izquierda
  }
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loadedImages, setLoadedImages] = useState(new Set([0])); // Precargar solo la primera
  const [animationKey, setAnimationKey] = useState(0); // Key para forzar re-trigger de animaciones
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  
  // Desktop detection hook
  const { isDesktop } = useDesktopDetection();

  const goToNextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setPrevSlide(currentSlide);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setAnimationKey(prev => prev + 1); // Forzar re-trigger de animaciones
    setTimeout(() => setIsTransitioning(false), 800); // Duración de la transición
  }, [currentSlide, isTransitioning]);
  
  const goToPrevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setPrevSlide(currentSlide);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setAnimationKey(prev => prev + 1); // Forzar re-trigger de animaciones
    setTimeout(() => setIsTransitioning(false), 800);
  }, [currentSlide, isTransitioning]);

  const goToSlide = useCallback((index) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setPrevSlide(currentSlide);
    setCurrentSlide(index);
    setAnimationKey(prev => prev + 1); // Forzar re-trigger de animaciones
    setTimeout(() => setIsTransitioning(false), 800);
  }, [currentSlide, isTransitioning]);

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
        goToNextSlide();
      } else {
        goToPrevSlide();
      }
    }
  }, [goToNextSlide, goToPrevSlide]);

  useEffect(() => {
    const timer = setInterval(goToNextSlide, 8000);
    return () => clearInterval(timer);
  }, [goToNextSlide]);

  // Precargar imágenes adyacentes (mobile y desktop)
  useEffect(() => {
    const nextIndex = (currentSlide + 1) % slides.length;
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    
    setLoadedImages(prev => new Set([...prev, currentSlide, nextIndex, prevIndex]));
  }, [currentSlide]);

  const current = useMemo(() => slides[currentSlide], [currentSlide]);
  const previous = useMemo(() => slides[prevSlide], [prevSlide]);

  return (
    <section 
      className="relative w-full h-[280px] sm:h-[600px] md:h-[700px] lg:h-[800px] bg-[#020617] overflow-hidden z-10 touch-pan-y"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      
      {/* Background Images - Posición estática optimizada para rendimiento */}
      <div className={`absolute right-0 top-0 h-full z-0 transition-opacity duration-700 ${
        current.imagePosition === 'left' 
          ? 'w-[85%] right-[-15%] md:w-[60%] md:right-0 lg:w-[65%] xl:w-[70%]'
          : 'w-[85%] right-[-15%] md:w-[65%] md:right-[-10%] lg:w-[70%] lg:right-[-15%] xl:w-[75%] xl:right-[-20%]'
      }`}>
        {/* Imagen anterior (fade out) */}
        {loadedImages.has(prevSlide) && prevSlide !== currentSlide && (
          <div 
            className="absolute inset-0 transition-opacity duration-700 ease-out"
            style={{
              opacity: isTransitioning ? 0 : 1
            }}
          >
            <img 
              src={previous.image} 
              className="w-full h-full object-cover brightness-[0.8] sm:brightness-100" 
              alt=""
              loading="lazy"
              decoding="async"
              width="1920"
              height="1080"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/70 md:via-[#020617]/50 to-transparent" />
          </div>
        )}
        
        {/* Imagen actual (fade in + slide in cinematográfico) */}
        {loadedImages.has(currentSlide) && (
          <div 
            key={`image-${current.id}`}
            className="absolute inset-0 transition-opacity duration-700 ease-out hero-image-enter"
            style={{
              opacity: isTransitioning ? 1 : 1
            }}
          >
            <img 
              src={current.image} 
              className="w-full h-full object-cover brightness-[0.8] sm:brightness-100" 
              alt=""
              loading={currentSlide === 0 ? "eager" : "lazy"}
              decoding="async"
              fetchpriority={currentSlide === 0 ? "high" : "low"}
              width="1920"
              height="1080"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/70 md:via-[#020617]/50 to-transparent" />
          </div>
        )}
      </div>

      {/* Fade-out superior - Mobile y Desktop */}
      <div className="absolute top-0 left-0 right-0 h-16 sm:h-20 bg-gradient-to-b from-[#0a0a0f] to-transparent pointer-events-none z-10" />

      {/* Fade-out inferior - Mobile y Desktop */}
      <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent pointer-events-none z-10" />

      {/* Contenido - Landing style sin parallax */}
  <div className="relative z-20 h-full flex items-start pt-10 sm:pt-1" key={`slide-content-${current.id}-${animationKey}`}>

        <div className="container mx-0 sm:mx-2 px-5 sm:px-6 md:px-12 lg:px-16 ">
          <div className="max-w-2xl lg:max-w-3xl xl:max-w-4xl">
            <div>
                {/* Tag - Badge más pequeño en mobile, posicionado arriba */}
                <div className="flex items-center gap-1.5 sm:gap-3 mb-1.5 sm:mb-5 md:mb-6">
                  <div className={`h-[2px] sm:h-[3px] w-6 sm:w-12 bg-gradient-to-r ${current.gradient} hero-line-expand`} />
                  <div className={`inline-flex items-center gap-1 sm:gap-2 px-1.5 sm:px-4 py-0.5 sm:py-1.5 bg-gradient-to-r ${current.gradient} rounded-full hero-tag-enter shadow-lg`}>
                    <div className="w-1 h-1 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse" />
                    <span className="text-white font-black text-[7px] sm:text-xs tracking-[0.2em] sm:tracking-[0.35em] uppercase">
                      {current.tag}
                    </span>
                  </div>
                </div>

                {/* Título - MAXIMIZADO en mobile - PROTAGONISTA ABSOLUTO */}
                <h1 className="text-[52px] sm:text-6xl md:text-8xl lg:text-9xl xl:text-[12rem] font-black leading-[0.8] sm:leading-[0.8] tracking-[-0.03em] mb-2 sm:mb-6 md:mb-8 lg:mb-12">
                  {/* Primera parte del título - BRUTAL */}
                  {current.title.split(' ').map((word, idx) => (
                    <span 
                      key={idx} 
                      className="hero-title-word inline-block mr-1.5 sm:mr-4 md:mr-6 text-white"
                      style={{
                        textShadow: '2px 2px 0px rgba(0,0,0,0.9), 4px 4px 0px rgba(0,0,0,0.5)',
                        WebkitTextStroke: '0.5px rgba(255,255,255,0.1)'
                      }}
                    >
                      {word}
                    </span>
                  ))}
                  
                  {/* Palabra destacada - MAXIMALIST MARKER EFFECT */}
                  <span className="hero-title-word inline-block relative">
                    {/* Múltiples capas de marker para efecto 3D brutal */}
                    <span className={`absolute inset-0 ${current.highlightColor} -skew-x-6 rotate-[-2deg] opacity-95 translate-x-1 translate-y-1`} />
                    <span className={`absolute inset-0 ${current.highlightColor} -skew-x-6 rotate-[-1deg] opacity-90`} />
                    
                    {/* Texto sobre el marker - ULTRA BOLD */}
                    <span 
                      className="relative text-black px-2 sm:px-5 md:px-8 inline-block font-black uppercase"
                      style={{
                        textShadow: '1px 1px 0px rgba(0,0,0,0.3)',
                        letterSpacing: '-0.02em'
                      }}
                    >
                      {current.titleHighlight}
                    </span>
                    
                    {/* Glow effect brutal - Solo desktop */}
                    <span className={`hidden sm:block absolute inset-0 ${current.highlightColor} blur-2xl opacity-60 animate-pulse`} />
                  </span>
                </h1>

                {/* Subtítulo - Con underline decorativo animado */}
                <div className="relative inline-block mb-2 sm:mb-10 md:mb-14 lg:mb-16 hero-description-enter">
                  <p className="text-[11px] sm:text-2xl md:text-3xl lg:text-4xl text-white font-black italic leading-tight relative z-10">
                    {current.description}
                  </p>
                  {/* Underline decorativo animado con gradiente */}
                  <div className={`absolute -bottom-0.5 sm:-bottom-2 left-0 right-0 h-1 sm:h-3 bg-gradient-to-r ${current.gradient} opacity-40 sm:opacity-50 blur-[2px] sm:blur-sm animate-pulse`} />
                  <div className={`absolute -bottom-0.5 sm:-bottom-2 left-0 w-full h-[2px] sm:h-[5px] bg-gradient-to-r ${current.gradient}`} />
                </div>

                {/* Points - Grid 2 columnas en mobile, 3 en desktop */}
                <div className="grid grid-cols-2 gap-x-2 gap-y-1 sm:grid-cols-3 sm:gap-4 md:gap-5 lg:gap-6">
                  {current.points.map((point, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center gap-1 sm:gap-3 group hero-point-enter"
                    >
                      {/* Icono BRUTAL - Más pequeño en mobile */}
                      <div className="flex-shrink-0">
                        <div className={`w-3 h-3 sm:w-7 sm:h-7 md:w-8 md:h-8 ${point.highlight ? 'bg-red-600' : 'bg-white'} flex items-center justify-center font-black text-black sm:shadow-[4px_4px_0px_rgba(0,0,0,0.8)]`}>
                          {point.highlight ? (
                            <span className="text-white text-[8px] sm:text-lg md:text-xl">!</span>
                          ) : (
                            <span className="text-black text-[8px] sm:text-lg md:text-xl">✓</span>
                          )}
                        </div>
                      </div>
                      
                      {/* Texto BRUTAL - Más pequeño en mobile */}
                      <div className={`flex-1 ${
                        point.highlight 
                          ? 'border-l-[.5px] sm:border-l-4 border-red-600 pl-1 sm:pl-3' 
                          : 'border-l-[1.5px] sm:border-l-4 border-white/30 pl-1 sm:pl-3'
                      }`}>
                        <span className={`text-[7.5px] sm:text-sm md:text-base lg:text-lg font-black uppercase tracking-tight leading-tight ${
                          point.highlight ? 'text-red-400' : 'text-white'
                        }`}
                        style={{
                          textShadow: '1px 1px 0px rgba(0,0,0,0.8)'
                        }}>
                          {point.text}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
          </div>
        </div>
      </div>

      {/* Navegación sin parallax - Más pequeña en mobile */}
      <div className="absolute bottom-3 sm:bottom-8 md:bottom-12 right-3 sm:right-8 md:right-12 z-30 flex flex-col items-end gap-2 sm:gap-5">
        {/* Contador BRUTAL - Más pequeño en mobile */}
        <div className="flex items-baseline gap-1.5 sm:gap-2">
          <span 
            className="text-3xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white leading-none"
            style={{
              textShadow: '2px 2px 0px rgba(0,0,0,0.8)'
            }}
          >
            {String(currentSlide + 1).padStart(2, '0')}
          </span>
          <span className="text-white/30 font-black text-base sm:text-3xl">
            /{String(slides.length).padStart(2, '0')}
          </span>
        </div>
        
        {/* Indicadores BRUTALES - Cuadrados */}
        <div className="flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              aria-label={`Ir a slide ${idx + 1}`}
              className={`transition-all duration-300 ${
                idx === currentSlide 
                  ? `w-8 sm:w-12 h-[4px] sm:h-[6px] ${current.highlightColor}` 
                  : 'w-4 sm:w-6 h-[4px] sm:h-[6px] bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* Botones - Solo desktop */}
        <div className="hidden sm:flex gap-3 md:gap-4">
          <button 
            onClick={goToPrevSlide}
            aria-label="Slide anterior"
            disabled={isTransitioning}
            className="p-3 md:p-4 rounded-full border border-white/10 text-white hover:bg-white hover:text-black transition-all group active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
          </button>
          <button 
            onClick={goToNextSlide}
            aria-label="Siguiente slide"
            disabled={isTransitioning}
            className="p-3 md:p-4 rounded-full border border-white/10 text-white hover:bg-white hover:text-black transition-all group active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
          </button>
        </div>
      </div>

    </section>
  );
};

export default HeroCarousel;