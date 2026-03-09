import { memo } from 'react';

const CornerMark = memo(({ className }) => (
  <svg viewBox="0 0 12 12" fill="none" className={`w-3 h-3 ${className}`}>
    <path d="M1 6 L1 1 L6 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
  </svg>
));

CornerMark.displayName = 'CornerMark';
export default CornerMark;
