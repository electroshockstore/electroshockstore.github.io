import { useNavigate } from 'react-router-dom';
import { useScrollToTop } from '../hooks/useScrollToTop';
import ManualMode from '../components/PCBuilder/ManualMode';

/**
 * PC Builder - Manual mode only
 */
const PCBuilder = () => {
  const navigate = useNavigate();
  
  // Scroll al inicio al montar la página
  useScrollToTop();
  
  const handleGoHome = () => {
    navigate('/');
  };
  
  return (
    <ManualMode 
      onGoHome={handleGoHome}
    />
  );
};

export default PCBuilder;
