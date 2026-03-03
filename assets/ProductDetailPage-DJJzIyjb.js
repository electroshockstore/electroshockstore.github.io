var de=Object.defineProperty,me=Object.defineProperties;var xe=Object.getOwnPropertyDescriptors;var F=Object.getOwnPropertySymbols;var he=Object.prototype.hasOwnProperty,pe=Object.prototype.propertyIsEnumerable;var O=(s,t,n)=>t in s?de(s,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):s[t]=n,P=(s,t)=>{for(var n in t||(t={}))he.call(t,n)&&O(s,n,t[n]);if(F)for(var n of F(t))pe.call(t,n)&&O(s,n,t[n]);return s},I=(s,t)=>me(s,xe(t));var $=(s,t,n)=>new Promise((d,a)=>{var c=g=>{try{h(n.next(g))}catch(p){a(p)}},f=g=>{try{h(n.throw(g))}catch(p){a(p)}},h=g=>g.done?d(g.value):Promise.resolve(g.value).then(c,f);h((n=n.apply(s,t)).next())});import{j as e,ad as B,t as ge,i as E,ae as be,X as R,r as x,P as fe,af as ue,l as Y,v as L,ag as U,ah as je,ai as ve,aj as we,A as M,ak as ye,k as Ne,h as ke,al as Ce,C as Se,am as Pe,an as $e,Z as Ie,a2 as Ee,ao as Le,ap as Ae,u as ae,aq as V,a5 as ze,a4 as Te,o as We,ac as Me,s as Re}from"./react-core-DcMYPrcO.js";import{g as re,i as De,P as z,N as A,j as T,T as _,D as W,k as He,f as Fe,u as Oe,b as Be,H as X,C as Ye}from"./pc-builder-9eboHg9M.js";import{b as Ue,c as Ve}from"./useAnalytics-C4kZDeCZ.js";import{P as _e,I as Xe,a as Ke}from"./AdditionalInfoSection-G71UlM6z.js";import{R as Ge,A as Ze,C as qe,X as Je,Y as Qe,a as es,T as ss,b as ts}from"./recharts-GOorwRgy.js";import{F as K}from"./Footer-KynaHa_y.js";import{b as as}from"./useSEO-D93EX5M8.js";import"./vendor-Bi5-ddoN.js";import"./category-procesadores-wq-iF0sU.js";import"./category-motherboards-vupiAPgW.js";import"./category-memorias-CO03poaM.js";import"./category-almacenamiento-DC6xB3ak.js";import"./category-fuentes-fPnUlTQF.js";import"./category-refrigeracion-DbbaDZK5.js";import"./category-teclados-CJwIoLYE.js";import"./category-mouse-rY-CpWht.js";import"./category-auriculares-CmushTPJ.js";import"./category-joystick-PiuA0WPR.js";import"./category-conectividad-R1B8eEGa.js";import"./category-monitores-COpzckCG.js";import"./category-portatiles-EdcV8I_9.js";import"./category-placas_video-BcbA5l-s.js";import"./category-mayorista-BTVVw3RS.js";import"./framer-motion-Btw1zsAp.js";import"./MotionReveal-B1zjemlY.js";const rs=({category:s,productName:t})=>{const n=s?re(s):"";return e.jsxs("nav",{className:"flex items-center text-xs sm:text-sm text-gray-600 overflow-x-auto whitespace-nowrap",children:[e.jsx(B,{to:"/",className:"flex items-center gap-1 hover:text-blue-600 transition-colors flex-shrink-0","aria-label":"Inicio",children:e.jsx(ge,{className:"h-3.5 w-3.5 sm:h-4 sm:w-4"})}),s&&e.jsxs(e.Fragment,{children:[e.jsx(E,{className:"h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0"}),e.jsx(B,{to:`/categoria/${n}`,className:"hover:text-blue-600 transition-colors font-medium flex-shrink-0",children:s})]}),e.jsx(E,{className:"h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0"}),e.jsx("span",{className:"text-blue-600 font-semibold truncate",children:t})]})},G=({onClose:s,isPage:t=!1,product:n})=>e.jsx("div",{className:`${t?"":"sticky top-0 z-50"} bg-white sm:backdrop-blur-xl sm:bg-white/95 border-b border-gray-200 shadow-lg rounded-t-2xl sm:rounded-t-3xl`,children:e.jsx("div",{className:"px-3 sm:px-6 lg:px-8 py-3 sm:py-4",children:e.jsxs("div",{className:"flex items-center justify-between gap-3",children:[e.jsxs("button",{onClick:s,className:`flex items-center gap-2 px-3 sm:px-4 py-2 text-gray-700 hover:text-blue-600 \r
                     font-semibold transition-colors rounded-xl hover:bg-blue-50 text-sm sm:text-base flex-shrink-0 active:scale-95`,children:[e.jsx(be,{className:"h-4 w-4 sm:h-5 sm:w-5"}),e.jsx("span",{className:"hidden sm:inline",children:"Volver"})]}),n&&e.jsx("div",{className:"flex-1 min-w-0",children:e.jsx(rs,{category:n.category,productName:n.name})}),e.jsx("button",{onClick:s,className:"p-2 sm:p-2.5 hover:bg-gray-100 rounded-xl transition-colors flex-shrink-0 active:scale-95","aria-label":"Cerrar",children:e.jsx(R,{className:"h-5 w-5 sm:h-6 sm:w-6 text-gray-600"})})]})})}),Z=({images:s=[],name:t,stock:n,stockStatus:d})=>{const a=De(),[c,f]=x.useState(0),[h,g]=x.useState(!1),[p,j]=x.useState(!1),[l,m]=x.useState(0),[o,i]=x.useState(0),[r,u]=x.useState(window.innerHeight),v=s.length>1,N=s[c]||s[0],y=()=>{g(!1),f(b=>(b+1)%s.length)},S=()=>{g(!1),f(b=>(b-1+s.length)%s.length)},w=b=>{m(b),j(!0)},k=()=>j(!1);x.useEffect(()=>{if(p)return a&&(i(window.scrollY),u(window.innerHeight)),document.documentElement.style.overflow="hidden",document.body.style.overflow="hidden",()=>{document.documentElement.style.overflow="",document.body.style.overflow=""}},[p,a]),x.useEffect(()=>{if(!p||!a)return;const b=()=>u(window.innerHeight);return window.addEventListener("resize",b),()=>window.removeEventListener("resize",b)},[p,a]);const D=()=>m(b=>(b+1)%s.length),H=()=>m(b=>(b-1+s.length)%s.length),oe=b=>{p&&(b.key==="Escape"&&k(),b.key==="ArrowRight"&&D(),b.key==="ArrowLeft"&&H())},le=(d==null?void 0:d.badgeColor)||"bg-emerald-500";return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');

        /* ── Contenedor raíz ── */
        .pis-root {
          font-family: 'DM Sans', sans-serif;
          height: 100%;
          display: flex;
          flex-direction: column;
          background: #fff;
          position: relative;
        }

        /* Línea de acento superior — espejo del ProductInfoCard */
        .pis-accent-bar {
          height: 3px;
          background: linear-gradient(90deg, #2563eb 0%, #06b6d4 60%, transparent 100%);
          flex-shrink: 0;
        }

        /* ── Marco de la imagen principal ── */
        .pis-frame {
          position: relative;
          flex: 1;
          min-height: 0;
          background: #f8fafc;
          overflow: hidden;
          cursor: zoom-in;
        }

        /* Patrón de puntos sutil en el fondo del frame */
        .pis-frame::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, #e2e8f0 1px, transparent 1px);
          background-size: 20px 20px;
          opacity: 0.6;
          pointer-events: none;
          z-index: 0;
        }

        .pis-img {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .pis-img.loading { opacity: 0; transform: scale(0.97); }
        .pis-img.loaded  { opacity: 1; transform: scale(1); }

        /* Fallback ícono */
        .pis-fallback {
          display: none;
          position: absolute;
          inset: 0;
          align-items: center;
          justify-content: center;
          z-index: 1;
        }

        /* Hover overlay — zoom hint */
        .pis-hover-overlay {
          position: absolute;
          inset: 0;
          z-index: 2;
          background: rgba(15, 23, 42, 0);
          transition: background 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pis-frame:hover .pis-hover-overlay { background: rgba(15, 23, 42, 0.06); }

        .pis-zoom-hint {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(8px);
          border-radius: 99px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.12);
          font-size: 12px;
          font-weight: 600;
          color: #0f172a;
          opacity: 0;
          transform: translateY(4px);
          transition: opacity 0.2s, transform 0.2s;
          pointer-events: none;
          border: 1px solid rgba(255,255,255,0.8);
        }
        .pis-frame:hover .pis-zoom-hint { opacity: 1; transform: translateY(0); }

        /* Badge stock — esquina superior derecha */
        .pis-stock-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          z-index: 10;
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 5px 12px;
          border-radius: 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #fff;
          box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        }
        .pis-stock-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.8);
          animation: pis-pulse 2s ease-in-out infinite;
        }
        @keyframes pis-pulse {
          0%,100% { opacity: 1; } 50% { opacity: 0.4; }
        }

        /* Flechas de navegación */
        .pis-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          width: 36px;
          height: 36px;
          background: #fff;
          border: 1.5px solid #e2e8f0;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          opacity: 0;
          transition: opacity 0.2s, background 0.15s, box-shadow 0.15s, transform 0.15s;
          box-shadow: 0 2px 12px rgba(0,0,0,0.1);
        }
        .pis-frame:hover .pis-nav-btn { opacity: 1; }
        .pis-nav-btn:hover { background: #0f172a; border-color: #0f172a; box-shadow: 0 4px 16px rgba(0,0,0,0.2); }
        .pis-nav-btn:hover svg { color: #fff !important; }
        .pis-nav-btn.left  { left: 10px; }
        .pis-nav-btn.right { right: 10px; }
        .pis-nav-btn:active { transform: translateY(-50%) scale(0.92); }

        /* Contador de imágenes */
        .pis-counter {
          position: absolute;
          bottom: 12px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 14px;
          letter-spacing: 0.12em;
          color: #fff;
          background: rgba(15,23,42,0.65);
          backdrop-filter: blur(6px);
          padding: 3px 12px;
          border-radius: 5px;
          border: 1px solid rgba(255,255,255,0.1);
          pointer-events: none;
        }

        /* ── Banda de miniaturas ── */
        .pis-thumbs-band {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          overflow-x: auto;
          scrollbar-width: none;
          border-top: 1px solid #f1f5f9;
          background: #fff;
          flex-shrink: 0;
        }
        .pis-thumbs-band::-webkit-scrollbar { display: none; }

        .pis-thumb {
          flex-shrink: 0;
          width: 56px;
          height: 56px;
          border-radius: 10px;
          overflow: hidden;
          border: 2px solid transparent;
          background: #f8fafc;
          cursor: pointer;
          transition: border-color 0.15s, transform 0.15s, box-shadow 0.15s;
          position: relative;
        }
        .pis-thumb img { width: 100%; height: 100%; object-fit: contain; }
        .pis-thumb.active {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37,99,235,0.15);
          transform: translateY(-1px);
        }
        .pis-thumb:not(.active):hover {
          border-color: #94a3b8;
          transform: translateY(-1px);
        }

        /* Línea activa debajo de thumb activa */
        .pis-thumb.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 2px;
          background: #2563eb;
          border-radius: 1px;
        }

        /* ── LIGHTBOX ── */
        .pis-lb-backdrop {
          background: rgba(8, 12, 20, 0.97);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pis-lb-close {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 40px;
          height: 40px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 50;
          transition: background 0.15s;
        }
        .pis-lb-close:hover { background: rgba(255,255,255,0.15); }

        .pis-lb-counter {
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          font-family: 'Bebas Neue', sans-serif;
          font-size: 16px;
          letter-spacing: 0.18em;
          color: rgba(255,255,255,0.6);
          z-index: 50;
          pointer-events: none;
        }

        .pis-lb-img-wrap {
          position: relative;
          max-width: 90vw;
          max-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pis-lb-img {
          max-width: 100%;
          max-height: 80vh;
          object-fit: contain;
          border-radius: 4px;
        }

        .pis-lb-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 44px;
          height: 44px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 50;
          transition: background 0.15s;
        }
        .pis-lb-nav:hover { background: rgba(255,255,255,0.18); }
        .pis-lb-nav.left  { left: -60px; }
        .pis-lb-nav.right { right: -60px; }

        .pis-lb-thumbs {
          position: absolute;
          bottom: 16px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
          padding: 10px 14px;
          background: rgba(15,23,42,0.7);
          backdrop-filter: blur(12px);
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.08);
          max-width: 90vw;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .pis-lb-thumbs::-webkit-scrollbar { display: none; }

        .pis-lb-thumb {
          flex-shrink: 0;
          width: 52px;
          height: 52px;
          border-radius: 8px;
          overflow: hidden;
          border: 2px solid rgba(255,255,255,0.2);
          cursor: pointer;
          transition: border-color 0.15s, transform 0.15s;
          background: rgba(0,0,0,0.4);
        }
        .pis-lb-thumb img { width: 100%; height: 100%; object-fit: contain; }
        .pis-lb-thumb.active { border-color: #fff; transform: translateY(-2px); }
        .pis-lb-thumb:not(.active):hover { border-color: rgba(255,255,255,0.5); }
      `}),e.jsxs("div",{className:"pis-root",children:[e.jsx("div",{className:"pis-accent-bar"}),e.jsxs("div",{className:"pis-frame",style:{aspectRatio:v?void 0:"1/1",flex:1},onClick:()=>w(c),children:[e.jsx("img",{src:N,alt:`${t} — ${c+1}`,className:`pis-img ${h?"loaded":"loading"}`,loading:"lazy",onLoad:()=>g(!0),onError:b=>{b.target.style.display="none",b.target.nextElementSibling.style.display="flex"}}),e.jsx("div",{className:"pis-fallback",children:e.jsx(fe,{style:{width:64,height:64,color:"#cbd5e1"}})}),e.jsx("div",{className:"pis-hover-overlay",children:e.jsxs("div",{className:"pis-zoom-hint",children:[e.jsx(ue,{style:{width:14,height:14}}),"Click para ampliar"]})}),e.jsxs("div",{className:`pis-stock-badge ${le}`,children:[e.jsx("div",{className:"pis-stock-dot"}),n," en stock"]}),v&&e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"pis-nav-btn left",onClick:b=>{b.stopPropagation(),S()},"aria-label":"Imagen anterior",children:e.jsx(Y,{style:{width:16,height:16,color:"#334155"}})}),e.jsx("button",{className:"pis-nav-btn right",onClick:b=>{b.stopPropagation(),y()},"aria-label":"Imagen siguiente",children:e.jsx(E,{style:{width:16,height:16,color:"#334155"}})}),e.jsxs("div",{className:"pis-counter",children:[c+1," / ",s.length]})]})]}),v&&e.jsx("div",{className:"pis-thumbs-band",children:s.map((b,C)=>e.jsx("button",{className:`pis-thumb ${C===c?"active":""}`,onClick:()=>{g(!1),f(C)},"aria-label":`Ver imagen ${C+1}`,children:e.jsx("img",{src:b,alt:`Miniatura ${C+1}`})},C))})]}),p&&e.jsx(z,{children:e.jsxs("div",{className:"pis-lb-backdrop",style:P({zIndex:2147483647,WebkitTransform:"translate3d(0,0,0)",transform:"translate3d(0,0,0)"},a?{position:"absolute",top:o,left:0,right:0,height:r}:{position:"fixed",inset:0}),onClick:k,onKeyDown:oe,tabIndex:0,children:[e.jsx("button",{className:"pis-lb-close",onClick:k,"aria-label":"Cerrar",children:e.jsx(R,{style:{width:18,height:18,color:"#fff"},strokeWidth:2})}),e.jsxs("div",{className:"pis-lb-counter",children:[l+1,"  /  ",s.length]}),e.jsxs("div",{className:"pis-lb-img-wrap",onClick:b=>b.stopPropagation(),style:{WebkitTransform:"translate3d(0,0,0)",transform:"translate3d(0,0,0)"},children:[e.jsx("img",{src:s[l],alt:`${t} — ${l+1}`,className:"pis-lb-img",style:{WebkitTransform:"translate3d(0,0,0)",transform:"translate3d(0,0,0)"}}),v&&e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"pis-lb-nav left",onClick:b=>{b.stopPropagation(),H()},"aria-label":"Anterior",children:e.jsx(Y,{style:{width:20,height:20,color:"#fff"}})}),e.jsx("button",{className:"pis-lb-nav right",onClick:b=>{b.stopPropagation(),D()},"aria-label":"Siguiente",children:e.jsx(E,{style:{width:20,height:20,color:"#fff"}})})]})]}),v&&e.jsx("div",{className:"pis-lb-thumbs",children:s.map((b,C)=>e.jsx("button",{className:`pis-lb-thumb ${C===l?"active":""}`,onClick:ce=>{ce.stopPropagation(),m(C)},"aria-label":`Imagen ${C+1}`,children:e.jsx("img",{src:b,alt:`Miniatura ${C+1}`})},C))})]})})]})},ie=x.memo(({isOpen:s,onClose:t,onSelectPoint:n,selectedPoint:d})=>(x.useEffect(()=>{if(s){const a=window.scrollY;return document.body.style.position="fixed",document.body.style.top=`-${a}px`,document.body.style.width="100%",document.body.style.overflow="hidden",()=>{document.body.style.position="",document.body.style.top="",document.body.style.width="",document.body.style.overflow="",window.scrollTo(0,a)}}},[s]),s?e.jsx(z,{children:e.jsxs("div",{className:"fixed inset-0 z-[99999] overflow-hidden",children:[e.jsx("div",{className:"absolute inset-0 bg-black/80 backdrop-blur-sm",onClick:t}),e.jsx("div",{className:"absolute inset-0 flex items-center justify-center p-4",children:e.jsxs("div",{className:"relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-2xl border border-gray-700/50 overflow-hidden max-h-[90vh] flex flex-col",onClick:a=>a.stopPropagation(),children:[e.jsx("div",{className:"hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-green-500/20 rounded-full blur-3xl"}),e.jsxs("div",{className:"relative px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 border-b border-gray-700/50 flex-shrink-0",children:[e.jsx("button",{onClick:t,className:"absolute top-3 sm:top-4 right-3 sm:right-4 p-2 hover:bg-white/10 rounded-xl transition-colors z-10",children:e.jsx(R,{className:"w-5 h-5 text-gray-400"})}),e.jsxs("div",{className:"space-y-3 sm:space-y-4",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"p-2 sm:p-3 rounded-xl bg-green-500/20 border border-green-500/30",children:e.jsx(L,{className:"w-5 h-5 sm:w-6 sm:h-6 text-green-400"})}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg sm:text-xl font-black text-white",children:"Puntos de Retiro"}),e.jsx("p",{className:"text-xs sm:text-sm text-gray-400",children:"No tenemos local físico. Elegí dónde retirar."})]})]}),e.jsxs("div",{className:"bg-emerald-500/10 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 border border-emerald-500/20",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[e.jsx(U,{className:"w-4 h-4 sm:w-5 sm:h-5 text-emerald-400",strokeWidth:2}),e.jsx("p",{className:"text-xs sm:text-sm font-bold text-emerald-400 uppercase",children:"Todos los puntos cuentan con:"})]}),e.jsxs("div",{className:"flex flex-wrap gap-x-4 gap-y-1.5",children:[e.jsxs("div",{className:"flex items-center gap-1.5",children:[e.jsx(U,{className:"w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400/70 flex-shrink-0",strokeWidth:2}),e.jsx("span",{className:"text-[10px] sm:text-xs text-gray-300 whitespace-nowrap",children:"Seguridad Policial"})]}),e.jsxs("div",{className:"flex items-center gap-1.5",children:[e.jsx(je,{className:"w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400/70 flex-shrink-0",strokeWidth:2}),e.jsx("span",{className:"text-[10px] sm:text-xs text-gray-300 whitespace-nowrap",children:"Cámaras de Seguridad"})]})]})]})]})]}),e.jsx("div",{className:"relative flex-1 overflow-y-auto scrollbar-custom",children:e.jsx("div",{className:"p-4 sm:p-6 space-y-3 sm:space-y-4",children:_e.map(a=>{const c=(d==null?void 0:d.id)===a.id;return e.jsxs("button",{onClick:()=>n(a),className:`relative w-full flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] text-left ${c?"border-green-500 bg-green-500/10 shadow-lg shadow-green-500/20":"border-gray-700 bg-gray-800/50 hover:border-gray-600"}`,children:[e.jsxs("div",{className:"relative flex-shrink-0",children:[e.jsx("div",{className:`w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 ${c?"border-green-500":"border-gray-600"}`,children:e.jsx("img",{src:a.image,alt:a.name,className:"w-full h-full object-cover",loading:"lazy",decoding:"async"})}),e.jsx("div",{className:`absolute -top-1 -right-1 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-black text-white shadow-lg bg-gradient-to-br ${a.color}`,children:a.id})]}),e.jsxs("div",{className:"flex-1 min-w-0 space-y-2 sm:space-y-2.5",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"flex items-start gap-2 mb-1",children:[e.jsx("h4",{className:"text-base sm:text-lg font-black text-white flex-1 min-w-0",children:a.name}),c&&e.jsxs("span",{className:"flex-shrink-0 inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 bg-green-500 text-white text-[9px] sm:text-[10px] font-bold rounded-full whitespace-nowrap",children:["✓ ",e.jsx("span",{className:"hidden xs:inline",children:"Seleccionado"})]})]}),e.jsxs("div",{className:"flex items-center gap-1.5 text-xs sm:text-sm text-gray-400",children:[e.jsx(L,{className:"w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0",strokeWidth:2}),e.jsx("span",{className:"line-clamp-1",children:a.address})]})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-2",children:[e.jsxs("div",{className:"flex items-center gap-2 bg-gray-900/50 rounded-lg px-2 py-1.5 border border-gray-700/50",children:[e.jsx(ve,{className:"w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400 flex-shrink-0",strokeWidth:2}),e.jsxs("div",{className:"min-w-0 flex-1",children:[e.jsx("p",{className:"text-[9px] sm:text-[10px] text-gray-500 uppercase font-medium",children:"Días"}),e.jsxs("p",{className:"text-xs sm:text-sm font-bold text-white leading-tight",children:[e.jsx("span",{className:"sm:hidden",children:a.days==="Lunes a Viernes"?"Lun a Vie":a.days==="Todos los días"?"Todos":a.days}),e.jsx("span",{className:"hidden sm:inline",children:a.days})]})]})]}),e.jsxs("div",{className:"flex items-center gap-2 bg-gray-900/50 rounded-lg px-2 py-1.5 border border-gray-700/50",children:[e.jsx(we,{className:"w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 flex-shrink-0",strokeWidth:2}),e.jsxs("div",{className:"min-w-0 flex-1",children:[e.jsx("p",{className:"text-[9px] sm:text-[10px] text-gray-500 uppercase font-medium",children:"Horario"}),e.jsx("p",{className:"text-xs sm:text-sm font-bold text-white leading-tight",children:a.schedule})]})]})]})]})]},a.id)})})}),e.jsx("div",{className:"relative px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-700/50 bg-gray-900/50 flex-shrink-0",children:e.jsx("p",{className:"text-xs text-center text-gray-400",children:"Al seleccionar un punto, se enviará el mensaje automáticamente por WhatsApp"})})]})})]})}):null));ie.displayName="PickupPointModal";const is=({productName:s,product:t,className:n=""})=>{const[d,a]=x.useState(!1),[c,f]=x.useState(null),h=x.useCallback(l=>{t&&Ue(t,"consult");const m="5491125718382",o=t!=null&&t.price?`$${t.price.toLocaleString("es-AR")}`:"";let i=`Hola! Vi este producto en su catalogo web:

`;i+=`Producto: ${s}
`,i+=`Precio: ${o}
`,l&&(i+=`
Punto de retiro seleccionado:
`,i+=`${l.name} - ${l.address}
`),i+=`
Necesitaria mas informacion. Podrian ayudarme?`;const r=`https://wa.me/${m}?text=${encodeURIComponent(i)}`;window.open(r,"_blank"),a(!1),f(null)},[t,s]),g=()=>{a(!0)},p=()=>{a(!1),f(null)},j=l=>{f(l),setTimeout(()=>{h(l)},300)};return e.jsxs(e.Fragment,{children:[e.jsxs("button",{onClick:g,style:{WebkitTapHighlightColor:"transparent",cursor:"pointer"},className:`group w-full flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-3 sm:px-6 sm:py-4 rounded-xl shadow-lg hover:shadow-green-500/50 transition-all duration-300 font-bold text-sm sm:text-base active:scale-95 ${n}`,children:[e.jsx("div",{className:"flex-shrink-0",children:e.jsx("svg",{className:"w-5 h-5 sm:w-6 sm:h-6",fill:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{d:"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.785"})})}),e.jsxs("div",{className:"flex flex-col items-start",children:[e.jsx("span",{className:"text-xs sm:text-sm font-semibold opacity-90",children:"Consultar por WhatsApp"}),e.jsx("span",{className:"text-sm sm:text-base font-black",children:"Más información"})]}),e.jsx("div",{className:"flex-shrink-0 hidden sm:block group-hover:translate-x-1 transition-transform duration-300",children:e.jsx(M,{className:"w-4 h-4 sm:w-5 sm:h-5",strokeWidth:2.5})}),e.jsx("div",{className:"flex-shrink-0 sm:hidden",children:e.jsx(M,{className:"w-4 h-4",strokeWidth:2.5})}),e.jsx("div",{className:"hidden sm:block absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-xl"})]}),e.jsx(ie,{isOpen:d,onClose:p,onSelectPoint:j,selectedPoint:c})]})},ns=x.memo(is),os=({productName:s,product:t,className:n=""})=>{const[d,a]=x.useState(!1),[c,f]=x.useState(!1),[h,g]=x.useState(null),p=x.useRef(null),j=x.useRef(null);x.useEffect(()=>{if(!d||!p.current)return;const i=()=>{const r=p.current.getBoundingClientRect(),u=window.innerHeight,v=u-r.bottom,N=200;let y,S;v>=N+16?(y=r.bottom+8,S=null):(y=null,S=u-r.top+8),g({top:y,bottom:S,left:r.left,width:r.width})};return i(),window.addEventListener("resize",i),()=>window.removeEventListener("resize",i)},[d]),x.useEffect(()=>{if(!d)return;const i=u=>{p.current&&!p.current.contains(u.target)&&j.current&&!j.current.contains(u.target)&&a(!1)},r=()=>{a(!1)};return document.addEventListener("mousedown",i),document.addEventListener("touchstart",i,{passive:!0}),window.addEventListener("scroll",r,!0),()=>{document.removeEventListener("mousedown",i),document.removeEventListener("touchstart",i),window.removeEventListener("scroll",r,!0)}},[d]);const l=()=>typeof window=="undefined"?"":window.location.href,m=i=>$(null,null,function*(){i.stopPropagation();try{const r=l();yield navigator.clipboard.writeText(r),f(!0),setTimeout(()=>{f(!1),a(!1)},2e3)}catch(r){}}),o=i=>{i.stopPropagation();const r=l(),u=`¡Mira este producto! ${s}`,v=`https://wa.me/?text=${encodeURIComponent(u+`
`+r)}`;window.open(v,"_blank"),a(!1)};return e.jsxs(e.Fragment,{children:[e.jsxs("button",{ref:p,onClick:()=>a(!d),onTouchEnd:i=>{i.preventDefault(),a(!d)},style:{WebkitTapHighlightColor:"transparent",cursor:"pointer",touchAction:"manipulation"},className:`w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-3 sm:px-6 sm:py-4 rounded-xl shadow-lg hover:shadow-blue-500/50 transition-all duration-300 font-bold text-sm sm:text-base hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] group relative overflow-hidden ${n}`,children:[e.jsx("div",{className:"flex-shrink-0",children:e.jsx(ye,{className:"w-5 h-5 sm:w-6 sm:h-6",strokeWidth:2.5})}),e.jsxs("div",{className:"flex flex-col items-start",children:[e.jsx("span",{className:"text-xs sm:text-sm font-semibold opacity-90",children:"Compartir"}),e.jsx("span",{className:"text-sm sm:text-base font-black",children:"Este producto"})]}),e.jsx("div",{className:"flex-shrink-0 group-hover:translate-y-0.5 transition-transform duration-300",children:e.jsx(Ne,{className:"w-4 h-4 sm:w-5 sm:h-5",strokeWidth:2.5})}),e.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-xl"})]}),d&&h&&e.jsx(z,{children:e.jsxs("div",{ref:j,className:"bg-white rounded-xl shadow-2xl border-2 border-gray-200 overflow-hidden",style:I(P({position:"fixed"},h.top!==null?{top:`${h.top}px`}:{bottom:`${h.bottom}px`}),{left:`${h.left}px`,width:`${h.width}px`,maxHeight:"80vh",overflowY:"auto",zIndex:2147483647,WebkitTransform:"translate3d(0, 0, 0)",transform:"translate3d(0, 0, 0)",WebkitBackfaceVisibility:"hidden",backfaceVisibility:"hidden",pointerEvents:"auto",WebkitOverflowScrolling:"touch"}),children:[e.jsx("button",{onClick:m,onTouchEnd:i=>{i.preventDefault(),m(i)},style:{WebkitTapHighlightColor:"transparent",cursor:"pointer",touchAction:"manipulation"},className:"w-full flex items-center gap-3 px-4 py-4 hover:bg-gray-50 active:bg-gray-100 transition-colors duration-200 border-b border-gray-100",children:c?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"flex-shrink-0 p-2 bg-green-100 rounded-lg",children:e.jsx(ke,{className:"h-5 w-5 text-green-600",strokeWidth:2.5})}),e.jsxs("div",{className:"flex flex-col items-start flex-1",children:[e.jsx("span",{className:"text-sm font-bold text-green-600",children:"¡Copiado!"}),e.jsx("span",{className:"text-xs text-green-500",children:"Enlace en portapapeles"})]})]}):e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"flex-shrink-0 p-2 bg-blue-100 rounded-lg",children:e.jsx(Ce,{className:"h-5 w-5 text-blue-600",strokeWidth:2.5})}),e.jsxs("div",{className:"flex flex-col items-start flex-1",children:[e.jsx("span",{className:"text-sm font-bold text-gray-800",children:"Copiar enlace"}),e.jsx("span",{className:"text-xs text-gray-500",children:"Compartir URL del producto"})]})]})}),e.jsxs("button",{onClick:o,onTouchEnd:i=>{i.preventDefault(),o(i)},style:{WebkitTapHighlightColor:"transparent",cursor:"pointer",touchAction:"manipulation"},className:"w-full flex items-center gap-3 px-4 py-4 hover:bg-green-50 active:bg-green-100 transition-colors duration-200",children:[e.jsx("div",{className:"flex-shrink-0 p-2 bg-green-100 rounded-lg",children:e.jsx("svg",{className:"h-5 w-5 text-green-600",fill:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{d:"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"})})}),e.jsxs("div",{className:"flex flex-col items-start flex-1",children:[e.jsx("span",{className:"text-sm font-bold text-gray-800",children:"Compartir por WhatsApp"}),e.jsx("span",{className:"text-xs text-gray-500",children:"Enviar a un contacto"})]})]})]})})]})},ls=s=>new Intl.NumberFormat("es-AR",{minimumFractionDigits:0}).format(s),q=({name:s,brand:t,model:n,description:d,price:a,product:c})=>e.jsxs("div",{className:"pic-root",children:[e.jsx("div",{className:"pic-accent-bar hidden lg:block"}),e.jsxs("div",{className:"pic-badges",children:[e.jsxs("span",{className:"pic-badge-brand",children:[e.jsx(Se,{style:{width:10,height:10}}),t]}),e.jsxs("span",{className:"pic-badge-model",children:[e.jsx(Pe,{style:{width:10,height:10}}),n]}),c.manufacturerUrl&&e.jsxs("a",{href:c.manufacturerUrl,target:"_blank",rel:"noopener noreferrer",className:"pic-badge-url",children:["Web oficial",e.jsx($e,{style:{width:10,height:10}})]})]}),e.jsx("div",{className:"pic-title-zone",children:e.jsx("h1",{className:"pic-title",children:s})}),e.jsx("div",{className:"pic-desc-zone",children:e.jsx("p",{className:"pic-desc",children:d})}),e.jsxs("div",{className:"pic-price-zone",children:[e.jsxs("div",{children:[e.jsx("div",{className:"pic-price-label",children:"Precio"}),e.jsxs("div",{className:"pic-price-value",children:[e.jsx("span",{className:"pic-price-currency",children:"$"}),e.jsx("span",{className:"pic-price-number",children:ls(a)})]})]}),e.jsxs("div",{className:"flex flex-col items-center gap-1.5",children:[e.jsx("div",{className:"pic-stock-dot"}),e.jsx("span",{className:"pic-stock-label",children:"Stock"})]})]}),e.jsxs("div",{className:"pic-ctas",children:[e.jsx(os,{productName:s,product:c}),e.jsx(ns,{productName:s,product:c})]})]}),J=({specifications:s})=>{const[t,n]=x.useState(null),[d,a]=x.useState("main");if(!s)return null;const c=o=>o.replace(/([A-Z])/g," $1").replace(/^./,i=>i.toUpperCase()).trim(),f=Object.entries(s).map(([o,i])=>({key:o,value:i,label:c(o)})),h=Math.ceil(f.length/2),g=f.slice(0,h),p=f.slice(h),j=o=>typeof o=="object"&&o!==null?e.jsx("div",{className:"space-y-1",children:Object.entries(o).map(([i,r])=>e.jsxs("div",{className:"text-xs",children:[e.jsxs("span",{className:"text-gray-500",children:[i,":"]})," ",e.jsx("span",{className:"font-semibold text-gray-900",children:r})]},i))}):e.jsx("span",{className:"font-semibold text-gray-900",children:o}),l=({spec:o,index:i,isLeft:r})=>{const{key:u,value:v,label:N}=o,y=`${r?"left":"right"}-${i}`,S=t===y;return e.jsx("div",{className:`group relative p-3 sm:p-4 rounded-lg transition-all duration-200 cursor-pointer border
          ${S?"bg-gray-50 shadow-md border-gray-300 scale-[1.01]":"bg-white border-gray-200 hover:border-gray-300"}`,onMouseEnter:()=>n(y),onMouseLeave:()=>n(null),children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-2 sm:gap-3 flex-1",children:[e.jsx("div",{className:`w-1 sm:w-1.5 h-5 sm:h-6 rounded-full transition-all duration-200 ${S?"bg-gray-800":"bg-gray-300"}`}),e.jsx("dt",{className:"text-xs sm:text-sm font-medium text-gray-700 flex-1",children:N})]}),e.jsx("dd",{className:"text-xs sm:text-sm ml-2 sm:ml-4 text-right",children:j(v)})]})})},m=({specs:o,title:i,isLeft:r})=>o.length===0?null:e.jsxs("div",{className:"space-y-3 sm:space-y-4",children:[e.jsx("div",{className:"hidden lg:block border-b border-gray-200 pb-3",children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("div",{className:`w-2 h-2 rounded-full ${r?"bg-gray-800":"bg-gray-600"}`}),e.jsx("h3",{className:"font-semibold text-gray-900",children:i}),e.jsx("span",{className:"text-xs text-gray-500 ml-auto",children:o.length})]})}),e.jsx("div",{className:"space-y-2",children:o.map((u,v)=>e.jsx(l,{spec:u,index:v,isLeft:r},u.key))})]});return e.jsx("div",{className:"bg-white rounded-xl border-2 border-gray-200 shadow-lg overflow-hidden",children:e.jsxs("div",{className:"p-4 sm:p-6",children:[e.jsxs("div",{className:"flex items-center gap-3 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-100",children:[e.jsx("div",{className:"w-7 h-7 sm:w-8 sm:h-8 bg-gray-100 rounded-lg flex items-center justify-center",children:e.jsx(Ie,{className:"h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-700"})}),e.jsxs("div",{children:[e.jsx("h2",{className:"text-lg sm:text-xl font-bold text-gray-900",children:"Detalles Técnicos"}),e.jsx("p",{className:"text-gray-600 text-xs sm:text-sm",children:"Especificaciones del producto"})]})]}),e.jsx("div",{className:"lg:hidden mb-4",children:e.jsxs("div",{className:"flex gap-2 p-1 bg-gray-100 rounded-lg",children:[e.jsx("button",{onClick:()=>a("main"),className:`flex-1 px-3 py-2 rounded-md text-sm font-semibold transition-all duration-200 ${d==="main"?"bg-white text-gray-900 shadow-sm":"text-gray-600 hover:text-gray-900"}`,children:e.jsxs("div",{className:"flex items-center justify-center gap-2",children:[e.jsx("div",{className:`w-1.5 h-1.5 rounded-full ${d==="main"?"bg-gray-800":"bg-gray-400"}`}),e.jsx("span",{children:"Principales"}),e.jsxs("span",{className:"text-xs text-gray-500",children:["(",g.length,")"]})]})}),e.jsx("button",{onClick:()=>a("additional"),className:`flex-1 px-3 py-2 rounded-md text-sm font-semibold transition-all duration-200 ${d==="additional"?"bg-white text-gray-900 shadow-sm":"text-gray-600 hover:text-gray-900"}`,children:e.jsxs("div",{className:"flex items-center justify-center gap-2",children:[e.jsx("div",{className:`w-1.5 h-1.5 rounded-full ${d==="additional"?"bg-gray-600":"bg-gray-400"}`}),e.jsx("span",{children:"Adicional"}),e.jsxs("span",{className:"text-xs text-gray-500",children:["(",p.length,")"]})]})})]})}),e.jsxs("div",{className:"lg:hidden",children:[d==="main"&&e.jsx(m,{specs:g,title:"Características Principales",isLeft:!0}),d==="additional"&&e.jsx(m,{specs:p,title:"Información Adicional",isLeft:!1})]}),e.jsxs("div",{className:"hidden lg:grid lg:grid-cols-2 gap-8",children:[e.jsx(m,{specs:g,title:"Características Principales",isLeft:!0}),e.jsx(m,{specs:p,title:"Información Adicional",isLeft:!1})]})]})})},Q=()=>{const s=[{id:"efectivo",icon:Le,title:"Efectivo",description:"En el momento",color:"emerald",gradient:"from-yellow-500 to-cyan-500",bgColor:"from-emerald-50 to-green-50",available:!0},{id:"transferencia",icon:Ae,title:"Transferencia",description:"Mayores a $100.000",color:"blue",gradient:"from-blue-500 to-cyan-400",bgColor:"from-blue-50 to-indigo-50",available:!0}];return e.jsxs("div",{className:"bg-gradient-to-br from-gray-50 via-white to-blue-50 p-4 sm:p-6 rounded-xl relative overflow-hidden",children:[e.jsxs("div",{className:"absolute inset-0 overflow-hidden pointer-events-none",children:[e.jsx("div",{className:"absolute top-5 right-5 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl"}),e.jsx("div",{className:"absolute bottom-5 left-5 w-32 h-32 bg-emerald-200/20 rounded-full blur-2xl"})]}),e.jsxs("div",{className:"relative",children:[e.jsxs("div",{className:"text-center mb-6",children:[e.jsxs("div",{className:"inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 bg-white rounded-full border-2 border-blue-200 shadow-sm mb-4 sm:mb-6",children:[e.jsx(Ee,{className:"h-3 w-3 sm:h-4 sm:w-4 text-blue-600"}),e.jsx("span",{className:"text-xs sm:text-sm font-bold text-gray-700",children:"Métodos de Pago"})]}),e.jsxs("h2",{className:"text-2xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4 sm:mb-6 px-4",children:["Opciones de Pago",e.jsx("span",{className:"block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600 mt-1 sm:mt-2 pb-1 sm:pb-2",children:"Seguros y Confiables"})]})]}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6",children:s.map(t=>{const n=t.icon;return e.jsx("div",{className:"group relative",children:e.jsxs("div",{className:`relative bg-white rounded-2xl sm:rounded-3xl border-2 overflow-hidden shadow-lg ${t.id==="efectivo"?"border-emerald-300":"border-blue-300"}`,children:[t.id==="efectivo"&&e.jsx("div",{className:"absolute inset-0 bg-cover bg-center ",style:{backgroundImage:"url(/images/cash_tiny.webp)",backgroundSize:"contain",backgroundRepeat:"no-repeat",backgroundPosition:"right bottom"}}),t.id==="transferencia"&&e.jsx("div",{className:"absolute inset-0 bg-cover bg-center",style:{backgroundImage:"url(/images/transfer_tiny.webp)",backgroundSize:"contain",backgroundRepeat:"no-repeat",backgroundPosition:"right bottom"}}),e.jsx("div",{className:`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${t.bgColor} opacity-40 rounded-full blur-3xl`}),e.jsxs("div",{className:"relative p-4 sm:p-6",children:[e.jsx("div",{className:`inline-flex p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br ${t.gradient} shadow-lg mb-3 sm:mb-4`,children:e.jsx(n,{className:"h-5 w-5 sm:h-8 sm:w-8 text-white",strokeWidth:2.5})}),e.jsxs("div",{className:"max-w-[60%] sm:max-w-none",children:[e.jsx("h3",{className:`text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight mb-1 sm:mb-2 ${t.id==="efectivo"?"text-emerald-700":"text-blue-700"}`,children:t.title}),e.jsx("p",{className:`font-semibold text-xs sm:text-base ${t.id==="efectivo"?"text-emerald-600":"text-blue-600"}`,children:t.description})]})]}),e.jsx("div",{className:`h-1.5 sm:h-2 bg-gradient-to-r ${t.gradient}`})]})},t.id)})})]})]})},ee=()=>{const s=ae();return e.jsxs("div",{children:[e.jsxs("div",{className:"absolute inset-0 overflow-hidden pointer-events-none",children:[e.jsx("div",{className:"absolute top-5 right-5 w-32 h-32 bg-purple-200/20 rounded-full blur-2xl"}),e.jsx("div",{className:"absolute bottom-5 left-5 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl"})]}),e.jsxs("div",{className:"relative",children:[e.jsxs("div",{className:"text-center mb-4 sm:mb-6",children:[e.jsxs("div",{className:"inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 bg-white rounded-full border-2 border-purple-200 shadow-sm mb-3 sm:mb-4",children:[e.jsx(L,{className:"h-3 w-3 sm:h-4 sm:w-4 text-purple-600"}),e.jsx("span",{className:"text-xs sm:text-sm font-bold text-gray-700",children:"Sin local físico"})]}),e.jsxs("h2",{className:"text-2xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-2 sm:mb-4 px-4",children:["Coordiná la entrega",e.jsx("span",{className:"block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mt-1 sm:mt-2",children:"Revisás y pagás"})]})]}),e.jsx("div",{className:"mb-4 sm:mb-6",children:e.jsx(Xe,{rules:Ke})}),e.jsx("div",{className:"flex justify-center",children:e.jsxs("button",{onClick:()=>s("/puntos-de-retiro"),className:"group relative inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base shadow-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] overflow-hidden",children:[e.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"}),e.jsx(L,{className:"h-5 w-5 sm:h-6 sm:w-6 relative z-10",strokeWidth:2.5}),e.jsx("span",{className:"relative z-10",children:"¿Dónde retiro mi producto?"}),e.jsx(M,{className:"h-4 w-4 sm:h-5 sm:w-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300",strokeWidth:2.5})]})})]})]})},cs={retries:3,timeout:5e3,retryDelay:1e3,retryOn:[408,429,500,502,503,504],shouldRetry:null},ds=(d,...a)=>$(null,[d,...a],function*(s,t={},n={}){const c=P(P({},cs),n),{retries:f,timeout:h,retryDelay:g,retryOn:p,shouldRetry:j}=c;let l;for(let m=0;m<=f;m++)try{const o=new AbortController,i=setTimeout(()=>o.abort(),h);try{const r=yield fetch(s,I(P({},t),{signal:o.signal}));if(clearTimeout(i),!r.ok){if((j?j(r,m):p.includes(r.status))&&m<f){T.warn(`Fetch failed with status ${r.status}, retrying...`,{url:s,attempt:m+1,status:r.status}),yield se(g*(m+1));continue}throw new A(`HTTP ${r.status}: ${r.statusText}`,{status:r.status,url:s})}return r}catch(r){throw clearTimeout(i),r.name==="AbortError"?new _(`Fetch to ${s}`,h):r}}catch(o){if(l=o,m===f)throw T.log(o,{operation:"fetchWithRetry",url:s,attempts:m+1}),o;if(o instanceof A||o instanceof _){T.warn(`Fetch attempt ${m+1} failed, retrying...`,{url:s,error:o.message}),yield se(g*(m+1));continue}throw o}throw l}),ms=(d,...a)=>$(null,[d,...a],function*(s,t={},n={}){try{const c=yield ds(s,t,n),f=c.headers.get("content-type");if(!f||!f.includes("application/json"))throw new A("La respuesta no es JSON válido");return yield c.json()}catch(c){throw c instanceof SyntaxError?new A("Error al parsear JSON",c):c}}),se=s=>new Promise(t=>setTimeout(t,s));function xs(s){const[t,n]=x.useState(null),[d,a]=x.useState(!0),[c,f]=x.useState(null);return x.useEffect(()=>{if(!s){a(!1);return}let h=!0;function g(){return $(this,null,function*(){var p,j;try{a(!0),f(null);const l=yield ms("/data/price-history.json",{},{retries:2,timeout:8e3});if(!l||typeof l!="object")throw new W("Formato de datos inválido");const m=l[String(s)];if(h){if(m&&m.h&&Array.isArray(m.h)){if(!m.name)throw new W("Falta el nombre del producto en el histórico");const o=m.h.map(([N,y])=>{if(!N||typeof y!="number")throw new W("Datos de histórico inválidos");return{date:new Date(N),price:y,formattedDate:new Date(N).toLocaleDateString("es-AR",{year:"numeric",month:"short",day:"numeric"})}}),i=(p=o[o.length-1])==null?void 0:p.price,r=(j=o[0])==null?void 0:j.price,u=o.length>1?i-r:0,v=o.length>1&&r>0?((i-r)/r*100).toFixed(1):0;n({name:m.name,data:o,currentPrice:i,oldestPrice:r,priceChange:u,priceChangePercent:v})}else n(null);a(!1)}}catch(l){if(h){const m=He(l,{operation:"fetchPriceHistory",productId:s});f(m.message),a(!1)}}})}return g(),()=>{h=!1}},[s]),{history:t,loading:d,error:c}}function te({productId:s}){const{history:t,loading:n,error:d}=xs(s);if(n||d||!t||t.data.length<1)return null;const{data:a,priceChange:c,priceChangePercent:f}=t,h=a.map((w,k)=>({fecha:w.formattedDate.split(" ").slice(0,2).join(" "),fechaCompleta:w.formattedDate,precio:w.price,index:k}));h.length===1&&h.push(I(P({},h[0]),{fecha:"Actual",index:1}));const g=h.map(w=>w.precio),p=Math.min(...g),j=Math.max(...g),l=(j-p)*.1||j*.05,m=Math.floor((p-l)/1e3)*1e3,o=Math.ceil((j+l)/1e3)*1e3,i=c>0,r=c===0,u=r?"#3b82f6":i?"#ef4444":"#10b981",v=r?"#3b82f6":i?"#ef4444":"#10b981",N=w=>w>=1e6?`$${(w/1e6).toFixed(1)}M`:w>=1e3?`$${(w/1e3).toFixed(0)}k`:`$${w}`,y=r?V:i?ze:Te,S=g.reduce((w,k)=>w+k,0)/g.length;return e.jsxs("div",{className:"bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden",children:[e.jsx("div",{className:"bg-gradient-to-br from-gray-50 to-white px-4 sm:px-6 py-4 border-b border-gray-200",children:e.jsxs("div",{className:"flex items-center justify-between gap-3",children:[e.jsx("h3",{className:"text-base sm:text-lg font-bold text-gray-900 flex-shrink-0",children:"Histórico de Precios"}),e.jsxs("div",{className:"flex items-center gap-2 sm:gap-3 flex-shrink-0",children:[e.jsxs("div",{className:"text-right",children:[e.jsx("div",{className:"text-xs text-gray-500 font-medium hidden sm:block",children:"Precio Actual"}),e.jsxs("div",{className:"text-lg sm:text-xl font-bold text-gray-900",children:["$",a[a.length-1].price.toLocaleString("es-AR")]})]}),!r&&e.jsx("div",{className:`flex items-center justify-center p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-md ${i?"bg-gradient-to-r from-red-500 to-red-600 text-white":"bg-gradient-to-r from-green-500 to-green-600 text-white"}`,children:e.jsx(y,{className:"w-5 h-5 sm:w-6 sm:h-6"})}),r&&e.jsx("div",{className:"flex items-center justify-center p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md",children:e.jsx(V,{className:"w-5 h-5 sm:w-6 sm:h-6"})})]})]})}),e.jsx("div",{className:"p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-white",children:e.jsx(Ge,{width:"100%",height:300,className:"sm:h-[350px]",children:e.jsxs(Ze,{data:h,margin:{top:10,right:5,left:-10,bottom:10},className:"sm:!m-[20px_20px_20px_10px]",children:[e.jsx("defs",{children:e.jsxs("linearGradient",{id:`gradient-${s}`,x1:"0",y1:"0",x2:"0",y2:"1",children:[e.jsx("stop",{offset:"5%",stopColor:v,stopOpacity:.3}),e.jsx("stop",{offset:"95%",stopColor:v,stopOpacity:.05})]})}),e.jsx(qe,{strokeDasharray:"3 3",stroke:"#e5e7eb",vertical:!1}),e.jsx(Je,{dataKey:"fecha",tick:{fontSize:11,fill:"#6b7280",fontWeight:500},stroke:"#d1d5db",tickLine:!1,angle:-25,textAnchor:"end",height:50,className:"sm:text-[13px]"}),e.jsx(Qe,{domain:[m,o],tickFormatter:N,tick:{fontSize:11,fill:"#6b7280",fontWeight:600},stroke:"#d1d5db",tickLine:!1,width:55,className:"sm:text-[13px] sm:w-[70px]"}),e.jsx(es,{y:S,stroke:"#9ca3af",strokeDasharray:"5 5",label:{value:"Promedio",position:"right",fill:"#6b7280",fontSize:12,fontWeight:600}}),e.jsx(ss,{formatter:w=>[`$${w.toLocaleString("es-AR")}`,"Precio"],labelFormatter:(w,k)=>k&&k[0]?k[0].payload.fechaCompleta:w,contentStyle:{backgroundColor:"white",border:"2px solid #e5e7eb",borderRadius:"12px",fontSize:"14px",fontWeight:"600",padding:"12px 16px",boxShadow:"0 10px 25px -5px rgba(0, 0, 0, 0.1)"},labelStyle:{fontWeight:"bold",color:"#374151",marginBottom:"4px"}}),e.jsx(ts,{type:"monotone",dataKey:"precio",stroke:u,strokeWidth:2.5,fill:`url(#gradient-${s})`,dot:{fill:u,strokeWidth:2,r:4,stroke:"white"},activeDot:{r:7,strokeWidth:2,stroke:"white",fill:u,filter:"drop-shadow(0 4px 6px rgba(0,0,0,0.2))"}})]})})})]})}const ne=x.memo(({product:s,onClose:t,isPage:n=!1})=>{const d=x.useMemo(()=>s?{icon:We,text:"DISPONIBLE",bgColor:"bg-gradient-to-br from-green-50 to-green-100",badgeColor:"bg-green-500",textColor:"text-green-700",iconColor:"text-green-500",progressColor:"bg-green-500",glowColor:"shadow-green-200"}:null,[s]),a=x.useMemo(()=>s?s.images&&s.images.length>0?s.images:[]:[],[s]);return!s||!d?null:n?e.jsx("div",{className:"w-full max-w-7xl mx-auto px-0 sm:px-4",children:e.jsxs("div",{className:"bg-gray-50 rounded-none sm:rounded-xl lg:rounded-3xl shadow-lg border-0 sm:border border-gray-200",children:[e.jsx(G,{onClose:t,isPage:!0,product:s}),e.jsxs("div",{className:"px-3 sm:px-4 lg:px-8 py-3 sm:py-6 pb-6 sm:pb-8 space-y-4 sm:space-y-6",children:[e.jsx("div",{className:"bg-white rounded-xl border-2 border-gray-200 shadow-lg overflow-hidden",children:e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2",children:[e.jsx(Z,{images:a,name:s.name,stock:s.stock,stockStatus:d}),e.jsx(q,{name:s.name,brand:s.brand,model:s.model,description:s.description,price:s.price,product:s})]})}),e.jsx(te,{productId:s.id}),e.jsx(J,{specifications:s.specifications}),e.jsxs("div",{className:"space-y-4 sm:space-y-6",children:[e.jsx(Q,{}),e.jsx(ee,{})]})]})]})}):(x.useEffect(()=>{if(!n)return()=>{}},[n]),e.jsxs(z,{children:[e.jsx("div",{className:"fixed inset-0 bg-black/60 backdrop-blur-sm",style:{zIndex:2147483646},onClick:t}),e.jsx("div",{className:"fixed inset-0 overflow-y-auto flex items-start justify-center py-8",style:{zIndex:2147483647},children:e.jsx("div",{className:"w-full max-w-7xl",children:e.jsxs("div",{className:"bg-gray-50 rounded-3xl shadow-2xl",children:[e.jsx(G,{onClose:t,product:s}),e.jsxs("div",{className:"px-4 sm:px-6 lg:px-8 py-4 sm:py-6 pb-6 sm:pb-8 space-y-4 sm:space-y-6",children:[e.jsx("div",{className:"bg-white rounded-xl border-2 border-gray-200 shadow-lg overflow-hidden",children:e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2",children:[e.jsx(Z,{images:a,name:s.name,stock:s.stock,stockStatus:d}),e.jsx(q,{name:s.name,brand:s.brand,model:s.model,description:s.description,price:s.price,product:s})]})}),e.jsx(te,{productId:s.id}),e.jsx(J,{specifications:s.specifications}),e.jsxs("div",{className:"space-y-4 sm:space-y-6",children:[e.jsx(Q,{}),e.jsx(ee,{})]})]})]})})})]}))});ne.displayName="ProductDetail";const Hs=()=>{var i;const{id:s,productSku:t,categorySlug:n}=Me(),d=Re(),a=ae(),{getProductById:c,products:f}=Fe(),{searchQuery:h,setSearchQuery:g,selectedCategory:p,setSelectedCategory:j}=Oe();x.useEffect(()=>{window.scrollTo(0,0)},[]);let l;if(s)l=c(parseInt(s));else if(t){const r=(i=d.state)==null?void 0:i.productId;r?l=c(r):l=f.find(u=>Be(u.name,u.brand)===t)}as(l),Ve(l),x.useEffect(()=>{l&&l.category!==p&&j(l.category)},[l,p,j]),x.useEffect(()=>{window.scrollTo(0,0)},[s]);const m=r=>{if(j(r),r){const u=re(r);a(`/categoria/${u}`)}else a("/")},o=x.useCallback(()=>{window.history.length>2?window.history.back():n?a(`/categoria/${n}`,{replace:!0}):a("/",{replace:!0})},[n,a]);return l?e.jsxs("div",{className:"min-h-screen w-full flex flex-col",children:[e.jsx(X,{searchQuery:h,onSearchChange:g}),e.jsxs("main",{className:"flex-1 w-full px-0 sm:px-6 py-4 sm:py-8",children:[e.jsx("div",{className:"hidden sm:block mb-4 sm:mb-6 px-4 sm:px-0",children:e.jsx(Ye,{selectedCategory:p,onCategoryChange:m})}),e.jsx(ne,{product:l,onClose:o,isPage:!0})]}),e.jsx(K,{})]}):e.jsxs("div",{className:"min-h-screen w-full flex flex-col",children:[e.jsx(X,{searchQuery:h,onSearchChange:g}),e.jsx("div",{className:"flex-1 flex items-center justify-center",children:e.jsxs("div",{className:"text-center",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-900 mb-2",children:"Producto no encontrado"}),e.jsx("button",{onClick:o,className:"px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors active:scale-95",children:"Volver al catálogo"})]})}),e.jsx(K,{})]})};export{Hs as default};
