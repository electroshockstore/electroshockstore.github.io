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
            className="pc-builder-card-enter group relative overflow-hidden rounded-2xl sm:rounded-3xl transition-all duration-300 cursor-pointer 
                active:scale-[0.98] sm:hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-900/40
                border border-gray-800 ring-1 ring-white/10"
            style={{ animationDelay: `${delay * 0.15}s` }}
        >
            {/* Background Image with Blur */}
            <div className="absolute inset-0">
                <img 
                    src="/images/builder_tiny.webp" 
                    alt=""
                    loading="eager"
                    decoding="async"
                    width="1920"
                    height="1080"
                    className="w-full h-full object-cover brightness-[0.35] sm:brightness-50 group-hover:brightness-60 transition-all duration-300 blur-[2px]"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 p-5 sm:p-8 lg:p-12 min-h-[340px] sm:min-h-[400px] lg:min-h-[500px] flex flex-col justify-between backdrop-blur-sm">
                {/* Header */}
                <div>
                    <div className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full ${badgeColor} backdrop-blur-sm mb-3 sm:mb-4 md:mb-6`}>
                        <BadgeIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">{badge}</span>
                    </div>

                    <h3 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-2 sm:mb-3 md:mb-4 leading-tight">
                        {title}
                        <br />
                        <span className={titleHighlightColor}>{titleHighlight}</span>
                    </h3>

                    <p className="text-sm sm:text-lg lg:text-xl text-gray-300 leading-relaxed mb-3 sm:mb-4 md:mb-6">
                        {description}
                    </p>
                </div>

                {/* Features */}
                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 md:mb-8">
                    {features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 sm:gap-3 text-gray-200">
                            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0" />
                            <span className="text-xs sm:text-sm lg:text-base">{feature}</span>
                        </div>
                    ))}
                </div>

                {/* CTA Button */}
                <button className={`w-full py-3 sm:py-4 px-4 sm:px-6 ${buttonGradient} rounded-xl font-bold text-white text-base sm:text-lg transition-all duration-200 shadow-lg flex items-center justify-center gap-2 sm:gap-3 group-hover:scale-105 active:scale-95`}>
                    <ButtonIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span>{buttonText}</span>
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
};

export default PCBuilderCard;