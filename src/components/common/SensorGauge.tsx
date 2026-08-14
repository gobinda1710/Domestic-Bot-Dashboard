import React from 'react';

interface SensorGaugeProps {
  label: string;
  value: number | string;
  unit?: string;
  max?: number;
  status?: 'ONLINE' | 'CALIBRATING' | 'WARNING' | 'OFFLINE';
  icon?: React.ReactNode;
  subText?: string;
  gaugeType?: 'circular' | 'bar';
  colorHex?: string;
  className?: string;
}

export const SensorGauge: React.FC<SensorGaugeProps> = ({
  label,
  value,
  unit = '',
  max = 100,
  status = 'ONLINE',
  icon,
  subText,
  gaugeType = 'bar',
  colorHex = '#00F0FF',
  className = '',
}) => {
  const numericVal = typeof value === 'number' ? value : parseFloat(value) || 0;
  const percent = Math.min(100, Math.max(0, (numericVal / max) * 100));

  let statusBg = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
  if (status === 'CALIBRATING') statusBg = 'bg-amber-500/20 text-amber-300 border-amber-500/40';
  if (status === 'WARNING') statusBg = 'bg-rose-500/20 text-rose-300 border-rose-500/40';
  if (status === 'OFFLINE') statusBg = 'bg-slate-700/40 text-slate-400 border-slate-600/40';

  return (
    <div
      className={`kiosk-panel rounded-2xl p-4 border border-slate-800/80 flex flex-col justify-between ${className}`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2.5">
          {icon && <div className="p-2 rounded-xl bg-slate-800/80 text-cyan-400">{icon}</div>}
          <span className="font-semibold text-slate-200 text-base tracking-wide">{label}</span>
        </div>
        <span className={`text-xs px-2.5 py-1 rounded-full border font-mono font-bold ${statusBg}`}>
          {status}
        </span>
      </div>

      <div className="my-2">
        <div className="flex items-baseline gap-1.5 mb-1.5">
          <span className="text-3xl font-extrabold font-mono text-white tracking-tight">{value}</span>
          {unit && <span className="text-sm font-semibold font-mono text-cyan-400/80">{unit}</span>}
        </div>

        {gaugeType === 'bar' && (
          <div className="w-full bg-slate-950/80 rounded-full h-3 p-0.5 border border-slate-800/60 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 shadow-sm"
              style={{
                width: `${percent}%`,
                backgroundColor: colorHex,
                boxShadow: `0 0 10px ${colorHex}`,
              }}
            />
          </div>
        )}
      </div>

      {subText && <p className="text-xs text-slate-400 font-mono mt-1">{subText}</p>}
    </div>
  );
};
