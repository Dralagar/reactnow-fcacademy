// components/ParabolicImage.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface ParabolicImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  zoom?: boolean;
  circle?: boolean;
  parallax?: boolean;
  delay?: number;
  children?: React.ReactNode;
}

export default function ParabolicImage({ 
  src, 
  alt, 
  className = "", 
  width = 400,
  height = 300,
  priority = false,
  zoom = false,
  circle = false,
  parallax = false,
  delay = 0,
  children
}: ParabolicImageProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Fallback for missing images
  const imageSrc = imageError ? "/images/reactnowlog.png" : src;

  return (
    <motion.div
      className={`relative overflow-hidden ${circle ? 'rounded-full' : 'rounded-xl'} ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={zoom ? { scale: 1.05 } : {}}
    >
      <motion.div
        animate={parallax ? {
          y: isHovered ? -10 : 0,
        } : {}}
        transition={{ duration: 0.3 }}
      >
        <Image
          src={imageSrc}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className={`w-full h-full object-cover transition-all duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
          onError={() => setImageError(true)}
        />
      </motion.div>

      {/* Overlay gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.8 : 0.3 }}
        transition={{ duration: 0.3 }}
      />

      {/* Content overlay */}
      {children && (
        <div className="absolute inset-0 flex items-end p-4">
          {children}
        </div>
      )}

      {/* Parabolic border on hover */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 border-2 border-primary rounded-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.div>
  );
}