// components/ParabolicCard.tsx
"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type CardElement = "div" | "article" | "section";

type BaseCardProps = Omit<
  ComponentPropsWithoutRef<"div">,
  | "children"
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
  | "onDragEnter"
  | "onDragLeave"
  | "onDragOver"
  | "onDragExit"
  | "onDrop"
>;

interface ParabolicCardProps extends BaseCardProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  hoverEffect?: boolean;
  glowEffect?: boolean;
  delay?: number;
  as?: CardElement;
}

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
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

export default function ParabolicCard({
  children,
  className,
  contentClassName,
  hoverEffect = true,
  glowEffect = true,
  delay = 0,
  as = "div",
  ...props
}: ParabolicCardProps) {
  const commonProps = {
    className: cn(
      "group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_18px_50px_-20px_rgba(15,23,42,0.22)]",
      "backdrop-blur supports-[backdrop-filter]:bg-white/95",
      "dark:border-white/10 dark:bg-slate-950/70 dark:shadow-[0_18px_50px_-20px_rgba(0,0,0,0.45)]",
      hoverEffect &&
        "transition-transform duration-300 will-change-transform hover:-translate-y-1.5",
      className
    ),
    variants: cardVariants,
    initial: "hidden" as const,
    whileInView: "visible" as const,
    viewport: { once: true, amount: 0.2 },
    custom: delay,
    whileHover: hoverEffect
      ? {
          scale: 1.01,
          transition: {
            duration: 0.25,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        }
      : undefined,
    whileTap: hoverEffect ? { scale: 0.995 } : undefined,
    ...props,
  };

  const content = (
    <>
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0",
          "bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.92),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.12),transparent_28%)]",
          "dark:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.14),transparent_28%)]"
        )}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-300/80 to-transparent dark:via-white/40"
        animate={{
          opacity: hoverEffect ? [0.4, 0.85, 0.4] : 0.45,
        }}
        transition={{
          duration: 3.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {glowEffect && (
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 rounded-3xl opacity-0 blur-2xl transition-opacity duration-300",
            "bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.12),transparent_58%)]",
            "dark:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_58%)]",
            hoverEffect && "group-hover:opacity-100"
          )}
        />
      )}

      <div
        className={cn(
          "relative z-10 rounded-3xl p-6 sm:p-7 lg:p-8",
          contentClassName
        )}
      >
        {children}
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-300/70 to-transparent dark:via-white/15"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-slate-200/70 dark:ring-white/10"
      />
    </>
  );

  if (as === "article") {
    return <motion.article {...commonProps}>{content}</motion.article>;
  }

  if (as === "section") {
    return <motion.section {...commonProps}>{content}</motion.section>;
  }

  return <motion.div {...commonProps}>{content}</motion.div>;
}