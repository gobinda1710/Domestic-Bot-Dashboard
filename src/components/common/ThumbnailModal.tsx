import React, { useRef, useState } from 'react';
import { X, Download, Sparkles, Check, Image as ImageIcon, Copy } from 'lucide-react';
import { RobotVisual } from './RobotVisual';

interface ThumbnailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ThumbnailModal: React.FC<ThumbnailModalProps> = ({ isOpen, onClose }) => {
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  if (!isOpen) return null;

  const handleDownloadPNG = () => {
    setDownloading(true);
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1920;
      canvas.height = 1080;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        setDownloading(false);
        return;
      }

      // 1. Background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 1920, 1080);
      bgGrad.addColorStop(0, '#060913');
      bgGrad.addColorStop(0.5, '#0B1020');
      bgGrad.addColorStop(1, '#080D1A');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1920, 1080);

      // 2. Subtle grid pattern
      ctx.strokeStyle = 'rgba(79, 140, 255, 0.07)';
      ctx.lineWidth = 1;
      const gridSize = 48;
      for (let x = 0; x < 1920; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 1080);
        ctx.stroke();
      }
      for (let y = 0; y < 1080; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(1920, y);
        ctx.stroke();
      }

      // 3. Ambient Glows
      const glow1 = ctx.createRadialGradient(400, 400, 10, 400, 400, 600);
      glow1.addColorStop(0, 'rgba(79, 140, 255, 0.18)');
      glow1.addColorStop(1, 'rgba(79, 140, 255, 0)');
      ctx.fillStyle = glow1;
      ctx.fillRect(0, 0, 1920, 1080);

      const glow2 = ctx.createRadialGradient(1450, 540, 20, 1450, 540, 500);
      glow2.addColorStop(0, 'rgba(124, 92, 255, 0.22)');
      glow2.addColorStop(1, 'rgba(124, 92, 255, 0)');
      ctx.fillStyle = glow2;
      ctx.fillRect(0, 0, 1920, 1080);

      // 4. Header Badge
      ctx.fillStyle = 'rgba(79, 140, 255, 0.15)';
      ctx.strokeStyle = 'rgba(79, 140, 255, 0.4)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(120, 140, 420, 50, 25);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#4F8CFF';
      ctx.font = 'bold 20px monospace';
      ctx.fillText('⚡ SCIENCE MUSEUM EXHIBIT', 150, 172);

      // 5. Main Title
      ctx.fillStyle = '#F8FAFC';
      ctx.font = '900 82px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('DOMESTIC BOT', 120, 275);

      // 6. Subtitle
      ctx.fillStyle = '#7C5CFF';
      ctx.font = '700 36px sans-serif';
      ctx.fillText('Assistive Robot OS — 55" Touchscreen Kiosk UI', 120, 335);

      ctx.fillStyle = '#94A3B8';
      ctx.font = '400 24px sans-serif';
      ctx.fillText('Comprehensive 7-Screen Interactive Experience for Public Visitors', 120, 380);

      // 7. Feature Pills
      const pills = [
        '✨ 7 Interactive Flow Screens',
        '⏱️ 90s Quick Session Rule',
        '♿ Accessible & High Contrast',
        '📐 1080×1920 Portrait Kiosk',
        '🎨 100% Vector SVG & Clean UI'
      ];
      let pillY = 440;
      pills.forEach((p) => {
        ctx.fillStyle = 'rgba(21, 29, 50, 0.85)';
        ctx.strokeStyle = 'rgba(34, 45, 72, 0.9)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(120, pillY, 480, 46, 12);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#E2E8F0';
        ctx.font = '600 20px sans-serif';
        ctx.fillText(p, 145, pillY + 30);
        pillY += 60;
      });

      // 8. Right Hero UI Card (Kiosk Screen Showcase Card)
      ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
      ctx.strokeStyle = 'rgba(79, 140, 255, 0.35)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(1100, 140, 680, 800, 32);
      ctx.fill();
      ctx.stroke();

      // Card Header
      ctx.fillStyle = '#1E293B';
      ctx.beginPath();
      ctx.roundRect(1100, 140, 680, 80, [32, 32, 0, 0]);
      ctx.fill();

      ctx.fillStyle = '#F8FAFC';
      ctx.font = 'bold 26px sans-serif';
      ctx.fillText('🤖 Robot Operating System', 1140, 190);

      ctx.fillStyle = '#22C55E';
      ctx.font = 'bold 20px monospace';
      ctx.fillText('ONLINE • 85% BATTERY', 1500, 190);

      // Inner Mascot representation
      ctx.fillStyle = '#0B1020';
      ctx.strokeStyle = 'rgba(51, 65, 85, 0.8)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(1140, 250, 600, 320, 24);
      ctx.fill();
      ctx.stroke();

      // Robot Head in Canvas
      ctx.fillStyle = '#151D32';
      ctx.strokeStyle = '#4F8CFF';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.roundRect(1330, 290, 220, 170, 36);
      ctx.fill();
      ctx.stroke();

      // Visor
      ctx.fillStyle = '#070B14';
      ctx.beginPath();
      ctx.roundRect(1360, 330, 160, 80, 20);
      ctx.fill();

      // Glowing Eyes
      ctx.fillStyle = '#4F8CFF';
      ctx.shadowColor = '#4F8CFF';
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(1405, 370, 18, 0, Math.PI * 2);
      ctx.arc(1475, 370, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0; // reset

      // Robot Label
      ctx.fillStyle = '#AAB4C5';
      ctx.font = 'bold 18px monospace';
      ctx.fillText('DOMESTIC-BOT AI • STATUS: READY', 1280, 520);

      // Quick Tasks Grid in Card
      const taskBoxes = [
        { label: '🧹 Clean Room', desc: 'Living Room • 3m 24s', col: '#4F8CFF', x: 1140, y: 600 },
        { label: '📦 Deliver Item', desc: 'Hydration Bottle', col: '#7C5CFF', x: 1450, y: 600 },
        { label: '📍 Go to Location', desc: 'Kitchen Dock', col: '#22C55E', x: 1140, y: 730 },
        { label: '🛑 Emergency Stop', desc: 'Instant Override', col: '#EF4444', x: 1450, y: 730 },
      ];

      taskBoxes.forEach((tb) => {
        ctx.fillStyle = '#10162A';
        ctx.strokeStyle = tb.col + '44';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(tb.x, tb.y, 290, 100, 16);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#F8FAFC';
        ctx.font = 'bold 20px sans-serif';
        ctx.fillText(tb.label, tb.x + 20, tb.y + 42);

        ctx.fillStyle = '#94A3B8';
        ctx.font = '15px sans-serif';
        ctx.fillText(tb.desc, tb.x + 20, tb.y + 75);
      });

      // Card Bottom Status
      ctx.fillStyle = 'rgba(79, 140, 255, 0.15)';
      ctx.beginPath();
      ctx.roundRect(1140, 860, 600, 50, 12);
      ctx.fill();
      ctx.fillStyle = '#4F8CFF';
      ctx.font = 'bold 18px sans-serif';
      ctx.fillText('✓ Designed for Figma Community • UI/UX Project', 1240, 892);

      // Bottom Footer Bar
      ctx.fillStyle = '#050811';
      ctx.fillRect(0, 1000, 1920, 80);

      ctx.fillStyle = '#64748B';
      ctx.font = '600 20px monospace';
      ctx.fillText('CSE441 • ADVANCED USER INTERFACE DESIGN • MUSEUM EXHIBIT KIOSK', 120, 1048);

      ctx.fillStyle = '#AAB4C5';
      ctx.font = '600 20px sans-serif';
      ctx.fillText('Resolution: 1920 × 1080 (16:9)', 1600, 1048);

      // Trigger Download
      const link = document.createElement('a');
      link.download = 'domestic-bot-figma-thumbnail-1920x1080.png';
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
      setDownloading(false);
    } catch (err) {
      console.error(err);
      setDownloading(false);
    }
  };

  const handleCopyTitleDesc = () => {
    const text = `Domestic Bot Dashboard — UI/UX Project

An interactive 55-inch touchscreen kiosk UI prototype designed for a Science Museum exhibit. It demonstrates an AI-powered assistive domestic robot OS flow with a 90-second user interaction cycle.

Key Features:
• Complete 7-screen interactive flow (Welcome, Dashboard, Task Select, Config, Robot Working, Complete, Emergency Stop).
• High-contrast, touch-friendly UI designed for portrait kiosks (1080×1920).
• Tasks included: Clean Room, Deliver Item, and Location Navigation.
• Built-in accessibility controls (High Contrast, Large Text, Voice Guidance).
• 100% vector SVG icons and components ready for design system reuse.`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#0B1020] border-2 border-[#4F8CFF]/40 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#222D48]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#4F8CFF]/15 border border-[#4F8CFF]/30 text-[#4F8CFF]">
              <ImageIcon className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#F8FAFC]">
                Figma Community Thumbnail Generator
              </h2>
              <p className="text-xs sm:text-sm text-[#AAB4C5]">
                Export a high-res 1920×1080 cover image for your Figma Community publish step.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#151D32] hover:bg-[#222D48] text-[#AAB4C5] hover:text-[#F8FAFC] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Thumbnail Visual Preview (16:9 Aspect Ratio) */}
        <div className="my-6 relative rounded-2xl overflow-hidden border-2 border-[#334155] shadow-2xl aspect-video bg-gradient-to-br from-[#060913] via-[#0B1020] to-[#080D1A] p-6 sm:p-10 flex flex-col justify-between select-none">
          {/* Subtle Grid Background */}
          <div 
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#4F8CFF 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />

          {/* Top Row */}
          <div className="relative z-10 flex items-start justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4F8CFF]/15 border border-[#4F8CFF]/40 text-[#4F8CFF] text-xs font-mono font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Science Museum Exhibit</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#F8FAFC] tracking-tight">
                DOMESTIC BOT
              </h1>
              <p className="text-sm sm:text-base font-semibold text-[#7C5CFF]">
                Assistive Robot OS — 55" Touchscreen Kiosk UI
              </p>
            </div>

            <div className="hidden sm:flex flex-col items-end gap-1">
              <span className="px-3 py-1 rounded-lg bg-[#22C55E]/15 border border-[#22C55E]/40 text-[#22C55E] text-xs font-mono font-bold">
                ● ONLINE • 85% BATTERY
              </span>
              <span className="text-[11px] text-[#AAB4C5] font-mono">1920 × 1080 (16:9)</span>
            </div>
          </div>

          {/* Middle Row (Mascot & Mini Preview Cards) */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center my-2">
            <div className="bg-[#151D32]/80 border border-[#222D48] rounded-2xl p-4 flex items-center gap-4">
              <div className="w-20 h-20 shrink-0">
                <RobotVisual state="READY" size="sm" showSensors={false} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#F8FAFC]">AI Assistive Robot</h4>
                <p className="text-xs text-[#AAB4C5] mt-0.5">Autonomous cleaning, item delivery, & spatial mapping</p>
                <div className="flex gap-1.5 mt-2">
                  <span className="px-2 py-0.5 rounded bg-[#4F8CFF]/20 text-[#4F8CFF] text-[10px] font-semibold">Clean</span>
                  <span className="px-2 py-0.5 rounded bg-[#7C5CFF]/20 text-[#7C5CFF] text-[10px] font-semibold">Deliver</span>
                  <span className="px-2 py-0.5 rounded bg-[#22C55E]/20 text-[#22C55E] text-[10px] font-semibold">Navigate</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-[#10162A] border border-[#4F8CFF]/30">
                <p className="text-[#4F8CFF] font-bold">7 Interactive Screens</p>
                <p className="text-[10px] text-[#AAB4C5]">Full visitor flow</p>
              </div>
              <div className="p-2.5 rounded-xl bg-[#10162A] border border-[#7C5CFF]/30">
                <p className="text-[#7C5CFF] font-bold">90s Session Rule</p>
                <p className="text-[10px] text-[#AAB4C5]">Exhibit throughput</p>
              </div>
              <div className="p-2.5 rounded-xl bg-[#10162A] border border-[#22C55E]/30">
                <p className="text-[#22C55E] font-bold">100% Vector SVG</p>
                <p className="text-[10px] text-[#AAB4C5]">High-fidelity design</p>
              </div>
              <div className="p-2.5 rounded-xl bg-[#10162A] border border-[#EF4444]/30">
                <p className="text-[#EF4444] font-bold">Emergency Stop</p>
                <p className="text-[10px] text-[#AAB4C5]">Safety override</p>
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="relative z-10 flex items-center justify-between border-t border-[#222D48]/80 pt-3 text-[11px] font-mono text-[#64748B]">
            <span>CSE441 • ADVANCED USER INTERFACE DESIGN</span>
            <span className="text-[#4F8CFF] font-semibold">Ready for Figma Community</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <button
            onClick={handleCopyTitleDesc}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#151D32] hover:bg-[#1C2742] border border-[#222D48] text-[#F8FAFC] font-semibold flex items-center justify-center gap-2 transition-all"
          >
            {copied ? <Check className="w-5 h-5 text-[#22C55E]" /> : <Copy className="w-5 h-5 text-[#4F8CFF]" />}
            <span>{copied ? 'Description Copied!' : 'Copy Community Description'}</span>
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-5 py-3 rounded-xl bg-transparent hover:bg-[#151D32] text-[#AAB4C5] hover:text-[#F8FAFC] font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDownloadPNG}
              disabled={downloading}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#4F8CFF] to-[#7C5CFF] hover:brightness-110 text-[#0B1020] font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-[#4F8CFF]/25 active:scale-98 transition-all"
            >
              <Download className="w-5 h-5 text-[#0B1020]" />
              <span>{downloading ? 'Generating 1920×1080 PNG...' : 'Download 1920×1080 Thumbnail'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
