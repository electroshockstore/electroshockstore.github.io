// Header negro con buscador centrado - Responsive
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Search, FileText, MapPin, X, Home, Bot, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStock } from '../../context/StockContext';

const Header = ({ searchQuery, onSearchChange, onGoHome }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showConditionsModal, setShowConditionsModal] = useState(false);
  const searchRef = useRef(null);
  const { products } = useStock();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery.trim().length >= 3) {
      const query = searchQuery.toLowerCase();
      const results = products
        .filter(product =>
          product.name?.toLowerCase().includes(query) ||
          product.brand?.toLowerCase().includes(query) ||
          product.model?.toLowerCase().includes(query) ||
          product.category?.toLowerCase().includes(query)
        )
        .slice(0, 5);
      setSearchResults(results);
      setIsSearchOpen(results.length > 0);
    } else {
      setSearchResults([]);
      setIsSearchOpen(false);
    }
  }, [searchQuery, products]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/producto/${productId}`);
    onSearchChange('');
    setIsSearchOpen(false);
  };

  const handleClearSearch = () => {
    onSearchChange('');
    setIsSearchOpen(false);
  };

  return (
    <>
      {/* Modal de Condiciones - Diseño Moderno */}
      <AnimatePresence>
        {showConditionsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setShowConditionsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl shadow-2xl max-w-2xl w-full border border-gray-700/50 overflow-hidden"
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
                    src="/images/condiciones_tiny.png"
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <img 
                src="/logotipo.png" 
                alt="Shock-Store Logo" 
                className="h-14 w-auto object-contain"
              />
              <div>
                <h1 className="text-lg font-black text-white leading-tight">Shock-Store</h1>
                <h2 className="text-xs font-semibold text-blue-400">Catálogo</h2>
              </div>
            </button>
            
            <div className="flex items-center gap-2">
              {/* Bot Helper - Mobile - DENTRO del bloque de botones */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, type: "spring" }}
                className="flex items-center gap-1.5 mr-2"
              >
                <div className="relative">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.15, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="relative"
                  >
                    <div className="bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 rounded-full p-1.5 shadow-lg border-2 border-cyan-300/50">
                      <Bot className="w-3 h-3 text-white" strokeWidth={2.5} />
                    </div>
                    <motion.div
                      animate={{ 
                        scale: [1, 1.4, 1],
                        opacity: [0.6, 0, 0.6]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity
                      }}
                      className="absolute inset-0 bg-cyan-400 rounded-full blur-sm"
                    />
                  </motion.div>
                </div>
                
                <motion.div
                  animate={{ x: [0, 2, 0] }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <ArrowRight className="w-3 h-3 text-cyan-400" strokeWidth={3} />
                </motion.div>
              </motion.div>

              <motion.button
                onClick={() => setShowConditionsModal(true)}
                whileTap={{ scale: 0.9 }}
                className="relative p-2.5 bg-gradient-to-br from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700
                         rounded-full text-white
                         transition-all duration-300 shadow-lg hover:shadow-orange-500/50
                         border border-orange-500/30 overflow-hidden group"
                aria-label="Condiciones de Venta"
              >
                <div className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full" />
                <FileText className="h-4 w-4 relative z-10" strokeWidth={2.5} />
              </motion.button>
              
              <motion.button
                onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                whileTap={{ scale: 0.9 }}
                className="relative p-2.5 bg-gradient-to-br from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700
                         rounded-full text-white
                         transition-all duration-300 shadow-lg hover:shadow-blue-500/50
                         border border-blue-500/30 overflow-hidden group"
                aria-label="Puntos de Retiro"
              >
                <div className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full" />
                <MapPin className="h-4 w-4 relative z-10" strokeWidth={2.5} />
              </motion.button>



              <motion.button
                onClick={() => {
                  navigate('/');
                  onGoHome?.();
                }}
                whileTap={{ scale: 0.9 }}
                className="relative p-2.5 bg-gradient-to-br from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700
                         rounded-full text-white
                         transition-all duration-300 shadow-lg hover:shadow-green-500/50
                         border border-green-500/30 overflow-hidden group"
                aria-label="Inicio"
              >
                <div className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full" />
                <Home className="h-4 w-4 relative z-10" strokeWidth={2.5} />
              </motion.button>


            </div>
          </div>
          
          <div className="relative" ref={searchRef}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar productos..."
              className="w-full h-10 pl-10 pr-10 text-sm
                       bg-gray-900 border border-gray-800 rounded-full 
                       text-white placeholder:text-gray-500
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       transition-all duration-200"
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            
            <AnimatePresence>
              {isSearchOpen && searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden z-50"
                >
                  {searchResults.map((product) => (
                    <motion.button
                      key={product.id}
                      onClick={() => handleProductClick(product.id)}
                      className="w-full flex items-center gap-3 p-3 hover:bg-gray-800 transition-colors text-left"
                      whileHover={{ x: 4 }}
                    >
                      <div className="w-12 h-12 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        ) : null}
                        {!product.image && (
                          <Package className="w-6 h-6 text-gray-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{product.name}</p>
                        <p className="text-xs text-gray-400">{product.brand}</p>
                      </div>
                      <div className="text-sm font-bold text-green-400">
                        ${product.price.toLocaleString()}
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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
              src="/logotipo.png" 
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
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Buscar productos, marcas o categorías..."
                className="w-full h-12 pl-12 pr-12 
                         bg-gray-900 border border-gray-800 rounded-full 
                         text-white placeholder:text-gray-500
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         transition-all duration-200"
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
              
              <AnimatePresence>
                {isSearchOpen && searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden z-50"
                  >
                    {searchResults.map((product) => (
                      <motion.button
                        key={product.id}
                        onClick={() => handleProductClick(product.id)}
                        className="w-full flex items-center gap-4 p-4 hover:bg-gray-800 transition-colors text-left border-b border-gray-800 last:border-b-0"
                        whileHover={{ x: 4 }}
                      >
                        <div className="w-16 h-16 bg-gray-800 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center">
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          ) : null}
                          {!product.image && (
                            <Package className="w-8 h-8 text-gray-600" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-base font-semibold text-white truncate">{product.name}</p>
                          <p className="text-sm text-gray-400">{product.brand} • {product.category}</p>
                        </div>
                        <div className="text-lg font-bold text-green-400">
                          ${product.price.toLocaleString()}
                        </div>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Bot Helper - Desktop - DENTRO del bloque de botones */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, type: "spring" }}
              className="flex items-center gap-2 mr-3"
            >
              <div className="relative">
                <motion.div
                  animate={{ 
                    scale: [1, 1.15, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative"
                >
                  <div className="bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 rounded-full p-2 shadow-xl border-2 border-cyan-300/50">
                    <Bot className="w-4 h-4 text-white" strokeWidth={2.5} />
                  </div>
                  <motion.div
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.6, 0, 0.6]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity
                    }}
                    className="absolute inset-0 bg-cyan-400 rounded-full blur-md"
                  />
                </motion.div>
              </div>
              
              <motion.div
                animate={{ x: [0, 3, 0] }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <ArrowRight className="w-4 h-4 text-cyan-400" strokeWidth={3} />
              </motion.div>
              
              <div className="bg-gradient-to-r from-cyan-500/20 to-blue-600/20 backdrop-blur-sm px-2 py-1 rounded-full border border-cyan-400/30">
                <p className="text-xs font-bold text-cyan-300 whitespace-nowrap">
                  ¡Info importante!
                </p>
              </div>
            </motion.div>

            <motion.button
              onClick={() => setShowConditionsModal(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex items-center gap-2 px-5 py-2.5 
                       bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700
                       rounded-full text-white font-bold text-sm
                       transition-all duration-300 shadow-lg hover:shadow-orange-500/50
                       border border-orange-500/30 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <FileText className="h-4 w-4 relative z-10" strokeWidth={2.5} />
              <span className="hidden lg:inline relative z-10">Condiciones de Venta</span>
            </motion.button>
            
            <motion.button
              onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex items-center gap-2 px-5 py-2.5 
                       bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700
                       rounded-full text-white font-bold text-sm
                       transition-all duration-300 shadow-lg hover:shadow-blue-500/50
                       border border-blue-500/30 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <MapPin className="h-4 w-4 relative z-10" strokeWidth={2.5} />
              <span className="hidden lg:inline relative z-10">Puntos de Retiro</span>
            </motion.button>

<motion.button
              onClick={() => {
                navigate('/');
                onGoHome?.();
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex items-center gap-2 px-5 py-2.5 
                       bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700
                       rounded-full text-white font-bold text-sm
                       transition-all duration-300 shadow-lg hover:shadow-green-500/50
                       border border-green-500/30 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <Home className="h-4 w-4 relative z-10" strokeWidth={2.5} />
              <span className="hidden lg:inline relative z-10">Inicio</span>
            </motion.button>



          </div>
        </div>
      </div>
    </header>
    </>
  );
};

export default Header;
