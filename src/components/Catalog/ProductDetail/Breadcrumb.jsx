import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { getSlugFromCategory } from '../../../utils/slugify';

const Breadcrumb = ({ category, productName }) => {
  const categorySlug = category ? getSlugFromCategory(category) : '';

  return (
    <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 overflow-x-auto whitespace-nowrap">
      <Link 
        to="/" 
        className="flex items-center gap-1 hover:text-blue-600 transition-colors flex-shrink-0"
        aria-label="Inicio"
      >
        <Home className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        <span className="font-medium">Inicio</span>
      </Link>
      
      {category && (
        <>
          <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
          <Link 
            to={`/categoria/${categorySlug}`}
            className="hover:text-blue-600 transition-colors font-medium flex-shrink-0"
          >
            {category}
          </Link>
        </>
      )}
      
      <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
      <span className="text-gray-900 font-semibold truncate">
        {productName}
      </span>
    </nav>
  );
};

export default Breadcrumb;
