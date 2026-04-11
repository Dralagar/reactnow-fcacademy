"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 z-40 group focus-ring rounded-xl"
          aria-label="Scroll to top"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark rounded-xl blur opacity-70 group-hover:opacity-100 transition-opacity" />
          <div className="relative w-12 h-12 bg-surface-dark rounded-xl flex items-center justify-center border border-primary/30">
            <ArrowUp className="w-5 h-5 text-white" />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}