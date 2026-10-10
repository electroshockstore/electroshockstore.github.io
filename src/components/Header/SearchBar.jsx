import { useState, useRef, useEffect, useId } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Package, Clock } from 'lucide-react';
import CTAPill from '../Shared/CTAPill';
import { useFilter } from '../../context/FilterContext';
import { useProductSearch } from '../../hooks/useProductSearch';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import { useRecentSearches } from '../../hooks/useRecentSearches';
import { generateSKU, getSlugFromCategory } from '../../utils/slugify';
import { formatPrice } from '../../utils/formatPrice';

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Resalta el término buscado dentro del texto (case-insensitive). */
const Highlight = ({ text = '', query = '' }) => {
  const q = query.trim();
  if (q.length < 2) return <>{text}</>;

  const parts = text.split(new RegExp(`(${escapeRegExp(q)})`, 'ig'));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === q.toLowerCase() ? (
          <mark key={i} className="search-mark">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
};

/**
 * Buscador unificado (Fase 6): una sola implementación para desktop y mobile,
 * conectada a FilterContext (fuente única) con debounce, ranking, navegación
 * por teclado, búsquedas recientes y "ver todos los resultados" (/buscar).
 */
const SearchBar = ({ isMobile = false, onClose }) => {
  const { searchQuery, setSearchQuery } = useFilter();
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState(searchQuery);
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const { results, total, isStale } = useProductSearch(inputValue);
  const { recent, add, remove, clear } = useRecentSearches();
  const debouncedInput = useDebouncedValue(inputValue, 200);

  const searchRef = useRef(null);
  // En mobile conviven dos instancias (la desktop oculta sigue montada):
  // solo la que escribió la query puede pisarla o limpiarla.
  const ownedRef = useRef(false);
  const listId = useId();

  const trimmed = inputValue.trim();
  const hasQuery = trimmed.length >= 2;

  // Empujar al contexto (debounced): filtrado del catálogo en vivo sin
  // re-renderizar la página entera en cada tecla.
  useEffect(() => {
    if (debouncedInput !== searchQuery) {
      if (debouncedInput !== '') {
        setSearchQuery(debouncedInput);
        ownedRef.current = true;
      } else if (ownedRef.current) {
        setSearchQuery('');
        ownedRef.current = false;
      }
    } else if (debouncedInput !== '') {
      ownedRef.current = true;
    }
  }, [debouncedInput, searchQuery, setSearchQuery]);

  // Adoptar limpiezas externas (p. ej. "ir a home") solo sin foco.
  useEffect(() => {
    if (searchQuery === '' && !isFocused && !isOpen) {
      setInputValue('');
      ownedRef.current = false;
    }
  }, [searchQuery, isFocused, isOpen]);

  // Cerrar al hacer click afuera.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const resetActive = () => setActiveIndex(-1);

  const handleSelectProduct = (product) => {
    add(trimmed);
    import('../../pages/ProductDetailPage');
    const categorySlug = getSlugFromCategory(product.category);
    const productSku = generateSKU(product.name, product.brand);
    navigate(`/categoria/${categorySlug}/${productSku}`, {
      state: { productId: product.id },
    });
    setInputValue('');
    setSearchQuery('');
    setIsOpen(false);
    resetActive();
  };

  const handleViewAll = () => {
    if (!hasQuery) return;
    add(trimmed);
    setSearchQuery(trimmed);
    setIsOpen(false);
    resetActive();
    if (!window.location.pathname.startsWith('/buscar')) {
      navigate('/buscar');
    }
  };

  const handleRecentClick = (term) => {
    setInputValue(term);
    setIsOpen(true);
    resetActive();
  };

  const handleClear = () => {
    setInputValue('');
    setSearchQuery('');
    ownedRef.current = false;
    setIsOpen(false);
    resetActive();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!isOpen) setIsOpen(true);
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (activeIndex >= 0 && results[activeIndex]) {
        handleSelectProduct(results[activeIndex]);
      } else {
        handleViewAll();
      }
    } else if (event.key === 'Escape') {
      setIsOpen(false);
      resetActive();
      if (isMobile) onClose?.();
    }
  };

  const showRecents = !hasQuery && recent.length > 0;
  const showDropdown = isOpen && (showRecents || hasQuery);

  const containerClass = isMobile
    ? 'search-container relative'
    : 'search-container flex-1 max-w-2xl relative';

  const inputClass = isMobile
    ? `w-full h-14 pl-16 pr-12 text-sm font-medium
       bg-white/10 backdrop-blur-2xl border-2 border-white/20 rounded-full
       text-white placeholder:text-white/60
       focus:outline-none focus:ring-2 focus:ring-blue-400/60 focus:border-blue-400/60 focus:bg-white/15
       hover:border-white/30 transition-all duration-300 shadow-2xl shadow-black/20 cursor-text`
    : `w-full h-16 pl-20 pr-14 text-base font-medium
       bg-white/10 backdrop-blur-2xl border-2 border-white/20 rounded-full
       text-white placeholder:text-white/60
       focus:outline-none focus:ring-2 focus:ring-blue-400/60 focus:border-blue-400/60 focus:bg-white/15
       hover:border-white/30 transition-all duration-300 shadow-2xl shadow-black/20
       focus:shadow-blue-500/30 cursor-text`;

  return (
    <div className={containerClass} ref={searchRef}>
      {/* Icono */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 z-10 pointer-events-none ${
          isMobile ? 'left-4' : 'left-2'
        }`}
      >
        <div className="relative">
          <div
            className={`bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/50 ${
              isMobile ? 'p-2.5' : 'p-3'
            }`}
          >
            <Search className={isMobile ? 'h-5 w-5 text-white' : 'h-6 w-6 text-white'} strokeWidth={3} />
          </div>
          <div className="absolute inset-0 bg-blue-500 blur-md opacity-40 rounded-xl" />
        </div>
      </div>

      <input
        type="text"
        role="combobox"
        aria-expanded={showDropdown}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={
          activeIndex >= 0 ? `${listId}-option-${activeIndex}` : undefined
        }
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setIsOpen(true);
          resetActive();
        }}
        onFocus={() => {
          setIsFocused(true);
          if (hasQuery || recent.length > 0) setIsOpen(true);
        }}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
        placeholder={isMobile ? '¿Qué componente buscas?' : 'Buscar productos, marcas o categorías...'}
        autoFocus={isMobile}
        className={inputClass}
      />

      {inputValue && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Limpiar búsqueda"
          className={`absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center
                      text-white/60 hover:text-white hover:bg-white/10 rounded-xl
                      transition-all duration-200 active:scale-95 z-10 ${
                        isMobile ? 'w-8 h-8' : 'w-9 h-9 right-5'
                      }`}
        >
          <X className={isMobile ? 'h-4.5 w-4.5' : 'h-5 w-5'} strokeWidth={2.8} />
        </button>
      )}

      {showDropdown && (
        <div
          id={listId}
          role="listbox"
          className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden z-50 search-results-enter"
        >
          {showRecents ? (
            <div className="py-1">
              <div className="flex items-center justify-between px-4 pt-2 pb-1">
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-gray-500">
                  Búsquedas recientes
                </span>
                <button
                  type="button"
                  onClick={clear}
                  className="text-[11px] font-semibold text-gray-500 hover:text-gray-300 transition-colors"
                >
                  Limpiar
                </button>
              </div>
              {recent.map((term) => (
                <div key={term} className="flex items-center group">
                  <button
                    type="button"
                    onClick={() => handleRecentClick(term)}
                    className="flex-1 flex items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-200 hover:bg-gray-800 transition-colors"
                  >
                    <Clock className="h-4 w-4 text-gray-500 flex-shrink-0" />
                    <span className="truncate">{term}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(term)}
                    aria-label={`Quitar ${term} de recientes`}
                    className="p-2 mr-2 rounded-lg text-gray-600 hover:text-gray-300 hover:bg-gray-800 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          ) : results.length > 0 ? (
            <>
              {results.map((product, index) => (
                <button
                  key={product.id}
                  id={`${listId}-option-${index}`}
                  role="option"
                  aria-selected={index === activeIndex}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => handleSelectProduct(product)}
                  className={`w-full flex items-center gap-3 p-3 text-left border-b border-gray-800 last:border-b-0 transition-colors active:bg-gray-700 ${
                    index === activeIndex ? 'bg-gray-800' : 'hover:bg-gray-800'
                  }`}
                >
                  <div className="relative w-12 h-12 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
                    <Package className="absolute h-5 w-5 text-gray-600" />
                    {product.images?.[0] && (
                      <img
                        src={product.images[0]}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="relative w-full h-full object-cover"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">
                      <Highlight text={product.name} query={trimmed} />
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {product.brand} • {product.category}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-lg border border-blue-200 flex-shrink-0">
                    <span className="text-xs font-bold text-gray-800">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                </button>
              ))}

              <CTAPill
                variant="bare"
                size="sm"
                flat
                label="Ver todos los resultados"
                labelClassName="text-sm font-semibold text-blue-300"
                suffix={
                  <span className="text-xs text-gray-400">
                    {total} {total === 1 ? 'producto' : 'productos'}
                  </span>
                }
                onClick={handleViewAll}
                className="w-full bg-gray-950/60 px-4 hover:bg-gray-800 active:bg-gray-700"
              />
            </>
          ) : isStale ? (
            <div className="px-4 py-6 text-center text-sm text-gray-500">Buscando…</div>
          ) : (
            <div className="px-4 py-6 text-center">
              <p className="text-sm text-gray-300">
                Sin resultados para <span className="font-semibold text-white">“{trimmed}”</span>
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Probá con otra marca, modelo o categoría.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
