import { Package, ArrowRight, Sparkles, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MotionReveal from '../Shared/MotionReveal';

// Opción B - Centered Hero: Producto central grande + Texto superpuesto + Cards laterales
const RevendedoresSectionB = ({ products = [], onProductClick }) => {
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
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent" />
            
            {/* Mobile version */}
            <div className="sm:hidden px-4 py-12">
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

            {/* Desktop: Centered Hero */}
            <div className="hidden sm:block relative min-h-[700px] py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="relative flex items-center justify-center gap-8">
                        {/* Columna izquierda - Cards secundarias */}
                        <div className="flex-1 max-w-xs space-y-6">
                            {sideProducts[0] && (
                                <div
                                    onClick={() => handleProductClick(sideProducts[0])}
                                    className="group bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 hover:border-amber-500/50 transition-all duration-300 cursor-pointer hover:scale-105"
                                >
                                    <div className="w-20 h-20 mx-auto mb-4 rounded-xl bg-gray-800 p-3">
                                        <img 
                                            src={sideProducts[0].images[0]} 
                                            alt={sideProducts[0].name}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <h3 className="text-white font-bold text-center text-sm mb-3 group-hover:text-amber-400 transition-colors">
                                        {sideProducts[0].name}
                                    </h3>
                                    <div className="flex items-center justify-center gap-2">
                                        <span className="text-amber-400 font-black">
                                            ${sideProducts[0].price.toLocaleString()}
                                        </span>
                                        <span className="text-xs text-green-400 font-bold bg-green-500/20 px-2 py-0.5 rounded">
                                            -{sideProducts[0].discount}%
                                        </span>
                                    </div>
                                </div>
                            )}
                            
                            {/* Stats decorativas */}
                            <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 backdrop-blur-xl rounded-2xl p-6 border border-amber-500/20">
                                <Sparkles className="w-8 h-8 text-amber-400 mb-3" />
                                <div className="text-3xl font-black text-white mb-1">+50</div>
                                <div className="text-sm text-gray-400">Productos disponibles</div>
                            </div>
                        </div>

                        {/* Centro - Producto destacado con texto superpuesto */}
                        {featuredProduct && (
                            <div className="relative flex-shrink-0">
                                {/* Glow background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full blur-3xl scale-150" />
                                
                                {/* Producto principal */}
                                <div 
                                    onClick={() => handleProductClick(featuredProduct)}
                                    className="relative w-[400px] h-[500px] cursor-pointer group"
                                >
                                    {/* Imagen del producto */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <img 
                                            src={featuredProduct.images[0]} 
                                            alt={featuredProduct.name}
                                            className="w-full h-full object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>

                                    {/* Texto superpuesto - Arriba */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 text-center w-full">
                                        <h2 className="text-7xl font-black leading-none mb-2">
                                            <span className="text-white drop-shadow-lg">PACKS</span>
                                        </h2>
                                    </div>

                                    {/* Texto superpuesto - Abajo */}
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center w-full">
                                        <h2 className="text-7xl font-black leading-none relative">
                                            <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-red-400 bg-clip-text text-transparent drop-shadow-lg">
                                                AHORRO
                                            </span>
                                            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 opacity-40 blur-2xl -z-10" />
                                        </h2>
                                    </div>

                                    {/* Badge de descuento flotante */}
                                    <div className="absolute -top-4 -right-4 bg-gradient-to-br from-green-500 to-green-600 text-white px-6 py-3 rounded-2xl shadow-2xl shadow-green-500/50 rotate-12 group-hover:rotate-0 transition-transform">
                                        <div className="text-2xl font-black">-{featuredProduct.discount}%</div>
                                        <div className="text-xs uppercase">OFF</div>
                                    </div>

                                    {/* Precio flotante */}
                                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gray-900 to-gray-800 border-2 border-amber-500 px-6 py-3 rounded-2xl shadow-2xl">
                                        <div className="text-amber-400 font-black text-3xl">
                                            ${featuredProduct.price.toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Columna derecha - Cards secundarias */}
                        <div className="flex-1 max-w-xs space-y-6">
                            {sideProducts[1] && (
                                <div
                                    onClick={() => handleProductClick(sideProducts[1])}
                                    className="group bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 hover:border-amber-500/50 transition-all duration-300 cursor-pointer hover:scale-105"
                                >
                                    <div className="w-20 h-20 mx-auto mb-4 rounded-xl bg-gray-800 p-3">
                                        <img 
                                            src={sideProducts[1].images[0]} 
                                            alt={sideProducts[1].name}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <h3 className="text-white font-bold text-center text-sm mb-3 group-hover:text-amber-400 transition-colors">
                                        {sideProducts[1].name}
                                    </h3>
                                    <div className="flex items-center justify-center gap-2">
                                        <span className="text-amber-400 font-black">
                                            ${sideProducts[1].price.toLocaleString()}
                                        </span>
                                        <span className="text-xs text-green-400 font-bold bg-green-500/20 px-2 py-0.5 rounded">
                                            -{sideProducts[1].discount}%
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* Stats decorativas */}
                            <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-xl rounded-2xl p-6 border border-orange-500/20">
                                <Zap className="w-8 h-8 text-orange-400 mb-3" />
                                <div className="text-3xl font-black text-white mb-1">-40%</div>
                                <div className="text-sm text-gray-400">Descuento máximo</div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Button centrado abajo */}
                    <div className="flex justify-center mt-16">
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

export default RevendedoresSectionB;
