"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

/* =========================
   Data
========================= */

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
    emoji: "👩",
  },
  {
    quote:
      "These kids aren't just learning football — they're becoming leaders. I've seen shy boys become confident team captains.",
    author: "Coach Patrick",
    role: "Head Coach",
    emoji: "👨",
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
   Page
========================= */

export default function Home() {
  return (
    <main className="flex w-full flex-col bg-white">
      {/* =========================
         HERO
      ========================= */}
      <section className="hero-gradient relative flex min-h-[92vh] items-center overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:84px_84px] opacity-20" />
        <div className="absolute inset-0 bg-black/10" />

        <div className="container-custom relative z-10 py-24 text-center sm:py-28 lg:py-32">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.18)]">
              <span className="h-2 w-2 rounded-full bg-[#14B8A6] animate-pulse" />
              <span className="text-sm font-medium tracking-wide text-white/85">
                Grassroots • Discipline • Growth
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mb-5 text-[clamp(2.8rem,7vw,5.25rem)] font-extrabold leading-[0.95] tracking-[-0.04em] text-white"
          >
            React Now FC
            <span className="ml-3 inline-block align-middle">⚽</span>
          </motion.h1>

          <motion.h2
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mx-auto mb-6 max-w-4xl text-[clamp(1.7rem,4vw,3rem)] font-semibold leading-tight tracking-[-0.03em] text-white"
          >
            Where Football Meets Innovation & Impact
          </motion.h2>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="mx-auto mb-10 max-w-3xl text-[1.05rem] leading-8 text-white/78 sm:text-[1.15rem] lg:text-[1.35rem]"
          >
            We are a grassroots football initiative using sport to empower
            vulnerable youth — building life skills, discipline, education
            access, and digital literacy, one match at a time.
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
              className="inline-flex min-w-[210px] items-center justify-center rounded-2xl bg-white px-7 py-4 font-semibold text-[#081C1B] shadow-[0_14px_40px_rgba(255,255,255,0.12)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#F8FAFC] max-sm:w-full max-sm:max-w-[320px]"
            >
              Meet the Team
            </Link>

            <Link
              href="/impact"
              className="inline-flex min-w-[210px] items-center justify-center rounded-2xl border border-white/40 bg-white/5 px-7 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 max-sm:w-full max-sm:max-w-[320px]"
            >
              Follow Our Journey
            </Link>
          </motion.div>
        </div>
      </section>

      {/* =========================
         MISSION
      ========================= */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="flex flex-col items-center gap-14 lg:flex-row lg:gap-20">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              transition={{ duration: 0.55 }}
              className="w-full flex-1"
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#CCFBF1] bg-[#ECFEFF] px-4 py-2 text-sm font-semibold text-[#0D5C63]">
                <Sparkles size={14} />
                Brand Foundation
              </div>

              <h2 className="mb-6 text-[clamp(2rem,4vw,3.1rem)] font-extrabold leading-tight tracking-[-0.04em] text-[#081C1B]">
                Football is Our Starting Point,
                <span className="block text-[#0D5C63]">Not Our Final Goal</span>
              </h2>

              <p className="mb-5 text-[1.05rem] leading-8 text-[#4B5563] lg:text-lg">
                React Now FC Academy is a community-rooted, discipline-driven,
                and future-focused grassroots football initiative. We are
                building young players through structure, consistency, character,
                and long-term development.
              </p>

              <p className="mb-8 text-base leading-8 text-[#6B7280] lg:text-[1.03rem]">
                Our academy exists because talent is everywhere, but structure is
                not. Football opens the door, but the deeper mission is growth,
                accountability, mentorship, confidence, and opportunity.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/about" className="btn btn-primary max-sm:w-full">
                  Learn Our Story
                </Link>

                <Link href="/impact" className="btn btn-outline max-sm:w-full">
                  View Impact
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
              className="grid w-full flex-1 grid-cols-2 gap-4"
            >
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  transition={{ duration: 0.45 }}
                  className={`flex min-h-[180px] items-center justify-center rounded-[1.5rem] border border-[#E5E7EB] bg-gradient-to-br from-[#F8FAFC] to-[#EEF6F5] shadow-[0_10px_30px_rgba(0,0,0,0.05)] ${
                    i % 2 === 0 ? "mt-8" : ""
                  }`}
                >
                  <div className="px-4 text-center">
                    <div className="mb-3 text-4xl">⚽</div>
                    <p className="text-sm font-semibold text-[#0D5C63]">
                      Structured Growth
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================
         IMPACT STATS
      ========================= */}
      <section className="section bg-[#F8FAFC]">
        <div className="container-custom">
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
                className="flex-1 min-w-[220px] max-w-[280px] rounded-[1.4rem] border border-[#E5E7EB] bg-white px-6 py-8 text-center shadow-[0_10px_30px_rgba(15,23,42,0.05)]"
              >
                <div className="text-[clamp(1.8rem,4vw,3rem)] font-extrabold tracking-[-0.04em] text-[#0D5C63]">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm font-medium text-[#6B7280] sm:text-base">
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
      <section className="section bg-white">
        <div className="container-custom">
          <div className="mb-14 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#CCFBF1] bg-[#ECFEFF] px-4 py-2 text-sm font-semibold text-[#0D5C63]">
              <Sparkles size={14} />
              Weekly Features
            </div>

            <h2 className="mb-4 text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-[-0.04em] text-[#081C1B]">
              Player <span className="text-[#0D5C63]">Highlights</span>
            </h2>

            <p className="mx-auto max-w-2xl text-lg text-[#6B7280]">
              Celebrating excellence, discipline, effort, and growth on and off
              the pitch.
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
                key={index}
                variants={fadeUp}
                transition={{ duration: 0.45 }}
                className="group flex-1 min-w-[280px] max-w-[380px] rounded-[1.5rem] border border-[#E5E7EB] bg-white p-7 shadow-[0_12px_30px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
              >
                <div className="mb-4 flex items-start justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6B7280]">
                    {item.title}
                  </span>
                  <span className="text-3xl">{item.emoji}</span>
                </div>

                <h3 className="mb-2 text-[1.35rem] font-bold tracking-[-0.02em] text-[#081C1B]">
                  {item.name}
                </h3>

                <p className="mb-6 text-sm leading-7 text-[#6B7280]">
                  {item.details}
                </p>

                <Link
                  href="/team/highlights"
                  className="inline-flex items-center gap-2 font-semibold text-[#0D5C63] transition-colors group-hover:text-[#14B8A6]"
                >
                  View profile
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* =========================
         COMMUNITY
      ========================= */}
      <section className="section bg-[#FCFCFC]">
        <div className="container-custom">
          <div className="mb-14 text-center">
            <h2 className="mb-4 text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-[-0.04em] text-[#081C1B]">
              Community <span className="text-[#0D5C63]">in Action</span>
            </h2>

            <p className="mx-auto max-w-2xl text-lg text-[#6B7280]">
              Football as a vehicle for structure, learning, belonging, and
              social impact.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
            className="mb-16 flex flex-wrap justify-center gap-8"
          >
            {COMMUNITY_INITIATIVES.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                transition={{ duration: 0.4 }}
                className="flex-1 min-w-[220px] max-w-[260px] text-center"
              >
                <div
                  className={`mx-auto mb-5 flex h-28 w-28 items-center justify-center rounded-full border border-white text-3xl shadow-sm ${
                    index === 0
                      ? "bg-[#DCFCE7]"
                      : index === 1
                      ? "bg-[#DBEAFE]"
                      : index === 2
                      ? "bg-[#FEF9C3]"
                      : "bg-[#F3E8FF]"
                  }`}
                >
                  {item.emoji}
                </div>

                <h3 className="mb-2 text-[1.4rem] font-semibold tracking-[-0.02em] text-[#111827]">
                  {item.title}
                </h3>

                <p className="text-[1rem] leading-7 text-[#6B7280]">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
            className="flex flex-wrap justify-center gap-6"
          >
            {TESTIMONIALS.map((t, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                transition={{ duration: 0.4 }}
                className="flex-1 min-w-[320px] max-w-[620px] rounded-[1.35rem] border border-[#F1F5F9] bg-[#FAFAFA] px-7 py-8"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 text-3xl">{t.emoji}</div>

                  <div>
                    <p className="mb-5 text-[1.02rem] italic leading-8 text-[#4B5563]">
                      “{t.quote}”
                    </p>

                    <div className="text-lg font-semibold text-[#111827]">
                      — {t.author}
                    </div>

                    <div className="mt-1 text-sm text-[#6B7280]">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* =========================
         CTA
      ========================= */}
      <section className="section bg-[linear-gradient(135deg,#0D5C63_0%,#0A4449_100%)] text-center">
        <div className="container-custom text-white">
          <h2 className="mb-6 text-[clamp(2rem,4vw,3.1rem)] font-extrabold tracking-[-0.04em]">
            Join the React Now FC Movement
          </h2>

          <p className="mx-auto mb-10 max-w-2xl text-lg leading-8 text-white/82">
            Become part of a journey where football builds disciplined players,
            stronger communities, and real pathways for youth development.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/join"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-7 py-4 font-semibold text-[#0D5C63] transition-all duration-300 hover:-translate-y-1 hover:bg-[#F8FAFC] max-sm:w-full max-sm:max-w-[320px]"
            >
              Join the Academy
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-2xl border border-white/40 bg-white/5 px-7 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 max-sm:w-full max-sm:max-w-[320px]"
            >
              Partner With Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}