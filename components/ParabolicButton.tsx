// components/ParabolicButton.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode, useState } from "react";

interface ParabolicButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  loading?: boolean;
}

export default function ParabolicButton({ 
  children, 
  href, 
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  fullWidth = false,
  icon,
  iconPosition = "left",
  disabled = false,
  loading = false
}: ParabolicButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const baseClasses = "relative overflow-hidden rounded-lg font-semibold transition-all duration-300 inline-flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-dark",
    secondary: "bg-secondary text-white hover:bg-gray-900",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
    ghost: "text-primary hover:bg-primary/10",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm gap-2",
    md: "px-6 py-3 text-base gap-2",
    lg: "px-8 py-4 text-lg gap-3",
    xl: "px-10 py-5 text-xl gap-4",
  };

  const width = fullWidth ? "w-full" : "";

  const ButtonContent = () => (
    <>
      {loading && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-inherit"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </motion.div>
      )}
      
      <span className={`relative z-10 flex items-center gap-2 ${loading ? 'opacity-0' : ''}`}>
        {icon && iconPosition === "left" && (
          <motion.span
            animate={{ x: isHovered ? -3 : 0 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {icon}
          </motion.span>
        )}
        {children}
        {icon && iconPosition === "right" && (
          <motion.span
            animate={{ x: isHovered ? 3 : 0 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {icon}
          </motion.span>
        )}
      </span>
      
      {/* Parabolic background animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary to-primary-light"
        initial={{ x: "-100%" }}
        animate={{ x: isHovered ? "100%" : "-100%" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{ opacity: variant === "primary" ? 1 : 0.2 }}
      />
      
      {/* Parabolic ripple effect on hover */}
      <motion.div
        className="absolute inset-0 bg-white"
        initial={{ scale: 0, opacity: 0.5 }}
        animate={isHovered ? { scale: 2, opacity: 0 } : { scale: 0, opacity: 0.5 }}
        transition={{ duration: 0.6 }}
        style={{ borderRadius: "50%", originX: 0.5, originY: 0.5 }}
      />

      {/* Parabolic border glow */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        animate={{
          boxShadow: isHovered 
            ? ['0 0 0 0 rgba(5, 150, 105, 0)', '0 0 20px 4px rgba(5, 150, 105, 0.5)', '0 0 0 0 rgba(5, 150, 105, 0)']
            : '0 0 0 0 rgba(5, 150, 105, 0)'
        }}
        transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}
      />
    </>
  );

  if (disabled || loading) {
    return (
      <button
        disabled
        className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${width} ${className} cursor-not-allowed`}
      >
        <ButtonContent />
      </button>
    );
  }

  if (href) {
    return (
      <Link 
        href={href} 
        className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${width} ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <ButtonContent />
      </Link>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${width} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      disabled={disabled}
    >
      <ButtonContent />
    </motion.button>
  );
}