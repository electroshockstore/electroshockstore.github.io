import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import ManualMode from '../components/PCBuilder/ManualMode';

/**
 * PC Builder - Manual mode only
 */
const PCBuilder = () => {
  const navigate = useNavigate();
  
  // Scroll al inicio al montar la página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
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
