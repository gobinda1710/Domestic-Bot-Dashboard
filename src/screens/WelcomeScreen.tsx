import React from 'react';
import { RobotVisual } from '../components/common/RobotVisual';
import { ArrowRight, Globe, Accessibility as AccessibilityIcon, Sparkles } from 'lucide-react';

interface WelcomeScreenProps {
  onStartExploring: () => void;
  onOpenLanguage: () => void;
  onOpenAccessibility: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStartExploring,
  onOpenLanguage,
  onOpenAccessibility,
}) => {
  return (
    <div className="flex-1 flex flex-col justify-between p-8 sm:p-12 max-w-4xl mx-auto w-full text-center relative select-none">
      {/* Top Museum Tag & Utility Badges */}
      <div className="flex items-center justify-between w-full pt-2">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#151D32] border border-[#222D48] text-xs font-bold text-[#4F8CFF] uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-[#4F8CFF]" />
          Science Museum Exhibit #402
        </div>

        {/* Small Touch Options: Language & Accessibility */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenLanguage}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#151D32] hover:bg-[#1C2742] border border-[#222D48] text-xs font-semibold text-[#AAB4C5] hover:text-[#F8FAFC] transition-colors"
          >
            <Globe className="w-4 h-4 text-[#4F8CFF]" />
            <span>Language</span>
          </button>
          <button
            onClick={onOpenAccessibility}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#151D32] hover:bg-[#1C2742] border border-[#222D48] text-xs font-semibold text-[#AAB4C5] hover:text-[#F8FAFC] transition-colors"
          >
            <AccessibilityIcon className="w-4 h-4 text-[#7C5CFF]" />
            <span>Accessibility</span>
          </button>
        </div>
      </div>

      {/* Hero Body Content */}
      <div className="flex flex-col items-center justify-center my-auto py-6 space-y-6">
        {/* Friendly Robot Visual */}
        <div className="my-2">
          <RobotVisual mode="idle" size="xl" />
        </div>

        {/* Headings */}
        <div className="space-y-3 max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#F8FAFC] uppercase">
            DOMESTIC BOT
          </h1>
          <p className="text-2xl sm:text-3xl font-bold text-[#4F8CFF]">
            "Your intelligent home assistant."
          </p>
          <p className="text-base sm:text-lg text-[#AAB4C5] max-w-xl mx-auto leading-relaxed pt-2">
            Explore how an AI-powered robot can help with everyday household tasks.
          </p>
        </div>

        {/* Main 64px+ High Touch Target Start Exploring Button */}
        <div className="pt-4 w-full max-w-md">
          <button
            onClick={onStartExploring}
            className="btn-primary w-full py-6 px-10 text-xl font-extrabold rounded-2xl flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl"
          >
            <span>START EXPLORING</span>
            <ArrowRight className="w-7 h-7" />
          </button>
        </div>
      </div>

      {/* Bottom 90-Second Rule Visitor Guide Note */}
      <div className="flex items-center justify-center gap-2 text-xs font-mono text-[#AAB4C5]/80 pb-2">
        <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
        <span>Touch to begin • 90-second interactive museum simulation</span>
      </div>
    </div>
  );
};
