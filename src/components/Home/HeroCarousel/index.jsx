import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import useIOSDetection from '../../../hooks/useIOSDetection';
import { slides } from './slides';
import { getAnimationVariants } from './animations';
import SlideContent from './SlideContent';
import SlideImage from './SlideImage';
import Navigation from './Navigation';
import { useCarouselVisibility } from './useCarouselVisibility';
import { useSwipeGesture } from './useSwipeGesture';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loadedImages, setLoadedImages] = useState(new Set([0]));
  const carouselRef = useRef(null);
  const isIOS = useIOSDetection();
  
  const isVisible = useCarouselVisibility(carouselRef);

  const goToNextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setPrevSlide(currentSlide);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 800);
  }, [currentSlide, isTransitioning]);
  
  const goToPrevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setPrevSlide(currentSlide);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 800);
  }, [currentSlide, isTransitioning]);

  const goToSlide = useCallback((index) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setPrevSlide(currentSlide);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 800);
  }, [currentSlide, isTransitioning]);

  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useSwipeGesture(
    goToNextSlide,
    goToPrevSlide
  );

  // Auto-rotate solo si está visible
  useEffect(() => {
    if (!isVisible) return;
    const timer = setInterval(goToNextSlide, 8000);
    return () => clearInterval(timer);
  }, [goToNextSlide, isVisible]);

  // Precargar imágenes adyacentes
  useEffect(() => {
    const nextIndex = (currentSlide + 1) % slides.length;
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    setLoadedImages(prev => new Set([...prev, currentSlide, nextIndex, prevIndex]));
  }, [currentSlide]);

  const current = useMemo(() => slides[currentSlide], [currentSlide]);
  const animationVariants = useMemo(() => getAnimationVariants(isIOS, isVisible), [isIOS, isVisible]);

  return (
    <section 
      ref={carouselRef}
      className="relative w-full h-[280px] sm:h-[600px] md:h-[700px] lg:h-[800px] bg-[#020617] overflow-hidden z-10 touch-pan-y"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        willChange: isVisible ? 'transform' : 'auto',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden'
      }}
    >
      {/* Background Image */}
      <div className={`absolute right-0 top-0 h-full z-0 ${
        current.imagePosition === 'left' 
          ? 'w-[85%] right-[-15%] md:w-[60%] md:right-0 lg:w-[65%] xl:w-[70%]'
          : 'w-[85%] right-[-15%] md:w-[65%] md:right-[-10%] lg:w-[70%] lg:right-[-15%] xl:w-[75%] xl:right-[-20%]'
      }`}>
        <AnimatePresence mode="wait">
          {loadedImages.has(currentSlide) && (
            <SlideImage
              slide={current}
              animationVariants={animationVariants}
              isVisible={isVisible}
              isIOS={isIOS}
              isFirstSlide={currentSlide === 0}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Fade overlays */}
      <div className="absolute top-0 left-0 right-0 h-16 sm:h-20 bg-gradient-to-b from-[#0a0a0f] to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent pointer-events-none z-10" />

      {/* Content */}
      <div className="relative z-20 h-full flex items-start pt-10 sm:pt-1">
        <div className="container mx-0 sm:mx-2 px-5 sm:px-6 md:px-12 lg:px-16">
          <div className="max-w-2xl lg:max-w-3xl xl:max-w-4xl">
            <AnimatePresence mode="wait">
              <SlideContent
                key={`content-${current.id}`}
                slide={current}
                animationVariants={animationVariants}
                isVisible={isVisible}
                isIOS={isIOS}
              />
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <Navigation
        currentSlide={currentSlide}
        totalSlides={slides.length}
        currentHighlightColor={current.highlightColor}
        isTransitioning={isTransitioning}
        onPrevSlide={goToPrevSlide}
        onNextSlide={goToNextSlide}
        onGoToSlide={goToSlide}
      />
    </section>
  );
};

export default HeroCarousel;
