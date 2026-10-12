import PropTypes from 'prop-types';

/**
 * InfoBand — banda negra a sangre (full-bleed) dentro del contenido.
 * Separa la zona de info (descripción + tags) del título y del CTA,
 * dándole identidad propia invertida (blanco/lima sobre negro).
 */
const InfoBand = ({ children }) => (
  <div className="relative -mx-5 border-t-[3px] border-[#c8f519] bg-[#0e0e0e] px-5 py-4 lg:-mx-6 lg:px-6">
    {children}
  </div>
);

InfoBand.propTypes = {
  children: PropTypes.node.isRequired,
};

export default InfoBand;
