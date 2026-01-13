import { useNavigate } from 'react-router-dom';
import ManualMode from '../components/PCBuilder/ManualMode';

/**
 * PC Builder - Manual mode only
 */
const PCBuilder = () => {
  const navigate = useNavigate();
  
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
