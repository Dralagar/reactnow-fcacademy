// components/ParabolicSection.tsx
"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import ParabolicBackground from "./ParabolicBackground";

interface ParabolicSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  withBackground?: boolean;
  backgroundIntensity?: number;
}

export default function ParabolicSection({ 
  children, 
  className = "", 
  id,
  withBackground = false,
  backgroundIntensity = 0.3
}: ParabolicSectionProps) {
  return (
    <motion.section
      id={id}
      className={`relative py-20 overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      {withBackground && (
        <ParabolicBackground intensity={backgroundIntensity} />
      )}
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </motion.section>
  );
}