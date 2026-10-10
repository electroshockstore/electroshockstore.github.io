import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Share2, Link2, Check, ChevronDown } from 'lucide-react';
import Portal from './Portal';
import BottomSheet from './BottomSheet';
import CTAPill from './CTAPill';
import { useIsDesktop } from '../../hooks/useMediaQuery';
import { formatPrice } from '../../utils/formatPrice';

const ShareOptionRows = ({ copied, onCopyLink, onWhatsAppShare }) => (
  <>
    <button
      onClick={onCopyLink}
      onTouchEnd={(e) => {
        e.preventDefault();
        onCopyLink(e);
      }}
      style={{
        WebkitTapHighlightColor: 'transparent',
        cursor: 'pointer',
        touchAction: 'manipulation'
      }}
      className="w-full flex items-center gap-3 px-4 py-4 hover:bg-gray-50 active:bg-gray-100 transition-colors duration-200 border-b border-gray-100"
    >
      {copied ? (
        <>
          <div className="flex-shrink-0 p-2 bg-green-100 rounded-lg">
            <Check className="h-5 w-5 text-green-600" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col items-start flex-1">
            <span className="text-sm font-bold text-green-600">¡Copiado!</span>
            <span className="text-xs text-green-500">Enlace en portapapeles</span>
          </div>
        </>
      ) : (
        <>
          <div className="flex-shrink-0 p-2 bg-blue-100 rounded-lg">
            <Link2 className="h-5 w-5 text-blue-600" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col items-start flex-1">
            <span className="text-sm font-bold text-gray-800">Copiar enlace</span>
            <span className="text-xs text-gray-500">Compartir URL del producto</span>
          </div>
        </>
      )}
    </button>

    <button
      onClick={onWhatsAppShare}
      onTouchEnd={(e) => {
        e.preventDefault();
        onWhatsAppShare(e);
      }}
      style={{
        WebkitTapHighlightColor: 'transparent',
        cursor: 'pointer',
        touchAction: 'manipulation'
      }}
      className="w-full flex items-center gap-3 px-4 py-4 hover:bg-green-50 active:bg-green-100 transition-colors duration-200"
    >
      <div className="flex-shrink-0 p-2 bg-green-100 rounded-lg">
        <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </div>
      <div className="flex flex-col items-start flex-1">
        <span className="text-sm font-bold text-gray-800">Compartir por WhatsApp</span>
        <span className="text-xs text-gray-500">Enviar a un contacto</span>
      </div>
    </button>
  </>
);

const TILE_IN = { opacity: 0, y: 14 };
const TILE_SHOWN = { opacity: 1, y: 0 };
const TILE_EASE = { duration: 0.35, ease: [0.22, 1, 0.36, 1] };

/**
 * Contenido premium del sheet mobile: preview del producto + tiles grandes
 * de acción con entrada escalonada + botón cancelar nativo.
 */
