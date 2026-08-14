import React from 'react';
import { LanguageCode, AccessibilityOptions, NotificationItem } from '../../types';
import { 
  X, 
  Globe, 
  Check, 
  Accessibility as AccessibilityIcon, 
  Volume2, 
  Eye, 
  Type, 
  Maximize, 
  Bell, 
  Settings as SettingsIcon,
  RotateCcw,
  ShieldCheck
} from 'lucide-react';

interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: LanguageCode;
  onSelectLang: (lang: LanguageCode) => void;
}

export const LanguageModal: React.FC<LanguageModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  onSelectLang,
}) => {
  if (!isOpen) return null;

  const languages: { code: LanguageCode; name: string; nativeName: string }[] = [
    { code: 'en', name: 'English', nativeName: 'English (US)' },
    { code: 'es', name: 'Spanish', nativeName: 'Español' },
    { code: 'fr', name: 'French', nativeName: 'Français' },
    { code: 'de', name: 'German', nativeName: 'Deutsch' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語' },
    { code: 'zh', name: 'Chinese', nativeName: '简体中文' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="surface-card w-full max-w-lg p-6 relative border-2 border-[#4F8CFF]/50 shadow-2xl">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#222D48]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#4F8CFF]/15 text-[#4F8CFF]">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#F8FAFC]">Select Language</h3>
              <p className="text-xs text-[#AAB4C5]">Choose language for the exhibit kiosk</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#0B1020] hover:bg-[#1C2742] text-[#AAB4C5] hover:text-[#F8FAFC]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                onSelectLang(lang.code);
                onClose();
              }}
              className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                currentLang === lang.code
                  ? 'bg-[#1B2644] border-[#4F8CFF] text-[#F8FAFC]'
                  : 'bg-[#0B1020] border-[#222D48] text-[#AAB4C5] hover:border-[#4F8CFF]/50 hover:text-[#F8FAFC]'
              }`}
            >
              <div>
                <span className="block font-bold text-sm text-[#F8FAFC]">{lang.nativeName}</span>
                <span className="block text-xs text-[#AAB4C5]">{lang.name}</span>
              </div>
              {currentLang === lang.code && <Check className="w-5 h-5 text-[#4F8CFF]" />}
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className="btn-secondary w-full py-3.5 text-sm font-bold"
        >
          Confirm & Close
        </button>
      </div>
    </div>
  );
};

interface AccessibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  options: AccessibilityOptions;
  onToggleOption: (key: keyof AccessibilityOptions) => void;
}

export const AccessibilityModal: React.FC<AccessibilityModalProps> = ({
  isOpen,
  onClose,
  options,
  onToggleOption,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="surface-card w-full max-w-lg p-6 relative border-2 border-[#7C5CFF]/50 shadow-2xl">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#222D48]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#7C5CFF]/15 text-[#7C5CFF]">
              <AccessibilityIcon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#F8FAFC]">Accessibility Controls</h3>
              <p className="text-xs text-[#AAB4C5]">Inclusive touchscreen display options</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#0B1020] hover:bg-[#1C2742] text-[#AAB4C5] hover:text-[#F8FAFC]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 mb-6">
          {/* Larger Text Toggle */}
          <div
            onClick={() => onToggleOption('largeText')}
            className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
              options.largeText
                ? 'bg-[#1B2644] border-[#4F8CFF]'
                : 'bg-[#0B1020] border-[#222D48] hover:border-[#2E3D60]'
            }`}
          >
            <div className="flex items-center gap-3">
              <Type className="w-5 h-5 text-[#4F8CFF]" />
              <div>
                <h4 className="font-bold text-sm text-[#F8FAFC]">Larger Text</h4>
                <p className="text-xs text-[#AAB4C5]">Enlarge typography across all kiosk cards</p>
              </div>
            </div>
            <div
              className={`w-12 h-6 rounded-full p-1 transition-colors ${
                options.largeText ? 'bg-[#4F8CFF]' : 'bg-[#222D48]'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  options.largeText ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </div>
          </div>

          {/* High Contrast Toggle */}
          <div
            onClick={() => onToggleOption('highContrast')}
            className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
              options.highContrast
                ? 'bg-[#1B2644] border-[#4F8CFF]'
                : 'bg-[#0B1020] border-[#222D48] hover:border-[#2E3D60]'
            }`}
          >
            <div className="flex items-center gap-3">
              <Eye className="w-5 h-5 text-[#22C55E]" />
              <div>
                <h4 className="font-bold text-sm text-[#F8FAFC]">High Contrast Mode</h4>
                <p className="text-xs text-[#AAB4C5]">Pure black background with vivid outlines</p>
              </div>
            </div>
            <div
              className={`w-12 h-6 rounded-full p-1 transition-colors ${
                options.highContrast ? 'bg-[#4F8CFF]' : 'bg-[#222D48]'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  options.highContrast ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </div>
          </div>

          {/* Voice Guidance Simulation */}
          <div
            onClick={() => onToggleOption('voiceGuidance')}
            className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
              options.voiceGuidance
                ? 'bg-[#1B2644] border-[#4F8CFF]'
                : 'bg-[#0B1020] border-[#222D48] hover:border-[#2E3D60]'
            }`}
          >
            <div className="flex items-center gap-3">
              <Volume2 className="w-5 h-5 text-[#F59E0B]" />
              <div>
                <h4 className="font-bold text-sm text-[#F8FAFC]">Voice Audio Guidance</h4>
                <p className="text-xs text-[#AAB4C5]">Simulated spoken explanations on touch</p>
              </div>
            </div>
            <div
              className={`w-12 h-6 rounded-full p-1 transition-colors ${
                options.voiceGuidance ? 'bg-[#4F8CFF]' : 'bg-[#222D48]'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  options.voiceGuidance ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </div>
          </div>

          {/* Kiosk Reach Mode */}
          <div
            onClick={() => onToggleOption('kioskReachMode')}
            className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
              options.kioskReachMode
                ? 'bg-[#1B2644] border-[#4F8CFF]'
                : 'bg-[#0B1020] border-[#222D48] hover:border-[#2E3D60]'
            }`}
          >
            <div className="flex items-center gap-3">
              <Maximize className="w-5 h-5 text-[#7C5CFF]" />
              <div>
                <h4 className="font-bold text-sm text-[#F8FAFC]">Kiosk Reach Mode</h4>
                <p className="text-xs text-[#AAB4C5]">Lowers touchscreen active zones for accessibility</p>
              </div>
            </div>
            <div
              className={`w-12 h-6 rounded-full p-1 transition-colors ${
                options.kioskReachMode ? 'bg-[#4F8CFF]' : 'bg-[#222D48]'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  options.kioskReachMode ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="btn-primary w-full py-3.5 text-sm font-bold"
        >
          Save & Apply
        </button>
      </div>
    </div>
  );
};

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onClear: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onClear,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="surface-card w-full max-w-lg p-6 relative border-2 border-[#4F8CFF]/50 shadow-2xl">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#222D48]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#4F8CFF]/15 text-[#4F8CFF]">
              <Bell className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#F8FAFC]">System Notifications</h3>
              <p className="text-xs text-[#AAB4C5]">Recent events from Domestic Bot OS</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#0B1020] hover:bg-[#1C2742] text-[#AAB4C5] hover:text-[#F8FAFC]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 mb-6 max-h-72 overflow-y-auto pr-1">
          {notifications.map((n) => (
            <div key={n.id} className="p-4 rounded-xl bg-[#0B1020] border border-[#222D48]">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold font-mono text-[#4F8CFF]">{n.title}</span>
                <span className="text-[11px] text-[#AAB4C5] font-mono">{n.time}</span>
              </div>
              <p className="text-xs text-[#F8FAFC]">{n.message}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onClear}
            className="btn-secondary flex-1 py-3 text-xs font-bold"
          >
            Clear All
          </button>
          <button
            onClick={onClose}
            className="btn-primary flex-1 py-3 text-xs font-bold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResetAll: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  onResetAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="surface-card w-full max-w-lg p-6 relative border-2 border-[#222D48] shadow-2xl">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#222D48]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#222D48] text-[#F8FAFC]">
              <SettingsIcon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#F8FAFC]">Exhibit Settings</h3>
              <p className="text-xs text-[#AAB4C5]">Science Museum Kiosk Terminal #402</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#0B1020] hover:bg-[#1C2742] text-[#AAB4C5] hover:text-[#F8FAFC]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 mb-6 text-xs text-[#AAB4C5]">
          <div className="p-4 rounded-xl bg-[#0B1020] border border-[#222D48] space-y-2">
            <div className="flex justify-between">
              <span className="text-[#AAB4C5]">Software Version:</span>
              <span className="text-[#F8FAFC] font-mono font-bold">AssistiveBot OS v4.2.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#AAB4C5]">Display Mode:</span>
              <span className="text-[#4F8CFF] font-mono font-bold">55" Portrait Touchscreen</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#AAB4C5]">Auto Idle Timeout:</span>
              <span className="text-[#F8FAFC] font-mono">90 Seconds Rule Active</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0B1020] border border-[#222D48] flex items-center justify-between">
            <div>
              <h4 className="font-bold text-[#F8FAFC]">Reset to Welcome Screen</h4>
              <p className="text-[11px] text-[#AAB4C5]">Clear active task and restore kiosk demo state</p>
            </div>
            <button
              onClick={() => {
                onResetAll();
                onClose();
              }}
              className="p-2.5 rounded-lg bg-[#222D48] hover:bg-[#EF4444] text-[#F8FAFC] transition-colors"
              title="Reset Exhibit"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          className="btn-primary w-full py-3.5 text-sm font-bold"
        >
          Done
        </button>
      </div>
    </div>
  );
};
