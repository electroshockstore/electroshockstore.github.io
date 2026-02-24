import { usePCBuilder } from '../../../../context/PCBuilderContext';
import SidebarHeader from './SidebarHeader';
import SlotList from './SlotList';
import { SIDEBAR_STYLES } from './constants';

/**
 * CategorySidebar - Sidebar principal del PC Builder
 * Open/Closed Principle: Extensible sin modificar el código existente
 * Dependency Inversion: Depende de abstracciones (hooks, componentes)
 */
const CategorySidebar = ({ selectedCategory, onCategoryChange }) => {
  const { pcBuild, totalWattage, recommendedWattage, removeComponent } = usePCBuilder();

  // Helper: Obtener componente por buildKey
  const getComponent = (buildKey) => {
    const value = pcBuild[buildKey];
    if (buildKey === 'ram' && Array.isArray(value) && value.length > 0) return value;
    return Array.isArray(value) ? (value.length > 0 ? value[0] : null) : (value || null);
  };

  // Calcular precio total
  const totalPrice = Object.values(pcBuild).reduce((sum, value) => {
    if (Array.isArray(value)) return sum + value.reduce((s, item) => s + (item?.price || 0), 0);
    return sum + (value?.price || 0);
  }, 0);

  // Contar componentes seleccionados
  const selectedCount = Object.values(pcBuild).filter(
    v => v && (Array.isArray(v) ? v.length > 0 : true)
  ).length;

  // Calcular consumo eléctrico
  const maxWattage = pcBuild.psu?.wattage || recommendedWattage || 500;
  const percentage = Math.min((totalWattage / maxWattage) * 100, 100);
  const wattColor = percentage < 60 ? '#22C55E' : percentage < 85 ? '#F97316' : '#EF4444';

  return (
    <>
      <style>{SIDEBAR_STYLES}</style>

      <aside
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          maxHeight: '100%',
          position: 'relative',
          background: '#F8FAFC',
          borderRight: '1px solid #E2E8F0',
          fontFamily: "'Syne', sans-serif",
        }}
        className="w-full lg:min-w-[18rem] lg:max-w-[24rem] lg:w-[20vw]"
      >
        <SidebarHeader
          selectedCount={selectedCount}
          totalPrice={totalPrice}
          totalWattage={totalWattage}
          percentage={percentage}
          wattColor={wattColor}
          pcBuild={pcBuild}
          getComponent={getComponent}
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
        />

        <SlotList
          selectedCategory={selectedCategory}
          getComponent={getComponent}
          onCategoryChange={onCategoryChange}
          onRemove={removeComponent}
        />
      </aside>
    </>
  );
};

export default CategorySidebar;
