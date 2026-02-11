import { Wrench } from 'lucide-react';
import PCBuilderCard from './PCBuilderCard';
import MotionReveal from '../Shared/MotionReveal';

const PCBuilderSection = () => {
  return (
    <MotionReveal animation="slide-right" duration={0.7}>
      <PCBuilderCard 
        badge="Elegí tus componentes"
        badgeIcon={Wrench}
        badgeColor="bg-purple-500/20 border border-purple-400/30 text-purple-300"
        title="Armá tu"
        titleHighlight="Combo ideal"
        description="Seleccioná cada pieza por tu cuenta. Nosotros te avisamos si algún componente no es compatible."
        buttonText="Empezar a elegir"
        buttonIcon={Wrench}
      />
    </MotionReveal>
  );
};

export default PCBuilderSection;