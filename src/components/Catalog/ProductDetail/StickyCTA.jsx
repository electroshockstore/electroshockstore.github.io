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
import CTAPill from '../../Shared/CTAPill';
import WhatsAppIcon from '../../Shared/WhatsAppIcon';
import { formatPriceNumber } from '../../../utils/priceFormatter';
import { trackWhatsAppClick, trackShareProduct } from '../../../utils/analytics';

const WHATSAPP_PHONE = '5491125718382';

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

          <CTAPill
            variant="green"
            size="sm"
            label="Consultar"
            prefix={<WhatsAppIcon className="h-4 w-4 shrink-0" />}
            onClick={handleWhatsApp}
            ariaLabel="Consultar por WhatsApp"
          />
        </div>
      </div>
    </div>
  );
};

export default StickyCTA;
