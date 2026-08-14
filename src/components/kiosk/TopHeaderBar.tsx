import React, { useState } from 'react';
import {
  AccessibilitySettings,
  LanguageCode,
  RobotSystemState,
} from '../../types';
import { TRANSLATIONS } from '../../data/translations';
import {
  Battery,
  Globe,
  Mic,
  Eye,
  Sliders,
  Volume2,
  ShieldCheck,
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';

interface TopHeaderBarProps {
  robotState: RobotSystemState;
  currentLang: LanguageCode;
  onChangeLang: (lang: LanguageCode) => void;
  accessibility: AccessibilitySettings;
  onUpdateAccessibility: (settings: Partial<AccessibilitySettings>) => void;
  onToggleVoice: () => void;
  onEmergencyStop: () => void;
}

export const TopHeaderBar: React.FC<TopHeaderBarProps> = ({
  robotState,
  currentLang,
  onChangeLang,
  accessibility,
  onUpdateAccessibility,
  onToggleVoice,
}) => {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isAccessOpen, setIsAccessOpen] = useState(false);

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
    <>
      <header
        className={`w-full py-3.5 px-8 flex items-center justify-between border-b status-bar-bg transition-all z-50 ${
          accessibility.highContrast
            ? 'bg-black text-white border-cyan-400 border-b-4'
            : 'border-gray-800 text-gray-200'
        }`}
      >
        {/* Robot Brand & ID */}
        <div className="flex items-center gap-4">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-[#14181F] border border-[#00E5FF] glow-cyan">
            <span className="text-xl font-black font-mono text-[#00E5FF]">A7</span>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5FF] opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00E5FF]" />
            </span>
          </div>

          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-lg font-bold tracking-wider text-white font-mono uppercase">{t.appName}</h1>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#00E5FF]/10 text-[#00E5FF] font-mono font-bold border border-[#00E5FF]/30 uppercase tracking-widest">
                AURA-7 CORE ACTIVE
              </span>
            </div>
            <p className="text-xs font-mono text-gray-500">{t.subTitle}</p>
          </div>
        </div>

        {/* Center Battery & System Vital Bar */}
        <div className="hidden lg:flex items-center gap-6 px-6 py-2 rounded-xl bg-[#14181F] border border-gray-800 font-mono text-xs">
          <div className="flex items-center gap-2">
            <Battery className="w-4 h-4 text-[#00E5FF]" />
            <span className="text-xs font-bold text-gray-300">BATTERY: {robotState.batteryPercent}%</span>
            <div className="w-20 bg-gray-800 h-2 rounded-full overflow-hidden ml-1">
              <div
                className="bg-[#00E5FF] h-full rounded-full"
                style={{ width: `${robotState.batteryPercent}%` }}
              />
            </div>
          </div>

          <div className="h-4 w-px bg-gray-800" />

          <div className="flex items-center gap-2 text-gray-400">
            <ShieldCheck className="w-4 h-4 text-[#00E5FF]" />
            <span>NEURAL: OK</span>
          </div>

          <div className="h-4 w-px bg-gray-800" />

          <div className="flex items-center gap-2 text-gray-400">
            <Volume2 className="w-4 h-4 text-amber-400" />
            <span>TEMP: 32°C</span>
          </div>
        </div>

        {/* Right Controls: Voice, Language, Accessibility */}
        <div className="flex items-center gap-3">
          {/* Voice Command Button */}
          <button
            onClick={onToggleVoice}
            className={`btn-active px-4 py-2.5 rounded-xl border transition-all flex items-center gap-2 font-mono font-bold text-xs uppercase ${
              accessibility.voiceListening
                ? 'bg-rose-600 text-white border-rose-400 glow-rose animate-pulse'
                : 'bg-[#14181F] text-[#00E5FF] border-gray-800 hover:border-[#00E5FF]'
            }`}
            aria-label="Toggle Voice Control"
          >
            <Mic className="w-4 h-4" />
            <span className="hidden sm:inline">
              {accessibility.voiceListening ? 'LISTENING' : 'VOICE'}
            </span>
          </button>

          {/* Language Selector Button */}
          <button
            onClick={() => setIsLangOpen(true)}
            className="btn-active px-4 py-2.5 rounded-xl bg-[#14181F] border border-gray-800 text-gray-300 hover:border-[#00E5FF] transition-all flex items-center gap-2 font-mono text-xs"
            aria-label="Language options"
          >
            <Globe className="w-4 h-4 text-[#00E5FF]" />
            <span className="font-bold uppercase">{currentLang}</span>
          </button>

          {/* Accessibility Quick Menu */}
          <button
            onClick={() => setIsAccessOpen(true)}
            className={`btn-active px-4 py-2.5 rounded-xl border transition-all flex items-center gap-2 font-mono text-xs uppercase ${
              accessibility.highContrast || accessibility.largeText || accessibility.kioskReachMode
                ? 'bg-amber-500 text-slate-950 border-amber-300 font-extrabold glow-amber'
                : 'bg-[#14181F] border-gray-800 text-gray-300 hover:border-[#00E5FF]'
            }`}
            aria-label="Accessibility options"
          >
            <Sliders className="w-4 h-4" />
            <span className="hidden sm:inline">ADA</span>
          </button>
        </div>
      </header>

      {/* Language Modal */}
      <Modal
        isOpen={isLangOpen}
        onClose={() => setIsLangOpen(false)}
        title="Select Language / Seleccionar Idioma"
        highContrast={accessibility.highContrast}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {languages.map((item) => (
            <button
              key={item.code}
              onClick={() => {
                onChangeLang(item.code);
                setIsLangOpen(false);
              }}
              className={`p-5 rounded-2xl border text-left font-semibold transition-all flex items-center gap-3 text-lg ${
                currentLang === item.code
                  ? 'bg-cyan-500 text-slate-950 border-cyan-300 font-bold glow-cyan'
                  : 'bg-slate-800/90 text-slate-100 border-slate-700 hover:border-cyan-400'
              }`}
            >
              <span className="text-3xl">{item.flag}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </Modal>

      {/* Accessibility Modal */}
      <Modal
        isOpen={isAccessOpen}
        onClose={() => setIsAccessOpen(false)}
        title={t.accessibilityMenu}
        highContrast={accessibility.highContrast}
      >
        <div className="space-y-6">
          <p className="text-slate-300 text-sm">
            ADA-aligned kiosk settings designed for wheelchair accessibility, children, and visual clarity.
          </p>

          <div className="grid grid-cols-1 gap-4">
            {/* High Contrast Toggle */}
            <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Eye className="w-8 h-8 text-cyan-400" />
                <div>
                  <h3 className="font-bold text-lg text-white">{t.highContrast}</h3>
                  <p className="text-xs text-slate-400">Ultra-high contrast, black backgrounds & 7:1 border outlines.</p>
                </div>
              </div>
              <Button
                variant={accessibility.highContrast ? 'primary' : 'outline'}
                size="normal"
                onClick={() =>
                  onUpdateAccessibility({ highContrast: !accessibility.highContrast })
                }
              >
                {accessibility.highContrast ? 'ENABLED' : 'OFF'}
              </Button>
            </div>

            {/* Large Text Toggle */}
            <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="font-mono text-2xl font-black text-cyan-400">A+</span>
                <div>
                  <h3 className="font-bold text-lg text-white">{t.largeText}</h3>
                  <p className="text-xs text-slate-400">Increases label sizes for easy viewing from 2 meters away.</p>
                </div>
              </div>
              <Button
                variant={accessibility.largeText ? 'primary' : 'outline'}
                size="normal"
                onClick={() =>
                  onUpdateAccessibility({ largeText: !accessibility.largeText })
                }
              >
                {accessibility.largeText ? 'ENABLED' : 'OFF'}
              </Button>
            </div>

            {/* Kiosk Reach / Wheelchair Mode */}
            <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-2xl text-amber-400">♿</span>
                <div>
                  <h3 className="font-bold text-lg text-white">{t.wheelchairMode}</h3>
                  <p className="text-xs text-slate-400">Lowers all interactive buttons to the bottom 60% of the 55" screen.</p>
                </div>
              </div>
              <Button
                variant={accessibility.kioskReachMode ? 'primary' : 'outline'}
                size="normal"
                onClick={() =>
                  onUpdateAccessibility({ kioskReachMode: !accessibility.kioskReachMode })
                }
              >
                {accessibility.kioskReachMode ? 'ENABLED' : 'OFF'}
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
