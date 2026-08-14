import React, { useState } from 'react';
import { TaskType, RoomId, DeliveryItem, TaskConfigState } from '../types';
import { 
  SprayCan, 
  Package, 
  MapPin, 
  ArrowLeft, 
  Check, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  Armchair,
  UtensilsCrossed,
  BedDouble,
  Utensils,
  GlassWater,
  Pill,
  Glasses,
  Layers
} from 'lucide-react';

interface TaskConfigScreenProps {
  taskType: TaskType;
  onConfirmTask: (config: TaskConfigState) => void;
  onBack: () => void;
}

export const TaskConfigScreen: React.FC<TaskConfigScreenProps> = ({
  taskType,
  onConfirmTask,
  onBack,
}) => {
  const [selectedRoom, setSelectedRoom] = useState<RoomId>('Living Room');
  const [selectedItem, setSelectedItem] = useState<DeliveryItem>('Water Bottle');

  const rooms: { id: RoomId; name: string; desc: string; icon: React.ReactNode; iconBg: string }[] = [
    { 
      id: 'Living Room', 
      name: 'Living Room', 
      desc: 'Main family lounge area (24 m²)', 
      icon: <Armchair className="w-7 h-7 text-[#4F8CFF]" />,
      iconBg: 'bg-[#4F8CFF]/15 border-[#4F8CFF]/30'
    },
    { 
      id: 'Kitchen', 
      name: 'Kitchen', 
      desc: 'Cooking & dining space (16 m²)', 
      icon: <UtensilsCrossed className="w-7 h-7 text-[#F59E0B]" />,
      iconBg: 'bg-[#F59E0B]/15 border-[#F59E0B]/30'
    },
    { 
      id: 'Bedroom', 
      name: 'Bedroom', 
      desc: 'Master rest quarters (18 m²)', 
      icon: <BedDouble className="w-7 h-7 text-[#7C5CFF]" />,
      iconBg: 'bg-[#7C5CFF]/15 border-[#7C5CFF]/30'
    },
    { 
      id: 'Dining Area', 
      name: 'Dining Area', 
      desc: 'Formal dining table zone (12 m²)', 
      icon: <Utensils className="w-7 h-7 text-[#22C55E]" />,
      iconBg: 'bg-[#22C55E]/15 border-[#22C55E]/30'
    },
  ];

  const deliveryItems: { name: DeliveryItem; desc: string; icon: React.ReactNode; iconBg: string }[] = [
    { 
      name: 'Water Bottle', 
      desc: '500ml fresh hydration bottle', 
      icon: <GlassWater className="w-7 h-7 text-[#4F8CFF]" />,
      iconBg: 'bg-[#4F8CFF]/15 border-[#4F8CFF]/30 text-[#4F8CFF]'
    },
    { 
      name: 'Prescription Box', 
      desc: 'Daily medication organizer', 
      icon: <Pill className="w-7 h-7 text-[#EF4444]" />,
      iconBg: 'bg-[#EF4444]/15 border-[#EF4444]/30 text-[#EF4444]'
    },
    { 
      name: 'Reading Glasses', 
      desc: 'Protective optical case', 
      icon: <Glasses className="w-7 h-7 text-[#7C5CFF]" />,
      iconBg: 'bg-[#7C5CFF]/15 border-[#7C5CFF]/30 text-[#7C5CFF]'
    },
    { 
      name: 'Clean Towel', 
      desc: 'Fresh cotton hand towel', 
      icon: <Layers className="w-7 h-7 text-[#22C55E]" />,
      iconBg: 'bg-[#22C55E]/15 border-[#22C55E]/30 text-[#22C55E]'
    },
  ];

  const getTaskHeader = () => {
    switch (taskType) {
      case 'DELIVER_ITEM':
        return {
          title: 'Configure Delivery',
          subtitle: 'Select the household item and destination room',
          taskName: 'Deliver Item',
          duration: '02:15',
          batteryCost: 3,
          icon: <Package className="w-7 h-7 text-[#7C5CFF]" />,
          iconBg: 'bg-[#7C5CFF]/15 border-[#7C5CFF]/30',
        };
      case 'GO_TO_LOCATION':
        return {
          title: 'Configure Navigation',
          subtitle: 'Select destination room for the robot to position itself',
          taskName: 'Go to Location',
          duration: '01:10',
          batteryCost: 2,
          icon: <MapPin className="w-7 h-7 text-[#22C55E]" />,
          iconBg: 'bg-[#22C55E]/15 border-[#22C55E]/30',
        };
      case 'CLEAN_ROOM':
      default:
        return {
          title: 'Configure Cleaning Task',
          subtitle: 'Select which room you would like the robot to clean',
          taskName: 'Clean Room',
          duration: '03:24',
          batteryCost: 5,
          icon: <SprayCan className="w-7 h-7 text-[#4F8CFF]" />,
          iconBg: 'bg-[#4F8CFF]/15 border-[#4F8CFF]/30',
        };
    }
  };

  const headerInfo = getTaskHeader();

  const handleConfirm = () => {
    onConfirmTask({
      taskType,
      title: headerInfo.taskName,
      room: selectedRoom,
      item: taskType === 'DELIVER_ITEM' ? selectedItem : undefined,
      estimatedDuration: headerInfo.duration,
      batteryUsagePercent: headerInfo.batteryCost,
    });
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 sm:p-10 max-w-4xl mx-auto w-full select-none overflow-y-auto">
      {/* Top Back Navigation & Breadcrumb */}
      <div className="flex items-center justify-between pb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#151D32] hover:bg-[#1C2742] border border-[#222D48] text-xs font-bold text-[#AAB4C5] hover:text-[#F8FAFC] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK</span>
        </button>
        <span className="text-xs font-mono text-[#AAB4C5] uppercase">Step 2 of 2: Configuration</span>
      </div>

      {/* Task Header Banner */}
      <div className="surface-card p-6 border-2 border-[#222D48] flex items-center gap-4 mb-6">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${headerInfo.iconBg}`}>
          {headerInfo.icon}
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-[#F8FAFC]">{headerInfo.title}</h2>
          <p className="text-xs sm:text-sm text-[#AAB4C5]">{headerInfo.subtitle}</p>
        </div>
      </div>

      {/* If Deliver Item: Show Item Selection First */}
      {taskType === 'DELIVER_ITEM' && (
        <div className="mb-6 space-y-3">
          <label className="text-sm font-bold text-[#F8FAFC] uppercase tracking-wider block font-mono">
            1. Select Item to Deliver:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {deliveryItems.map((item) => {
              const isSelected = selectedItem === item.name;
              return (
                <div
                  key={item.name}
                  onClick={() => setSelectedItem(item.name)}
                  className={`p-4 rounded-xl cursor-pointer text-center transition-all ${
                    isSelected
                      ? 'surface-card-selected'
                      : 'surface-card hover:border-[#7C5CFF]/50'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl mx-auto mb-2.5 flex items-center justify-center bg-[#0B1020] border border-[#222D48]">
                    {item.icon}
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-[#F8FAFC]">{item.name}</h4>
                  <p className="text-[10px] text-[#AAB4C5] mt-1">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Room Selection Cards (Living Room, Kitchen, Bedroom, Dining Area) */}
      <div className="space-y-3 mb-6">
        <label className="text-sm font-bold text-[#F8FAFC] uppercase tracking-wider block font-mono">
          {taskType === 'DELIVER_ITEM' ? '2. Select Destination Room:' : 'Select Room:'}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {rooms.map((room) => {
            const isSelected = selectedRoom === room.id;
            return (
              <div
                key={room.id}
                onClick={() => setSelectedRoom(room.id)}
                className={`p-5 rounded-2xl cursor-pointer flex items-center justify-between gap-4 transition-all ${
                  isSelected
                    ? 'surface-card-selected'
                    : 'surface-card hover:border-[#4F8CFF]/50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-xl border flex items-center justify-center shrink-0 ${room.iconBg}`}>
                    {room.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#F8FAFC]">{room.name}</h4>
                    <p className="text-xs text-[#AAB4C5]">{room.desc}</p>
                  </div>
                </div>

                <div
                  className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ${
                    isSelected ? 'border-[#4F8CFF] bg-[#4F8CFF] text-[#0B1020]' : 'border-[#222D48] bg-[#0B1020]'
                  }`}
                >
                  {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Task Summary Box */}
      <div className="surface-card p-5 border-2 border-[#4F8CFF]/30 bg-[#4F8CFF]/5 rounded-2xl mb-6">
        <div className="flex items-center gap-2 text-xs font-bold text-[#4F8CFF] uppercase tracking-wider font-mono mb-2">
          <Sparkles className="w-4 h-4 text-[#4F8CFF]" />
          Task Configuration Summary
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-[#AAB4C5] block">Task:</span>
            <span className="font-bold text-[#F8FAFC] text-sm mt-0.5 block">{headerInfo.taskName}</span>
          </div>
          <div>
            <span className="text-[#AAB4C5] block">Target Room:</span>
            <span className="font-bold text-[#4F8CFF] text-sm mt-0.5 block">{selectedRoom}</span>
          </div>
          {taskType === 'DELIVER_ITEM' && (
            <div>
              <span className="text-[#AAB4C5] block">Item:</span>
              <span className="font-bold text-[#7C5CFF] text-sm mt-0.5 block">{selectedItem}</span>
            </div>
          )}
          <div>
            <span className="text-[#AAB4C5] block">Est. Duration:</span>
            <span className="font-bold text-[#22C55E] text-sm mt-0.5 block flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {headerInfo.duration}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Actions: BACK & CONFIRM TASK */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#222D48]">
        <button
          onClick={onBack}
          className="btn-secondary w-full sm:w-auto py-4 px-8 text-base font-bold"
        >
          BACK
        </button>

        <button
          onClick={handleConfirm}
          className="btn-primary w-full sm:w-auto py-4 px-12 text-base font-bold flex items-center justify-center gap-3 shadow-lg"
        >
          <CheckCircle2 className="w-6 h-6" />
          <span>CONFIRM TASK</span>
        </button>
      </div>
    </div>
  );
};
