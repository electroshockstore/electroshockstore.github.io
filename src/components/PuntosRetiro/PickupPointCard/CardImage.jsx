import { memo } from 'react';

const CardImage = memo(({ image, name }) => (
  <div className="relative h-56 overflow-hidden flex-shrink-0">
    <img
      src={image}
      alt={name}
      className="w-full h-full object-cover transition-transform duration-[350ms] cubic-bezier-smooth hover:scale-105"
      loading="lazy"
      decoding="async"
    />
    {/* Gradient overlay más suave */}
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A1024]/80" />
  </div>
));

CardImage.displayName = 'CardImage';

export default CardImage;
