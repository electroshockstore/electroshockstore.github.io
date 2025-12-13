import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    image: '/images/vendedores.tiny.jpg',
    alt: 'Vendedores Autorizados - Únicamente vía chat web'
  },
  {
    id: 2,
    image: '/images/sindepositos.tiny.png',
    alt: 'Sin Depósitos - Pago contra entrega'
  }
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning]);

  const goToSlide = useCallback((index) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning, currentSlide]);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [nextSlide]);

  // Touch handlers for mobile swipe
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <div className="w-full mb-8 sm:mb-12 px-4 sm:px-6 lg:px-8">
      {/* Logo Section */}
      <div className="flex justify-center mb-8 sm:mb-12 md:mb-14">
        <div className="relative">
          <img 
            src="/logotipo.png" 
            alt="Electro Shock Logo" 
            className="h-32 sm:h-40 md:h-48 lg:h-56 object-contain drop-shadow-2xl"
          />
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Slides Wrapper */}
        <div 
          className="relative h-[250px] xs:h-[280px] sm:h-[320px] md:h-[360px] lg:h-[380px] xl:h-[400px]"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Slides Track */}
          <div 
            className="flex h-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide) => (
              <div
                key={slide.id}
                className="min-w-full h-full relative flex-shrink-0 flex items-center justify-center px-2 py-3 sm:px-4 sm:py-4 md:px-6 md:py-5"
              >
                <img 
                  src={slide.image}
                  alt={slide.alt}
                  className="max-w-full max-h-full object-contain drop-shadow-lg"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows - Desktop Only */}
        <button
          onClick={prevSlide}
          disabled={isTransitioning}
          className="hidden md:flex absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 
                     items-center justify-center w-12 h-12 lg:w-14 lg:h-14
                     bg-white/90 hover:bg-white backdrop-blur-sm
                     rounded-full shadow-lg
                     transition-all duration-300 hover:scale-110
                     disabled:opacity-50 disabled:cursor-not-allowed
                     z-10"
          aria-label="Slide anterior"
        >
          <ChevronLeft className="w-6 h-6 lg:w-7 lg:h-7 text-gray-800" strokeWidth={2.5} />
        </button>

        <button
          onClick={nextSlide}
          disabled={isTransitioning}
          className="hidden md:flex absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 
                     items-center justify-center w-12 h-12 lg:w-14 lg:h-14
                     bg-white/90 hover:bg-white backdrop-blur-sm
                     rounded-full shadow-lg
                     transition-all duration-300 hover:scale-110
                     disabled:opacity-50 disabled:cursor-not-allowed
                     z-10"
          aria-label="Siguiente slide"
        >
          <ChevronRight className="w-6 h-6 lg:w-7 lg:h-7 text-gray-800" strokeWidth={2.5} />
        </button>

        {/* Progress Indicators (Dots) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className={`transition-all duration-300 rounded-full
                ${index === currentSlide
                  ? 'bg-white w-8 sm:w-10 h-2.5 sm:h-3'
                  : 'bg-white/60 hover:bg-white/80 w-2.5 sm:w-3 h-2.5 sm:h-3'
                }
                disabled:cursor-not-allowed`}
              aria-label={`Ir al slide ${index + 1}`}
              aria-current={index === currentSlide ? 'true' : 'false'}
            />
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-12 sm:mt-16 md:mt-20 text-center px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">
          Explorá Nuestros Productos
        </h2>
        
        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed">
          Seleccioná una categoría arriba para ver nuestro catálogo completo
        </p>
      </div>
    </div>
  );
};

export default HeroCarousel;
