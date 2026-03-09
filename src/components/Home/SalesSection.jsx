import { useState } from "react";

/* ── SVG ICONS ─────────────────────────────────────────── */
const IconPrice = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <polygon points="24,4 44,14 44,34 24,44 4,34 4,14" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.3"/>
    <polygon points="24,10 38,17.5 38,32.5 24,38 10,32.5 10,17.5" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5"/>
    <line x1="24" y1="14" x2="24" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <line x1="24" y1="32" x2="24" y2="34" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M19 20.5 C19 18.5 21 17 24 17 C27 17 29 18.5 29 20.5 C29 25 19 23 19 27.5 C19 29.8 21 31 24 31 C27 31 29 29.5 29 27.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <circle cx="36" cy="10" r="2" fill="currentColor" opacity="0.6"/>
    <circle cx="12" cy="38" r="2" fill="currentColor" opacity="0.6"/>
    <line x1="36" y1="10" x2="44" y2="14" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
  </svg>
);

const IconShip = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="4" y="28" width="40" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.3"/>
    <path d="M8 28 L12 16 L36 16 L40 28" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <rect x="18" y="8" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <line x1="24" y1="8" x2="24" y2="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="14" cy="38" r="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <circle cx="34" cy="38" r="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <line x1="4" y1="28" x2="4" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    <line x1="44" y1="28" x2="44" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    {/* Speed lines */}
    <line x1="2" y1="20" x2="8" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
    <line x1="2" y1="24" x2="6" y2="24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
    <line x1="2" y1="16" x2="5" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3"/>
  </svg>
);

const IconShield = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M24 4 L40 10 L40 26 C40 34 32 41 24 44 C16 41 8 34 8 26 L8 10 Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <path d="M24 10 L34 14 L34 26 C34 31 29 36 24 38 C19 36 14 31 14 26 L14 14 Z" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5"/>
    {/* Checkmark */}
    <path d="M17 24 L22 29 L31 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    {/* Corner details */}
    <circle cx="40" cy="10" r="2" fill="currentColor" opacity="0.5"/>
    <circle cx="8" cy="10" r="2" fill="currentColor" opacity="0.5"/>
    <line x1="40" y1="10" x2="44" y2="8" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
    <line x1="8" y1="10" x2="4" y2="8" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
  </svg>
);

