import { useState } from 'react';
import useIOSDetection from '../../hooks/useIOSDetection';

// Animated 3D Question Mark (solo desktop)
const QuestionMarkIcon = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setMousePos({ x, y });
  };

  const rotateY = mousePos.x * 20;
  const rotateX = -mousePos.y * 15;

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setMousePos({ x: 0, y: 0 }); }}
      className="hero-icon-3d"
      style={{
        transform: `perspective(800px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(${isHovered ? 1.08 : 1})`,
      }}
    >
      {/* Orbit rings */}
      <div className="hero-icon-orbit hero-icon-orbit-1" />
      <div className="hero-icon-orbit hero-icon-orbit-2" />

      <svg
        viewBox="0 0 200 240"
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 12px 40px rgba(59,130,246,0.7)) drop-shadow(0 0 60px rgba(139,92,246,0.4))' }}
      >
        <defs>
          <linearGradient id="qGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="40%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id="qGradSide" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
        </defs>
        
        {/* 3D depth layers */}
        <ellipse cx="102" cy="208" rx="17" ry="15" fill="url(#qGradSide)" />
        <path
          d="M 68 74 Q 64 42 100 30 Q 148 16 152 54 Q 158 84 132 98 Q 118 108 112 122 L 108 148"
          fill="none"
          stroke="#1e3a8a"
          strokeWidth="30"
          strokeLinecap="round"
          transform="translate(4, 5)"
        />
        
        {/* Main question mark */}
        <path
          d="M 68 74 Q 64 42 100 30 Q 148 16 152 54 Q 158 84 132 98 Q 118 108 112 122 L 108 148"
          fill="none"
          stroke="url(#qGrad)"
          strokeWidth="30"
          strokeLinecap="round"
        />
        
        {/* Highlight */}
        <path
          d="M 72 72 Q 70 48 100 36 Q 140 24 146 54"
          fill="none"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        
        {/* Dot */}
        <ellipse cx="100" cy="196" rx="17" ry="16" fill="url(#qGrad)" />
        <ellipse cx="95" cy="190" rx="7" ry="5" fill="rgba(255,255,255,0.4)" />
        
        {/* Specular highlight */}
        <circle cx="88" cy="56" r="6" fill="rgba(255,255,255,0.5)" />
      </svg>

      {/* Floating particles */}
      <div className="hero-icon-particle hero-icon-particle-1" />
      <div className="hero-icon-particle hero-icon-particle-2" />
      <div className="hero-icon-particle hero-icon-particle-3" />
      <div className="hero-icon-particle hero-icon-particle-4" />
    </div>
  );
};

