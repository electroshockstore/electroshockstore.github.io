import { useState } from 'react';
import { useLazyImage } from '../../hooks/useIntersectionObserver';
import { getOptimizedImageUrl } from '../../utils/performance';

const OptimizedImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  className = '', 
  priority = false,
  onError,
  sizes,
  ...props 
}) => {
  const [hasError, setHasError] = useState(false);
  
  // Si es priority, cargar inmediatamente, sino lazy load
  const { elementRef, imageSrc, isLoaded } = priority 
    ? { elementRef: null, imageSrc: src, isLoaded: true }
    : useLazyImage(src);

  const handleError = (e) => {
    setHasError(true);
    if (onError) onError(e);
  };

  if (hasError) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <svg 
          className="w-12 h-12 text-gray-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
          />
        </svg>
      </div>
    );
  }

  const optimizedSrc = getOptimizedImageUrl(imageSrc, width);

  return (
    <div ref={elementRef} className="relative">
      {!isLoaded && !priority && (
        <div 
          className={`absolute inset-0 bg-gray-200 animate-pulse ${className}`}
          style={{ width, height }}
        />
      )}
      <img
        src={optimizedSrc}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        sizes={sizes}
        className={`${className} ${!isLoaded && !priority ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onLoad={() => {}}
        onError={handleError}
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;
