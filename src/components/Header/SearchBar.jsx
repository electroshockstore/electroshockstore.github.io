import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Package } from 'lucide-react';
import { useProducts } from '../../hooks/useProducts';

const SearchBar = ({ isMobile = false, onClose }) => {
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);
  const { products } = useProducts();
  const navigate = useNavigate();

  useEffect(() => {
    const query = localSearchQuery || '';
    if (query.trim().length >= 3) {
      const lowerQuery = query.toLowerCase();
      const results = products
        .filter(product =>
          product.name?.toLowerCase().includes(lowerQuery) ||
          product.brand?.toLowerCase().includes(lowerQuery) ||
          product.model?.toLowerCase().includes(lowerQuery) ||
          product.category?.toLowerCase().includes(lowerQuery)
        )
        .slice(0, 5);
      setSearchResults(results);
      setIsSearchOpen(results.length > 0);
    } else {
      setSearchResults([]);
      setIsSearchOpen(false);
    }
  }, [localSearchQuery, products]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleProductClick = (product) => {
    const categorySlug = product.category.toLowerCase().replace(/\s+/g, '-');
    const productSku = `${product.brand}-${product.model}`.toLowerCase().replace(/\s+/g, '-');
    navigate(`/categoria/${categorySlug}/${productSku}`, { state: { productId: product.id } });
    setLocalSearchQuery('');
    setIsSearchOpen(false);
  };

  const handleClearSearch = () => {
    setLocalSearchQuery('');      // Solo borra el texto
    setIsSearchOpen(false);        // Cierra resultados
    // NO cierra el input - usuario puede seguir buscando
  };

  if (isMobile) {
    return (
      <div className="search-container relative" ref={searchRef}>
        {/* Icono de búsqueda - Estilo Apple */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 p-2.5 rounded-xl shadow-lg shadow-blue-500/50">
              <Search className="h-5 w-5 text-white" strokeWidth={3} />
            </div>
            {/* Glow del icono */}
            <div className="absolute inset-0 bg-blue-500 blur-md opacity-40 rounded-xl" />
          </div>
        </div>
        <input
          type="text"
          value={localSearchQuery}
          onChange={(e) => setLocalSearchQuery(e.target.value)}
          placeholder="¿Qué componente buscas?"
          autoFocus
          className="w-full h-14 pl-16 pr-12 text-sm font-medium
                   bg-white/10 backdrop-blur-2xl border-2 border-white/20 rounded-full 
                   text-white placeholder:text-white/60
                   focus:outline-none focus:ring-2 focus:ring-blue-400/60 focus:border-blue-400/60 focus:bg-white/15
                   hover:border-white/30 hover:bg-white/12
                   transition-all duration-300 shadow-2xl shadow-black/20
                   cursor-text"
        />
        {/* Botón X - Solo aparece si hay texto */}
        {localSearchQuery && (
          <button
            onClick={handleClearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 
                       flex items-center justify-center
                       w-8 h-8
                       text-white/60 hover:text-white 
                       hover:bg-white/10 
                       rounded-xl 
                       transition-all duration-200
                       active:scale-95
                       z-10"
          >
            <X className="h-4.5 w-4.5" strokeWidth={2.8} />
          </button>
        )}
          
        {isSearchOpen && searchResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden z-50 search-results-enter">
            {searchResults.map((product) => (
              <button
                key={product.id}
                onClick={() => handleProductClick(product)}
                className="w-full flex items-center gap-3 p-3 hover:bg-gray-800 transition-all duration-200 text-left hover:translate-x-1"
              >
                <div className="w-12 h-12 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '';
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = '<svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>';
                      }}
                    />
                  ) : (
                    <Package className="w-6 h-6 text-gray-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{product.name}</p>
                  <p className="text-xs text-gray-400">{product.brand}</p>
                </div>
                <div className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-lg border border-blue-200">
                  <span className="text-xs font-bold text-gray-800">${product.price.toLocaleString('es-AR')}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Desktop version
  return (
    <div className="search-container flex-1 max-w-2xl relative" ref={searchRef}>
      {/* Glow ambiental sutil */}
      <div className="absolute -inset-6 bg-gradient-to-r from-blue-500/10 via-indigo-500/8 to-purple-500/10 blur-2xl rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      <div className="relative group">
        {/* Icono de búsqueda - Estilo Apple mejorado */}
        <div className="absolute left-2 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 p-3 rounded-2xl shadow-lg shadow-blue-500/50 group-focus-within:scale-110 transition-transform duration-300">
              <Search className="h-6 w-6 text-white" strokeWidth={3} />
            </div>
            {/* Glow del icono */}
            <div className="absolute inset-0 bg-blue-500 blur-lg opacity-50 rounded-2xl group-focus-within:opacity-70 transition-opacity duration-300" />
          </div>
        </div>
        
        <input
          type="text"
          value={localSearchQuery}
          onChange={(e) => setLocalSearchQuery(e.target.value)}
          placeholder="Buscar productos, marcas o categorías..."
          className="w-full h-16 pl-20 pr-14 text-base font-medium
                   bg-white/10 backdrop-blur-2xl border-2 border-white/20 rounded-full 
                   text-white placeholder:text-white/60
                   focus:outline-none focus:ring-2 focus:ring-blue-400/60 focus:border-blue-400/60 focus:bg-white/15
                   hover:border-white/30 hover:bg-white/12
                   transition-all duration-300 shadow-2xl shadow-black/20
                   focus:shadow-blue-500/30 focus:shadow-2xl
                   cursor-text"
        />
        {localSearchQuery && (
          <button
            onClick={handleClearSearch}
            className="absolute right-5 top-1/2 -translate-y-1/2 
                       flex items-center justify-center
                       w-9 h-9
                       text-white/60 hover:text-white 
                       hover:bg-white/10 
                       rounded-xl 
                       transition-all duration-200
                       active:scale-95
                       z-10"
          >
            <X className="h-5 w-5" strokeWidth={2.8} />
          </button>
        )}
        
        {isSearchOpen && searchResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden z-50 search-results-enter">
            {searchResults.map((product) => (
              <button
                key={product.id}
                onClick={() => handleProductClick(product)}
                className="w-full flex items-center gap-4 p-4 hover:bg-gray-800 transition-all duration-200 text-left border-b border-gray-800 last:border-b-0 hover:translate-x-1"
              >
                <div className="w-16 h-16 bg-gray-800 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '';
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = '<svg class="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>';
                      }}
                    />
                  ) : (
                    <Package className="w-8 h-8 text-gray-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base font-semibold text-white truncate">{product.name}</p>
                  <p className="text-sm text-gray-400">{product.brand} • {product.category}</p>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl border border-blue-200">
                  <span className="text-sm font-bold text-gray-800">${product.price.toLocaleString('es-AR')}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
