import React from 'react';
import { CustomLogoG } from './CustomLogoG';

interface BrandLogoProps {
  className?: string;
  sizeClass?: string; // e.g. "text-2xl", "text-3xl"
  tagline?: string;
  showTagline?: boolean;
  light?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  sizeClass = 'text-2xl',
  tagline,
  showTagline = false,
  light = false
}) => {
  return (
    <div className={`inline-flex flex-col text-left ${className}`}>
      <div className={`${sizeClass} font-light tracking-tighter ${light ? 'text-white' : 'text-[#1A1A1A]'} flex items-center leading-none select-none`}>
        <span>In</span>
        <CustomLogoG
          className="inline-block w-[0.88em] h-[0.88em] mx-[0.5px] -mt-[0.08em] shrink-0"
          accentColor={light ? '#FFD166' : '#F59E0B'}
        />
        <span>eorgia</span>
        <span className="font-bold italic font-serif">Tours</span>
      </div>
      {showTagline && tagline && (
        <span className={`text-[10px] tracking-widest uppercase ${light ? 'text-white/80' : 'text-[#1A1A1A]/40'} block mt-0.5`}>
          {tagline}
        </span>
      )}
    </div>
  );
};
