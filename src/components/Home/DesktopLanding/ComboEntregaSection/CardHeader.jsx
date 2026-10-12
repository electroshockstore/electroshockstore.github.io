import PropTypes from 'prop-types';

/** Encabezado brutalista: chip lima sobre negro + índice lima a la derecha. */
const CardHeader = ({ icon: Icon, badge, index }) => (
  <div className="relative z-10 flex items-stretch justify-between border-b-[3px] border-[#0e0e0e] bg-[#0e0e0e]">
    <span className="landing-mono inline-flex items-center gap-2 bg-[#c8f519] px-4 py-3 text-[12px] font-black uppercase tracking-[0.1em] text-[#0e0e0e] transition-colors duration-200 group-hover:bg-[#0e0e0e] group-hover:text-[#c8f519]">
      <Icon className="h-4 w-4" strokeWidth={3} />
      {badge}
    </span>

    <span className="landing-mono inline-flex items-center px-4 text-[12px] font-black uppercase tracking-[0.18em] text-[#c8f519]">
      {index}
    </span>
  </div>
);

CardHeader.propTypes = {
  icon: PropTypes.elementType.isRequired,
  badge: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired,
};

export default CardHeader;
