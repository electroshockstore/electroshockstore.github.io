import PropTypes from 'prop-types';

const VARIANTS = {
  white: 'bg-white',
  lime: 'bg-[#c8f519]',
};

/** Tag brutalista (borde + sombra dura). Variantes: white / lime. */
const CardTag = ({ children, variant = 'white' }) => (
  <span
    className={`landing-mono border-[3px] border-[#0e0e0e] px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-[#0e0e0e] shadow-[3px_3px_0_0_#0e0e0e] ${VARIANTS[variant]}`}
  >
    {children}
  </span>
);

CardTag.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['white', 'lime']),
};

export default CardTag;
