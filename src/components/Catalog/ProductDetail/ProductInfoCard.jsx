// Card unificada de información del producto - Editorial Premium
import { Cpu, Tag, ExternalLink, MapPin, Banknote, MessageCircle } from 'lucide-react';
import WhatsAppButton from '../../Shared/WhatsAppButton';
import ShareButton from '../../Shared/ShareButton';
import { formatPriceNumber } from '../../../utils/priceFormatter';

const ProductInfoCard = ({
  name,
  brand,
  model,
  description,
  price,
  product,
  ctasRef
}) => {
  return (
    <div className="pic-root">
      {/* Línea de acento - Solo desktop */}
      <div className="pic-accent-bar hidden lg:block" />

      {/* ── BADGES ── */}
      <div className="pic-badges">
        <span className="pic-badge-brand">
          <Cpu style={{ width: 10, height: 10 }} />
          {brand}
        </span>
        <span className="pic-badge-model">
          <Tag style={{ width: 10, height: 10 }} />
          {model}
        </span>
        {product.manufacturerUrl && (
          <a href={product.manufacturerUrl} target="_blank" rel="noopener noreferrer" className="pic-badge-url">
            Web oficial
            <ExternalLink style={{ width: 10, height: 10 }} />
          </a>
        )}
      </div>

      {/* ── TÍTULO ── */}
      <div className="pic-title-zone">
        <h1 className="pic-title">{name}</h1>
      </div>

      {/* ── DESCRIPCIÓN ── */}
      <div className="pic-desc-zone">
        <p className="pic-desc">{description}</p>
      </div>

      {/* ── PRECIO ── */}
      <div className="pic-price-zone">
        <div>
          <div className="pic-price-label">Precio</div>
          <div className="pic-price-value">
            <span className="pic-price-currency">$</span>
            <span className="pic-price-number">{formatPriceNumber(price)}</span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <div className="pic-stock-dot" />
          <span className="pic-stock-label">Stock</span>
        </div>
      </div>

      {/* ── CTAs ── */}
      <div className="pic-ctas" ref={ctasRef}>
        <ShareButton productName={name} product={product} />
        <WhatsAppButton productName={name} product={product} />
      </div>

      {/* ── FILA DE CONFIANZA (Fase 3.3) ── */}
      <div className="pic-trust" aria-label="Información de compra">
        <div className="pic-trust-item">
          <MapPin className="pic-trust-icon" strokeWidth={2.25} />
          <span>Retiro en puntos</span>
        </div>
        <div className="pic-trust-item">
          <Banknote className="pic-trust-icon" strokeWidth={2.25} />
          <span>Efectivo o transferencia</span>
        </div>
        <div className="pic-trust-item">
          <MessageCircle className="pic-trust-icon" strokeWidth={2.25} />
          <span>Atención por WhatsApp</span>
        </div>
      </div>
    </div>
  );
};

export default ProductInfoCard;