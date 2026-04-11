"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, Check } from "lucide-react";
import Link from "next/link";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShow(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShow(false);
  };

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:bottom-6 md:w-96 z-40"
      >
        <div className="bg-surface-dark border border-border/50 rounded-2xl shadow-2xl backdrop-blur-xl p-5">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
              <Cookie className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-white">Cookie Consent</h4>
              <p className="text-xs text-gray-400 mt-1">
                We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
              </p>
            </div>
            <button
              onClick={() => setShow(false)}
              className="w-6 h-6 bg-surface rounded-lg flex items-center justify-center hover:bg-surface/80 transition-colors"
              aria-label="Close"
            >
              <X className="w-3 h-3 text-gray-400" />
            </button>
          </div>

          <div className="flex items-center gap-2 mt-3">
            <Link
              href="/privacy"
              className="text-xs text-primary hover:text-primary-light transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-gray-600">•</span>
            <Link
              href="/terms"
              className="text-xs text-primary hover:text-primary-light transition-colors"
            >
              Terms of Use
            </Link>
          </div>

          <div className="flex gap-2 mt-4">
            <button
              onClick={acceptCookies}
              className="flex-1 px-3 py-2 bg-primary text-white rounded-lg text-xs font-medium hover:bg-primary-dark transition-colors flex items-center justify-center gap-1"
            >
              <Check className="w-3 h-3" />
              Accept
            </button>
            <button
              onClick={declineCookies}
              className="flex-1 px-3 py-2 bg-surface text-gray-300 rounded-lg text-xs font-medium hover:bg-surface/80 transition-colors border border-border/50"
            >
              Decline
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}