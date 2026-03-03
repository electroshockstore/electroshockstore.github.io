// Sección de imagen del producto — Editorial Premium
// En sintonía con ProductInfoCard: Bebas Neue, slate-900, accent azul
import { useState, useEffect } from 'react';
import { Package, ChevronLeft, ChevronRight, X, Maximize2, ZoomIn } from 'lucide-react';
import Portal from '../../Shared/Portal';
import { useIsIOS } from '../../../hooks/useDevice';

const ProductImageSection = ({ images = [], name, stock, stockStatus }) => {
  const isIOS = useIsIOS();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  const hasMultipleImages = images.length > 1;
  const currentImage = images[currentImageIndex] || images[0];

  const nextImage = () => { setImageLoaded(false); setCurrentImageIndex((p) => (p + 1) % images.length); };
  const prevImage = () => { setImageLoaded(false); setCurrentImageIndex((p) => (p - 1 + images.length) % images.length); };
  const openLightbox = (i) => { setLightboxImageIndex(i); setIsLightboxOpen(true); };
  const closeLightbox = () => setIsLightboxOpen(false);

  useEffect(() => {
    if (!isLightboxOpen) return;
    if (isIOS) { setScrollY(window.scrollY); setViewportHeight(window.innerHeight); }
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    return () => { document.documentElement.style.overflow = ''; document.body.style.overflow = ''; };
  }, [isLightboxOpen, isIOS]);

  useEffect(() => {
    if (!isLightboxOpen || !isIOS) return;
    const h = () => setViewportHeight(window.innerHeight);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, [isLightboxOpen, isIOS]);

  const nextLB = () => setLightboxImageIndex((p) => (p + 1) % images.length);
  const prevLB = () => setLightboxImageIndex((p) => (p - 1 + images.length) % images.length);

  const handleKeyDown = (e) => {
    if (!isLightboxOpen) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextLB();
    if (e.key === 'ArrowLeft') prevLB();
  };

  // Stock badge color resolución
  const stockBg = stockStatus?.badgeColor || 'bg-emerald-500';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');

        /* ── Contenedor raíz ── */
        .pis-root {
          font-family: 'DM Sans', sans-serif;
          height: 100%;
          display: flex;
          flex-direction: column;
          background: #fff;
          position: relative;
        }

        /* Línea de acento superior — espejo del ProductInfoCard */
        .pis-accent-bar {
          height: 3px;
          background: linear-gradient(90deg, #2563eb 0%, #06b6d4 60%, transparent 100%);
          flex-shrink: 0;
        }

        /* ── Marco de la imagen principal ── */
        .pis-frame {
          position: relative;
          flex: 1;
          min-height: 0;
          background: #f8fafc;
          overflow: hidden;
          cursor: zoom-in;
        }

        /* Patrón de puntos sutil en el fondo del frame */
        .pis-frame::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, #e2e8f0 1px, transparent 1px);
          background-size: 20px 20px;
          opacity: 0.6;
          pointer-events: none;
          z-index: 0;
        }

        .pis-img {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .pis-img.loading { opacity: 0; transform: scale(0.97); }
        .pis-img.loaded  { opacity: 1; transform: scale(1); }

        /* Fallback ícono */
        .pis-fallback {
          display: none;
          position: absolute;
          inset: 0;
          align-items: center;
          justify-content: center;
          z-index: 1;
        }

        /* Hover overlay — zoom hint */
        .pis-hover-overlay {
          position: absolute;
          inset: 0;
          z-index: 2;
          background: rgba(15, 23, 42, 0);
          transition: background 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pis-frame:hover .pis-hover-overlay { background: rgba(15, 23, 42, 0.06); }

        .pis-zoom-hint {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(8px);
          border-radius: 99px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.12);
          font-size: 12px;
          font-weight: 600;
          color: #0f172a;
          opacity: 0;
          transform: translateY(4px);
          transition: opacity 0.2s, transform 0.2s;
          pointer-events: none;
          border: 1px solid rgba(255,255,255,0.8);
        }
        .pis-frame:hover .pis-zoom-hint { opacity: 1; transform: translateY(0); }

        /* Badge stock — esquina superior derecha */
        .pis-stock-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          z-index: 10;
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 5px 12px;
          border-radius: 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #fff;
          box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        }
        .pis-stock-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.8);
          animation: pis-pulse 2s ease-in-out infinite;
        }
        @keyframes pis-pulse {
          0%,100% { opacity: 1; } 50% { opacity: 0.4; }
        }

        /* Flechas de navegación */
        .pis-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          width: 36px;
          height: 36px;
          background: #fff;
          border: 1.5px solid #e2e8f0;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          opacity: 0;
          transition: opacity 0.2s, background 0.15s, box-shadow 0.15s, transform 0.15s;
          box-shadow: 0 2px 12px rgba(0,0,0,0.1);
        }
        .pis-frame:hover .pis-nav-btn { opacity: 1; }
        .pis-nav-btn:hover { background: #0f172a; border-color: #0f172a; box-shadow: 0 4px 16px rgba(0,0,0,0.2); }
        .pis-nav-btn:hover svg { color: #fff !important; }
        .pis-nav-btn.left  { left: 10px; }
        .pis-nav-btn.right { right: 10px; }
        .pis-nav-btn:active { transform: translateY(-50%) scale(0.92); }

        /* Contador de imágenes */
        .pis-counter {
          position: absolute;
          bottom: 12px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 14px;
          letter-spacing: 0.12em;
          color: #fff;
          background: rgba(15,23,42,0.65);
          backdrop-filter: blur(6px);
          padding: 3px 12px;
          border-radius: 5px;
          border: 1px solid rgba(255,255,255,0.1);
          pointer-events: none;
        }

        /* ── Banda de miniaturas ── */
        .pis-thumbs-band {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          overflow-x: auto;
          scrollbar-width: none;
          border-top: 1px solid #f1f5f9;
          background: #fff;
          flex-shrink: 0;
        }
        .pis-thumbs-band::-webkit-scrollbar { display: none; }

        .pis-thumb {
          flex-shrink: 0;
          width: 56px;
          height: 56px;
          border-radius: 10px;
          overflow: hidden;
          border: 2px solid transparent;
          background: #f8fafc;
          cursor: pointer;
          transition: border-color 0.15s, transform 0.15s, box-shadow 0.15s;
          position: relative;
        }
        .pis-thumb img { width: 100%; height: 100%; object-fit: contain; }
        .pis-thumb.active {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37,99,235,0.15);
          transform: translateY(-1px);
        }
        .pis-thumb:not(.active):hover {
          border-color: #94a3b8;
          transform: translateY(-1px);
        }

        /* Línea activa debajo de thumb activa */
        .pis-thumb.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 2px;
          background: #2563eb;
          border-radius: 1px;
        }

        /* ── LIGHTBOX ── */
        .pis-lb-backdrop {
          background: rgba(8, 12, 20, 0.97);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pis-lb-close {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 40px;
          height: 40px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 50;
          transition: background 0.15s;
        }
        .pis-lb-close:hover { background: rgba(255,255,255,0.15); }

        .pis-lb-counter {
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          font-family: 'Bebas Neue', sans-serif;
          font-size: 16px;
          letter-spacing: 0.18em;
          color: rgba(255,255,255,0.6);
          z-index: 50;
          pointer-events: none;
        }

        .pis-lb-img-wrap {
          position: relative;
          max-width: 90vw;
          max-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pis-lb-img {
          max-width: 100%;
          max-height: 80vh;
          object-fit: contain;
          border-radius: 4px;
        }

        .pis-lb-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 44px;
          height: 44px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 50;
          transition: background 0.15s;
        }
        .pis-lb-nav:hover { background: rgba(255,255,255,0.18); }
        .pis-lb-nav.left  { left: -60px; }
        .pis-lb-nav.right { right: -60px; }

        .pis-lb-thumbs {
          position: absolute;
          bottom: 16px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
          padding: 10px 14px;
          background: rgba(15,23,42,0.7);
          backdrop-filter: blur(12px);
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.08);
          max-width: 90vw;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .pis-lb-thumbs::-webkit-scrollbar { display: none; }

        .pis-lb-thumb {
          flex-shrink: 0;
          width: 52px;
          height: 52px;
          border-radius: 8px;
          overflow: hidden;
          border: 2px solid rgba(255,255,255,0.2);
          cursor: pointer;
          transition: border-color 0.15s, transform 0.15s;
          background: rgba(0,0,0,0.4);
        }
        .pis-lb-thumb img { width: 100%; height: 100%; object-fit: contain; }
        .pis-lb-thumb.active { border-color: #fff; transform: translateY(-2px); }
        .pis-lb-thumb:not(.active):hover { border-color: rgba(255,255,255,0.5); }
      `}</style>

      <div className="pis-root">
        {/* Línea de acento — idéntica al ProductInfoCard */}
        <div className="pis-accent-bar" />

        {/* ── FRAME IMAGEN PRINCIPAL ── */}
        <div
          className="pis-frame"
          style={{ aspectRatio: hasMultipleImages ? undefined : '1/1', flex: 1 }}
          onClick={() => openLightbox(currentImageIndex)}
        >
          {/* Imagen */}
          <img
            src={currentImage}
            alt={`${name} — ${currentImageIndex + 1}`}
            className={`pis-img ${imageLoaded ? 'loaded' : 'loading'}`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'flex';
            }}
          />
          <div className="pis-fallback">
            <Package style={{ width: 64, height: 64, color: '#cbd5e1' }} />
          </div>

          {/* Zoom hint */}
          <div className="pis-hover-overlay">
            <div className="pis-zoom-hint">
              <ZoomIn style={{ width: 14, height: 14 }} />
              Click para ampliar
            </div>
          </div>

          {/* Badge stock */}
          <div className={`pis-stock-badge ${stockBg}`}>
            <div className="pis-stock-dot" />
            {stock} en stock
          </div>

          {/* Flechas navegación */}
          {hasMultipleImages && (
            <>
              <button
                className="pis-nav-btn left"
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                aria-label="Imagen anterior"
              >
                <ChevronLeft style={{ width: 16, height: 16, color: '#334155' }} />
              </button>
              <button
                className="pis-nav-btn right"
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                aria-label="Imagen siguiente"
              >
                <ChevronRight style={{ width: 16, height: 16, color: '#334155' }} />
              </button>
              {/* Contador */}
              <div className="pis-counter">
                {currentImageIndex + 1} / {images.length}
              </div>
            </>
          )}
        </div>

        {/* ── MINIATURAS ── */}
        {hasMultipleImages && (
          <div className="pis-thumbs-band">
            {images.map((img, i) => (
              <button
                key={i}
                className={`pis-thumb ${i === currentImageIndex ? 'active' : ''}`}
                onClick={() => { setImageLoaded(false); setCurrentImageIndex(i); }}
                aria-label={`Ver imagen ${i + 1}`}
              >
                <img src={img} alt={`Miniatura ${i + 1}`} />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── LIGHTBOX ── */}
      {isLightboxOpen && (
        <Portal>
          <div
            className="pis-lb-backdrop"
            style={{
              zIndex: 2147483647,
              WebkitTransform: 'translate3d(0,0,0)',
              transform: 'translate3d(0,0,0)',
              ...(isIOS
                ? { position: 'absolute', top: scrollY, left: 0, right: 0, height: viewportHeight }
                : { position: 'fixed', inset: 0 }),
            }}
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {/* Cerrar */}
            <button className="pis-lb-close" onClick={closeLightbox} aria-label="Cerrar">
              <X style={{ width: 18, height: 18, color: '#fff' }} strokeWidth={2} />
            </button>

            {/* Contador Bebas */}
            <div className="pis-lb-counter">
              {lightboxImageIndex + 1} &nbsp;/&nbsp; {images.length}
            </div>

            {/* Imagen */}
            <div
              className="pis-lb-img-wrap"
              onClick={(e) => e.stopPropagation()}
              style={{ WebkitTransform: 'translate3d(0,0,0)', transform: 'translate3d(0,0,0)' }}
            >
              <img
                src={images[lightboxImageIndex]}
                alt={`${name} — ${lightboxImageIndex + 1}`}
                className="pis-lb-img"
                style={{ WebkitTransform: 'translate3d(0,0,0)', transform: 'translate3d(0,0,0)' }}
              />

              {/* Flechas lightbox */}
              {hasMultipleImages && (
                <>
                  <button
                    className="pis-lb-nav left"
                    onClick={(e) => { e.stopPropagation(); prevLB(); }}
                    aria-label="Anterior"
                  >
                    <ChevronLeft style={{ width: 20, height: 20, color: '#fff' }} />
                  </button>
                  <button
                    className="pis-lb-nav right"
                    onClick={(e) => { e.stopPropagation(); nextLB(); }}
                    aria-label="Siguiente"
                  >
                    <ChevronRight style={{ width: 20, height: 20, color: '#fff' }} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbs lightbox */}
            {hasMultipleImages && (
              <div className="pis-lb-thumbs">
                {images.map((img, i) => (
                  <button
                    key={i}
                    className={`pis-lb-thumb ${i === lightboxImageIndex ? 'active' : ''}`}
                    onClick={(e) => { e.stopPropagation(); setLightboxImageIndex(i); }}
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