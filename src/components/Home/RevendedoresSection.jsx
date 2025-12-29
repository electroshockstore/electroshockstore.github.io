import { Package, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProductCardMayorista from './ProductCardMayorista';

const RevendedoresSection = ({ products = [], onProductClick }) => {
    const navigate = useNavigate();

    // Productos fijos para mostrar en Home (siempre los mismos 3)
    const featuredProducts = products.filter(p => 
        p.id === 1511 || // Sony PS4 (antes 1011)
        p.id === 1508 || // Pandora 2 (antes 1008)
        p.id === 1509    // ASUS A520M-K (antes 1009)
    );

    const handleVerMas = () => {
        navigate('/categoria/mayorista');
    };

    return (
        <section className="w-full flex-1 relative">
            {/* Partículas de fondo animadas - Solo desktop */}
            <div className="hidden sm:block absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <div className="max-w-7xl mx-auto py-8 sm:py-12 md:py-16 px-0 sm:px-6 lg:px-8 relative z-10">
                {/* Encabezado */}
                <div className="text-center mb-6 sm:mb-10 px-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm rounded-full mb-3 shadow-lg shadow-amber-500/30 border border-amber-500/30">
                        <Package className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                        <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider">
                           Producto Destacado
                        </span>
                    </div>
                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-black mb-2 tracking-tight">
                        <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                            Packs{' '}
                        </span>
                        <span className="relative inline-block">
                            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(251,146,60,0.5)]">
                                Ahorro
                            </span>
                            <span className="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 blur-3xl opacity-40 -z-10 animate-pulse" />
                        </span>
                    </h2>
                    <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto font-medium drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                        Comprá al por mayor y maximizá tu ganancia. 
                    </p>
                </div>

                {/* Grid de productos mayoristas - 3 cards en línea */}
                <div className="grid grid-cols-3 gap-2 sm:gap-6 lg:gap-8 mb-6 sm:mb-8 px-2 sm:px-0">
                    {featuredProducts.map((product, index) => (
                        <ProductCardMayorista
                            key={product.id || index}
                            product={product}
                            onClick={onProductClick}
                            index={index}
                        />
                    ))}
                </div>

                {/* Botón Ver Más */}
                <div className="flex justify-center pt-10">
                    <button
                        onClick={handleVerMas}
                        className="group relative inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 rounded-full font-bold text-white text-sm sm:text-base shadow-lg shadow-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/40 transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                        <Package className="w-5 h-5"  />
                        <span>Ver todos los packs mayoristas</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default RevendedoresSection;
