import { X, FileText } from 'lucide-react';
import Portal from '../Portal';

/**
 * ConditionsModal - Modal para mostrar condiciones de venta
 */
const ConditionsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <Portal>
      <div
        className="fixed inset-0 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md z-[2147483647] animate-in fade-in duration-200"
        onClick={onClose}
      >
        <div
          className="fcb-modal animate-in zoom-in-95 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Accent decorativo */}
          <div className="fcb-modal-accent" />

          {/* Botón cerrar */}
          <button className="fcb-modal-close" onClick={onClose} aria-label="Cerrar modal">
            <X size={16} strokeWidth={2.5} />
          </button>

          {/* Header */}
          <div className="fcb-modal-header">
            <div className="fcb-modal-icon">
              <FileText size={22} strokeWidth={2} />
            </div>
            <div>
              <div className="fcb-modal-title">Condiciones de Venta</div>
              <div className="fcb-modal-subtitle">Información importante antes de comprar</div>
            </div>
          </div>

          {/* Contenido */}
          <div className="fcb-modal-body">
            <img
              src="/images/condiciones_tiny.webp"
              alt="Condiciones de Venta"
              loading="lazy"
            />
          </div>

          {/* Footer */}
          <div className="fcb-modal-footer">
            <button className="fcb-modal-btn" onClick={onClose}>
              Entendido
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default ConditionsModal;
