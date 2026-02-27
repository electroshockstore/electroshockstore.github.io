import { Send, MapPin, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import WhatsAppIcon from './WhatsAppIcon';
import MenuHeader from './MenuHeader';

/**
 * ExpandedMenu - Menú expandido con opciones de contacto
 */
const ExpandedMenu = ({ onWhatsAppClick, onConditionsClick }) => {
  const navigate = useNavigate();

  const handleWhatsApp = () => {
    const phoneNumber = '5491125718382';
    const message = encodeURIComponent('Hola, vengo desde su catálogo web para realizar una consulta. ¿Podrían ayudarme?');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    onWhatsAppClick();
  };

  const handlePuntosRetiro = () => {
    navigate('/puntos-de-retiro');
    onWhatsAppClick();
  };

  return (
    <div className="fcb-menu-wrapper">
      <div className="fcb-panel">
        {/* Header decorativo animado */}
        <MenuHeader />

        {/* WhatsApp */}
        <button className="fcb-card fcb-card--green" onClick={handleWhatsApp}>
          <div className="fcb-icon-wrap fcb-icon-wrap--green">
            <WhatsAppIcon className="w-5 h-5 sm:w-[18px] sm:h-[18px]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="fcb-card-label">Atención Directa</div>
            <div className="fcb-card-title">WhatsApp Oficial</div>
            <div className="fcb-card-sub">Respuesta inmediata · Online ahora</div>
          </div>
          <div className="fcb-live" />
          <Send className="fcb-arrow" size={16} strokeWidth={2.5} />
        </button>

        {/* Puntos de Retiro */}
        <button className="fcb-card fcb-card--cyan" onClick={handlePuntosRetiro}>
          <div className="fcb-icon-wrap fcb-icon-wrap--cyan">
            <MapPin className="w-5 h-5 sm:w-[18px] sm:h-[18px]" color="#00e5ff" strokeWidth={2.5} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="fcb-card-label">Ubicaciones</div>
            <div className="fcb-card-title">Puntos de Retiro</div>
            <div className="fcb-card-sub">Ver ubicaciones y horarios</div>
          </div>
          <span className="fcb-badge">NUEVO</span>
          <Send className="fcb-arrow" size={16} strokeWidth={2.5} />
        </button>

        {/* Condiciones */}
        <button className="fcb-card fcb-card--orange" onClick={onConditionsClick}>
          <div className="fcb-icon-wrap fcb-icon-wrap--orange">
            <FileText className="w-5 h-5 sm:w-[18px] sm:h-[18px]" color="#ff6d00" strokeWidth={2.5} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="fcb-card-label">Información</div>
            <div className="fcb-card-title">Condiciones de Venta</div>
            <div className="fcb-card-sub">Términos y políticas</div>
          </div>
          <span className="fcb-badge-alert">!</span>
          <Send className="fcb-arrow" size={16} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};

export default ExpandedMenu;
