import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import useIOSDetection from '../../hooks/useIOSDetection';

const PCBuilderCard = ({ 
    badge, 
    badgeIcon: BadgeIcon, 
    badgeColor, 
    title, 
    titleHighlight, 
    description, 
    buttonText, 
    buttonIcon: ButtonIcon
}) => {
    const navigate = useNavigate();
    const isIOS = useIOSDetection();

    const handleClick = () => {
        navigate('/armatupc');
    };

    return (
        <div
            onClick={handleClick}
            className="pc-builder-card-enter group relative h-full overflow-hidden sm:rounded-3xl transition-all duration-300 cursor-pointer 
                active:scale-[0.98]
                border-y sm:border border-gray-800 sm:border-purple-500/40 sm:ring-2 sm:ring-purple-500/30
                sm:shadow-xl sm:shadow-purple-900/50 hover:shadow-2xl hover:shadow-purple-900/60"
            style={{ 
                boxShadow: window.innerWidth >= 640 ? '0 0 30px rgba(168, 85, 247, 0.4), 0 0 60px rgba(147, 51, 234, 0.2)' : 'none'
            }}
        >
            {/* Background Image - Con aspect-ratio responsive y GPU acceleration */}
            <div className="absolute inset-0 aspect-square md:aspect-video">
                <img 
                    src="/images/category_filter/builder.webp" 
                    alt=""
                    loading="eager"
                    decoding="async"
                    width="1920"
                    height="1080"
                    className="w-full h-full object-cover brightness-[0.65] sm:group-hover:brightness-[0.8] transition-all duration-300"
                    style={{
                        // ⚡ CRÍTICO: GPU acceleration para iOS
                        transform: 'translateZ(0)',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden'
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            </div>

            {/* Glow inferior - Visible en mobile y desktop con filter inline */}
            <div 
                className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-purple-600/30 via-purple-500/10 to-transparent pointer-events-none z-20" 
                style={{ filter: 'blur(24px)' }}
            />
            
            {/* Fade-out inferior */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0a0a0f] to-transparent pointer-events-none z-20" />

            {/* Content */}
            <div className="relative z-10 p-5 sm:p-8 lg:p-10 h-full flex flex-col">
                {/* Header */}
                <div className="flex-none mb-auto">
                    {/* Badge original - Optimizado para iOS */}
                    <div className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full ${badgeColor} ${isIOS ? '' : 'backdrop-blur-sm'} mb-4 sm:mb-6`}>
                        <BadgeIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">{badge}</span>
                    </div>

                    {/* Título BRUTALIST - MAXIMIZADO en desktop */}
                    <h3 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black text-white mb-4 sm:mb-6 leading-[0.9] tracking-tight"
                        style={{
                            textShadow: '3px 3px 0px rgba(0,0,0,0.8), 6px 6px 0px rgba(0,0,0,0.4)'
                        }}>
                        {title}
                        <br />
                        {/* Highlight con efecto marker moderno */}
                        <span className="relative inline-block mt-1 sm:mt-2">
                            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 -skew-x-6 rotate-[-1deg] opacity-95 blur-[0.5px]" />
                            <span className="relative text-black px-2 sm:px-4 font-black"
                                style={{
                                    textShadow: '1px 1px 0px rgba(0,0,0,0.2)'
                                }}>
                                {titleHighlight}
                            </span>
                            {/* Glow sutil - Optimizado para iOS */}
                            <span className={`absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 ${isIOS ? 'blur-lg' : 'blur-xl'} opacity-50 ${isIOS ? '' : 'animate-pulse'}`} />
                        </span>
                    </h3>

                    {/* Description con underline decorativo */}
                    <div className="relative inline-block">
                        <p className="text-sm sm:text-lg lg:text-xl text-white font-bold italic leading-tight relative z-10">
                            {description}
                        </p>
                        {/* Underline decorativo animado - Optimizado para iOS */}
                        <div className={`absolute -bottom-1 left-0 right-0 h-1 sm:h-2 bg-gradient-to-r from-purple-600 to-pink-600 opacity-40 ${isIOS ? 'blur-sm' : 'blur-sm animate-pulse'}`} />
                        <div className="absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-purple-600 to-pink-600" />
                    </div>
                </div>

                {/* CTA original - Next.js/Astro inspired con glow */}
                <div className="flex-none mt-auto pt-6 sm:pt-8">
                    <div className="relative inline-block">
                        {/* Glow effect del botón */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg opacity-40 blur-md group-hover/btn:opacity-60 transition-opacity duration-200" />
                        
                        <div className={`relative inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/30 bg-white/10 ${isIOS ? '' : 'backdrop-blur-sm'} hover:bg-white/15 hover:border-white/40 transition-all duration-200 group/btn shadow-lg`}>
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
