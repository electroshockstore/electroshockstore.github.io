import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const StructuredData = ({ data, id = 'structured-data' }) => {
  const location = useLocation();

  useEffect(() => {
    if (!data) return;

    let script = document.getElementById(id);
    
    if (!script) {
      script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    
    script.textContent = JSON.stringify(data);

    return () => {
      const existingScript = document.getElementById(id);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [data, id, location]);

  return null;
};

export default StructuredData;
