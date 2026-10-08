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
      
      {/* Imagen real (width/height en el <img> para reservar layout y evitar CLS) */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          fetchpriority={priority ? 'high' : 'low'}
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
