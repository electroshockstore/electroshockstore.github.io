// Información adicional del producto
import { Info } from 'lucide-react';

const AdditionalInfo = ({ category }) => {
  return (
    <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-gray-200">
      <div className="flex items-start gap-3">
        <Info className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
        <div className="grid grid-cols-1 gap-3 text-sm flex-1">
          <div>
            <span className="text-gray-500 font-medium block mb-1">
              Categoría
            </span>
            <span className="font-bold text-gray-900">{category}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfo;
