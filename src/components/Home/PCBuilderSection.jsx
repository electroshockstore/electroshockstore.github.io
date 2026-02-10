import { Wrench } from 'lucide-react';
import PCBuilderCard from './PCBuilderCard';
import useScrollReveal from '../../hooks/useScrollReveal';

const PCBuilderSection = () => {
  const { elementRef, className } = useScrollReveal({ 
    threshold: 0.15,
    animation: 'slide-right'
  });

  return (
   <PCBuilderCard 
  badge="Elegí tus componentes"
  badgeIcon={Wrench}
  badgeColor="bg-purple-500/20 border border-purple-400/30 text-purple-300"
  title="Armá tu"
  titleHighlight="Combo ideal"
  description="Seleccioná cada pieza por tu cuenta. Nosotros te avisamos si algún componente no es compatible."
  buttonText="Empezar a elegir"
  buttonIcon={Wrench}
  scrollRef={elementRef}
  scrollClass={className}
/>

  );
};

export default PCBuilderSection;