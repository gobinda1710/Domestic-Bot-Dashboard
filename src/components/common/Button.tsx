import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  size?: 'normal' | 'large' | 'kiosk-giant';
  icon?: React.ReactNode;
  highContrast?: boolean;
  reachMode?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'large',
  icon,
  highContrast,
  className = '',
  disabled,
  onClick,
  ...props
}) => {
  // Play subtle touch click audio frequency simulation
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(variant === 'danger' ? 220 : 600, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.08);
    } catch {
      // Audio fallback silent
    }
    if (onClick) onClick(e);
  };

  let baseStyle =
    'relative inline-flex items-center justify-center font-bold tracking-wider rounded-2xl transition-all duration-150 cursor-pointer active:scale-95 disabled:opacity-40 disabled:pointer-events-none focus:outline-none focus:ring-4 focus:ring-cyan-400 select-none';

  // Size sizing (Kiosk scale min touch target > 64px)
  let sizeStyle = 'min-h-[64px] px-8 text-lg py-4';
  if (size === 'normal') {
    sizeStyle = 'min-h-[56px] px-6 text-base py-3';
  } else if (size === 'kiosk-giant') {
    sizeStyle = 'min-h-[80px] px-10 text-2xl py-6';
  }

  // Variant styling
  let variantStyle = '';
  if (highContrast) {
    variantStyle = 'bg-black text-white border-4 border-cyan-400 hover:bg-cyan-900 active:bg-cyan-700';
  } else {
    switch (variant) {
      case 'primary':
        variantStyle =
          'bg-cyan-500 text-slate-950 hover:bg-cyan-400 active:bg-cyan-300 shadow-lg shadow-cyan-500/25 border border-cyan-300 glow-cyan';
        break;
      case 'secondary':
        variantStyle =
          'bg-slate-800/90 text-slate-100 hover:bg-slate-700 active:bg-slate-600 border border-slate-600/80 shadow-md';
        break;
      case 'danger':
        variantStyle =
          'bg-rose-600 text-white hover:bg-rose-500 active:bg-rose-700 shadow-lg shadow-rose-600/30 border border-rose-400 glow-rose';
        break;
      case 'outline':
        variantStyle =
          'bg-slate-900/60 text-cyan-400 border-2 border-cyan-500/60 hover:bg-cyan-500/10 active:bg-cyan-500/20';
        break;
      case 'ghost':
        variantStyle = 'bg-transparent text-slate-200 hover:bg-slate-800/60 active:bg-slate-700/60';
        break;
    }
  }

  return (
    <button
      className={`${baseStyle} ${sizeStyle} ${variantStyle} ${className}`}
      disabled={disabled}
      onClick={handleClick}
      {...props}
    >
      {icon && <span className="mr-3 text-current flex items-center justify-center">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
