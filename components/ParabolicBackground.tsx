"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParabolicBackgroundProps {
  intensity?: number;
  className?: string;
}

export default function ParabolicBackground({
  intensity = 0.15,
  className = "",
}: ParabolicBackgroundProps) {
  const { scrollY } = useScroll();
  
  // Parallax effects for different elements
  const glow1Y = useTransform(scrollY, [0, 1000], [0, -50]);
  const glow2Y = useTransform(scrollY, [0, 1000], [0, 30]);
  const gridY = useTransform(scrollY, [0, 1000], [0, -20]);

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* Primary gradient glow */}
      <motion.div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-emerald-500/20 blur-3xl"
        animate={{
          x: [0, 120, 0],
          y: [0, 80, 0],
        }}
        style={{ 
          opacity: intensity,
          y: glow1Y,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Secondary gradient glow */}
      <motion.div
        className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-teal-400/20 blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, -60, 0],
        }}
        style={{ 
          opacity: intensity * 0.8,
          y: glow2Y,
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Tertiary accent glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-blue-500/10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        style={{ opacity: intensity * 0.5 }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Responsive grid overlay */}
      <motion.div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          y: gridY,
        }}
      />

      {/* Radial gradient overlay for depth */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 20%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.05) 0%, transparent 70%)
          `,
        }}
      />
    </div>
  );
}