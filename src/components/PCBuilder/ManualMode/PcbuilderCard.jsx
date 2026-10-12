import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

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

    const handleClick = () => navigate('/armatupc');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
        }
    };

    return (
        <div
            role="button"
            tabIndex={0}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            className="
                group relative h-full min-h-[460px] sm:min-h-[520px]
                flex flex-col cursor-pointer select-none
                bg-[#f7f7f7] border-[3px] border-black
                shadow-[8px_8px_0_0_#000]
                transition-[transform,box-shadow] duration-150 ease-out
                hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-[11px_11px_0_0_#000]
                active:translate-x-[4px] active:translate-y-[4px] active:shadow-[4px_4px_0_0_#000]
                focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#c8f500]
            "
        >
            {/* ═══════ HEADER BAR ═══════ */}
            <div className="flex items-stretch justify-between bg-black h-9 sm:h-10 shrink-0">
                <div className="
                    landing-mono font-mono
                    inline-flex items-center gap-2 px-3 sm:px-4
                    bg-[#c8f500] text-black
                    text-[0.62rem] sm:text-[0.7rem] font-bold tracking-[0.14em] uppercase
                ">
                    {BadgeIcon && <BadgeIcon className="w-3.5 h-3.5" strokeWidth={2.5} />}
                    {badge}
                </div>

                <span className="
                    landing-mono font-mono
                    flex items-center px-3 sm:px-4
                    text-[0.62rem] sm:text-[0.7rem] font-bold tracking-[0.2em] uppercase
                    text-[#c8f500]
                ">
                    PC BUILD / 01
                </span>
            </div>

            {/* ═══════ BODY ═══════ */}
            <div className="flex-1 flex flex-col sm:flex-row min-h-0">

                {/* ── TEXT PANEL ── */}
                <div className="
                    relative flex-1 min-w-0 overflow-hidden
                    flex flex-col justify-between gap-8
                    p-4 sm:p-7 lg:p-9
                    bg-[#f7f7f7]
                ">
                    {/* Ghost number (outline) */}
                    <div
                        aria-hidden="true"
                        className="
                            absolute top-2 right-3 sm:right-5 z-0
                            landing-pixel font-black leading-none
                            text-[5rem] sm:text-[7rem]
                            text-transparent [-webkit-text-stroke:2px_rgba(0,0,0,0.14)]
                            pointer-events-none
                        "
                    >
                        01
                    </div>

                    {/* Tag */}
                    <div className="relative z-10">
                        <span className="
                            landing-mono font-mono inline-block
                            bg-black text-[#c8f500]
                            px-2.5 py-1
                            text-[0.62rem] sm:text-[0.68rem] font-bold tracking-[0.18em] uppercase
                        ">
                            Configurador
                        </span>
                    </div>

                    {/* Title + description */}
                    <div className="relative z-10 mt-auto">
                        <h3 className="
                            font-black uppercase text-black
                            leading-[0.88] tracking-[-0.05em]
                            text-[2.9rem] sm:text-6xl lg:text-7xl xl:text-[5.25rem]
                            break-words
                        ">
                            {title}
                            <br />
                            <span className="
                                inline-block mt-1.5 px-2 sm:px-3 pb-1
                                bg-[#c8f500] text-black
                                border-[3px] border-black
                                shadow-[5px_5px_0_0_#000]
                                -rotate-1
                                box-decoration-clone
                            ">
                                {titleHighlight}
                            </span>
                        </h3>

                        {description && (
                            <p className="
                                landing-mono font-mono
                                mt-6 sm:mt-7 max-w-[300px]
                                border-l-4 border-black pl-3
                                text-[0.68rem] sm:text-[0.74rem] font-medium
                                tracking-[0.04em] uppercase leading-[1.5]
                                text-black
                            ">
                                {description}
                            </p>
                        )}
                    </div>

                    {/* CTA */}
                    <div className="relative z-10 flex items-center justify-between gap-3">
                        <div className="
                            landing-mono font-mono
                            inline-flex items-center gap-2.5
                            px-4 py-3
                            bg-[#c8f500] text-black
                            border-[3px] border-black
                            shadow-[4px_4px_0_0_#000]
                            text-[0.68rem] sm:text-[0.76rem] font-bold tracking-[0.16em] uppercase
                            transition-[transform,box-shadow] duration-150
                            group-hover:translate-x-[2px] group-hover:translate-y-[2px]
                            group-hover:shadow-[2px_2px_0_0_#000]
                        ">
                            {ButtonIcon && <ButtonIcon className="w-4 h-4" strokeWidth={2.5} />}
                            {buttonText}
                            <ChevronRight className="w-4 h-4" strokeWidth={3} />
                        </div>
                    </div>
                </div>

                {/* ── IMAGE PANEL ── */}
                <div className="
                    relative order-first sm:order-last
                    h-52 sm:h-auto sm:w-[46%] shrink-0 overflow-hidden
                    bg-black
                    border-b-[3px] sm:border-b-0 sm:border-l-[3px] border-black
                ">
                    <img
                        src="/images/arma_tu_pc.webp"
                        alt="Armá tu combo ideal"
                        loading="eager"
                        decoding="async"
                        width="1920"
                        height="1080"
                        className="
                            absolute inset-0 w-full h-full
                            object-cover object-center
                            contrast-110 saturate-110
                            [transform:translateZ(0)] [backface-visibility:hidden]
                        "
                    />

                    {/* Dot grid */}
                    <div
                        aria-hidden="true"
                        className="
                            absolute inset-0 pointer-events-none opacity-60
                            [background-image:radial-gradient(rgba(200,245,0,0.28)_1px,transparent_1px)]
                            [background-size:14px_14px]
                        "
                    />

                    {/* Bottom fade for the number */}
                    <div
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none"
                    />

                    {/* Big index number */}
                    <span
                        aria-hidden="true"
                        className="
                            absolute bottom-2 right-4
                            landing-mono font-mono font-black leading-none
                            text-5xl sm:text-6xl text-[#c8f500]
                            pointer-events-none
                        "
                    >
                        01
                    </span>
                </div>
            </div>
        </div>
    );
};

export default PCBuilderCard;