const ShareSheetContent = ({ productName, product, copied, onCopyLink, onWhatsAppShare, onCancel }) => {
  const thumb = product?.images?.[0];
  const priceText = product?.price != null ? formatPrice(product.price) : null;

  const tileTouch = {
    WebkitTapHighlightColor: 'transparent',
    cursor: 'pointer',
    touchAction: 'manipulation'
  };

  return (
    <div className="px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-1">
      {/* Preview del producto (estilo share-sheet nativo) */}
      <div className="flex items-center gap-3 px-1 pb-4">
        {thumb ? (
          <img
            src={thumb}
            alt={productName || 'Producto'}
            className="h-14 w-14 flex-shrink-0 rounded-2xl bg-gray-100 object-cover ring-1 ring-black/5"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600">
            <Share2 className="h-6 w-6 text-white" strokeWidth={2.5} />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400">
            Compartir
          </p>
          <p className="truncate text-sm font-bold text-gray-900">
            {productName || 'Este producto'}
          </p>
          {priceText && (
            <p className="text-sm font-black text-gray-900">{priceText}</p>
          )}
        </div>
      </div>

      {/* Acciones grandes */}
      <div className="grid grid-cols-2 gap-3">
        <motion.button
          onClick={onCopyLink}
          onTouchEnd={(e) => {
            e.preventDefault();
            onCopyLink(e);
          }}
          style={tileTouch}
          initial={TILE_IN}
          animate={TILE_SHOWN}
          transition={{ ...TILE_EASE, delay: 0.06 }}
          whileTap={{ scale: 0.96 }}
          className={`flex flex-col items-center gap-2 rounded-2xl border p-5 text-center transition-colors duration-200 ${
            copied
              ? 'border-green-200 bg-green-50'
              : 'border-blue-100 bg-blue-50/60 active:bg-blue-50'
          }`}
        >
          <div className={`p-3.5 rounded-2xl ${copied ? 'bg-green-500' : 'bg-blue-500'} shadow-lg`}>
            {copied ? (
              <Check className="h-6 w-6 text-white" strokeWidth={2.5} />
            ) : (
              <Link2 className="h-6 w-6 text-white" strokeWidth={2.5} />
            )}
          </div>
          <span className={`text-sm font-bold ${copied ? 'text-green-700' : 'text-gray-800'}`}>
            {copied ? '¡Copiado!' : 'Copiar enlace'}
          </span>
          <span className={`text-[11px] ${copied ? 'text-green-600' : 'text-gray-500'}`}>
            {copied ? 'En portapapeles' : 'URL del producto'}
          </span>
        </motion.button>

        <motion.button
          onClick={onWhatsAppShare}
          onTouchEnd={(e) => {
            e.preventDefault();
            onWhatsAppShare(e);
          }}
          style={tileTouch}
          initial={TILE_IN}
          animate={TILE_SHOWN}
          transition={{ ...TILE_EASE, delay: 0.12 }}
          whileTap={{ scale: 0.96 }}
          className="flex flex-col items-center gap-2 rounded-2xl border border-green-100 bg-green-50/60 p-5 text-center transition-colors duration-200 active:bg-green-50"
        >
          <div className="p-3.5 rounded-2xl bg-green-500 shadow-lg shadow-green-500/30">
            <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </div>
          <span className="text-sm font-bold text-gray-800">WhatsApp</span>
          <span className="text-[11px] text-gray-500">Enviar a un contacto</span>
        </motion.button>
      </div>

      {/* Cancelar (patrón nativo) */}
      <motion.button
        onClick={onCancel}
        style={tileTouch}
        initial={TILE_IN}
        animate={TILE_SHOWN}
        transition={{ ...TILE_EASE, delay: 0.18 }}
        whileTap={{ scale: 0.99 }}
        className="mt-3 w-full rounded-2xl bg-gray-100 py-3.5 text-sm font-bold text-gray-700 active:bg-gray-200"
      >
        Cancelar
      </motion.button>
    </div>
  );
};

const ShareButton = ({ productName, product, className = '' }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [copied, setCopied] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState(null);
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);
  const isDesktop = useIsDesktop();

  // Calcular posición del dropdown (desktop) cuando se abre
  useEffect(() => {
    if (!showOptions || !buttonRef.current) return;

    const updatePosition = () => {
      const rect = buttonRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calcular si hay espacio abajo o arriba
      const spaceBelow = viewportHeight - rect.bottom;
      const dropdownHeight = 200; // Altura estimada del dropdown

      let top, bottom;

      if (spaceBelow >= dropdownHeight + 16) {
        // Hay espacio abajo - posicionar debajo del botón
        top = rect.bottom + 8;
        bottom = null;
      } else {
        // No hay espacio abajo - posicionar arriba del botón
        top = null;
        bottom = viewportHeight - rect.top + 8;
      }

      setDropdownPosition({
        top,
        bottom,
        left: rect.left,
        width: rect.width
      });
    };

    updatePosition();

    // Recalcular en resize (importante para iOS cuando cambia orientación)
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [showOptions]);

  // Cerrar al hacer clic fuera o al hacer scroll (solo dropdown desktop;
  // el sheet mobile se cierra con overlay/drag/Escape y su scroll interno
  // no debe cerrarlo)
  useEffect(() => {
    if (!showOptions) return;

    const insideSheet = (target) => target?.closest?.('[data-bottom-sheet]');

    const handleClickOutside = (event) => {
      if (insideSheet(event.target)) return;
      if (
        buttonRef.current && !buttonRef.current.contains(event.target) &&
        dropdownRef.current && !dropdownRef.current.contains(event.target)
      ) {
        setShowOptions(false);
      }
    };

    const handleScroll = (event) => {
      if (insideSheet(event?.target)) return;
      setShowOptions(false);
    };

    // iOS: agregar touchstart además de mousedown
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside, { passive: true });
    window.addEventListener('scroll', handleScroll, true);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [showOptions]);

  const getProductUrl = () => {
    if (typeof window === 'undefined') return '';
    return window.location.href;
  };

  const handleCopyLink = async (e) => {
    e.stopPropagation();
    try {
      const url = getProductUrl();
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setShowOptions(false);
      }, 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  const handleWhatsAppShare = (e) => {
    e.stopPropagation();
    const url = getProductUrl();
    const text = `¡Mira este producto! ${productName}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + '\n' + url)}`;
    window.open(whatsappUrl, '_blank');
    setShowOptions(false);
  };

  return (
    <>
      <span ref={buttonRef} className="block w-full">
        <CTAPill
          variant="brand"
          caption="Compartir"
          label="Este producto"
          prefix={<Share2 className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" strokeWidth={2.5} />}
          circleIcon={
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 sm:h-5 sm:w-5 ${showOptions ? 'rotate-180' : ''}`}
              strokeWidth={2.5}
            />
          }
          onClick={() => setShowOptions(!showOptions)}
          onTouchEnd={(e) => {
            e.preventDefault();
            setShowOptions(!showOptions);
          }}
          className={`w-full text-sm shadow-lg sm:text-base ${className}`}
          style={{
            WebkitTapHighlightColor: 'transparent',
            cursor: 'pointer',
            touchAction: 'manipulation'
          }}
        />
      </span>

      {/* Desktop: dropdown posicionado junto al botón */}
      {isDesktop && showOptions && dropdownPosition && (
        <Portal>
          <div
            ref={dropdownRef}
            className="bg-white rounded-xl shadow-2xl border-2 border-gray-200 overflow-hidden"
            style={{
              position: 'fixed',
              ...(dropdownPosition.top !== null
                ? { top: `${dropdownPosition.top}px` }
                : { bottom: `${dropdownPosition.bottom}px` }
              ),
              left: `${dropdownPosition.left}px`,
              width: `${dropdownPosition.width}px`,
              maxHeight: '80vh',
              overflowY: 'auto',
              zIndex: 2147483647,
              WebkitTransform: 'translate3d(0, 0, 0)',
              transform: 'translate3d(0, 0, 0)',
              WebkitBackfaceVisibility: 'hidden',
              backfaceVisibility: 'hidden',
              pointerEvents: 'auto',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            <ShareOptionRows
              copied={copied}
              onCopyLink={handleCopyLink}
              onWhatsAppShare={handleWhatsAppShare}
            />
          </div>
        </Portal>
      )}

      {/* Mobile: bottom sheet nativo */}
      {!isDesktop && (
        <BottomSheet
          isOpen={showOptions}
          onClose={() => setShowOptions(false)}
          label="Compartir este producto"
          panelClassName="bg-white"
        >
          <ShareSheetContent
            productName={productName}
            product={product}
            copied={copied}
            onCopyLink={handleCopyLink}
            onWhatsAppShare={handleWhatsAppShare}
            onCancel={() => setShowOptions(false)}
          />
        </BottomSheet>
      )}
    </>
  );
};

export default ShareButton;
