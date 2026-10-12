import PropTypes from 'prop-types';

import CardHeader from './CardHeader';

/**
 * ComboCard — shell neo-brutalista de las cards de la sección.
 * Esquinas cuadradas, borde negro grueso + sombra dura que se "aprieta"
 * al hover, filete lima superior.
 *
 * Layout vertical: `media` (banner superior a fondo) + `content` abajo.
 */
const ComboCard = ({ icon, badge, index, content, media }) => (
  <article className="group relative flex h-full min-h-[540px] flex-col overflow-hidden rounded-none border-[3px] border-[#0e0e0e] bg-[#f6f6f6] shadow-[8px_8px_0_0_#0e0e0e] transition-all duration-200 hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0_0_#c8f519]">
    {/* Filete lima que recorre arriba al hover */}
    <span
      aria-hidden="true"
      className="absolute inset-x-0 top-0 z-20 h-[4px] origin-left scale-x-0 bg-[#c8f519] transition-transform duration-300 group-hover:scale-x-100"
    />

    <CardHeader icon={icon} badge={badge} index={index} />

    {/* Render a fondo */}
    <div className="relative overflow-hidden border-b-[3px] border-[#0e0e0e]">
      {media}
    </div>

    {/* Contenido */}
    <div className="relative flex flex-1 flex-col justify-between gap-4 p-5 lg:p-6">
      {content}
    </div>
  </article>
);

ComboCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  badge: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  media: PropTypes.node.isRequired,
};

export default ComboCard;
