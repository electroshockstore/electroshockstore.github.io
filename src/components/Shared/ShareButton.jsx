import { useState, useRef, useEffect } from 'react';
import { Share2, Link2, Check } from 'lucide-react';
import { useIsIOS } from '../../hooks/useDevice';
import Portal from './Portal';

const ShareButton = ({ productName, product, className = '' }) => {
  const isIOS = useIsIOS();
  const [showOptions, setShowOptions] = useState(false);
  const [copied, setCopied] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  // Calcular posición del dropdown cuando se abre
  useEffect(() => {
    if (!showOptions || !buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const currentScrollY = window.scrollY;
    
    setScrollY(currentScrollY);
    setDropdownPosition({
      top: rect.bottom + 8,
      left: rect.left,
      width: rect.width
    });
  }, [showOptions]);

  // Cerrar al hacer clic fuera o al hacer scroll
  useEffect(() => {
    if (!showOptions) return;

    const handleClickOutside = (event) => {
      if (
        buttonRef.current && !buttonRef.current.contains(event.target) &&
        dropdownRef.current && !dropdownRef.current.contains(event.target)
      ) {
        setShowOptions(false);
      }
    };

    const handleScroll = () => {
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
      <button
        ref={buttonRef}
        onClick={() => setShowOptions(!showOptions)}
        onTouchEnd={(e) => {
          e.preventDefault();
          setShowOptions(!showOptions);
        }}
        style={{ 
          WebkitTapHighlightColor: 'transparent',
          cursor: 'pointer',
          touchAction: 'manipulation'
        }}
        className={`w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-3 sm:px-6 sm:py-4 rounded-xl shadow-lg hover:shadow-blue-500/50 transition-all duration-300 font-bold text-sm sm:text-base hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] group relative overflow-hidden ${className}`}
      >
        <div className="flex-shrink-0">
          <Share2 className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
        </div>

        <div className="flex flex-col items-start">
          <span className="text-xs sm:text-sm font-semibold opacity-90">
            Compartir
          </span>
          <span className="text-sm sm:text-base font-black">
            Este producto
          </span>
        </div>

        <div className="flex-shrink-0 group-hover:translate-y-0.5 transition-transform duration-300">
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-xl" />
      </button>

      {showOptions && dropdownPosition && (
        <Portal>
          <div 
            ref={dropdownRef}
            className="bg-white rounded-xl shadow-2xl border-2 border-gray-200 overflow-hidden"
            style={{
              position: isIOS ? 'absolute' : 'fixed',
              top: isIOS ? `${dropdownPosition.top + scrollY}px` : `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
              width: `${dropdownPosition.width}px`,
              zIndex: 2147483647,
              WebkitTransform: 'translate3d(0, 0, 0)',
              transform: 'translate3d(0, 0, 0)',
              WebkitBackfaceVisibility: 'hidden',
              backfaceVisibility: 'hidden',
              pointerEvents: 'auto'
            }}
          >
          <button
            onClick={handleCopyLink}
            onTouchEnd={(e) => {
              e.preventDefault();
              handleCopyLink(e);
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
            onClick={handleWhatsAppShare}
            onTouchEnd={(e) => {
              e.preventDefault();
              handleWhatsAppShare(e);
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
        </div>
        </Portal>
      )}
    </>
  );
};

export default ShareButton;
