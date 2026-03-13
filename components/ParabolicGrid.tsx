"use client";

import { motion, type Variants } from "framer-motion";
import { Children, type ReactNode } from "react";

interface ParabolicGridProps {
  children: ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: string;
  className?: string;
  staggerChildren?: number;
  delayChildren?: number;
}

const gridCols: Record<1 | 2 | 3 | 4, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 xl:grid-cols-4",
};

export default function ParabolicGrid({
  children,
  columns = 3,
  gap = "gap-8",
  className = "",
  staggerChildren = 0.12,
  delayChildren = 0.08,
}: ParabolicGridProps) {
  const items = Children.toArray(children);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 24,
      scale: 0.96,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 140,
        damping: 18,
      },
    },
  };

  return (
    <motion.div
      className={`grid ${gridCols[columns]} ${gap} ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      {items.map((child, index) => (
        <motion.div key={index} variants={itemVariants} className="h-full">
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}