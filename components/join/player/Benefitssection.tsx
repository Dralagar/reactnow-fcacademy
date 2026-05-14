"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  Brain,
  Users,
  Zap,
  Medal,
  Target,
} from "lucide-react";

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const BENEFITS: Benefit[] = [
  {
    icon: <Trophy className="w-8 h-8" />,
    title: "Professional Training",
    description: "Expert coaching focused on tactical skills, fitness, and competitive football development",
    color: "from-amber-50 to-orange-50",
  },
  {
    icon: <Brain className="w-8 h-8" />,
    title: "Life Skills Education",
    description: "Develop leadership, discipline, emotional intelligence, and critical decision-making abilities",
    color: "from-purple-50 to-pink-50",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Community Belonging",
    description: "Join a supportive network of peers, mentors, and families committed to growth",
    color: "from-blue-50 to-cyan-50",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Digital Literacy",
    description: "Access coding workshops and tech skills training for future career opportunities",
    color: "from-green-50 to-emerald-50",
  },
  {
    icon: <Medal className="w-8 h-8" />,
    title: "Character Recognition",
    description: "Earn certifications and recognition for excellence on and off the pitch",
    color: "from-red-50 to-rose-50",
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: "Structured Pathways",
    description: "Clear progression routes to higher-level football and educational opportunities",
    color: "from-indigo-50 to-blue-50",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export function BenefitsSection() {
  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-24">
      {/* Decorative background elements */}
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" aria-hidden />
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary/5 blur-3xl" aria-hidden />

      <div className="container-custom relative z-10 mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="mb-12 text-center md:mb-16">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mb-3 text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold tracking-[-0.04em] text-secondary"
          >
            Why Join React Now <span className="text-primary">FC?</span>
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="mx-auto max-w-2xl text-base leading-relaxed text-text-muted"
          >
            Beyond football, we invest in your complete development—building athletes, leaders, and future-ready individuals with real-world skills and opportunities.
          </motion.p>
        </div>

        {/* Benefits Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {BENEFITS.map((benefit, index) => (
            <motion.div
              key={`${benefit.title}-${index}`}
              variants={fadeUp}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${benefit.color} p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg md:p-8`}
            >
              {/* Animated background accent */}
              <div
                className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-white/30 opacity-0 transition-all duration-500 group-hover:opacity-100"
                aria-hidden
              />

              {/* Icon */}
              <div className="relative z-10 mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-white/40 text-primary backdrop-blur-sm transition-all duration-300 group-hover:scale-110">
                {benefit.icon}
              </div>

              {/* Content */}
              <h3 className="relative z-10 mb-2 text-lg font-bold text-text-primary">
                {benefit.title}
              </h3>
              <p className="relative z-10 text-sm leading-relaxed text-text-secondary">
                {benefit.description}
              </p>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-secondary transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="mt-16 grid gap-6 md:mt-20 md:grid-cols-4 sm:grid-cols-2"
        >
          {[
            { value: "15+", label: "Active Players" },
            { value: "4", label: "Countries" },
            { value: "100%", label: "Free Access" },
            { value: "1:8", label: "Coach Ratio" },
          ].map((stat, index) => (
            <motion.div
              key={`${stat.label}-${index}`}
              variants={fadeUp}
              className="rounded-xl border border-primary/10 bg-white/50 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-primary/30"
            >
              <div className="text-2xl font-extrabold text-primary md:text-3xl">
                {stat.value}
              </div>
              <div className="mt-2 text-xs font-medium text-text-muted sm:text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}