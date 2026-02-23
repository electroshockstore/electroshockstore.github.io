import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useFilter } from '../context/FilterContext';
import Header from '../components/Shared/Header';
import Footer from '../components/Shared/Footer';
import {
  HeroSection,
  ImportantRulesBentoGrid,
  PickupPointsGrid,
  AdditionalInfoSection,

} from '../components/PuntosRetiro';
import { PICKUP_POINTS, IMPORTANT_RULES } from '../components/PuntosRetiro/constants';

const PuntosRetiro = () => {
  const navigate = useNavigate();
  const { setSelectedCategory } = useFilter();

  // Scroll al inicio al montar la página - smooth y sin parpadeo
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Limpiar categoría seleccionada al entrar a Puntos de Retiro
  useEffect(() => {
    setSelectedCategory(null);
  }, [setSelectedCategory]);

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

        <HeroSection />

        <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto space-y-16 sm:space-y-20 md:space-y-24">
            <ImportantRulesBentoGrid rules={IMPORTANT_RULES} />
            <PickupPointsGrid pickupPoints={PICKUP_POINTS} />
            <AdditionalInfoSection />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PuntosRetiro;