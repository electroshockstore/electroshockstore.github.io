import { X, FileText } from 'lucide-react';
import Portal from '../Shared/Portal';
import OffsetGlowCTA from '../Shared/OffsetGlowCTA';
import { useEffect } from 'react';

const ConditionsModal = ({ isOpen, onClose }) => {
  // Bloquear scroll cuando modal está abierto
  useEffect(() => {
    if (isOpen) {
      // ⚡ Scroll nativo - No necesita pausarse
      
      return () => {
        // Cleanup si es necesario
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <Portal>
      <div
        className="fixed inset-0 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
        style={{ zIndex: 2147483647 }}
        onClick={onClose}
      >
      <div
        className="relative bg-cyber-surface rounded-3xl shadow-2xl max-w-2xl w-full border border-cyber-line overflow-hidden modal-scale-enter"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-cyber-surface hover:bg-white/10 rounded-full p-2 transition-all duration-200 hover:scale-110 border border-cyber-line"
        >
          <X className="w-5 h-5 text-white" strokeWidth={2.5} />
        </button>

        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-center gap-3">
            <div className="bg-cyber-surface p-3 rounded-xl border border-cyber-line">
              <FileText className="w-6 h-6 text-cyber-lime" strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Condiciones de Venta</h3>
              <p className="text-sm text-gray-400">Información importante</p>
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="px-4 sm:px-6 pb-6 flex items-center justify-center">
          <div className="relative group">
            <img
              src="/images/condiciones_tiny.webp"
              alt="Condiciones de Venta"
              className="max-w-full max-h-[60vh] sm:max-h-[70vh] w-auto h-auto object-contain rounded-xl shadow-2xl border border-cyber-line"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex justify-center">
          <OffsetGlowCTA label="Entendido" onClick={onClose} className="text-sm" />
        </div>
      </div>
      </div>
    </Portal>
  );
};

export default ConditionsModal;
