// Sección de imagen del producto con galería y lightbox
import { useState, useEffect } from 'react';
import { Package, ChevronLeft, ChevronRight, X, ZoomIn, Maximize2 } from 'lucide-react';
import Portal from '../../Shared/Portal';

const ProductImageSection = ({ images = [], name, stock, stockStatus }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);

  const hasMultipleImages = images.length > 1;
  const currentImage = images[currentImageIndex] || images[0];

  const nextImage = () => {
    setImageLoaded(false);
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setImageLoaded(false);
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const openLightbox = (index) => {
    setLightboxImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  // Bloquear scroll cuando lightbox está abierto - iOS fix
  useEffect(() => {
    if (isLightboxOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isLightboxOpen]);

  const nextLightboxImage = () => {
    setLightboxImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevLightboxImage = () => {
    setLightboxImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (!isLightboxOpen) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextLightboxImage();
    if (e.key === 'ArrowLeft') prevLightboxImage();
  };

  return (
    <>
      <div className="bg-white rounded-xl border-2 border-gray-200 shadow-lg p-6 overflow-hidden h-full flex flex-col">
        {/* Imagen principal */}
        <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden relative group flex-shrink-0">
          <div 
            className="w-full h-full cursor-pointer relative"
            onClick={() => openLightbox(currentImageIndex)}
            style={{ 
              WebkitTapHighlightColor: 'transparent',
              cursor: 'pointer'
            }}
          >
            <img
              src={currentImage}
              alt={`${name} - Imagen ${currentImageIndex + 1}`}
              className={`w-full h-full object-contain transition-all duration-300 ${
                imageLoaded ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
              }`}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="w-full h-full absolute inset-0 bg-gray-100 hidden items-center justify-center">
              <Package className="h-20 w-20 text-gray-300" />
            </div>

            {/* Zoom indicator */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                <Maximize2 className="w-5 h-5 text-gray-700" />
                <span className="text-sm font-semibold text-gray-700">Click para ampliar</span>
              </div>
            </div>
          </div>

          {/* Badge de stock */}
          <div
            className={`absolute top-3 right-3 px-4 py-2 ${stockStatus.badgeColor} text-white rounded-full font-bold text-sm shadow-lg pointer-events-none`}
          >
            {stock} un.
          </div>

          {/* Controles de navegación */}
          {hasMultipleImages && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
              >
                <ChevronLeft className="h-5 w-5 text-gray-700" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
              >
                <ChevronRight className="h-5 w-5 text-gray-700" />
              </button>

              {/* Indicador de imagen actual */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/60 text-white rounded-full text-xs font-semibold pointer-events-none">
                {currentImageIndex + 1} / {images.length}
              </div>
            </>
          )}
        </div>

        {/* Miniaturas */}
        {hasMultipleImages && (
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2 flex-shrink-0">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => {
                  setImageLoaded(false);
                  setCurrentImageIndex(index);
                }}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  index === currentImageIndex
                    ? 'border-blue-600 ring-2 ring-blue-200'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <img
                  src={img}
                  alt={`Miniatura ${index + 1}`}
                  className="w-full h-full object-contain bg-gray-50"
                />
              </button>
            ))}
          </div>
        )}
        
        {/* Espaciador flexible para igualar altura con ProductInfoCard */}
        <div className="flex-1"></div>
      </div>

      {/* Lightbox Modal usando Portal */}
      {isLightboxOpen && (
        <Portal>
          <div 
            className="fixed inset-0 bg-black/95 flex items-center justify-center"
            style={{ 
              zIndex: 2147483647,
              top: 0,
              left: 0,
              right: 0,
              bottom: 0
            }}
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            style={{ cursor: 'pointer', WebkitTapHighlightColor: 'transparent' }}
            className="absolute top-4 right-4 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 z-50"
          >
            <X className="w-6 h-6 text-white" strokeWidth={2} />
          </button>

          {/* Image counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/20 rounded-full text-white font-semibold text-sm">
            {lightboxImageIndex + 1} / {images.length}
          </div>

          {/* Main image */}
          <div 
            className="relative w-full h-full flex items-center justify-center px-4 py-20"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              key={`lightbox-${lightboxImageIndex}`}
              src={images[lightboxImageIndex]}
              alt={`${name} - Imagen ${lightboxImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
              style={{
                maxHeight: '80vh',
                width: 'auto',
                height: 'auto'
              }}
            />
          </div>

          {/* Navigation buttons */}
          {hasMultipleImages && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevLightboxImage();
                }}
                style={{ cursor: 'pointer', WebkitTapHighlightColor: 'transparent' }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200"
              >
                <ChevronLeft className="w-7 h-7 text-white" strokeWidth={2} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextLightboxImage();
                }}
                style={{ cursor: 'pointer', WebkitTapHighlightColor: 'transparent' }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200"
              >
                <ChevronRight className="w-7 h-7 text-white" strokeWidth={2} />
              </button>
            </>
          )}

          {/* Thumbnails */}
          {hasMultipleImages && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw] px-4 py-2 bg-black/40 rounded-2xl">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxImageIndex(index);
                  }}
                  style={{ cursor: 'pointer', WebkitTapHighlightColor: 'transparent' }}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    index === lightboxImageIndex
                      ? 'border-white ring-2 ring-white/50'
                      : 'border-white/30 hover:border-white/60'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Miniatura ${index + 1}`}
                    className="w-full h-full object-contain bg-black/50"
                  />
                </button>
              ))}
            </div>
          )}
          </div>
        </Portal>
      )}
    </>
  );
};

export default ProductImageSection;
