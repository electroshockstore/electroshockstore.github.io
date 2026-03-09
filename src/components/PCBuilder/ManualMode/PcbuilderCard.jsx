import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import useIOSDetection from '../../../hooks/useIOSDetection';

const PCBuilderCard = ({
    badge,
    badgeIcon: BadgeIcon,
    title,
    titleHighlight,
    description,
    buttonText,
    buttonIcon: ButtonIcon,
}) => {
    const navigate = useNavigate();
    const isIOS = useIOSDetection();

    const handleClick = () => navigate('/armatupc');

    return (
        <div
            onClick={handleClick}
            className="
                group relative h-full min-h-[320px] sm:min-h-0
                overflow-hidden sm:rounded-2xl cursor-pointer
                transition-all duration-300 active:scale-[0.98]
                sm:border sm:border-purple-500/40 sm:ring-2 sm:ring-purple-500/30
                sm:shadow-xl sm:shadow-purple-900/50 hover:shadow-2xl hover:shadow-purple-900/60
            "
            style={{ 
                boxShadow: typeof window !== 'undefined' && window.innerWidth >= 640 ? '0 0 30px rgba(168, 85, 247, 0.4), 0 0 60px rgba(147, 51, 234, 0.2)' : 'none'
            }}
        >

            {/* Glow inferior */}
            <div 
                className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-purple-600/30 via-purple-500/10 to-transparent pointer-events-none z-20" 
                style={{ filter: 'blur(24px)' }}
            />

            {/* ── Scanlines overlay ── */}
            <div
                aria-hidden="true"
                className="
                    absolute inset-0 z-[2] pointer-events-none rounded-[inherit]
                    [background:repeating-linear-gradient(to_bottom,transparent,transparent_3px,rgba(0,0,0,0.07)_3px,rgba(0,0,0,0.07)_4px)]
                "
            />

            {/* ── Corner accents ── */}
            <div aria-hidden="true" className="absolute top-2.5 left-2.5 w-5 h-5 sm:w-6 sm:h-6 border-t-2 border-l-2 border-purple-500/90 z-20" />
            <div aria-hidden="true" className="absolute bottom-2.5 right-2.5 w-5 h-5 sm:w-6 sm:h-6 border-b-2 border-r-2 border-purple-500/90 z-20" />

            {/* ── Background image + gradients ── */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/images/category_filter/builder.webp"
                    alt=""
                    loading="eager"
                    decoding="async"
                    width="1920"
                    height="1080"
                    className="
                        w-full h-full object-cover
                        brightness-[0.55] sm:group-hover:brightness-[0.65]
                        transition-all duration-500
                        [transform:translateZ(0)] [backface-visibility:hidden]
                    "
                />
                {/* Gradient stack */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/90 via-black/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                {/* Bottom purple glow */}
                <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-purple-900/45 to-transparent" />
            </div>

            {/* ── Ghost number ── */}
            <div
                aria-hidden="true"
                className="
                    absolute right-[-10px] bottom-[-20px] z-[1]
                    text-[7rem] sm:text-[8rem]
                    font-['Bebas_Neue',sans-serif] leading-none
                    text-white/[0.03] select-none pointer-events-none
                    group-hover:[animation:glitch-clip_0.4s_steps(1)_1]
                "
            >
                01
            </div>

            {/* ═══════════════════════════════════════
                CONTENT LAYER
            ═══════════════════════════════════════ */}
            <div className="relative z-10 p-4 sm:p-7 lg:p-9 h-full min-h-[320px] sm:min-h-0 flex flex-col justify-between gap-6 sm:gap-20">

                {/* ── TOP ROW: badge + index ── */}
                <div className="flex items-start justify-between">

                    {/* Badge */}
                    <div className="
                        inline-flex items-center gap-1.5
                        px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-[3px]
                        text-[0.6rem] sm:text-[0.7rem] font-bold tracking-[0.14em] uppercase
                        bg-purple-500/[0.18] border border-purple-500/55 text-purple-200
                        backdrop-blur-md
                    ">
                        <BadgeIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-80" />
                        {badge}
                    </div>

                    {/* Category index */}
                    <span className="
                        font-['Barlow_Condensed',sans-serif]
                        text-[0.65rem] tracking-[0.2em] uppercase
                        text-purple-300/45 mt-0.5
                    ">
                        PC BUILD /&nbsp;01
                    </span>
                </div>

                {/* ── CENTER: eyebrow + hero title ── */}
                <div className="flex-1 flex items-end">
                    <div>

                        {/* Eyebrow */}
                        <div className="flex items-center gap-2 mb-1.5">
                            <div className="h-px w-12 bg-gradient-to-r from-purple-600/50 to-transparent" />
                            <span className="
                                font-['Barlow_Condensed',sans-serif]
                                text-[0.68rem] tracking-[0.22em] uppercase
                                text-purple-200/65
                            ">
                                Configurador
                            </span>
                        </div>

                        {/* ── MOBILE title: 3 separate blocks ── */}
                        <h3 className="
                            block sm:hidden
                            leading-[0.85] font-black text-white
                            tracking-[-0.05em] mt-3
                            [text-shadow:3px_3px_0px_rgba(0,0,0,0.9),6px_6px_0px_rgba(0,0,0,0.6)]
                        ">
                            <span className="text-[3.2rem]">{title}</span>

                            <br />

                            {/* "Combo" highlight block */}
                            <span className="relative inline-block mt-0.5 text-[3.5rem]">
                                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 -skew-x-6 -rotate-1 opacity-95 blur-[0.5px]" />
                                <span className="relative text-black px-1.5 font-black [text-shadow:2px_2px_0px_rgba(0,0,0,0.4)]">
                                    Combo
                                </span>
                                <span className={`absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-60 ${isIOS ? 'blur-lg' : 'blur-xl animate-pulse'}`} />
                            </span>

                            <br />

                            {/* "ideal" highlight block */}
                            <span className="relative inline-block mt-0.5 text-[4rem]">
                                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 -skew-x-6 -rotate-1 opacity-95 blur-[0.5px]" />
                                <span className="relative text-black px-1.5 font-black [text-shadow:2px_2px_0px_rgba(0,0,0,0.4)]">
                                    ideal
                                </span>
                                <span className={`absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-60 ${isIOS ? 'blur-lg' : 'blur-xl animate-pulse'}`} />
                            </span>
                        </h3>

                        {/* ── DESKTOP title: 2 lines ── */}
                        <h3 className="
                            hidden sm:block
                            text-7xl lg:text-8xl xl:text-[9rem] 2xl:text-[9rem]
                            leading-[0.8] font-black text-white
                            tracking-[-0.05em]
                            [text-shadow:5px_5px_0px_rgba(0,0,0,0.9),10px_10px_0px_rgba(0,0,0,0.6)]
                        ">
                            {title}
                            <br />
                            <span className="relative inline-block mt-1 whitespace-nowrap">
                                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 -skew-x-6 -rotate-1 opacity-95 blur-[0.5px]" />
                                <span className="relative text-black px-4 font-black [text-shadow:3px_3px_0px_rgba(0,0,0,0.4)]">
                                    {titleHighlight}
                                </span>
                                <span className={`absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-60 ${isIOS ? 'blur-lg' : 'blur-xl animate-pulse'}`} />
                            </span>
                        </h3>

                        {/* Description */}
                        {description && (
                            <p className="
                                font-['Barlow_Condensed',sans-serif]
                                text-xs sm:text-sm tracking-[0.04em]
                                text-purple-100/60 leading-[1.35]
                                mt-2 sm:mt-2.5 max-w-[260px]
                            ">
                                {description}
                            </p>
                        )}
                    </div>
                </div>

                {/* ── BOTTOM ROW: CTA ── */}
                <div className="flex items-center justify-between">

                    {/* CTA button */}
                    <div className="inline-flex items-center gap-2 sm:gap-2.5 cursor-pointer">
                        <div className="
                            w-8 h-8 sm:w-9 sm:h-9 rounded-full flex-shrink-0
                            flex items-center justify-center
                            border border-purple-500/70
                            transition-colors duration-250
                            group-hover:bg-purple-500/25 group-hover:border-purple-500
                        ">
                            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-300" strokeWidth={2.5} />
                        </div>
                        <span className="
                            font-['Barlow_Condensed',sans-serif]
                            text-[0.75rem] sm:text-[0.85rem] font-bold tracking-[0.18em] uppercase
                            text-purple-200 border-b border-purple-500/60 pb-0.5
                            transition-colors duration-200
                            group-hover:text-white group-hover:border-purple-500
                        ">
                            {buttonText}
                        </span>
                    </div>

                    {/* Right: subtle icon accent */}
                    {ButtonIcon && (
                        <div className="opacity-35">
                            <ButtonIcon className="w-4 h-4 text-purple-300" />
                        </div>
                    )}
                </div>

            </div>{/* /content */}

        </div>
    );
};

export default PCBuilderCard;