"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

type SitePageHeroProps = {
  title: string;
  subtitle?: string;
  imageSrc: string;
  imageAlt: string;
  minHeightClass?: string;
};

/**
 * Inner-page hero with photo background, teal wash, and subtle scroll parallax on the image.
 */
export default function SitePageHero({
  title,
  subtitle,
  imageSrc,
  imageAlt,
  minHeightClass = "min-h-[42vh] sm:min-h-[46vh]",
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
    reduceMotion ? [0, 0] : [0, 18],
  );

  return (
    <section
      ref={sectionRef}
      className={`relative flex items-center overflow-hidden bg-[var(--secondary)] ${minHeightClass}`}
    >
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
        <motion.div
          style={{ y: imageY }}
          className="absolute inset-0 h-[112%] w-full -top-[6%] will-change-transform"
        >
          {/* Explicit relative box so next/image fill always has dimensions */}
          <div className="relative h-full w-full">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority
            />
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-0 z-[1] hero-overlay-inner" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:64px_64px] opacity-25"
        aria-hidden
      />

      <motion.div
        className="container-custom relative z-10 px-4 py-14 md:py-20"
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className="max-w-4xl text-[clamp(1.875rem,4.5vw,3.25rem)] font-extrabold leading-[1.12] tracking-tight text-white drop-shadow-md">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/95 drop-shadow-sm sm:text-lg md:text-xl">
            {subtitle}
          </p>
        ) : null}
      </motion.div>
    </section>
  );
}
