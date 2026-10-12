import { useLocation } from 'react-router-dom';
import BrandLockup from '../shared/BrandLockup';
import SearchBar from '../SearchBar';
import HeaderActions from '../HeaderActions';
import CatalogNav from './CatalogNav';

const CATALOG_PREFIXES = [
  '/categoria',
  '/buscar',
  '/producto',
  '/armatupc',
  '/pc-builder',
  '/puntos-de-retiro',
];

const DesktopHeader = ({ onGoHome, onConditionsClick }) => {
  const { pathname } = useLocation();
  const isCatalog = CATALOG_PREFIXES.some((p) => pathname.startsWith(p));

  // En catálogo (desktop): shell del landing adaptado con search + acciones.
  if (isCatalog) {
    return (
      <div className="hidden sm:block">
        <CatalogNav onConditionsClick={onConditionsClick} />
      </div>
    );
  }

  return (
    <div className="hidden sm:flex items-center justify-between gap-6">
      {/* Logo oficial */}
      <BrandLockup onClick={onGoHome} size="sm" />

      {/* Barra de búsqueda */}
      <SearchBar />

      {/* Acciones del header */}
      <HeaderActions onConditionsClick={onConditionsClick} />
    </div>
  );
};

export default DesktopHeader;
