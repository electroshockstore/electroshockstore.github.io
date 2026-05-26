import ElectroShockLogo from '../shared/ElectroShockLogo';
import ActionButtons from './ActionButtons';
import CategoryButton from './CategoryButton';
import FeatureBadges from './FeatureBadges';

const MobileHeader = ({ onGoHome, onConditionsClick, onCategoryClick, onSearchClick }) => {
  return (
    <div className="flex flex-col gap-4">
      {/* Primera fila: Logo + Botones */}
      <div className="flex items-center justify-between">
        <ElectroShockLogo onClick={onGoHome} size="default" />
        <ActionButtons 
          onSearchClick={onSearchClick}
          onNotificationsClick={onConditionsClick}
        />
      </div>

      {/* Botón de Explorar Categorías */}
      <CategoryButton onClick={onCategoryClick} />

      {/* Badges de características */}
      <FeatureBadges />
    </div>
  );
};

export default MobileHeader;
