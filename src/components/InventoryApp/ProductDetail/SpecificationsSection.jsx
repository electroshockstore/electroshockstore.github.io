// Sección de especificaciones técnicas
import { useState } from 'react';
import { Zap } from 'lucide-react';

const SpecificationsSection = ({ specifications }) => {
  const [showSpecs, setShowSpecs] = useState(true);

  if (!specifications) return null;

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
      <button
        onClick={() => setShowSpecs(!showSpecs)}
        className="w-full px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <h3 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
          <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
          Especificaciones
        </h3>
        <div
          className={`transform transition-transform duration-300 ${
            showSpecs ? 'rotate-180' : ''
          }`}
        >
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      <div
        className={`transition-all duration-300 ease-in-out ${
          showSpecs ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        } overflow-auto`}
      >
        <div className="px-4 sm:px-6 pb-4 sm:pb-6 space-y-2 sm:space-y-3">
          {Object.entries(specifications).map(([key, value], index) => (
            <div
              key={key}
              className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 px-3 rounded-xl transition-colors"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="text-gray-600 font-medium text-sm">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </span>
              <span className="font-bold text-gray-900">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecificationsSection;
