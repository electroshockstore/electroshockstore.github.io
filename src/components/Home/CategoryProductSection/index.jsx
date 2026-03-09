import SectionHeader from './SectionHeader';
import MobileGrid from './MobileGrid';
import DesktopGrid from './DesktopGrid';
import { allCategories } from './categories';

const CategoryProductSection = ({ onCategoryClick }) => {
  const handleCategoryClick = (slug) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onCategoryClick?.(slug);
  };

  return (
    <section className="w-full px-3 pt-5 pb-3 flex flex-col gap-3">
      <SectionHeader />
      <MobileGrid categories={allCategories} onCategoryClick={handleCategoryClick} />
      <DesktopGrid categories={allCategories} onCategoryClick={handleCategoryClick} />
    </section>
  );
};

export default CategoryProductSection;
