import React from 'react';
import { Zap } from 'lucide-react';

interface BatteryIndicatorProps {
  percent: number;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const BatteryIndicator: React.FC<BatteryIndicatorProps> = ({
  percent,
  showIcon = true,
  size = 'md',
  className = '',
}) => {
  const getColor = () => {
    if (percent > 50) return '#22C55E'; // Success green
    if (percent > 20) return '#F59E0B'; // Warning amber
    return '#EF4444'; // Error red
  };

  const getDim = () => {
    switch (size) {
      case 'sm':
        return { w: 'w-6', h: 'h-3.5', text: 'text-xs', cap: 'w-1 h-2' };
      case 'lg':
        return { w: 'w-12', h: 'h-6', text: 'text-lg', cap: 'w-1.5 h-3.5' };
      case 'md':
      default:
        return { w: 'w-8', h: 'h-4', text: 'text-sm', cap: 'w-1 h-2.5' };
    }
  };

  const dim = getDim();
  const color = getColor();

  return (
    <div className={`inline-flex items-center gap-2 font-mono ${className}`}>
      {showIcon && <Zap className="w-4 h-4 text-[#4F8CFF]" />}
      
      {/* Battery Body */}
      <div className="flex items-center">
        <div className={`${dim.w} ${dim.h} rounded-sm border-2 border-[#AAB4C5] p-0.5 relative flex items-center bg-[#0B1020]`}>
          <div
            className="h-full rounded-xs transition-all duration-500"
            style={{
              width: `${Math.max(8, Math.min(100, percent))}%`,
              backgroundColor: color,
            }}
          />
        </div>
        {/* Terminal tip */}
        <div className={`${dim.cap} bg-[#AAB4C5] rounded-r-xs ml-0.5`} />
      </div>

      <span className={`font-bold ${dim.text} text-[#F8FAFC]`}>
        {percent}%
      </span>
    </div>
  );
};
