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
                active:scale-[0.98] sm:hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-900/40
                border-y sm:border border-gray-800 sm:ring-1 sm:ring-white/10"
            style={{ animationDelay: `${delay * 0.15}s` }}
        >
            {/* Background Image */}
            <div className="absolute inset-0">
                <img 
                    src="/images/category_filter/builder.png" 
                    alt=""
                    loading="eager"
                    decoding="async"
                    width="1920"
                    height="1080"
                    className="w-full h-full object-cover brightness-[0.6] sm:brightness-[0.65] group-hover:brightness-[0.75] transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            </div>

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

                {/* CTA Modern Style - Next.js/Astro inspired */}
                <div className="flex-none mt-auto pt-6 sm:pt-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/30 transition-all duration-200 group/btn">
                        <ButtonIcon className="w-4 h-4 text-white" />
                        <span className="font-semibold text-white text-sm sm:text-base">{buttonText}</span>
                        <ChevronRight className="w-4 h-4 text-white/60 group-hover/btn:translate-x-0.5 group-hover/btn:text-white transition-all" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PCBuilderCard;