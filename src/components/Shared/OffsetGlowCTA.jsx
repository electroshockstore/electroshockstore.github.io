import CTAPill from './CTAPill';

/**
 * OffsetGlowCTA — frente carbón + backing lima desplazado con glow.
 *
 * Patrón de ÉNFASIS MÁXIMO, reservado para el CTA primario sobre
 * superficies oscuras donde no compite con WhatsApp (siempre verde)
 * ni con las pills Apple. Frente redondeado (CTAPill `carbon`) sobre
 * backing lima desplazado (+5px/+4px) con glow exterior sutil.
 * Al presionar, el frente se hunde hacia el backing.
 * Solo transform y sombras estáticas: cero costo por frame.
 *
 * - `breathe`: el círculo respira (scale 1→1.04 en loop). MÁXIMO 1 por
 *   pantalla; se apaga con prefers-reduced-motion y en perf-low.
 * - `disabled`: atenúa el círculo sin cambiar el diseño.
 * - `variant`: frente del CTAPill (default `carbon`). WhatsApp siempre
 *   usa CTAPill `green` directo, nunca este componente.
 */
const OffsetGlowCTA = ({
  label,
  caption,
  prefix,
  suffix,
  circleIcon,
  onClick,
  breathe = false,
  disabled = false,
  variant = 'carbon',
  size = 'md',
  flat = false,
  className = '',
  frontClassName = '',
  labelClassName = '',
  circleClassName = '',
  style,
  ariaLabel,
}) => {
  return (
    <span className={`ogc ${breathe ? 'ogc-breathe' : ''} ${className}`} style={style}>
      <span className="ogc-back" aria-hidden="true" />
      <CTAPill
        variant={variant}
        size={size}
        flat={flat}
        label={label}
        caption={caption}
        prefix={prefix}
        suffix={suffix}
        circleIcon={circleIcon}
        onClick={onClick}
        ariaLabel={ariaLabel}
        disabled={disabled}
        labelClassName={labelClassName}
        circleClassName={`${breathe ? 'ogc-breath-icon' : ''} ${disabled ? 'opacity-40' : ''} ${circleClassName}`}
        className={`ogc-front relative ${frontClassName}`}
      />
    </span>
  );
};

export default OffsetGlowCTA;
