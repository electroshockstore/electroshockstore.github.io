import { AlertTriangle } from 'lucide-react';

const AdditionalInfoSection = () => {
  return (
    <div className="relative bg-gradient-to-br from-yellow-900/30 via-orange-900/20 to-yellow-900/30 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border border-yellow-500/40 overflow-hidden">
      <div className="relative flex flex-col sm:flex-row items-start gap-6">
        <div className="bg-yellow-500/20 backdrop-blur-sm p-5 rounded-2xl border border-yellow-500/30 flex-shrink-0">
          <AlertTriangle className="w-10 h-10 text-yellow-400" strokeWidth={2.5} />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl sm:text-3xl font-black text-white mb-4">Importante sobre los horarios</h3>
          <p className="text-gray-300 text-lg leading-relaxed mb-4">
            <strong className="text-yellow-400 font-black">No viajo a otro lado</strong>, solo tengo esos horarios por falta de tiempo.
          </p>
          <p className="text-gray-400 leading-relaxed">
            Por favor, coordiná con anticipación tu retiro para asegurar que puedas llegar en el horario establecido.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfoSection;
