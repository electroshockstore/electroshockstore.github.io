
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import {
  Asterisk,
  FileText,
  Grid3X3,
  MapPin,
  Wrench,
} from 'lucide-react';

import { getAppScroller } from '../../../context/ScrollContext';

const RAIL = [
  { label: 'Catálogo', icon: Grid3X3, category: 'Procesadores' },
  { label: 'Armá tu PC', icon: Wrench, builder: true },
  { label: 'Puntos de Retiro', icon: MapPin, route: '/puntos-de-retiro' },
  { label: 'Condiciones', icon: FileText, conditions: true },
];

const cellBase =
  'flex h-[64px] w-[64px] shrink-0 items-center justify-center bg-[#f6f6f6] text-[#0e0e0e] transition-colors duration-150 hover:bg-[#0e0e0e] hover:text-[#c8f519]';

/**
 * SideRails — barras laterales fijas del landing.
 *
 * Conserva el CTA de catálogo a la izquierda y los cuatro
 * CTA de navegación a la derecha, sin el botón de volver arriba.
 */
const SideRails = ({
  motionOK = true,
  onCategoryClick,
  onBuilder,
  onConditionsClick,
}) => {
  const navigate = useNavigate();

  return (
    <>
      {/* Barra lateral izquierda: Catálogo */}
      <aside
        className="absolute inset-y-0 left-0 z-20 w-[72px] border-r border-[#9e9e9e]"
        aria-label="Barra lateral izquierda"
      >
        <div className="sticky top-[122px] mt-[30px] flex justify-end">
          <button
            type="button"
            onClick={() => onCategoryClick?.('Procesadores')}
            className={`${cellBase} -mr-px border border-[#9e9e9e]`}
            aria-label="Ver catálogo"
            title="Ver catálogo"
          >
            <Asterisk
              className="h-[27px] w-[27px]"
              strokeWidth={2.25}
            />
          </button>
        </div>
      </aside>

      {/* Barra lateral derecha: navegación */}
      <aside
        className="absolute inset-y-0 right-0 z-20 w-[72px] border-l border-[#9e9e9e]"
        aria-label="Barra lateral derecha"
      >
        <div className="sticky top-[122px] mt-[30px] flex flex-col items-start">
          <div className="-ml-px flex w-[64px] flex-col border border-[#9e9e9e] bg-[#f6f6f6]">
            {RAIL.map(
              ({ label, icon: Icon, category, builder, route, conditions }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => {
                    if (builder) {
                      onBuilder?.();
                    } else if (route) {
                      navigate(route);
                    } else if (conditions) {
                      onConditionsClick?.();
                    } else {
                      onCategoryClick?.(category);
                    }
                  }}
                  className="flex h-[64px] w-full items-center justify-center border-b border-[#9e9e9e] last:border-b-0 text-[#0e0e0e] transition-colors duration-150 hover:bg-[#0e0e0e] hover:text-[#c8f519] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c8f519]"
                  aria-label={label}
                  title={label}
                >
                  <Icon
                    className="h-[27px] w-[27px]"
                    strokeWidth={2.25}
                  />
                </button>
              ),
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

SideRails.propTypes = {
  motionOK: PropTypes.bool,
  onCategoryClick: PropTypes.func,
  onBuilder: PropTypes.func,
  onConditionsClick: PropTypes.func,
};

export default SideRails;

