import ElectroShockLogo from '../shared/ElectroShockLogo';
import ActionButtons from './ActionButtons';
import CategoryButton from './CategoryButton';
import FeatureBadges from './FeatureBadges';
import useCollapseOnScroll from './useCollapseOnScroll';

const COLLAPSE_EASE = 'transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none';

/**
 * Header mobile inteligente: al bajar esconde logo/acciones y badges para
 * ganar espacio, dejando siempre visible el botón de categorías (compacto).
 * Al subir o volver arriba, se restaura.
 */
const MobileHeader = ({ onGoHome, onConditionsClick, onCategoryClick, onSearchClick }) => {
  const collapsed = useCollapseOnScroll(140);

  return (
    <div className="flex flex-col">
      {/* Primera fila: Logo + Botones (colapsable) */}
      <div
        className={`min-h-0 overflow-hidden ${COLLAPSE_EASE} ${
          collapsed
            ? 'max-h-0 -translate-y-2 opacity-0 invisible'
            : 'max-h-24 translate-y-0 opacity-100 visible'
        }`}
        aria-hidden={collapsed}
      >
        <div className="flex items-center justify-between pb-3">
          <ElectroShockLogo onClick={onGoHome} size="default" />
          <ActionButtons
            onSearchClick={onSearchClick}
            onNotificationsClick={onConditionsClick}
          />
        </div>
      </div>

      {/* Botón de Explorar Categorías (siempre visible, compacto al colapsar) */}
      <CategoryButton onClick={onCategoryClick} compact={collapsed} />

      {/* Badges de características (colapsables) */}
      <div
        className={`min-h-0 overflow-hidden ${COLLAPSE_EASE} ${
          collapsed
            ? 'max-h-0 translate-y-2 opacity-0 invisible'
            : 'max-h-16 translate-y-0 opacity-100 visible'
        }`}
        aria-hidden={collapsed}
      >
        <div className="pt-3">
          <FeatureBadges />
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;
