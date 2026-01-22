import { X, FileText } from 'lucide-react';

const ConditionsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl shadow-2xl max-w-2xl w-full border border-gray-700/50 overflow-hidden modal-scale-enter"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-blue-500/10 pointer-events-none" />
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-2 transition-all duration-200 hover:scale-110 border border-white/20"
        >
          <X className="w-5 h-5 text-white" strokeWidth={2.5} />
        </button>

        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-center gap-3">
            <div className="bg-orange-500/20 backdrop-blur-sm p-3 rounded-xl border border-orange-500/30">
              <FileText className="w-6 h-6 text-orange-400" strokeWidth={2.5} />
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
              className="max-w-full max-h-[60vh] sm:max-h-[70vh] w-auto h-auto object-contain rounded-xl shadow-2xl border border-gray-700/50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex justify-center">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-orange-500/50 hover:scale-105"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConditionsModal;
