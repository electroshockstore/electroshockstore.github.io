import { memo } from 'react';

const InfoBlock = memo(({ children, variant = 'default' }) => {
  const variantClasses = {
    security: 'bg-emerald-500/5 border border-emerald-500/10',
    schedule: 'bg-white/[0.03] border border-white/[0.06]'
  };

  return (
    <div className={`rounded-xl sm:rounded-2xl p-3.5 sm:p-4 ${variantClasses[variant]}`}>
      {children}
    </div>
  );
});

InfoBlock.displayName = 'InfoBlock';

export default InfoBlock;
