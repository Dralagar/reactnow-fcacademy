// components/ParabolicBackground.tsx
"use client";

import { useEffect, useRef } from "react";

interface ParabolicBackgroundProps {
  color?: string;
  intensity?: number;
  className?: string;
}

export default function ParabolicBackground({ 
  color = "rgba(5, 150, 105, 0.1)", 
  intensity = 0.5,
  className = "" 
}: ParabolicBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawParabolicCurves = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const width = canvas.width;
      const height = canvas.height;
      
      // Draw multiple parabolic curves
      for (let i = 0; i < 8; i++) {
        const offset = i * 0.8 + time * 0.001;
        const amplitude = 120 * intensity;
        const frequency = 0.003;
        
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = 0.1 + (i * 0.03);
        
        for (let x = 0; x < width; x += 15) {
          // Advanced parabolic equation with multiple harmonics
          const y = amplitude * (
            Math.sin(x * frequency + offset) * 0.7 +
            Math.sin(x * frequency * 2 + offset * 1.5) * 0.3
          ) * Math.sin(x * 0.001 + offset);
          
          const normalizedY = height / 2 + y;
          
          if (x === 0) {
            ctx.moveTo(x, normalizedY);
          } else {
            ctx.lineTo(x, normalizedY);
          }
        }
        
        ctx.stroke();
      }

      // Draw floating particles along parabolic paths
      for (let i = 0; i < 30; i++) {
        const particleX = (i * 80 + time * 2) % width;
        const particleY = height / 2 + 
          80 * Math.sin(particleX * 0.008 + time * 0.003) * 
          Math.sin(particleX * 0.004 + time * 0.002);
        
        ctx.beginPath();
        ctx.arc(particleX, particleY, 2 + Math.sin(time * 0.02 + i) * 1, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.2 + Math.sin(time * 0.02 + i) * 0.1;
        ctx.fill();
      }

      time += 1;
      animationFrameId = requestAnimationFrame(drawParabolicCurves);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    drawParabolicCurves();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, intensity]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full pointer-events-none -z-10 ${className}`}
    />
  );
}