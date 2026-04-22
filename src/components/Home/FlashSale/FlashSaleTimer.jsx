import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import TimerDigit from './TimerDigit';
import FlashSaleProduct from './FlashSaleProduct';

/**
 * FlashSaleTimer — Dark gaming section con acento lima #c8f519.
 *
 * Mejoras sobre v1:
 * - Hero completo con título gigante uppercase + badge relámpago
 * - Ticker animado con marquee horizontal
 * - Línea decorativa lima degradada en el top
 * - Timer con separador luminoso
 * - Botones de navegación ← →
 * - Trust badges (No pedimos dinero previo / Revisás y pagás)
 * - CTA principal "Ver todas las ofertas"
 * - Grid de productos con separador luminoso entre imagen y body
 * - Footer con sincronización Argentina
 * - Skeleton loader fiel al diseño oscuro
 */
const FlashSaleTimer = ({ targetDate, products = [] }) => {
  const [timeLeft, setTimeLeft] = useState(null);
  const [serverTime, setServerTime] = useState(null);
  const [isExpired, setIsExpired] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  /* ── Sincronizar hora con servidor ── */
  useEffect(() => {
    const fetchServerTime = async () => {
      try {
        const res = await fetch(
          'https://worldtimeapi.org/api/timezone/America/Argentina/Buenos_Aires'
        );
        const data = await res.json();
        setServerTime(new Date(data.datetime));
      } catch {
        setServerTime(new Date());
      } finally {
        setIsLoading(false);
      }
    };
    fetchServerTime();
  }, []);

  const calculateTimeLeft = useCallback(() => {
    if (!serverTime) return null;
    const now = new Date(serverTime.getTime() + (Date.now() - serverTime.getTime()));
    const diff = new Date(targetDate) - now;
    if (diff <= 0) {
      setIsExpired(true);
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return {
      days: Math.floor(diff / 86_400_000),
      hours: Math.floor((diff / 3_600_000) % 24),
      minutes: Math.floor((diff / 60_000) % 60),
      seconds: Math.floor((diff / 1_000) % 60),
    };
  }, [serverTime, targetDate]);

  useEffect(() => {
    if (!serverTime) return;
    setTimeLeft(calculateTimeLeft());
    const id = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(id);
  }, [serverTime, calculateTimeLeft]);

  if (isExpired) return null;

  /* ── Skeleton ── */
  if (isLoading || !timeLeft) {
    return (
      <section
        style={{
          background: 'linear-gradient(180deg, #0d0d12 0%, #111118 100%)',
          width: '100%',
        }}
      >
        <div
          style={{
            height: 3,
            background:
              'linear-gradient(90deg, #c8f519 0%, rgba(200,245,25,0.15) 65%, transparent 100%)',
          }}
        />
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 40px' }}>
          <div
            style={{
              height: 80, width: '40%', borderRadius: 8, marginBottom: 32,
              background: '#1a1a22', animation: 'pulse 1.5s infinite',
            }}
          />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
              gap: 20,
            }}
          >
            {[1, 2, 3].map(i => (
              <div
                key={i}
                style={{
                  borderRadius: 14, background: '#1a1a22',
                  aspectRatio: '3/4', animation: 'pulse 1.5s infinite',
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        </div>
        <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.45} }`}</style>
      </section>
    );
  }

  /* ── Ticker items ── */
  const tickerItems = ['Tiempo limitado', 'Stock limitado', 'Precios irrepetibles'];
  const tickerRepeated = [...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems];

  const sep = (
    <span
      style={{
        color: 'rgba(200,245,25,0.5)',
        fontSize: 22, fontWeight: 700,
        fontFamily: "'DM Mono', monospace",
        alignSelf: 'flex-end', marginBottom: 20,
        userSelect: 'none',
      }}
    >
      :
    </span>
  );

  return (
    <section style={{ width: '100%', background: '#0d0d12' }}>

      {/* ── Línea decorativa lima ── */}
      <div
        style={{
          height: 3,
          background:
            'linear-gradient(90deg, #c8f519 0%, rgba(200,245,25,0.15) 65%, transparent 100%)',
        }}
      />

      {/* ══════════════════════════════════════════
          HERO BLOCK
      ══════════════════════════════════════════ */}
      <div
        style={{
          position: 'relative', overflow: 'hidden',
          padding: '28px 40px 0',
          background: '#0d0d12',
        }}
      >
        {/* Dot pattern background */}
        <div
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '22px 22px',
          }}
        />

        {/* Top row: título izquierda | nav + timer + CTA derecha */}
        <div
          style={{
            display: 'flex', alignItems: 'flex-start',
            justifyContent: 'space-between', gap: 24,
            position: 'relative', zIndex: 2,
          }}
        >
          {/* Izquierda */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Badge */}
            <div
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                background: '#c8f519', color: '#0d0d12',
                fontSize: 9, fontWeight: 800, letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding: '4px 10px', borderRadius: 3,
                fontFamily: "'DM Mono', monospace",
                marginBottom: 10,
              }}
            >
              ⚡ Ofertas relámpago
            </div>

            {/* Título gigante */}
            <h2
              style={{
                fontSize: 'clamp(48px, 7.5vw, 80px)',
                fontWeight: 900, lineHeight: 0.9,
                color: '#ffffff',
                letterSpacing: '-0.03em',
                fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
                textTransform: 'uppercase',
                margin: 0,
              }}
            >
              OFERTAS
              <br />
              <span style={{ color: '#c8f519' }}>RELÁMPAGO</span>
            </h2>

            {/* Trust row */}
            <div
              style={{
                display: 'flex', gap: 24, marginTop: 22,
                paddingTop: 18, borderTop: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              {[
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" width={14} height={14}>
                      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                      <line x1="12" y1="9" x2="12" y2="13" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                  ),
                  text: 'No pedimos\ndinero previo',
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" width={14} height={14}>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ),
                  text: 'Revisás y pagás\nal momento',
                },
              ].map(({ icon, text }, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div
                    style={{
                      width: 32, height: 32,
                      border: '1px solid rgba(255,255,255,0.2)', borderRadius: 4,
                      background: 'rgba(255,255,255,0.04)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {icon}
                  </div>
                  <span
                    style={{
                      fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
                      letterSpacing: '0.08em', color: '#ffffff', lineHeight: 1.4,
                      fontFamily: "'DM Mono', monospace",
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Derecha: nav + timer + CTA */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 18, paddingBottom: 24 }}
          >
            {/* Nav buttons */}
            <div style={{ display: 'flex', gap: 8 }}>
              {['←', '→'].map((arrow, i) => (
                <button
                  key={i}
                  style={{
                    width: 38, height: 38,
                    border: '1px solid rgba(255,255,255,0.15)',
                    background: 'rgba(255,255,255,0.04)', color: '#fff',
                    borderRadius: 6, display: 'flex', alignItems: 'center',
                    justifyContent: 'center', cursor: 'pointer',
                    fontSize: 15, lineHeight: 1,
                    transition: 'all 0.2s',
                    fontFamily: 'sans-serif',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(200,245,25,0.15)';
                    e.currentTarget.style.borderColor = 'rgba(200,245,25,0.4)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                  }}
                >
                  {arrow}
                </button>
              ))}
            </div>

            {/* Timer */}
            <div>
              <div
                style={{
                  color: '#6b6b75', fontSize: 10, letterSpacing: '0.2em',
                  textTransform: 'uppercase', fontFamily: "'DM Mono', monospace",
                  marginBottom: 10, textAlign: 'right',
                }}
              >
                Termina en
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6 }}>
                <TimerDigit value={timeLeft.days} label="días" />
                {sep}
                <TimerDigit value={timeLeft.hours} label="hrs" />
                {sep}
                <TimerDigit value={timeLeft.minutes} label="min" />
                {sep}
                <TimerDigit value={timeLeft.seconds} label="seg" />
              </div>
            </div>

            {/* CTA principal */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              style={{
                background: '#c8f519', color: '#0d0d12',
                border: 'none', borderRadius: 4,
                padding: '13px 28px',
                fontSize: 11, fontWeight: 800,
                textTransform: 'uppercase', letterSpacing: '0.1em',
                cursor: 'pointer',
                fontFamily: "'DM Sans', sans-serif",
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#d9ff33'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#c8f519'; }}
            >
              Ver todas las ofertas →
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          TICKER
      ══════════════════════════════════════════ */}
      <div
        style={{
          background: '#c8f519',
          padding: '8px 0',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          style={{ display: 'inline-block' }}
        >
          {tickerRepeated.map((item, i) => (
            <span key={i} style={{ display: 'inline-block' }}>
              <span
                style={{
                  fontSize: 10, fontWeight: 800, letterSpacing: '0.18em',
                  textTransform: 'uppercase', color: '#0d0d12',
                  padding: '0 20px',
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                {item}
              </span>
              <span
                style={{
                  display: 'inline-block', width: 4, height: 4,
                  background: '#0d0d12', borderRadius: '50%',
                  verticalAlign: 'middle', margin: '0 4px',
                }}
              />
            </span>
          ))}
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════
          PRODUCTS SECTION
      ══════════════════════════════════════════ */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '28px 40px 40px' }}>

        {/* Products header */}
        <div
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: 20, paddingBottom: 16,
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#c8f519', fontSize: 14 }}>⚡</span>
            <span
              style={{
                fontSize: 13, fontWeight: 800, textTransform: 'uppercase',
                letterSpacing: '0.1em', color: '#ffffff',
                fontFamily: "'DM Mono', monospace",
              }}
            >
              {Math.min(products.length, 3)} producto{products.length !== 1 ? 's' : ''} con descuento
            </span>
          </div>

          <div
            style={{
              background: 'rgba(200,245,25,0.1)',
              border: '1px solid rgba(200,245,25,0.3)',
              color: '#c8f519',
              fontSize: 9, fontWeight: 800,
              padding: '4px 14px', borderRadius: 20,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              fontFamily: "'DM Mono', monospace",
            }}
          >
            20% off en todos
          </div>
        </div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
            gap: 18,
          }}
        >
          <AnimatePresence>
            {products.slice(0, 3).map((product, index) => (
              <FlashSaleProduct key={product.id} product={product} index={index} />
            ))}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            paddingTop: 18, borderTop: '1px solid rgba(255,255,255,0.04)',
            marginTop: 20,
          }}
        >
          <span
            style={{ color: '#2e2e35', fontSize: 11, fontFamily: "'DM Sans', sans-serif" }}
          >
            Precios válidos hasta agotar stock
          </span>
          <div
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              color: '#2e2e35', fontSize: 10,
              fontFamily: "'DM Mono', monospace",
            }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
            </svg>
            Tiempo sincronizado · Argentina
          </div>
        </div>
      </div>

      {/* Fade inferior */}
      <div
        style={{
          height: 40,
          background: 'linear-gradient(180deg, transparent, rgba(10,10,15,0.7))',
        }}
      />
    </section>
  );
};

FlashSaleTimer.propTypes = {
  targetDate: PropTypes.string.isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      discountPercentage: PropTypes.number,
      subtitle: PropTypes.string,
      images: PropTypes.arrayOf(PropTypes.string),
      stock: PropTypes.number,
    })
  ),
};

export default FlashSaleTimer;