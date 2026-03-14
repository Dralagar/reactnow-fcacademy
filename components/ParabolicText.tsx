// components/ParabolicText.tsx
"use client";

import type { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type TextTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

interface ParabolicTextProps {
  children: ReactNode;
  className?: string;
  as?: TextTag;
  delay?: number;
  animate?: boolean;
  gradient?: boolean;
  glow?: boolean;
  balance?: boolean;
  maxWidth?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  align?: "left" | "center" | "right";
  tone?: "default" | "muted" | "strong";
}

const textVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const maxWidthMap: Record<NonNullable<ParabolicTextProps["maxWidth"]>, string> = {
  none: "",
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
};

const alignMap: Record<NonNullable<ParabolicTextProps["align"]>, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const toneMap: Record<NonNullable<ParabolicTextProps["tone"]>, string> = {
  default: "text-slate-700 dark:text-slate-300",
  muted: "text-slate-600 dark:text-slate-400",
  strong: "text-slate-900 dark:text-white",
};

const sizeMap: Record<TextTag, string> = {
  h1: "text-4xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6xl",
  h2: "text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl",
  h3: "text-2xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-3xl",
  h4: "text-xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-2xl",
  h5: "text-lg font-semibold tracking-tight text-slate-950 dark:text-white sm:text-xl",
  h6: "text-base font-semibold tracking-tight text-slate-950 dark:text-white sm:text-lg",
  p: "text-base leading-7 sm:text-lg sm:leading-8",
  span: "text-base",
};

const motionTagMap = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  h5: motion.h5,
  h6: motion.h6,
  p: motion.p,
  span: motion.span,
};

export default function ParabolicText({
  children,
  className,
  as = "h2",
  delay = 0,
  animate = true,
  gradient = false,
  glow = false,
  balance = false,
  maxWidth = "none",
  align = "left",
  tone = "default",
}: ParabolicTextProps) {
  const MotionComponent = motionTagMap[as];

  const isHeading = as.startsWith("h");

  return (
    <MotionComponent
      className={cn(
        "relative",
        sizeMap[as],
        !isHeading && toneMap[tone],
        alignMap[align],
        maxWidthMap[maxWidth],
        balance && "text-balance",
        gradient &&
          "bg-gradient-to-r from-slate-950 via-sky-700 to-slate-900 bg-clip-text text-transparent dark:from-white dark:via-sky-300 dark:to-slate-100",
        glow &&
          "drop-shadow-[0_0_18px_rgba(59,130,246,0.12)] dark:drop-shadow-[0_0_20px_rgba(125,211,252,0.10)]",
        className
      )}
      variants={animate ? textVariants : undefined}
      initial={animate ? "hidden" : undefined}
      whileInView={animate ? "visible" : undefined}
      viewport={{ once: true, amount: 0.35 }}
      custom={delay}
    >
      {children}
    </MotionComponent>
  );
}