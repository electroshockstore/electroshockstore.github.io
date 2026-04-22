import { useState } from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../../../utils/formatPrice';
import FlashSaleWhatsAppButton from './FlashSaleWhatsAppButton';

/**
 * FlashSaleProduct — Brutalist product card con acento lime
 */
const FlashSaleProduct = ({ 
  product, 
  index,
  discountPercentage,
  originalPrice,
  discountedPrice,
  savings,
  isLowStock 
}) => {
  const [hovered, setHovered] = useState(false);
  const [imgHovered, setImgHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        group relative flex flex-col cursor-pointer
        border rounded-xl overflow-hidden
        transition-all duration-300 ease-out
        ${hovered
          ? 'border-lime-400/40 -translate-y-1 shadow-[0_12px_40px_rgba(0,0,0,0.5),0_0_0_1px_rgba(200,245,25,0.12),inset_0_1px_0_rgba(200,245,25,0.06)]'
          : 'border-white/7 translate-y-0 shadow-none'
        }
        opacity-0 animate-[fadeSlideUp_0.45s_cubic-bezier(0.22,1,0.36,1)_forwards]
      `}
      style={{ animationDelay: `${index * 0.08 + 0.3}s` }}
    >
      {/* Image — fondo blanco uniforme */}
      <div
        onMouseEnter={() => setImgHovered(true)}
        onMouseLeave={() => setImgHovered(false)}
        className="relative aspect-square bg-white overflow-hidden"
      >
        <img
          src={product.images?.[0] || ""}
          alt={product.name}
          className={`w-full h-full object-contain p-5 transition-transform duration-500 ease-out ${
            imgHovered ? 'scale-105' : 'scale-100'
          }`}
          loading="lazy"
          onError={(e) => { e.target.style.display = "none"; }}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.06) 100%)'
          }}
        />

        {/* Discount badge — más grande y bold */}
        <div className="absolute top-3 right-3 z-10 bg-lime-400 text-[#09090d] text-sm font-black px-3 py-1 rounded-full font-mono tracking-tight shadow-md">
          -{discountPercentage}%
        </div>

        {isLowStock && (
          <div className="absolute top-3 left-3 z-10 bg-lime-400 text-[#09090d] text-[11px] font-black px-3 py-1.5 rounded-lg uppercase tracking-wide font-mono flex items-center gap-2 shadow-md">
            <span className="w-2 h-2 bg-[#09090d] rounded-full animate-pulse" />
            ¡Últimas {product.stock}!
          </div>
        )}
      </div>

      {/* Separator lime */}
      <div
        className="h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(200,245,25,0.25) 50%, transparent 100%)'
        }}
      />

      {/* Body — footer brutalist rediseñado */}
      <div className="flex flex-col flex-1 p-4 gap-3">

        {/* Nombre del producto */}
        <h3
          className={`font-sans text-xs font-extrabold uppercase tracking-wider leading-tight m-0 transition-colors duration-200 ${
            hovered ? 'text-lime-400' : 'text-gray-200'
          }`}
        >
          {product.name}
        </h3>

        {product.subtitle && (
          <p className="font-mono text-[10px] text-gray-500 -mt-1.5 leading-snug">
            {product.subtitle}
          </p>
        )}

        {/* Bloque de precio — jerarquía visual fuerte */}
        <div className="flex flex-col gap-1 mt-auto">

          {/* Precio tachado + badge ahorro en una fila */}
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-xs text-gray-500 line-through">
              {formatPrice(originalPrice)}
            </span>
            <span className="bg-lime-400/10 border border-lime-400/30 text-lime-400 font-mono text-[10px] font-bold px-2 py-0.5 rounded-md tracking-wide">
              − {formatPrice(savings)}
            </span>
          </div>

          {/* Precio final — protagonista absoluto */}
          <span className="font-mono text-[32px] font-bold text-white tracking-tight leading-none">
            {formatPrice(discountedPrice)}
          </span>

          {/* Cuotas o saving pill */}
          <div className="flex items-center gap-1.5">
            <svg
              width="12" height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-lime-400 shrink-0"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span className="font-sans text-lime-400 text-[11px] font-bold tracking-wide">
              Ahorrás {formatPrice(savings)} hoy
            </span>
          </div>
        </div>

        {/* Divider interno sutil */}
        <div className="h-px bg-white/5 w-full" />

        {/* CTA — WhatsApp button para oferta flash */}
        <FlashSaleWhatsAppButton 
          product={product}
          discountPercentage={discountPercentage}
        />

      </div>
    </div>
  );
};

FlashSaleProduct.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    stock: PropTypes.number,
  }).isRequired,
  index: PropTypes.number.isRequired,
  discountPercentage: PropTypes.number.isRequired,
  originalPrice: PropTypes.number.isRequired,
  discountedPrice: PropTypes.number.isRequired,
  savings: PropTypes.number.isRequired,
  isLowStock: PropTypes.bool.isRequired,
};

export default FlashSaleProduct;