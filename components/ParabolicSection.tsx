"use client";

import { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import ParabolicBackground from "@/components/ParabolicBackground";

interface ParabolicSectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  containerClassName?: string;
  withBackground?: boolean;
  backgroundIntensity?: number;
  as?: "section" | "div";
}

const sectionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function ParabolicSection({
  children,
  id,
  className,
  containerClassName,
  withBackground = false,
  backgroundIntensity = 0.25,
  as = "section",
}: ParabolicSectionProps) {
  const MotionTag = motion[as];

  return (
    <MotionTag
      id={id}
      className={cn(
        "relative overflow-hidden",
        "py-16 sm:py-20 lg:py-24",
        className
      )}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
    >
      {/* Background Layer */}
      {withBackground && (
        <ParabolicBackground intensity={backgroundIntensity} />
      )}

      {/* Content Container */}
      <div
        className={cn(
          "relative z-10",
          "mx-auto w-full max-w-7xl",
          "px-4 sm:px-6 lg:px-8",
          containerClassName
        )}
      >
        {children}
      </div>
    </MotionTag>
  );
}