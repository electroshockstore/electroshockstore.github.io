import { useNavigate } from 'react-router-dom';
import { ChevronRight, CheckCircle2 } from 'lucide-react';

const PCBuilderCard = ({ 
    badge, 
    badgeIcon: BadgeIcon, 
    badgeColor, 
    title, 
    titleHighlight, 
    titleHighlightColor,
    description, 
    features, 
    buttonText, 
    buttonIcon: ButtonIcon,
    buttonGradient,
    delay,
    mode = 'manual'
}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        const route = mode === 'assisted' ? '/armatupc/asistido' : '/armatupc/manual';
        navigate(route);
    };

    return (
        <div
            onClick={handleClick}
            className="pc-builder-card-enter group relative overflow-hidden sm:rounded-3xl transition-all duration-300 cursor-pointer 
                active:scale-[0.98] sm:hover:scale-[1.02]
                border-y sm:border border-gray-800 sm:border-purple-500/40 sm:ring-2 sm:ring-purple-500/30
                sm:shadow-xl sm:shadow-purple-900/50 hover:shadow-2xl hover:shadow-purple-900/60"
            style={{ 
                animationDelay: `${delay * 0.15}s`,
                boxShadow: window.innerWidth >= 640 ? '0 0 30px rgba(168, 85, 247, 0.4), 0 0 60px rgba(147, 51, 234, 0.2)' : 'none'
            }}
        >
            {/* Background Image */}
            <div className="absolute inset-0">
                <img 
                    src="/images/category_filter/builder.webp" 
                    alt=""
                    loading="eager"
                    decoding="async"
                    width="1920"
                    height="1080"
                    className="w-full h-full object-cover brightness-[0.7] sm:group-hover:brightness-[0.85] transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            </div>

            {/* Glow inferior - Solo desktop */}
            <div className="hidden sm:block absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-purple-600/30 via-purple-500/10 to-transparent pointer-events-none z-20" />
            
            {/* Fade-out inferior */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a0a0f] to-transparent pointer-events-none z-20" />

            {/* Content */}
            <div className="relative z-10 p-5 sm:p-8 lg:p-12 min-h-[320px] sm:min-h-[400px] lg:min-h-[500px] flex flex-col">
                {/* Header */}
                <div className="flex-none mb-auto">
                    <div className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full ${badgeColor} backdrop-blur-sm mb-4 sm:mb-6`}>
                        <BadgeIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">{badge}</span>
                    </div>

                    <h3 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-3 sm:mb-4 leading-[1.1]">
                        {title}
                        <br />
                        <span className={titleHighlightColor}>{titleHighlight}</span>
                    </h3>

                    <p className="text-sm sm:text-lg lg:text-xl text-gray-300 leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* CTA Modern Style - Next.js/Astro inspired con glow */}
                <div className="flex-none mt-auto pt-6 sm:pt-8">
                    <div className="relative inline-block">
                        {/* Glow effect del botón */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg opacity-40 blur-md group-hover/btn:opacity-60 transition-opacity duration-200" />
                        
                        <div className="relative inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/15 hover:border-white/40 transition-all duration-200 group/btn shadow-lg">
                            <ButtonIcon className="w-4 h-4 text-white" />
                            <span className="font-semibold text-white text-sm sm:text-base">{buttonText}</span>
                            <ChevronRight className="w-4 h-4 text-white/60 group-hover/btn:translate-x-0.5 group-hover/btn:text-white transition-all" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PCBuilderCard;