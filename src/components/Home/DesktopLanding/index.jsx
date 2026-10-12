import { useState } from 'react';
import ConditionsModal from '../../Header/ConditionsModal';
import LandingLayout from './LandingLayout';
import ShowcaseHero from './ShowcaseHero';
import ComboEntregaSection from './ComboEntregaSection';
import FlashSaleSection from './FlashSaleSection';
import { useLandingEnabled } from './useLandingMotion';

const DesktopLanding = ({ onCategoryClick, onBuilder, flashSale }) => {
  const motionOK = useLandingEnabled();
  const [showConditions, setShowConditions] = useState(false);

  const openConditions = () => setShowConditions(true);

  return (
    <>
      <LandingLayout
        motionOK={motionOK}
        onCategoryClick={onCategoryClick}
        onBuilder={onBuilder}
        onConditionsClick={openConditions}
      >
        <ShowcaseHero motionOK={motionOK} onCategoryClick={onCategoryClick} />

        <ComboEntregaSection />

        {flashSale?.enabled && (
          <FlashSaleSection
            targetMs={flashSale.targetMs}
            products={flashSale.products}
            onNavigate={flashSale.onNavigate}
          />
        )}
      </LandingLayout>

      <ConditionsModal
        isOpen={showConditions}
        onClose={() => setShowConditions(false)}
      />
    </>
  );
};

export default DesktopLanding;
