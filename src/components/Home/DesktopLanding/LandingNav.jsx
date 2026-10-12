import { useNavigate } from 'react-router-dom';
import BrandLockup from '../../Header/shared/BrandLockup';
import CategoryFilter from '../../Catalog/CategoryFilter';

const CHAMFER = 28; // tamaño del corte en diagonal (px)
const BORDER_COLOR = '#9e9e9e';

const LandingNav = ({ onCategoryChange }) => {
  const navigate = useNavigate();

  return (
    <header className="landing-root sticky top-0 z-50">
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
          style={{
            left: CHAMFER,
            right: CHAMFER,
            backgroundColor: BORDER_COLOR,
          }}
          aria-hidden="true"
        />

        {/* Diagonal izquierda */}
        <svg
          className="pointer-events-none absolute bottom-0 left-0"
          width={CHAMFER}
          height={CHAMFER}
          viewBox={`0 0 ${CHAMFER} ${CHAMFER}`}
          aria-hidden="true"
        >
          <line
            x1="0"
            y1="0"
            x2={CHAMFER}
            y2={CHAMFER - 0.5}
            stroke={BORDER_COLOR}
            strokeWidth="1"
          />
        </svg>

        {/* Diagonal derecha */}
        <svg
          className="pointer-events-none absolute bottom-0 right-0"
          width={CHAMFER}
          height={CHAMFER}
          viewBox={`0 0 ${CHAMFER} ${CHAMFER}`}
          aria-hidden="true"
        >
          <line
            x1={CHAMFER}
            y1="0"
            x2="0"
            y2={CHAMFER - 0.5}
            stroke={BORDER_COLOR}
            strokeWidth="1"
          />
        </svg>

        <div className="relative flex h-full items-center">
          {/* Logo Brand: ELECTRO SHOCK + ⚡ FUSIONADOS */}
          <BrandLockup onClick={() => navigate('/')} className="h-full pl-6 pr-2 hover:scale-[1.03]" />

          {/* Divisor vertical */}
          <span
            className="w-px shrink-0 self-stretch my-3 bg-[#9e9e9e]"
            aria-hidden="true"
          />

          {/* Barra de categorías */}
          <div className="flex min-w-0 flex-1 px-6">
            <div className="w-full">
              <CategoryFilter
                selectedCategory={null}
                onCategoryChange={onCategoryChange}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default LandingNav;