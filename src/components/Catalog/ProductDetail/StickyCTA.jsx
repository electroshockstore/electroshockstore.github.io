/**
 * StickyCTA (Fase 3.1) — barra de conversión persistente en mobile.
 *
 * Aparece cuando los CTAs de la ficha (`.pic-ctas`) salen del viewport,
 * mostrando precio + WhatsApp + compartir para no perder la acción principal
 * al scrollear.
 *
 * Reglas respetadas:
 * - Safe-area inferior (notch / home indicator): `env(safe-area-inset-bottom)`.
 * - No tapa flotantes: al mostrarse agrega `has-sticky-cta` al <html> y el CSS
 *   reubica el botón de chat (abajo-izq) y el "volver arriba" (abajo-der) por
 *   encima de la barra (solo <1024px).
 * - Movimiento: solo `transform`/`opacity`, 300ms, sin `translate` en low-end.
 */
import { useEffect, useRef, useState } from 'react';
import { Share2 } from 'lucide-react';
import { formatPriceNumber } from '../../../utils/priceFormatter';
import { trackWhatsAppClick, trackShareProduct } from '../../../utils/analytics';

const WHATSAPP_PHONE = '5491125718382';

const WhatsAppIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
  </svg>
);

const StickyCTA = ({ product, productName, price, triggerRef }) => {
  const [visible, setVisible] = useState(false);
  const barRef = useRef(null);

  // Mostrar cuando el bloque de CTAs de la ficha ya scrolleó fuera (arriba).
  useEffect(() => {
    const el = triggerRef?.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting && entry.boundingClientRect.bottom <= 0);
      },
      { threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [triggerRef]);

  // Al mostrarse, avisar al CSS para reubicar los botones flotantes.
  useEffect(() => {
    const root = document.documentElement;
    if (visible) root.classList.add('has-sticky-cta');
    else root.classList.remove('has-sticky-cta');
    return () => root.classList.remove('has-sticky-cta');
  }, [visible]);

  const handleWhatsApp = () => {
    if (product) trackWhatsAppClick(product, 'sticky');
    const priceText = product?.price ? `$${product.price.toLocaleString('es-AR')}` : '';
    const message =
      `Hola! Vi este producto en su catalogo web:\n\n` +
      `Producto: ${productName}\n` +
      `Precio: ${priceText}\n\n` +
      `Necesitaria mas informacion. Podrian ayudarme?`;
    window.open(
      `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  const handleShare = async () => {
    if (typeof window === 'undefined') return;
    const url = window.location.href;
    const title = productName || 'Producto';
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        trackShareProduct(product, 'native');
        return;
      } catch {
        // usuario canceló o no soportado: seguimos con copiar al portapapeles
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      trackShareProduct(product, 'clipboard');
    } catch {
      /* sin permiso de portapapeles: no-op */
    }
  };

  const formattedPrice =
    price != null ? `$ ${formatPriceNumber(price)}` : 'Consultar';

  return (
    <div
      ref={barRef}
      className="sticky-cta lg:hidden"
      data-visible={visible ? 'true' : 'false'}
      aria-hidden={!visible}
    >
      <div className="sticky-cta-inner">
        <div className="sticky-cta-price">
          <span className="sticky-cta-label">Precio</span>
          <span className="sticky-cta-amount tnum">{formattedPrice}</span>
        </div>

        <div className="sticky-cta-actions">
          <button
            type="button"
            onClick={handleShare}
            className="sticky-cta-icon-btn"
            aria-label="Compartir producto"
          >
            <Share2 className="h-5 w-5" strokeWidth={2.5} />
          </button>

          <button
            type="button"
            onClick={handleWhatsApp}
            className="sticky-cta-wa-btn"
          >
            <WhatsAppIcon />
            <span>Consultar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StickyCTA;