/* ── CIRCUIT BG SVG ─────────────────────────────────────── */
const CircuitBg = () => (
  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Horizontal traces */}
    <path d="M0 80 H120 L150 110 H400" stroke="rgba(239,68,68,0.15)" strokeWidth="1.5"/>
    <path d="M0 200 H80 L100 220 H250 L280 250 H500" stroke="rgba(239,68,68,0.1)" strokeWidth="1"/>
    <path d="M800 150 H600 L570 180 H400 L370 150 H300" stroke="rgba(239,68,68,0.12)" strokeWidth="1.5"/>
    <path d="M800 350 H650 L620 320 H480" stroke="rgba(239,68,68,0.1)" strokeWidth="1"/>
    <path d="M0 420 H200 L230 390 H600 L630 420 H800" stroke="rgba(239,68,68,0.08)" strokeWidth="1"/>

    {/* Vertical traces */}
    <path d="M150 0 V80 L180 110 V200" stroke="rgba(239,68,68,0.1)" strokeWidth="1"/>
    <path d="M400 0 V60 L420 80 V160" stroke="rgba(239,68,68,0.12)" strokeWidth="1.5"/>
    <path d="M600 500 V380 L580 360 V280" stroke="rgba(239,68,68,0.1)" strokeWidth="1"/>
    <path d="M250 500 V420 L270 400 V300" stroke="rgba(239,68,68,0.08)" strokeWidth="1"/>

    {/* Nodes / pads */}
    <circle cx="150" cy="110" r="4" fill="none" stroke="rgba(239,68,68,0.3)" strokeWidth="1.5"/>
    <circle cx="150" cy="110" r="2" fill="rgba(239,68,68,0.3)"/>
    <circle cx="400" cy="80" r="4" fill="none" stroke="rgba(239,68,68,0.25)" strokeWidth="1.5"/>
    <circle cx="400" cy="80" r="2" fill="rgba(239,68,68,0.25)"/>
    <circle cx="570" cy="180" r="4" fill="none" stroke="rgba(239,68,68,0.2)" strokeWidth="1.5"/>
    <circle cx="570" cy="180" r="2" fill="rgba(239,68,68,0.2)"/>
    <circle cx="280" cy="250" r="4" fill="none" stroke="rgba(239,68,68,0.2)" strokeWidth="1.5"/>
    <circle cx="230" cy="390" r="3" fill="rgba(239,68,68,0.2)"/>
    <circle cx="630" cy="420" r="3" fill="rgba(239,68,68,0.15)"/>

    {/* IC chip shapes */}
    <rect x="60" y="160" width="40" height="28" rx="2" stroke="rgba(239,68,68,0.15)" strokeWidth="1" fill="none"/>
    <line x1="68" y1="160" x2="68" y2="155" stroke="rgba(239,68,68,0.15)" strokeWidth="1"/>
    <line x1="76" y1="160" x2="76" y2="155" stroke="rgba(239,68,68,0.15)" strokeWidth="1"/>
    <line x1="84" y1="160" x2="84" y2="155" stroke="rgba(239,68,68,0.15)" strokeWidth="1"/>
    <line x1="68" y1="188" x2="68" y2="193" stroke="rgba(239,68,68,0.15)" strokeWidth="1"/>
    <line x1="76" y1="188" x2="76" y2="193" stroke="rgba(239,68,68,0.15)" strokeWidth="1"/>
    <line x1="84" y1="188" x2="84" y2="193" stroke="rgba(239,68,68,0.15)" strokeWidth="1"/>

    <rect x="680" y="260" width="50" height="35" rx="2" stroke="rgba(239,68,68,0.12)" strokeWidth="1" fill="none"/>
    <line x1="690" y1="260" x2="690" y2="254" stroke="rgba(239,68,68,0.12)" strokeWidth="1"/>
    <line x1="700" y1="260" x2="700" y2="254" stroke="rgba(239,68,68,0.12)" strokeWidth="1"/>
    <line x1="710" y1="260" x2="710" y2="254" stroke="rgba(239,68,68,0.12)" strokeWidth="1"/>

    {/* Grid dots */}
    {[...Array(8)].map((_, x) =>
      [...Array(5)].map((_, y) => (
        <circle key={`${x}-${y}`} cx={100 * x + 50} cy={100 * y + 50} r="1.5" fill="rgba(239,68,68,0.08)"/>
      ))
    )}
  </svg>
);

/* ── CORNER BRACKET SVG ─────────────────────────────────── */
const CornerBracket = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M2 12 L2 2 L12 2" stroke="currentColor" strokeWidth="2" strokeLinecap="square"/>
  </svg>
);

/* ── CARD ───────────────────────────────────────────────── */
const offers = [
  {
    id: "01",
    label: "PRECIO",
    title: "Mejor precio\ndel mercado",
    stat: "-40%",
    statLabel: "vs competencia",
    body: "Monitoreamos precios en tiempo real. Te garantizamos el mejor valor en componentes, o te devolvemos la diferencia.",
    icon: IconPrice,
    color: "#ef4444",
    glow: "rgba(239,68,68,0.18)",
    tag: "GARANTIZADO",
  },
  {
    id: "02",
    label: "ENVÍO",
    title: "Express\n24–48 hs",
    stat: "100%",
    statLabel: "trazabilidad",
    body: "Despacho el mismo día en pedidos antes de las 15hs. Tracking en tiempo real desde el depósito hasta tu puerta.",
    icon: IconShip,
    color: "#f97316",
    glow: "rgba(249,115,22,0.18)",
    tag: "EXPRESS",
  },
  {
    id: "03",
    label: "GARANTÍA",
    title: "Soporte\ntécnico total",
    stat: "12M",
    statLabel: "de cobertura",
    body: "Garantía oficial en todos los productos. Servicio técnico especializado con respuesta en menos de 24 horas.",
    icon: IconShield,
    color: "#22d3ee",
    glow: "rgba(34,211,238,0.18)",
    tag: "CERTIFICADO",
  },
];

