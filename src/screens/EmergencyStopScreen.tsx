import React, { useState } from 'react';
import { RobotVisual } from '../components/common/RobotVisual';
import { ShieldAlert, AlertTriangle, Home, X, CheckCircle, RotateCcw } from 'lucide-react';

interface EmergencyStopScreenProps {
  onCancel: () => void;
  onConfirmStop: () => void;
  onReturnToDashboard: () => void;
  initialStoppedState?: boolean;
}

export const EmergencyStopScreen: React.FC<EmergencyStopScreenProps> = ({
  onCancel,
  onConfirmStop,
  onReturnToDashboard,
  initialStoppedState = false,
}) => {
  const [isStopped, setIsStopped] = useState(initialStoppedState);

  const handleStopExecution = () => {
    setIsStopped(true);
    onConfirmStop();
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 sm:p-10 max-w-4xl mx-auto w-full select-none overflow-y-auto">
      {!isStopped ? (
        /* STATE A: Emergency Confirmation Dialog */
        <div className="surface-card p-8 sm:p-12 my-auto border-4 border-[#EF4444] shadow-2xl bg-[#151D32] flex flex-col items-center text-center space-y-6 animate-fade-in">
          {/* Warning Icon Ring */}
          <div className="w-24 h-24 rounded-full bg-[#EF4444]/20 border-4 border-[#EF4444] flex items-center justify-center text-[#EF4444] animate-bounce">
            <ShieldAlert className="w-12 h-12" />
          </div>

          <div className="space-y-3 max-w-lg">
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#EF4444]/20 border border-[#EF4444]/50 text-xs font-bold font-mono text-[#EF4444] uppercase tracking-wider">
              Emergency Safety Override
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#F8FAFC]">
              Stop Robot?
            </h2>
            <p className="text-base sm:text-lg text-[#AAB4C5] leading-relaxed">
              The robot will stop its current task immediately. All active actuators and navigation routines will freeze safely.
            </p>
          </div>

          {/* Action Buttons: CANCEL vs STOP ROBOT */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md pt-4">
            <button
              onClick={onCancel}
              className="btn-secondary py-5 px-8 text-lg font-bold flex items-center justify-center gap-2 order-2 sm:order-1"
            >
              <X className="w-6 h-6" />
              <span>CANCEL</span>
            </button>

            <button
              onClick={handleStopExecution}
              className="btn-emergency py-5 px-8 text-lg font-extrabold flex items-center justify-center gap-2 order-1 sm:order-2 shadow-2xl"
            >
              <ShieldAlert className="w-6 h-6" />
              <span>STOP ROBOT</span>
            </button>
          </div>
        </div>
      ) : (
        /* STATE B: Robot Stopped State */
        <div className="surface-card p-8 sm:p-12 my-auto border-4 border-[#EF4444]/80 shadow-2xl bg-[#151D32] flex flex-col items-center text-center space-y-6 animate-fade-in">
          {/* Deactivated Robot Visual */}
          <div className="relative">
            <RobotVisual mode="stopped" size="lg" />
            <div className="absolute -bottom-2 -right-2 px-3 py-1 rounded-full bg-[#EF4444] text-white font-mono font-bold text-xs">
              STOPPED
            </div>
          </div>

          <div className="space-y-3 max-w-lg">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EF4444]/20 border border-[#EF4444]/50 text-xs font-bold font-mono text-[#EF4444] uppercase tracking-wider">
              <CheckCircle className="w-4 h-4 text-[#EF4444]" />
              HARDWARE FREEZE ENGAGED
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#F8FAFC]">
              Robot Stopped
            </h2>
            <p className="text-base sm:text-lg text-[#AAB4C5] leading-relaxed">
              Current task has been safely stopped. The robot is in safe idle lock and ready to return to the dashboard.
            </p>
          </div>

          <div className="w-full max-w-md pt-4">
            <button
              onClick={onReturnToDashboard}
              className="btn-primary w-full py-5 px-10 text-lg font-bold flex items-center justify-center gap-3 shadow-xl"
            >
              <Home className="w-6 h-6" />
              <span>RETURN TO DASHBOARD</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
