import React from 'react';
import { TaskStep } from '../../types';
import { CheckCircle2, CircleDot, Clock } from 'lucide-react';

interface ProgressIndicatorProps {
  steps: TaskStep[];
  currentStepIndex: number;
  className?: string;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  steps,
  currentStepIndex,
  className = '',
}) => {
  return (
    <div className={`w-full bg-slate-900/90 rounded-2xl p-4 border border-cyan-500/30 ${className}`}>
      <div className="flex items-center justify-between mb-3 px-1">
        <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
          AI Mission Trajectory Sequence
        </span>
        <span className="text-xs font-mono text-slate-400">
          Step {Math.min(currentStepIndex + 1, steps.length)} of {steps.length}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
        {steps.map((step, idx) => {
          const isDone = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;

          let cardBg = 'bg-slate-950/60 border-slate-800 text-slate-500';
          let icon = <Clock className="w-4 h-4 text-slate-600" />;

          if (isDone) {
            cardBg = 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300';
            icon = <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
          } else if (isCurrent) {
            cardBg = 'bg-cyan-950/80 border-cyan-400 text-cyan-200 glow-cyan animate-pulse';
            icon = <CircleDot className="w-4 h-4 text-cyan-400 animate-spin" />;
          }

          return (
            <div
              key={step.stepNumber}
              className={`p-3 rounded-xl border flex flex-col justify-between transition-all duration-300 ${cardBg}`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-mono font-bold">Phase 0{step.stepNumber}</span>
                {icon}
              </div>
              <p className="text-xs font-semibold line-clamp-2 leading-tight">{step.title}</p>
              <span className="text-[10px] font-mono opacity-70 mt-2 text-cyan-300/80">{step.sensorUsed}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
