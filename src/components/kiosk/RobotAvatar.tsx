import React from 'react';

interface RobotAvatarProps {
  mode?: 'idle' | 'scanning' | 'executing' | 'success' | 'paused';
  size?: 'sm' | 'md' | 'lg' | 'giant';
  showGlow?: boolean;
  className?: string;
}

export const RobotAvatar: React.FC<RobotAvatarProps> = ({
  mode = 'idle',
  size = 'lg',
  showGlow = true,
  className = '',
}) => {
  let scaleStyle = 'w-64 h-64';
  if (size === 'sm') scaleStyle = 'w-32 h-32';
  if (size === 'md') scaleStyle = 'w-48 h-48';
  if (size === 'giant') scaleStyle = 'w-96 h-96 sm:w-[480px] sm:h-[480px]';

  let eyeColor = '#00F0FF';
  let coreGlow = 'rgba(0, 240, 255, 0.4)';
  let expressionText = 'AURA READY';

  if (mode === 'scanning') {
    eyeColor = '#00F0FF';
    coreGlow = 'rgba(0, 240, 255, 0.7)';
    expressionText = 'SCANNING ENVIRONMENT';
  } else if (mode === 'executing') {
    eyeColor = '#10B981';
    coreGlow = 'rgba(16, 185, 129, 0.7)';
    expressionText = 'EXECUTING TASK';
  } else if (mode === 'success') {
    eyeColor = '#10B981';
    coreGlow = 'rgba(16, 185, 129, 0.9)';
    expressionText = 'MISSION ACCOMPLISHED';
  } else if (mode === 'paused') {
    eyeColor = '#F59E0B';
    coreGlow = 'rgba(245, 158, 11, 0.7)';
    expressionText = 'SYSTEM PAUSED';
  }

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      {/* Outer Breathing Halo Ring */}
      <div
        className={`relative flex items-center justify-center rounded-full transition-all duration-700 ${scaleStyle} ${
          showGlow ? 'animate-breathing' : ''
        }`}
      >
        <svg
          viewBox="0 0 300 300"
          className="w-full h-full drop-shadow-[0_0_25px_rgba(0,240,255,0.4)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background Tech Rings */}
          <circle cx="150" cy="150" r="140" stroke={eyeColor} strokeWidth="2" strokeDasharray="8 8" opacity="0.4" />
          <circle cx="150" cy="150" r="125" stroke={eyeColor} strokeWidth="1.5" opacity="0.2" />

          {/* Rotating Sensor Arc */}
          <circle
            cx="150"
            cy="150"
            r="132"
            stroke={eyeColor}
            strokeWidth="3"
            strokeDasharray="40 180"
            className="animate-spin"
            style={{ animationDuration: mode === 'scanning' ? '2s' : '8s', transformOrigin: 'center' }}
          />

          {/* Torso & Shoulder Frame */}
          <path
            d="M 70 230 C 70 190, 230 190, 230 230 L 210 270 L 90 270 Z"
            fill="#111827"
            stroke="#1F2937"
            strokeWidth="4"
          />
          <path d="M 110 215 L 190 215" stroke={eyeColor} strokeWidth="3" opacity="0.6" />

          {/* Core Power Crystal */}
          <polygon
            points="150,220 165,240 150,260 135,240"
            fill={eyeColor}
            className={mode === 'executing' ? 'animate-pulse' : ''}
            style={{ filter: `drop-shadow(0 0 12px ${coreGlow})` }}
          />

          {/* Neck Joints */}
          <rect x="135" y="165" width="30" height="25" rx="6" fill="#1E293B" stroke="#334155" strokeWidth="2" />

          {/* Robot Head Outer Shell */}
          <rect
            x="85"
            y="65"
            width="130"
            height="105"
            rx="32"
            fill="#0F172A"
            stroke={eyeColor}
            strokeWidth="3.5"
            style={{ filter: `drop-shadow(0 0 20px ${coreGlow})` }}
          />

          {/* Glass Face Visor */}
          <rect x="95" y="75" width="110" height="85" rx="24" fill="#0B0F19" stroke="#1E293B" strokeWidth="2" />

          {/* Expressions: Eyes */}
          {mode === 'success' ? (
            /* Happy Happy Arc Eyes */
            <g stroke={eyeColor} strokeWidth="6" strokeLinecap="round" fill="none">
              <path d="M 115 115 Q 125 100 135 115" />
              <path d="M 165 115 Q 175 100 185 115" />
            </g>
          ) : mode === 'paused' ? (
            /* Square Alert Eyes */
            <g fill={eyeColor}>
              <rect x="115" y="110" width="20" height="12" rx="3" />
              <rect x="165" y="110" width="20" height="12" rx="3" />
            </g>
          ) : (
            /* Glowing Cyan Expressive Ovals */
            <g fill={eyeColor} style={{ filter: `drop-shadow(0 0 8px ${eyeColor})` }}>
              <ellipse cx="125" cy="115" rx="12" ry="18" className={mode === 'scanning' ? 'animate-pulse' : ''} />
              <ellipse cx="175" cy="115" rx="12" ry="18" className={mode === 'scanning' ? 'animate-pulse' : ''} />
              <circle cx="128" cy="110" r="4" fill="#FFFFFF" />
              <circle cx="178" cy="110" r="4" fill="#FFFFFF" />
            </g>
          )}

          {/* Mouth / Audio LED Wave Strip */}
          <g fill={eyeColor} opacity="0.8">
            <rect x="130" y="142" width="4" height="6" rx="2" />
            <rect x="138" y="140" width="4" height="10" rx="2" />
            <rect x="146" y="138" width="8" height="14" rx="2" />
            <rect x="158" y="140" width="4" height="10" rx="2" />
            <rect x="166" y="142" width="4" height="6" rx="2" />
          </g>

          {/* Antenna / LiDAR Top Dome */}
          <path d="M 150 65 L 150 42" stroke={eyeColor} strokeWidth="3" />
          <circle
            cx="150"
            cy="38"
            r="8"
            fill={eyeColor}
            className="animate-ping"
            style={{ animationDuration: '3s' }}
          />
        </svg>
      </div>

      {/* Mode Sub-Badge */}
      <div className="mt-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-700 text-xs font-mono font-bold tracking-widest text-cyan-300 shadow-md">
        STATUS: {expressionText}
      </div>
    </div>
  );
};
