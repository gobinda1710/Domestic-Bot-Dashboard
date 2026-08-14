import React from 'react';
import { RobotStatusCode, RoomId } from '../../types';
import { BatteryIndicator } from './BatteryIndicator';
import { 
  ShieldAlert, 
  Globe, 
  Accessibility as AccessibilityIcon, 
  Bell, 
  Settings, 
  MapPin,
  Bot
} from 'lucide-react';

interface HeaderProps {
  status: RobotStatusCode;
  batteryPercent: number;
  location: RoomId;
  unreadNotificationsCount?: number;
  onOpenLanguage: () => void;
  onOpenAccessibility: () => void;
  onOpenNotifications: () => void;
  onOpenSettings: () => void;
  onEmergencyStop: () => void;
  onLogoClick?: () => void;
  showEmergencyStop?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  status,
  batteryPercent,
  location,
  unreadNotificationsCount = 2,
  onOpenLanguage,
  onOpenAccessibility,
  onOpenNotifications,
  onOpenSettings,
  onEmergencyStop,
  onLogoClick,
  showEmergencyStop = true,
}) => {
  const getStatusBadge = () => {
    switch (status) {
      case 'WORKING':
        return (
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#4F8CFF]/15 border border-[#4F8CFF]/40 text-[#4F8CFF] text-xs font-bold font-mono tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#4F8CFF] animate-pulse" />
            WORKING
          </div>
        );
      case 'PAUSED':
        return (
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#F59E0B]/15 border border-[#F59E0B]/40 text-[#F59E0B] text-xs font-bold font-mono tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
            PAUSED
          </div>
        );
      case 'STOPPED':
        return (
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#EF4444]/15 border border-[#EF4444]/40 text-[#EF4444] text-xs font-bold font-mono tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#EF4444] animate-ping" />
            STOPPED
          </div>
        );
      case 'READY':
      default:
        return (
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/40 text-[#22C55E] text-xs font-bold font-mono tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
            READY
          </div>
        );
    }
  };

  return (
    <header className="w-full bg-[#151D32] border-b border-[#222D48] px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 select-none shrink-0 z-30">
      {/* Brand & Logo */}
      <div className="flex items-center gap-4 cursor-pointer" onClick={onLogoClick}>
        <div className="w-12 h-12 rounded-2xl bg-[#0B1020] border border-[#4F8CFF]/40 flex items-center justify-center text-[#4F8CFF] shadow-inner">
          <Bot className="w-7 h-7 text-[#4F8CFF]" />
        </div>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold tracking-tight text-[#F8FAFC]">
              DOMESTIC BOT
            </h1>
            {getStatusBadge()}
          </div>
          <p className="text-xs text-[#AAB4C5] font-medium tracking-wide">
            Science Museum Touchscreen Exhibit OS
          </p>
        </div>
      </div>

      {/* Quick Status Pill (Battery + Location) */}
      <div className="flex items-center gap-3 bg-[#0B1020] px-4 py-2 rounded-xl border border-[#222D48]">
        {/* Battery */}
        <div className="flex items-center gap-2 pr-3 border-r border-[#222D48]">
          <span className="text-xs text-[#AAB4C5]">Power:</span>
          <BatteryIndicator percent={batteryPercent} size="sm" />
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5 pl-1">
          <MapPin className="w-4 h-4 text-[#7C5CFF]" />
          <span className="text-xs text-[#AAB4C5]">Location:</span>
          <span className="text-xs font-semibold text-[#F8FAFC]">{location}</span>
        </div>
      </div>

      {/* Actions: A11y, Language, Notifications, Settings, Emergency Stop */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Language Button */}
        <button
          onClick={onOpenLanguage}
          className="p-3 rounded-xl bg-[#0B1020] hover:bg-[#1C2742] border border-[#222D48] text-[#AAB4C5] hover:text-[#F8FAFC] transition-colors flex items-center gap-1.5"
          title="Change Language"
          aria-label="Language selection"
        >
          <Globe className="w-5 h-5 text-[#4F8CFF]" />
          <span className="text-xs font-bold uppercase hidden xl:inline">EN</span>
        </button>

        {/* Accessibility Button */}
        <button
          onClick={onOpenAccessibility}
          className="p-3 rounded-xl bg-[#0B1020] hover:bg-[#1C2742] border border-[#222D48] text-[#AAB4C5] hover:text-[#F8FAFC] transition-colors"
          title="Accessibility Options"
          aria-label="Accessibility options"
        >
          <AccessibilityIcon className="w-5 h-5 text-[#7C5CFF]" />
        </button>

        {/* Notifications Button */}
        <button
          onClick={onOpenNotifications}
          className="p-3 rounded-xl bg-[#0B1020] hover:bg-[#1C2742] border border-[#222D48] text-[#AAB4C5] hover:text-[#F8FAFC] transition-colors relative"
          title="View Notifications"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#4F8CFF] text-[#0B1020] font-bold text-[10px] flex items-center justify-center">
              {unreadNotificationsCount}
            </span>
          )}
        </button>

        {/* Settings Button */}
        <button
          onClick={onOpenSettings}
          className="p-3 rounded-xl bg-[#0B1020] hover:bg-[#1C2742] border border-[#222D48] text-[#AAB4C5] hover:text-[#F8FAFC] transition-colors"
          title="Exhibit Settings"
          aria-label="Settings"
        >
          <Settings className="w-5 h-5" />
        </button>

        {/* Emergency Stop Button (Prominent & High Contrast) */}
        {showEmergencyStop && (
          <button
            onClick={onEmergencyStop}
            className="btn-emergency px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 ml-1"
            title="Emergency Stop"
            aria-label="Emergency Stop Robot"
          >
            <ShieldAlert className="w-5 h-5 text-white animate-pulse" />
            <span className="tracking-wider uppercase">EMERGENCY STOP</span>
          </button>
        )}
      </div>
    </header>
  );
};
