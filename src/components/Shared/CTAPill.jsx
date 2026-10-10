import { ArrowRight } from 'lucide-react';

/**
 * CTAPill — CTA estilo pill Apple: etiqueta + círculo de acción con flecha.
 *
 * Patrón único para todo CTA con icono/flecha de la app. El hover desplaza
 * la flecha y el press escala la pill (ver `.cta-pill` en Index.css).
 * La tipografía se hereda/pasa por `className`; los colores por `variant`.
 *
 * @param {React.ReactNode} label - Texto principal (o bloque).
 * @param {React.ReactNode} [caption] - Línea pequeña sobre el label.
 * @param {React.ReactNode} [prefix] - Icono a la izquierda del texto.
 * @param {React.ReactNode} [suffix] - Contenido extra antes del círculo.
 * @param {string} [labelClassName] - Clases extra para el bloque de texto.
 * @param {React.ReactNode} [circleIcon] - Icono del círculo (default flecha).
 * @param {string} [circleClassName] - Clases extra para el círculo.
 * @param {'light'|'lime'|'dark'|'carbon'|'blue'|'green'|'brand'|'bare'} [variant]
 * @param {'sm'|'md'|'lg'} [size]
 * @param {boolean} [flat] - Sin press-scale (filas/botones anchos).
 */
const VARIANTS = {
  light: { pill: 'bg-white text-[#0a0a0f]', circle: 'bg-[#0a0a0f] text-white' },
  lime: { pill: 'bg-cyber-lime text-cyber-bg', circle: 'bg-cyber-bg text-cyber-lime' },
  dark: {
    pill: 'bg-cyber-surface text-white border border-cyber-line',
    circle: 'bg-cyber-cyan text-cyber-bg',
  },
  carbon: {
    pill: 'bg-cyber-surface text-white border border-cyber-line',
    circle: 'bg-cyber-lime text-cyber-bg',
  },
  blue: { pill: 'bg-blue-600 text-white', circle: 'bg-white text-blue-600' },
  brand: {
    pill: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white',
    circle: 'bg-white text-purple-600',
  },
  green: { pill: 'bg-green-600 text-white', circle: 'bg-white text-green-600' },
  bare: { pill: '', circle: 'bg-cyber-cyan text-cyber-bg' },
};

const SIZES = {
  sm: {
    pill: 'gap-2.5 pl-4 pr-2 py-2 text-xs',
    circle: 'h-7 w-7',
    icon: 'h-3.5 w-3.5',
  },
  md: {
    pill: 'gap-3 pl-6 pr-2.5 py-2.5 text-sm',
    circle: 'h-9 w-9',
    icon: 'h-4 w-4',
  },
  lg: {
    pill: 'gap-3 pl-7 pr-3 py-3 text-base',
    circle: 'h-10 w-10',
    icon: 'h-5 w-5',
  },
};

const CTAPill = ({
  label,
  caption,
  prefix,
  suffix,
  circleIcon,
  circleClassName = '',
  variant = 'lime',
  size = 'md',
  flat = false,
  className = '',
  labelClassName = '',
  style,
  onClick,
  type = 'button',
  ariaLabel,
  disabled = false,
  ...rest
}) => {
  const v = VARIANTS[variant] || VARIANTS.lime;
  const s = SIZES[size] || SIZES.md;

  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
      style={style}
      {...rest}
      className={`cta-pill group inline-flex items-center justify-between rounded-full font-bold ${v.pill} ${s.pill} ${flat ? 'cta-pill-flat' : ''} ${className}`}
    >
      <span className="flex min-w-0 items-center gap-2.5">
        {prefix}
        <span className={`flex min-w-0 flex-col items-start leading-tight ${labelClassName}`}>
          {caption && (
            <span className="text-[11px] font-semibold leading-tight opacity-80">
              {caption}
            </span>
          )}
          <span className="truncate">{label}</span>
        </span>
      </span>
      {suffix}
      <span
        className={`cta-pill-circle flex shrink-0 items-center justify-center rounded-full ${v.circle} ${s.circle} ${circleClassName}`}
      >
        {circleIcon || <ArrowRight className={s.icon} strokeWidth={2.5} />}
      </span>
    </button>
  );
};

export default CTAPill;
