import React, { useEffect, useState } from 'react';
import { LanguageCode } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Clock, Hand } from 'lucide-react';
import { Button } from '../components/common/Button';

interface TimeoutOverlayProps {
  isOpen: boolean;
  onStay: () => void;
  onTimeout: () => void;
  currentLang: LanguageCode;
  timeoutSeconds?: number;
}

export const TimeoutOverlay: React.FC<TimeoutOverlayProps> = ({
  isOpen,
  onStay,
  onTimeout,
  currentLang,
  timeoutSeconds = 15,
}) => {
  const [countdown, setCountdown] = useState<number>(timeoutSeconds);
  const t = TRANSLATIONS[currentLang];

  useEffect(() => {
    if (!isOpen) {
      setCountdown(timeoutSeconds);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, onTimeout, timeoutSeconds]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl bg-[#14181F] border border-amber-500 rounded-2xl p-8 shadow-2xl flex flex-col items-center text-center">
        {/* Countdown Ring */}
        <div className="relative flex items-center justify-center w-28 h-28 rounded-full bg-black/60 border-2 border-amber-400 my-4">
          <span className="text-4xl font-bold font-mono text-amber-400">{countdown}</span>
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-20" />
        </div>

        <h2 className="text-2xl font-bold text-white font-sans uppercase tracking-wide mt-2">
          {t.timeoutWarning}
        </h2>
        <p className="text-gray-400 text-xs font-mono mt-2 max-w-md">
          Exhibit will automatically reset to the welcome screen for the next museum visitor in {countdown} seconds.
        </p>

        <div className="mt-8 w-full">
          <button
            onClick={onStay}
            className="btn-active w-full py-5 bg-[#00E5FF] text-[#0B0E13] font-bold text-base uppercase rounded-xl font-mono tracking-wider flex items-center justify-center gap-3 glow-cyan"
          >
            <Hand className="w-6 h-6 animate-bounce" />
            <span>{t.touchToStay}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
