import React from 'react';
import { RobotState, TaskType } from '../types';
import { BatteryIndicator } from '../components/common/BatteryIndicator';
import { 
  Sparkles, 
  SprayCan, 
  Package, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  ShieldAlert, 
  Cpu, 
  Activity, 
  Zap,
  Bot
} from 'lucide-react';

interface DashboardScreenProps {
  robotState: RobotState;
  onSelectQuickAction: (taskType: TaskType) => void;
  onOpenTaskSelection: () => void;
  onAcceptAiSuggestion: () => void;
  onDismissAiSuggestion: () => void;
  showAiSuggestion: boolean;
  onEmergencyStop: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  robotState,
  onSelectQuickAction,
  onOpenTaskSelection,
  onAcceptAiSuggestion,
  onDismissAiSuggestion,
  showAiSuggestion,
  onEmergencyStop,
}) => {
  return (
    <div className="flex-1 flex flex-col p-6 sm:p-8 max-w-5xl mx-auto w-full space-y-6 overflow-y-auto select-none">
      {/* 1. Visually Prominent Robot Status Hero Card */}
      <div className="surface-card p-6 sm:p-8 relative overflow-hidden border-2 border-[#222D48]">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-[#0B1020] border-2 border-[#4F8CFF] flex items-center justify-center text-[#4F8CFF] shadow-inner shrink-0">
              <Bot className="w-11 h-11 text-[#4F8CFF]" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/40 text-[#22C55E] font-bold text-xs tracking-wider flex items-center gap-1.5 font-mono">
                  <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                  READY
                </span>
                <span className="text-xs text-[#AAB4C5] font-mono">ID: AURA-BOT-07</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] mt-1">
                Robot is Ready for Action
              </h2>
              <p className="text-sm text-[#AAB4C5] mt-1">
                Select a household task below to see the robot assist in real-time.
              </p>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-3 gap-3 w-full md:w-auto shrink-0 bg-[#0B1020] p-4 rounded-xl border border-[#222D48]">
            <div className="text-center px-2">
              <span className="text-[11px] text-[#AAB4C5] block uppercase font-mono">Battery</span>
              <div className="mt-1">
                <BatteryIndicator percent={robotState.batteryPercent} size="sm" showIcon={false} />
              </div>
            </div>
            <div className="text-center px-2 border-x border-[#222D48]">
              <span className="text-[11px] text-[#AAB4C5] block uppercase font-mono">Location</span>
              <span className="text-xs font-bold text-[#F8FAFC] block mt-1">{robotState.location}</span>
            </div>
            <div className="text-center px-2">
              <span className="text-[11px] text-[#AAB4C5] block uppercase font-mono">Task</span>
              <span className="text-xs font-bold text-[#22C55E] block mt-1">
                {robotState.currentTaskName || 'None'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. AI Smart Suggestion Card */}
      {showAiSuggestion && (
        <div className="surface-card p-5 sm:p-6 border-2 border-[#7C5CFF]/60 bg-gradient-to-r from-[#151D32] to-[#1E1B4B] shadow-lg animate-fade-in">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#7C5CFF]/20 text-[#7C5CFF] flex items-center justify-center shrink-0 border border-[#7C5CFF]/40">
                <Sparkles className="w-6 h-6 animate-pulse text-[#7C5CFF]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#7C5CFF] uppercase tracking-wider font-mono">
                    AI Context Suggestion
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#F8FAFC] mt-0.5">
                  "Would you like the robot to clean the living room?"
                </h3>
                <p className="text-xs text-[#AAB4C5]">
                  AI detected light dust build-up in the main living space.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
              <button
                onClick={onDismissAiSuggestion}
                className="px-5 py-3 rounded-xl bg-[#0B1020] hover:bg-[#1C2742] border border-[#222D48] text-xs font-bold text-[#AAB4C5] hover:text-[#F8FAFC] transition-colors flex-1 sm:flex-none"
              >
                NOT NOW
              </button>
              <button
                onClick={onAcceptAiSuggestion}
                className="btn-primary py-3 px-6 text-xs font-bold flex-1 sm:flex-none"
              >
                YES, CLEAN ROOM
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Quick Actions Section (Clean Room, Deliver Item, Go to Location) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xl font-extrabold text-[#F8FAFC] tracking-tight">
            Quick Actions
          </h3>
          <button
            onClick={onOpenTaskSelection}
            className="text-xs font-bold text-[#4F8CFF] hover:underline flex items-center gap-1 font-mono uppercase"
          >
            <span>View All Tasks</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Action 1: Clean Room */}
          <div
            onClick={() => onSelectQuickAction('CLEAN_ROOM')}
            className="surface-card-interactive p-6 flex flex-col justify-between space-y-4 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-[#4F8CFF]/15 text-[#4F8CFF] flex items-center justify-center group-hover:scale-105 transition-transform border border-[#4F8CFF]/30">
                <SprayCan className="w-7 h-7" />
              </div>
              <span className="text-xs font-mono text-[#AAB4C5] bg-[#0B1020] px-2.5 py-1 rounded-md border border-[#222D48]">
                ~3 MIN
              </span>
            </div>
            <div>
              <h4 className="text-xl font-bold text-[#F8FAFC] group-hover:text-[#4F8CFF] transition-colors">
                Clean Room
              </h4>
              <p className="text-xs text-[#AAB4C5] mt-1 leading-relaxed">
                Autonomous vacuuming and light debris sweep of the selected area.
              </p>
            </div>
            <div className="pt-2 flex items-center justify-between text-xs font-bold text-[#4F8CFF] border-t border-[#222D48]">
              <span>SELECT ROOM</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Action 2: Deliver Item */}
          <div
            onClick={() => onSelectQuickAction('DELIVER_ITEM')}
            className="surface-card-interactive p-6 flex flex-col justify-between space-y-4 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-[#7C5CFF]/15 text-[#7C5CFF] flex items-center justify-center group-hover:scale-105 transition-transform border border-[#7C5CFF]/30">
                <Package className="w-7 h-7" />
              </div>
              <span className="text-xs font-mono text-[#AAB4C5] bg-[#0B1020] px-2.5 py-1 rounded-md border border-[#222D48]">
                ~2 MIN
              </span>
            </div>
            <div>
              <h4 className="text-xl font-bold text-[#F8FAFC] group-hover:text-[#7C5CFF] transition-colors">
                Deliver Item
              </h4>
              <p className="text-xs text-[#AAB4C5] mt-1 leading-relaxed">
                Transport household items (medicine, water, reading glasses) safely.
              </p>
            </div>
            <div className="pt-2 flex items-center justify-between text-xs font-bold text-[#7C5CFF] border-t border-[#222D48]">
              <span>CHOOSE ITEM</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Action 3: Go to Location */}
          <div
            onClick={() => onSelectQuickAction('GO_TO_LOCATION')}
            className="surface-card-interactive p-6 flex flex-col justify-between space-y-4 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-[#22C55E]/15 text-[#22C55E] flex items-center justify-center group-hover:scale-105 transition-transform border border-[#22C55E]/30">
                <MapPin className="w-7 h-7" />
              </div>
              <span className="text-xs font-mono text-[#AAB4C5] bg-[#0B1020] px-2.5 py-1 rounded-md border border-[#222D48]">
                ~1 MIN
              </span>
            </div>
            <div>
              <h4 className="text-xl font-bold text-[#F8FAFC] group-hover:text-[#22C55E] transition-colors">
                Go to Location
              </h4>
              <p className="text-xs text-[#AAB4C5] mt-1 leading-relaxed">
                Navigate the bot to a chosen room or return to charging station.
              </p>
            </div>
            <div className="pt-2 flex items-center justify-between text-xs font-bold text-[#22C55E] border-t border-[#222D48]">
              <span>SELECT SPOT</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Prominent Emergency Stop Row (Accessible from Main Dashboard) */}
      <div className="surface-card p-5 border border-[#EF4444]/30 bg-[#EF4444]/5 flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto">
        <div className="flex items-center gap-3">
          <ShieldAlert className="w-6 h-6 text-[#EF4444]" />
          <div>
            <h4 className="font-bold text-sm text-[#F8FAFC]">Safety & Emergency Control</h4>
            <p className="text-xs text-[#AAB4C5]">Immediate hardware freeze override for museum visitors</p>
          </div>
        </div>
        <button
          onClick={onEmergencyStop}
          className="btn-emergency py-3 px-6 text-sm font-bold w-full sm:w-auto shrink-0"
        >
          EMERGENCY STOP
        </button>
      </div>
    </div>
  );
};
