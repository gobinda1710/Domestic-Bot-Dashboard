export type ScreenId =
  | 'WELCOME'
  | 'DASHBOARD'
  | 'TASK_SELECTION'
  | 'TASK_CONFIG'
  | 'ROBOT_WORKING'
  | 'TASK_COMPLETE'
  | 'EMERGENCY_STOP';

export type ScreenState = ScreenId;

export type TaskType = 'CLEAN_ROOM' | 'DELIVER_ITEM' | 'GO_TO_LOCATION';

export type RoomId = 'Living Room' | 'Kitchen' | 'Bedroom' | 'Dining Area';

export type DeliveryItem = 'Water Bottle' | 'Prescription Box' | 'Reading Glasses' | 'Clean Towel';

export type RobotStatusCode = 'READY' | 'WORKING' | 'PAUSED' | 'STOPPED';

export type LanguageCode = 'en' | 'es' | 'fr' | 'de' | 'ja' | 'zh';

export interface AccessibilityOptions {
  largeText: boolean;
  highContrast: boolean;
  voiceGuidance: boolean;
  kioskReachMode: boolean;
}

export type AccessibilitySettings = AccessibilityOptions;

export interface TaskConfigState {
  taskType: TaskType;
  title: string;
  room: RoomId;
  item?: DeliveryItem;
  estimatedDuration: string;
  batteryUsagePercent: number;
}

export interface RobotState {
  status: RobotStatusCode;
  batteryPercent: number;
  location: RoomId;
  currentTaskName: string | null;
  activeTaskConfig: TaskConfigState | null;
  workingProgress: number; // 0 to 100
  isWorkingPaused: boolean;
  lastExecutionDuration: string;
}

export interface NotificationItem {
  id: string;
  time: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning';
}

// Legacy compatibility types for existing sub-components
export type SensorHealthStatus = 'ONLINE' | 'CALIBRATING' | 'OFFLINE' | 'WARNING';

export interface SensorStatusState {
  lidar: {
    status: SensorHealthStatus;
    rpm: number;
    pointsPerSec: number;
    fovAngle: number;
  };
  camera: {
    status: SensorHealthStatus;
    fps: number;
    resolution: string;
    detectedObjectsCount: number;
  };
  emg: {
    status: SensorHealthStatus;
    signalStrengthPercent: number;
    lastGestureDetected: string;
  };
  ultrasonic: {
    status: SensorHealthStatus;
    minProximityMeters: number;
  };
}

export interface DetectedObject {
  id: string;
  label: string;
  confidence: number;
  distanceMeters: number;
  colorHex: string;
  bbox: {
    xPercent: number;
    yPercent: number;
    wPercent: number;
    hPercent: number;
  };
}

export interface TaskStep {
  stepNumber: number;
  title: string;
  sensorUsed: 'LiDAR 360°' | 'CV Optics' | 'EMG Wristband' | 'Force Sensor';
  aiThought: string;
  executionTimeSec: number;
}

export interface RobotTask {
  id: string;
  title: string;
  category: 'CLEANING' | 'HEALTHCARE' | 'SAFETY' | 'ORGANIZATION' | 'ASSIST';
  iconName: string;
  estimatedDuration: string;
  energyCostPercent: number;
  summary: string;
  difficulty: 'Basic' | 'Adaptive' | 'High-Precision';
  steps: TaskStep[];
  detectedObjects: DetectedObject[];
  didYouKnowFact: string;
  scienceExplanation: string;
}

export interface RobotSystemState {
  name: string;
  model: string;
  serialNumber: string;
  batteryPercent: number;
  batteryHealthPercent: number;
  powerMode: 'BALANCED' | 'PERFORMANCE' | 'ECO_RESERVE';
  jointTempCelsius: number;
  currentTask: RobotTask | null;
  taskProgressPercent: number;
  currentStepIndex: number;
  isPaused: boolean;
  simulationSpeed: number;
  visitorDistanceMeters: number;
}
