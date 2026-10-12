import { memo } from 'react';

const CardImage = memo(({ image, name, index }) => (
  <div className="ppc-media relative h-44 sm:h-60 lg:h-72 overflow-hidden flex-shrink-0">
    <img
      src={image}
      alt={name}
      className="ppc-img w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
      loading="lazy"
      decoding="async"
    />
    {/* Scrim cinematográfico */}
    <div className="absolute inset-0 card-image-overlay" />
    {/* Brillo lima superior al hover (solo desktop) */}
    <span
      aria-hidden="true"
      className="absolute inset-x-0 top-0 hidden h-1 origin-left scale-x-0 bg-[#c8f519] transition-transform duration-300 group-hover:scale-x-100 lg:block"
    />

    {/* Esquinas de registro (solo desktop) */}
    <span aria-hidden="true" className="absolute left-2.5 top-2.5 hidden h-2.5 w-2.5 border-l-2 border-t-2 border-white/90 lg:block" />
    <span aria-hidden="true" className="absolute right-2.5 top-2.5 hidden h-2.5 w-2.5 border-r-2 border-t-2 border-white/90 lg:block" />

    {/* Número fantasma (solo desktop) */}
    <span
      aria-hidden="true"
      className="landing-pixel absolute right-3 top-1.5 hidden text-5xl leading-none text-white/30 lg:block"
    >
      {String(index).padStart(2, '0')}
    </span>
  </div>
));

CardImage.displayName = 'CardImage';

export default CardImage;
