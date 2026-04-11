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
    quote:
      "React Now FC has given my son structure and purpose. His school grades have improved dramatically.",
    author: "Mary Atieno",
    role: "Parent",
    image: SITE_IMAGES.testimonialParent,
    alt: "Mary Atieno - Parent",
  },
  {
    quote:
      "These kids aren't just learning football — they're becoming leaders. I've seen shy boys become confident team captains.",
    author: "Keroro - Nicolas Wol Atak",
    role: "Head Coach",
    image: SITE_IMAGES.testimonialCoach,
    alt: "Coach Keroro - Nicolas Wol Atak",
  },
  {
    quote:
      "Football is the entry point, not the goal. We use the beautiful game to open doors to education, digital literacy, and real life opportunities for every child who walks onto our pitch.",
    author: "George Dralagar",
    role: "Founder & Executive Director",
    image: SITE_IMAGES.testimonialFounder,
    alt: "George Dralagar - Founder",
  },
];

const HIGHLIGHTS = [
  {
    title: "Player of the Week",
    name: "James 'Jamo' Odhiambo",
    details: "Midfielder · Age 12 · 95% attendance",
    emoji: "🏆",
  },
  {
    title: "Rising Star",
    name: "Sarah Akinyi",
    details: "Forward · Age 11 · Top scorer",
    emoji: "✨",
  },
  {
    title: "Match Highlight",
    name: "3–2 Victory vs Kibera United",
    details: "Comeback win · 2 goals in final minutes",
    emoji: "⚽",
  },
];

const IMPACT_STATS = [
  { value: "50+", label: "Youth Players" },
  { value: "12", label: "Countries Represented" },
  { value: "100%", label: "Free to Participate" },
  { value: "Structured", label: "Growth Pathway" },
];

const MISSION_CARDS = [
  {
    emoji: "🎯",
    title: "Our Vision",
    desc: "To create a world where every vulnerable youth has access to structured development through football, education, and mentorship.",
    bgColor: "from-success-50 to-success-100",
  },
  {
    emoji: "⚽",
    title: "Football Excellence",
    desc: "Professional training, tactics, and match preparation",
    bgColor: "from-secondary-50 to-secondary-100",
  },
  {
    emoji: "🧠",
    title: "Life Skills",
    desc: "Discipline, leadership, teamwork, and emotional intelligence",
    bgColor: "from-info-50 to-info-100",
  },
  {
    emoji: "📚",
    title: "Education Access",
    desc: "Homework mentoring, tutoring, and digital literacy programs",
    bgColor: "from-purple-50 to-purple-100",
  },
  {
    emoji: "💼",
    title: "Future Pathways",
    desc: "Career guidance, entrepreneurship, and life opportunities",
    bgColor: "from-accent-50 to-accent-100",
  },
];

