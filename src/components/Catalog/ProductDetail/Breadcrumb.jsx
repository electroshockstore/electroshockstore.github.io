import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { getSlugFromCategory } from '../../../utils/slugify';

/**
 * Breadcrumb premium estilo apple-pill: pastilla de vidrio con pills
 * anidadas (inicio + categoría en gradiente) y nombre corto del producto.
 * El nombre completo ya es el H1 de la página, acá va truncado.
 */
const Breadcrumb = ({ category, productName }) => {
  const categorySlug = category ? getSlugFromCategory(category) : '';
  const shortName =
    productName && productName.length > 30
      ? `${productName.slice(0, 30)}…`
      : productName;

  return (
    <nav
      aria-label="Migas de pan"
      className="flex min-w-0 flex-1 items-center gap-1 rounded-full border border-white/70 bg-white/70 py-1 pl-1 pr-2 shadow-[0_10px_28px_-14px_rgba(59,130,246,0.45),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-xl sm:gap-1.5 sm:py-1.5 sm:pl-1.5 sm:pr-3"
    >
      <Link
        to="/"
        aria-label="Ir al inicio"
        title="Inicio"
        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-900/[0.05] text-gray-500 ring-1 ring-black/[0.04] transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 active:scale-90 sm:h-9 sm:w-9"
      >
        <Home className="h-4 w-4" />
      </Link>

      {category && (
        <>
          <ChevronRight className="h-3.5 w-3.5 flex-shrink-0 text-gray-300" aria-hidden="true" />
          <Link
            to={`/categoria/${categorySlug}`}
            title={category}
            className="group relative min-w-0 max-w-[42vw] flex-shrink-0 truncate overflow-hidden rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-3.5 py-1.5 text-[13px] font-extrabold tracking-wide text-white shadow-[0_8px_18px_-8px_rgba(79,70,229,0.8),inset_0_1px_0_rgba(255,255,255,0.35)] ring-1 ring-white/30 transition-all duration-200 hover:shadow-[0_10px_24px_-8px_rgba(79,70,229,0.9)] hover:brightness-110 active:scale-95 sm:max-w-[220px] sm:text-sm"
          >
            <span className="relative z-10 block truncate">{category}</span>
            {/* Sheen premium al hover (solo desktop) */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 hidden -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover:translate-x-full sm:block"
            />
          </Link>
        </>
      )}

      {shortName && (
        <>
          <ChevronRight className="hidden h-3.5 w-3.5 flex-shrink-0 text-gray-300 sm:block" aria-hidden="true" />
          <span
            title={productName}
            className="hidden min-w-0 flex-1 truncate text-[13px] font-semibold text-gray-500 sm:block"
          >
            {shortName}
          </span>
        </>
      )}
    </nav>
  );
};

export default Breadcrumb;
