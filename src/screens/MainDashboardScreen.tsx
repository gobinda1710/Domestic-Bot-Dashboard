import React from 'react';
import {
  AccessibilitySettings,
  LanguageCode,
  RobotSystemState,
  RobotTask,
  SensorStatusState,
} from '../types';
import { TRANSLATIONS } from '../data/translations';
import { ROBOT_TASKS } from '../data/robotTasks';
import { LidarCanvas } from '../components/kiosk/LidarCanvas';
import { VisionCanvas } from '../components/kiosk/VisionCanvas';
import { EmgWaveform } from '../components/kiosk/EmgWaveform';
import { SensorGauge } from '../components/common/SensorGauge';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import {
  Sparkles,
  Zap,
  Thermometer,
  ShieldCheck,
  Play,
  Pill,
  ShieldAlert,
  Boxes,
  Dumbbell,
  CheckCircle,
} from 'lucide-react';

interface MainDashboardScreenProps {
  robotState: RobotSystemState;
  sensors: SensorStatusState;
  currentLang: LanguageCode;
  accessibility: AccessibilitySettings;
  onSelectTask: (task: RobotTask) => void;
}

export const MainDashboardScreen: React.FC<MainDashboardScreenProps> = ({
  robotState,
  sensors,
  currentLang,
  accessibility,
  onSelectTask,
}) => {
  const t = TRANSLATIONS[currentLang];

  const getTaskIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-[#00E5FF]" />;
      case 'Pill':
        return <Pill className="w-6 h-6 text-[#00E5FF]" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-6 h-6 text-rose-400" />;
      case 'Boxes':
        return <Boxes className="w-6 h-6 text-amber-400" />;
      case 'Dumbbell':
        return <Dumbbell className="w-6 h-6 text-[#00E5FF]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#00E5FF]" />;
    }
  };

  return (
    <div
      className={`w-full h-full p-4 sm:p-6 overflow-y-auto space-y-6 ${
        accessibility.highContrast ? 'high-contrast bg-black text-white' : 'bg-[#0B0E13] text-gray-200 font-sans'
      }`}
    >
      {/* Top Welcome Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 rounded-2xl bg-[#14181F] border border-gray-800 shadow-xl">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-[#00E5FF]" />
            <h2 className="text-2xl sm:text-3xl font-bold font-sans text-white uppercase tracking-tight">
              AURA-7 OS DASHBOARD
            </h2>
            <Badge variant="cyan" pulse>
              STANDBY READY
            </Badge>
          </div>
          <p className="text-gray-400 text-xs sm:text-sm font-mono mt-1 ml-5">{t.chooseTaskPrompt}</p>
        </div>

        {/* System Vital Quick Metrics */}
        <div className="flex flex-wrap items-center gap-4 font-mono text-xs">
          <div className="px-4 py-2 rounded-xl bg-[#1C232B] border border-gray-800 flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#00E5FF]" />
            <span className="text-gray-500 uppercase">Power:</span>
            <span className="font-bold text-white">{robotState.batteryPercent}%</span>
          </div>

          <div className="px-4 py-2 rounded-xl bg-[#1C232B] border border-gray-800 flex items-center gap-2">
            <Thermometer className="w-4 h-4 text-[#00E5FF]" />
            <span className="text-gray-500 uppercase">Temp:</span>
            <span className="font-bold text-white">{robotState.jointTempCelsius}°C</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Live Sensor Suite (3 Canvases) & Right Task Launcher */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Live Sensor Feeds (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-bold font-mono text-[#00E5FF] flex items-center gap-2 uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4 text-[#00E5FF]" />
              LIDAR & OPTICS NAVIGATION
            </h3>
            <span className="text-[10px] font-mono text-gray-500 uppercase">SCAN_RES: 0.02cm</span>
          </div>

          {/* LiDAR 360° Canvas */}
          <div className="bg-[#14181F] border border-gray-800 rounded-2xl p-5 flex flex-col items-center">
            <LidarCanvas isScanning={true} />
            <div className="w-full mt-3 flex items-center justify-between text-xs font-mono text-gray-500">
              <span>SCAN_SPEED: 600 RPM</span>
              <span className="text-[#00E5FF] font-bold">SPATIAL MAPPING ACTIVE</span>
            </div>
          </div>

          {/* CV Optics Feed Canvas */}
          <div className="bg-[#14181F] border border-gray-800 rounded-2xl p-5 flex flex-col items-center">
            <VisionCanvas
              detectedObjects={ROBOT_TASKS[0].detectedObjects}
              isProcessing={true}
            />
            <div className="w-full mt-3 flex items-center justify-between text-xs font-mono text-gray-500">
              <span>MODEL: YOLOR-v8</span>
              <span className="text-[#00E5FF] font-bold">60 FPS RECOGNITION</span>
            </div>
          </div>

          {/* EMG Muscle Gesture Signal Waveform */}
          <EmgWaveform gestureName="Pinch Grab Signal" signalStrength={94} />
        </div>

        {/* Right Column: Household Mission Scenarios (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-bold font-mono text-white flex items-center gap-2 uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-[#00E5FF]" />
              SELECT ROBOT TASK
            </h3>
            <span className="text-[10px] font-mono text-gray-500 uppercase">CLICK SCENARIO TO INITIATE</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {ROBOT_TASKS.map((task) => (
              <div
                key={task.id}
                onClick={() => onSelectTask(task)}
                className="btn-active bg-[#1C232B] border border-gray-700 hover:border-[#00E5FF] rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer transition-colors group"
              >
                <div className="flex items-start sm:items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#00E5FF]/10 flex items-center justify-center text-[#00E5FF] shrink-0">
                    {getTaskIcon(task.iconName)}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-lg font-bold font-sans text-white group-hover:text-[#00E5FF] transition-colors">
                        {task.title}
                      </h4>
                      <Badge
                        size="sm"
                        variant={
                          task.category === 'CLEANING'
                            ? 'cyan'
                            : task.category === 'HEALTHCARE'
                            ? 'emerald'
                            : task.category === 'SAFETY'
                            ? 'rose'
                            : 'amber'
                        }
                      >
                        {task.category}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-400 line-clamp-2 max-w-xl font-sans">{task.summary}</p>
                    <div className="flex items-center gap-4 text-[11px] font-mono text-gray-500 mt-2">
                      <span>⏱️ EST: {task.estimatedDuration}</span>
                      <span>⚡ ENERGY: -{task.energyCostPercent}%</span>
                      <span>🧠 MODE: {task.difficulty}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectTask(task);
                  }}
                  className="btn-active px-6 py-3 bg-[#00E5FF] text-[#0B0E13] font-bold text-xs uppercase rounded-lg font-mono tracking-wider shrink-0 w-full sm:w-auto"
                >
                  {t.startTask}
                </button>
              </div>
            ))}
          </div>

          {/* System Hardware Gauges Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-800">
            <SensorGauge label="LiDAR RPM" value={600} unit="RPM" max={1000} colorHex="#00E5FF" />
            <SensorGauge label="Optics Latency" value={14} unit="ms" max={50} colorHex="#10B981" />
            <SensorGauge label="Battery Temp" value={32.4} unit="°C" max={60} colorHex="#F59E0B" />
          </div>
        </div>
      </div>
    </div>
  );
};
