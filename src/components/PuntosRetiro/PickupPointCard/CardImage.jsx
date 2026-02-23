import { memo } from 'react';

const CardImage = memo(({ image, name }) => (
  <div className="relative h-48 sm:h-60 overflow-hidden flex-shrink-0">
    <img
      src={image}
      alt={name}
      className="ppc-img w-full h-full object-cover"
      loading="lazy"
      decoding="async"
    />
    {/* Gradient overlay */}
    <div 
      className="absolute inset-0" 
      style={{
        background: 'linear-gradient(to top, #111827 0%, rgba(17,24,39,0.65) 45%, rgba(0,0,0,0.15) 100%)'
      }} 
    />
  </div>
));

CardImage.displayName = 'CardImage';

export default CardImage;
