// Sección de imagen del producto — Editorial Premium
import { Package, ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import Portal from '../../Shared/Portal';
import { useImageGallery } from '../../../hooks/useImageGallery';
import { useLightbox } from '../../../hooks/useLightbox';

const ProductImageSection = ({ images = [], name, stock, stockStatus }) => {
  const gallery = useImageGallery(images);
  const lightbox = useLightbox(images);

  const stockBg = stockStatus?.badgeColor || 'bg-emerald-500';

  return (
    <>
      <div className="pis-root">
        {/* Línea de acento — Solo desktop */}
        <div className="pis-accent-bar hidden lg:block" />

        {/* ── FRAME IMAGEN PRINCIPAL ── */}
        <div
          className="pis-frame"
          style={{ aspectRatio: gallery.hasMultiple ? undefined : '1/1', flex: 1 }}
          onClick={() => lightbox.open(gallery.currentIndex)}
        >
          <img
            src={gallery.currentImage}
            alt={`${name} — ${gallery.currentIndex + 1}`}
            className={`pis-img ${gallery.imageLoaded ? 'loaded' : 'loading'}`}
            loading="lazy"
            onLoad={gallery.onLoad}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'flex';
            }}
          />
          <div className="pis-fallback">
            <Package className="w-16 h-16 text-slate-300" />
          </div>

          <div className="pis-hover-overlay">
            <div className="pis-zoom-hint">
              <ZoomIn className="w-3.5 h-3.5" />
              Click para ampliar
            </div>
          </div>

          <div className={`pis-stock-badge ${stockBg}`}>
            <div className="pis-stock-dot" />
            {stock} en stock
          </div>

          {gallery.hasMultiple && (
            <>
              <button
                className="pis-nav-btn left"
                onClick={(e) => { e.stopPropagation(); gallery.prev(); }}
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="w-4 h-4 text-slate-700" />
              </button>
              <button
                className="pis-nav-btn right"
                onClick={(e) => { e.stopPropagation(); gallery.next(); }}
                aria-label="Imagen siguiente"
              >
                <ChevronRight className="w-4 h-4 text-slate-700" />
              </button>
              <div className="pis-counter">
                {gallery.currentIndex + 1} / {images.length}
              </div>
            </>
          )}
        </div>

        {gallery.hasMultiple && (
          <div className="pis-thumbs-band">
            {images.map((img, i) => (
              <button
                key={i}
                className={`pis-thumb ${i === gallery.currentIndex ? 'active' : ''}`}
                onClick={() => gallery.goTo(i)}
                aria-label={`Ver imagen ${i + 1}`}
              >
                <img src={img} alt={`Miniatura ${i + 1}`} />
              </button>
            ))}
          </div>
        )}
      </div>

      {lightbox.isOpen && (
        <Portal>
          <div
            className="pis-lb-backdrop"
            style={{
              zIndex: 2147483647,
              WebkitTransform: 'translate3d(0,0,0)',
              transform: 'translate3d(0,0,0)',
              ...(lightbox.isIOS
                ? { position: 'absolute', top: lightbox.scrollY, left: 0, right: 0, height: lightbox.viewportHeight }
                : { position: 'fixed', inset: 0 }),
            }}
            onClick={lightbox.close}
            tabIndex={0}
          >
            <button className="pis-lb-close" onClick={lightbox.close} aria-label="Cerrar">
              <X className="w-4.5 h-4.5 text-white" strokeWidth={2} />
            </button>

            <div className="pis-lb-counter">
              {lightbox.currentIndex + 1} &nbsp;/&nbsp; {images.length}
            </div>

            <div
              className="pis-lb-img-wrap"
              onClick={(e) => e.stopPropagation()}
              style={{ WebkitTransform: 'translate3d(0,0,0)', transform: 'translate3d(0,0,0)' }}
            >
              <img
                src={images[lightbox.currentIndex]}
                alt={`${name} — ${lightbox.currentIndex + 1}`}
                className="pis-lb-img"
                style={{ WebkitTransform: 'translate3d(0,0,0)', transform: 'translate3d(0,0,0)' }}
              />

              {gallery.hasMultiple && (
                <>
                  <button
                    className="pis-lb-nav left"
                    onClick={(e) => { e.stopPropagation(); lightbox.prev(); }}
                    aria-label="Anterior"
                  >
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </button>
                  <button
                    className="pis-lb-nav right"
                    onClick={(e) => { e.stopPropagation(); lightbox.next(); }}
                    aria-label="Siguiente"
                  >
                    <ChevronRight className="w-5 h-5 text-white" />
                  </button>
                </>
              )}
            </div>

            {gallery.hasMultiple && (
              <div className="pis-lb-thumbs">
                {images.map((img, i) => (
                  <button
                    key={i}
                    className={`pis-lb-thumb ${i === lightbox.currentIndex ? 'active' : ''}`}
                    onClick={(e) => { e.stopPropagation(); lightbox.goTo(i); }}
                    aria-label={`Imagen ${i + 1}`}
                  >
                    <img src={img} alt={`Miniatura ${i + 1}`} />
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
