"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProfessionalLayoutProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "wide" | "narrow" | "centered";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  background?: "white" | "surface" | "gradient" | "dark" | "transparent";
  animated?: boolean;
}

/**
 * Professional Layout Component
 * Provides consistent layout structure throughout the application
 */
export default function ProfessionalLayout({
  children,
  className = "",
  variant = "default",
  padding = "lg",
  background = "white",
  animated = true,
}: ProfessionalLayoutProps) {
  const getContainerClass = () => {
    const base = "w-full mx-auto";
    
    switch (variant) {
      case "wide":
        return `${base} max-w-7xl xl:max-w-screen-2xl`;
      case "narrow":
        return `${base} max-w-4xl`;
      case "centered":
        return `${base} max-w-6xl`;
      default:
        return `${base} max-w-7xl`;
    }
  };

  const getPaddingClass = () => {
    switch (padding) {
      case "none":
        return "";
      case "sm":
        return "px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16";
      case "md":
        return "px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20";
      case "lg":
        return "px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24";
      case "xl":
        return "px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32";
      default:
        return "px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24";
    }
  };

  const getBackgroundClass = () => {
    switch (background) {
      case "surface":
        return "bg-surface";
      case "gradient":
        return "bg-gradient-to-br from-primary-50 via-white to-secondary-50";
      case "dark":
        return "bg-secondary text-white";
      case "transparent":
        return "bg-transparent";
      default:
        return "bg-white";
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const MotionDiv = animated ? motion.div : "div";

  return (
    <div className={cn("relative", getBackgroundClass(), className)}>
      <MotionDiv
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className={cn(getContainerClass(), getPaddingClass())}
      >
        {children}
      </MotionDiv>
    </div>
  );
}
