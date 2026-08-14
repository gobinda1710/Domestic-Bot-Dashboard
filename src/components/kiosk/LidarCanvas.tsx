import React, { useEffect, useRef, useState } from 'react';

interface LidarCanvasProps {
  className?: string;
  isScanning?: boolean;
  onObstaclePlaced?: (x: number, y: number) => void;
}

export const LidarCanvas: React.FC<LidarCanvasProps> = ({
  className = '',
  isScanning = true,
  onObstaclePlaced,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [clickNotice, setClickNotice] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let sweepAngle = 0;

    // Generate static point cloud room boundary + objects
    const pointCloud: Array<{ angle: number; dist: number; intensity: number }> = [];
    for (let deg = 0; deg < 360; deg += 0.8) {
      const rad = (deg * Math.PI) / 180;
      // Room perimeter geometry simulation
      let dist = 110 + Math.sin(rad * 4) * 15 + Math.cos(rad * 2) * 20;

      // Add mock obstacles (spill, chair, human)
      if (deg > 45 && deg < 75) dist = 55; // Table/Chair leg
      if (deg > 180 && deg < 220) dist = 75; // Human obstacle
      if (deg > 300 && deg < 320) dist = 40; // Spill zone

      pointCloud.push({ angle: rad, dist, intensity: Math.random() * 0.5 + 0.5 });
    }

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.fillStyle = '#070A0F';
      ctx.fillRect(0, 0, width, height);

      // Draw concentric polar distance grid rings
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.15)';
      ctx.lineWidth = 1;

      [30, 60, 90, 120, 140].forEach((r) => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.stroke();

        // Distance text overlay
        ctx.fillStyle = 'rgba(0, 240, 255, 0.4)';
        ctx.font = '10px monospace';
        ctx.fillText(`${(r / 30).toFixed(1)}m`, centerX + 4, centerY - r + 12);
      });

      // Draw crosshairs
      ctx.beginPath();
      ctx.moveTo(centerX, 10);
      ctx.lineTo(centerX, height - 10);
      ctx.moveTo(10, centerY);
      ctx.lineTo(width - 10, centerY);
      ctx.stroke();

      // Draw LiDAR Point Cloud
      pointCloud.forEach((pt) => {
        const x = centerX + Math.cos(pt.angle) * pt.dist;
        const y = centerY + Math.sin(pt.angle) * pt.dist;

        // Color points based on proximity
        if (pt.dist < 50) {
          ctx.fillStyle = `rgba(244, 63, 94, ${pt.intensity})`; // Danger close red
        } else if (pt.dist < 80) {
          ctx.fillStyle = `rgba(245, 158, 11, ${pt.intensity})`; // Caution amber
        } else {
          ctx.fillStyle = `rgba(0, 240, 255, ${pt.intensity})`; // Normal cyan
        }

        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Rotating Laser Sweep Sector
      if (isScanning) {
        sweepAngle = (sweepAngle + 0.04) % (Math.PI * 2);

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, 145, sweepAngle - 0.35, sweepAngle);
        ctx.closePath();

        const grad = ctx.createConicGradient(sweepAngle, centerX, centerY);
        grad.addColorStop(0, 'rgba(0, 240, 255, 0.35)');
        grad.addColorStop(0.1, 'rgba(0, 240, 255, 0.05)');
        grad.addColorStop(1, 'transparent');

        ctx.fillStyle = grad;
        ctx.fill();

        // Active laser leading edge line
        const leadingX = centerX + Math.cos(sweepAngle) * 145;
        const leadingY = centerY + Math.sin(sweepAngle) * 145;
        ctx.strokeStyle = '#00F0FF';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(leadingX, leadingY);
        ctx.stroke();
        ctx.restore();
      }

      // Draw Robot Origin at Center
      ctx.fillStyle = '#00F0FF';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [isScanning]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setClickNotice('New Obstacle Registered in Point Cloud!');
    setTimeout(() => setClickNotice(null), 2500);
    onObstaclePlaced?.(x, y);
  };

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      <div className="relative rounded-2xl overflow-hidden border border-cyan-500/40 glow-cyan shadow-2xl">
        <canvas
          ref={canvasRef}
          width={320}
          height={320}
          onClick={handleCanvasClick}
          className="cursor-crosshair block"
        />

        {/* Live Overlay Tag */}
        <div className="absolute top-3 left-3 bg-slate-950/90 px-2.5 py-1 rounded-lg border border-cyan-500/40 text-[11px] font-mono font-bold text-cyan-300 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          LiDAR 360° LIVE POINT CLOUD
        </div>

        {/* Interactive Prompt */}
        <div className="absolute bottom-3 left-3 right-3 text-center bg-slate-950/80 backdrop-blur-md px-2 py-1 rounded-lg border border-slate-800 text-[10px] font-mono text-slate-300">
          💡 Tap inside LiDAR map to simulate an obstacle!
        </div>

        {clickNotice && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-amber-500 text-slate-950 font-mono font-bold px-4 py-2 rounded-xl text-xs shadow-xl animate-bounce">
            {clickNotice}
          </div>
        )}
      </div>
    </div>
  );
};
