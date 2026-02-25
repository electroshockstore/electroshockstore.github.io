const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Home-BUUTo1nw.js","assets/react-core-CIhYA4pf.js","assets/vendor-7n-Kxh7P.js","assets/react-core-w23F2EJY.css","assets/useScrollToTop-E7Uwz6M6.js","assets/pc-builder-Dr01TnMa.js","assets/category-procesadores-CDO6U6AQ.js","assets/category-motherboards-vupiAPgW.js","assets/category-memorias-CO03poaM.js","assets/category-almacenamiento-ysGu7ciE.js","assets/category-fuentes-fPnUlTQF.js","assets/category-refrigeracion-DbbaDZK5.js","assets/category-teclados-DZSB4dY5.js","assets/category-mouse-B9HEDOJi.js","assets/category-auriculares-B_zY4w1M.js","assets/category-joystick-DN-6GP_W.js","assets/category-conectividad-Ctn5900P.js","assets/category-monitores-COpzckCG.js","assets/category-portatiles-EdcV8I_9.js","assets/category-placas_video-BcbA5l-s.js","assets/category-mayorista-BTVVw3RS.js","assets/Footer-D3pboIa_.js","assets/framer-motion-DwLxnpOK.js","assets/MotionReveal-CNsutvBF.js","assets/useSEO-Cxoule5M.js","assets/Catalog-DY4OPBZg.js","assets/useAnalytics-DH7Jr_hs.js","assets/ProductDetailPage-CxEy9A0X.js","assets/AdditionalInfoSection-LDP1SkPR.js","assets/recharts-BrEeTYE9.js","assets/PCBuilder-CqLufqtA.js","assets/PuntosRetiro-DMnAAkyZ.js"])))=>i.map(i=>d[i]);
var T=Object.defineProperty;var _=(t,a,s)=>a in t?T(t,a,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[a]=s;var h=(t,a,s)=>_(t,typeof a!="symbol"?a+"":a,s);import{R,j as e,I as A,J as k,q as I,r as i,X as u,N as w,W as M,O as W,Z as D,p as B,u as V,l as y,Q as b,s as F,U as H,V as Y,Y as d,_ as G,$}from"./react-core-CIhYA4pf.js";import{P as v,_ as x,F as U,a as Q}from"./pc-builder-Dr01TnMa.js";import"./vendor-7n-Kxh7P.js";import"./category-procesadores-CDO6U6AQ.js";import"./category-motherboards-vupiAPgW.js";import"./category-memorias-CO03poaM.js";import"./category-almacenamiento-ysGu7ciE.js";import"./category-fuentes-fPnUlTQF.js";import"./category-refrigeracion-DbbaDZK5.js";import"./category-teclados-DZSB4dY5.js";import"./category-mouse-B9HEDOJi.js";import"./category-auriculares-B_zY4w1M.js";import"./category-joystick-DN-6GP_W.js";import"./category-conectividad-Ctn5900P.js";import"./category-monitores-COpzckCG.js";import"./category-portatiles-EdcV8I_9.js";import"./category-placas_video-BcbA5l-s.js";import"./category-mayorista-BTVVw3RS.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function s(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(r){if(r.ep)return;r.ep=!0;const n=s(r);fetch(r.href,n)}})();class X extends R.Component{constructor(s){super(s);h(this,"handleReload",()=>{window.location.reload()});h(this,"handleGoHome",()=>{window.location.href="/"});this.state={hasError:!1,error:null,errorInfo:null}}static getDerivedStateFromError(s){return{hasError:!0}}componentDidCatch(s,o){this.setState({error:s,errorInfo:o})}render(){return this.state.hasError?e.jsx("div",{className:"min-h-screen bg-gradient-to-b from-[#E5E7EB] to-[#C7CCD1] flex items-center justify-center p-4",children:e.jsxs("div",{className:"bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center border border-gray-200/50 animate-in fade-in zoom-in-95 duration-500",children:[e.jsx("div",{className:"w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg",children:e.jsx(A,{className:"w-10 h-10 text-white",strokeWidth:2.5})}),e.jsx("h1",{className:"text-2xl font-bold text-gray-900 mb-3",children:"¡Oops! Algo salió mal"}),e.jsx("p",{className:"text-gray-600 mb-6 leading-relaxed",children:"Ocurrió un error inesperado. No te preocupes, puedes intentar recargar la página o volver al inicio."}),e.jsxs("div",{className:"flex flex-col sm:flex-row gap-3",children:[e.jsxs("button",{onClick:this.handleReload,className:"flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-blue-500/50 active:scale-95",children:[e.jsx(k,{className:"w-4 h-4"}),"Recargar página"]}),e.jsxs("button",{onClick:this.handleGoHome,className:"flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 shadow-lg active:scale-95",children:[e.jsx(I,{className:"w-4 h-4"}),"Ir al inicio"]})]}),!1]})}):this.props.children}}const K=({error:t,onClose:a,onReload:s})=>{if(!t)return null;const o=()=>{switch(t.type){case"network":return e.jsx(W,{className:"w-5 h-5"});case"css":case"js":return e.jsx(w,{className:"w-5 h-5"});case"api":return e.jsx(M,{className:"w-5 h-5"});default:return e.jsx(w,{className:"w-5 h-5"})}},r=()=>{switch(t.type){case"network":return"from-red-500 to-red-600";case"css":case"js":return"from-orange-500 to-orange-600";case"api":return"from-yellow-500 to-yellow-600";default:return"from-gray-500 to-gray-600"}};return e.jsx("div",{className:"fixed top-4 left-4 right-4 z-[100] mx-auto max-w-md animate-in fade-in slide-in-from-top-2 duration-300",children:e.jsx("div",{className:`bg-gradient-to-r ${r()} text-white rounded-2xl shadow-2xl p-4 border border-white/20`,children:e.jsxs("div",{className:"flex items-start gap-3",children:[e.jsx("div",{className:"flex-shrink-0 mt-0.5",children:o()}),e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsx("h4",{className:"font-bold text-sm mb-1",children:t.message}),e.jsx("p",{className:"text-xs text-white/90 mb-3",children:t.action}),e.jsxs("div",{className:"flex gap-2",children:[e.jsxs("button",{onClick:s,className:"flex items-center gap-1.5 px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-medium transition-all duration-200 backdrop-blur-sm active:scale-95",children:[e.jsx(k,{className:"w-3 h-3"}),"Recargar"]}),e.jsx("button",{onClick:a,className:"flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-medium transition-all duration-200 backdrop-blur-sm active:scale-95",children:"Cerrar"})]})]}),e.jsx("button",{onClick:a,className:"flex-shrink-0 p-1 hover:bg-white/20 rounded-lg transition-colors duration-200",children:e.jsx(u,{className:"w-4 h-4"})})]})})})},q=i.memo(K),Z=()=>{const[t,a]=i.useState(null),[s,o]=i.useState(null);return i.useEffect(()=>{if(t){const n=setTimeout(()=>{a(null)},8e3);return()=>clearTimeout(n)}},[t]),i.useEffect(()=>{if(s){const n=setTimeout(()=>{o(null)},8e3);return()=>clearTimeout(n)}},[s]),i.useEffect(()=>{const n=()=>{a(null)},l=()=>{a({type:"network",message:"Sin conexión a internet",action:"Verifica tu conexión y recarga la página"})},p=f=>{const c=f.target||f.srcElement;c.tagName==="LINK"&&c.rel==="stylesheet"&&c.href&&(c.href.includes(window.location.hostname)||c.href.startsWith("/"))?o({type:"css",message:"Error al cargar estilos",action:"Recarga la página para intentar nuevamente"}):c.tagName==="SCRIPT"&&c.src&&(c.src.includes(window.location.hostname)||c.src.startsWith("/"))&&!c.src.includes("google")&&!c.src.includes("analytics")&&o({type:"js",message:"Error al cargar la aplicación",action:"Recarga la página para intentar nuevamente"})};return window.addEventListener("online",n),window.addEventListener("offline",l),window.addEventListener("error",p,!0),()=>{window.removeEventListener("online",n),window.removeEventListener("offline",l),window.removeEventListener("error",p,!0)}},[]),{networkError:t,resourceError:s,clearErrors:()=>{a(null),o(null)},hasErrors:t||s}},J=()=>e.jsx("a",{href:"#main-content",className:`sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] \r
                 focus:px-6 focus:py-3 focus:bg-blue-600 focus:text-white focus:rounded-lg \r
                 focus:font-bold focus:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-400`,children:"Saltar al contenido principal"}),ee=()=>e.jsxs("div",{className:"fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0f] overflow-hidden",children:[e.jsxs("div",{className:"hidden md:block absolute inset-0 overflow-hidden",children:[e.jsx("div",{className:"absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/25 rounded-full blur-xl"}),e.jsx("div",{className:"absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/25 rounded-full blur-xl"}),e.jsx("div",{className:"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-xl"})]}),e.jsxs("div",{className:"relative z-10 flex flex-col items-center gap-8",children:[e.jsxs("div",{className:"relative",children:[e.jsx("div",{className:"absolute inset-0 -m-8",children:e.jsx("div",{className:"absolute inset-0 rounded-full border-2 border-blue-500/30 animate-ping"})}),e.jsx("div",{className:"relative flex items-center justify-center w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 rounded-3xl shadow-[0_0_60px_rgba(59,130,246,0.5)] animate-pulse",children:e.jsx(D,{className:"w-20 h-20 sm:w-24 sm:h-24 text-white",fill:"currentColor"})})]}),e.jsxs("div",{className:"flex flex-col items-center gap-4",children:[e.jsx("h2",{className:"text-2xl sm:text-3xl font-black text-white tracking-tight",children:e.jsx("span",{className:"bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x",children:"ElectroShock"})}),e.jsx("div",{className:"w-48 sm:w-64 h-1.5 bg-gray-800/50 rounded-full overflow-hidden",children:e.jsx("div",{className:"h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full animate-loading-bar shadow-[0_0_20px_rgba(59,130,246,0.6)]"})}),e.jsx("p",{className:"text-sm text-gray-400 font-medium",children:"Procesando componentes..."})]})]}),e.jsx("div",{className:"absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]"})]}),te=()=>null,ae=`
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
`,re=()=>e.jsxs("svg",{className:"fcb-svg-header",viewBox:"0 0 300 64",preserveAspectRatio:"xMidYMid slice",xmlns:"http://www.w3.org/2000/svg",children:[e.jsxs("defs",{children:[e.jsxs("linearGradient",{id:"wg1",x1:"0",y1:"0",x2:"1",y2:"0",children:[e.jsx("stop",{offset:"0%",stopColor:"#00e676",stopOpacity:"0"}),e.jsx("stop",{offset:"40%",stopColor:"#00e676",stopOpacity:"0.7"}),e.jsx("stop",{offset:"100%",stopColor:"#00e5ff",stopOpacity:"0.3"})]}),e.jsxs("linearGradient",{id:"wg2",x1:"0",y1:"0",x2:"1",y2:"0",children:[e.jsx("stop",{offset:"0%",stopColor:"#00e5ff",stopOpacity:"0"}),e.jsx("stop",{offset:"50%",stopColor:"#00e5ff",stopOpacity:"0.45"}),e.jsx("stop",{offset:"100%",stopColor:"#00e676",stopOpacity:"0.1"})]})]}),e.jsx("path",{d:"M0 36 Q40 18 80 36 T160 36 T240 36 T300 36",fill:"none",stroke:"url(#wg1)",strokeWidth:"1.5",style:{animation:"fcb-wave-1 2.8s ease-in-out infinite"}}),e.jsx("path",{d:"M0 36 Q40 54 80 36 T160 36 T240 36 T300 36",fill:"none",stroke:"url(#wg2)",strokeWidth:"1",style:{animation:"fcb-wave-2 2.8s ease-in-out infinite"}}),e.jsxs("g",{transform:"translate(150,32)",children:[e.jsx("circle",{cx:"0",cy:"0",r:"3",fill:"#00e676",opacity:"0.9"}),e.jsx("circle",{cx:"0",cy:"0",r:"3",fill:"none",stroke:"#00e676",strokeWidth:"1.5",style:{animation:"fcb-dot-ping 2s ease-out infinite"}}),e.jsx("circle",{cx:"0",cy:"0",r:"3",fill:"none",stroke:"#00e676",strokeWidth:"1",style:{animation:"fcb-dot-ping 2s ease-out infinite 0.8s"}})]}),e.jsx("g",{transform:"translate(150,32)",style:{animation:"fcb-orbit 4s linear infinite"},children:e.jsx("circle",{cx:"0",cy:"0",r:"2",fill:"#00e5ff",opacity:"0.7"})}),e.jsx("g",{transform:"translate(150,32)",style:{animation:"fcb-orbit 4s linear infinite reverse 2s"},children:e.jsx("circle",{cx:"0",cy:"0",r:"1.5",fill:"#00e676",opacity:"0.5"})}),e.jsx("text",{x:"150",y:"56",textAnchor:"middle",fill:"rgba(255,255,255,0.18)",fontSize:"8",fontFamily:"system-ui",fontWeight:"600",letterSpacing:"4",children:"EN LÍNEA AHORA"})]}),se=()=>{const[t,a]=i.useState(!1),[s,o]=i.useState(!1),[r,n]=i.useState(!0),[l,p]=i.useState(!1),f=B(),c=V(),g=f.pathname.includes("/armatupc")||f.pathname.includes("/pc-builder");if(i.useEffect(()=>{const m=setTimeout(()=>{p(!0),setTimeout(()=>p(!1),3e3)},1500);return()=>clearTimeout(m)},[]),i.useEffect(()=>{if(t)return document.body.style.overflow="hidden",()=>{document.body.style.overflow=""}},[t]),i.useEffect(()=>{if(s)return document.body.style.overflow="hidden",()=>{document.body.style.overflow=""}},[s]),g)return null;const P=()=>{const m="5491125718382",S=encodeURIComponent("Hola, vengo desde su catálogo web para realizar una consulta. ¿Podrían ayudarme?");window.open(`https://wa.me/${m}?text=${S}`,"_blank"),a(!1)},L=()=>{c("/puntos-de-retiro"),a(!1)},O=()=>{o(!0),a(!1)},z=()=>a(!t);return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:ae}),s&&e.jsx(v,{children:e.jsx("div",{className:"fcb-modal-overlay",onClick:()=>o(!1),children:e.jsxs("div",{className:"fcb-modal",onClick:m=>m.stopPropagation(),children:[e.jsx("div",{className:"fcb-modal-accent"}),e.jsx("button",{className:"fcb-modal-close",onClick:()=>o(!1),children:e.jsx(u,{size:16,strokeWidth:2.5})}),e.jsxs("div",{className:"fcb-modal-header",children:[e.jsx("div",{className:"fcb-modal-icon",children:e.jsx(y,{size:22,strokeWidth:2})}),e.jsxs("div",{children:[e.jsx("div",{className:"fcb-modal-title",children:"Condiciones de Venta"}),e.jsx("div",{className:"fcb-modal-subtitle",children:"Información importante antes de comprar"})]})]}),e.jsx("div",{className:"fcb-modal-body",children:e.jsx("img",{src:"/images/condiciones_tiny.webp",alt:"Condiciones de Venta"})}),e.jsx("div",{className:"fcb-modal-footer",children:e.jsx("button",{className:"fcb-modal-btn",onClick:()=>o(!1),children:"Entendido"})})]})})}),e.jsxs(v,{children:[t&&e.jsx("div",{style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.65)",backdropFilter:"blur(6px)",WebkitBackdropFilter:"blur(6px)",zIndex:99998,animation:"fcb-fade-in 0.25s ease both"},onClick:()=>a(!1)}),e.jsxs("div",{className:g?"floating-button-fixed-right":"floating-button-fixed",children:[t&&e.jsx("div",{className:"fcb-menu-wrapper",children:e.jsxs("div",{className:"fcb-panel",children:[e.jsx(re,{}),e.jsxs("button",{className:"fcb-card fcb-card--green",onClick:P,children:[e.jsx("div",{className:"fcb-icon-wrap fcb-icon-wrap--green",children:e.jsx("svg",{width:"22",height:"22",fill:"#00e676",viewBox:"0 0 24 24",className:"sm:w-5 sm:h-5",children:e.jsx("path",{d:"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.785"})})}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{className:"fcb-card-label",children:"Atención Directa"}),e.jsx("div",{className:"fcb-card-title",children:"WhatsApp Oficial"}),e.jsx("div",{className:"fcb-card-sub",children:"Respuesta inmediata · Online ahora"})]}),e.jsx("div",{className:"fcb-live"}),e.jsx(b,{className:"fcb-arrow",size:16,strokeWidth:2.5})]}),e.jsxs("button",{className:"fcb-card fcb-card--cyan",onClick:L,style:{display:"flex"},children:[e.jsx("div",{className:"fcb-icon-wrap fcb-icon-wrap--cyan",children:e.jsx(F,{size:20,color:"#00e5ff",strokeWidth:2.5,className:"sm:w-[18px] sm:h-[18px]"})}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{className:"fcb-card-label",children:"Ubicaciones"}),e.jsx("div",{className:"fcb-card-title",children:"Puntos de Retiro"}),e.jsx("div",{className:"fcb-card-sub",children:"Ver ubicaciones y horarios"})]}),e.jsx("span",{className:"fcb-badge",children:"NUEVO"}),e.jsx(b,{className:"fcb-arrow",size:16,strokeWidth:2.5})]}),e.jsxs("button",{className:"fcb-card fcb-card--orange",onClick:O,children:[e.jsx("div",{className:"fcb-icon-wrap fcb-icon-wrap--orange",children:e.jsx(y,{size:20,color:"#ff6d00",strokeWidth:2.5,className:"sm:w-[18px] sm:h-[18px]"})}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{className:"fcb-card-label",children:"Información"}),e.jsx("div",{className:"fcb-card-title",children:"Condiciones de Venta"}),e.jsx("div",{className:"fcb-card-sub",children:"Términos y políticas"})]}),e.jsx("span",{className:"fcb-badge-alert",children:"!"}),e.jsx(b,{className:"fcb-arrow",size:16,strokeWidth:2.5})]})]})}),e.jsxs("button",{onClick:z,className:`chat-main-button${t?" is-open":""}`,style:{opacity:r?1:0,transform:r?"translateY(0) scale(1)":"translateY(28px) scale(0.88)",pointerEvents:r?"auto":"none",transition:"transform 0.45s cubic-bezier(.22,.68,0,1.2), opacity 0.45s ease, box-shadow 0.2s ease"},children:[!t&&e.jsx("span",{className:"notification-badge"}),e.jsxs("div",{className:"chat-button-content",children:[e.jsx("div",{className:"chat-icon-wrap",children:t?e.jsx(u,{size:24,strokeWidth:2.5,color:"#fff",className:"sm:w-[18px] sm:h-[18px]"}):e.jsx("svg",{width:"24",height:"24",fill:"#fff",viewBox:"0 0 24 24",className:"sm:w-[18px] sm:h-[18px]",children:e.jsx("path",{d:"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.785"})})}),e.jsxs("div",{className:"chat-text-group",children:[e.jsx("span",{className:"chat-eyebrow",children:"¿Necesitás ayuda?"}),e.jsx("span",{className:"chat-label",children:"Chatea con nosotros"})]}),!t&&e.jsx(b,{size:16,strokeWidth:2.5,style:{color:"rgba(0,0,0,0.45)",marginLeft:2,flexShrink:0},className:"hidden sm:block sm:w-[14px] sm:h-[14px]"})]}),l&&!t&&e.jsx("div",{className:"hint-tooltip",children:"¡Tocá para ayuda!"})]}),!t&&r&&e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"fcb-particle fcb-particle-1"}),e.jsx("span",{className:"fcb-particle fcb-particle-2"}),e.jsx("span",{className:"fcb-particle fcb-particle-3"})]})]})]})]})},oe=()=>{i.useEffect(()=>(/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream?document.body.classList.add("is-ios"):document.body.classList.remove("is-ios"),"WebkitAppearance"in document.documentElement.style?document.body.classList.add("is-webkit"):document.body.classList.remove("is-webkit"),"ontouchstart"in window||navigator.maxTouchPoints>0?document.body.classList.add("is-touch"):document.body.classList.remove("is-touch"),()=>{document.body.classList.remove("is-ios","is-webkit","is-touch")}),[])},ie=()=>{if(typeof window=="undefined")return{tier:"high",isLowEnd:!1,fps:60,cores:4,memory:8};const t={tier:"high",isLowEnd:!1,fps:60,cores:navigator.hardwareConcurrency||4,memory:navigator.deviceMemory||8},a={lowMemory:t.memory<=4,lowCores:t.cores<=2,highResolution:window.innerWidth*window.innerHeight>2073600,highDPR:window.devicePixelRatio>2,integratedGPU:/Intel|HD Graphics|UHD Graphics/i.test(navigator.userAgent)},s=Object.values(a).filter(Boolean).length;return s>=3?(t.tier="low",t.isLowEnd=!0):s>=2?(t.tier="medium",t.isLowEnd=!1):(t.tier="high",t.isLowEnd=!1),t},ne=()=>{i.useEffect(()=>{const t=ie(),a=document.documentElement;return a.classList.remove("perf-low","perf-medium","perf-high"),a.classList.add(`perf-${t.tier}`),t.isLowEnd?a.classList.add("is-low-end"):a.classList.remove("is-low-end"),()=>{a.classList.remove("perf-low","perf-medium","perf-high","is-low-end")}},[])},ce=i.lazy(()=>x(()=>import("./Home-BUUTo1nw.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]))),le=i.lazy(()=>x(()=>import("./Catalog-DY4OPBZg.js"),__vite__mapDeps([25,1,2,3,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,24,26,4,21,22]))),j=i.lazy(()=>x(()=>import("./ProductDetailPage-CxEy9A0X.js"),__vite__mapDeps([27,1,2,3,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,26,28,22,23,29,21,24]))),N=i.lazy(()=>x(()=>import("./PCBuilder-CqLufqtA.js"),__vite__mapDeps([30,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]))),de=i.lazy(()=>x(()=>import("./PuntosRetiro-DMnAAkyZ.js"),__vite__mapDeps([31,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,28,22,23]))),pe=()=>e.jsx(ee,{});function fe(){return e.jsx(i.Suspense,{fallback:e.jsx(pe,{}),children:e.jsxs(Y,{children:[e.jsx(d,{path:"/",element:e.jsx(ce,{})}),e.jsx(d,{path:"/categoria/:categorySlug",element:e.jsx(le,{})}),e.jsx(d,{path:"/categoria/:categorySlug/:productSku",element:e.jsx(j,{})}),e.jsx(d,{path:"/producto/:id",element:e.jsx(j,{})}),e.jsx(d,{path:"/armatupc",element:e.jsx(N,{})}),e.jsx(d,{path:"/pc-builder",element:e.jsx(N,{})}),e.jsx(d,{path:"/puntos-de-retiro",element:e.jsx(de,{})})]})})}function me(){const{networkError:t,resourceError:a,clearErrors:s}=Z(),o=()=>{window.location.reload()},r=t||a;return e.jsxs("div",{className:"min-h-screen bg-gradient-to-b from-[#E5E7EB] to-[#C7CCD1] antialiased relative",children:[e.jsxs("div",{className:"animated-bg-container",children:[e.jsx("div",{className:"mesh-blob mesh-blob-orange -top-32 -left-32 w-[600px] h-[600px] opacity-40"}),e.jsx("div",{className:"mesh-blob mesh-blob-red -bottom-32 -right-32 w-[700px] h-[700px] opacity-35"}),e.jsx("div",{className:"bg-grid-pattern absolute inset-0 opacity-10"}),e.jsx("div",{className:"accent-line-vertical accent-line-amber right-0 opacity-20 hidden lg:block"}),e.jsx("div",{className:"accent-line-vertical accent-line-amber left-1/3 opacity-15 hidden lg:block"})]}),e.jsx(q,{error:r,onClose:s,onReload:o}),e.jsx("main",{id:"main-content",className:"relative z-10 w-full page-transition",children:e.jsx(fe,{})}),e.jsx(se,{})]})}function xe(){return oe(),ne(),e.jsx(X,{children:e.jsx(U,{children:e.jsx(Q,{children:e.jsxs(H,{basename:"/",children:[e.jsx(te,{}),e.jsx(J,{}),e.jsx(me,{})]})})})})}const be=()=>(i.useEffect(()=>{const t=window.location.pathname,a=[];(t==="/"||t==="/home")&&a.push("/images/hero/megaphone_tiny.webp"),a.forEach(o=>{const r=document.createElement("link");r.rel="preload",r.as="image",r.href=o,r.type="image/webp",document.head.appendChild(r)}),["https://www.googletagmanager.com","https://raw.githubusercontent.com"].forEach(o=>{const r=document.createElement("link");r.rel="preconnect",r.href=o,r.crossOrigin="anonymous",document.head.appendChild(r)})},[]),null),E=()=>typeof window=="undefined"?!1:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),C=()=>{if(typeof window=="undefined")return!1;const t=navigator.hardwareConcurrency&&navigator.hardwareConcurrency<=4,a=navigator.deviceMemory&&navigator.deviceMemory<=4;return t||a},he=()=>typeof window=="undefined"?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,ue=()=>E()||C()||he(),ge=()=>typeof window=="undefined"?!1:/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream,we=()=>typeof window=="undefined"?!1:/Android/i.test(navigator.userAgent),ye=()=>{if(typeof document=="undefined")return;const t=document.body;E()&&t.classList.add("is-mobile"),ge()&&t.classList.add("is-ios"),we()&&t.classList.add("is-android"),C()&&t.classList.add("is-low-end"),ue()&&t.classList.add("reduce-animations")},ve=()=>{ye()};ve();const je=G.createRoot(document.getElementById("root"));je.render(e.jsxs(e.Fragment,{children:[e.jsx(be,{}),e.jsx(xe,{}),e.jsx($,{position:"top-center",theme:"light",autoClose:5e3,hideProgressBar:!1,newestOnTop:!1,closeOnClick:!0,rtl:!1,pauseOnFocusLoss:!1,draggable:!0,pauseOnHover:!0,limit:3,className:"!w-auto !max-w-md"})]}));export{oe as u};
