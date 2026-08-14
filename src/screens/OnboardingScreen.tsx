import React from 'react';
import { AccessibilitySettings, LanguageCode } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Sparkles, Eye, Maximize2, Cpu, ArrowRight } from 'lucide-react';

interface OnboardingScreenProps {
  currentLang: LanguageCode;
  accessibility: AccessibilitySettings;
  onUpdateAccessibility: (settings: Partial<AccessibilitySettings>) => void;
  onContinueToDashboard: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  currentLang,
  accessibility,
  onUpdateAccessibility,
  onContinueToDashboard,
}) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <div
      className={`w-full h-full flex flex-col justify-between p-6 sm:p-10 relative overflow-hidden ${
        accessibility.highContrast ? 'high-contrast bg-black text-white' : 'bg-[#0B0E13] text-gray-200'
      }`}
    >
      <div className="absolute inset-0 lidar-grid opacity-15 pointer-events-none" />

      {/* Top Welcome Title */}
      <div className="text-center max-w-3xl mx-auto mt-4 z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#14181F] border border-[#00E5FF]/40 text-[#00E5FF] font-mono text-xs font-bold uppercase tracking-widest mb-3 glow-cyan">
          <Sparkles className="w-4 h-4 text-[#00E5FF]" />
          EXHIBIT MISSION BRIEFING
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase font-sans">
          {t.welcomeHeading}
        </h1>
        <p className="text-gray-400 text-base sm:text-lg font-mono mt-3 max-w-2xl mx-auto leading-relaxed">
          {t.welcomeSubtitle}
        </p>
      </div>

      {/* Center 3 Feature Cards (Visual near-zero reading) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-auto max-w-5xl mx-auto w-full z-10">
        <div className="bg-[#14181F] border border-gray-800 rounded-2xl p-8 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/40 flex items-center justify-center text-[#00E5FF] mb-4">
            <Cpu className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold font-sans text-white mb-2 uppercase tracking-wide">1. Autonomous Brain</h3>
          <p className="text-xs text-gray-400 leading-relaxed font-mono">
            AURA-7 processes multi-sensor inputs to think and plan domestic chores in real time.
          </p>
        </div>

        <div className="bg-[#14181F] border border-gray-800 rounded-2xl p-8 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/40 flex items-center justify-center text-[#00E5FF] mb-4">
            <span className="text-3xl">📡</span>
          </div>
          <h3 className="text-xl font-bold font-sans text-white mb-2 uppercase tracking-wide">2. Sensor Array</h3>
          <p className="text-xs text-gray-400 leading-relaxed font-mono">
            Experience live 360° LiDAR point clouds, computer vision optics, and EMG gesture inputs.
          </p>
        </div>

        <div className="bg-[#14181F] border border-gray-800 rounded-2xl p-8 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-4">
            <span className="text-3xl">🛡️</span>
          </div>
          <h3 className="text-xl font-bold font-sans text-white mb-2 uppercase tracking-wide">3. Human Safety First</h3>
          <p className="text-xs text-gray-400 leading-relaxed font-mono">
            Test how the robot recalculates trajectories instantly to avoid human feet and pets.
          </p>
        </div>
      </div>

      {/* Accessibility Quick Toggles Row & Start Action */}
      <div className="max-w-4xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-6 bg-[#14181F] p-6 rounded-2xl border border-gray-800 z-10">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() =>
              onUpdateAccessibility({ highContrast: !accessibility.highContrast })
            }
            className={`btn-active px-4 py-2.5 rounded-xl border font-mono text-xs font-bold uppercase transition-all flex items-center gap-2 ${
              accessibility.highContrast
                ? 'bg-[#00E5FF] text-[#0B0E13] border-[#00E5FF]'
                : 'bg-[#1C232B] text-gray-300 border-gray-700 hover:border-[#00E5FF]'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>High Contrast</span>
          </button>

          <button
            onClick={() =>
              onUpdateAccessibility({ kioskReachMode: !accessibility.kioskReachMode })
            }
            className={`btn-active px-4 py-2.5 rounded-xl border font-mono text-xs font-bold uppercase transition-all flex items-center gap-2 ${
              accessibility.kioskReachMode
                ? 'bg-amber-500 text-[#0B0E13] border-amber-300'
                : 'bg-[#1C232B] text-gray-300 border-gray-700 hover:border-amber-400'
            }`}
          >
            <Maximize2 className="w-4 h-4" />
            <span>Wheelchair Height</span>
          </button>
        </div>

        <button
          onClick={onContinueToDashboard}
          className="btn-active w-full sm:w-auto px-10 py-5 bg-[#00E5FF] text-[#0B0E13] text-xl font-bold uppercase tracking-widest rounded-2xl glow-cyan hover:bg-cyan-300 transition-all flex items-center justify-center gap-3 font-mono"
        >
          <span>{t.startTask}</span>
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
