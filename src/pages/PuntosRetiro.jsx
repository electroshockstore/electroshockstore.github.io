import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
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

  // Scroll al inicio al montar la página
  useEffect(() => {
    window.scrollTo(0, 0);
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
        <motion.div 
          className="fixed inset-0 -z-10 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />

        <HeroSection />

        <motion.section 
          className="py-6 sm:py-8 md:py-12 px-4 sm:px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="max-w-7xl mx-auto">
            <ImportantRulesBentoGrid rules={IMPORTANT_RULES} />
            <PickupPointsGrid pickupPoints={PICKUP_POINTS} />
            <AdditionalInfoSection />
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
};

export default PuntosRetiro;