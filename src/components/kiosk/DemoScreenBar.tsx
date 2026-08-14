import React from 'react';
import { ScreenId } from '../../types';
import { Monitor, Smartphone, RotateCcw, Sparkles, Clock, Image as ImageIcon } from 'lucide-react';

interface DemoScreenBarProps {
  currentScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
  isKioskFixedFrame: boolean;
  onToggleFixedFrame: () => void;
  onResetExhibit: () => void;
  secondsElapsed: number;
  onOpenThumbnailModal?: () => void;
}

export const DemoScreenBar: React.FC<DemoScreenBarProps> = ({
  currentScreen,
  onSelectScreen,
  isKioskFixedFrame,
  onToggleFixedFrame,
  onResetExhibit,
  secondsElapsed,
  onOpenThumbnailModal,
}) => {
  const screens: { id: ScreenId; label: string; num: number }[] = [
    { id: 'WELCOME', label: '1. Welcome', num: 1 },
    { id: 'DASHBOARD', label: '2. Dashboard', num: 2 },
    { id: 'TASK_SELECTION', label: '3. Select Task', num: 3 },
    { id: 'TASK_CONFIG', label: '4. Config Task', num: 4 },
    { id: 'ROBOT_WORKING', label: '5. Working', num: 5 },
    { id: 'TASK_COMPLETE', label: '6. Complete', num: 6 },
    { id: 'EMERGENCY_STOP', label: '7. Emergency', num: 7 },
  ];

  return (
    <div className="w-full bg-[#080C18] border-b border-[#222D48] px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs z-50 select-none">
      {/* Title & 90-Sec Kiosk Timer */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-[#4F8CFF] font-bold font-mono uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>CSE441 KIOSK DEMO</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#151D32] text-[#AAB4C5] font-mono">
          <Clock className="w-3.5 h-3.5 text-[#22C55E]" />
          <span>Session: {secondsElapsed}s / 90s</span>
        </div>
      </div>

      {/* 1-Click Screen Jump Buttons for CSE441 Evaluation / Figma Capture */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-1">
        {screens.map((s) => (
          <button
            key={s.id}
            onClick={() => onSelectScreen(s.id)}
            className={`px-3 py-1.5 rounded-lg font-bold font-mono transition-all text-xs whitespace-nowrap ${
              currentScreen === s.id
                ? 'bg-[#4F8CFF] text-[#0B1020] shadow-sm'
                : 'bg-[#151D32] hover:bg-[#1C2742] text-[#AAB4C5] hover:text-[#F8FAFC] border border-[#222D48]'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Figma Thumbnail Button, Frame Mode Toggle & Reset */}
      <div className="flex items-center gap-2">
        {onOpenThumbnailModal && (
          <button
            onClick={onOpenThumbnailModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#4F8CFF]/20 to-[#7C5CFF]/20 hover:from-[#4F8CFF]/30 hover:to-[#7C5CFF]/30 border border-[#4F8CFF]/40 text-[#F8FAFC] font-semibold transition-all shadow-sm"
            title="Download 1920x1080 Figma Community Thumbnail"
          >
            <ImageIcon className="w-3.5 h-3.5 text-[#4F8CFF]" />
            <span>🎨 Figma Thumbnail</span>
          </button>
        )}

        <button
          onClick={onToggleFixedFrame}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border font-mono font-semibold transition-colors ${
            isKioskFixedFrame
              ? 'bg-[#4F8CFF]/20 border-[#4F8CFF] text-[#4F8CFF]'
              : 'bg-[#151D32] border-[#222D48] text-[#AAB4C5] hover:text-[#F8FAFC]'
          }`}
          title="Toggle 55-inch portrait kiosk frame (1080x1920 preview)"
        >
          {isKioskFixedFrame ? <Smartphone className="w-3.5 h-3.5" /> : <Monitor className="w-3.5 h-3.5" />}
          <span>{isKioskFixedFrame ? '55" Portrait Frame' : 'Full Window'}</span>
        </button>

        <button
          onClick={onResetExhibit}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#151D32] hover:bg-[#EF4444] border border-[#222D48] text-[#AAB4C5] hover:text-white transition-colors"
          title="Reset Exhibit to Welcome Screen"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
};
