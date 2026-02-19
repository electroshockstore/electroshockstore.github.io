import { Package, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MotionReveal from '../Shared/MotionReveal';

// Opción C - Bento Grid: Producto principal 60% + Sidebar con 2 cards apiladas
const RevendedoresSectionC = ({ products = [], onProductClick }) => {
    const navigate = useNavigate();

    const featuredProduct = products.find(p => p.id === 1508);
    const sideProducts = products.filter(p => p.id === 1513 || p.id === 1514);

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
            className="w-full relative overflow-hidden bg-[#0a0a0f]"
        >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5" />

            <div className="w-full py-16 md:py-20 relative z-10">
                {/* Mobile version */}
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

                {/* Desktop: Bento Grid Layout */}
                <div className="hidden sm:block max-w-7xl mx-auto px-6">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 backdrop-blur-sm rounded-full border border-amber-500/30 mb-6">
                            <Package className="w-4 h-4 text-amber-400" />
                            <span className="text-sm font-bold text-amber-300 uppercase tracking-wider">
                                Productos Destacados
                            </span>
                        </div>
                        <h2 className="text-6xl lg:text-7xl font-black mb-4">
                            <span className="text-white">Packs </span>
                            <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-red-400 bg-clip-text text-transparent relative">
                                Ahorro
                                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 opacity-30 blur-2xl -z-10" />
                            </span>
                        </h2>
                        <p className="text-xl text-gray-300">
                            Comprá al por mayor y <span className="text-amber-400 font-bold">maximizá tu ganancia</span>
                        </p>
                    </div>

                    {/* Bento Grid */}
                    <div className="grid grid-cols-3 gap-6 mb-12">
                        {/* Producto principal - 2 columnas */}
                        {featuredProduct && (
                            <div 
                                onClick={() => handleProductClick(featuredProduct)}
                                className="col-span-2 relative group cursor-pointer"
                            >
                                {/* Card principal */}
                                <div className="relative h-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border-2 border-amber-500/30 hover:border-amber-500/60 transition-all duration-500 overflow-hidden">
                                    {/* Glow effect */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    
                                    {/* Content grid */}
                                    <div className="relative grid grid-cols-2 gap-8 h-full">
                                        {/* Izquierda: Imagen */}
                                        <div className="flex items-center justify-center">
                                            <div className="relative">
                                                <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-3xl" />
                                                <img 
                                                    src={featuredProduct.images[0]} 
                                                    alt={featuredProduct.name}
                                                    className="relative w-full max-w-sm aspect-square object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-500"
                                                />
                                            </div>
                                        </div>

                                        {/* Derecha: Info */}
                                        <div className="flex flex-col justify-center space-y-6">
                                            <div>
                                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-full mb-4">
                                                    <Sparkles className="w-4 h-4 text-green-400" />
                                                    <span className="text-sm font-bold text-green-400">Destacado</span>
                                                </div>
                                                <h3 className="text-3xl font-black text-white mb-3 group-hover:text-amber-400 transition-colors">
                                                    {featuredProduct.name}
                                                </h3>
                                                <p className="text-gray-400 text-sm leading-relaxed">
                                                    Pack mayorista con el mejor precio del mercado. Ideal para revendedores.
                                                </p>
                                            </div>

                                            <div className="space-y-3">
                                                <div className="flex items-baseline gap-3">
                                                    <span className="text-5xl font-black text-amber-400">
                                                        ${featuredProduct.price.toLocaleString()}
                                                    </span>
                                                    <span className="text-lg text-gray-500 line-through">
                                                        ${Math.round(featuredProduct.price / (1 - featuredProduct.discount / 100)).toLocaleString()}
                                                    </span>
                                                </div>
                                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 rounded-xl">
                                                    <span className="text-white font-black text-xl">-{featuredProduct.discount}%</span>
                                                    <span className="text-white text-sm">de descuento</span>
                                                </div>
                                            </div>

                                            <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 rounded-xl font-bold text-white shadow-lg shadow-amber-500/30 group-hover:shadow-xl group-hover:shadow-amber-500/50 transition-all">
                                                <span>Ver detalles</span>
                                                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Sidebar derecho - Cards apiladas */}
                        <div className="space-y-6">
                            {sideProducts.map((product, index) => (
                                <div
                                    key={product.id}
                                    onClick={() => handleProductClick(product)}
                                    className="group bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-amber-500/50 transition-all duration-300 cursor-pointer hover:scale-105"
                                >
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-16 h-16 rounded-xl bg-gray-800 p-2 flex-shrink-0">
                                            <img 
                                                src={product.images[0]} 
                                                alt={product.name}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-white font-bold text-sm mb-1 group-hover:text-amber-400 transition-colors truncate">
                                                {product.name}
                                            </h3>
                                            <div className="flex items-center gap-2">
                                                <span className="text-amber-400 font-black text-lg">
                                                    ${product.price.toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between pt-3 border-t border-gray-700/50">
                                        <span className="text-xs text-green-400 font-bold bg-green-500/20 px-3 py-1 rounded-full">
                                            -{product.discount}% OFF
                                        </span>
                                        <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Button */}
                    <div className="flex justify-center">
                        <button
                            onClick={handleVerMas}
                            className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 rounded-2xl font-black text-white text-lg shadow-2xl shadow-amber-500/40 hover:shadow-3xl hover:shadow-amber-500/60 transition-all duration-300 hover:scale-110"
                        >
                            <Package className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                            <span>Ver todos los packs mayoristas</span>
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </MotionReveal>
    );
};

export default RevendedoresSectionC;
