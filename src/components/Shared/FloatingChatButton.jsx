import { useState, useEffect } from 'react';
import { Send, X, MapPin, FileText } from 'lucide-react'; 
import { useLocation, useNavigate } from 'react-router-dom';
import Portal from './Portal';

/* ─── CSS embebido – sólo native CSS, sin dependencias extra ─── */
const styles = `
  /* ── Variables globales ── */
  :root {
    --fcb-green:       #00e676;
    --fcb-green-dim:   #00c853;
    --fcb-cyan:        #00e5ff;
    --fcb-orange:      #ff6d00;
    --fcb-red:         #ef5350;
    --fcb-glass:       rgba(10, 14, 22, 0.82);
    --fcb-glass-light: rgba(255,255,255,0.06);
    --fcb-border:      rgba(255,255,255,0.10);
    --fcb-radius:      18px;
    --fcb-radius-sm:   12px;
    --fcb-shadow-g:    0 0 24px rgba(0,230,118,0.35), 0 8px 32px rgba(0,0,0,0.55);
    --fcb-font:        'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  }

  /* ════════════════════════════════
     MENÚ EXPANDIDO – wrapper
  ════════════════════════════════ */
  .fcb-menu-wrapper {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
    margin-bottom: 14px;
    width: calc(100vw - 32px);
    max-width: 420px;
    animation: fcb-slide-up 0.32s cubic-bezier(.22,.68,0,1.2) both;
  }
  @media (min-width: 640px) {
    .fcb-menu-wrapper { 
      width: 380px;
      max-width: 380px;
    }
  }

  /* ── Panel glassmorphism con SVG animado en header ── */
  .fcb-panel {
    background: var(--fcb-glass);
    border: 1px solid var(--fcb-border);
    border-radius: var(--fcb-radius);
    overflow: hidden;
    box-shadow: 0 16px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
  }

  /* ── SVG header decorativo ── */
  .fcb-svg-header {
    width: 100%;
    height: 72px;
    display: block;
    overflow: hidden;
    position: relative;
    background: linear-gradient(135deg, rgba(0,230,118,0.12) 0%, rgba(0,229,255,0.08) 100%);
    border-bottom: 1px solid rgba(0,230,118,0.15);
  }
  @media (min-width: 640px) {
    .fcb-svg-header { height: 64px; }
  }

  /* ── Tarjetas de acción ── */
  .fcb-card {
    position: relative;
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 16px 16px;
    cursor: pointer;
    border: none;
    background: transparent;
    width: 100%;
    text-align: left;
    transition: background 0.18s ease;
    overflow: hidden;
  }
  @media (min-width: 640px) {
    .fcb-card {
      gap: 12px;
      padding: 13px 14px;
    }
  }
  .fcb-card + .fcb-card {
    border-top: 1px solid var(--fcb-border);
  }
  .fcb-card::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 0.18s ease;
  }
  .fcb-card:hover::before { opacity: 1; }
  .fcb-card:active { transform: scale(0.98); }

  /* variantes de color del hover */
  .fcb-card--green::before  { background: linear-gradient(90deg, rgba(0,230,118,0.12), transparent); }
  .fcb-card--cyan::before   { background: linear-gradient(90deg, rgba(0,229,255,0.12), transparent); }
  .fcb-card--orange::before { background: linear-gradient(90deg, rgba(255,109,0,0.12), transparent); }

  /* ── Ícono dentro de la tarjeta ── */
  .fcb-icon-wrap {
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(255,255,255,0.15);
    position: relative;
  }
  @media (min-width: 640px) {
    .fcb-icon-wrap {
      width: 40px;
      height: 40px;
      border-radius: 10px;
    }
  }
  .fcb-icon-wrap--green  { background: rgba(0,230,118,0.18);  box-shadow: 0 0 14px rgba(0,230,118,0.25); }
  .fcb-icon-wrap--cyan   { background: rgba(0,229,255,0.18);  box-shadow: 0 0 14px rgba(0,229,255,0.25); }
  .fcb-icon-wrap--orange { background: rgba(255,109,0,0.18);  box-shadow: 0 0 14px rgba(255,109,0,0.25); }

  /* ── Texto de la tarjeta ── */
  .fcb-card-label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    opacity: 0.55;
    color: #fff;
    line-height: 1;
    margin-bottom: 4px;
  }
  @media (min-width: 640px) {
    .fcb-card-label {
      font-size: 10px;
      margin-bottom: 3px;
    }
  }
  .fcb-card-title {
    font-size: 16px;
    font-weight: 800;
    color: #fff;
    line-height: 1.2;
  }
  @media (min-width: 640px) {
    .fcb-card-title { font-size: 14px; }
  }
  .fcb-card-sub {
    font-size: 12px;
    color: rgba(255,255,255,0.5);
    margin-top: 3px;
    line-height: 1.2;
  }
  @media (min-width: 640px) {
    .fcb-card-sub {
      font-size: 10px;
      margin-top: 2px;
    }
  }

  /* ── Indicador live (ping verde) ── */
  .fcb-live {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--fcb-green);
    margin-left: auto;
    flex-shrink: 0;
    box-shadow: 0 0 8px var(--fcb-green);
    animation: fcb-pulse-dot 1.8s ease-in-out infinite;
  }
  @media (min-width: 640px) {
    .fcb-live {
      width: 8px;
      height: 8px;
    }
  }

  /* ── Badge "NUEVO" ── */
  .fcb-badge {
    margin-left: auto;
    flex-shrink: 0;
    font-size: 9px;
    font-weight: 800;
    letter-spacing: 0.08em;
    padding: 3px 8px;
    border-radius: 20px;
    background: rgba(0,229,255,0.20);
    color: var(--fcb-cyan);
    border: 1px solid rgba(0,229,255,0.30);
    text-transform: uppercase;
  }
  @media (min-width: 640px) {
    .fcb-badge {
      font-size: 8px;
      padding: 2px 6px;
    }
  }

  /* ── Badge "!" advertencia ── */
  .fcb-badge-alert {
    margin-left: auto;
    flex-shrink: 0;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: rgba(255,109,0,0.25);
    border: 1px solid rgba(255,109,0,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 900;
    color: var(--fcb-orange);
  }
  @media (min-width: 640px) {
    .fcb-badge-alert {
      width: 20px;
      height: 20px;
      font-size: 11px;
    }
  }

  /* ── Flecha send ── */
  .fcb-arrow {
    color: rgba(255,255,255,0.3);
    transition: color 0.2s, transform 0.2s;
    flex-shrink: 0;
    margin-left: 2px;
  }
  .fcb-card:hover .fcb-arrow {
    color: rgba(255,255,255,0.8);
    transform: translateX(3px);
  }

  /* ════════════════════════════════
     BOTÓN PRINCIPAL
  ════════════════════════════════ */
  .chat-main-button {
    position: relative;
    background: linear-gradient(135deg, #00c853 0%, #00e676 50%, #69f0ae 100%);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    overflow: visible;
    box-shadow: 0 8px 24px rgba(0,230,118,0.4), 0 0 0 0 rgba(0,230,118,0.3);
    transition: transform 0.2s cubic-bezier(.22,.68,0,1.2),
                box-shadow 0.2s ease,
                opacity 0.5s ease;
    will-change: transform, opacity;
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media (min-width: 640px) {
    .chat-main-button {
      width: auto;
      height: auto;
      border-radius: 50px;
    }
  }
  .chat-main-button:hover {
    transform: translateY(-2px) scale(1.04);
    box-shadow: 0 12px 32px rgba(0,230,118,0.5), 0 0 0 8px rgba(0,230,118,0.1);
  }
  .chat-main-button:active {
    transform: scale(0.96);
  }
  .chat-main-button.is-open {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    box-shadow: 0 8px 24px rgba(0,0,0,0.4);
  }

  /* ── Interior del botón ── */
  .chat-button-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0;
    padding: 0;
  }
  @media (min-width: 640px) {
    .chat-button-content {
      gap: 10px;
      padding: 10px 16px 10px 10px;
    }
  }
  .chat-icon-wrap {
    width: 28px;
    height: 28px;
    background: transparent;
    border-radius: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    flex-shrink: 0;
    transition: transform 0.2s;
  }
  @media (min-width: 640px) {
    .chat-icon-wrap {
      width: 38px;
      height: 38px;
      background: rgba(0,0,0,0.20);
      border-radius: 50%;
      border: 1.5px solid rgba(255,255,255,0.25);
    }
  }
  .chat-main-button:hover .chat-icon-wrap {
    transform: scale(1.1);
  }
  @media (min-width: 640px) {
    .chat-main-button:hover .chat-icon-wrap {
      background: rgba(0,0,0,0.30);
      transform: scale(1);
    }
  }
  .chat-main-button.is-open .chat-icon-wrap {
    border-color: rgba(255,255,255,0.15);
  }
  .chat-text-group {
    display: none;
  }
  @media (min-width: 640px) {
    .chat-text-group { 
      display: flex; 
      flex-direction: column; 
      align-items: flex-start; 
    }
  }
  .chat-eyebrow {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(0,0,0,0.55);
    line-height: 1;
  }
  .chat-main-button.is-open .chat-eyebrow { color: rgba(255,255,255,0.4); }
  .chat-label {
    font-size: 14px;
    font-weight: 800;
    color: #000;
    line-height: 1.2;
    white-space: nowrap;
  }
  .chat-main-button.is-open .chat-label { color: #fff; }

  /* ── Shine sweep ── */
  .chat-main-button::after {
    content: '';
    position: absolute;
    top: 0; left: -120%;
    width: 60%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
    transform: skewX(-20deg);
    animation: fcb-shine 3.5s ease-in-out infinite;
    pointer-events: none;
  }
  @media (max-width: 639px) {
    .chat-main-button::after {
      display: none;
    }
  }

  /* ── Notification dot ── */
  .notification-badge {
    position: absolute;
    top: 2px; 
    right: 2px;
    width: 12px; 
    height: 12px;
    background: var(--fcb-red);
    border-radius: 50%;
    border: 2px solid #fff;
    box-shadow: 0 2px 8px rgba(239,68,68,0.6);
    animation: fcb-pulse-dot 2s ease-in-out infinite;
  }
  @media (min-width: 640px) {
    .notification-badge {
      top: -3px;
      right: -3px;
      border-color: #0a0e16;
    }
  }

  /* ── Hint tooltip ── */
  .hint-tooltip {
    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);
    background: rgba(10,14,22,0.96);
    color: #fff;
    font-size: 12px;
    font-weight: 700;
    padding: 8px 12px;
    border-radius: 10px;
    white-space: nowrap;
    border: 1px solid rgba(255,255,255,0.12);
    box-shadow: 0 4px 20px rgba(0,0,0,0.5);
    animation: fcb-slide-up 0.3s ease both;
    pointer-events: none;
  }
  @media (min-width: 640px) {
    .hint-tooltip { 
      display: none;
    }
  }
  .hint-tooltip::after {
    content: '';
    position: absolute;
    top: 100%; left: 50%;
    transform: translateX(-50%);
    border: 5px solid transparent;
    border-top-color: rgba(10,14,22,0.96);
  }

  /* ════════════════════════════════
     MODAL CONDICIONES
  ════════════════════════════════ */
  .fcb-modal-overlay {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    background: rgba(0,0,0,0.88);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    z-index: 2147483647;
    animation: fcb-fade-in 0.2s ease both;
  }
  .fcb-modal {
    position: relative;
    background: linear-gradient(145deg, #0d1117 0%, #111827 100%);
    border: 1px solid rgba(255,255,255,0.10);
    border-radius: 24px;
    max-width: 640px;
    width: 100%;
    overflow: hidden;
    box-shadow: 0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05);
    animation: fcb-scale-in 0.28s cubic-bezier(.22,.68,0,1.2) both;
  }
  .fcb-modal-accent {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at top left, rgba(255,109,0,0.08), transparent 60%),
                radial-gradient(ellipse at bottom right, rgba(0,229,255,0.06), transparent 60%);
    pointer-events: none;
  }
  .fcb-modal-close {
    position: absolute;
    top: 14px; right: 14px;
    z-index: 10;
    width: 32px; height: 32px;
    border-radius: 50%;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.14);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.15s, transform 0.15s;
    color: #fff;
  }
  .fcb-modal-close:hover { background: rgba(255,255,255,0.16); transform: rotate(90deg) scale(1.1); }
  .fcb-modal-header {
    padding: 22px 22px 16px;
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .fcb-modal-icon {
    width: 48px; height: 48px;
    background: rgba(255,109,0,0.16);
    border: 1px solid rgba(255,109,0,0.30);
    border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    color: var(--fcb-orange);
    flex-shrink: 0;
  }
  .fcb-modal-title { font-size: 22px; font-weight: 800; color: #fff; font-family: var(--fcb-font); }
  .fcb-modal-subtitle { font-size: 12px; color: rgba(255,255,255,0.4); margin-top: 2px; }
  .fcb-modal-body { padding: 0 16px 16px; display: flex; justify-content: center; }
  .fcb-modal-body img {
    max-width: 100%;
    max-height: 62vh;
    object-fit: contain;
    border-radius: 14px;
    border: 1px solid rgba(255,255,255,0.08);
    box-shadow: 0 8px 32px rgba(0,0,0,0.5);
  }
  .fcb-modal-footer { padding: 0 22px 22px; display: flex; justify-content: center; }
  .fcb-modal-btn {
    padding: 11px 36px;
    background: linear-gradient(135deg, var(--fcb-orange), #ff8f00);
    border: none;
    border-radius: 12px;
    color: #fff;
    font-size: 14px;
    font-weight: 800;
    font-family: var(--fcb-font);
    cursor: pointer;
    letter-spacing: 0.04em;
    box-shadow: 0 0 20px rgba(255,109,0,0.35);
    transition: transform 0.15s, box-shadow 0.15s;
  }
  .fcb-modal-btn:hover {
    transform: translateY(-1px) scale(1.04);
    box-shadow: 0 0 32px rgba(255,109,0,0.5);
  }

  /* ════════════════════════════════
     PARTÍCULAS
  ════════════════════════════════ */
  .fcb-particle {
    position: absolute;
    border-radius: 50%;
    background: var(--fcb-green);
    pointer-events: none;
    opacity: 0;
  }
  .fcb-particle-1 { width: 5px; height: 5px; top: -20px; left: 6px;  animation: fcb-float-1 3.2s ease-in-out infinite 0s; }
  .fcb-particle-2 { width: 3px; height: 3px; top: -14px; left: 18px; animation: fcb-float-2 2.8s ease-in-out infinite 0.6s; }
  .fcb-particle-3 { width: 4px; height: 4px; top: -26px; left: 28px; animation: fcb-float-3 3.6s ease-in-out infinite 1.1s; }

  /* ════════════════════════════════
     KEYFRAMES
  ════════════════════════════════ */
  @keyframes fcb-slide-up {
    from { opacity: 0; transform: translateY(18px) scale(0.95); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes fcb-fade-in {
    from { opacity: 0; } to { opacity: 1; }
  }
  @keyframes fcb-scale-in {
    from { opacity: 0; transform: scale(0.88); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes fcb-shine {
    0%   { left: -120%; }
    40%  { left: 160%;  }
    100% { left: 160%;  }
  }
  @keyframes fcb-pulse-dot {
    0%,100% { box-shadow: 0 0 6px currentColor; transform: scale(1);   }
    50%      { box-shadow: 0 0 14px currentColor; transform: scale(1.25); }
  }
  @keyframes fcb-float-1 {
    0%,100% { opacity:0; transform: translateY(0) scale(1);   }
    20%     { opacity:1;                                        }
    80%     { opacity:.5;                                       }
    50%     { opacity:1; transform: translateY(-22px) scale(1.3); }
  }
  @keyframes fcb-float-2 {
    0%,100% { opacity:0; transform: translateY(0) scale(1);   }
    25%     { opacity:1;                                        }
    50%     { opacity:1; transform: translateY(-18px) scale(1.2); }
    80%     { opacity:0;                                        }
  }
  @keyframes fcb-float-3 {
    0%,100% { opacity:0; transform: translateY(0);            }
    30%     { opacity:.8;                                      }
    55%     { opacity:.8; transform: translateY(-28px);        }
    85%     { opacity:0;                                       }
  }
  /* SVG waveform animation */
  @keyframes fcb-wave-1 { 0%,100%{d:path("M0 32 Q40 10 80 32 T160 32 T240 32 T300 32")} 50%{d:path("M0 32 Q40 54 80 32 T160 32 T240 32 T300 32")} }
  @keyframes fcb-wave-2 { 0%,100%{d:path("M0 32 Q40 54 80 32 T160 32 T240 32 T300 32")} 50%{d:path("M0 32 Q40 10 80 32 T160 32 T240 32 T300 32")} }
  @keyframes fcb-dot-ping { 0%{r:3;opacity:1} 100%{r:14;opacity:0} }
  @keyframes fcb-orbit {
    from { transform: rotate(0deg) translateX(18px) rotate(0deg); }
    to   { transform: rotate(360deg) translateX(18px) rotate(-360deg); }
  }
`;

