import { Send, X } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';

/**
 * MainButton - Botón principal del FloatingChatButton
 * Diseño circular en mobile, con texto en desktop
 */
const MainButton = ({ isExpanded, showButton, showHint, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`fcb-main-button group relative overflow-visible transition-all duration-500 ease-out
                 ${showButton
                   ? 'opacity-100 scale-100 pointer-events-auto'
                   : 'opacity-0 scale-90 pointer-events-none'
                 }
                 ${isExpanded ? 'fcb-main-button--open' : ''}`}
      aria-label={isExpanded ? 'Cerrar menú' : 'Abrir menú de ayuda'}
    >
      {/* Notification badge - Solo cuando está cerrado */}
      {!isExpanded && (
        <span className="fcb-notification-badge" />
      )}

      {/* Contenido del botón */}
      <div className="fcb-button-content">
        {/* Icono */}
        <div className="fcb-icon-container">
          {isExpanded ? (
            <X className="w-6 h-6 sm:w-[18px] sm:h-[18px]" strokeWidth={2.5} />
          ) : (
            <WhatsAppIcon className="w-6 h-6 sm:w-[18px] sm:h-[18px]" />
          )}
        </div>

        {/* Texto - Solo desktop */}
        <div className="fcb-text-group">
          <span className="fcb-eyebrow">¿Necesitás ayuda?</span>
          <span className="fcb-label">Chatea con nosotros</span>
        </div>

        {/* Arrow - Solo desktop cuando está cerrado */}
        {!isExpanded && (
          <Send className="fcb-arrow" size={14} strokeWidth={2.5} />
        )}
      </div>

      {/* Hint tooltip - Solo mobile */}
      {showHint && !isExpanded && (
        <div className="fcb-hint-tooltip">
          ¡Tocá para ayuda!
        </div>
      )}

      {/* Shine effect - Solo desktop */}
      <div className="fcb-shine" />
    </button>
  );
};

export default MainButton;
