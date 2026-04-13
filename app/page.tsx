"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { SITE_IMAGES } from "@/lib/site-images";

/* =========================
   Data
========================= */

const HERO_IMAGES = [
  { src: SITE_IMAGES.hero, alt: "React Now FC players in action on the pitch" },
  { src: SITE_IMAGES.heroYouth, alt: "Young players and families in the academy community" },
  { src: SITE_IMAGES.coachSession, alt: "Coach Keroro leading training with the squad" },
] as const;

const COMMUNITY_INITIATIVES = [
  { emoji: "🧹", title: "Clean-up Drives", desc: "Monthly community clean-ups" },
  { emoji: "💻", title: "Digital Literacy", desc: "Weekly coding workshops" },
  { emoji: "🌱", title: "Climate Action", desc: "Tree planting & recycling" },
  { emoji: "💬", title: "Parent Support", desc: "95% parent satisfaction" },
];

const TESTIMONIALS = [
  {
    quote: "React Now FC has given my son structure and purpose. His school grades have improved dramatically.",
    author: "Mary Atieno",
    role: "Parent",
    image: SITE_IMAGES.testimonialParent,
    alt: "Mary Atieno - Parent",
  },
  {
    quote: "These kids aren't just learning football — they're becoming leaders. I've seen shy boys become confident team captains.",
    author: "Keroro - Nicolas Wol Atak",
    role: "Head Coach",
    image: SITE_IMAGES.testimonialCoach,
    alt: "Coach Keroro - Nicolas Wol Atak",
  },
  {
    quote: "Football is the entry point, not the goal. We use the beautiful game to open doors to education, digital literacy, and real life opportunities for every child who walks onto our pitch.",
    author: "George Dralagar",
    role: "Founder & Executive Director",
    image: SITE_IMAGES.testimonialFounder,
    alt: "George Dralagar - Founder",
  },
];

const HIGHLIGHTS = [
  { title: "Player of the Week", name: "James 'Jamo' Odhiambo", details: "Midfielder · Age 12 · 95% attendance", emoji: "🏆" },
  { title: "Rising Star", name: "Sarah Akinyi", details: "Forward · Age 11 · Top scorer", emoji: "✨" },
  { title: "Match Highlight", name: "3–2 Victory vs Kibera United", details: "Comeback win · 2 goals in final minutes", emoji: "⚽" },
];

const IMPACT_STATS = [
  { value: "50+", label: "Youth Players" },
  { value: "12", label: "Countries Represented" },
  { value: "100%", label: "Free to Participate" },
  { value: "Structured", label: "Growth Pathway" },
];

