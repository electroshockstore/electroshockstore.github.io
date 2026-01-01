import { Package, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProductCardMayorista from './ProductCardMayorista';

const RevendedoresSection = ({ products = [], onProductClick }) => {
    const navigate = useNavigate();

    // Productos fijos para mostrar en Home - Mobile (3 originales)
    const featuredProductsMobile = products.filter(p => 
        p.id === 1511 || // Sony PS4
        p.id === 1508 || // Pandora 2
        p.id === 1509    // ASUS A520M-K
    );

    // Productos fijos para mostrar en Home - Desktop (5 productos)
    const featuredProductsDesktop = products.filter(p => 
        p.id === 1511 || // Sony PS4
        p.id === 1508 || // Pandora 2
        p.id === 1509 || // ASUS A520M-K
        p.id === 1513 || // Redragon Kumara (nuevo)
        p.id === 1514    // Logitech G203 (nuevo)
    );

    const handleVerMas = () => {
        navigate('/categoria/mayorista');
    };

    return (
        <section className="w-full flex-1 relative overflow-hidden">
            {/* Partículas de fondo animadas - Solo desktop */}
            <div className="hidden sm:block absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-orange-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-amber-500/5 to-orange-500/5 rounded-full blur-3xl" />
            </div>

            <div className="w-full py-12 sm:py-16 md:py-20 relative z-10">
                {/* Encabezado con más jerarquía */}
                <div className="text-center mb-12 sm:mb-16 px-4">
                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-amber-500/30 to-orange-500/30 backdrop-blur-sm rounded-full mb-6 shadow-2xl shadow-amber-500/40 border border-amber-400/50">
                        <Package className="w-4 h-4 text-amber-300 animate-pulse" />
                        <span className="text-sm font-bold text-amber-200 uppercase tracking-widest">
                           Productos Destacados
                        </span>
                    </div>
                    
                    <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-4 tracking-tight">
                        <span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.4)] filter brightness-110">
                            Packs{' '}
                        </span>
                        <span className="relative inline-block">
                            <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-red-400 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(251,146,60,0.8)] filter brightness-125">
                                Ahorro
                            </span>
                            <span className="absolute inset-0 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 blur-3xl opacity-60 -z-10 animate-pulse scale-110" />
                            <span className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-400 blur-xl opacity-40 -z-10 animate-pulse scale-150" />
                        </span>
                    </h2>
                    
                    <p className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto font-semibold drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] leading-relaxed">
                        Comprá al por mayor y <span className="text-amber-300 font-bold">maximizá tu ganancia</span>. 
                    </p>
                </div>

                {/* Grid de productos mayoristas - Mobile: 3 cards originales */}
                <div className="sm:hidden grid grid-cols-3 gap-2 mb-8 px-2">
                    {featuredProductsMobile.map((product, index) => (
                        <ProductCardMayorista
                            key={product.id || index}
                            product={product}
                            onClick={onProductClick}
                            index={index}
                        />
                    ))}
                </div>

                {/* Grid de productos mayoristas - Desktop: 5 cards usando todo el ancho con efecto cascada */}
                <div className="hidden sm:flex items-end justify-center gap-1 lg:gap-2 xl:gap-3 mb-12 sm:mb-16 px-1 lg:px-2">
                    {featuredProductsDesktop.map((product, index) => (
                        <div
                            key={product.id || index}
                            className={`
                                transition-all duration-700 hover:scale-105 hover:z-20
                                ${index === 0 ? 'transform scale-85 translate-y-6' : ''}
                                ${index === 1 ? 'transform scale-92 translate-y-3' : ''}
                                ${index === 2 ? 'transform scale-105 -translate-y-4 z-10 shadow-2xl shadow-amber-500/30' : ''}
                                ${index === 3 ? 'transform scale-92 translate-y-3' : ''}
                                ${index === 4 ? 'transform scale-85 translate-y-6' : ''}
                            `}
                            style={{
                                flex: '1 1 0%',
                                maxWidth: '100%'
                            }}
                        >
                            <ProductCardMayorista
                                product={product}
                                onClick={onProductClick}
                                index={index}
                            />
                        </div>
                    ))}
                </div>

                {/* Botón Ver Más - Más destacado */}
                <div className="flex justify-center pt-8">
                    <button
                        onClick={handleVerMas}
                        className="group relative inline-flex items-center gap-2 sm:gap-4 px-6 sm:px-10 md:px-12 py-3 sm:py-5 md:py-6 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-400 hover:via-orange-400 hover:to-red-400 rounded-xl sm:rounded-2xl font-bold sm:font-black text-white text-sm sm:text-lg md:text-xl shadow-xl sm:shadow-2xl shadow-amber-500/40 sm:shadow-amber-500/50 hover:shadow-2xl sm:hover:shadow-3xl hover:shadow-amber-500/60 sm:hover:shadow-amber-500/70 transition-all duration-500 hover:scale-105 sm:hover:scale-110 active:scale-95 border border-amber-400/30 sm:border-2 sm:border-amber-400/40 hover:border-amber-300/50 sm:hover:border-amber-300/60"
                    >
                        {/* Efecto de brillo animado */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 sm:via-white/30 to-transparent opacity-0 group-hover:opacity-100 rounded-xl sm:rounded-2xl transition-opacity duration-500 animate-pulse" />
                        
                        {/* Resplandor de fondo */}
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-xl sm:rounded-2xl blur-lg sm:blur-xl opacity-0 group-hover:opacity-50 sm:group-hover:opacity-60 transition-opacity duration-500 -z-10 scale-110" />
                        
                        <Package className="w-4 h-4 sm:w-6 md:w-7 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-500" />
                        <span className="relative z-10 tracking-wide text-xs sm:text-base md:text-lg">Ver todos los packs mayoristas</span>
                        <ArrowRight className="w-4 h-4 sm:w-6 md:w-7 group-hover:translate-x-2 sm:group-hover:translate-x-3 group-hover:scale-110 transition-transform duration-500" />
                        
                        {/* Partículas animadas mejoradas - Solo en desktop */}
                        <div className="hidden sm:block absolute -top-2 -right-2 w-3 md:w-4 h-3 md:h-4 bg-amber-300 rounded-full opacity-0 group-hover:opacity-100 animate-ping" />
                        <div className="hidden sm:block absolute -bottom-2 -left-2 w-2 md:w-3 h-2 md:h-3 bg-orange-300 rounded-full opacity-0 group-hover:opacity-100 animate-ping" style={{ animationDelay: '0.3s' }} />
                        <div className="hidden sm:block absolute top-1/2 -right-3 md:-right-4 w-1.5 md:w-2 h-1.5 md:h-2 bg-yellow-300 rounded-full opacity-0 group-hover:opacity-100 animate-ping" style={{ animationDelay: '0.6s' }} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default RevendedoresSection;
