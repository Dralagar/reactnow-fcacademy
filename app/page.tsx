"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LazyMotion, domAnimation, m } from "framer-motion";
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

const COMMUNITY_ACCENT = {
  success: "bg-success-100",
  info: "bg-info-100",
  accent: "bg-accent-100",
  purple: "bg-purple-100",
} as const;

const COMMUNITY_INITIATIVES = [
  {
    emoji: "🧹",
    title: "Clean-up Drives",
    desc: "Community clean-ups when we coordinate them",
    accent: "success" as const,
  },
  {
    emoji: "💻",
    title: "Digital Literacy",
    desc: "Hands-on computer skills sessions",
    accent: "info" as const,
  },
  {
    emoji: "🌱",
    title: "Climate Action",
    desc: "Tree planting and recycling awareness",
    accent: "accent" as const,
  },
  {
    emoji: "💬",
    title: "Parent Support",
    desc: "Listening sessions and family check-ins",
    accent: "purple" as const,
  },
];

const TESTIMONIALS = [
  {
    quote:
      "React Now FC has given my son more structure. We're seeing steadier habits at home and more focus in class.",
    author: "Mary Atieno",
    role: "Parent",
    image: SITE_IMAGES.testimonialParent,
    alt: "Mary Atieno - Parent",
  },
  {
    quote:
      "These kids aren't just learning football — they're growing in confidence. I've watched quiet players step up in the group.",
    author: "Keroro - Nicolas Wol Atak",
    role: "Head Coach",
    image: SITE_IMAGES.testimonialCoach,
    alt: "Coach Keroro - Nicolas Wol Atak",
  },
  {
    quote:
      "Football is our entry point, not the whole story. We're building toward education access, digital literacy, and healthier routines — one training block at a time.",
    author: "George Dralagar",
    role: "Founder & Executive Director",
    image: SITE_IMAGES.testimonialFounder,
    alt: "George Dralagar - Founder",
  },
];

const HIGHLIGHTS = [
  {
    title: "Player of the Week",
    name: "Didi",
    details: "Midfielder · Age 12 · Consistent at training",
    emoji: "🏆",
  },
  { title: "Rising Star", name: "Dingo", details: "Forward · Age 6 · Loves being on the ball", emoji: "✨" },
  {
    title: "Match Highlight",
    name: "Arietho",
    details: "Comeback moment · two late goals in a friendly",
    emoji: "⚽",
  },
];

const IMPACT_STATS = [
  { value: "15+", label: "Youth in our pilot cohort" },
  { value: "4", label: "Countries represented (players & families)" },
  { value: "Pilot", label: "No player fees for this cohort" },
  { value: "Structured", label: "Training & off-pitch routines" },
];

