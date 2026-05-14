"use client";

import React, { ReactNode } from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface AdvancedGridProps {
  children: ReactNode;
  className?: string;
  columns?: {
    mobile?: 1 | 2 | number;
    tablet?: 1 | 2 | 3 | 4 | number;
    desktop?: 1 | 2 | 3 | 4 | 5 | 6 | number;
    wide?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | number;
  };
  gap?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | string;
  layout?: "default" | "masonry" | "featured" | "cards" | "showcase" | "timeline";
  animated?: boolean;
  staggerDelay?: number;
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
}

/**
 * Advanced Grid System
 * Professional, responsive, and dynamic grid layouts
 */
export default function AdvancedGrid({
  children,
  className = "",
  columns = { mobile: 1, tablet: 2, desktop: 3, wide: 4 },
  gap = "lg",
  layout = "default",
  animated = true,
  staggerDelay = 0.1,
  align = "stretch",
  justify = "start",
}: AdvancedGridProps) {
  const getGridClass = () => {
    const base = "grid";
    
    // Mobile columns
    const mobileCols = columns.mobile || 1;
    const tabletCols = columns.tablet || 2;
    const desktopCols = columns.desktop || 3;
    const wideCols = columns.wide || 4;
    
    return `${base} grid-cols-${mobileCols} md:grid-cols-${tabletCols} lg:grid-cols-${desktopCols} xl:grid-cols-${wideCols}`;
  };

  const getGapClass = () => {
    const gapMap: Record<string, string> = {
      xs: "gap-2",
      sm: "gap-3",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
      "2xl": "gap-12"
    };
    return gapMap[gap as string] || "gap-6";
  };

  const getAlignClass = () => {
    const alignMap = {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch"
    };
    return alignMap[align] || "items-stretch";
  };

  const getJustifyClass = () => {
    const justifyMap = {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly"
    };
    return justifyMap[justify] || "justify-start";
  };

  const getLayoutClass = () => {
    switch (layout) {
      case "masonry":
        return "grid-flow-row-dense auto-rows-auto";
      case "featured":
        return "grid-flow-row auto-rows-fr";
      case "cards":
        return "grid-flow-row auto-rows-min";
      case "showcase":
        return "grid-flow-row-dense auto-rows-fr";
      case "timeline":
        return "grid-flow-col auto-cols-fr";
      default:
        return "grid-flow-row auto-rows-auto";
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const MotionDiv = animated ? motion.div : "div";

  return (
    <MotionDiv
      className={cn(
        getGridClass(),
        getGapClass(),
        getAlignClass(),
        getJustifyClass(),
        getLayoutClass(),
        className
      )}
      initial={animated ? "hidden" : undefined}
      animate={animated ? "visible" : undefined}
      variants={animated ? containerVariants : undefined}
    >
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;
        
        return (
          <motion.div
            key={child.key || index}
            variants={animated ? itemVariants : undefined}
            className={cn(
              "relative",
              layout === "masonry" && "break-inside-avoid",
              layout === "featured" && index === 0 && "md:col-span-2 md:row-span-2",
              layout === "showcase" && index % 3 === 0 && "md:col-span-2",
              layout === "timeline" && "flex flex-col"
            )}
          >
            {child}
          </motion.div>
        );
      })}
    </MotionDiv>
  );
}

/**
 * Preset grid configurations for common use cases
 */
export const GridPresets = {
  // Hero section layouts
  hero: {
    columns: { mobile: 1, tablet: 1, desktop: 1, wide: 1 },
    gap: "lg",
    layout: "default" as const,
    align: "center" as const,
    justify: "center" as const
  },
  
  // Feature cards
  features: {
    columns: { mobile: 1, tablet: 2, desktop: 3, wide: 3 },
    gap: "lg",
    layout: "cards" as const,
    align: "stretch" as const,
    justify: "center" as const
  },
  
  // Portfolio/showcase
  showcase: {
    columns: { mobile: 1, tablet: 2, desktop: 3, wide: 4 },
    gap: "md",
    layout: "showcase" as const,
    align: "stretch" as const,
    justify: "center" as const
  },
  
  // Testimonials
  testimonials: {
    columns: { mobile: 1, tablet: 2, desktop: 3, wide: 3 },
    gap: "lg",
    layout: "default" as const,
    align: "stretch" as const,
    justify: "center" as const
  },
  
  // Stats/metrics
  stats: {
    columns: { mobile: 2, tablet: 4, desktop: 4, wide: 4 },
    gap: "md",
    layout: "default" as const,
    align: "center" as const,
    justify: "center" as const
  },
  
  // Timeline
  timeline: {
    columns: { mobile: 1, tablet: 2, desktop: 3, wide: 3 },
    gap: "lg",
    layout: "timeline" as const,
    align: "start" as const,
    justify: "center" as const
  },
  
  // Blog/news
  blog: {
    columns: { mobile: 1, tablet: 2, desktop: 3, wide: 3 },
    gap: "lg",
    layout: "masonry" as const,
    align: "stretch" as const,
    justify: "center" as const
  },
  
  // Team members
  team: {
    columns: { mobile: 2, tablet: 3, desktop: 4, wide: 5 },
    gap: "md",
    layout: "default" as const,
    align: "center" as const,
    justify: "center" as const
  },
  
  // Gallery
  gallery: {
    columns: { mobile: 2, tablet: 3, desktop: 4, wide: 6 },
    gap: "sm",
    layout: "masonry" as const,
    align: "stretch" as const,
    justify: "center" as const
  }
};
