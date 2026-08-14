import React, { useEffect, useRef } from 'react';

interface EmgWaveformProps {
  gestureName?: string;
  signalStrength?: number;
  className?: string;
}

export const EmgWaveform: React.FC<EmgWaveformProps> = ({
  gestureName = 'Pinch Grab Gesture',
  signalStrength = 92,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let step = 0;
    const history: number[] = [];
    const maxHistory = 100;

    for (let i = 0; i < maxHistory; i++) {
      history.push(0);
    }

    const render = () => {
      step++;
      const w = canvas.width;
      const h = canvas.height;
      const midY = h / 2;

      // Simulated muscle voltage spikes
      const noise = (Math.random() - 0.5) * 8;
      const pulse = Math.sin(step * 0.1) > 0.7 ? (Math.random() - 0.5) * (signalStrength * 0.8) : 0;
      const val = noise + pulse;

      history.push(val);
      if (history.length > maxHistory) history.shift();

      ctx.fillStyle = '#080C14';
      ctx.fillRect(0, 0, w, h);

      // Grid background
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.15)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 25) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      // Draw EMG Signal Line
      ctx.strokeStyle = '#F59E0B';
      ctx.lineWidth = 2;
      ctx.beginPath();

      const dx = w / maxHistory;
      history.forEach((v, i) => {
        const x = i * dx;
        const y = midY - v;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [signalStrength]);

  return (
    <div className={`p-4 rounded-2xl bg-slate-900/90 border border-amber-500/40 glow-amber flex flex-col justify-between ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-mono font-bold text-amber-300 uppercase flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          EMG Muscle Band (2.4 GHz)
        </span>
        <span className="text-xs font-mono font-bold text-white bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/40">
          Signal: {signalStrength}%
        </span>
      </div>

      <div className="rounded-xl overflow-hidden border border-amber-500/30">
        <canvas ref={canvasRef} width={280} height={100} className="w-full h-24 block" />
      </div>

      <div className="mt-2 text-xs font-mono text-slate-300 flex items-center justify-between">
        <span className="text-slate-400">Gesture Match:</span>
        <span className="font-bold text-amber-300">{gestureName}</span>
      </div>
    </div>
  );
};
