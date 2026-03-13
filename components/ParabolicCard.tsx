// components/ParabolicCard.tsx
"use client";

import { motion } from "framer-motion";
import { ReactNode, useState } from "react";

interface ParabolicCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
  glowEffect?: boolean;
  delay?: number;
}

export default function ParabolicCard({ 
  children, 
  className = "", 
  onClick,
  hoverEffect = true,
  glowEffect = true,
  delay = 0
}: ParabolicCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-xl ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={hoverEffect ? { 
        y: -8,
        scale: 1.02,
        transition: { 
          type: "spring", 
          stiffness: 400, 
          damping: 17,
          mass: 0.5
        }
      } : undefined}
      whileTap={hoverEffect ? { scale: 0.98 } : undefined}
      onClick={onClick}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, type: "spring", stiffness: 100 }}
    >
      {/* Parabolic gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
          opacity: isHovered ? 0.8 : 0.5
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          backgroundSize: '200% 200%',
        }}
      />
      
      {/* Glow effect */}
      {glowEffect && (
        <motion.div
          className="absolute -inset-1 bg-primary/20 rounded-2xl blur-xl -z-10"
          animate={{
            opacity: isHovered ? 0.7 : 0.3,
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Floating particles on hover */}
      {isHovered && (
        <>
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full"
              initial={{ 
                x: '50%', 
                y: '50%',
                opacity: 0.8
              }}
              animate={{
                x: `${50 + (Math.random() - 0.5) * 100}%`,
                y: `${50 + (Math.random() - 0.5) * 100}%`,
                opacity: 0,
                scale: 0
              }}
              transition={{
                duration: 1,
                delay: i * 0.1,
                ease: "easeOut"
              }}
            />
          ))}
        </>
      )}
      
      {/* Content */}
      <div className="relative z-10 p-6">
        {children}
      </div>

      {/* Parabolic border animation */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: delay + 0.3 }}
        style={{ originX: 0 }}
      />

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/30 rounded-tl-2xl" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/30 rounded-tr-2xl" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/30 rounded-bl-2xl" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/30 rounded-br-2xl" />
    </motion.div>
  );
}