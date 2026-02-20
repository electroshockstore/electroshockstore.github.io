import { Package, ArrowRight, TrendingUp, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProductCardMayorista from './ProductCardMayorista';
import MotionReveal from '../Shared/MotionReveal';

const RevendedoresSection = ({ products = [], onProductClick }) => {
    const navigate = useNavigate();

    const featuredProducts = products.filter(p =>
        p.id === 1508 ||
        p.id === 1513 ||
        p.id === 1514
    );

    const handleVerMas = () => {
        navigate('/categoria/mayorista');
    };

    return (
        <MotionReveal
            as="section"
            animation="slide-up"
            duration={0.7}
            className="w-full flex-1 relative overflow-hidden"
        >
            <style>{`
                @keyframes drift {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(30px, -20px) scale(1.05); }
                    66% { transform: translate(-20px, 15px) scale(0.97); }
                }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes float-tag {
                    0%, 100% { transform: translateY(0px) rotate(-3deg); }
                    50% { transform: translateY(-12px) rotate(3deg); }
                }
                @keyframes shimmer-slide {
                    0% { transform: translateX(-100%) skewX(-15deg); }
                    100% { transform: translateX(300%) skewX(-15deg); }
                }
                @keyframes pulse-ring {
                    0% { transform: scale(1); opacity: 0.6; }
                    100% { transform: scale(1.8); opacity: 0; }
                }
                @keyframes text-glow-pulse {
                    0%, 100% { filter: brightness(1) drop-shadow(0 0 20px rgba(251,146,60,0.4)); }
                    50% { filter: brightness(1.15) drop-shadow(0 0 40px rgba(251,146,60,0.8)); }
                }
                @keyframes marquee-badge {
                    0%, 100% { transform: scale(1) rotate(-2deg); }
                    50% { transform: scale(1.08) rotate(2deg); }
                }
                @keyframes ticker {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }

                .tag-float { animation: float-tag 5s ease-in-out infinite; }
                .text-glow { animation: text-glow-pulse 3s ease-in-out infinite; }
                .badge-bounce { animation: marquee-badge 3s ease-in-out infinite; }
                .cta-shimmer::after {
                    content: '';
                    position: absolute;
                    top: 0; left: 0;
                    width: 40%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
                    animation: shimmer-slide 3s ease-in-out infinite;
                }
                .pulse-ring-el::before {
                    content: '';
                    position: absolute;
                    inset: -4px;
                    border-radius: 9999px;
                    border: 2px solid rgba(251,146,60,0.5);
                    animation: pulse-ring 2s ease-out infinite;
                }
                .pulse-ring-el::after {
                    content: '';
                    position: absolute;
                    inset: -4px;
                    border-radius: 9999px;
                    border: 2px solid rgba(251,146,60,0.3);
                    animation: pulse-ring 2s ease-out infinite 0.6s;
                }

                @media (prefers-reduced-motion: reduce) {
                    .tag-float, .text-glow, .badge-bounce, .cta-shimmer::after { animation: none; }
                }
            `}</style>

            {/* ─── Background ─── */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Animated mesh blobs */}
                <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-30"
                    style={{
                        background: 'radial-gradient(circle, rgba(251,146,60,0.35) 0%, transparent 70%)',
                        animation: 'drift 18s ease-in-out infinite'
                    }} />
                <div className="absolute -bottom-32 -right-32 w-[700px] h-[700px] rounded-full opacity-25"
                    style={{
                        background: 'radial-gradient(circle, rgba(239,68,68,0.3) 0%, transparent 70%)',
                        animation: 'drift 22s ease-in-out infinite reverse'
                    }} />
                {/* Grid pattern overlay */}
                <div className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(251,146,60,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(251,146,60,0.4) 1px, transparent 1px)',
                        backgroundSize: '60px 60px'
                    }} />
                {/* Diagonal accent lines */}
                <div className="hidden lg:block absolute top-0 right-0 w-px h-full opacity-10"
                    style={{ background: 'linear-gradient(to bottom, transparent, rgba(251,191,60,1), transparent)' }} />
                <div className="hidden lg:block absolute top-0 left-1/3 w-px h-full opacity-5"
                    style={{ background: 'linear-gradient(to bottom, transparent, rgba(251,191,60,1), transparent)' }} />
            </div>

            <div className="w-full py-16 sm:py-20 md:py-28 relative z-10">

                {/* ─── HEADER ─── */}
                <div className="text-center mb-16 sm:mb-20 md:mb-24 px-4">

                    {/* Eyebrow pill */}
                    <div className="inline-flex items-center gap-2 mb-8">
                        <div className="relative inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-amber-400/40 bg-amber-500/10 backdrop-blur-md badge-bounce">
                            <div className="relative flex-shrink-0 pulse-ring-el">
                                <div className="w-2 h-2 rounded-full bg-amber-400" />
                            </div>
                            <span className="text-xs font-bold text-amber-300 uppercase tracking-[0.2em]">
                                 Mayoristas
                            </span>
                            <Zap className="w-3.5 h-3.5 text-amber-400" />
                        </div>
                    </div>

                    {/* Main title block */}
                    <div className="relative max-w-5xl mx-auto">

                        {/* Headline con SVG integrado */}
                        <h2 className="font-black leading-[0.9] tracking-tighter mb-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                            <span className="inline text-6xl sm:text-6xl md:text-7xl lg:text-8xl text-white"
                                style={{ letterSpacing: '-0.03em' }}>
                                Kit{' '}
                            </span>
                            <span className="inline text-7xl sm:text-7xl md:text-9xl lg:text-[10rem] relative text-glow"
                                style={{
                                    background: 'linear-gradient(135deg, #fbbf24 0%, #f97316 40%, #ef4444 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    letterSpacing: '-0.04em'
                                }}>
                                Ahorro
                                {/* Decorative slash */}
                                <span className="absolute -right-4 sm:-right-6 top-0 text-amber-500/20 text-[0.5em] font-thin select-none hidden md:block">/</span>
                            </span>
                            
                            {/* SVG tag al lado de Ahorro */}
                            <div className="relative inline-block tag-float">
                                <div className="absolute inset-0 rounded-full"
                                    style={{ background: 'radial-gradient(circle, rgba(251,146,60,0.6) 0%, transparent 60%)', filter: 'blur(20px)', transform: 'scale(1.5)' }} />
                                <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center rounded-2xl border border-amber-400/30"
                                    style={{ background: 'linear-gradient(135deg, rgba(251,191,60,0.2), rgba(239,68,68,0.2))', backdropFilter: 'blur(12px)' }}>
                                    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10">
                                        <defs>
                                            <linearGradient id="tg2" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stopColor="rgb(251,191,60)" />
                                                <stop offset="50%" stopColor="rgb(251,146,60)" />
                                                <stop offset="100%" stopColor="rgb(239,68,68)" />
                                            </linearGradient>
                                        </defs>
                                        <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8 8a2 2 0 0 0 2.828 0l7.172-7.172a2 2 0 0 0 0-2.828l-8-8z"
                                            fill="url(#tg2)" />
                                        <circle cx="7" cy="7" r="1.5" fill="rgba(15,23,42,0.8)" />
                                        <line x1="9" y1="14" x2="15" y2="9" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                </div>
                            </div>
                        </h2>

                        {/* Subheadline row */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
                            <p className="text-base sm:text-xl md:text-2xl text-gray-300 font-medium max-w-xl leading-relaxed">
                                Comprá al por mayor y{' '}
                                <span className="text-amber-300 font-bold">maximizá tu ganancia</span>.
                            </p>

                            {/* Stats pill */}
                            <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10">
                                <TrendingUp className="w-4 h-4 text-emerald-400" />
                                <span className="text-sm font-bold text-emerald-300">Hasta 40% OFF</span>
                            </div>
                        </div>

                        {/* Decorative horizontal rule */}
                        <div className="flex items-center gap-4 mt-10 max-w-xs sm:max-w-sm mx-auto">
                            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(251,146,60,0.5))' }} />
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(251,146,60,0.5))' }} />
                        </div>
                    </div>
                </div>

                {/* ─── PRODUCT GRID — Mobile ─── */}
                <div className="sm:hidden grid grid-cols-3 gap-3 mb-12 px-4">
                    {featuredProducts.map((product, index) => (
                        <ProductCardMayorista
                            key={product.id || index}
                            product={product}
                            onClick={onProductClick}
                            index={index}
                        />
                    ))}
                </div>

                {/* ─── PRODUCT GRID — Desktop ─── */}
                <div className="hidden sm:flex items-center justify-center gap-4 lg:gap-6 xl:gap-8 mb-16 sm:mb-20 px-6 lg:px-12 max-w-7xl mx-auto">
                    {featuredProducts.map((product, index) => (
                        <div key={product.id || index} className="flex-1 max-w-md">
                            <ProductCardMayorista
                                product={product}
                                onClick={onProductClick}
                                index={index}
                            />
                        </div>
                    ))}
                </div>

                {/* ─── CTA BUTTON ─── */}
                <div className="flex justify-center pt-10 sm:pt-14 px-4">
                    <button
                        onClick={handleVerMas}
                        className="group relative overflow-hidden inline-flex items-center gap-3 sm:gap-4 px-8 sm:px-12 py-4 sm:py-5 rounded-2xl font-bold text-white text-sm sm:text-base transition-all duration-300 hover:scale-105 active:scale-95 cta-shimmer"
                        style={{
                            background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 50%, #ef4444 100%)',
                            boxShadow: '0 0 0 1px rgba(251,146,60,0.3), 0 20px 60px -10px rgba(239,68,68,0.5), 0 8px 20px -5px rgba(251,146,60,0.4)'
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.boxShadow = '0 0 0 1px rgba(251,191,60,0.5), 0 30px 80px -10px rgba(239,68,68,0.7), 0 12px 30px -5px rgba(251,146,60,0.6)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.boxShadow = '0 0 0 1px rgba(251,146,60,0.3), 0 20px 60px -10px rgba(239,68,68,0.5), 0 8px 20px -5px rgba(251,146,60,0.4)';
                        }}
                    >
                        {/* Inner dark overlay on hover */}
                        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300 rounded-2xl" />

                        <Package className="relative z-10 w-5 h-5 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform duration-300 flex-shrink-0" />
                        <span className="relative z-10 tracking-wide font-black uppercase text-xs sm:text-sm">
                            Ver todos los kits mayoristas
                        </span>
                        <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300 flex-shrink-0" />
                    </button>
                </div>

                {/* ─── Ticker / Social proof strip ─── */}
                <div className="mt-16 sm:mt-20 overflow-hidden border-y border-amber-500/10 py-3 bg-amber-500/5">
                    <div className="flex whitespace-nowrap" style={{ animation: 'ticker 20s linear infinite' }}>
                        {[...Array(8)].map((_, i) => (
                            <span key={i} className="inline-flex items-center gap-3 px-6 text-xs font-bold text-amber-400/60 uppercase tracking-widest">
                                <span className="w-1 h-1 rounded-full bg-amber-500/50 flex-shrink-0" />
                                Comprá al por mayor
                                <span className="w-1 h-1 rounded-full bg-orange-500/50 flex-shrink-0" />
                                Mejores precios
                                <span className="w-1 h-1 rounded-full bg-red-500/50 flex-shrink-0" />
                                Packs exclusivos
                            </span>
                        ))}
                    </div>
                </div>

            </div>
        </MotionReveal>
    );
};

export default RevendedoresSection;