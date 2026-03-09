import { useNavigate } from 'react-router-dom';
import RevendedoresCard from './RevendedoresCard';
import MotionReveal from '../../Shared/MotionReveal';
import SectionBackground from './SectionBackground';
import SectionHeader from './SectionHeader';
import CTAButton from './CTAButton';
import TickerStrip from './TickerStrip';

const RevendedoresSection = ({ products = [], onProductClick }) => {
  const navigate = useNavigate();

  const featuredProducts = products.filter(p =>
    p.id === 1508 ||
    p.id === 1513 ||
    p.id === 1514
  );

  const handleVerMas = () => {
    navigate('/categoria/mayorista');
  };

  return (
    <MotionReveal
      as="section"
      animation="slide-up"
      duration={0.7}
      className="w-full flex-1 relative overflow-hidden"
    >
      <SectionBackground />

      <div className="w-full py-16 sm:py-20 md:py-28 relative z-10">
        <SectionHeader />

        {/* Product Grid - Mobile: 2 arriba verticales, 1 abajo horizontal */}
        <div className="sm:hidden mb-12 px-3">
          <div className="grid grid-cols-2 gap-3 mb-3">
            {/* Primeras 2 cards verticales */}
            {featuredProducts.slice(0, 2).map((product, index) => (
              <RevendedoresCard
                key={product.id || index}
                product={product}
                onClick={onProductClick}
                index={index}
              />
            ))}
          </div>
          {/* Tercera card horizontal */}
          {featuredProducts[2] && (
            <RevendedoresCard
              product={featuredProducts[2]}
              onClick={onProductClick}
              index={2}
              horizontal={true}
            />
          )}
        </div>

        {/* Product Grid - Desktop */}
        <div className="hidden sm:flex items-center justify-center gap-4 lg:gap-6 xl:gap-8 mb-16 sm:mb-20 px-6 lg:px-12 max-w-7xl mx-auto">
          {featuredProducts.map((product, index) => (
            <div key={product.id || index} className="flex-1 max-w-md">
              <RevendedoresCard
                product={product}
                onClick={onProductClick}
                index={index}
              />
            </div>
          ))}
        </div>

        <CTAButton onClick={handleVerMas} />
        <TickerStrip />
      </div>
    </MotionReveal>
  );
};

export default RevendedoresSection;
