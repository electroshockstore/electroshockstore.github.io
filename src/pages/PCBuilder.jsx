import { useNavigate } from 'react-router-dom';
import { useScrollToTop } from '../hooks/useScrollToTop';
import ManualMode from '../components/PCBuilder/ManualMode';

const PCBuilder = () => {
  const navigate = useNavigate();
  

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
