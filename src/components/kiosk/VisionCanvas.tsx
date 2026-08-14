import React, { useEffect, useRef } from 'react';
import { DetectedObject } from '../../types';

interface VisionCanvasProps {
  detectedObjects: DetectedObject[];
  className?: string;
  isProcessing?: boolean;
}

export const VisionCanvas: React.FC<VisionCanvasProps> = ({
  detectedObjects,
  className = '',
  isProcessing = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let scanY = 0;

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;

      // Dark camera view feed simulation with grid lines
      ctx.fillStyle = '#060A10';
      ctx.fillRect(0, 0, w, h);

      // Camera sensor digital grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw Object Bounding Boxes
      detectedObjects.forEach((obj) => {
        const bx = (obj.bbox.xPercent / 100) * w;
        const by = (obj.bbox.yPercent / 100) * h;
        const bw = (obj.bbox.wPercent / 100) * w;
        const bh = (obj.bbox.hPercent / 100) * h;

        ctx.strokeStyle = obj.colorHex || '#00F0FF';
        ctx.lineWidth = 2.5;

        // Draw Corner Reticles
        const len = 12;
        // Top-Left
        ctx.beginPath();
        ctx.moveTo(bx, by + len);
        ctx.lineTo(bx, by);
        ctx.lineTo(bx + len, by);
        ctx.stroke();
        // Top-Right
        ctx.beginPath();
        ctx.moveTo(bx + bw - len, by);
        ctx.lineTo(bx + bw, by);
        ctx.lineTo(bx + bw, by + len);
        ctx.stroke();
        // Bottom-Left
        ctx.beginPath();
        ctx.moveTo(bx, by + bh - len);
        ctx.lineTo(bx, by + bh);
        ctx.lineTo(bx + len, by + bh);
        ctx.stroke();
        // Bottom-Right
        ctx.beginPath();
        ctx.moveTo(bx + bw - len, by + bh);
        ctx.lineTo(bx + bw, by + bh);
        ctx.lineTo(bx + bw, by + bh - len);
        ctx.stroke();

        // Semi-transparent box fill
        ctx.fillStyle = `${obj.colorHex}15` || 'rgba(0, 240, 255, 0.1)';
        ctx.fillRect(bx, by, bw, bh);

        // Tag label
        ctx.fillStyle = obj.colorHex || '#00F0FF';
        ctx.fillRect(bx, Math.max(0, by - 22), Math.min(bw, 180), 20);

        ctx.fillStyle = '#0B0E14';
        ctx.font = 'bold 10px font-mono, monospace';
        ctx.fillText(
          `${obj.label} [${obj.confidence.toFixed(1)}%]`,
          bx + 4,
          Math.max(12, by - 8)
        );

        // Vector line to robot center
        ctx.strokeStyle = `${obj.colorHex}60`;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(w / 2, h);
        ctx.lineTo(bx + bw / 2, by + bh / 2);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Animated Vision Scanline
      if (isProcessing) {
        scanY = (scanY + 2) % h;
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.6)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, scanY);
        ctx.lineTo(w, scanY);
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [detectedObjects, isProcessing]);

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      <div className="relative rounded-2xl overflow-hidden border border-emerald-500/40 glow-emerald shadow-2xl">
        <canvas ref={canvasRef} width={320} height={320} className="block" />

        {/* Live Overlay Badge */}
        <div className="absolute top-3 left-3 bg-slate-950/90 px-2.5 py-1 rounded-lg border border-emerald-500/40 text-[11px] font-mono font-bold text-emerald-300 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          CV OPTICS OBJECT RECOGNITION (60 FPS)
        </div>
      </div>
    </div>
  );
};
