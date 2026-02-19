import { Package, ArrowRight, TrendingUp, Percent, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MotionReveal from '../Shared/MotionReveal';

// Opción A - Split Hero: Imagen circular izquierda + Texto derecha + Cards abajo
const RevendedoresSectionA = ({ products = [], onProductClick }) => {
    const navigate = useNavigate();

    const featuredProduct = products.find(p => p.id === 1508); // Pandora 2
    const secondaryProducts = products.filter(p => p.id === 1513 || p.id === 1514);

    const handleVerMas = () => {
        navigate('/categoria/mayorista');
    };

    const handleProductClick = (product) => {
        navigate('/categoria/mayorista');
    };

    return (
        <MotionReveal
            as="section"
            animation="slide-up"
            duration={0.7}
            className="w-full relative overflow-hidden bg-gradient-to-b from-[#0a0a0f] to-[#0f0f14]"
        >
            {/* Background effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-3xl" />
            </div>

            <div className="w-full py-16 md:py-20 relative z-10">
                {/* Mobile: Card simple centrada */}
                <div className="sm:hidden px-4">
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-black mb-2">
                            <span className="text-white">Packs </span>
                            <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                                Ahorro
                            </span>
                        </h2>
                        <p className="text-gray-300">Comprá al por mayor</p>
                    </div>
                    {featuredProduct && (
                        <div className="max-w-[280px] mx-auto">
                            <div 
                                onClick={() => handleProductClick(featuredProduct)}
                                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-4 border border-amber-500/30 cursor-pointer"
                            >
                                <img 
                                    src={featuredProduct.images[0]} 
                                    alt={featuredProduct.name}
                                    className="w-full aspect-square object-contain mb-3"
                                />
                                <h3 className="text-white font-bold text-sm mb-2">{featuredProduct.name}</h3>
                                <div className="flex items-center justify-between">
                                    <span className="text-amber-400 font-black text-lg">
                                        ${featuredProduct.price.toLocaleString()}
                                    </span>
                                    <span className="text-xs text-green-400 font-bold">-{featuredProduct.discount}%</span>
                                </div>
                            </div>
                        </div>
                    )}
                    <button
                        onClick={handleVerMas}
                        className="w-full mt-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl font-bold text-white"
                    >
                        Ver todos los packs
                    </button>
                </div>

                {/* Desktop: Split Hero Layout */}
                <div className="hidden sm:block max-w-7xl mx-auto px-6">
                    {/* Hero principal - Split */}
                    <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                        {/* Izquierda: Producto destacado con círculo glow */}
                        {featuredProduct && (
                            <div className="relative">
                                {/* Círculo con glow */}
                                <div className="relative w-full max-w-md mx-auto aspect-square">
                                    {/* Glow rings */}
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-500/30 to-orange-500/30 blur-2xl animate-pulse" />
                                    <div className="absolute inset-4 rounded-full border-2 border-amber-500/40 border-dashed animate-spin-slow" />
                                    
                                    {/* Producto */}
                                    <div 
                                        onClick={() => handleProductClick(featuredProduct)}
                                        className="absolute inset-8 rounded-full bg-gradient-to-br from-gray-900 to-gray-800 border-4 border-amber-500/50 overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-500 group"
                                    >
                                        <img 
                                            src={featuredProduct.images[0]} 
                                            alt={featuredProduct.name}
                                            className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-500"
                                        />
                                        {/* Badge descuento */}
                                        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-black shadow-lg">
                                            -{featuredProduct.discount}%
                                        </div>
                                    </div>

                                    {/* Decorative dots */}
                                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-amber-400 rounded-full animate-ping" />
                                    <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-orange-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
                                </div>
                            </div>
                        )}

                        {/* Derecha: Texto y stats */}
                        <div className="space-y-6">
                            {/* Badge superior */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 backdrop-blur-sm rounded-full border border-amber-500/30">
                                <Package className="w-4 h-4 text-amber-400" />
                                <span className="text-sm font-bold text-amber-300 uppercase tracking-wider">
                                    Productos Destacados
                                </span>
                            </div>

                            {/* Título grande */}
                            <h2 className="text-6xl lg:text-7xl font-black leading-tight">
                                <span className="text-white block mb-2">PACKS</span>
                                <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-red-400 bg-clip-text text-transparent block relative">
                                    AHORRO
                                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 opacity-30 blur-2xl -z-10" />
                                </span>
                            </h2>

                            {/* Descripción */}
                            <p className="text-xl text-gray-300 leading-relaxed">
                                Comprá al por mayor y <span className="text-amber-400 font-bold">maximizá tu ganancia</span>. 
                                Los mejores precios para revendedores.
                            </p>

                            {/* Stats grid */}
                            <div className="grid grid-cols-3 gap-4 pt-4">
                                <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-amber-500/20">
                                    <TrendingUp className="w-6 h-6 text-amber-400 mb-2" />
                                    <div className="text-2xl font-black text-white">+50</div>
                                    <div className="text-xs text-gray-400 uppercase">Productos</div>
                                </div>
                                <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-orange-500/20">
                                    <Percent className="w-6 h-6 text-orange-400 mb-2" />
                                    <div className="text-2xl font-black text-white">-40%</div>
                                    <div className="text-xs text-gray-400 uppercase">Descuento</div>
                                </div>
                                <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-red-500/20">
                                    <ShoppingBag className="w-6 h-6 text-red-400 mb-2" />
                                    <div className="text-2xl font-black text-white">24/7</div>
                                    <div className="text-xs text-gray-400 uppercase">Disponible</div>
                                </div>
                            </div>

                            {/* CTA Button */}
                            <button
                                onClick={handleVerMas}
                                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 rounded-xl font-bold text-white shadow-xl shadow-amber-500/40 hover:shadow-2xl hover:shadow-amber-500/60 transition-all duration-300 hover:scale-105"
                            >
                                <span>Ver todos los packs</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                            </button>
                        </div>
                    </div>

                    {/* Cards secundarias abajo */}
                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {secondaryProducts.map((product) => (
                            <div
                                key={product.id}
                                onClick={() => handleProductClick(product)}
                                className="group bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-amber-500/50 transition-all duration-300 cursor-pointer hover:scale-105"
                            >
                                <div className="flex items-center gap-6">
                                    <div className="w-24 h-24 rounded-xl bg-gray-800 p-3 flex-shrink-0">
                                        <img 
                                            src={product.images[0]} 
                                            alt={product.name}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-white font-bold mb-2 group-hover:text-amber-400 transition-colors">
                                            {product.name}
                                        </h3>
                                        <div className="flex items-center gap-3">
                                            <span className="text-amber-400 font-black text-xl">
                                                ${product.price.toLocaleString()}
                                            </span>
                                            <span className="text-xs text-green-400 font-bold bg-green-500/20 px-2 py-1 rounded">
                                                -{product.discount}%
                                            </span>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-amber-400 group-hover:translate-x-2 transition-all" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </MotionReveal>
    );
};

export default RevendedoresSectionA;