const MISSION_CARDS = [
  { emoji: "🎯", title: "Our Vision", desc: "To create a world where every vulnerable youth has access to structured development through football, education, and mentorship.", bgColor: "from-success-50 to-success-100" },
  { emoji: "⚽", title: "Football Excellence", desc: "Professional training, tactics, and match preparation", bgColor: "from-secondary-50 to-secondary-100" },
  { emoji: "🧠", title: "Life Skills", desc: "Discipline, leadership, teamwork, and emotional intelligence", bgColor: "from-info-50 to-info-100" },
  { emoji: "📚", title: "Education Access", desc: "Homework mentoring, tutoring, and digital literacy programs", bgColor: "from-purple-50 to-purple-100" },
  { emoji: "💼", title: "Future Pathways", desc: "Career guidance, entrepreneurship, and life opportunities", bgColor: "from-accent-50 to-accent-100" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/* =========================
   Hero Carousel Component
========================= */

function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (HERO_IMAGES.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
  };

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[var(--secondary)]">
      {HERO_IMAGES.map((slide, i) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-[700ms] ease-out ${
            i === currentIndex ? "z-[1] opacity-100" : "z-0 opacity-0 pointer-events-none"
          }`}
          aria-hidden={i !== currentIndex}
        >
          <div className="absolute inset-0">
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority={i === 0}
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/30 p-2 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-black/50"
        aria-label="Previous image"
      >
        <ChevronLeft size={24} className="text-white" />
      </button>

      <button
        type="button"
        onClick={goToNext}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/30 p-2 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-black/50"
        aria-label="Next image"
      >
        <ChevronRight size={24} className="text-white" />
      </button>

      <div className="absolute bottom-6 left-0 right-0 z-20 flex items-center justify-center gap-2">
        {HERO_IMAGES.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* =========================
   Page
========================= */

export default function Home() {
  return (
    <main className="flex w-full flex-col bg-white">
      {/* HERO SECTION - WITH EXTRA TOP PADDING TO AVOID NAVBAR OVERLAP */}
      <section className="relative isolate flex min-h-screen w-full items-center overflow-hidden bg-[var(--secondary)] pt-20 lg:pt-24">
        <HeroCarousel />

        {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 z-[5] bg-gradient-to-br from-primary-700/60 via-primary-600/40 to-secondary/50" aria-hidden />
        <div className="absolute inset-0 z-[6] bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:84px_84px] opacity-25" />
        <div className="absolute inset-0 z-[7] bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        <div className="container-custom relative z-10 py-16 text-center sm:py-20 lg:py-24">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-5 py-2 backdrop-blur-md">
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary-500" />
              <span className="text-sm font-semibold tracking-wide text-white">
                Grassroots • Discipline • Growth
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mb-4 text-[clamp(2.5rem,7vw,5rem)] font-extrabold leading-[1.1] tracking-[-0.04em] text-white drop-shadow-lg"
          >
            React Now FC
            <span className="ml-3 inline-block align-middle" aria-hidden>
              <span className="relative inline-block h-10 w-10 md:h-14 md:w-14">
                <Image
                  src={SITE_IMAGES.logo}
                  alt=""
                  fill
                  className="object-contain drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]"
                  sizes="56px"
                />
              </span>
            </span>
          </motion.h1>

          <motion.h2
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mx-auto mb-5 max-w-4xl text-[clamp(1.5rem,4vw,2.8rem)] font-semibold leading-tight tracking-[-0.03em] text-white drop-shadow-lg"
          >
            Where Football Meets Innovation & Impact
          </motion.h2>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="mx-auto mb-8 max-w-3xl text-base leading-7 text-white/90 drop-shadow sm:text-lg lg:text-xl"
          >
            We are a grassroots football initiative using sport to empower vulnerable
            youth — building life skills, discipline, education access, and digital
            literacy, one match at a time.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.65, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              href="/team"
              className="group inline-flex min-w-[180px] items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3 text-base font-bold text-primary shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105 sm:px-8 sm:py-4 sm:text-lg"
            >
              Meet the Team
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/impact"
              className="group inline-flex min-w-[180px] items-center justify-center gap-2 rounded-2xl border-2 border-white/40 bg-white/15 px-6 py-3 text-base font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-white/30 sm:px-8 sm:py-4 sm:text-lg"
            >
              Follow Our Journey
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Rest of your sections remain the same */}
      <section className="bg-white py-16 md:py-24">
        {/* Mission section content - unchanged */}
        <div className="container-custom mx-auto max-w-7xl px-4">
          {/* ... keep your existing mission section ... */}
        </div>
      </section>

      {/* Impact Stats */}
      <section className="bg-surface py-12 md:py-16">
        <div className="container-custom mx-auto max-w-7xl px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
            className="flex flex-wrap justify-center gap-4"
          >
            {IMPACT_STATS.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="min-w-[160px] flex-1 rounded-2xl border border-border bg-white px-5 py-6 text-center shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-primary/30"
              >
                <div className="text-[clamp(1.5rem,4vw,2.5rem)] font-extrabold tracking-[-0.04em] text-primary">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs font-medium text-text-muted sm:text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Player Highlights */}
      <section className="bg-white py-16 md:py-24">
        <div className="container-custom mx-auto max-w-7xl px-4">
          <div className="mb-10 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary-100 bg-primary-50 px-4 py-1.5 text-sm font-semibold text-primary">
              <Sparkles size={14} />
              Weekly Features
            </div>
            <h2 className="mb-3 text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold tracking-[-0.04em] text-secondary">
              Player <span className="text-primary">Highlights</span>
            </h2>
            <p className="mx-auto max-w-2xl text-base text-text-muted">
              Celebrating excellence, discipline, effort, and growth on and off the pitch.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
            className="flex flex-wrap justify-center gap-6"
          >
            {HIGHLIGHTS.map((item, index) => (
              <motion.div
                key={`${item.title}-${index}`}
                variants={fadeUp}
                className="group flex min-w-[260px] max-w-[350px] flex-1 flex-col rounded-2xl border border-border bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-primary/30"
              >
                <div className="mb-3 flex items-start justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-text-muted">
                    {item.title}
                  </span>
                  <span className="text-2xl">{item.emoji}</span>
                </div>
                <h3 className="mb-1 text-lg font-bold tracking-[-0.02em] text-secondary">
                  {item.name}
                </h3>
                <p className="mb-4 flex-1 text-sm leading-6 text-text-muted">
                  {item.details}
                </p>
                <Link
                  href="/team/highlights"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all duration-300 group-hover:gap-3"
                >
                  View profile
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Community & Testimonials */}
      <section className="bg-surface py-16 md:py-24">
        <div className="container-custom mx-auto max-w-7xl px-4">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold tracking-[-0.04em] text-secondary">
              Community <span className="text-primary">in Action</span>
            </h2>
            <p className="mx-auto max-w-2xl text-base text-text-muted">
              Football as a vehicle for structure, learning, belonging, and social impact.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
            className="flex flex-wrap justify-center gap-6"
          >
            {COMMUNITY_INITIATIVES.map((item, index) => (
              <motion.div
                key={`${item.title}-${index}`}
                variants={fadeUp}
                className="group flex min-w-[180px] max-w-[220px] flex-1 flex-col items-center rounded-2xl border border-transparent bg-white p-5 text-center shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-primary/30"
              >
                <div className={`mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full text-2xl shadow-sm transition-all duration-300 group-hover:scale-110 ${
                  index === 0 ? "bg-success-100" : index === 1 ? "bg-info-100" : index === 2 ? "bg-accent-100" : "bg-purple-100"
                }`}>
                  {item.emoji}
                </div>
                <h3 className="mb-1 text-lg font-bold text-text-primary">{item.title}</h3>
                <p className="text-xs text-text-muted">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Testimonials */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
            className="mt-16 flex flex-wrap justify-center gap-6"
          >
            {TESTIMONIALS.map((t, index) => (
              <motion.div
                key={`${t.author}-${index}`}
                variants={fadeUp}
                className="flex min-w-[280px] max-w-[350px] flex-1 rounded-2xl border border-border bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/35"
              >
                <div className="flex w-full flex-col items-center text-center">
                  <div className="relative mb-4 h-20 w-20 overflow-hidden rounded-full bg-primary/5 ring-2 ring-primary/25">
                    <Image
                      src={t.image}
                      alt={t.alt}
                      fill
                      className="object-cover object-top"
                      sizes="80px"
                    />
                  </div>
                  <p className="mb-4 text-sm italic leading-relaxed text-text-secondary">
                    “{t.quote}”
                  </p>
                  <div className="text-sm font-bold text-text-primary">
                    {t.author}
                  </div>
                  <div className="mt-1 text-xs font-semibold tracking-wide text-primary">
                    {t.role}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary to-primary-700 py-16 text-center md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.15)_0%,_transparent_70%)]" />
        <div className="container-custom relative z-10 mx-auto max-w-4xl px-4">
          <h2 className="mb-5 text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold tracking-[-0.04em] text-white drop-shadow-lg">
            Join the React Now FC Movement
          </h2>
          <p className="mx-auto mb-8 inline-block max-w-2xl rounded-2xl bg-white/10 px-5 py-2 text-base font-semibold text-white/90 backdrop-blur-sm">
            Become part of a journey where football builds disciplined players, stronger communities, and real pathways.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/join"
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3 text-base font-bold text-primary shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 sm:px-8 sm:py-4"
            >
              Join the Academy
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-white/40 bg-white/15 px-6 py-3 text-base font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-white/30 sm:px-8 sm:py-4"
            >
              Partner With Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}