/* ─── SVG decorativo animado ─── */
const ChatSignalSVG = () => (
  <svg
    className="fcb-svg-header"
    viewBox="0 0 300 64"
    preserveAspectRatio="xMidYMid slice"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Gradiente definitions */}
    <defs>
      <linearGradient id="wg1" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%"   stopColor="#00e676" stopOpacity="0"/>
        <stop offset="40%"  stopColor="#00e676" stopOpacity="0.7"/>
        <stop offset="100%" stopColor="#00e5ff" stopOpacity="0.3"/>
      </linearGradient>
      <linearGradient id="wg2" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%"   stopColor="#00e5ff" stopOpacity="0"/>
        <stop offset="50%"  stopColor="#00e5ff" stopOpacity="0.45"/>
        <stop offset="100%" stopColor="#00e676" stopOpacity="0.1"/>
      </linearGradient>
    </defs>

    {/* Ondas */}
    <path
      d="M0 36 Q40 18 80 36 T160 36 T240 36 T300 36"
      fill="none" stroke="url(#wg1)" strokeWidth="1.5"
      style={{animation: 'fcb-wave-1 2.8s ease-in-out infinite'}}
    />
    <path
      d="M0 36 Q40 54 80 36 T160 36 T240 36 T300 36"
      fill="none" stroke="url(#wg2)" strokeWidth="1"
      style={{animation: 'fcb-wave-2 2.8s ease-in-out infinite'}}
    />

    {/* Punto central con ping */}
    <g transform="translate(150,32)">
      <circle cx="0" cy="0" r="3"  fill="#00e676" opacity="0.9"/>
      <circle cx="0" cy="0" r="3"  fill="none" stroke="#00e676" strokeWidth="1.5"
        style={{animation:'fcb-dot-ping 2s ease-out infinite'}}/>
      <circle cx="0" cy="0" r="3"  fill="none" stroke="#00e676" strokeWidth="1"
        style={{animation:'fcb-dot-ping 2s ease-out infinite 0.8s'}}/>
    </g>

    {/* Pequeños dots orbitando */}
    <g transform="translate(150,32)" style={{animation:'fcb-orbit 4s linear infinite'}}>
      <circle cx="0" cy="0" r="2" fill="#00e5ff" opacity="0.7"/>
    </g>
    <g transform="translate(150,32)" style={{animation:'fcb-orbit 4s linear infinite reverse 2s'}}>
      <circle cx="0" cy="0" r="1.5" fill="#00e676" opacity="0.5"/>
    </g>

    {/* Texto subtle */}
    <text x="150" y="56" textAnchor="middle"
      fill="rgba(255,255,255,0.18)" fontSize="8" fontFamily="system-ui"
      fontWeight="600" letterSpacing="4">
      EN LÍNEA AHORA
    </text>
  </svg>
);

