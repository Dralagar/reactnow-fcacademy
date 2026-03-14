// components/ParabolicTimeline.tsx
"use client";

import { motion, type Variants } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ParabolicTimelineItem {
  id?: string;
  title: string;
  description: string;
  eyebrow?: string;
  meta?: string;
  icon?: React.ReactNode;
}

interface ParabolicTimelineProps {
  items: ParabolicTimelineItem[];
  className?: string;
  itemClassName?: string;
  align?: "left" | "alternate";
  showConnector?: boolean;
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function ParabolicTimeline({
  items,
  className,
  itemClassName,
  align = "left",
  showConnector = true,
}: ParabolicTimelineProps) {
  return (
    <motion.ol
      className={cn("relative", className)}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      aria-label="Timeline"
    >
      {showConnector && (
        <div
          aria-hidden="true"
          className={cn(
            "absolute top-0 bottom-0 w-px bg-gradient-to-b from-sky-200 via-slate-200 to-transparent dark:from-sky-500/40 dark:via-white/10",
            align === "left" ? "left-5 sm:left-6" : "left-5 md:left-1/2 md:-translate-x-1/2"
          )}
        />
      )}

      <div className="space-y-6 sm:space-y-8">
        {items.map((item, index) => {
          const isAlternateRight = align === "alternate" && index % 2 !== 0;

          return (
            <motion.li
              key={item.id ?? `${item.title}-${index}`}
              variants={itemVariants}
              className={cn(
                "relative grid gap-4",
                align === "alternate"
                  ? "md:grid-cols-2 md:items-start"
                  : "grid-cols-1",
                itemClassName
              )}
            >
              {align === "alternate" && !isAlternateRight && (
                <div className="hidden md:block" aria-hidden="true" />
              )}

              <div
                className={cn(
                  "relative pl-14 sm:pl-16",
                  align === "alternate" &&
                    (isAlternateRight
                      ? "md:col-start-2 md:pl-16"
                      : "md:col-start-1 md:pl-0 md:pr-16")
                )}
              >
                <div
                  aria-hidden="true"
                  className={cn(
                    "absolute top-4 flex h-10 w-10 items-center justify-center rounded-full border border-sky-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-950",
                    align === "left" && "left-0",
                    align === "alternate" &&
                      (isAlternateRight
                        ? "left-0"
                        : "left-0 md:left-auto md:right-0")
                  )}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-300">
                    {item.icon ?? <CheckCircle2 className="h-4 w-4" />}
                  </div>
                </div>

                <article
                  className={cn(
                    "group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_18px_50px_-20px_rgba(15,23,42,0.16)] backdrop-blur supports-[backdrop-filter]:bg-white/95",
                    "dark:border-white/10 dark:bg-slate-950/70 dark:shadow-[0_18px_50px_-20px_rgba(0,0,0,0.45)]",
                    "transition-transform duration-300 hover:-translate-y-1",
                    align === "alternate" && !isAlternateRight && "md:text-right"
                  )}
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.95),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.10),transparent_28%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.06),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.14),transparent_28%)]"
                  />

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-300/80 to-transparent dark:via-white/30"
                  />

                  <div className="relative z-10 space-y-3">
                    {(item.eyebrow || item.meta) && (
                      <div
                        className={cn(
                          "flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium tracking-[0.18em] uppercase",
                          align === "alternate" && !isAlternateRight
                            ? "md:justify-end"
                            : "justify-start"
                        )}
                      >
                        {item.eyebrow && (
                          <span className="text-sky-700 dark:text-sky-300">
                            {item.eyebrow}
                          </span>
                        )}
                        {item.meta && (
                          <span className="text-slate-500 dark:text-slate-400">
                            {item.meta}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white sm:text-xl">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-[15px]">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-slate-200/70 dark:ring-white/10"
                  />
                </article>
              </div>

              {align === "alternate" && isAlternateRight && (
                <div className="hidden md:block" aria-hidden="true" />
              )}
            </motion.li>
          );
        })}
      </div>
    </motion.ol>
  );
}