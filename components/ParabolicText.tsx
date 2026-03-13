// components/ParabolicText.tsx
"use client";

import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

interface ParabolicTextProps {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  delay?: number;
  animate?: boolean;
  gradient?: boolean;
  glow?: boolean;
  typewriter?: boolean;
}

export default function ParabolicText({ 
  children, 
  className = "", 
  as: Component = "h2",
  delay = 0,
  animate = true,
  gradient = false,
  glow = false,
  typewriter = false
}: ParabolicTextProps) {
  const MotionComponent = motion[Component as keyof typeof motion] as any;
  const [displayText, setDisplayText] = useState("");
  const text = typeof children === 'string' ? children : '';

  useEffect(() => {
    if (typewriter && text) {
      let i = 0;
      const timer = setInterval(() => {
        if (i < text.length) {
          setDisplayText(text.substring(0, i + 1));
          i++;
        } else {
          clearInterval(timer);
        }
      }, 50);
      return () => clearInterval(timer);
    }
  }, [text, typewriter]);

  const textVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      filter: "blur(10px)",
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: {
        duration: 0.8,
        delay,
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20, rotateX: -90 },
    visible: { opacity: 1, y: 0, rotateX: 0 }
  };

  if (typewriter && text) {
    return (
      <MotionComponent
        className={`relative inline-block ${gradient ? 'text-brand-gradient' : ''} ${glow ? 'animate-parabolic-glow' : ''} ${className}`}
        variants={textVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {displayText}
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="inline-block w-0.5 h-6 bg-primary ml-1"
        />
      </MotionComponent>
    );
  }

  if (animate && typeof children === 'string') {
    return (
      <MotionComponent
        className={`relative inline-block ${gradient ? 'text-brand-gradient' : ''} ${glow ? 'animate-parabolic-glow' : ''} ${className}`}
        variants={textVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {children.split('').map((char, index) => (
          <motion.span
            key={index}
            variants={letterVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: delay + index * 0.03 }}
            className="inline-block"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
        
        {/* Parabolic underline */}
        <motion.div
          className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: delay + 0.5 }}
          style={{ originX: 0 }}
        />
      </MotionComponent>
    );
  }

  return (
    <MotionComponent
      className={`relative inline-block ${gradient ? 'text-brand-gradient' : ''} ${glow ? 'animate-parabolic-glow' : ''} ${className}`}
      initial={animate ? { opacity: 0, y: 20 } : false}
      whileInView={animate ? { opacity: 1, y: 0 } : false}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </MotionComponent>
  );
}