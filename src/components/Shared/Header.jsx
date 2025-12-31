
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Search, FileText, MapPin, X, Home, Bot, ArrowRight } from 'lucide-react';
import { useStock } from '../../context/StockContext';

const Header = ({ searchQuery = '', onSearchChange, onGoHome, hideSearchOnMobile = false }) => {
  const [localSearchQuery, setLocalSearchQuery] = useState(''); // Estado local para el buscador
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showConditionsModal, setShowConditionsModal] = useState(false);
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
    // Usar 'click' en vez de 'mousedown' para mejor compatibilidad mobile
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

  return (
    <>
      {/* Modal de Condiciones - Diseño Moderno */}
      {showConditionsModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setShowConditionsModal(false)}
        >
          <div
            className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl shadow-2xl max-w-2xl w-full border border-gray-700/50 overflow-hidden modal-scale-enter"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-blue-500/10 pointer-events-none" />
            
            {/* Close button - Floating */}
            <button
              onClick={() => setShowConditionsModal(false)}
              className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-2 transition-all duration-200 hover:scale-110 border border-white/20"
            >
              <X className="w-5 h-5 text-white" strokeWidth={2.5} />
            </button>

            {/* Header minimalista */}
            <div className="px-6 pt-6 pb-4">
              <div className="flex items-center gap-3">
                <div className="bg-orange-500/20 backdrop-blur-sm p-3 rounded-xl border border-orange-500/30">
                  <FileText className="w-6 h-6 text-orange-400" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Condiciones de Venta</h3>
                  <p className="text-sm text-gray-400">Información importante</p>
                </div>
              </div>
            </div>

            {/* Contenido del Modal */}
            <div className="px-4 sm:px-6 pb-6 flex items-center justify-center">
              <div className="relative group">
                <img
                  src="/images/condiciones_tiny.webp"
                  alt="Condiciones de Venta"
                  className="max-w-full max-h-[60vh] sm:max-h-[70vh] w-auto h-auto object-contain rounded-xl shadow-2xl border border-gray-700/50"
                />
                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />
              </div>
            </div>

            {/* Footer minimalista */}
            <div className="px-6 pb-6 flex justify-center">
              <button
                onClick={() => setShowConditionsModal(false)}
                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-orange-500/50 hover:scale-105"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-50 w-full bg-black border-b border-gray-800">
      <div className="w-full px-4 sm:px-6 py-3 sm:py-4">
        {/* Layout mobile: vertical */}
        <div className="flex flex-col gap-3 sm:hidden">
          <div className="flex items-center justify-between gap-2">
            <button 
              onClick={() => {
                navigate('/');
                onGoHome?.();
              }}
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <img 
                src="/logotipo_tiny.png" 
                alt="Shock-Store Logo" 
                className="h-14 w-auto object-contain"
              />
            </button>
            
            <div className="flex items-center gap-2">
              {/* Bot Helper - Mobile */}
              <div className="flex items-center gap-1.5 mr-2 header-bot-enter">
                <div className="relative">
                  <div className="relative animate-bot-pulse">
                    <div className="bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 rounded-full p-1.5 shadow-lg border-2 border-cyan-300/50">
                      <Bot className="w-3 h-3 text-white" strokeWidth={2.5} />
                    </div>
                    <div className="absolute inset-0 bg-cyan-400 rounded-full blur-sm animate-bot-glow" />
                  </div>
                </div>
                
                <div className="animate-arrow-wiggle">
                  <ArrowRight className="w-3 h-3 text-cyan-400" strokeWidth={3} />
                </div>
              </div>

              {/* Condiciones - Con efecto de importancia */}
              <div className="relative">
                <button
                  onClick={() => setShowConditionsModal(true)}
                  className="relative p-2.5
                           bg-gradient-to-r from-orange-500 to-red-600
                           hover:from-orange-600 hover:to-red-700
                           rounded-full text-white
                           transition-all duration-300 
                           shadow-lg shadow-orange-500/40 hover:shadow-orange-500/60
                           border-2 border-orange-400/40
                           overflow-hidden group
                           hover:scale-110 active:scale-95
                           animate-button-float"
                  aria-label="Condiciones de Venta"
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-orange-400 rounded-full blur-md opacity-50 animate-button-glow" />
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  
                  <FileText className="h-4 w-4 relative z-10" strokeWidth={2.5} />
                </button>
              </div>
              
              {/* Puntos de Retiro - Con color azul */}
              <button
                onClick={() => navigate('/puntos-de-retiro')}
                className="relative p-2.5
                         bg-gradient-to-br from-blue-500/20 to-indigo-500/20
                         hover:from-blue-500/30 hover:to-indigo-500/30
                         backdrop-blur-sm rounded-full
                         transition-all duration-300 
                         border border-blue-400/30 hover:border-blue-400/50
                         shadow-lg shadow-blue-500/20
                         hover:scale-110 active:scale-95"
                aria-label="Puntos de Retiro"
              >
                <MapPin className="h-4 w-4 text-blue-300" strokeWidth={2.5} />
              </button>

              {/* Inicio - Con color verde */}
              <button
                onClick={() => {
                  navigate('/');
                  onGoHome?.();
                }}
                className="relative p-2.5
                         bg-gradient-to-br from-green-500/20 to-emerald-500/20
                         hover:from-green-500/30 hover:to-emerald-500/30
                         backdrop-blur-sm rounded-full
                         transition-all duration-300 
                         border border-green-400/30 hover:border-green-400/50
                         shadow-lg shadow-green-500/20
                         hover:scale-110 active:scale-95"
                aria-label="Inicio"
              >
                <Home className="h-4 w-4 text-green-300" strokeWidth={2.5} />
              </button>
            </div>
          </div>
          
          {!hideSearchOnMobile && (
            <div className="relative" ref={searchRef}>
              {/* Search icon with colored container */}
              <div className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-br from-blue-500 to-indigo-600 p-1.5 rounded-lg shadow-lg">
                <Search className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
              </div>
              <input
                type="text"
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
                placeholder="Buscar productos..."
                className="w-full h-10 pl-11 pr-10 text-sm
                         bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl 
                         text-white placeholder:text-white/60
                         focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50
                         hover:border-gray-600/50 hover:bg-gray-900
                         transition-all duration-300 shadow-xl"
              />
              {localSearchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="h-4 w-4" />
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
          )}
        </div>

        {/* Layout desktop: horizontal */}
        <div className="hidden sm:flex items-center justify-between gap-6">
          {/* Logo - Clickeable */}
          <button 
            onClick={() => {
              navigate('/');
              onGoHome?.();
            }}
            className="flex items-center gap-3 flex-shrink-0 hover:opacity-80 transition-opacity"
          >
            <img 
              src="/logotipo_tiny.png" 
              alt="Shock-Store Logo" 
              className="h-12 w-auto object-contain"
            />
            <div>
              <h1 className="text-2xl font-black text-white leading-tight">Shock-Store</h1>
              <h2 className="text-sm font-semibold text-blue-400">Catálogo</h2>
            </div>
          </button>

          {/* Buscador centrado */}
          <div className="flex-1 max-w-2xl" ref={searchRef}>
            <div className="relative">
              {/* Search icon with colored container */}
              <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-xl shadow-lg">
                <Search className="h-4 w-4 text-white" strokeWidth={2.5} />
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
                         transition-all duration-300 shadow-xl"
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

          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Bot Helper - Desktop */}
            <div className="flex items-center gap-2 mr-3 header-bot-enter">
              <div className="relative">
                <div className="relative animate-bot-pulse">
                  <div className="bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 rounded-full p-2 shadow-xl border-2 border-cyan-300/50">
                    <Bot className="w-4 h-4 text-white" strokeWidth={2.5} />
                  </div>
                  <div className="absolute inset-0 bg-cyan-400 rounded-full blur-md animate-bot-glow" />
                </div>
              </div>
              
              <div className="animate-arrow-wiggle">
                <ArrowRight className="w-4 h-4 text-cyan-400" strokeWidth={3} />
              </div>
              
              <div className="bg-gradient-to-r from-cyan-500/20 to-blue-600/20 backdrop-blur-sm px-2 py-1 rounded-full border border-cyan-400/30">
                <p className="text-xs font-bold text-cyan-300 whitespace-nowrap">
                  ¡Info importante!
                </p>
              </div>
            </div>

            {/* Condiciones - Con efecto de importancia */}
            <div className="relative">
              <button
                onClick={() => setShowConditionsModal(true)}
                className="relative flex items-center gap-2 px-6 py-2.5
                         bg-gradient-to-r from-orange-500 to-red-600
                         hover:from-orange-600 hover:to-red-700
                         rounded-full text-white font-bold text-sm
                         transition-all duration-300 
                         shadow-lg shadow-orange-500/40 hover:shadow-orange-500/60
                         border-2 border-orange-400/40
                         overflow-hidden group
                         hover:scale-105 active:scale-95
                         animate-button-float"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-orange-400 rounded-full blur-lg opacity-50 animate-button-glow" />
                
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                
                <FileText className="h-4 w-4 relative z-10" strokeWidth={2.5} />
                <span className="hidden lg:inline relative z-10">Condiciones</span>
              </button>
            </div>
            
            {/* Puntos de Retiro - Con color azul */}
            <button
              onClick={() => navigate('/puntos-de-retiro')}
              className="relative flex items-center gap-2 px-6 py-2.5
                       bg-gradient-to-br from-blue-500/20 to-indigo-500/20
                       hover:from-blue-500/30 hover:to-indigo-500/30
                       backdrop-blur-sm rounded-full font-medium text-sm
                       transition-all duration-300 
                       border border-blue-400/30 hover:border-blue-400/50
                       shadow-lg shadow-blue-500/20
                       hover:scale-105 active:scale-95"
            >
              <MapPin className="h-4 w-4 text-blue-300" strokeWidth={2.5} />
              <span className="hidden lg:inline text-blue-100">Puntos de Retiro</span>
            </button>

            {/* Inicio - Con color verde */}
            <button
              onClick={() => {
                navigate('/');
                onGoHome?.();
              }}
              className="relative flex items-center gap-2 px-6 py-2.5
                       bg-gradient-to-br from-green-500/20 to-emerald-500/20
                       hover:from-green-500/30 hover:to-emerald-500/30
                       backdrop-blur-sm rounded-full font-medium text-sm
                       transition-all duration-300 
                       border border-green-400/30 hover:border-green-400/50
                       shadow-lg shadow-green-500/20
                       hover:scale-105 active:scale-95"
            >
              <Home className="h-4 w-4 text-green-300" strokeWidth={2.5} />
              <span className="hidden lg:inline text-green-100">Inicio</span>
            </button>
          </div>
        </div>
      </div>
    </header>
    </>
  );
};

export default Header;