const SaleCard = ({ offer, index }) => {
  const [hovered, setHovered] = useState(false);
  const Icon = offer.icon;

  return (
    <div
      className="relative flex flex-col cursor-default select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ animationDelay: `${index * 120}ms` }}
    >
      {/* Outer glow */}
      <div
        className="absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: `0 0 60px 0 ${offer.glow}`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Card body */}
      <div
        className="relative rounded-2xl overflow-hidden flex flex-col h-full transition-transform duration-300"
        style={{
          background: hovered
            ? `linear-gradient(145deg, #111114 0%, #0c0c0f 100%)`
            : `linear-gradient(145deg, #0e0e11 0%, #0a0a0d 100%)`,
          border: `1px solid ${hovered ? offer.color + '50' : 'rgba(255,255,255,0.07)'}`,
          transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        }}
      >
        {/* Top colored bar */}
        <div
          className="h-0.5 w-full transition-all duration-500"
          style={{
            background: `linear-gradient(to right, transparent, ${offer.color}, transparent)`,
            opacity: hovered ? 1 : 0.4,
          }}
        />

        {/* Inner scanline texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)',
          }}
        />

        <div className="p-6 flex flex-col gap-5 flex-1">
          {/* Header row */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              {/* ID */}
              <span
                className="font-mono text-xs font-bold tracking-[0.2em] opacity-40"
                style={{ color: offer.color }}
              >
                {offer.id}
              </span>
              {/* Label pill */}
              <span
                className="text-[9px] font-black tracking-[0.25em] uppercase px-2 py-0.5 rounded"
                style={{
                  background: offer.color + '18',
                  color: offer.color,
                  border: `1px solid ${offer.color}35`,
                }}
              >
                {offer.label}
              </span>
            </div>

            {/* Tag top-right */}
            <span
              className="text-[8px] font-bold tracking-[0.2em] uppercase opacity-40"
              style={{ color: offer.color }}
            >
              {offer.tag}
            </span>
          </div>

          {/* Icon + stat row */}
          <div className="flex items-center gap-4">
            {/* Icon container */}
            <div
              className="relative w-14 h-14 flex-shrink-0 rounded-xl flex items-center justify-center transition-all duration-300 p-2.5"
              style={{
                background: hovered ? offer.color + '18' : offer.color + '0d',
                color: offer.color,
                border: `1px solid ${offer.color}${hovered ? '40' : '20'}`,
              }}
            >
              <Icon />
              {/* Corner brackets on icon box */}
              <CornerBracket className="absolute top-1 left-1 w-3 h-3 opacity-60" style={{ color: offer.color }} />
              <CornerBracket className="absolute bottom-1 right-1 w-3 h-3 opacity-60 rotate-180" style={{ color: offer.color }} />
            </div>

            {/* Big stat */}
            <div>
              <div
                className="font-black leading-none tracking-tight"
                style={{
                  fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
                  fontSize: 'clamp(2rem, 4vw, 2.6rem)',
                  color: offer.color,
                  textShadow: hovered ? `0 0 30px ${offer.color}80` : 'none',
                  transition: 'text-shadow 0.3s',
                }}
              >
                {offer.stat}
              </div>
              <div className="text-[10px] font-medium tracking-widest uppercase text-white/30 mt-0.5">
                {offer.statLabel}
              </div>
            </div>
          </div>

          {/* Divider with circuit node */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${offer.color}40, transparent)` }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: offer.color, opacity: 0.5 }} />
            <div className="w-6 h-px" style={{ background: `rgba(255,255,255,0.06)` }} />
          </div>

          {/* Title */}
          <h3
            className="font-black leading-tight text-white"
            style={{
              fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
              fontSize: 'clamp(1.4rem, 2.5vw, 1.75rem)',
              letterSpacing: '0.02em',
              whiteSpace: 'pre-line',
            }}
          >
            {offer.title}
          </h3>

          {/* Body */}
          <p className="text-white/45 text-sm leading-relaxed flex-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {offer.body}
          </p>

          {/* Bottom action row */}
          <div className="flex items-center justify-between mt-auto pt-1">
            <button
              className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest transition-all duration-200"
              style={{
                color: hovered ? offer.color : 'rgba(255,255,255,0.3)',
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Saber más
              <svg viewBox="0 0 16 16" className="w-3 h-3 transition-transform duration-200" style={{ transform: hovered ? 'translateX(3px)' : 'none' }} fill="none">
                <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Mini circuit decoration */}
            <div className="flex items-center gap-1 opacity-30">
              <div className="w-3 h-px rounded" style={{ background: offer.color }} />
              <div className="w-1.5 h-1.5 rounded-sm border" style={{ borderColor: offer.color }} />
              <div className="w-1 h-px rounded" style={{ background: offer.color }} />
            </div>
          </div>
        </div>

        {/* Bottom colored bar */}
        <div
          className="h-px w-full"
          style={{
            background: `linear-gradient(to right, transparent, ${offer.color}30, transparent)`,
          }}
        />
      </div>
    </div>
  );
};

/* ── SECTION ────────────────────────────────────────────── */
const SalesSection = () => {
  return (
    <section
      className="relative w-full overflow-hidden py-20 md:py-28"
      style={{ background: 'linear-gradient(180deg, #060608 0%, #08080b 50%, #060608 100%)' }}
    >
      {/* Circuit background */}
      <CircuitBg />

      {/* Radial center glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.05) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">

        {/* HEADER */}
        <div className="mb-14 md:mb-16">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-px bg-red-500 opacity-70" />
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 opacity-70" />
              <div className="w-8 h-px bg-red-500 opacity-70" />
            </div>
            <span
              className="text-[10px] font-bold tracking-[0.3em] uppercase"
              style={{ color: 'rgba(239,68,68,0.7)', fontFamily: "'DM Sans', sans-serif" }}
            >
              Por qué elegirnos
            </span>
            <div className="flex items-center gap-1.5">
              <div className="w-8 h-px bg-red-500 opacity-70" />
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 opacity-70" />
              <div className="w-4 h-px bg-red-500 opacity-70" />
            </div>
          </div>

          {/* Main title */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2
                className="font-black text-white leading-none tracking-tight"
                style={{
                  fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
                  fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
                  letterSpacing: '-0.01em',
                }}
              >
                TRES RAZONES
                <br />
                <span
                  className="text-transparent"
                  style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.2)' }}
                >
                  PARA ELEGIRNOS
                </span>
              </h2>
            </div>

            {/* Right side descriptor */}
            <div className="flex items-start gap-3 max-w-xs">
              <div className="w-px self-stretch bg-red-500/20 flex-shrink-0 mt-1" />
              <p
                className="text-white/35 text-sm leading-relaxed"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Precios que desafían el mercado. Logística de primer nivel. Garantía sin letra chica.
              </p>
            </div>
          </div>
        </div>

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {offers.map((offer, i) => (
            <SaleCard key={offer.id} offer={offer} index={i} />
          ))}
        </div>

        {/* FOOTER STRIP */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            {["PAGO SEGURO", "ENVÍO ASEGURADO", "SOPORTE 24/7"].map((t) => (
              <div key={t} className="flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-red-500 opacity-60" />
                <span
                  className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/25"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {t}
                </span>
              </div>
            ))}
          </div>

          <button
            className="group flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-xs tracking-widest uppercase transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              background: 'rgba(239,68,68,0.12)',
              color: '#ef4444',
              border: '1px solid rgba(239,68,68,0.25)',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.2)'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.5)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.12)'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.25)'; }}
          >
            Ver todo el catálogo
            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" fill="none">
              <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default SalesSection;