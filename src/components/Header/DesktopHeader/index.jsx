import ElectroShockLogo from '../shared/ElectroShockLogo';
import SearchBar from '../SearchBar';
import HeaderActions from '../HeaderActions';

const DesktopHeader = ({ onGoHome, onConditionsClick }) => {
  return (
    <div className="hidden sm:flex items-center justify-between gap-6">
      {/* Logo mejorado con imagen */}
      <ElectroShockLogo onClick={onGoHome} size="large" />
      
      {/* Barra de búsqueda */}
      <SearchBar />
      
      {/* Acciones del header */}
      <HeaderActions onConditionsClick={onConditionsClick} />
    </div>
  );
};

export default DesktopHeader;
