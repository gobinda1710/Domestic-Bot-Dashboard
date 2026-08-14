import React, { useState } from 'react';
import { Mic, Volume2, Sparkles, X } from 'lucide-react';
import { Button } from '../common/Button';

interface VoiceControlOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCommand: (commandText: string) => void;
}

export const VoiceControlOverlay: React.FC<VoiceControlOverlayProps> = ({
  isOpen,
  onClose,
  onSelectCommand,
}) => {
  const [spokenText, setSpokenText] = useState<string>('Listening for voice prompt...');

  if (!isOpen) return null;

  const samplePrompts = [
    'AURA, clean up the kitchen spill!',
    'AURA, fetch my prescription medicine.',
    'AURA, perform a fall risk scan in living room.',
    'AURA, organize the scattered toys on floor.',
  ];

  const handleSimulateSpeech = (prompt: string) => {
    setSpokenText(`"${prompt}"`);
    setTimeout(() => {
      onSelectCommand(prompt);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/85 backdrop-blur-lg animate-fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border-2 border-rose-500/80 rounded-3xl p-8 glow-rose flex flex-col items-center text-center">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Animated Mic Wave Pulse */}
        <div className="relative flex items-center justify-center w-28 h-28 rounded-full bg-rose-950/80 border-4 border-rose-500 glow-rose my-4">
          <Mic className="w-14 h-14 text-rose-400 animate-pulse" />
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-30" />
        </div>

        <h2 className="text-3xl font-extrabold text-white font-mono tracking-tight mt-2">
          VOICE COMMAND INTERFACE
        </h2>
        <p className="text-rose-300 font-mono text-sm mt-1">{spokenText}</p>

        {/* Simulated Audio Wave visualizer */}
        <div className="flex items-center gap-1.5 h-12 my-6">
          {[16, 28, 42, 20, 36, 48, 24, 38, 14, 30, 44, 22].map((height, i) => (
            <div
              key={i}
              className="w-2 bg-rose-500 rounded-full animate-pulse"
              style={{
                height: `${height}px`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: '0.8s',
              }}
            />
          ))}
        </div>

        <div className="w-full bg-slate-950/80 p-4 rounded-2xl border border-slate-800 text-left my-2">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-400 uppercase mb-3">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Tap a preset command to test voice recognition:
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {samplePrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSimulateSpeech(prompt)}
                className="p-3.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-rose-400 text-slate-100 hover:text-white font-mono text-sm text-left flex items-center justify-between transition-all active:scale-98"
              >
                <span>🗣️ {prompt}</span>
                <Volume2 className="w-4 h-4 text-rose-400" />
              </button>
            ))}
          </div>
        </div>

        <Button variant="ghost" size="normal" onClick={onClose} className="mt-4 text-slate-400">
          Cancel Voice Listening
        </Button>
      </div>
    </div>
  );
};
