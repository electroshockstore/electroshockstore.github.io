import PropTypes from 'prop-types';

/** Número gigante de fondo (outline) que se apoya en la esquina de la card. */
const GhostNumber = ({ value }) => (
  <span
    aria-hidden="true"
    className="landing-pixel pointer-events-none absolute -right-2 -top-4 select-none text-[8rem] leading-none text-transparent"
    style={{ WebkitTextStroke: '3px rgba(14,14,14,0.14)' }}
  >
    {value}
  </span>
);

GhostNumber.propTypes = {
  value: PropTypes.string.isRequired,
};

export default GhostNumber;