/* ══════════════════════════════════════════
   COMPONENTE PRINCIPAL
══════════════════════════════════════════ */
const FloatingChatButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showConditionsModal, setShowConditionsModal] = useState(false);
  const [showButton, setShowButton] = useState(true); // Visible desde el inicio
  const [showHint, setShowHint] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isPCBuilderPage = location.pathname.includes('/armatupc') || 
                          location.pathname.includes('/pc-builder');

  // Mostrar hint después de un delay (el botón ya está visible)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(true);
      // Ocultar hint después de 3 segundos
      setTimeout(() => setShowHint(false), 3000);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [isExpanded]);

  useEffect(() => {
    if (showConditionsModal) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [showConditionsModal]);

  if (isPCBuilderPage) return null;

  const handleWhatsApp = () => {
    const phoneNumber = '5491125718382';
    const message = encodeURIComponent('Hola, vengo desde su catálogo web para realizar una consulta. ¿Podrían ayudarme?');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    setIsExpanded(false);
  };
  const handlePuntosRetiro = () => { navigate('/puntos-de-retiro'); setIsExpanded(false); };
  const handleCondiciones = () => { setShowConditionsModal(true); setIsExpanded(false); };
  const toggleExpanded = () => setIsExpanded(!isExpanded);

  return (
    <>
      {/* Inject styles */}
      <style>{styles}</style>

      {/* ── MODAL CONDICIONES ── */}
      {showConditionsModal && (
        <Portal>
          <div className="fcb-modal-overlay" onClick={() => setShowConditionsModal(false)}>
            <div className="fcb-modal" onClick={e => e.stopPropagation()}>
              <div className="fcb-modal-accent" />
              <button className="fcb-modal-close" onClick={() => setShowConditionsModal(false)}>
                <X size={16} strokeWidth={2.5}/>
              </button>
              <div className="fcb-modal-header">
                <div className="fcb-modal-icon">
                  <FileText size={22} strokeWidth={2}/>
                </div>
                <div>
                  <div className="fcb-modal-title">Condiciones de Venta</div>
                  <div className="fcb-modal-subtitle">Información importante antes de comprar</div>
                </div>
              </div>
              <div className="fcb-modal-body">
                <img src="/images/condiciones_tiny.webp" alt="Condiciones de Venta"/>
              </div>
              <div className="fcb-modal-footer">
                <button className="fcb-modal-btn" onClick={() => setShowConditionsModal(false)}>
                  Entendido
                </button>
              </div>
            </div>
          </div>
        </Portal>
      )}

      <Portal>
        {/* Backdrop */}
        {isExpanded && (
          <div
            style={{
              position:'fixed', inset:0,
              background:'rgba(0,0,0,0.65)',
              backdropFilter:'blur(6px)',
              WebkitBackdropFilter:'blur(6px)',
              zIndex:99998,
              animation:'fcb-fade-in 0.25s ease both'
            }}
            onClick={() => setIsExpanded(false)}
          />
        )}

        <div className={isPCBuilderPage ? 'floating-button-fixed-right' : 'floating-button-fixed'}>

          {/* ── MENÚ EXPANDIDO ── */}
          {isExpanded && (
            <div className="fcb-menu-wrapper">
              <div className="fcb-panel">
                {/* SVG header animado */}
                <ChatSignalSVG />

                {/* ── WhatsApp ── */}
                <button className="fcb-card fcb-card--green" onClick={handleWhatsApp}>
                  <div className="fcb-icon-wrap fcb-icon-wrap--green">
                    <svg width="22" height="22" fill="#00e676" viewBox="0 0 24 24" className="sm:w-5 sm:h-5">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.785"/>
                    </svg>
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div className="fcb-card-label">Atención Directa</div>
                    <div className="fcb-card-title">WhatsApp Oficial</div>
                    <div className="fcb-card-sub">Respuesta inmediata · Online ahora</div>
                  </div>
                  <div className="fcb-live" />
                  <Send className="fcb-arrow" size={16} strokeWidth={2.5}/>
                </button>

                {/* ── Puntos de Retiro – solo mobile ── */}
                <button className="fcb-card fcb-card--cyan" onClick={handlePuntosRetiro}
                  style={{display:'flex'}}
                  /* Tailwind no disponible aquí, usamos inline para el sm:hidden equivalente.
                     Aplica la clase helper que ya tenías; si preferís inline-media se puede 
                     poner via CSS en el bloque de styles arriba */
                >
                  <div className="fcb-icon-wrap fcb-icon-wrap--cyan">
                    <MapPin size={20} color="#00e5ff" strokeWidth={2.5} className="sm:w-[18px] sm:h-[18px]"/>
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div className="fcb-card-label">Ubicaciones</div>
                    <div className="fcb-card-title">Puntos de Retiro</div>
                    <div className="fcb-card-sub">Ver ubicaciones y horarios</div>
                  </div>
                  <span className="fcb-badge">NUEVO</span>
                  <Send className="fcb-arrow" size={16} strokeWidth={2.5}/>
                </button>

                {/* ── Condiciones – solo mobile ── */}
                <button className="fcb-card fcb-card--orange" onClick={handleCondiciones}>
                  <div className="fcb-icon-wrap fcb-icon-wrap--orange">
                    <FileText size={20} color="#ff6d00" strokeWidth={2.5} className="sm:w-[18px] sm:h-[18px]"/>
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div className="fcb-card-label">Información</div>
                    <div className="fcb-card-title">Condiciones de Venta</div>
                    <div className="fcb-card-sub">Términos y políticas</div>
                  </div>
                  <span className="fcb-badge-alert">!</span>
                  <Send className="fcb-arrow" size={16} strokeWidth={2.5}/>
                </button>
              </div>
            </div>
          )}

          {/* ── BOTÓN PRINCIPAL ── */}
          <button
            onClick={toggleExpanded}
            className={`chat-main-button${isExpanded ? ' is-open' : ''}`}
            style={{
              opacity:    showButton ? 1 : 0,
              transform:  showButton ? 'translateY(0) scale(1)' : 'translateY(28px) scale(0.88)',
              pointerEvents: showButton ? 'auto' : 'none',
              transition: 'transform 0.45s cubic-bezier(.22,.68,0,1.2), opacity 0.45s ease, box-shadow 0.2s ease',
            }}
          >
            {!isExpanded && <span className="notification-badge"/>}

            <div className="chat-button-content">
              <div className="chat-icon-wrap">
                {isExpanded
                  ? <X size={24} strokeWidth={2.5} color="#fff" className="sm:w-[18px] sm:h-[18px]"/>
                  : (
                    <svg width="24" height="24" fill="#fff" viewBox="0 0 24 24" className="sm:w-[18px] sm:h-[18px]">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.785"/>
                    </svg>
                  )
                }
              </div>
              <div className="chat-text-group">
                <span className="chat-eyebrow">¿Necesitás ayuda?</span>
                <span className="chat-label">Chatea con nosotros</span>
              </div>
              {!isExpanded && (
                <Send size={16} strokeWidth={2.5}
                  style={{color:'rgba(0,0,0,0.45)', marginLeft:2, flexShrink:0}}
                  className="hidden sm:block sm:w-[14px] sm:h-[14px]"
                />
              )}
            </div>

            {/* Hint tooltip mobile */}
            {showHint && !isExpanded && (
              <div className="hint-tooltip">¡Tocá para ayuda!</div>
            )}
          </button>

          {/* Partículas – solo cuando cerrado */}
          {!isExpanded && showButton && (
            <>
              <span className="fcb-particle fcb-particle-1"/>
              <span className="fcb-particle fcb-particle-2"/>
              <span className="fcb-particle fcb-particle-3"/>
            </>
          )}
        </div>
      </Portal>
    </>
  );
};

export default FloatingChatButton;