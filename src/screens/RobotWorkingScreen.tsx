import React, { useEffect } from 'react';
import { TaskConfigState, RobotState } from '../types';
import { RobotVisual } from '../components/common/RobotVisual';
import { BatteryIndicator } from '../components/common/BatteryIndicator';
import { 
  Play, 
  Pause, 
  ShieldAlert, 
  FastForward, 
  Activity, 
  MapPin, 
  Sparkles,
  CheckCircle2,
  SprayCan,
  Package,
  Compass
} from 'lucide-react';

interface RobotWorkingScreenProps {
  taskConfig: TaskConfigState;
  robotState: RobotState;
  onPauseResume: () => void;
  onEmergencyStop: () => void;
  onCompleteTask: () => void;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
}

export const RobotWorkingScreen: React.FC<RobotWorkingScreenProps> = ({
  taskConfig,
  robotState,
  onPauseResume,
  onEmergencyStop,
  onCompleteTask,
  setProgress,
}) => {
  // Automated progressive simulation timer
  useEffect(() => {
    if (robotState.isWorkingPaused) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          onCompleteTask();
          return 100;
        }
        // Increment progress smoothly
        return Math.min(100, prev + 2);
      });
    }, 200);

    return () => clearInterval(interval);
  }, [robotState.isWorkingPaused, onCompleteTask, setProgress]);

  const getTaskStatusMessage = () => {
    if (robotState.workingProgress < 25) {
      return `Robot is scanning and mapping the ${taskConfig.room}...`;
    } else if (robotState.workingProgress < 60) {
      if (taskConfig.taskType === 'CLEAN_ROOM') {
        return `Robot is actively vacuuming and cleaning the ${taskConfig.room} floor.`;
      } else if (taskConfig.taskType === 'DELIVER_ITEM') {
        return `Robot is carrying ${taskConfig.item || 'item'} safely towards ${taskConfig.room}.`;
      } else {
        return `Robot is navigating optimal trajectory to ${taskConfig.room}.`;
      }
    } else if (robotState.workingProgress < 90) {
      return `Finalizing pass and verifying safety perimeter in ${taskConfig.room}...`;
    } else {
      return `Task finishing. Preparing summary report...`;
    }
  };

  const getTaskIcon = () => {
    switch (taskConfig.taskType) {
      case 'DELIVER_ITEM':
        return <Package className="w-6 h-6 text-[#7C5CFF]" />;
      case 'GO_TO_LOCATION':
        return <Compass className="w-6 h-6 text-[#22C55E]" />;
      case 'CLEAN_ROOM':
      default:
        return <SprayCan className="w-6 h-6 text-[#4F8CFF]" />;
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 sm:p-10 max-w-4xl mx-auto w-full select-none overflow-y-auto">
      {/* Top Working State Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#151D32] border-2 border-[#4F8CFF]/40 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#4F8CFF]/15 border border-[#4F8CFF]/40 flex items-center justify-center">
            {getTaskIcon()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4F8CFF] animate-pulse" />
              <h2 className="text-xl sm:text-2xl font-black text-[#F8FAFC] tracking-tight uppercase">
                ROBOT WORKING
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#AAB4C5] font-mono mt-0.5">
              Task: {taskConfig.title} — {taskConfig.room}
            </p>
          </div>
        </div>

        {/* Live Metrics: Location & Battery */}
        <div className="flex items-center gap-4 bg-[#0B1020] px-4 py-2.5 rounded-xl border border-[#222D48]">
          <div className="flex items-center gap-1.5 pr-3 border-r border-[#222D48]">
            <MapPin className="w-4 h-4 text-[#7C5CFF]" />
            <span className="text-xs font-bold text-[#F8FAFC]">{taskConfig.room}</span>
          </div>
          <div>
            <BatteryIndicator percent={82} size="sm" />
          </div>
        </div>
      </div>

      {/* Center Dynamic Visual: Robot Visual + Large Visual Progress Indicator */}
      <div className="surface-card p-8 my-6 border-2 border-[#222D48] flex flex-col items-center justify-center text-center space-y-6 relative overflow-hidden">
        {/* Animated Working Robot Avatar */}
        <div className="relative">
          <RobotVisual mode={robotState.isWorkingPaused ? 'idle' : 'working'} size="lg" />
          {robotState.isWorkingPaused && (
            <div className="absolute inset-0 bg-[#0B1020]/75 backdrop-blur-xs rounded-full flex items-center justify-center text-xs font-mono font-bold text-[#F59E0B] border border-[#F59E0B]/40">
              SIMULATION PAUSED
            </div>
          )}
        </div>

        {/* Large Visual Progress Indicator */}
        <div className="w-full max-w-lg space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-[#AAB4C5]">
            <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[#4F8CFF]">
              <Activity className="w-4 h-4 text-[#4F8CFF] animate-pulse" />
              Live Execution Progress
            </span>
            <span className="text-2xl font-black text-[#F8FAFC]">{robotState.workingProgress}%</span>
          </div>

          {/* High Contrast Progress Bar */}
          <div className="w-full h-5 bg-[#0B1020] rounded-full border-2 border-[#222D48] p-0.5 overflow-hidden relative">
            <div
              className="h-full rounded-full transition-all duration-300 bg-gradient-to-r from-[#4F8CFF] to-[#7C5CFF]"
              style={{ width: `${robotState.workingProgress}%` }}
            />
          </div>

          {/* Descriptive Feedback Message */}
          <div className="p-4 rounded-xl bg-[#0B1020] border border-[#222D48] text-sm font-medium text-[#F8FAFC] flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-[#4F8CFF] shrink-0" />
            <span>{getTaskStatusMessage()}</span>
          </div>
        </div>

        {/* Simulation Fast-Forward for 90s rule museum visitors */}
        <button
          onClick={() => setProgress(100)}
          className="text-xs font-bold font-mono text-[#4F8CFF] hover:underline flex items-center gap-1 opacity-80 hover:opacity-100"
        >
          <FastForward className="w-3.5 h-3.5" />
          <span>[Exhibit Fast-Forward to 100%]</span>
        </button>
      </div>

      {/* Bottom Controls: PAUSE / RESUME and EMERGENCY STOP (Visually Separated) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#222D48]">
        {/* Normal Action: PAUSE / RESUME */}
        <button
          onClick={onPauseResume}
          className="btn-secondary w-full sm:w-auto py-4 px-8 text-base font-bold flex items-center justify-center gap-3"
        >
          {robotState.isWorkingPaused ? (
            <>
              <Play className="w-5 h-5 text-[#22C55E]" />
              <span>RESUME TASK</span>
            </>
          ) : (
            <>
              <Pause className="w-5 h-5 text-[#F59E0B]" />
              <span>PAUSE</span>
            </>
          )}
        </button>

        {/* Distinct Emergency Stop Button */}
        <button
          onClick={onEmergencyStop}
          className="btn-emergency w-full sm:w-auto py-4 px-10 text-base font-bold flex items-center justify-center gap-3"
        >
          <ShieldAlert className="w-5 h-5 text-white" />
          <span>EMERGENCY STOP</span>
        </button>
      </div>
    </div>
  );
};
