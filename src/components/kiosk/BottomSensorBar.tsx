import React from 'react';
import {
  AccessibilitySettings,
  LanguageCode,
  SensorStatusState,
} from '../../types';
import { TRANSLATIONS } from '../../data/translations';
import { Radar, Camera, Activity, AlertOctagon, Maximize2 } from 'lucide-react';
import { Badge } from '../common/Badge';

interface BottomSensorBarProps {
  sensors: SensorStatusState;
  currentLang: LanguageCode;
  accessibility: AccessibilitySettings;
  onUpdateAccessibility: (settings: Partial<AccessibilitySettings>) => void;
  onEmergencyStop: () => void;
  visitorDistanceMeters: number;
}

export const BottomSensorBar: React.FC<BottomSensorBarProps> = ({
  sensors,
  currentLang,
  accessibility,
  onUpdateAccessibility,
  onEmergencyStop,
  visitorDistanceMeters,
}) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <footer
      className={`w-full py-3 px-8 border-t flex flex-wrap items-center justify-between gap-4 font-mono text-xs transition-all z-50 ${
        accessibility.highContrast
          ? 'bg-black text-white border-cyan-400 border-t-4'
          : 'status-bar-bg border-gray-800 text-gray-300'
      }`}
    >
      {/* Sensor Suite Readiness Indicators */}
      <div className="flex flex-wrap items-center gap-4">
        <span className="font-bold text-gray-500 text-xs tracking-widest uppercase flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
          {t.sensorSuite}:
        </span>

        {/* LiDAR */}
        <div className="flex items-center gap-2 bg-[#14181F] px-3 py-1.5 rounded-lg border border-gray-800">
          <Radar className="w-4 h-4 text-[#00E5FF]" />
          <span className="font-bold text-gray-200">LIDAR: OK</span>
          <Badge size="sm" variant={sensors.lidar.status === 'ONLINE' ? 'cyan' : 'amber'}>
            {sensors.lidar.rpm} RPM
          </Badge>
        </div>

        {/* Vision Optics */}
        <div className="flex items-center gap-2 bg-[#14181F] px-3 py-1.5 rounded-lg border border-gray-800">
          <Camera className="w-4 h-4 text-[#00E5FF]" />
          <span className="font-bold text-gray-200">VISION: OK</span>
          <Badge size="sm" variant={sensors.camera.status === 'ONLINE' ? 'cyan' : 'amber'}>
            {sensors.camera.fps} FPS
          </Badge>
        </div>

        {/* EMG Gesture */}
        <div className="flex items-center gap-2 bg-[#14181F] px-3 py-1.5 rounded-lg border border-gray-800">
          <Activity className="w-4 h-4 text-amber-400" />
          <span className="font-bold text-gray-200">EMG BAND</span>
          <Badge size="sm" variant={sensors.emg.status === 'ONLINE' ? 'amber' : 'slate'}>
            {sensors.emg.signalStrengthPercent}%
          </Badge>
        </div>

        {/* Visitor Proximity */}
        <div className="hidden xl:flex items-center gap-2 bg-[#14181F] px-3 py-1.5 rounded-lg border border-gray-800">
          <span className="text-[#00E5FF] font-bold">🚶 PROXIMITY:</span>
          <span className="text-white font-extrabold font-mono">{visitorDistanceMeters.toFixed(1)}m</span>
        </div>
      </div>

      {/* Emergency & Reach Control */}
      <div className="flex items-center gap-3 ml-auto">
        <div className="text-[10px] text-gray-600 font-mono tracking-widest hidden md:block mr-4">
          MUSEUM OF FUTURE TECH • EXHIBIT 402
        </div>

        {/* Reach Mode Toggle Quick Button */}
        <button
          onClick={() =>
            onUpdateAccessibility({ kioskReachMode: !accessibility.kioskReachMode })
          }
          className={`btn-active px-3 py-1.5 rounded-lg border flex items-center gap-2 font-bold text-xs uppercase transition-all ${
            accessibility.kioskReachMode
              ? 'bg-amber-500 text-slate-950 border-amber-300'
              : 'bg-[#14181F] border-gray-800 text-gray-400 hover:text-white hover:border-[#00E5FF]'
          }`}
          title="Lower interface height for children / wheelchair accessibility"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span>{accessibility.kioskReachMode ? 'REACH ACTIVE' : 'REACH MODE'}</span>
        </button>

        {/* Emergency Stop Button */}
        <button
          onClick={onEmergencyStop}
          className="btn-active px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold border border-rose-400 flex items-center gap-2 glow-rose text-xs uppercase"
          aria-label={t.emergencyStop}
        >
          <AlertOctagon className="w-4 h-4 animate-pulse" />
          <span>{t.emergencyStop}</span>
        </button>
      </div>
    </footer>
  );
};
