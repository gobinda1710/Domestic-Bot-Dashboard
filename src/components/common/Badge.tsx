import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'emerald' | 'cyan' | 'amber' | 'rose' | 'slate';
  pulse?: boolean;
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'cyan',
  pulse = false,
  size = 'md',
  icon,
  className = '',
}) => {
  let styleClasses = '';
  let dotColor = '';

  switch (variant) {
    case 'cyan':
      styleClasses = 'bg-cyan-950/80 text-cyan-300 border-cyan-500/50 glow-cyan';
      dotColor = 'bg-cyan-400';
      break;
    case 'emerald':
      styleClasses = 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50 glow-emerald';
      dotColor = 'bg-emerald-400';
      break;
    case 'amber':
      styleClasses = 'bg-amber-950/80 text-amber-300 border-amber-500/50 glow-amber';
      dotColor = 'bg-amber-400';
      break;
    case 'rose':
      styleClasses = 'bg-rose-950/80 text-rose-300 border-rose-500/50 glow-rose';
      dotColor = 'bg-rose-400';
      break;
    case 'slate':
      styleClasses = 'bg-slate-800/90 text-slate-300 border-slate-600/50';
      dotColor = 'bg-slate-400';
      break;
  }

  let sizeClasses = 'text-sm px-3.5 py-1.5 gap-2';
  if (size === 'sm') sizeClasses = 'text-xs px-2.5 py-1 gap-1.5';
  if (size === 'lg') sizeClasses = 'text-base px-4 py-2 gap-2.5';

  return (
    <div
      className={`inline-flex items-center font-mono font-semibold rounded-full border shadow-sm ${styleClasses} ${sizeClasses} ${className}`}
    >
      {pulse ? (
        <span className="relative flex h-2.5 w-2.5">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColor}`} />
          <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${dotColor}`} />
        </span>
      ) : icon ? (
        <span className="flex items-center">{icon}</span>
      ) : (
        <span className={`inline-block h-2 w-2 rounded-full ${dotColor}`} />
      )}
      <span>{children}</span>
    </div>
  );
};
