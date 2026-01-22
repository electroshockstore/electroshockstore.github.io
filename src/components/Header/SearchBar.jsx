import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Package } from 'lucide-react';
import { useStock } from '../../context/StockContext';

const SearchBar = ({ isMobile = false }) => {
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);
  const { products } = useStock();
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
    setLocalSearchQuery('');
    setIsSearchOpen(false);
  };

  if (isMobile) {
    return (
      <div className="relative" ref={searchRef}>
        <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg shadow-lg">
          <Search className="h-4 w-4 text-white" strokeWidth={2.5} />
        </div>
        <input
          type="text"
          value={localSearchQuery}
          onChange={(e) => setLocalSearchQuery(e.target.value)}
          placeholder="¿Qué componente buscas?"
          autoFocus
          className="w-full h-12 pl-14 pr-12 text-base
                   bg-gray-900/90 backdrop-blur-xl border-2 border-blue-500/50 rounded-2xl 
                   text-white placeholder:text-white/50
                   focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500
                   hover:border-blue-500/70 hover:bg-gray-900
                   transition-all duration-300 shadow-xl shadow-blue-500/20"
        />
        <button
          onClick={handleClearSearch}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors p-1 hover:bg-gray-800 rounded-lg"
        >
          <X className="h-5 w-5" strokeWidth={2.5} />
        </button>
          
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
    <div className="flex-1 max-w-2xl relative" ref={searchRef}>
      <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 via-indigo-600/15 to-purple-600/20 blur-xl rounded-full animate-pulse" style={{ animationDuration: '6s' }} />
      
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-xl shadow-lg">
              <Search className="h-4 w-4 text-white" strokeWidth={2.5} />
            </div>
            <div className="absolute inset-0 bg-blue-500 blur-xl opacity-60 rounded-xl" />
          </div>
        </div>
        
        <input
          type="text"
          value={localSearchQuery}
          onChange={(e) => setLocalSearchQuery(e.target.value)}
          placeholder="Buscar productos, marcas o categorías..."
          className="w-full h-14 pl-14 pr-12 text-base
                   bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl 
                   text-white placeholder:text-white/70
                   focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50
                   hover:border-gray-600/50 hover:bg-gray-900
                   transition-all duration-300 shadow-xl
                   focus:shadow-blue-500/20 focus:shadow-2xl"
        />
        {localSearchQuery && (
          <button
            onClick={handleClearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
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
