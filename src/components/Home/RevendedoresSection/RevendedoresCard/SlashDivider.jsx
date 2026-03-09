import { memo } from 'react';

const SlashDivider = memo(({ color }) => (
  <svg viewBox="0 0 40 16" fill="none" className="w-10 h-4 flex-shrink-0">
    <path d="M0 14 L26 2" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M14 14 L40 2" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
  </svg>
));

SlashDivider.displayName = 'SlashDivider';
export default SlashDivider;
