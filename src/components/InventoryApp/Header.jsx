// Header negro con buscador centrado - Responsive
import { Package, Search, FileText, MapPin } from 'lucide-react';

const Header = ({ searchQuery, onSearchChange }) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-black border-b border-gray-800">
      <div className="w-full px-4 sm:px-6 py-3 sm:py-4">
        {/* Layout mobile: vertical */}
        <div className="flex flex-col gap-3 sm:hidden">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Package className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-black text-white leading-tight">Shock-Store</h1>
                <h2 className="text-xs font-semibold text-blue-400">Catálogo</h2>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                className="p-2.5 bg-gray-900 hover:bg-gray-800 
                         border border-gray-700 hover:border-blue-500
                         rounded-full text-white
                         transition-all duration-200"
                aria-label="Condiciones de Venta"
              >
                <FileText className="h-4 w-4" strokeWidth={2.5} />
              </button>
              
              <button
                onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                className="p-2.5 bg-blue-600 hover:bg-blue-700 
                         rounded-full text-white
                         transition-all duration-200"
                aria-label="Puntos de Retiro"
              >
                <MapPin className="h-4 w-4" strokeWidth={2.5} />
              </button>
            </div>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar productos..."
              className="w-full h-10 pl-10 pr-3 text-sm
                       bg-gray-900 border border-gray-800 rounded-full 
                       text-white placeholder:text-gray-500
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       transition-all duration-200"
            />
          </div>
        </div>

        {/* Layout desktop: horizontal */}
        <div className="hidden sm:flex items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <Package className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white leading-tight">Shock-Store</h1>
              <h2 className="text-sm font-semibold text-blue-400">Catálogo</h2>
            </div>
          </div>

          {/* Buscador centrado */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Buscar productos, marcas o categorías..."
                className="w-full h-12 pl-12 pr-4 
                         bg-gray-900 border border-gray-800 rounded-full 
                         text-white placeholder:text-gray-500
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         transition-all duration-200"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
              className="flex items-center gap-2 px-4 py-2.5 
                       bg-gray-900 hover:bg-gray-800 
                       border border-gray-700 hover:border-blue-500
                       rounded-full text-white font-semibold text-sm
                       transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/20"
            >
              <FileText className="h-4 w-4" strokeWidth={2.5} />
              <span className="hidden lg:inline">Condiciones de Venta</span>
            </button>
            
            <button
              onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
              className="flex items-center gap-2 px-4 py-2.5 
                       bg-blue-600 hover:bg-blue-700 
                       rounded-full text-white font-semibold text-sm
                       transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30"
            >
              <MapPin className="h-4 w-4" strokeWidth={2.5} />
              <span className="hidden lg:inline">Puntos de Retiro</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
