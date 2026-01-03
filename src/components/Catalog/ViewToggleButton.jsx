import { memo } from 'react';
import { Grid, List } from 'lucide-react';

const ViewToggleButton = memo(({ viewMode, toggleViewMode }) => {
  return (
    // Segmented Control para vista - Responsive
    <div className="inline-flex bg-gray-100 rounded-full p-1 sm:p-1.5 shadow-lg shadow-gray-300/50">
      <button
        onClick={() => viewMode === 'list' && toggleViewMode()}
        className={`
          flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full
          transition-all duration-200
          ${viewMode === 'grid' 
            ? 'bg-blue-600 text-white shadow-[0_4px_12px_rgba(37,99,235,0.3)] scale-105' 
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }
        `}
      >
        <Grid className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.5} />
      </button>
      
      <button
        onClick={() => viewMode === 'grid' && toggleViewMode()}
        className={`
          flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full
          transition-all duration-200
          ${viewMode === 'list' 
            ? 'bg-blue-600 text-white shadow-[0_4px_12px_rgba(37,99,235,0.3)] scale-105' 
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }
        `}
      >
        <List className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.5} />
      </button>
    </div>
  );
});

ViewToggleButton.displayName = 'ViewToggleButton';

export default ViewToggleButton;
