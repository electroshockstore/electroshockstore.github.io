import { useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const allCategories = [
  { id: 1, name: 'PROCESADORES',   image: '/images/category_grid/procesador_grid_tiny.webp',      slug: 'procesadores',   accent: '#f97316' },
  { id: 2, name: 'MOTHERBOARDS',   image: '/images/category_grid/motherboard_grid_tiny.webp',     slug: 'motherboards',   accent: '#2563eb' },
  { id: 3, name: 'MEMORIAS RAM',   image: '/images/category_grid/ram_grid_tiny.webp',             slug: 'memorias-ram',   accent: '#10b981' },
  { id: 4, name: 'ALMACENAMIENTO', image: '/images/category_grid/almacenamiento_grid_tiny.webp',  slug: 'almacenamiento', accent: '#8b5cf6' },
  { id: 5, name: 'FUENTES',        image: '/images/category_grid/fuente_grid_tiny.webp',          slug: 'fuentes',        accent: '#eab308' },
  { id: 6, name: 'REFRIGERACIÓN',  image: '/images/category_grid/refrigeracion_grid_tiny.webp',   slug: 'refrigeracion',  accent: '#06b6d4' },
  { id: 7, name: 'TECLADOS',       image: '/images/category_grid/teclados_grid_tiny.webp',        slug: 'teclados',       accent: '#ec4899' },
  { id: 8, name: 'MOUSE',          image: '/images/category_grid/mouse_grid_tiny.webp',           slug: 'mouse',          accent: '#f97316' },
  { id: 9, name: 'AURICULARES',    image: '/images/category_grid/auriculares_grid_tiny.webp',     slug: 'auriculares',    accent: '#2563eb' },
];

/* ── CARD ── */
const CategoryCard = ({ category, index, onCategoryClick, large = false, tall = false, wide = false }) => {
  const [hover, setHover] = useState(false);
  const num = String(index + 1).padStart(2, '0');

  return (
    <button
      onClick={() => onCategoryClick(category.slug)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label={`Explorar ${category.name}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 16,
        border: `1px solid ${hover ? category.accent + '55' : 'rgba(255,255,255,0.07)'}`,
        background: '#0a0a0a',
        cursor: 'pointer',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        transition: 'border-color .25s, transform .2s',
        transform: hover ? 'translateY(-2px)' : 'none',
        boxShadow: hover ? `0 12px 40px ${category.accent}22` : '0 2px 12px rgba(0,0,0,.4)',
        outline: 'none',
      }}
    >
      {/* Imagen de fondo */}
      <img
        src={category.image}
        alt={category.name}
        loading="lazy"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          transition: 'transform .4s cubic-bezier(.4,0,.2,1), opacity .3s',
          transform: hover ? 'scale(1.06)' : 'scale(1)',
          opacity: hover ? 0.55 : 0.4,
        }}
        onError={e => e.target.style.display = 'none'}
      />

      {/* Overlay base */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,.92) 0%, rgba(0,0,0,.4) 50%, rgba(0,0,0,.1) 100%)',
      }} />

      {/* Accent glow top-right en hover */}
      <div style={{
        position: 'absolute', top: -40, right: -40,
        width: 120, height: 120,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${category.accent}44 0%, transparent 70%)`,
        opacity: hover ? 1 : 0,
        transition: 'opacity .3s',
        pointerEvents: 'none',
      }} />

      {/* Número índice — top left */}
      <span style={{
        position: 'absolute', top: 14, left: 16,
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: large ? '1.1rem' : '.85rem',
        letterSpacing: '.1em',
        color: hover ? category.accent : 'rgba(255,255,255,0.2)',
        transition: 'color .2s',
        lineHeight: 1,
      }}>
        {num}
      </span>

      {/* Arrow top-right en hover */}
      <div style={{
        position: 'absolute', top: 12, right: 12,
        width: 28, height: 28,
        borderRadius: 8,
        background: category.accent,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: hover ? 1 : 0,
        transform: hover ? 'scale(1)' : 'scale(0.6)',
        transition: 'opacity .2s, transform .25s cubic-bezier(.4,0,.2,1)',
      }}>
        <ArrowUpRight size={14} color="#fff" strokeWidth={2.5} />
      </div>

      {/* Contenido inferior */}
      <div style={{ position: 'relative', zIndex: 1, padding: large ? '20px 20px 18px' : '14px 14px 13px' }}>
        {/* Línea de acento */}
        <div style={{
          height: 2,
          width: hover ? (large ? 40 : 28) : (large ? 20 : 14),
          background: category.accent,
          borderRadius: 1,
          marginBottom: large ? 10 : 7,
          transition: 'width .3s cubic-bezier(.4,0,.2,1)',
        }} />

        <span style={{
          display: 'block',
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: large ? 'clamp(1.3rem,2.5vw,1.7rem)' : wide ? '1.1rem' : 'clamp(.85rem,1.6vw,1.05rem)',
          letterSpacing: '.06em',
          color: '#fff',
          lineHeight: 1,
          textAlign: 'left',
          textShadow: '0 2px 8px rgba(0,0,0,.8)',
        }}>
          {category.name}
        </span>
      </div>
    </button>
  );
};

/* ── SECCIÓN PRINCIPAL ── */
const CategoryProductSection = ({ onCategoryClick }) => {
  const navigate = useNavigate();

  const handle = (slug) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onCategoryClick?.(slug);
  };

  return (
    <section style={{ width: '100%', position: 'relative' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .cps-wrap {
          max-width: 1100px;
          margin: 0 auto;
          padding: 64px 24px 72px;
          font-family: 'DM Sans', sans-serif;
        }

        /* ── HEADER ── */
        .cps-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 36px;
        }
        .cps-head-left {}
        .cps-eyebrow {
          font-size: 10px; font-weight: 700;
          letter-spacing: .22em; text-transform: uppercase;
          color: #2563eb; margin-bottom: 8px;
        }
        .cps-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.8rem, 6vw, 4.5rem);
          letter-spacing: .03em;
          color: #fff;
          line-height: .9;
        }
        .cps-title em {
          font-style: normal;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,0.35);
        }
        .cps-sub {
          font-size: 13px; font-weight: 400;
          color: rgba(255,255,255,.35);
          margin-top: 10px; letter-spacing: .02em;
        }
        .cps-head-count {
          flex-shrink: 0; text-align: right;
        }
        .cps-head-count-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(3rem,5vw,4.5rem);
          color: rgba(255,255,255,.12);
          line-height: 1;
        }
        .cps-head-count-lbl {
          font-size: 9px; font-weight: 700;
          letter-spacing: .2em; text-transform: uppercase;
          color: rgba(255,255,255,.2);
        }

        /* ── BENTO DESKTOP ── */
        .cps-bento {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          grid-template-rows: 200px 160px 160px;
          gap: 10px;
        }
        .c1  { grid-column: span 2; grid-row: span 2; }
        .c2  { grid-column: span 2; grid-row: span 1; }
        .c3  { grid-column: span 2; grid-row: span 1; }
        .c4  { grid-column: span 2; grid-row: span 2; }
        .c5  { grid-column: span 1; grid-row: span 1; }
        .c6  { grid-column: span 1; grid-row: span 1; }
        .c7  { grid-column: span 2; grid-row: span 1; }
        .c8  { grid-column: span 1; grid-row: span 1; }
        .c9  { grid-column: span 1; grid-row: span 1; }

        /* ── BENTO TABLET ── */
        @media (max-width: 1023px) and (min-width: 640px) {
          .cps-bento {
            grid-template-columns: repeat(4, 1fr);
            grid-template-rows: 180px 140px 140px;
          }
          .c1 { grid-column: span 2; grid-row: span 2; }
          .c2 { grid-column: span 2; grid-row: span 1; }
          .c3 { grid-column: span 2; grid-row: span 1; }
          .c4 { grid-column: span 2; grid-row: span 2; }
          .c5 { grid-column: span 1; }
          .c6 { grid-column: span 1; }
          .c7 { grid-column: span 2; }
          .c8 { grid-column: span 1; }
          .c9 { grid-column: span 1; }
        }

        /* ── BENTO MOBILE ── */
        @media (max-width: 639px) {
          .cps-bento {
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(5, 120px);
            gap: 8px;
          }
          .c1 { grid-column: span 2; grid-row: span 1; }
          .c2, .c3, .c4, .c5, .c6, .c7, .c8, .c9 {
            grid-column: span 1; grid-row: span 1;
          }
          .c7 { grid-column: span 2; }
        }

        /* ── CTA ── */
        .cps-cta-wrap {
          display: flex; justify-content: center;
          margin-top: 28px;
        }
        .cps-cta {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 14px 28px;
          background: #fff;
          color: #0a0a0a;
          border: none;
          border-radius: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; font-weight: 700;
          letter-spacing: .06em; text-transform: uppercase;
          cursor: pointer;
          transition: background .15s, transform .15s, box-shadow .15s;
          box-shadow: 0 4px 20px rgba(255,255,255,.1);
        }
        .cps-cta:hover {
          background: #f1f5f9;
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(255,255,255,.15);
        }
        .cps-cta:active { transform: scale(.97); }
        .cps-cta svg { transition: transform .2s; }
        .cps-cta:hover svg { transform: translateX(4px); }
      `}</style>

      <div className="cps-wrap">

        {/* HEADER */}
        <div className="cps-head">
          <div className="cps-head-left">
            <div className="cps-eyebrow">Shock Store · Catálogo</div>
            <div className="cps-title">
              Explorá<br /><em>categorías</em>
            </div>
            <div className="cps-sub">Todo para tu setup en un solo lugar</div>
          </div>
          <div className="cps-head-count">
            <div className="cps-head-count-num">{String(allCategories.length).padStart(2,'0')}</div>
            <div className="cps-head-count-lbl">secciones</div>
          </div>
        </div>

        {/* BENTO GRID */}
        <div className="cps-bento">
          {[
            { cls: 'c1', i: 0, large: true },
            { cls: 'c2', i: 1, wide: true },
            { cls: 'c3', i: 2, wide: true },
            { cls: 'c4', i: 3, large: true },
            { cls: 'c5', i: 4 },
            { cls: 'c6', i: 5 },
            { cls: 'c7', i: 6, wide: true },
            { cls: 'c8', i: 7 },
            { cls: 'c9', i: 8 },
          ].map(({ cls, i, large, wide }) => (
            <div key={allCategories[i].id} className={cls}>
              <CategoryCard
                category={allCategories[i]}
                index={i}
                onCategoryClick={handle}
                large={large}
                wide={wide}
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="cps-cta-wrap">
          <button
            className="cps-cta"
            onClick={() => handle('procesadores')}
          >
            Ver todo el catálogo
            <ArrowRight size={15} strokeWidth={2.5} />
          </button>
        </div>

      </div>
    </section>
  );
};

export default CategoryProductSection;