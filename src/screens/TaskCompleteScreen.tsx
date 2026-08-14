import React from 'react';
import { TaskConfigState } from '../types';
import { RobotVisual } from '../components/common/RobotVisual';
import { CheckCircle2, Home, RotateCcw, Sparkles, Clock, Zap, Check } from 'lucide-react';

interface TaskCompleteScreenProps {
  taskConfig: TaskConfigState;
  duration?: string;
  onBackToDashboard: () => void;
  onRunAnotherTask: () => void;
}

export const TaskCompleteScreen: React.FC<TaskCompleteScreenProps> = ({
  taskConfig,
  duration = '03:24',
  onBackToDashboard,
  onRunAnotherTask,
}) => {
  const getCompletionMessage = () => {
    switch (taskConfig.taskType) {
      case 'DELIVER_ITEM':
        return `${taskConfig.item || 'Item'} successfully delivered to ${taskConfig.room}.`;
      case 'GO_TO_LOCATION':
        return `Robot has arrived and positioned safely in ${taskConfig.room}.`;
      case 'CLEAN_ROOM':
      default:
        return `${taskConfig.room} cleaning is complete.`;
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 sm:p-10 max-w-4xl mx-auto w-full select-none overflow-y-auto">
      {/* Top Banner */}
      <div className="text-center pt-2">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#22C55E]/15 border-2 border-[#22C55E]/50 text-[#22C55E] font-bold text-sm font-mono uppercase tracking-wider mb-3">
          <CheckCircle2 className="w-5 h-5 text-[#22C55E]" />
          TASK COMPLETED
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-[#F8FAFC] tracking-tight">
          {getCompletionMessage()}
        </h2>
      </div>

      {/* Center Details: Cheerful Robot + Telemetry Metrics Box */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center my-6">
        {/* Left: Cheerful Robot Avatar (5 cols) */}
        <div className="md:col-span-5 flex flex-col items-center justify-center">
          <div className="p-6 rounded-3xl bg-[#151D32] border-2 border-[#22C55E]/30 relative">
            <RobotVisual mode="complete" size="lg" />
            <div className="mt-3 text-center">
              <span className="inline-block px-3 py-1 rounded-full bg-[#22C55E]/20 text-[#22C55E] text-xs font-bold font-mono">
                STATUS: READY
              </span>
            </div>
          </div>
        </div>

        {/* Right: Summary Metrics Card (7 cols) */}
        <div className="md:col-span-7 surface-card p-6 border-2 border-[#22C55E]/40 shadow-xl space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#222D48]">
            <Sparkles className="w-5 h-5 text-[#22C55E]" />
            <h3 className="text-lg font-bold text-[#F8FAFC]">Task Execution Summary</h3>
          </div>

          <div className="grid grid-cols-2 gap-3.5 text-xs font-mono">
            {/* Metric 1 */}
            <div className="p-3.5 rounded-xl bg-[#0B1020] border border-[#222D48]">
              <span className="text-[#AAB4C5] block mb-1">Executed Task</span>
              <span className="text-sm font-bold text-[#F8FAFC] font-sans block">
                {taskConfig.title}
              </span>
            </div>

            {/* Metric 2 */}
            <div className="p-3.5 rounded-xl bg-[#0B1020] border border-[#222D48]">
              <span className="text-[#AAB4C5] block mb-1">Target Zone</span>
              <span className="text-sm font-bold text-[#4F8CFF] font-sans block">
                {taskConfig.room}
              </span>
            </div>

            {/* Metric 3 */}
            <div className="p-3.5 rounded-xl bg-[#0B1020] border border-[#222D48]">
              <span className="text-[#AAB4C5] block mb-1">Duration</span>
              <span className="text-sm font-bold text-[#22C55E] flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {duration}
              </span>
            </div>

            {/* Metric 4 */}
            <div className="p-3.5 rounded-xl bg-[#0B1020] border border-[#222D48]">
              <span className="text-[#AAB4C5] block mb-1">Robot Status</span>
              <span className="text-sm font-bold text-[#22C55E] flex items-center gap-1">
                <Check className="w-4 h-4" />
                READY
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/30 text-xs text-[#F8FAFC] leading-relaxed">
            <span className="font-bold text-[#22C55E]">Exhibit Takeaway:</span> Assistive AI robots use optical SLAM navigation and sensor feedback to verify complete household zone sanitation.
          </div>
        </div>
      </div>

      {/* Bottom Main Action Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#222D48]">
        <button
          onClick={onRunAnotherTask}
          className="btn-secondary w-full sm:w-auto py-4 px-8 text-base font-bold flex items-center justify-center gap-3"
        >
          <RotateCcw className="w-5 h-5 text-[#4F8CFF]" />
          <span>SELECT ANOTHER TASK</span>
        </button>

        <button
          onClick={onBackToDashboard}
          className="btn-primary w-full sm:w-auto py-5 px-12 text-lg font-bold flex items-center justify-center gap-3 shadow-xl"
        >
          <Home className="w-6 h-6" />
          <span>BACK TO DASHBOARD</span>
        </button>
      </div>
    </div>
  );
};
