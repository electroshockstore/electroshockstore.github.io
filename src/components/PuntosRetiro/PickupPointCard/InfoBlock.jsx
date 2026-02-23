import { memo } from 'react';

const InfoBlock = memo(({ children, variant = 'default' }) => {
  const styles = {
    security: {
      background: 'rgba(52,211,153,0.05)',
      border: '1px solid rgba(52,211,153,0.1)'
    },
    schedule: {
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.06)'
    }
  };

  return (
    <div 
      className="rounded-xl sm:rounded-2xl p-3.5 sm:p-4"
      style={styles[variant]}
    >
      {children}
    </div>
  );
});

InfoBlock.displayName = 'InfoBlock';

export default InfoBlock;
