import { memo } from 'react';
import CornerMark from './CornerMark';
import CardBadges from './CardBadges';

const CardImage = memo(({ image, alt, accent, quantity, discountPercentage, horizontal = false }) => {
  return (
    <div 
      className={`relative overflow-hidden bg-[#0e0e10] flex-shrink-0 ${horizontal ? 'w-2/5' : 'w-full'}`}
      style={{ aspectRatio: horizontal ? 'auto' : '1/1' }}
    >
      {/* Glow ambient effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-80"
        style={{ background: `radial-gradient(ellipse 80% 70% at 50% 50%, ${accent}20 0%, transparent 70%)` }}
      />

      {/* IMAGE - maximizada en mobile y desktop */}
      <img
        src={image}
        alt={alt}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-contain p-3 sm:p-4"
        style={{ 
          filter: 'brightness(1.1) contrast(1.08)',
          transform: 'scale(1.1)'
        }}
      />

      {/* Badges */}
      <CardBadges 
        quantity={quantity} 
        discountPercentage={discountPercentage} 
        accent={accent} 
      />

      {/* Corner marks */}
      <CornerMark className="absolute top-2 right-2 sm:top-3 sm:right-3 text-white/20" />
      <CornerMark className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 text-white/20 rotate-180" />
    </div>
  );
});

CardImage.displayName = 'CardImage';
export default CardImage;
