import { memo } from 'react';

const SectionBackground = memo(() => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Animated mesh blobs - solo desktop */}
      <div className="hidden md:block absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-30 rev-bg-blob-1" />
      <div className="hidden md:block absolute -bottom-32 -right-32 w-[700px] h-[700px] rounded-full opacity-25 rev-bg-blob-2" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5 rev-bg-grid" />
      
      {/* Diagonal accent lines */}
      <div className="hidden lg:block absolute top-0 right-0 w-px h-full opacity-10 rev-bg-line-1" />
      <div className="hidden lg:block absolute top-0 left-1/3 w-px h-full opacity-5 rev-bg-line-2" />
    </div>
  );
});

SectionBackground.displayName = 'SectionBackground';
export default SectionBackground;
