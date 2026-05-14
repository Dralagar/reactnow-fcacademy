"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { validateImagePath, getSafeImageProps } from "@/lib/image-validation";

type SitePageHeroProps = {
  title: string;
  subtitle?: string;
  imageSrc: string;
  imageAlt: string;
  minHeightClass?: string;
  showBreadcrumb?: boolean;
  breadcrumbItems?: { label: string; href: string }[];
};

/**
 * Professional inner-page hero with photo background, dynamic overlays, and smooth animations.
 */
export default function SitePageHero({
  title,
  subtitle,
  imageSrc,
  imageAlt,
  minHeightClass = "min-h-[50vh] sm:min-h-[60vh] lg:min-h-[70vh]",
  showBreadcrumb = false,
  breadcrumbItems = [],
}: SitePageHeroProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, 20],
  );
  
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.5],
    [0.7, 0.85],
  );

  // Validate and get safe image props
  const safeImageSrc = validateImagePath(imageSrc, "hero");

  return (
    <section
      ref={sectionRef}
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 ${minHeightClass}`}
    >
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
        <motion.div
          style={{ y: imageY }}
          className="absolute inset-0 h-[120%] w-full -top-[10%] will-change-transform"
        >
          <div className="relative h-full w-full">
            <Image
              src={safeImageSrc}
              alt={imageAlt}
              fill
              className="object-cover object-center scale-105"
              sizes="100vw"
              priority
              style={{
                objectPosition: 'center 25%',
              }}
              onError={(e) => {
                // Fallback to a gradient if image fails to load
                const target = e.target as HTMLImageElement;
                if (target.src !== "/images/React1.jpeg") {
                  target.src = "/images/React1.jpeg";
                } else {
                  // Final fallback - hide image and show gradient
                  target.style.display = 'none';
                  target.parentElement!.className += ' bg-gradient-to-br from-primary-600 to-secondary-600';
                }
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Dynamic Overlay */}
      <motion.div 
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 z-[1] bg-gradient-to-t from-black/80 via-black/40 to-transparent" 
        aria-hidden 
      />
      
      {/* Grid Pattern Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:84px_84px] opacity-50"
        aria-hidden
      />

      {/* Radial Gradient for Depth */}
      <div 
        className="absolute inset-0 z-[3] bg-radial-gradient from-transparent via-transparent to-black/40" 
        aria-hidden 
      />

      {/* Content Container */}
      <div className="container-custom relative z-10 px-4 py-16 md:py-24">
        {/* Breadcrumb */}
        {showBreadcrumb && breadcrumbItems.length > 0 && (
          <motion.nav 
            className="mb-8 flex flex-wrap items-center gap-2 text-sm"
            initial={reduceMotion ? false : { opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {breadcrumbItems.map((item, index) => (
              <div key={item.href} className="flex items-center gap-2">
                {index > 0 && (
                  <span className="text-white/50" aria-hidden>/</span>
                )}
                {index === breadcrumbItems.length - 1 ? (
                  <span className="font-medium text-white/90">{item.label}</span>
                ) : (
                  <a 
                    href={item.href} 
                    className="text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}
          </motion.nav>
        )}

        {/* Main Content */}
        <motion.div
          className="max-w-5xl text-center"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Title with enhanced typography */}
          <h1 className="mb-6 text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.1] tracking-[-0.02em] text-white drop-shadow-2xl">
            <span className="inline-block bg-gradient-to-r from-white via-white to-white/90 bg-clip-text text-transparent">
              {title}
            </span>
          </h1>
          
          {/* Subtitle with improved readability */}
          {subtitle && (
            <motion.p 
              className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-white/95 drop-shadow-lg sm:text-xl md:text-2xl"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {subtitle}
            </motion.p>
          )}

          {/* Decorative Elements */}
          <motion.div 
            className="mx-auto flex items-center justify-center gap-1"
            initial={reduceMotion ? false : { scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <div className="h-1 w-8 rounded-full bg-primary-400" />
            <div className="h-1 w-4 rounded-full bg-primary-300" />
            <div className="h-1 w-2 rounded-full bg-primary-200" />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Fade Effect */}
      <div className="absolute bottom-0 left-0 right-0 z-[4] h-32 bg-gradient-to-t from-white to-transparent" aria-hidden />
    </section>
  );
}
