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
            className="pc-builder-card-enter group relative h-full min-h-[400px] sm:min-h-0 overflow-hidden sm:rounded-3xl transition-all duration-300 cursor-pointer 
                active:scale-[0.98]
                sm:border-y sm:border border-gray-800 sm:border-purple-500/40 sm:ring-2 sm:ring-purple-500/30
                sm:shadow-xl sm:shadow-purple-900/50 hover:shadow-2xl hover:shadow-purple-900/60"
            style={{ 
                boxShadow: window.innerWidth >= 640 ? '0 0 30px rgba(168, 85, 247, 0.4), 0 0 60px rgba(147, 51, 234, 0.2)' : 'none'
            }}
        >
            {/* Background Image - Con aspect-ratio responsive y GPU acceleration */}
            <div className="absolute inset-0">
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

            {/* Glow inferior */}
            <div className="ambient-glow-purple" />

            {/* Content */}
            <div className="relative z-10 p-4 sm:p-6 lg:p-8 h-full min-h-[450px] sm:min-h-0 flex flex-col justify-between">
                {/* Header - Badge GRANDE y protagonista */}
                <div className="flex-none">
                    {/* Badge AGRANDADO - Representa el subtítulo */}
                    <div className={`inline-flex items-center gap-2 sm:gap-3 px-4 py-2.5 sm:px-6 sm:py-3.5 lg:px-8 lg:py-4 rounded-full ${badgeColor} ${isIOS ? '' : 'backdrop-blur-sm'} shadow-lg`}>
                        <BadgeIcon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
                        <span className="text-sm sm:text-base lg:text-lg font-bold uppercase tracking-wider">{badge}</span>
                    </div>
                </div>

                {/* Título BRUTALIST - MAXIMIZADO */}
                <div className="flex-1 flex items-center justify-start">
                    {/* Mobile: 3 bloques separados */}
                    <h3 className="block sm:hidden leading-[0.9] font-black text-white tracking-tighter"
                        style={{
                            textShadow: '5px 5px 0px rgba(0,0,0,0.9), 10px 10px 0px rgba(0,0,0,0.6)',
                            letterSpacing: '-0.05em'
                        }}>
                        <span className="text-[5.2rem]">{title}</span>
                        <br />
                        <span className="relative inline-block mt-1 text-[5.5rem]">
                            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 -skew-x-6 rotate-[-1deg] opacity-95 blur-[0.5px]" />
                            <span className="relative text-black px-2 font-black"
                                style={{
                                    textShadow: '3px 3px 0px rgba(0,0,0,0.4)'
                                }}>
                                Combo
                            </span>
                            <span className={`absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 ${isIOS ? 'blur-lg' : 'blur-xl'} opacity-60 ${isIOS ? '' : 'animate-pulse'}`} />
                        </span>
                        <br />
                        <span className="relative inline-block mt-1 text-[6.5rem]">
                            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 -skew-x-6 rotate-[-1deg] opacity-95 blur-[0.5px]" />
                            <span className="relative text-black px-2 font-black"
                                style={{
                                    textShadow: '3px 3px 0px rgba(0,0,0,0.4)'
                                }}>
                                ideal
                            </span>
                            <span className={`absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 ${isIOS ? 'blur-lg' : 'blur-xl'} opacity-60 ${isIOS ? '' : 'animate-pulse'}`} />
                        </span>
                    </h3>

                    {/* Desktop: Todo en 2 líneas como original */}
                    <h3 className="hidden sm:block text-7xl lg:text-8xl xl:text-[9rem] 2xl:text-[9rem] leading-[0.8] font-black text-white tracking-tighter"
                        style={{
                            textShadow: '5px 5px 0px rgba(0,0,0,0.9), 10px 10px 0px rgba(0,0,0,0.6)',
                            letterSpacing: '-0.05em'
                        }}>
                        {title}
                        <br />
                        <span className="relative inline-block mt-1 whitespace-nowrap">
                            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 -skew-x-6 rotate-[-1deg] opacity-95 blur-[0.5px]" />
                            <span className="relative text-black px-4 font-black"
                                style={{
                                    textShadow: '3px 3px 0px rgba(0,0,0,0.4)'
                                }}>
                                {titleHighlight}
                            </span>
                            <span className={`absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 ${isIOS ? 'blur-lg' : 'blur-xl'} opacity-60 ${isIOS ? '' : 'animate-pulse'}`} />
                        </span>
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default PCBuilderCard;
