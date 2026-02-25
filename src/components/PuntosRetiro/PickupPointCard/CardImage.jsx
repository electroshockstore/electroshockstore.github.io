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
    <div className="absolute inset-0 card-image-overlay" />
  </div>
));

CardImage.displayName = 'CardImage';

export default CardImage;
