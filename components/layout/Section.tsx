"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import ProfessionalLayout from "./ProfessionalLayout";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  variant?: "default" | "featured" | "compact" | "wide" | "centered";
  background?: "white" | "surface" | "gradient" | "dark" | "primary" | "secondary";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  animated?: boolean;
  overlay?: boolean;
  containerVariant?: "default" | "wide" | "narrow" | "centered";
}

/**
 * Professional Section Component
 * Consistent section layouts with background and spacing options
 */
export default function Section({
  children,
  className = "",
  id,
  variant = "default",
  background = "white",
  padding = "lg",
  animated = true,
  overlay = false,
  containerVariant = "default",
}: SectionProps) {
  const getVariantClass = () => {
    switch (variant) {
      case "featured":
        return "relative overflow-hidden";
      case "compact":
        return "";
      case "wide":
        return "";
      case "centered":
        return "";
      default:
        return "";
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
      case "primary":
        return "bg-primary text-white";
      case "secondary":
        return "bg-gradient-to-br from-secondary to-secondary-700 text-white";
      default:
        return "bg-white";
    }
  };

  const getOverlayClass = () => {
    if (!overlay) return "";
    
    switch (background) {
      case "primary":
      case "secondary":
        return "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-transparent before:pointer-events-none before:z-10";
      case "dark":
        return "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent before:pointer-events-none before:z-10";
      default:
        return "before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/5 before:to-secondary/5 before:pointer-events-none before:z-10";
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const MotionSection = animated ? motion.section : "section";

  return (
    <MotionSection
      id={id}
      className={cn(
        "relative w-full",
        getVariantClass(),
        getBackgroundClass(),
        getOverlayClass(),
        className
      )}
      initial={animated ? "hidden" : undefined}
      whileInView={animated ? "visible" : undefined}
      viewport={animated ? { once: true, amount: 0.1 } : undefined}
      variants={animated ? sectionVariants : undefined}
    >
      <ProfessionalLayout
        variant={containerVariant}
        padding={padding}
        background="transparent"
        animated={false}
      >
        {children}
      </ProfessionalLayout>
    </MotionSection>
  );
}

/**
 * Section Header Component
 * Consistent header styling for sections
 */
interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  badge?: string;
  align?: "left" | "center" | "right";
  animated?: boolean;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  description,
  badge,
  align = "center",
  animated = true,
  className = "",
}: SectionHeaderProps) {
  const getAlignClass = () => {
    switch (align) {
      case "left":
        return "text-left";
      case "right":
        return "text-right";
      default:
        return "text-center";
    }
  };

  const getContainerClass = () => {
    switch (align) {
      case "left":
        return "items-start text-left";
      case "right":
        return "items-end text-right";
      default:
        return "items-center text-center";
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const MotionDiv = animated ? motion.div : "div";

  return (
    <MotionDiv
      className={cn(
        "flex flex-col mb-12 max-w-4xl mx-auto",
        getContainerClass(),
        className
      )}
      initial={animated ? "hidden" : undefined}
      animate={animated ? "visible" : undefined}
      variants={animated ? headerVariants : undefined}
    >
      {badge && (
        <div className="mb-4">
          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-primary-100 text-primary border border-primary-200">
            {badge}
          </span>
        </div>
      )}
      
      <h2 className={cn(
        "text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-secondary mb-4",
        getAlignClass()
      )}>
        <span className="text-primary">{title.split(' ')[0]}</span>{' '}
        {title.split(' ').slice(1).join(' ')}
      </h2>
      
      {subtitle && (
        <h3 className={cn(
          "text-xl md:text-2xl lg:text-3xl font-semibold text-secondary mb-4",
          getAlignClass()
        )}>
          {subtitle}
        </h3>
      )}
      
      {description && (
        <p className={cn(
          "text-lg text-muted-foreground max-w-2xl",
          getAlignClass()
        )}>
          {description}
        </p>
      )}
    </MotionDiv>
  );
}
