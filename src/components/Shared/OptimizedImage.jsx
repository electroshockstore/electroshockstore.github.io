import { useState, useRef, useEffect } from 'react';
import { shouldReduceAnimations } from '../../utils/deviceDetection';

/**
 * Componente de imagen optimizado para mobile
 * - Lazy loading nativo
 * - Blur placeholder
 * - Responsive con srcset (opcional)
 * - Optimizado para performance
 */
const OptimizedImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  onLoad,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef(null);
  const reduceAnimations = shouldReduceAnimations();

  useEffect(() => {
    if (priority || !imgRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Cargar 50px antes de que sea visible
      }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = (e) => {
    setIsLoaded(true);
    onLoad?.(e);
  };

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* Placeholder blur - Solo si no reduce animaciones */}
      {!isLoaded && !reduceAnimations && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      
      {/* Imagen real */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={handleLoad}
          className={`
            w-full h-full object-cover
            transition-opacity duration-300
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
          `}
          {...props}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
