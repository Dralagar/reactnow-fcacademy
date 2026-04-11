"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function LoadingBar() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleStart = () => {
      setLoading(true);
      setProgress(30);
    };

    const handleComplete = () => {
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 200);
    };

    // Simulate navigation events
    // In a real app, you'd connect this to Next.js router events
    window.addEventListener('beforeunload', handleStart);
    
    return () => {
      window.removeEventListener('beforeunload', handleStart);
    };
  }, []);

  if (!loading) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 h-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ pointerEvents: 'none' }}
    >
      <motion.div
        className="h-full bg-gradient-to-r from-primary via-primary-light to-primary-dark"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={!prefersReducedMotion ? { duration: 0.3 } : undefined}
        style={{ boxShadow: '0 0 10px var(--primary)' }}
      />
    </motion.div>
  );
}