/* =========================
   Motion
========================= */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
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
    <div
      className="absolute inset-0 z-0 overflow-hidden bg-[var(--secondary)]"
      aria-roledescription="carousel"
      aria-label="Homepage hero photography"
    >
      {/* Stacked slides (opacity crossfade) — reliable with next/image fill vs AnimatePresence unmount */}
      {HERO_IMAGES.map((slide, i) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-[700ms] ease-out motion-reduce:transition-none ${
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
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/30 p-2 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-black/50 focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Previous image"
      >
        <ChevronLeft size={24} className="text-white" />
      </button>

      <button
        type="button"
        onClick={goToNext}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/30 p-2 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-black/50 focus:outline-none focus:ring-2 focus:ring-white"
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
      {/* =========================
         HERO SECTION - WITH CAROUSEL
      ========================= */}
      <section className="relative isolate flex min-h-[92vh] w-full items-center overflow-hidden bg-[var(--secondary)]">
        <HeroCarousel />

        {/* Lighter wash so hero photography stays visible; text uses drop-shadow for contrast */}
        <div
          className="absolute inset-0 z-[5] bg-gradient-to-br from-primary-700/55 via-primary-600/40 to-secondary/50"
          aria-hidden
        />
        <div className="absolute inset-0 z-[6] bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:84px_84px] opacity-25" />
        <div className="absolute inset-0 z-[7] bg-gradient-to-t from-black/35 via-transparent to-transparent" />

        <div className="container-custom relative z-10 py-24 text-center sm:py-28 lg:py-32">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mb-8"
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
            className="mb-5 text-[clamp(2.8rem,7vw,5.25rem)] font-extrabold leading-[0.95] tracking-[-0.04em] text-white drop-shadow-lg"
          >
            React Now FC
            <span
              className="ml-3 inline-block align-middle md:ml-4"
              aria-hidden
            >
              <span className="relative inline-block h-12 w-12 md:h-16 md:w-16">
                <Image
                  src={SITE_IMAGES.logo}
                  alt=""
                  fill
                  className="object-contain drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]"
                  sizes="64px"
                />
              </span>
            </span>
          </motion.h1>

          <motion.h2
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mx-auto mb-6 max-w-4xl text-[clamp(1.7rem,4vw,3rem)] font-semibold leading-tight tracking-[-0.03em] text-white drop-shadow-lg"
          >
            Where Football Meets Innovation & Impact
          </motion.h2>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="mx-auto mb-10 max-w-3xl text-[1.05rem] leading-8 text-white/90 drop-shadow sm:text-[1.15rem] lg:text-[1.35rem]"
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
            className="flex flex-wrap justify-center gap-5"
          >
            <Link
              href="/team"
              className="group inline-flex min-w-[210px] items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-bold text-primary shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-surface hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary sm:text-lg"
            >
              Meet the Team
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/impact"
              className="group inline-flex min-w-[210px] items-center justify-center gap-2 rounded-2xl border-2 border-white/40 bg-white/15 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-white/30 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary sm:text-lg"
            >
              Follow Our Journey
            </Link>
          </motion.div>
        </div>
      </section>

      {/* =========================
         MISSION SECTION - 5 UNIQUE CARDS
      ========================= */}
      <section className="bg-white py-20 md:py-28">
        <div className="container-custom mx-auto max-w-7xl px-4">
          <div className="flex flex-col items-center gap-14 lg:flex-row lg:gap-20">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              transition={{ duration: 0.55 }}
              className="w-full flex-1"
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-100 bg-primary-50 px-4 py-2 text-sm font-semibold text-primary">
                <Sparkles size={14} />
                Brand Foundation
              </div>

              <h2 className="mb-6 text-[clamp(2rem,4vw,3.1rem)] font-extrabold leading-tight tracking-[-0.04em] text-secondary">
                Football is Our Starting Point,
                <span className="block text-primary">Not Our Final Goal</span>
              </h2>

              <p className="mb-5 text-[1.05rem] leading-8 text-text-secondary lg:text-lg">
                React Now FC Academy is a community-rooted, discipline-driven, and
                future-focused grassroots football initiative. We are building young
                players through structure, consistency, character, and long-term
                development.
              </p>

              <p className="mb-8 text-base leading-8 text-text-muted lg:text-[1.03rem]">
                Our academy exists because talent is everywhere, but structure is not.
                Football opens the door, but the deeper mission is growth,
                accountability, mentorship, confidence, and opportunity.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/about"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-primary-700 hover:shadow-lg max-sm:w-full"
                >
                  Learn Our Story
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  href="/impact"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl border-2 border-primary px-6 py-3 font-semibold text-primary transition-all duration-300 hover:scale-105 hover:bg-primary hover:text-white max-sm:w-full"
                >
                  View Impact
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
              className="w-full flex-1"
            >
              <div className="grid grid-cols-2 gap-4">
                {MISSION_CARDS.slice(0, 2).map((item) => (
                  <motion.div
                    key={item.title}
                    variants={fadeUp}
                    transition={{ duration: 0.45 }}
                    className={`flex min-h-[200px] flex-col items-center justify-center rounded-2xl border border-border bg-gradient-to-br ${item.bgColor} p-5 text-center shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-xl`}
                  >
                    <div className="mb-3 text-4xl">{item.emoji}</div>
                    <p className="text-base font-bold text-primary">{item.title}</p>
                    <p className="mt-2 text-xs leading-relaxed text-text-muted">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {MISSION_CARDS.slice(2, 5).map((item, i) => (
                  <motion.div
                    key={item.title}
                    variants={fadeUp}
                    transition={{ duration: 0.45, delay: i * 0.1 }}
                    className={`flex min-h-[200px] flex-col items-center justify-center rounded-2xl border border-border bg-gradient-to-br ${item.bgColor} p-5 text-center shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-xl`}
                  >
                    <div className="mb-3 text-4xl">{item.emoji}</div>
                    <p className="text-base font-bold text-primary">{item.title}</p>
                    <p className="mt-2 text-xs leading-relaxed text-text-muted">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================
         IMPACT STATS
      ========================= */}
      <section className="bg-surface py-16 md:py-20">
        <div className="container-custom mx-auto max-w-7xl px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
            className="flex flex-wrap justify-center gap-5"
          >
            {IMPACT_STATS.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                transition={{ duration: 0.4 }}
                className="min-w-[200px] max-w-[280px] flex-1 rounded-2xl border border-border bg-white px-6 py-8 text-center shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-xl"
              >
                <div className="text-[clamp(1.8rem,4vw,3rem)] font-extrabold tracking-[-0.04em] text-primary">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm font-medium text-text-muted sm:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* =========================
         PLAYER HIGHLIGHTS
      ========================= */}
      <section className="bg-white py-20 md:py-28">
        <div className="container-custom mx-auto max-w-7xl px-4">
          <div className="mb-14 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-100 bg-primary-50 px-4 py-2 text-sm font-semibold text-primary">
              <Sparkles size={14} />
              Weekly Features
            </div>

            <h2 className="mb-4 text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-[-0.04em] text-secondary">
              Player <span className="text-primary">Highlights</span>
            </h2>

            <p className="mx-auto max-w-2xl text-lg text-text-muted">
              Celebrating excellence, discipline, effort, and growth on and off the
              pitch.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
            className="flex flex-wrap justify-center gap-8"
          >
            {HIGHLIGHTS.map((item, index) => (
              <motion.div
                key={`${item.title}-${index}`}
                variants={fadeUp}
                transition={{ duration: 0.45 }}
                className="group flex min-w-[280px] max-w-[380px] flex-1 flex-col rounded-2xl border border-border bg-white p-7 shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-xl"
              >
                <div className="mb-4 flex items-start justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
                    {item.title}
                  </span>
                  <span className="text-3xl">{item.emoji}</span>
                </div>

                <h3 className="mb-2 text-xl font-bold tracking-[-0.02em] text-secondary">
                  {item.name}
                </h3>

                <p className="mb-6 flex-1 text-sm leading-6 text-text-muted">
                  {item.details}
                </p>

                <Link
                  href="/team/highlights"
                  className="inline-flex items-center gap-2 font-semibold text-primary transition-all duration-300 group-hover:gap-3 group-hover:text-primary-500"
                >
                  View profile
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* =========================
         COMMUNITY
      ========================= */}
      <section className="bg-surface py-20 md:py-28">
        <div className="container-custom mx-auto max-w-7xl px-4">
          <div className="mb-14 text-center">
            <h2 className="mb-4 text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-[-0.04em] text-secondary">
              Community <span className="text-primary">in Action</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-text-muted">
              Football as a vehicle for structure, learning, belonging, and social
              impact.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
            className="flex flex-wrap justify-center gap-8"
          >
            {COMMUNITY_INITIATIVES.map((item, index) => (
              <motion.div
                key={`${item.title}-${index}`}
                variants={fadeUp}
                transition={{ duration: 0.4 }}
                className="group flex min-w-[200px] max-w-[260px] flex-1 flex-col items-center rounded-2xl border border-transparent bg-white p-6 text-center shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-xl"
              >
                <div
                  className={`mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full text-3xl shadow-sm transition-all duration-300 group-hover:scale-110 ${
                    index === 0
                      ? "bg-success-100"
                      : index === 1
                      ? "bg-info-100"
                      : index === 2
                      ? "bg-accent-100"
                      : "bg-purple-100"
                  }`}
                >
                  {item.emoji}
                </div>
                <h3 className="mb-2 text-xl font-bold text-text-primary">{item.title}</h3>
                <p className="text-sm text-text-muted">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* TESTIMONIALS */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
            className="mt-20 flex flex-wrap justify-center gap-8"
          >
            {TESTIMONIALS.map((t, index) => (
              <motion.div
                key={`${t.author}-${index}`}
                variants={fadeUp}
                transition={{ duration: 0.4 }}
                className="flex min-w-[300px] max-w-[400px] flex-1 rounded-2xl border border-border bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-lg"
              >
                <div className="flex w-full flex-col items-center text-center">
                  <div className="relative mb-5 h-24 w-24 overflow-hidden rounded-full bg-primary/5 ring-2 ring-primary/25 ring-offset-2 ring-offset-white shadow-inner">
                    <Image
                      src={t.image}
                      alt={t.alt}
                      fill
                      className="object-cover object-top"
                      sizes="96px"
                    />
                  </div>

                  <div className="w-full">
                    <p className="mb-5 text-sm italic leading-relaxed text-text-secondary">
                      “{t.quote}”
                    </p>
                    <div className="text-base font-bold text-text-primary">
                      {t.author}
                    </div>
                    <div className="mt-1 text-sm font-semibold tracking-wide text-primary">
                      {t.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* =========================
         CTA SECTION
      ========================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary to-primary-700 py-20 text-center md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.15)_0%,_transparent_70%)]" />
        <div className="container-custom relative z-10 mx-auto max-w-4xl px-4">
          <h2 className="mb-6 text-[clamp(2rem,4vw,3.1rem)] font-extrabold tracking-[-0.04em] text-white drop-shadow-lg">
            Join the React Now FC Movement
          </h2>

          <p className="mx-auto mb-10 inline-block max-w-2xl rounded-2xl bg-white/10 px-6 py-3 text-lg font-semibold leading-8 text-white/90 drop-shadow-md backdrop-blur-sm">
            Become part of a journey where football builds disciplined players,
            stronger communities, and real pathways for youth development.
          </p>

          <div className="flex flex-wrap justify-center gap-5">
            <Link
              href="/join"
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-lg font-bold text-primary shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:bg-gray-50 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
            >
              Join the Academy
              <ArrowRight
                size={20}
                className="transition-transform duration-300 group-hover:translate-x-2"
              />
            </Link>

            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-white/40 bg-white/15 px-8 py-4 text-lg font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:bg-white/30 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
            >
              Partner With Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}