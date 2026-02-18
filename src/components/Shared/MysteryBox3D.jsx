import './MysteryBox3D.css';

const MysteryBox3D = ({ 
  title = "Caja Misteriosa",
  subtitle = "Pack Gamer Sorpresa",
  price = "$XX.XXX",
  glowColor = "cyan" // cyan, purple, orange, green
}) => {
  return (
    <div className="mystery-box-container">
      {/* Título y precio */}
      <div className="mystery-box-header">
        <h3 className="mystery-box-title">{title}</h3>
        <p className="mystery-box-subtitle">{subtitle}</p>
        <div className="mystery-box-price">{price}</div>
      </div>

      {/* Escena 3D */}
      <div className="scene-3d">
        {/* Cubo 3D */}
        <div className={`cube-3d cube-glow-${glowColor}`}>
          <div className="cube-face cube-front">?</div>
          <div className="cube-face cube-back">?</div>
          <div className="cube-face cube-right">?</div>
          <div className="cube-face cube-left">?</div>
          <div className="cube-face cube-top">?</div>
          <div className="cube-face cube-bottom">?</div>
        </div>

        {/* Plano de suelo con rejilla */}
        <div className="floor-grid">
          <div className={`floor-glow floor-glow-${glowColor}`}></div>
        </div>
      </div>

      {/* Botón de acción */}
      <button className={`mystery-box-button button-glow-${glowColor}`}>
        <span>Descubrir Contenido</span>
        <svg className="button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </button>
    </div>
  );
};

export default MysteryBox3D;
