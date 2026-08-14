import React from 'react';
import { RobotAvatar } from '../components/kiosk/RobotAvatar';
import { LanguageCode, AccessibilitySettings } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Sparkles, TouchpadIcon, ShieldAlert } from 'lucide-react';

interface AttractScreenProps {
  currentLang: LanguageCode;
  onChangeLang: (lang: LanguageCode) => void;
  onBegin: () => void;
  accessibility: AccessibilitySettings;
  visitorDistanceMeters: number;
}

export const AttractScreen: React.FC<AttractScreenProps> = ({
  currentLang,
  onChangeLang,
  onBegin,
  accessibility,
  visitorDistanceMeters,
}) => {
  const t = TRANSLATIONS[currentLang];

  const languages: Array<{ code: LanguageCode; label: string; flag: string }> = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'ja', label: '日本語', flag: '🇯🇵' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'zh', label: '中文', flag: '🇨🇳' },
  ];

  return (
    <div
      onClick={onBegin}
      className={`relative w-full h-full flex flex-col items-center justify-between p-8 sm:p-12 cursor-pointer select-none overflow-hidden transition-all ${
        accessibility.highContrast
          ? 'bg-black text-white'
          : 'bg-[#0B0E13] text-gray-200 font-sans'
      }`}
    >
      {/* Background Lidar Grid */}
      <div className="absolute inset-0 lidar-grid opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#00E5FF] animate-scanline opacity-75 pointer-events-none" />

      {/* Top Banner: Science Museum Tag */}
      <div className="z-10 flex flex-col items-center text-center max-w-3xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#14181F] border border-[#00E5FF]/40 text-[#00E5FF] font-mono text-xs font-bold tracking-widest uppercase mb-4 glow-cyan">
          <Sparkles className="w-4 h-4 text-[#00E5FF] animate-spin" style={{ animationDuration: '6s' }} />
          SCIENCE CENTER INTERACTIVE ROBOTICS EXHIBIT
        </div>

        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter mb-2 text-white font-sans">
          {t.appName}
        </h1>
        <p className="text-gray-500 mb-2 tracking-widest uppercase text-xs sm:text-sm font-mono">{t.subTitle}</p>
      </div>

      {/* Center Circular Tech Visual & Robot Avatar */}
      <div className="z-10 flex flex-col items-center my-auto">
        <div className="relative">
          <div className="w-64 h-64 border-2 border-[#00E5FF] rounded-full mx-auto flex items-center justify-center relative bg-black/40">
            <div className="absolute inset-0 border border-[#00E5FF] rounded-full animate-ping opacity-20" />
            <div className="w-48 h-48 border border-dashed border-[#00E5FF]/60 rounded-full flex items-center justify-center">
              <RobotAvatar mode="idle" size="normal" showGlow={true} />
            </div>
          </div>
        </div>

        {/* Live Visitor Proximity Tag */}
        <div className="mt-6 inline-flex items-center gap-3 px-5 py-2 rounded-xl bg-[#14181F] border border-gray-800 text-gray-300 font-mono text-xs uppercase tracking-wider shadow-xl">
          <span className="w-3 h-3 rounded-full bg-[#00E5FF] animate-pulse" />
          <span>
            {t.visitorDetected}: <strong className="text-[#00E5FF]">{visitorDistanceMeters.toFixed(1)}m</strong>
          </span>
        </div>
      </div>

      {/* Touch Call to Action Prompt */}
      <div className="z-10 flex flex-col items-center w-full max-w-2xl text-center">
        <button
          onClick={onBegin}
          className={`btn-active w-full py-6 px-12 bg-[#00E5FF] text-[#0B0E13] text-2xl font-bold uppercase tracking-widest rounded-full glow-cyan hover:bg-cyan-300 transition-all flex items-center justify-center gap-4 ${
            accessibility.highContrast ? 'border-4 border-white' : ''
          }`}
        >
          <TouchpadIcon className="w-8 h-8 animate-bounce" />
          <span>{t.tapToBegin}</span>
        </button>

        {/* Quick Language Selection Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3" onClick={(e) => e.stopPropagation()}>
          {languages.map((item) => (
            <button
              key={item.code}
              onClick={() => onChangeLang(item.code)}
              className={`btn-active w-12 h-12 rounded-xl border text-xs font-mono font-bold transition-all flex items-center justify-center uppercase ${
                currentLang === item.code
                  ? 'border-[#00E5FF] text-[#00E5FF] bg-[#00E5FF]/10'
                  : 'border-gray-800 text-gray-500 bg-[#14181F] hover:border-gray-600'
              }`}
            >
              <span>{item.code.toUpperCase()}</span>
            </button>
          ))}
        </div>

        <div className="mt-4 text-[11px] font-mono text-gray-600 uppercase tracking-widest flex items-center gap-2">
          <ShieldAlert className="w-3.5 h-3.5 text-[#00E5FF]" />
          <span>ADA COMPLIANT • TOUCH & VOICE ENABLED • EXHIBIT 402</span>
        </div>
      </div>
    </div>
  );
};
