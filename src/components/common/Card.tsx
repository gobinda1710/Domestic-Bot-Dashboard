import React from 'react';

interface CardProps {
  children: React.ReactNode;
  interactive?: boolean;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
  glowColor?: 'cyan' | 'emerald' | 'amber' | 'rose';
  highContrast?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  interactive = false,
  selected = false,
  onClick,
  className = '',
  glowColor = 'cyan',
  highContrast = false,
}) => {
  let borderGlow = 'border-slate-800/80 bg-slate-900/80';

  if (highContrast) {
    borderGlow = selected
      ? 'bg-black text-white border-4 border-cyan-400'
      : 'bg-black text-white border-2 border-slate-400';
  } else if (selected) {
    switch (glowColor) {
      case 'cyan':
        borderGlow = 'border-cyan-400 bg-slate-900/90 glow-cyan ring-2 ring-cyan-400/50';
        break;
      case 'emerald':
        borderGlow = 'border-emerald-400 bg-slate-900/90 glow-emerald ring-2 ring-emerald-400/50';
        break;
      case 'amber':
        borderGlow = 'border-amber-400 bg-slate-900/90 glow-amber ring-2 ring-amber-400/50';
        break;
      case 'rose':
        borderGlow = 'border-rose-400 bg-slate-900/90 glow-rose ring-2 ring-rose-400/50';
        break;
    }
  }

  const interactiveStyle = interactive
    ? 'cursor-pointer active:scale-[0.98] transition-all duration-200 hover:border-cyan-500/60 focus:outline-none focus:ring-4 focus:ring-cyan-400'
    : '';

  return (
    <div
      onClick={interactive ? onClick : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
      className={`rounded-3xl p-6 border shadow-xl backdrop-blur-md ${borderGlow} ${interactiveStyle} ${className}`}
    >
      {children}
    </div>
  );
};
