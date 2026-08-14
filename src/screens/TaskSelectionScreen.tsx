import React, { useState } from 'react';
import { TaskType } from '../types';
import { SprayCan, Package, MapPin, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

interface TaskSelectionScreenProps {
  onSelectTaskType: (type: TaskType) => void;
  onBack: () => void;
}

export const TaskSelectionScreen: React.FC<TaskSelectionScreenProps> = ({
  onSelectTaskType,
  onBack,
}) => {
  const [selectedType, setSelectedType] = useState<TaskType>('CLEAN_ROOM');

  const tasks: {
    type: TaskType;
    icon: React.ReactNode;
    title: string;
    description: string;
    details: string;
    iconBg: string;
    iconColor: string;
  }[] = [
    {
      type: 'CLEAN_ROOM',
      icon: <SprayCan className="w-9 h-9" />,
      title: 'Clean Room',
      description: 'Clean a selected room.',
      details: 'Sweeps, vacuums, and clears light obstacles in the designated household zone.',
      iconBg: 'bg-[#4F8CFF]/15 border-[#4F8CFF]/30',
      iconColor: 'text-[#4F8CFF]',
    },
    {
      type: 'DELIVER_ITEM',
      icon: <Package className="w-9 h-9" />,
      title: 'Deliver Item',
      description: 'Deliver an item to a specific room.',
      details: 'Transports household supplies, water bottles, and medicine boxes carefully.',
      iconBg: 'bg-[#7C5CFF]/15 border-[#7C5CFF]/30',
      iconColor: 'text-[#7C5CFF]',
    },
    {
      type: 'GO_TO_LOCATION',
      icon: <MapPin className="w-9 h-9" />,
      title: 'Go to Location',
      description: 'Navigate robot to a target area.',
      details: 'Dispatches the robot to patrol or position itself in a specific room.',
      iconBg: 'bg-[#22C55E]/15 border-[#22C55E]/30',
      iconColor: 'text-[#22C55E]',
    },
  ];

  return (
    <div className="flex-1 flex flex-col justify-between p-6 sm:p-10 max-w-4xl mx-auto w-full select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#151D32] hover:bg-[#1C2742] border border-[#222D48] text-xs font-bold text-[#AAB4C5] hover:text-[#F8FAFC] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO DASHBOARD</span>
        </button>
        <span className="text-xs font-mono text-[#AAB4C5] uppercase">Step 1 of 2: Task Choice</span>
      </div>

      {/* Main Title */}
      <div className="text-center my-4 space-y-2">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F8FAFC]">
          What would you like the robot to do?
        </h2>
        <p className="text-sm sm:text-base text-[#AAB4C5] max-w-lg mx-auto">
          Tap one of the primary assistive capabilities below to configure its task.
        </p>
      </div>

      {/* Large Touch-Friendly Task Cards */}
      <div className="grid grid-cols-1 gap-4 my-auto">
        {tasks.map((task) => {
          const isSelected = selectedType === task.type;
          return (
            <div
              key={task.type}
              onClick={() => setSelectedType(task.type)}
              className={`p-6 sm:p-8 rounded-2xl cursor-pointer transition-all flex items-start sm:items-center justify-between gap-6 ${
                isSelected
                  ? 'surface-card-selected'
                  : 'surface-card hover:border-[#4F8CFF]/50'
              }`}
            >
              <div className="flex items-start sm:items-center gap-5">
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shrink-0 border ${task.iconBg} ${task.iconColor}`}
                >
                  {task.icon}
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-bold text-[#F8FAFC]">{task.title}</h3>
                    {isSelected && (
                      <span className="flex items-center gap-1 text-xs font-bold text-[#4F8CFF] bg-[#4F8CFF]/15 px-3 py-1 rounded-full border border-[#4F8CFF]/30 font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        SELECTED
                      </span>
                    )}
                  </div>
                  <p className="text-base font-semibold text-[#4F8CFF] mt-1">{task.description}</p>
                  <p className="text-xs text-[#AAB4C5] mt-1 hidden sm:block">{task.details}</p>
                </div>
              </div>

              {/* Radio Indicator */}
              <div
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                  isSelected ? 'border-[#4F8CFF] bg-[#4F8CFF]' : 'border-[#222D48] bg-[#0B1020]'
                }`}
              >
                {isSelected && <div className="w-3 h-3 rounded-full bg-[#0B1020]" />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Continue Action */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#222D48]">
        <button
          onClick={onBack}
          className="btn-secondary w-full sm:w-auto py-4 px-8 text-base font-bold"
        >
          Cancel
        </button>

        <button
          onClick={() => onSelectTaskType(selectedType)}
          className="btn-primary w-full sm:w-auto py-4 px-12 text-base font-bold flex items-center justify-center gap-3"
        >
          <span>CONTINUE</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
