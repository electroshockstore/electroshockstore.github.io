const stripLeadingBrand = (name, brand) => {
  if (!name || !brand) return name;
  const esc = brand.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const short = name.replace(new RegExp(`^${esc}\\s*[-–—:]?\\s*`, 'i'), '').trim();
  return short || name;
};

const ProductInfo = ({ name, brand, isUsed = false, isDDR5, isDDR4, certType }) => {
  const displayName = isUsed
    ? `${stripLeadingBrand(name, brand)} - USADA`
    : stripLeadingBrand(name, brand);
  
  // Mapeo de certificaciones a imágenes
  const getCertImage = () => {
    if (certType === '80_PLUS_GOLD') return '/images/fuentes/80_plusgold.webp';
    if (certType === '80_PLUS_BRONZE') return '/images/fuentes/80_plusbz.webp';
    // Puedes agregar más certificaciones aquí en el futuro
    return null;
  };
  
  const certImage = getCertImage();
  const showBadge = isDDR5 || isDDR4 || certImage;
  
  return (
    <div className="space-y-1 text-left">
      {/* 1. Marca + badge (DDR / certificación, el que corresponda) - Altura fija */}
      <div className="flex items-center justify-between mb-1 sm:mb-2 min-h-[44px]">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] sm:text-xs font-bold text-blue-600 tracking-wider uppercase truncate">
            {brand}
          </span>
        </div>

        {/* Badge - Visible en mobile y desktop */}
        <div className="flex items-center gap-2">
          {/* Logo DDR5 o DDR4 */}
          {isDDR5 && (
            <img
              src="/images/ram/ddr5_logo.webp"
              alt="DDR5"
              className="h-10 sm:h-10 w-auto object-contain"
              loading="lazy"
            />
          )}
          {isDDR4 && (
            <img
              src="/images/ram/ddr4_logo.webp"
              alt="DDR4"
              className="h-10 sm:h-10 w-auto object-contain"
              loading="lazy"
            />
          )}

          {/* Certificación 80 Plus */}
          {certImage && (
            <img
              src={certImage}
              alt={certType?.replace(/_/g, ' ')}
              className="h-10 sm:h-10 w-auto object-contain"
              loading="lazy"
            />
          )}
        </div>
      </div>

      {/* 2. Título - Altura fija con line-clamp (block para que el clamp sea fiable) */}
      <div className="min-h-[52px] sm:min-h-[56px]">
        <h3 className="block text-left px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl
                      font-black text-xs sm:text-xs text-white line-clamp-2 max-w-full break-words
                      bg-gradient-to-r from-blue-600 to-purple-600 
                      shadow-lg sm:shadow-xl border sm:border-2 border-blue-500
                      transition-all duration-300 leading-tight">
          {displayName}
        </h3>
      </div>
      
    </div>
  );
};

export default ProductInfo;
