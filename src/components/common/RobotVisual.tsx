import React from 'react';

interface RobotVisualProps {
  mode?: 'idle' | 'working' | 'complete' | 'stopped';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const RobotVisual: React.FC<RobotVisualProps> = ({
  mode = 'idle',
  size = 'lg',
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-24 h-24',
    md: 'w-36 h-36',
    lg: 'w-52 h-52',
    xl: 'w-72 h-72',
  };

  const getFaceExpression = () => {
    switch (mode) {
      case 'working':
        return (
          <g>
            {/* Focused / Scanning Eyes */}
            <circle cx="78" cy="85" r="9" fill="#4F8CFF" className="animate-pulse" />
            <circle cx="122" cy="85" r="9" fill="#4F8CFF" className="animate-pulse" />
            <circle cx="80" cy="83" r="3" fill="#FFFFFF" />
            <circle cx="124" cy="83" r="3" fill="#FFFFFF" />
            {/* Concentrated Smile */}
            <path d="M 85 110 Q 100 118 115 110" stroke="#4F8CFF" strokeWidth="4" strokeLinecap="round" fill="none" />
            {/* Scanning radar beam */}
            <line x1="60" y1="85" x2="140" y2="85" stroke="#4F8CFF" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
          </g>
        );
      case 'complete':
        return (
          <g>
            {/* Happy Star / Crescent Eyes */}
            <path d="M 70 88 Q 80 75 90 88" stroke="#22C55E" strokeWidth="5" strokeLinecap="round" fill="none" />
            <path d="M 110 88 Q 120 75 130 88" stroke="#22C55E" strokeWidth="5" strokeLinecap="round" fill="none" />
            {/* Big Cheerful Smile */}
            <path d="M 80 106 Q 100 126 120 106" stroke="#22C55E" strokeWidth="4" strokeLinecap="round" fill="#22C55E" fillOpacity="0.2" />
            {/* Rosy Cheeks */}
            <circle cx="68" cy="100" r="5" fill="#22C55E" opacity="0.4" />
            <circle cx="132" cy="100" r="5" fill="#22C55E" opacity="0.4" />
          </g>
        );
      case 'stopped':
        return (
          <g>
            {/* Sleepy / Deactivated Eyes */}
            <line x1="70" y1="88" x2="88" y2="88" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />
            <line x1="112" y1="88" x2="130" y2="88" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />
            {/* Neutral Mouth */}
            <line x1="90" y1="112" x2="110" y2="112" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
          </g>
        );
      case 'idle':
      default:
        return (
          <g>
            {/* Friendly Round Eyes */}
            <circle cx="78" cy="85" r="9" fill="#4F8CFF" />
            <circle cx="122" cy="85" r="9" fill="#4F8CFF" />
            <circle cx="81" cy="82" r="3" fill="#FFFFFF" />
            <circle cx="125" cy="82" r="3" fill="#FFFFFF" />
            {/* Friendly Warm Smile */}
            <path d="M 82 108 Q 100 122 118 108" stroke="#4F8CFF" strokeWidth="4" strokeLinecap="round" fill="none" />
            {/* Gentle Cheeks */}
            <circle cx="68" cy="98" r="4" fill="#7C5CFF" opacity="0.3" />
            <circle cx="132" cy="98" r="4" fill="#7C5CFF" opacity="0.3" />
          </g>
        );
    }
  };

  const getAuraColor = () => {
    switch (mode) {
      case 'working':
        return '#4F8CFF';
      case 'complete':
        return '#22C55E';
      case 'stopped':
        return '#EF4444';
      case 'idle':
      default:
        return '#7C5CFF';
    }
  };

  return (
    <div className={`relative flex items-center justify-center ${sizeMap[size]} ${className}`}>
      {/* Outer Glow Halo */}
      <div
        className="absolute inset-0 rounded-full blur-xl opacity-30 transition-all duration-500"
        style={{ backgroundColor: getAuraColor() }}
      />

      <svg
        viewBox="0 0 200 200"
        className="w-full h-full relative z-10 drop-shadow-lg transition-transform duration-300"
      >
        {/* Antennas / Sensor Node */}
        <line x1="100" y1="28" x2="100" y2="46" stroke="#4F8CFF" strokeWidth="4" strokeLinecap="round" />
        <circle
          cx="100"
          cy="24"
          r="8"
          fill={getAuraColor()}
          className={mode === 'working' ? 'animate-ping' : ''}
          opacity="0.8"
        />
        <circle cx="100" cy="24" r="6" fill={getAuraColor()} />

        {/* Robot Head Frame */}
        <rect
          x="44"
          y="46"
          width="112"
          height="92"
          rx="32"
          fill="#151D32"
          stroke={getAuraColor()}
          strokeWidth="3.5"
        />

        {/* Visor Screen Background */}
        <rect
          x="54"
          y="56"
          width="92"
          height="72"
          rx="22"
          fill="#0B1020"
          stroke="#222D48"
          strokeWidth="2"
        />

        {/* Dynamic Expression */}
        {getFaceExpression()}

        {/* Side Ear Speaker Nodes */}
        <rect x="36" y="78" width="8" height="28" rx="4" fill="#222D48" stroke={getAuraColor()} strokeWidth="2" />
        <rect x="156" y="78" width="8" height="28" rx="4" fill="#222D48" stroke={getAuraColor()} strokeWidth="2" />

        {/* Neck Connection */}
        <rect x="88" y="138" width="24" height="12" rx="4" fill="#222D48" />

        {/* Body Shoulders */}
        <path
          d="M 52 150 Q 100 144 148 150 L 164 190 Q 100 182 36 190 Z"
          fill="#151D32"
          stroke={getAuraColor()}
          strokeWidth="3"
        />

        {/* Chest Core Indicator Light */}
        <circle cx="100" cy="168" r="7" fill={getAuraColor()} opacity="0.9" />
        <circle cx="100" cy="168" r="12" stroke={getAuraColor()} strokeWidth="1.5" fill="none" opacity="0.5" />
      </svg>
    </div>
  );
};
