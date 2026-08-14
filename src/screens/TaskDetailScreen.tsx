import React, { useEffect, useState } from 'react';
import {
  AccessibilitySettings,
  LanguageCode,
  RobotSystemState,
  RobotTask,
  SensorStatusState,
} from '../types';
import { TRANSLATIONS } from '../data/translations';
import { LidarCanvas } from '../components/kiosk/LidarCanvas';
import { VisionCanvas } from '../components/kiosk/VisionCanvas';
import { ProgressIndicator } from '../components/common/ProgressIndicator';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import {
  Brain,
  Pause,
  Play,
  FastForward,
  ShieldAlert,
  ArrowLeft,
  Activity,
  CheckCircle2,
} from 'lucide-react';

interface TaskDetailScreenProps {
  task: RobotTask;
  robotState: RobotSystemState;
  sensors: SensorStatusState;
  currentLang: LanguageCode;
  accessibility: AccessibilitySettings;
  onUpdateRobotState: (updater: (prev: RobotSystemState) => RobotSystemState) => void;
  onCompleteTask: () => void;
  onBackToDashboard: () => void;
}

export const TaskDetailScreen: React.FC<TaskDetailScreenProps> = ({
  task,
  robotState,
  currentLang,
  accessibility,
  onUpdateRobotState,
  onCompleteTask,
  onBackToDashboard,
}) => {
  const t = TRANSLATIONS[currentLang];

  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [safetyObstacleTriggered, setSafetyObstacleTriggered] = useState<boolean>(false);
  const [thoughtLog, setThoughtLog] = useState<string[]>([]);

  const currentStep = task.steps[currentStepIdx] || task.steps[0];

  // Auto-step advancement loop
  useEffect(() => {
    if (isPaused) return;

    // Log current step thought
    setThoughtLog((prev) => [
      `[${new Date().toLocaleTimeString()}] Phase ${currentStepIdx + 1}: ${currentStep.aiThought}`,
      ...prev.slice(0, 8),
    ]);

    const stepDurationMs = (currentStep.executionTimeSec * 1000) / speedMultiplier;

    const timer = setTimeout(() => {
      if (currentStepIdx < task.steps.length - 1) {
        setCurrentStepIdx((prev) => prev + 1);
        onUpdateRobotState((prev) => ({
          ...prev,
          taskProgressPercent: Math.round(((currentStepIdx + 1) / task.steps.length) * 100),
          currentStepIndex: currentStepIdx + 1,
        }));
      } else {
        // Task completed!
        onCompleteTask();
      }
    }, stepDurationMs);

    return () => clearTimeout(timer);
  }, [currentStepIdx, isPaused, speedMultiplier, task.steps, currentStep]);

  const handleTriggerObstacle = () => {
    setSafetyObstacleTriggered(true);
    setIsPaused(true);
    setThoughtLog((prev) => [
      `[${new Date().toLocaleTimeString()}] ⚠️ HUMAN OBSTACLE SIMULATION DETECTED! Executing immediate e-stop safety buffer & path recalculation!`,
      ...prev,
    ]);

    setTimeout(() => {
      setSafetyObstacleTriggered(false);
      setIsPaused(false);
    }, 2500);
  };

  return (
    <div
      className={`w-full h-full p-4 sm:p-6 overflow-y-auto space-y-6 ${
        accessibility.highContrast ? 'high-contrast bg-black text-white' : 'bg-[#0B0E13] text-gray-200 font-sans'
      }`}
    >
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#14181F] border border-gray-800">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToDashboard}
            className="btn-active p-3 rounded-xl bg-[#1C232B] border border-gray-700 hover:border-[#00E5FF] text-gray-300 transition-colors flex items-center gap-2 font-mono text-xs uppercase"
          >
            <ArrowLeft className="w-4 h-4 text-[#00E5FF]" />
            <span>BACK</span>
          </button>

          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold font-sans text-white uppercase tracking-tight">{task.title}</h2>
              <Badge variant="cyan" pulse>
                SIMULATION RUNNING
              </Badge>
            </div>
            <p className="text-xs font-mono text-gray-500 mt-1">{t.taskDetailHeading}</p>
          </div>
        </div>

        {/* Speed & Pause Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="btn-active px-5 py-2.5 bg-[#00E5FF] text-[#0B0E13] font-bold text-xs uppercase rounded-xl font-mono tracking-wider flex items-center gap-2 glow-cyan"
          >
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            <span>{isPaused ? t.resumeSimulation : t.pauseSimulation}</span>
          </button>

          <div className="flex items-center gap-1 bg-[#1C232B] p-1.5 rounded-xl border border-gray-800 font-mono text-xs">
            <span className="text-gray-500 px-2 uppercase">Speed:</span>
            {[0.5, 1, 1.5, 2].map((s) => (
              <button
                key={s}
                onClick={() => setSpeedMultiplier(s)}
                className={`btn-active px-3 py-1 rounded-lg font-bold transition-all ${
                  speedMultiplier === s
                    ? 'bg-[#00E5FF] text-[#0B0E13]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Trajectory Progress Steps */}
      <ProgressIndicator steps={task.steps} currentStepIndex={currentStepIdx} />

      {/* Main Grid: Left Neural Thought Log & Right Dual Canvases */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: AI Neural Decision Engine & Safety Brake Trigger (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#14181F] border border-gray-800 rounded-2xl p-6 glow-cyan">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <Brain className="w-6 h-6 text-[#00E5FF] animate-pulse" />
                <h3 className="text-lg font-bold font-sans text-white uppercase tracking-wide">
                  {t.robotThinking}
                </h3>
              </div>
              <Badge variant="emerald" size="sm">
                99.4% PRECISION
              </Badge>
            </div>

            {/* Current Step Active Thought Highlight */}
            <div className="p-4 rounded-xl bg-black/60 border border-[#00E5FF]/50 text-cyan-100 font-mono text-xs leading-relaxed mb-4">
              <div className="text-[10px] font-bold text-[#00E5FF] uppercase mb-1">
                Active Phase 0{currentStep.stepNumber}: {currentStep.title}
              </div>
              <p className="text-sm font-semibold">{currentStep.aiThought}</p>
            </div>

            {/* Live Stream Terminal Thought History */}
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1 font-mono text-xs text-gray-300">
              <span className="text-gray-500 font-bold tracking-widest uppercase text-[10px]">
                Thought Telemetry Stream:
              </span>
              {thoughtLog.map((log, i) => (
                <div key={i} className="p-2 rounded-lg bg-[#1C232B] border border-gray-800 text-[11px]">
                  {log}
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Safety Obstacle Simulation Button */}
          <div className="bg-[#14181F] border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-400" />
                <h4 className="font-bold font-sans text-white text-sm uppercase">Human Obstacle Safety Test</h4>
              </div>
              {safetyObstacleTriggered && (
                <Badge variant="rose" pulse>
                  OBSTACLE DETECTED
                </Badge>
              )}
            </div>
            <p className="text-xs text-gray-400 mb-4 font-mono">
              Tap below to simulate a child stepping into the robot's work area. Watch AURA-7 freeze and recalculate.
            </p>
            <button
              onClick={handleTriggerObstacle}
              className="btn-active w-full py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase rounded-xl font-mono tracking-wider border border-rose-400 glow-rose"
              disabled={safetyObstacleTriggered}
            >
              {t.safetyOverride}
            </button>
          </div>
        </div>

        {/* Right Column: Dual Live Canvases (LiDAR + CV Camera) (7 cols) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* LiDAR Point Cloud Canvas */}
          <div className="bg-[#14181F] border border-gray-800 rounded-2xl p-5 flex flex-col items-center">
            <h4 className="text-xs font-mono font-bold text-[#00E5FF] mb-3 uppercase flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#00E5FF]" />
              {t.liveLidarView}
            </h4>
            <LidarCanvas isScanning={!isPaused} />
          </div>

          {/* CV Camera Feed Canvas */}
          <div className="bg-[#14181F] border border-gray-800 rounded-2xl p-5 flex flex-col items-center">
            <h4 className="text-xs font-mono font-bold text-emerald-400 mb-3 uppercase flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              {t.liveVisionView}
            </h4>
            <VisionCanvas detectedObjects={task.detectedObjects} isProcessing={!isPaused} />
          </div>
        </div>
      </div>
    </div>
  );
};