const HeroSection = () => {
  const isIOS = useIOSDetection();

  return (
    <section className="hero-section">
      {/* Background */}
      <div className="hero-bg" />
      
      {/* Grid pattern */}
      <div className="hero-grid" />

      {/* Gradient blobs */}
      <div className="hero-blob hero-blob-blue" />
      <div className="hero-blob hero-blob-purple" />

      {/* Top accent line */}
      <div className="hero-accent-line" />

      <div className="hero-container">
        <div className="hero-content">
          
          {/* Text Content */}
          <div className="hero-text">
            
            {/* Badge - Desktop */}
            <div className="hero-badge-wrapper hero-badge-desktop">
              <span className="hero-badge">
                📍 Puntos de retiro disponibles
              </span>
              <span className="hero-badge-dot" />
            </div>

            {/* Badge - Mobile */}
            <div className="hero-badge-wrapper hero-badge-mobile">
              <span className="hero-badge">
                🚫 NO TENEMOS LOCAL FISICO
              </span>
            </div>

            {/* Title Desktop - 2 líneas brutalist */}
            <h1 className="hero-title-brutalist hero-title-desktop">
              {/* Línea 1: ¿DÓNDE RETIRO */}
              <div className="hero-title-line-1">
                <span className="hero-title-highlight-wrapper">
                  <span className="hero-marker hero-marker-1" />
                  <span className="hero-marker hero-marker-2" />
                  <span className="hero-marker hero-marker-3" />
                  <span className="hero-marker-corner hero-marker-corner-tl" />
                  <span className="hero-marker-corner hero-marker-corner-br" />
                  <span className="hero-marker-text">DÓNDE RETIRO</span>
                  {!isIOS && <span className="hero-marker-glow" />}
                </span>
              </div>

              {/* Línea 2: LOS PRODUCTOS? */}
              <div className="hero-title-line-2">
                <span className="hero-title-productos">LOS PRODUCTOS</span>
              </div>
            </h1>

            {/* Title Mobile - Brutalist con SVG interactivo */}
            <div className="hero-title-mobile">
              <h1 className="hero-title-mobile-text">
                {/* Línea 1: DÓNDE RETIRO con efecto brutalist */}
                <span className="hero-title-mobile-line">
                  <span className="hero-title-mobile-highlight">
                    <span className="hero-marker-mobile hero-marker-mobile-1" />
                    <span className="hero-marker-mobile hero-marker-mobile-2" />
                    <span className="hero-marker-mobile hero-marker-mobile-3" />
                    <span className="hero-marker-text-mobile">DÓNDE RETIRO</span>
                  </span>
                </span>
                
                {/* Línea 2: los productos + SVG interactivo después */}
                <span className="hero-title-mobile-line hero-title-mobile-line-with-svg">
                  <span className="hero-title-mobile-productos">los productos</span>
                  
                  {/* SVG interactivo después del texto */}
                  <svg
                    viewBox="0 0 200 240"
                    className="hero-question-svg-mobile"
                  >
                    <defs>
                      <linearGradient id="qGradMobileSmall" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#60a5fa" />
                        <stop offset="100%" stopColor="#1d4ed8" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 68 74 Q 64 42 100 30 Q 148 16 152 54 Q 158 84 132 98 Q 118 108 112 122 L 108 148"
                      fill="none"
                      stroke="url(#qGradMobileSmall)"
                      strokeWidth="30"
                      strokeLinecap="round"
                    />
                    <ellipse cx="100" cy="196" rx="17" ry="16" fill="url(#qGradMobileSmall)" />
                  </svg>
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="hero-description">
              Elegí el punto más cercano y coordiná el retiro{' '}
              <span className="hero-description-highlight">seguro</span>
            </p>

            {/* CTA + Stats - Solo Desktop */}
            <div className="hero-cta-wrapper hero-cta-desktop">
              <button className="hero-cta-button">
                <span className="hero-cta-text">VER PUNTOS DE RETIRO →</span>
              </button>

              <div className="hero-stats">
                <div className="hero-stat">
                  <div className="hero-stat-value">3</div>
                  <div className="hero-stat-label">PUNTOS</div>
                </div>
                <div className="hero-stat">
                  <div className="hero-stat-value">COORDINAR</div>
                  <div className="hero-stat-label">HORARIOS</div>
                </div>
              </div>
            </div>
          </div>

          {/* 3D Icon - Solo Desktop */}
          <div className="hero-icon-wrapper hero-icon-desktop">
            <div className="hero-icon-bg hero-icon-bg-1" />
            <div className="hero-icon-bg hero-icon-bg-2" />
            
            <div className="hero-icon">
              {!isIOS ? (
                <QuestionMarkIcon />
              ) : (
                <svg
                  viewBox="0 0 200 240"
                  className="w-full h-full"
                  style={{ filter: 'drop-shadow(0 8px 16px rgba(59,130,246,0.5))' }}
                >
                  <defs>
                    <linearGradient id="qGradDesktop" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#60a5fa" />
                      <stop offset="100%" stopColor="#1d4ed8" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 68 74 Q 64 42 100 30 Q 148 16 152 54 Q 158 84 132 98 Q 118 108 112 122 L 108 148"
                    fill="none"
                    stroke="url(#qGradDesktop)"
                    strokeWidth="30"
                    strokeLinecap="round"
                  />
                  <ellipse cx="100" cy="196" rx="17" ry="16" fill="url(#qGradDesktop)" />
                </svg>
              )}
            </div>

            <div className="hero-icon-label">
              RETIROS PERSONALES
            </div>
          </div>
        </div>

        {/* Feature pills - Solo Desktop */}
        <div className="hero-features hero-features-desktop">
          {[
            { icon: '🔒', text: 'PUNTOS SEGUROS' },
            { icon: '📍', text: 'SIN ADELANTOS NI SEÑAS' },
            { icon: '⚡', text: 'RETIROS EN EL DIA' },
            { icon: '✅', text: 'CONFIRMACIÓN INSTANTÁNEA' },
          ].map((pill, i) => (
            <span key={i} className="hero-feature-pill">
              <span>{pill.icon}</span>
              <span>{pill.text}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
