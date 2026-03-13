// components/ParabolicDivider.tsx
"use client";

import { motion } from "framer-motion";

interface ParabolicDividerProps {
  variant?: "wave" | "dots" | "line" | "curves";
  className?: string;
}

export default function ParabolicDivider({ 
  variant = "wave", 
  className = "" 
}: ParabolicDividerProps) {
  const dividers = {
    wave: (
      <svg className="w-full h-12" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <motion.path
          d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
          fill="currentColor"
          className="text-primary/10"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
        />
      </svg>
    ),
    dots: (
      <div className="flex justify-center space-x-2">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-primary rounded-full"
            initial={{ scale: 0 }}
            whileInView={{ scale: [0, 1.2, 1] }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
          />
        ))}
      </div>
    ),
    line: (
      <motion.div
        className="h-px bg-gradient-to-r from-transparent via-primary to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.8 }}
        style={{ originX: 0 }}
      />
    ),
    curves: (
      <svg className="w-full h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
        {[...Array(3)].map((_, i) => (
          <motion.path
            key={i}
            d={`M0,${i * 40} Q300,${i * 40 + 30} 600,${i * 40} T1200,${i * 40}`}
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            className="text-primary/20"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: i * 0.2 }}
          />
        ))}
      </svg>
    )
  };

  return (
    <div className={`my-8 ${className}`}>
      {dividers[variant]}
    </div>
  );
}