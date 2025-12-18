import { Sparkles, Wrench, Cpu } from 'lucide-react';
import PCBuilderCard from './PCBuilderCard';

const PCBuilderSection = () => {
  const assistedModeData = {
    // Estilo y Iconos
    badge: 'Fácil y Rápido',
    badgeIcon: Sparkles,
    badgeColor: 'bg-blue-500/20 border border-blue-400/30 text-blue-300',
    
    // Contenido Simplificado (Tour Guiado)
    title: 'TE AYUDAMOS A',
    titleHighlight: 'ARMAR TU SETUP',
    titleHighlightColor: 'text-blue-400',
    description: 'Responde unas preguntas y te guiaremos paso a paso según tu presupuesto y uso.',
    features: [
      'Te hacemos preguntas clave',
      'Recomendaciones automáticas',
      'Compatibilidad garantizada'
    ],
    buttonText: 'Empezar',
    buttonIcon: Cpu,
    
    // Estilo de Botón
    buttonGradient: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 hover:shadow-blue-500/50',
    delay: 0.2,
    mode: 'assisted'
  };

  const manualModeData = {
    // Estilo y Iconos
    badge: 'Tú Tienes el Control',
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
    <>
      <PCBuilderCard {...assistedModeData} />
      <PCBuilderCard {...manualModeData} />
    </>
  );
};

export default PCBuilderSection;