/**
 * BrandLockup — isotipo oficial ElectroShock.
 *
 * ELECTRO (blanco con stroke) + SHOCK (amarillo trueno) fusionados con el
 * rayo de `/logotipo_tiny.webp` solapado encima.
 *
 * Reutilizable en header landing, hero, headers de catálogo/producto,
 * mobile y footer:
 *   <BrandLockup onClick={goHome} />                    → header (md)
 *   <BrandLockup size="lg" />                           → hero (estático)
 *   <BrandLockup size="sm" onClick={goHome} />          → mobile / footer
 *
 * Sin `onClick` renderiza `span` (no interactivo, válido dentro de h1).
 */
const SIZES = {
  sm: {
    electro: 'text-[14px]',
    shock: 'text-[17px] -mt-0.5',
    mark: 'h-[52px]',
    overlap: '-ml-8',
  },
  md: {
    electro: 'text-[18px] lg:text-[20px] xl:text-[22px]',
    shock: 'text-[23px] lg:text-[26px] xl:text-[29px] -mt-1',
    mark: 'h-[82px] lg:h-[94px]',
    overlap: '-ml-12',
  },
  lg: {
    electro: 'text-[40px] xl:text-[56px]',
    shock: 'text-[52px] xl:text-[70px] -mt-2',
    mark: 'h-[130px] xl:h-[180px]',
    overlap: '-ml-16 xl:-ml-20',
  },
};

const BrandLockup = ({
  onClick,
  size = 'md',
  className = '',
  label = 'ElectroShock — inicio',
}) => {
  const s = SIZES[size] || SIZES.md;
  const Tag = onClick ? 'button' : 'span';

  return (
    <Tag
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={`group flex shrink-0 select-none items-center transition-transform duration-300 focus:outline-none ${className}`}
      aria-label={label}
    >
      <span className="relative flex items-center">
        {/* Bloque de textos con inclinación */}
        <span className="relative z-10 flex -skew-x-12 flex-col items-start leading-none">
          {/* ELECTRO: blanco con stroke y resplandor azulejo cibernético */}
          <span
            className={`font-sans font-black tracking-tight text-white ${s.electro} [text-shadow:0_0_8px_rgba(0,180,255,0.8),1px_1px_0_#000,-1px_-1px_0_#000,1px_-1px_0_#000,-1px_1px_0_#000]`}
          >
            ELECTRO
          </span>

          {/* SHOCK: amarillo trueno pegado a ELECTRO */}
          <span
            className={`font-sans font-black tracking-tighter text-[#ffd700] ${s.shock} [text-shadow:2px_2px_0_#000,-1px_-1px_0_#000,1px_-1px_0_#000,-1px_1px_0_#000,0_0_12px_rgba(255,200,0,0.6)]`}
          >
            SHOCK
          </span>
        </span>

        {/* Rayo: solapado sobre las letras */}
        <span className={`pointer-events-none relative z-20 shrink-0 ${s.overlap}`}>
          <img
            src="/logotipo_tiny.webp"
            alt=""
            aria-hidden="true"
            draggable={false}
            className={`${s.mark} w-auto transition-transform duration-300 ease-out group-hover:scale-110 drop-shadow-[0_0_10px_rgba(255,200,0,0.5)]`}
          />
        </span>
      </span>
    </Tag>
  );
};

export default BrandLockup;
