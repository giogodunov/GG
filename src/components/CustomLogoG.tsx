import React from 'react';

interface CustomLogoGProps {
  className?: string;
  color?: string; // Main G color, defaults to currentColor
  accentColor?: string; // Golden amber square color matching IGTIGT.png
  size?: number | string;
}

export const CustomLogoG: React.FC<CustomLogoGProps> = ({
  className = 'inline-block h-[1em] w-[1em] align-middle',
  color = 'currentColor',
  accentColor = '#F59E0B',
  size
}) => {
  return (
    <svg
      viewBox="4 9.5 89 85"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      aria-label="G"
      role="img"
    >
      {/* Left C-Arc Segment */}
      <path
        d="M 46 10.2
           A 42 42 0 0 0 46 93.8
           L 46 73.6
           A 22 22 0 0 1 46 30.4
           Z"
        fill={color}
      />

      {/* Right Bottom Arc & G Horizontal Crossbar */}
      <path
        d="M 54 93.8
           A 42 42 0 0 0 92 52
           L 92 38
           L 54 38
           L 54 55
           L 70 55
           A 22 22 0 0 1 54 73.6
           Z"
        fill={color}
      />

      {/* Top-Right Golden/Yellow Square Accent matching IGTIGT.png */}
      <rect
        x="54"
        y="10.2"
        width="24"
        height="22"
        rx="1.5"
        fill={accentColor}
      />
    </svg>
  );
};
