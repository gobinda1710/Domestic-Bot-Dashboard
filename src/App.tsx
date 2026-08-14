import React, { useState, useEffect, useCallback } from 'react';
import { 
  ScreenId, 
  TaskType, 
  RoomId, 
  LanguageCode, 
  AccessibilityOptions, 
  TaskConfigState, 
  RobotState, 
  NotificationItem 
} from './types';
import { Header } from './components/common/Header';
import { DemoScreenBar } from './components/kiosk/DemoScreenBar';
import { 
  LanguageModal, 
  AccessibilityModal, 
  NotificationsModal, 
  SettingsModal 
} from './components/common/Modals';
import { ThumbnailModal } from './components/common/ThumbnailModal';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { TaskSelectionScreen } from './screens/TaskSelectionScreen';
import { TaskConfigScreen } from './screens/TaskConfigScreen';
import { RobotWorkingScreen } from './screens/RobotWorkingScreen';
import { TaskCompleteScreen } from './screens/TaskCompleteScreen';
import { EmergencyStopScreen } from './screens/EmergencyStopScreen';

export default function App() {
  // Current Active Screen
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('WELCOME');
  const [currentLang, setCurrentLang] = useState<LanguageCode>('en');

  // Accessibility Options State
  const [accessibility, setAccessibility] = useState<AccessibilityOptions>({
    largeText: false,
    highContrast: false,
    voiceGuidance: false,
    kioskReachMode: false,
  });

  // Modals Visibility
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [isA11yModalOpen, setIsA11yModalOpen] = useState(false);
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isThumbnailModalOpen, setIsThumbnailModalOpen] = useState(false);

  // Kiosk Viewport Mode (55" Portrait Frame vs Responsive Full)
  const [isKioskFixedFrame, setIsKioskFixedFrame] = useState(false);
  const [sessionSeconds, setSessionSeconds] = useState(0);

  // AI Suggestion on Dashboard
  const [showAiSuggestion, setShowAiSuggestion] = useState(true);

  // Active Task Config State
  const [selectedTaskType, setSelectedTaskType] = useState<TaskType>('CLEAN_ROOM');
  const [activeTaskConfig, setActiveTaskConfig] = useState<TaskConfigState>({
    taskType: 'CLEAN_ROOM',
    title: 'Clean Room',
    room: 'Living Room',
    estimatedDuration: '03:24',
    batteryUsagePercent: 5,
  });

  // Robot State
  const [robotState, setRobotState] = useState<RobotState>({
    status: 'READY',
    batteryPercent: 85,
    location: 'Living Room',
    currentTaskName: null,
    activeTaskConfig: null,
    workingProgress: 0,
    isWorkingPaused: false,
    lastExecutionDuration: '03:24',
  });

  // System Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      time: '10:42 AM',
      title: 'Power Station',
      message: 'Dock recharge completed. Battery at optimal 85%.',
      type: 'info',
    },
    {
      id: '2',
      time: '10:35 AM',
      title: 'LiDAR Calibration',
      message: 'Spatial SLAM map updated for living room and kitchen.',
      type: 'success',
    },
    {
      id: '3',
      time: '10:15 AM',
      title: 'Safety Check',
      message: 'Collision sensors tested and operational.',
      type: 'info',
    },
  ]);

  // Session 90-Second Rule Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionSeconds((prev) => (prev >= 90 ? 0 : prev + 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Voice Guidance Simulation Helper
  const playVoiceGuidance = useCallback((text: string) => {
    if (!accessibility.voiceGuidance) return;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  }, [accessibility.voiceGuidance]);

  // Flow Handlers
  const handleStartExploring = () => {
    setCurrentScreen('DASHBOARD');
    playVoiceGuidance('Welcome to Domestic Bot. System status is ready.');
  };

  const handleSelectQuickAction = (taskType: TaskType) => {
    setSelectedTaskType(taskType);
    setCurrentScreen('TASK_CONFIG');
    playVoiceGuidance(`Configuring task.`);
  };

  const handleOpenTaskSelection = () => {
    setCurrentScreen('TASK_SELECTION');
    playVoiceGuidance('Select a task for the robot.');
  };

  const handleTaskTypeChosen = (type: TaskType) => {
    setSelectedTaskType(type);
    setCurrentScreen('TASK_CONFIG');
  };

  const handleAcceptAiSuggestion = () => {
    const config: TaskConfigState = {
      taskType: 'CLEAN_ROOM',
      title: 'Clean Room',
      room: 'Living Room',
      estimatedDuration: '03:24',
      batteryUsagePercent: 5,
    };
    setActiveTaskConfig(config);
    setRobotState((prev) => ({
      ...prev,
      status: 'WORKING',
      currentTaskName: 'Clean Room (Living Room)',
      workingProgress: 0,
      isWorkingPaused: false,
    }));
    setCurrentScreen('ROBOT_WORKING');
    playVoiceGuidance('Starting living room cleaning as suggested by AI.');
  };

  const handleConfirmTask = (config: TaskConfigState) => {
    setActiveTaskConfig(config);
    setRobotState((prev) => ({
      ...prev,
      status: 'WORKING',
      currentTaskName: `${config.title} (${config.room})`,
      location: config.room,
      workingProgress: 0,
      isWorkingPaused: false,
    }));
    setCurrentScreen('ROBOT_WORKING');
    playVoiceGuidance(`Task confirmed. Robot is now working in ${config.room}.`);
  };

  const handlePauseResumeWorking = () => {
    setRobotState((prev) => {
      const isPaused = !prev.isWorkingPaused;
      playVoiceGuidance(isPaused ? 'Simulation paused.' : 'Simulation resumed.');
      return {
        ...prev,
        status: isPaused ? 'PAUSED' : 'WORKING',
        isWorkingPaused: isPaused,
      };
    });
  };

  const handleTaskComplete = () => {
    setRobotState((prev) => ({
      ...prev,
      status: 'READY',
      batteryPercent: Math.max(75, prev.batteryPercent - 3),
      currentTaskName: null,
      workingProgress: 100,
    }));
    setCurrentScreen('TASK_COMPLETE');
    playVoiceGuidance('Task completed successfully. Returning report.');
  };

  const handleEmergencyStopTrigger = () => {
    setCurrentScreen('EMERGENCY_STOP');
    playVoiceGuidance('Emergency stop requested. Please confirm.');
  };

  const handleConfirmEmergencyStop = () => {
    setRobotState((prev) => ({
      ...prev,
      status: 'STOPPED',
      currentTaskName: null,
      isWorkingPaused: true,
    }));
    playVoiceGuidance('Robot stopped. Hardware freeze engaged.');
  };

  const handleReturnToDashboard = () => {
    setRobotState((prev) => ({
      ...prev,
      status: 'READY',
      currentTaskName: null,
      workingProgress: 0,
      isWorkingPaused: false,
    }));
    setCurrentScreen('DASHBOARD');
    playVoiceGuidance('Returned to dashboard.');
  };

  const handleResetExhibit = () => {
    setCurrentScreen('WELCOME');
    setShowAiSuggestion(true);
    setSessionSeconds(0);
    setRobotState({
      status: 'READY',
      batteryPercent: 85,
      location: 'Living Room',
      currentTaskName: null,
      activeTaskConfig: null,
      workingProgress: 0,
      isWorkingPaused: false,
      lastExecutionDuration: '03:24',
    });
  };

  const handleToggleA11yOption = (key: keyof AccessibilityOptions) => {
    setAccessibility((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div
      className={`min-h-screen w-full bg-[#0B1020] text-[#F8FAFC] flex flex-col font-sans transition-all ${
        accessibility.highContrast ? 'high-contrast' : ''
      } ${accessibility.largeText ? 'large-text' : ''}`}
    >
      {/* 1. Evaluation & Figma html.to.design Screen Switcher Bar */}
      <DemoScreenBar
        currentScreen={currentScreen}
        onSelectScreen={(s) => {
          if (s === 'ROBOT_WORKING' && robotState.status !== 'WORKING') {
            setRobotState((prev) => ({ ...prev, status: 'WORKING', workingProgress: 45 }));
          }
          setCurrentScreen(s);
        }}
        isKioskFixedFrame={isKioskFixedFrame}
        onToggleFixedFrame={() => setIsKioskFixedFrame(!isKioskFixedFrame)}
        onResetExhibit={handleResetExhibit}
        secondsElapsed={sessionSeconds}
        onOpenThumbnailModal={() => setIsThumbnailModalOpen(true)}
      />

      {/* Outer Viewport Wrapper (Handles 55-inch portrait 1080x1920 preview or Responsive Fill) */}
      <div className="flex-1 w-full flex items-center justify-center p-0 md:p-3 bg-[#080C18]">
        <div
          className={`kiosk-container w-full flex flex-col shadow-2xl transition-all duration-300 relative ${
            isKioskFixedFrame
              ? 'max-w-[540px] aspect-[9/16] min-h-[960px] border-4 border-[#222D48] rounded-3xl my-4'
              : 'max-w-[1080px] min-h-screen md:min-h-[94vh] md:my-2 md:rounded-3xl border-0 md:border border-[#222D48]'
          } ${accessibility.kioskReachMode ? 'pt-16 sm:pt-28' : ''}`}
        >
          {/* Header Bar (Shown across all screens for consistent Robot Status, Battery, Location, and Emergency Stop) */}
          <Header
            status={robotState.status}
            batteryPercent={robotState.batteryPercent}
            location={robotState.location}
            unreadNotificationsCount={notifications.length}
            onOpenLanguage={() => setIsLanguageModalOpen(true)}
            onOpenAccessibility={() => setIsA11yModalOpen(true)}
            onOpenNotifications={() => setIsNotificationsModalOpen(true)}
            onOpenSettings={() => setIsSettingsModalOpen(true)}
            onEmergencyStop={handleEmergencyStopTrigger}
            onLogoClick={() => setCurrentScreen('DASHBOARD')}
            showEmergencyStop={currentScreen !== 'EMERGENCY_STOP'}
          />

          {/* Screen 1: Welcome / Idle */}
          {currentScreen === 'WELCOME' && (
            <WelcomeScreen
              onStartExploring={handleStartExploring}
              onOpenLanguage={() => setIsLanguageModalOpen(true)}
              onOpenAccessibility={() => setIsA11yModalOpen(true)}
            />
          )}

          {/* Screen 2: Main Dashboard */}
          {currentScreen === 'DASHBOARD' && (
            <DashboardScreen
              robotState={robotState}
              onSelectQuickAction={handleSelectQuickAction}
              onOpenTaskSelection={handleOpenTaskSelection}
              onAcceptAiSuggestion={handleAcceptAiSuggestion}
              onDismissAiSuggestion={() => setShowAiSuggestion(false)}
              showAiSuggestion={showAiSuggestion}
              onEmergencyStop={handleEmergencyStopTrigger}
            />
          )}

          {/* Screen 3: Task Selection */}
          {currentScreen === 'TASK_SELECTION' && (
            <TaskSelectionScreen
              onSelectTaskType={handleTaskTypeChosen}
              onBack={() => setCurrentScreen('DASHBOARD')}
            />
          )}

          {/* Screen 4: Task Configuration */}
          {currentScreen === 'TASK_CONFIG' && (
            <TaskConfigScreen
              taskType={selectedTaskType}
              onConfirmTask={handleConfirmTask}
              onBack={() => setCurrentScreen('TASK_SELECTION')}
            />
          )}

          {/* Screen 5: Robot Working */}
          {currentScreen === 'ROBOT_WORKING' && (
            <RobotWorkingScreen
              taskConfig={activeTaskConfig}
              robotState={robotState}
              onPauseResume={handlePauseResumeWorking}
              onEmergencyStop={handleEmergencyStopTrigger}
              onCompleteTask={handleTaskComplete}
              setProgress={(updater) => {
                setRobotState((prev) => ({
                  ...prev,
                  workingProgress: typeof updater === 'function' ? updater(prev.workingProgress) : updater,
                }));
              }}
            />
          )}

          {/* Screen 6: Task Complete */}
          {currentScreen === 'TASK_COMPLETE' && (
            <TaskCompleteScreen
              taskConfig={activeTaskConfig}
              duration={robotState.lastExecutionDuration}
              onBackToDashboard={handleReturnToDashboard}
              onRunAnotherTask={() => setCurrentScreen('TASK_SELECTION')}
            />
          )}

          {/* Screen 7: Emergency Stop */}
          {currentScreen === 'EMERGENCY_STOP' && (
            <EmergencyStopScreen
              onCancel={() => setCurrentScreen('DASHBOARD')}
              onConfirmStop={handleConfirmEmergencyStop}
              onReturnToDashboard={handleReturnToDashboard}
              initialStoppedState={robotState.status === 'STOPPED'}
            />
          )}
        </div>
      </div>

      {/* Global Modals */}
      <LanguageModal
        isOpen={isLanguageModalOpen}
        onClose={() => setIsLanguageModalOpen(false)}
        currentLang={currentLang}
        onSelectLang={(l) => {
          setCurrentLang(l);
          playVoiceGuidance(`Language set to ${l}`);
        }}
      />

      <AccessibilityModal
        isOpen={isA11yModalOpen}
        onClose={() => setIsA11yModalOpen(false)}
        options={accessibility}
        onToggleOption={handleToggleA11yOption}
      />

      <NotificationsModal
        isOpen={isNotificationsModalOpen}
        onClose={() => setIsNotificationsModalOpen(false)}
        notifications={notifications}
        onClear={() => setNotifications([])}
      />

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        onResetAll={handleResetExhibit}
      />

      <ThumbnailModal
        isOpen={isThumbnailModalOpen}
        onClose={() => setIsThumbnailModalOpen(false)}
      />
    </div>
  );
}
