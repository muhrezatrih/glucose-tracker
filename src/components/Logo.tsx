import React from 'react';

interface LogoIconProps {
  size?: number;
}

export const LogoIcon: React.FC<LogoIconProps> = ({ size = 34 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0, display: 'block' }}
    >
      <defs>
        <linearGradient id="logoBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <filter id="logoShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#10B981" floodOpacity="0.35" />
        </filter>
      </defs>

      {/* Squircle Container */}
      <rect width="64" height="64" rx="16" fill="url(#logoBgGrad)" filter="url(#logoShadow)" />

      {/* Professional Teardrop Path */}
      <path
        d="M32 12C32 12 18 27.5 18 36.5C18 44.232 24.268 50.5 32 50.5C39.732 50.5 46 44.232 46 36.5C46 27.5 32 12 32 12Z"
        fill="white"
        fillOpacity="0.15"
        stroke="white"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* ECG Pulse Wave Overlay */}
      <path
        d="M20 37.5H26L29 31.5L32 42.5L35 34.5L38 37.5H44"
        stroke="white"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
