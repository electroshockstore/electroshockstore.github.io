import { useNavigate } from 'react-router-dom';
import Header from '../components/Shared/Header';
import Footer from '../components/Shared/Footer';
import FloatingChatButton from '../components/Shared/FloatingChatButton';
import {
  HeroSection,
  ImportantRulesSection,
  PickupPointsGrid,
  AdditionalInfoSection,
  PaymentMethodsSection
} from '../components/PuntosRetiro';
import { PICKUP_POINTS, IMPORTANT_RULES } from '../components/PuntosRetiro/constants';

const PuntosRetiro = () => {
  const navigate = useNavigate();

  const handleGoHome = () => navigate('/');

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f]">
      <Header 
        searchQuery=""
        onSearchChange={() => {}}
        onGoHome={handleGoHome}
      />

      <main className="relative overflow-hidden">
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />

        <HeroSection onBack={handleGoHome} />

        <section className="py-6 sm:py-8 md:py-12 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <ImportantRulesSection rules={IMPORTANT_RULES} />
            <PaymentMethodsSection />
            <PickupPointsGrid pickupPoints={PICKUP_POINTS} />
            <AdditionalInfoSection />
          </div>
        </section>
      </main>

      <Footer />
      <FloatingChatButton />
    </div>
  );
};

export default PuntosRetiro;