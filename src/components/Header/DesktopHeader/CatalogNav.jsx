import { useNavigate } from 'react-router-dom';
import { FileText, MapPin, Home } from 'lucide-react';
import BrandLockup from '../shared/BrandLockup';
import SearchBar from '../SearchBar';

const CHAMFER = 28; // mismo corte en diagonal que LandingNav
const BORDER_COLOR = '#9e9e9e';

/**
 * CatalogNav — header desktop del catálogo con el shell del landing
 * (fondo #e4e4e4 chanfleado, 104px, BrandLockup + divisor) pero
 * adaptado a las necesidades del catálogo: buscador + acciones
 * (Condiciones / Puntos de Retiro / Inicio) en lenguaje brutalista.
 * Las categorías siguen viviendo en CategoryFilter debajo del header.
 */
const ACTION_BTN =
  'group flex items-center gap-2 border border-[#0e0e0e] bg-[#f6f6f6] px-3 py-2 shadow-[3px_3px_0_0_#0e0e0e] transition-all duration-150 hover:-translate-y-px hover:bg-[#0e0e0e] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none';

const ACTION_LABEL =
  'landing-mono text-[11px] font-black uppercase tracking-[0.1em] text-[#0e0e0e] transition-colors group-hover:text-[#c8f519]';

const CatalogNav = ({ onConditionsClick }) => {
  const navigate = useNavigate();

  return (
    <div className="relative h-[104px]">
      {/* Fondo recortado con esquinas inferiores en diagonal */}
      <div
        className="absolute inset-0 bg-[#e4e4e4]"
        style={{
          clipPath: `polygon(0 0, 100% 0, 100% calc(100% - ${CHAMFER}px), calc(100% - ${CHAMFER}px) 100%, ${CHAMFER}px 100%, 0 calc(100% - ${CHAMFER}px))`,
        }}
        aria-hidden="true"
      />

      {/* Borde inferior horizontal */}
      <div
        className="absolute bottom-0 h-px"
        style={{ left: CHAMFER, right: CHAMFER, backgroundColor: BORDER_COLOR }}
        aria-hidden="true"
      />

      {/* Diagonales */}
      <svg
        className="pointer-events-none absolute bottom-0 left-0"
        width={CHAMFER}
        height={CHAMFER}
        viewBox={`0 0 ${CHAMFER} ${CHAMFER}`}
        aria-hidden="true"
      >
        <line x1="0" y1="0" x2={CHAMFER} y2={CHAMFER - 0.5} stroke={BORDER_COLOR} strokeWidth="1" />
      </svg>
      <svg
        className="pointer-events-none absolute bottom-0 right-0"
        width={CHAMFER}
        height={CHAMFER}
        viewBox={`0 0 ${CHAMFER} ${CHAMFER}`}
        aria-hidden="true"
      >
        <line x1={CHAMFER} y1="0" x2="0" y2={CHAMFER - 0.5} stroke={BORDER_COLOR} strokeWidth="1" />
      </svg>

      <div className="relative flex h-full items-center gap-5 px-6">
        {/* Logo */}
        <BrandLockup onClick={() => navigate('/')} className="h-full shrink-0 pr-1 hover:scale-[1.03]" />

        {/* Divisor vertical */}
        <span className="my-3 w-px shrink-0 self-stretch bg-[#9e9e9e]" aria-hidden="true" />

        {/* Buscador (tono brutalista claro) */}
        <div className="min-w-0 flex-1">
          <SearchBar tone="brutalist" />
        </div>

        {/* Acciones del catálogo */}
        <div className="flex shrink-0 items-center gap-2.5">
          <button type="button" onClick={onConditionsClick} className={ACTION_BTN}>
            <FileText className="h-4 w-4 text-[#0e0e0e] transition-colors group-hover:text-[#c8f519]" strokeWidth={2.75} />
            <span className={ACTION_LABEL}>Condiciones</span>
          </button>
          <button type="button" onClick={() => navigate('/puntos-de-retiro')} className={ACTION_BTN}>
            <MapPin className="h-4 w-4 text-[#0e0e0e] transition-colors group-hover:text-[#c8f519]" strokeWidth={2.75} />
            <span className={ACTION_LABEL}>Puntos de Retiro</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className={`${ACTION_BTN} bg-[#c8f519]`}
            aria-label="Volver al inicio"
          >
            <Home className="h-4 w-4 text-[#0e0e0e]" strokeWidth={2.75} />
            <span className="landing-mono text-[11px] font-black uppercase tracking-[0.1em] text-[#0e0e0e]">
              Inicio
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CatalogNav;
