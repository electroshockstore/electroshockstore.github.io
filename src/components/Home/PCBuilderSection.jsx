import { Wrench } from 'lucide-react';
import PCBuilderCard from './PCBuilderCard';

const PCBuilderSection = () => {
  const manualModeData = {
    // Estilo y Iconos
    badge: 'Arma Tu Combo Ideal',
    badgeIcon: Wrench,
    badgeColor: 'bg-purple-500/20 border border-purple-400/30 text-purple-300',
    
    // Contenido Simplificado (Selección Manual)
    title: 'ELIGE TUS',
    titleHighlight: 'COMPONENTES',
    titleHighlightColor: 'text-purple-400',
    description: 'Selecciona cada pieza por tu cuenta. Nosotros te avisamos si algo no es compatible.',
    features: [
      'Selección manual completa',
      'Avisos de incompatibilidad (Semáforo)',
      'Revisión de rendimiento (Bottlenecks)'
    ],
    buttonText: 'Empezar a Elegir',
    buttonIcon: Wrench,
    
    // Estilo de Botón
    buttonGradient: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 hover:shadow-purple-500/50',
    delay: 0.4,
    mode: 'manual'
  };

  return (
    <PCBuilderCard {...manualModeData} />
  );
};

export default PCBuilderSection;