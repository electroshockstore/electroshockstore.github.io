import PropTypes from 'prop-types';

/** Badge flotante brutalista (borde + sombra dura) que se apoya sobre el render. */
const FloatingBadge = ({ prefix, label, Icon, className }) => (
  <span
    className={`absolute z-20 inline-flex items-center gap-1.5 border-[3px] border-[#0e0e0e] px-2.5 py-1.5 text-white shadow-[4px_4px_0_0_#0e0e0e] transition-transform duration-300 group-hover:scale-105 ${className}`}
  >
    <span className="border-2 border-white/70 bg-white/20 p-0.5">
      <Icon className="h-3.5 w-3.5" strokeWidth={3} />
    </span>

    <span className="leading-tight">
      <span className="landing-mono block text-[8px] font-black uppercase tracking-[0.14em] opacity-90">
        {prefix}
      </span>
      <span className="block text-[13px] font-black uppercase tracking-[-0.01em]">
        {label}
      </span>
    </span>
  </span>
);

FloatingBadge.propTypes = {
  prefix: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  Icon: PropTypes.elementType.isRequired,
  className: PropTypes.string,
};

export default FloatingBadge;
