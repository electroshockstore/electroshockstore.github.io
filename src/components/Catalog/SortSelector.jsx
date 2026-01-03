import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

const SortSelector = ({ sortOrder, onSortChange }) => {
  // Función para rotar los estados: null -> asc -> desc -> null
  const handleToggle = () => {
    if (!sortOrder) onSortChange('asc');
    else if (sortOrder === 'asc') onSortChange('desc');
    else onSortChange(null);
  };

  return (
    <div className="inline-flex bg-gray-100 rounded-full p-1 sm:p-1.5 shadow-lg shadow-gray-300/50">
      <button
        onClick={handleToggle}
        className={`
          flex items-center justify-center gap-2 px-4
          h-10 sm:h-12 rounded-full
          transition-all duration-200 min-w-[120px] sm:min-w-[140px]
          ${sortOrder 
            ? 'bg-blue-600 text-white shadow-[0_4px_12px_rgba(37,99,235,0.3)] scale-[1.02]' 
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }
        `}
      >
        {sortOrder === 'asc' ? (
          <>
            <ArrowUp className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.5} />
            <span className="text-xs sm:text-sm font-bold whitespace-nowrap">Menor precio</span>
          </>
        ) : sortOrder === 'desc' ? (
          <>
            <ArrowDown className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.5} />
            <span className="text-xs sm:text-sm font-bold whitespace-nowrap">Mayor precio</span>
          </>
        ) : (
          <>
            <ArrowUpDown className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.5} />
            <span className="text-xs sm:text-sm font-bold whitespace-nowrap">Ordenar</span>
          </>
        )}
      </button>
    </div>
  );
};

export default SortSelector;