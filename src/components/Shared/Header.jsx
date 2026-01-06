
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Search, FileText, MapPin, X, Home, Bot, ArrowRight, Store, Truck, Wallet, CheckCircle } from 'lucide-react';
import { useStock } from '../../context/StockContext';
import CategoryFilter from '../Catalog/CategoryFilter';
import { useFilter } from '../../context/FilterContext';
import { getSlugFromCategory } from '../../utils/slugify';

const Header = ({ searchQuery = '', onSearchChange, onGoHome, hideSearchOnMobile = false }) => {
  const [localSearchQuery, setLocalSearchQuery] = useState(''); // Estado local para el buscador
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false); // Nuevo estado para mobile search
  const [searchResults, setSearchResults] = useState([]);
  const [showConditionsModal, setShowConditionsModal] = useState(false);
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0); // Estado para el carousel
  const searchRef = useRef(null);
  const { products } = useStock();
  const navigate = useNavigate();
  const { selectedCategory, setSelectedCategory } = useFilter();

  // Mensajes promocionales con emojis - Textos cortos
  const promoMessages = [
    { emoji: '🏪', text: 'Sin Local', gradient: 'from-emerald-400 via-green-400 to-teal-400' },
    { emoji: '🚫', text: 'Sin Envíos', gradient: 'from-blue-400 via-cyan-400 to-sky-400' },
    { emoji: '💰', text: 'Sin Anticipo', gradient: 'from-purple-400 via-pink-400 to-fuchsia-400' },
    { emoji: '✅', text: 'Revisás y Pagás', gradient: 'from-orange-400 via-amber-400 to-yellow-400' }
  ];

  // Auto-scroll del carousel cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromoIndex((prev) => (prev + 1) % promoMessages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [promoMessages.length]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    const slug = getSlugFromCategory(category);
    navigate(`/categoria/${slug}`);
  };

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
              className="flex items-center hover:opacity-80 transition-opacity flex-shrink-0"
            >
              <img 
                src="/logotipo_tiny.png" 
                alt="Shock-Store Logo" 
                className="h-14 w-auto object-contain"
              />
            </button>
            
            {/* Carousel Promocional - Mobile */}
            <div className="flex-1 mx-2 min-w-0">
              <div className="relative h-7 flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-gray-900/80 via-gray-800/80 to-gray-900/80 backdrop-blur-md border border-white/10">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />
                
                {promoMessages.map((promo, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 flex items-center justify-center gap-1.5 px-2 transition-all duration-700 ${
                      index === currentPromoIndex
                        ? 'opacity-100 scale-100'
                        : 'opacity-0 scale-95'
                    }`}
                  >
                    <span className="text-base leading-none">{promo.emoji}</span>
                    <span className={`text-[11px] font-black bg-gradient-to-r ${promo.gradient} bg-clip-text text-transparent whitespace-nowrap tracking-tight`}>
                      {promo.text}
                    </span>
                  </div>
                ))}
                
                {/* Indicadores minimalistas */}
                <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 flex gap-0.5">
                  {promoMessages.map((_, index) => (
                    <div
                      key={index}
                      className={`h-0.5 rounded-full transition-all duration-300 ${
                        index === currentPromoIndex
                          ? 'bg-white w-2.5'
                          : 'bg-white/20 w-1'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Search Icon - Mobile (reemplaza el bot) */}
              {!showMobileSearch && (
                <button
                  onClick={() => setShowMobileSearch(true)}
                  className="relative p-2.5
                           bg-gradient-to-r from-blue-600 to-purple-600
                           hover:from-blue-700 hover:to-purple-700
                           rounded-full text-white
                           transition-all duration-300 
                           shadow-lg shadow-blue-500/40 hover:shadow-blue-500/60
                           border-2 border-blue-400/40
                           overflow-hidden group
                           hover:scale-110 active:scale-95"
                  aria-label="Buscar productos"
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  
                  <Search className="h-4 w-4 relative z-10" strokeWidth={2.5} />
                </button>
              )}

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
                onClick={() => {
                  navigate('/puntos-de-retiro');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
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
          
          {/* Search Input - Mobile (solo visible cuando se activa) */}
          {showMobileSearch && !hideSearchOnMobile && (
            <div className="relative animate-in fade-in slide-in-from-top-2 duration-200" ref={searchRef}>
              {/* Search icon with colored container */}
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
                onClick={() => {
                  setShowMobileSearch(false);
                  setLocalSearchQuery('');
                  setIsSearchOpen(false);
                }}
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
          )}
          
          {/* CategoryFilter - Mobile (solo cuando no está el search visible) */}
          {!showMobileSearch && !hideSearchOnMobile && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-200">
              <CategoryFilter 
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryClick}
              />
            </div>
          )}
        </div>

        {/* Layout desktop: horizontal WEB */}
        <div className="hidden sm:flex items-center justify-between gap-6">
          {/* Logo - Clickeable con efectos de luz mejorados */}
<button 
  onClick={() => {
    navigate('/');
    onGoHome?.();
  }}
  className="relative flex items-center gap-4 flex-shrink-0 group"
>
  {/* Capa 1: Resplandor de fondo PERMANENTE - OPTIMIZADO */}
  <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 via-purple-600/15 to-blue-600/20 blur-xl rounded-full animate-pulse" style={{ animationDuration: '6s' }} />
  
  {/* Capa 2: Contenedor del Logo con Glow */}
  <div className="relative">
    {/* Aura interna más concentrada */}
    <div className="absolute inset-0 bg-blue-500/30 blur-lg rounded-full" />
    
    <div className="relative p-2.5 bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl border border-white/20 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
      <img 
        src="/logotipo_tiny.png" 
        alt="Shock-Store Logo" 
      
        className="h-10 w-auto object-contain relative z-10 filter drop-shadow-[0_0_12px_rgba(59,130,246,0.8)]" 
      />
    </div>
  </div>
  
  {/* Capa 3: Texto con brillo constante */}
  <div className="relative z-10 flex flex-col items-start">
    <h1 className="text-5xl font-black tracking-tighter bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
      Shock-Store
    </h1>
    <div className="flex items-center gap-2">
      {/* Línea decorativa brillante */}
      <div className="h-[3px] w-10 bg-gradient-to-r from-blue-400 to-transparent rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
      <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 drop-shadow-[0_0_5px_rgba(96,165,250,0.5)]">
        Catálogo
      </h2>
    </div>
  </div>
</button>

          {/* Buscador centrado con glow - igual que el logo OPTIMIZADO */}
          <div className="flex-1 max-w-2xl relative" ref={searchRef}>
            {/* Resplandor de fondo PERMANENTE - OPTIMIZADO */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 via-indigo-600/15 to-purple-600/20 blur-xl rounded-full animate-pulse" style={{ animationDuration: '6s' }} />
            
            <div className="relative">
              {/* Search icon with colored container and glow */}
              <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                <div className="relative">
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-xl shadow-lg">
                    <Search className="h-4 w-4 text-white" strokeWidth={2.5} />
                  </div>
                  {/* Icon glow visible */}
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

            {/* Condiciones - Con efecto de importancia y glow mejorado OPTIMIZADO */}
            <div className="relative">
              {/* Ambient glow permanente OPTIMIZADO */}
              <div className="absolute -inset-2 bg-gradient-to-r from-orange-500/30 to-red-600/30 blur-lg opacity-60 rounded-full animate-pulse" />
              
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
                {/* Glow effect interno */}
                <div className="absolute inset-0 bg-orange-400 rounded-full blur-lg opacity-50 animate-button-glow" />
                
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                
                <FileText className="h-4 w-4 relative z-10" strokeWidth={2.5} />
                <span className="hidden lg:inline relative z-10">Condiciones</span>
              </button>
            </div>
            
            {/* Puntos de Retiro - Con color azul */}
            <button
              onClick={() => {
                navigate('/puntos-de-retiro');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
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