const MISSION_CARDS = [
  {
    emoji: "🎯",
    title: "Our Vision",
    desc: "A north star: structured development through football, learning, and mentorship for vulnerable youth — built carefully, step by step.",
    bgColor: "from-success-50 to-success-100",
  },
  {
    emoji: "⚽",
    title: "Football",
    desc: "Age-appropriate training, teamwork, and match experience as we grow fixtures.",
    bgColor: "from-secondary-50 to-secondary-100",
  },
  {
    emoji: "🧠",
    title: "Life Skills",
    desc: "Discipline, respect, communication, and emotional regulation on and off the pitch.",
    bgColor: "from-info-50 to-info-100",
  },
  {
    emoji: "📚",
    title: "Learning Support",
    desc: "Homework help and study time where volunteers are available; digital skills when sessions run.",
    bgColor: "from-purple-50 to-purple-100",
  },
  {
    emoji: "💼",
    title: "Pathways (emerging)",
    desc: "Career conversations and guest visits as partners join — not promised everywhere yet.",
    bgColor: "from-accent-50 to-accent-100",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const inViewOnce = { once: true as const, amount: 0.15 as const };

/* =========================
   Hero carousel
========================= */

function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideCount = HERO_IMAGES.length;
  const showControls = slideCount > 1;

  useEffect(() => {
    if (!showControls) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slideCount);
    }, 5000);
    return () => clearInterval(interval);
  }, [showControls, slideCount]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slideCount) % slideCount);
  }, [slideCount]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slideCount);
  }, [slideCount]);

  return (
    <>
      <div className="absolute inset-0 z-0 overflow-hidden">
        {HERO_IMAGES.map((slide, i) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-[700ms] ease-out ${
              i === currentIndex ? "z-[1] opacity-100" : "pointer-events-none z-0 opacity-0"
            }`}
            aria-hidden={i !== currentIndex}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="100vw"
              priority={i === 0}
              className="object-cover object-center"
            />
          </div>
        ))}
      </div>

      {showControls ? (
        <>
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
        </>
      ) : null}
    </>
  );
}

/* =========================
   Page
========================= */

export default function Home() {
  return (
    <LazyMotion features={domAnimation}>
      <main className="flex w-full flex-col bg-white">
        <section className="relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden pt-20 lg:pt-24">
          <HeroCarousel />

          <div
            className="absolute inset-0 z-[5] bg-gradient-to-br from-primary-700/60 via-primary-600/40 to-secondary/50"
            aria-hidden
          />
          <div
            className="absolute inset-0 z-[6] bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:84px_84px] opacity-25"
            aria-hidden
          />
          <div
            className="absolute inset-0 z-[7] bg-gradient-to-t from-black/40 via-transparent to-transparent"
            aria-hidden
          />

          <div className="container-custom relative z-10 py-16 text-center sm:py-20 lg:py-24">
            <m.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-5 py-2 backdrop-blur-md">
                <span className="h-2 w-2 animate-pulse rounded-full bg-primary-500" />
                <span className="text-sm font-semibold tracking-wide text-white">
                  Grassroots · Early-stage · Growing with intent
                </span>
              </div>
            </m.div>

            <m.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mb-4"
            >
              <h1 className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[clamp(2.5rem,7vw,5rem)] font-extrabold leading-[1.1] tracking-[-0.04em] text-white drop-shadow-lg">
                <span>React Now FC</span>
                <span className="relative inline-block aspect-square h-10 w-10 shrink-0 md:h-14 md:w-14" aria-hidden>
                  <Image
                    src={SITE_IMAGES.logo}
                    alt=""
                    fill
                    className="object-contain drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]"
                    sizes="56px"
                  />
                </span>
              </h1>
            </m.div>

            <m.h2
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mx-auto mb-5 max-w-4xl text-[clamp(1.5rem,4vw,2.8rem)] font-semibold leading-tight tracking-[-0.03em] text-white drop-shadow-lg"
            >
              Football, learning, and community — together
            </m.h2>

            <m.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="mx-auto mb-8 max-w-3xl text-base leading-7 text-white/90 drop-shadow sm:text-lg lg:text-xl"
            >
              We are a grassroots pilot in Nairobi using football to build routine, respect, and belonging for
              vulnerable youth — with homework support and digital skills when sessions run. We share wins
              honestly and keep fundraising and partnerships tied to what we can deliver next.
            </m.p>

            <m.div
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
            </m.div>
          </div>
        </section>

        <section className="bg-white py-16 md:py-24">
          <div className="container-custom mx-auto max-w-7xl px-4">
            <div className="mb-10 text-center">
              <h2 className="mb-3 text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold tracking-[-0.04em] text-secondary">
                Our <span className="text-primary">Mission</span>
              </h2>
              <p className="mx-auto max-w-2xl text-base text-text-muted">
                Growing with players on and off the pitch through football, learning, and mentorship — at the pace
                our volunteers and partners can sustain.
              </p>
            </div>

            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={inViewOnce}
              variants={staggerContainer}
              className="flex flex-wrap justify-center gap-6"
            >
              {MISSION_CARDS.map((card, index) => (
                <m.div
                  key={`${card.title}-${index}`}
                  variants={fadeUp}
                  className={`group flex min-w-[260px] max-w-[320px] flex-1 flex-col rounded-2xl bg-gradient-to-br ${card.bgColor} p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-lg`}
                >
                  <div className="mb-3 text-4xl">{card.emoji}</div>
                  <h3 className="mb-2 text-lg font-bold text-secondary">{card.title}</h3>
                  <p className="text-sm leading-6 text-text-secondary">{card.desc}</p>
                </m.div>
              ))}
            </m.div>
          </div>
        </section>

        <section className="bg-surface py-12 md:py-16">
          <div className="container-custom mx-auto max-w-7xl px-4">
            <p className="mb-6 text-center text-xs font-medium uppercase tracking-wide text-text-muted">
              Snapshot — updates as our roster and programs change
            </p>
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={inViewOnce}
              variants={staggerContainer}
              className="flex flex-wrap justify-center gap-4"
            >
              {IMPACT_STATS.map((stat) => (
                <m.div
                  key={stat.label}
                  variants={fadeUp}
                  className="min-w-[160px] flex-1 rounded-2xl border border-border bg-white px-5 py-6 text-center shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-primary/30"
                >
                  <div className="text-[clamp(1.5rem,4vw,2.5rem)] font-extrabold tracking-[-0.04em] text-primary">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs font-medium text-text-muted sm:text-sm">{stat.label}</div>
                </m.div>
              ))}
            </m.div>
          </div>
        </section>

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
                Small stories from training — not a full league table or verified stats page.
              </p>
            </div>

            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={inViewOnce}
              variants={staggerContainer}
              className="flex flex-wrap justify-center gap-6"
            >
              {HIGHLIGHTS.map((item, index) => (
                <m.div
                  key={`${item.title}-${index}`}
                  variants={fadeUp}
                  className="group flex min-w-[260px] max-w-[350px] flex-1 flex-col rounded-2xl border border-border bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-primary/30"
                >
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <span className="text-left text-[10px] font-semibold uppercase tracking-[0.18em] text-text-muted">
                      {item.title}
                    </span>
                    <span className="shrink-0 text-2xl leading-none">{item.emoji}</span>
                  </div>
                  <h3 className="mb-1 text-lg font-bold tracking-[-0.02em] text-secondary">{item.name}</h3>
                  <p className="mb-4 flex-1 text-sm leading-6 text-text-muted">{item.details}</p>
                  <Link
                    href="/team/highlights"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all duration-300 group-hover:gap-3"
                  >
                    View profile
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </m.div>
              ))}
            </m.div>
          </div>
        </section>

        <section className="bg-surface py-16 md:py-24">
          <div className="container-custom mx-auto max-w-7xl px-4">
            <div className="mb-10 text-center">
              <h2 className="mb-3 text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold tracking-[-0.04em] text-secondary">
                Community <span className="text-primary">in Action</span>
              </h2>
              <p className="mx-auto max-w-2xl text-base text-text-muted">
                Initiatives we run or co-host when volunteers and partners are available — capacity varies month to
                month.
              </p>
            </div>

            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={inViewOnce}
              variants={staggerContainer}
              className="flex flex-wrap justify-center gap-6"
            >
              {COMMUNITY_INITIATIVES.map((item) => (
                <m.div
                  key={item.title}
                  variants={fadeUp}
                  className="group flex min-w-[180px] max-w-[220px] flex-1 flex-col items-center rounded-2xl border border-transparent bg-white p-5 text-center shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-primary/30"
                >
                  <div
                    className={`mx-auto mb-3 flex aspect-square h-16 w-16 items-center justify-center rounded-full text-2xl shadow-sm transition-all duration-300 group-hover:scale-110 ${COMMUNITY_ACCENT[item.accent]}`}
                  >
                    {item.emoji}
                  </div>
                  <h3 className="mb-1 text-lg font-bold text-text-primary">{item.title}</h3>
                  <p className="text-xs text-text-muted">{item.desc}</p>
                </m.div>
              ))}
            </m.div>

            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={inViewOnce}
              variants={staggerContainer}
              className="mt-16 flex flex-wrap justify-center gap-6"
            >
              {TESTIMONIALS.map((t) => (
                <m.article
                  key={t.author}
                  variants={fadeUp}
                  className="flex min-w-[280px] max-w-[350px] flex-1 flex-col items-center rounded-2xl border border-border bg-white p-6 text-center shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/35"
                >
                  <div className="relative mb-4 aspect-square h-20 w-20 shrink-0 overflow-hidden rounded-full bg-primary/5 ring-2 ring-primary/25">
                    <Image src={t.image} alt={t.alt} fill className="object-cover object-top" sizes="80px" />
                  </div>
                  <p className="mb-4 text-sm italic leading-relaxed text-text-secondary">"{t.quote}"</p>
                  <div className="text-sm font-bold text-text-primary">{t.author}</div>
                  <div className="mt-1 text-xs font-semibold tracking-wide text-primary">{t.role}</div>
                </m.article>
              ))}
            </m.div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-gradient-to-br from-primary to-primary-700 py-16 text-center md:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.15)_0%,_transparent_70%)]" aria-hidden />
          <div className="container-custom relative z-10 mx-auto max-w-4xl px-4">
            <h2 className="mb-5 text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold tracking-[-0.04em] text-white drop-shadow-lg">
              Join the React Now FC Movement
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-white/90">
              Volunteer hours, equipment, and partners help us keep sessions regular. If you want in, we will tell you
              plainly what we can offer this season versus what is still on the roadmap.
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
    </LazyMotion>
  );
}
