import PropTypes from 'prop-types';
import { Check, Zap } from 'lucide-react';
import { formatPrice } from '../../../utils/formatPrice';
import FlashSaleWhatsAppButton from '../FlashSale/FlashSaleWhatsAppButton';


const FlashSaleCard = ({ product, index }) => {
  const originalPrice = product.price;
  const discountedPrice = Math.round(
    originalPrice * (1 - product.discountPercentage / 100),
  );
  const savings = originalPrice - discountedPrice;
  const isLowStock = product.stock != null && product.stock <= 5;

  return (
    <article
      className={`
        group relative flex h-full flex-col overflow-hidden
        border border-[#9e9e9e] bg-[#f6f6f6]
        transition-[transform,box-shadow,border-color] duration-300 ease-out
        hover:-translate-y-1 hover:border-[#0e0e0e]
        hover:shadow-[0_20px_45px_-20px_rgba(14,14,14,0.4)]
        ${index > 0 ? '-ml-px' : ''}
      `}
    >
      {/* Barra de acento lima */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-10 h-[4px] origin-left scale-x-0 bg-[#c8f519] transition-transform duration-300 group-hover:scale-x-100"
      />

      {/* Imagen */}
      <div className="relative aspect-[4/3] overflow-hidden border-b border-[#9e9e9e] bg-white">
        <img
          src={product.images?.[0] || ''}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-contain p-5 transition-transform duration-500 ease-out group-hover:scale-105"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />

        {/* Descuento */}
        <span className="pill-lime flash-shine absolute right-3 top-3 z-10 px-3 py-1 font-mono text-sm font-black tracking-tight transition-transform duration-300 group-hover:scale-110">
          -{product.discountPercentage}%
        </span>

        {/* Stock bajo (urgencia) */}
        {isLowStock && (
          <span className="absolute left-3 top-3 z-10 flex items-center gap-1.5 bg-[#0e0e0e] px-3 py-1 font-mono text-[11px] font-black uppercase tracking-wide text-[#c8f519]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#c8f519] motion-reduce:animate-none animate-pulse" />
            ¡Últimas {product.stock}!
          </span>
        )}
      </div>

      {/* Cuerpo */}
      <div className="flex flex-1 flex-col gap-3 p-6">
        {/* Índice + ícono */}
        <div className="flex items-center justify-between">
          <span className="landing-mono text-[12px] font-black tracking-[0.14em] text-[#6f6f6f]">
            0{index + 1}
          </span>
          <Zap
            className="h-4 w-4 text-[#9e9e9e] transition-colors duration-200 group-hover:text-[#c8f519]"
            strokeWidth={1.75}
            fill="currentColor"
            aria-hidden="true"
          />
        </div>

        {/* Nombre */}
        <h3 className="font-black uppercase leading-tight tracking-[-0.01em] text-[#0e0e0e] text-[clamp(16px,1.2vw,20px)]">
          {product.name}
        </h3>

        {product.subtitle && (
          <p className="landing-mono -mt-1 text-[13px] font-bold leading-snug text-[#3a3a3a]">
            {product.subtitle}
          </p>
        )}

        {/* Precios */}
        <div className="mt-auto flex flex-col gap-2 border-t border-[#9e9e9e] pt-4">
          {/* Precio anterior (rojo) + ahorro (verde) */}
          <div className="flex items-center justify-between gap-2">
            <span className="landing-mono text-[14px] font-bold text-red-600 line-through decoration-red-600 decoration-2">
              {formatPrice(originalPrice)}
            </span>

            <span className="flex items-center gap-1 border border-green-600/25 bg-green-600/10 px-2 py-0.5 font-mono text-[11px] font-black text-green-700">
              <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
              {formatPrice(savings)}
            </span>
          </div>

          {/* Precio final — protagonista */}
          <span className="origin-left font-black tracking-[-0.02em] text-[#0e0e0e] text-[clamp(28px,2.6vw,40px)] leading-none transition-transform duration-300 group-hover:scale-[1.03]">
            {formatPrice(discountedPrice)}
          </span>

          {/* Ahorro (verde con indicador) */}
          <span className="landing-mono flex items-center gap-1.5 text-[12px] font-black uppercase tracking-[0.05em] text-green-700">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-green-600 text-white">
              <Check className="h-2.5 w-2.5" strokeWidth={3.5} aria-hidden="true" />
            </span>
            Ahorrás {formatPrice(savings)}
          </span>
        </div>

        {/* CTA WhatsApp (reutilizado) */}
        <FlashSaleWhatsAppButton
          product={product}
          discountPercentage={product.discountPercentage}
        />
      </div>
    </article>
  );
};

FlashSaleCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    discountPercentage: PropTypes.number.isRequired,
    subtitle: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    stock: PropTypes.number,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default FlashSaleCard;
