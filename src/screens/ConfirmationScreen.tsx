import React from 'react';
import { AccessibilitySettings, LanguageCode, RobotTask } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { RobotAvatar } from '../components/kiosk/RobotAvatar';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import {
  Sparkles,
  Trophy,
  Zap,
  RotateCcw,
  Home,
  CheckCircle2,
  Lightbulb,
  ShieldCheck,
} from 'lucide-react';

interface ConfirmationScreenProps {
  task: RobotTask;
  currentLang: LanguageCode;
  accessibility: AccessibilitySettings;
  onReplayTask: () => void;
  onReturnDashboard: () => void;
  onResetExhibit: () => void;
}

export const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({
  task,
  currentLang,
  accessibility,
  onReplayTask,
  onReturnDashboard,
  onResetExhibit,
}) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <div
      className={`w-full h-full p-6 sm:p-10 flex flex-col justify-between overflow-y-auto ${
        accessibility.highContrast ? 'high-contrast bg-black text-white' : 'bg-[#0B0E13] text-gray-200 font-sans'
      }`}
    >
      {/* Top Victory Banner */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#14181F] border border-emerald-500/50 text-emerald-400 font-mono text-xs font-bold uppercase mb-3 glow-emerald">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          SIMULATION COMPLETED SUCCESSFULLY
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase font-sans">
          {t.taskComplete}
        </h1>
        <p className="text-gray-400 text-base sm:text-lg font-mono mt-2">{task.title}</p>
      </div>

      {/* Center Grid: Robot Celebratory Avatar + Performance Stats Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 my-auto max-w-5xl mx-auto w-full items-center">
        {/* Left Column: Robot Celebratory Avatar (5 cols) */}
        <div className="md:col-span-5 flex flex-col items-center justify-center">
          <div className="w-56 h-56 border-2 border-[#00E5FF] rounded-full flex items-center justify-center relative bg-black/40 p-4">
            <RobotAvatar mode="success" size="normal" showGlow={true} />
          </div>
        </div>

        {/* Right Column: Performance Breakdown Metrics (7 cols) */}
        <div className="md:col-span-7 space-y-4">
          <div className="bg-[#14181F] border border-gray-800 rounded-2xl p-6 glow-cyan">
            <h3 className="text-lg font-bold font-sans text-white mb-4 flex items-center gap-2 uppercase tracking-wider">
              <Trophy className="w-5 h-5 text-[#00E5FF]" />
              ROBOT TELEMETRY & PERFORMANCE
            </h3>

            <div className="grid grid-cols-2 gap-4 text-center font-mono">
              <div className="p-4 rounded-xl bg-[#1C232B] border border-gray-800">
                <span className="text-[10px] text-gray-500 uppercase block mb-1">Execution Time</span>
                <span className="text-xl font-bold text-[#00E5FF]">{task.estimatedDuration}</span>
              </div>

              <div className="p-4 rounded-xl bg-[#1C232B] border border-gray-800">
                <span className="text-[10px] text-gray-500 uppercase block mb-1">Energy Used</span>
                <span className="text-xl font-bold text-emerald-400">-{task.energyCostPercent}%</span>
              </div>

              <div className="p-4 rounded-xl bg-[#1C232B] border border-gray-800">
                <span className="text-[10px] text-gray-500 uppercase block mb-1">Obstacles Avoided</span>
                <span className="text-xl font-bold text-amber-400">{task.detectedObjects.length} Objects</span>
              </div>

              <div className="p-4 rounded-xl bg-[#1C232B] border border-gray-800">
                <span className="text-[10px] text-gray-500 uppercase block mb-1">Spatial Precision</span>
                <span className="text-xl font-bold text-rose-400">99.4% Match</span>
              </div>
            </div>
          </div>

          {/* Exhibition Educational Science Takeaway Box */}
          <div className="bg-[#14181F] border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center gap-2 text-amber-400 font-bold font-mono text-xs mb-2 uppercase tracking-wide">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              {t.didYouKnow}
            </div>
            <p className="text-xs text-gray-300 leading-relaxed font-sans">{task.didYouKnowFact}</p>
            <p className="text-[11px] text-gray-500 mt-2 font-mono">{task.scienceExplanation}</p>
          </div>
        </div>
      </div>

      {/* Bottom Action Controls Bar */}
      <div className="max-w-4xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#14181F] border border-gray-800">
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <button
            onClick={onReplayTask}
            className="btn-active px-5 py-3 rounded-xl bg-[#1C232B] border border-gray-700 hover:border-[#00E5FF] text-gray-200 font-mono text-xs font-bold uppercase transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4 text-[#00E5FF]" />
            <span>{t.replayTask}</span>
          </button>

          <button
            onClick={onReturnDashboard}
            className="btn-active px-5 py-3 rounded-xl bg-[#1C232B] border border-gray-700 hover:border-[#00E5FF] text-gray-200 font-mono text-xs font-bold uppercase transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4 text-[#00E5FF]" />
            <span>{t.returnToDashboard}</span>
          </button>
        </div>

        <button
          onClick={onResetExhibit}
          className="btn-active w-full sm:w-auto px-8 py-3.5 bg-[#00E5FF] text-[#0B0E13] font-bold text-sm uppercase rounded-xl font-mono tracking-wider glow-cyan"
        >
          {t.resetExhibit}
        </button>
      </div>
    </div>
  );
};
