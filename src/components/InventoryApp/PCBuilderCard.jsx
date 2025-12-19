import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, CheckCircle2 } from 'lucide-react';

const PCBuilderCard = ({ 
    // ... (props sin cambios)
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
    mode = 'manual' // 'assisted' or 'manual'
}) => {
    const navigate = useNavigate();
    const isMobile = window.innerWidth < 768;

    const handleClick = () => {
        const route = mode === 'assisted' ? '/armatupc/asistido' : '/armatupc/manual';
        navigate(route);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: isMobile ? delay * 0.5 : delay, duration: isMobile ? 0.3 : 0.5 }}
            onClick={handleClick}
            className="
                group relative overflow-hidden rounded-3xl transition-all duration-300 cursor-pointer 
                hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-900/40
                border border-gray-800
                ring-1 ring-white/10
            "
        >
            {/* Background Image with Blur - Optimizado */}
            <div className="absolute inset-0">
                <img 
                    src="/images/builder.png" 
                    alt={title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover brightness-50 group-hover:brightness-60 transition-all duration-300"
                    style={{ filter: isMobile ? 'blur(1px)' : 'blur(2px)' }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 p-8 lg:p-12 min-h-[400px] lg:min-h-[500px] flex flex-col justify-between backdrop-blur-sm">
                {/* Header */}
                <div>
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${badgeColor} backdrop-blur-sm mb-6`}>
                        <BadgeIcon className="w-5 h-5" />
                        <span className="text-sm font-bold uppercase tracking-wider">{badge}</span>
                    </div>

                    <h3 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-4 leading-tight">
                        {title}
                        <br />
                        <span className={titleHighlightColor}>{titleHighlight}</span>
                    </h3>

                    <p className="text-lg lg:text-xl text-gray-300 leading-relaxed mb-6">
                        {description}
                    </p>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                    {features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-gray-200">
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                            <span className="text-sm lg:text-base">{feature}</span>
                        </div>
                    ))}
                </div>

                {/* CTA Button */}
                <button className={`w-full py-4 px-6 ${buttonGradient} rounded-xl font-bold text-white text-lg transition-all duration-200 shadow-lg flex items-center justify-center gap-3 ${!isMobile && 'group-hover:scale-105'}`}>
                    <ButtonIcon className="w-6 h-6" />
                    <span>{buttonText}</span>
                    <ChevronRight className={`w-5 h-5 ${!isMobile && 'group-hover:translate-x-1'} transition-transform`} />
                </button>
            </div>
        </motion.div>
    );
};

export default PCBuilderCard;