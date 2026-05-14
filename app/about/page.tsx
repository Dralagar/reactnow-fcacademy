"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  Heart, Target, Users, Trophy, Star, BookOpen,
  Globe, Shield, Zap, ChevronRight, ArrowRight,
  Award, Flag, Quote, Leaf, Lightbulb, CheckCircle2,
  GraduationCap, Handshake, Sunrise, MapPin
} from "lucide-react";
import { academyImages } from "@/lib/imageLibrary";

/* =========================
   Design Tokens & CSS Vars
   Palette: warm earth + vivid green + charcoal
========================= */

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --earth:      #C8692A;
    --earth-light: #F2A96A;
    --green:      #2A7A4F;
    --green-light: #D4EDE1;
    --charcoal:   #1A1A1A;
    --cream:      #FAF6F0;
    --sand:       #F0E8DC;
    --white:      #FFFFFF;
    --text:       #2C2C2C;
    --muted:      #6B6B6B;
  }
`;

/* =========================
   Helpers
========================= */

function InView({ children, className = "", delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* =========================
   Section Label
========================= */
function Label({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className={`inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase mb-4 ${light ? "text-[var(--earth-light)]" : "text-[var(--earth)]"}`}>
      <span className="w-6 h-px bg-current" />
      {children}
    </div>
  );
}

/* =========================
   TIMELINE
========================= */
const timelineEvents = [
  {
    year: "2023",
    title: "The Spark",
    body: "George Dralagar watches talented kids in Nairobi with no structured environment, no mentors, and no pathway. He decides something must change.",
    icon: <Lightbulb className="w-5 h-5" />,
  },
  {
    year: "Early 2024",
    title: "First Whistle",
    body: "React Now FC Academy holds its first training session. 15 youth players. One pitch. Zero budget. 100% heart.",
    icon: <Flag className="w-5 h-5" />,
  },
  {
    year: "Mid 2024",
    title: "Community Roots",
    body: "Parent trust grows. Community clean-ups launch. Education monitoring begins. The program expands beyond football.",
    icon: <Heart className="w-5 h-5" />,
  },
  {
    year: "Late 2024",
    title: "Global Reach",
    body: "Partnerships form across 5 countries. International coaches bring expertise. The academy gains recognition beyond Nairobi.",
    icon: <Globe className="w-5 h-5" />,
  },
  {
    year: "2025",
    title: "Growing Strong",
    body: "Digital literacy programs, scholarship pathways, and climate action initiatives woven fully into the curriculum.",
    icon: <GraduationCap className="w-5 h-5" />,
  },
  {
    year: "Tomorrow",
    title: "The Long Game",
    body: "A regional network of academies where any child who wants to grow finds structure, mentorship, and a real future.",
    icon: <Sunrise className="w-5 h-5" />,
  },
];

function Timeline() {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--earth)] via-[var(--green)] to-transparent" />

      <div className="space-y-8 md:space-y-0">
        {timelineEvents.map((ev, i) => {
          const isRight = i % 2 === 0;
          return (
            <InView key={ev.year} delay={i * 0.1} className={`relative flex md:items-center gap-0 ${isRight ? "md:flex-row" : "md:flex-row-reverse"}`}>
              {/* Content */}
              <div className={`flex-1 pl-16 pb-10 md:pb-0 md:pl-0 ${isRight ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"}`}>
                <div className={`inline-block text-xs font-bold tracking-widest text-[var(--earth)] mb-1 uppercase`}>{ev.year}</div>
                <h3 className="text-xl font-bold text-[var(--charcoal)] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{ev.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--muted)] max-w-xs ml-auto md:ml-0">{ev.body}</p>
              </div>

              {/* Dot */}
              <div className="absolute left-0 md:static md:flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-full bg-[var(--charcoal)] text-white border-4 border-white shadow-lg z-10">
                {ev.icon}
              </div>

              {/* Spacer */}
              <div className="hidden md:block flex-1" />
            </InView>
          );
        })}
      </div>
    </div>
  );
}

/* =========================
   QUOTE CARD
========================= */
function QuoteCard({ quote, name, role, accent = false }: {
  quote: string; name: string; role: string; accent?: boolean;
}) {
  return (
    <div className={`relative rounded-3xl p-8 ${accent ? "bg-[var(--earth)] text-white" : "bg-white border border-gray-100 shadow-lg"}`}>
      <Quote className={`w-8 h-8 mb-4 opacity-40 ${accent ? "text-white" : "text-[var(--earth)]"}`} />
      <p className={`text-lg leading-relaxed mb-6 italic ${accent ? "text-white/90" : "text-[var(--text)]"}`} style={{ fontFamily: "'Playfair Display', serif" }}>
        "{quote}"
      </p>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${accent ? "bg-white/20 text-white" : "bg-[var(--green-light)] text-[var(--green)]"}`}>
          {name.charAt(0)}
        </div>
        <div>
          <div className={`font-semibold text-sm ${accent ? "text-white" : "text-[var(--charcoal)]"}`}>{name}</div>
          <div className={`text-xs ${accent ? "text-white/70" : "text-[var(--muted)]"}`}>{role}</div>
        </div>
      </div>
    </div>
  );
}

/* =========================
   PHILOSOPHY PILLAR
========================= */
function PhilosophyPillar({ number, title, body }: { number: string; title: string; body: string }) {
  return (
    <InView className="group border-b border-gray-200 py-8 flex gap-6 hover:border-[var(--earth)] transition-colors">
      <div className="text-4xl font-black text-gray-100 group-hover:text-[var(--earth-light)] transition-colors flex-shrink-0 w-14" style={{ fontFamily: "'Playfair Display', serif" }}>
        {number}
      </div>
      <div>
        <h3 className="text-lg font-bold text-[var(--charcoal)] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{title}</h3>
        <p className="text-[var(--muted)] leading-relaxed text-sm">{body}</p>
      </div>
    </InView>
  );
}

/* =========================
   LEADERSHIP CARD
========================= */
function LeaderCard({ name, role, bio, initials }: {
  name: string; role: string; bio: string; initials: string;
}) {
  return (
    <InView className="group">
      <div className="relative overflow-hidden rounded-3xl bg-[var(--sand)] aspect-[3/4] mb-5 flex items-center justify-center">
        <div className="text-7xl font-black text-[var(--earth-light)]" style={{ fontFamily: "'Playfair Display', serif" }}>
          {initials}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--charcoal)]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
          <p className="text-white/90 text-sm leading-relaxed">{bio}</p>
        </div>
      </div>
      <h3 className="font-bold text-[var(--charcoal)]" style={{ fontFamily: "'Playfair Display', serif" }}>{name}</h3>
      <p className="text-sm text-[var(--earth)]">{role}</p>
    </InView>
  );
}

/* =========================
   TRAINING VALUE
========================= */
function TrainingValue({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <InView className="flex gap-5">
      <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-[var(--green-light)] flex items-center justify-center text-[var(--green)]">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-[var(--charcoal)] mb-1">{title}</h4>
        <p className="text-sm text-[var(--muted)] leading-relaxed">{desc}</p>
      </div>
    </InView>
  );
}

/* =========================
   IMPACT STAT
========================= */
function ImpactStat({ value, label, sub }: { value: string; label: string; sub: string }) {
  return (
    <div className="text-center">
      <div className="text-5xl md:text-6xl font-black text-[var(--earth)]" style={{ fontFamily: "'Playfair Display', serif" }}>{value}</div>
      <div className="text-white font-semibold mt-1">{label}</div>
      <div className="text-white/60 text-xs mt-1">{sub}</div>
    </div>
  );
}

/* =========================
   MAIN PAGE
========================= */
export default function AboutPage() {
  return (
    <>
      <style>{CSS}</style>
      <div style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--text)", background: "var(--cream)" }}>

        {/* ── 1. HERO ── */}
        <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={academyImages.teamPhoto1}
              alt="React Now FC Academy Players"
              fill className="object-cover" priority sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />
          </div>

          {/* Scroll hint */}
          <div className="absolute top-8 right-8 z-20">
            <div className="text-white/50 text-xs tracking-widest uppercase" style={{ writingMode: "vertical-rl" }}>
              Scroll to discover
            </div>
          </div>

          <div className="relative z-10 px-6 sm:px-12 lg:px-20 pb-16 sm:pb-24 max-w-7xl">
            <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
              <Label light>React Now FC Academy</Label>
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white leading-[0.95] mb-6 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                The beautiful<br />
                <em className="not-italic text-[var(--earth-light)]">game.</em><br />
                A better life.
              </h1>
              <p className="text-white/70 text-lg sm:text-xl max-w-xl leading-relaxed mb-10">
                Grassroots football with structure, heart, and a long view—
                so talent everywhere can meet opportunity and transform lives.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/join" className="inline-flex items-center gap-2 bg-[var(--earth)] text-white px-7 py-4 rounded-2xl font-semibold text-sm tracking-wide hover:bg-[var(--earth-light)] transition-colors">
                  Join the academy <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/impact" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-7 py-4 rounded-2xl font-semibold text-sm tracking-wide hover:bg-white/20 transition-colors">
                  See our impact
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Pull quote bottom-right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="absolute bottom-16 right-8 sm:right-16 max-w-xs text-right hidden sm:block z-10"
          >
            <p className="text-white/50 text-sm italic" style={{ fontFamily: "'Playfair Display', serif" }}>
              "Football is the hook.<br />Growth is the destination."
            </p>
          </motion.div>
        </section>

        {/* ── 2. MISSION STATEMENT ── */}
        <section className="py-24 sm:py-32 bg-[var(--charcoal)] relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(45deg, var(--earth) 0, var(--earth) 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }} />
          <div className="relative max-w-5xl mx-auto px-6 sm:px-12">
            <InView className="text-center">
              <Label light>Our North Star</Label>
              <h2 className="text-4xl sm:text-6xl font-black text-white leading-tight mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
                We exist because<br />
                <em className="not-italic text-[var(--earth-light)]">talent is everywhere.</em><br />
                Opportunity is not.
              </h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
                React Now FC Academy uses football as a vehicle to build discipline, unlock education, 
                and create real pathways for young people in Nairobi—and beyond.
              </p>
            </InView>

            <div className="grid md:grid-cols-3 gap-6 mt-16">
              {[
                { label: "Mission", body: "Use football as an engine for structure, character, and opportunity for vulnerable youth—on the pitch, in school, and in life.", icon: <Target className="w-5 h-5" /> },
                { label: "Vision", body: "A community where every young person who wants to grow finds coaches, mentors, and programs that believe in their future.", icon: <Sunrise className="w-5 h-5" /> },
                { label: "Method", body: "Free to participate where possible. High expectations always: attendance, respect, effort, and teamwork are non-negotiable.", icon: <CheckCircle2 className="w-5 h-5" /> },
              ].map((item, i) => (
                <InView key={item.label} delay={i * 0.15} className="bg-white/5 border border-white/10 rounded-3xl p-7 hover:border-[var(--earth)] transition-colors">
                  <div className="w-10 h-10 bg-[var(--earth)]/20 rounded-xl flex items-center justify-center text-[var(--earth-light)] mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-white font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>{item.label}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{item.body}</p>
                </InView>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. FOUNDER STORY ── */}
        <section className="py-24 sm:py-32 bg-[var(--cream)]">
          <div className="max-w-7xl mx-auto px-6 sm:px-12">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <InView>
                <Label>Founder Story</Label>
                <h2 className="text-4xl sm:text-5xl font-black text-[var(--charcoal)] leading-tight mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
                  One man.<br />One pitch.<br />
                  <em className="not-italic text-[var(--earth)]">Unstoppable belief.</em>
                </h2>
                <div className="space-y-4 text-[var(--muted)] leading-relaxed">
                  <p>
                    George Dralagar grew up watching what happens when young people have talent but no structure. 
                    He saw potential wasted not for lack of ability, but for lack of a consistent, caring environment 
                    that held kids to a standard and helped them meet it.
                  </p>
                  <p>
                    In 2024, he did something about it. With one pitch in Nairobi, a handful of players, 
                    and a philosophy built on discipline, education, and community, React Now FC Academy was born.
                  </p>
                  <p>
                    Today the academy reaches youth across multiple countries — not because it scaled fast, 
                    but because the model works: consistent structure, genuine care, and football as the bridge 
                    between where a child is and where they can go.
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[var(--earth)] flex items-center justify-center text-white font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>GD</div>
                  <div>
                    <div className="font-semibold text-[var(--charcoal)]">George Dralagar</div>
                    <div className="text-sm text-[var(--earth)]">Founder & Head Coach</div>
                    <div className="text-xs text-[var(--muted)] flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" /> Nairobi, Kenya
                    </div>
                  </div>
                </div>
              </InView>

              <InView delay={0.2}>
                <div className="relative">
                  <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                    <Image
                      src="/testimonials/george-dralagar.jpg"
                      alt="George Dralagar"
                      fill className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  {/* Floating badge */}
                  <div className="absolute -bottom-6 -left-6 bg-[var(--earth)] text-white rounded-2xl p-5 shadow-xl">
                    <div className="text-3xl font-black" style={{ fontFamily: "'Playfair Display', serif" }}>2024</div>
                    <div className="text-xs text-white/80 mt-1">Academy Founded</div>
                  </div>
                  {/* Quote badge */}
                  <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-5 shadow-xl max-w-[180px]">
                    <Quote className="w-4 h-4 text-[var(--earth)] mb-2" />
                    <p className="text-xs text-[var(--text)] italic leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
                      "Every child deserves a coach who believes in them."
                    </p>
                  </div>
                </div>
              </InView>
            </div>
          </div>
        </section>

        {/* ── 4. PHILOSOPHY ── */}
        <section className="py-24 sm:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-12">
            <div className="grid lg:grid-cols-2 gap-16">
              <InView>
                <Label>Philosophy</Label>
                <h2 className="text-4xl sm:text-5xl font-black text-[var(--charcoal)] leading-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                  The principles<br />we train by
                </h2>
                <p className="text-[var(--muted)] leading-relaxed mb-8">
                  Everything we do flows from a set of deeply-held beliefs about what young people need 
                  and what a community owes its children.
                </p>
              </InView>

              <div>
                <PhilosophyPillar number="01" title="Structure creates freedom" body="Discipline and consistent expectations don't limit kids — they liberate them. Knowing what's expected frees players to grow within a safe, predictable environment." />
                <PhilosophyPillar number="02" title="The pitch is a classroom" body="Every training session teaches more than football. It teaches how to respond to failure, how to lead, how to listen, and how to show up for your team." />
                <PhilosophyPillar number="03" title="No child left on the sidelines" body="Participation is free. Expectations are high. We never turn a child away for lack of resources — we find a way." />
                <PhilosophyPillar number="04" title="Parents and coaches are partners" body="Youth development happens between sessions too. We engage families as co-educators, not spectators." />
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. TRAINING VALUES ── */}
        <section className="py-24 sm:py-32 bg-[var(--sand)]">
          <div className="max-w-7xl mx-auto px-6 sm:px-12">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <InView>
                <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src={academyImages.trainingSession || "/images/React7.jpeg"}
                    alt="Training session"
                    fill className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[var(--earth)]/40 to-transparent" />
                </div>
              </InView>

              <div>
                <InView>
                  <Label>Training Values</Label>
                  <h2 className="text-4xl sm:text-5xl font-black text-[var(--charcoal)] leading-tight mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
                    What we build<br />every session
                  </h2>
                </InView>

                <div className="space-y-6">
                  <TrainingValue icon={<Shield className="w-5 h-5" />} title="Accountability" desc="Players own their effort, their attendance, and their behavior. Coaches model the same standards they expect." />
                  <TrainingValue icon={<Users className="w-5 h-5" />} title="Teamwork" desc="Individual talent serves the collective. We train players to elevate those around them, not just themselves." />
                  <TrainingValue icon={<Zap className="w-5 h-5" />} title="Resilience" desc="Losing, making mistakes, and getting back up are trained as deliberately as any technical skill." />
                  <TrainingValue icon={<Handshake className="w-5 h-5" />} title="Respect" desc="For coaches, opponents, referees, parents, and the game itself. Respect is the first thing we teach and the last thing we'll compromise on." />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 6. EDUCATION BALANCE ── */}
        <section className="py-24 sm:py-32 bg-[var(--green)] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          <div className="relative max-w-7xl mx-auto px-6 sm:px-12">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <InView>
                <Label light>Education Balance</Label>
                <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Football opens<br />the door. Education<br />
                  <em className="not-italic text-[var(--green-light)]">keeps it open.</em>
                </h2>
                <p className="text-white/70 leading-relaxed mb-6">
                  We monitor school performance alongside athletic development. If grades slip, 
                  so does playing time — because we're not building footballers, we're building futures.
                </p>
                <div className="space-y-4">
                  {[
                    "Homework check-ins before every training session",
                    "Academic mentorship paired with athletic coaching",
                    "Digital literacy and career pathway workshops",
                    "Scholarship referrals for academic achievers",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[var(--green-light)] flex-shrink-0 mt-0.5" />
                      <span className="text-white/80 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </InView>

              <InView delay={0.2} className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-6">
                  <GraduationCap className="w-8 h-8 text-[var(--green-light)] mb-4" />
                  <div className="text-3xl font-black text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>87%</div>
                  <div className="text-white/60 text-xs">Grade improvement among active players</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-6 mt-8">
                  <BookOpen className="w-8 h-8 text-[var(--green-light)] mb-4" />
                  <div className="text-3xl font-black text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>100%</div>
                  <div className="text-white/60 text-xs">Players enrolled in formal education</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-6">
                  <Lightbulb className="w-8 h-8 text-[var(--green-light)] mb-4" />
                  <div className="text-3xl font-black text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>3x</div>
                  <div className="text-white/60 text-xs">More likely to pursue digital careers</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-6 mt-8">
                  <Star className="w-8 h-8 text-[var(--green-light)] mb-4" />
                  <div className="text-3xl font-black text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>95%</div>
                  <div className="text-white/60 text-xs">Parent satisfaction rate</div>
                </div>
              </InView>
            </div>
          </div>
        </section>

        {/* ── 7. TIMELINE ── */}
        <section className="py-24 sm:py-32 bg-[var(--cream)]">
          <div className="max-w-5xl mx-auto px-6 sm:px-12">
            <InView className="text-center mb-16">
              <Label>Our Journey</Label>
              <h2 className="text-4xl sm:text-5xl font-black text-[var(--charcoal)] leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                From a dream to<br />
                <em className="not-italic text-[var(--earth)]">a movement</em>
              </h2>
            </InView>
            <Timeline />
          </div>
        </section>

        {/* ── 8. SOCIAL IMPACT & QUOTES ── */}
        <section className="py-24 sm:py-32 bg-[var(--charcoal)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--earth)] to-transparent opacity-40" />
          <div className="max-w-7xl mx-auto px-6 sm:px-12">
            <InView className="text-center mb-16">
              <Label light>Social Impact</Label>
              <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                Beyond the final whistle
              </h2>
            </InView>

            {/* Impact stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
              <InView delay={0}><ImpactStat value="15+" label="Youth Players" sub="Active in program" /></InView>
              <InView delay={0.1}><ImpactStat value="5" label="Countries" sub="Partners & reach" /></InView>
              <InView delay={0.2}><ImpactStat value="100%" label="Free Access" sub="For all players" /></InView>
              <InView delay={0.3}><ImpactStat value="∞" label="Potential" sub="Untapped in Nairobi" /></InView>
            </div>

            {/* Quotes */}
            <div className="grid md:grid-cols-3 gap-6">
              <InView delay={0}>
                <QuoteCard
                  quote="Before React Now FC, I was just kicking a ball. Now I have discipline, good grades, and a path I believe in."
                  name="Samuel K."
                  role="Player, Age 16"
                  accent
                />
              </InView>
              <InView delay={0.15}>
                <QuoteCard
                  quote="George doesn't just coach football. He coaches life. My son comes home standing taller every week."
                  name="Martha O."
                  role="Parent"
                />
              </InView>
              <InView delay={0.3}>
                <QuoteCard
                  quote="This program fills a gap no school or government program addresses — structured mentorship wrapped in something kids actually love."
                  name="Coach Adrian"
                  role="Technical Advisor"
                />
              </InView>
            </div>
          </div>
        </section>

        {/* ── 9. COMMUNITY INCLUSION ── */}
        <section className="py-24 sm:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-12">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <InView>
                  <Label>Community & Inclusion</Label>
                  <h2 className="text-4xl sm:text-5xl font-black text-[var(--charcoal)] leading-tight mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Everyone belongs<br />
                    <em className="not-italic text-[var(--earth)]">on this pitch</em>
                  </h2>
                  <p className="text-[var(--muted)] leading-relaxed mb-6">
                    We don't select by ability or background. We accept everyone who shows up willing to try, 
                    willing to respect others, and willing to grow. The only thing we ask is commitment.
                  </p>
                </InView>

                <div className="grid grid-cols-2 gap-4 mt-8">
                  {[
                    { icon: <Globe className="w-5 h-5" />, label: "Multi-cultural", sub: "Players from across East Africa" },
                    { icon: <Heart className="w-5 h-5" />, label: "All abilities", sub: "No tryout required to join" },
                    { icon: <Leaf className="w-5 h-5" />, label: "Climate action", sub: "Community clean-ups & tree planting" },
                    { icon: <Users className="w-5 h-5" />, label: "Family-centered", sub: "Parents woven into the program" },
                  ].map((item) => (
                    <InView key={item.label}>
                      <div className="bg-[var(--cream)] rounded-2xl p-5 border border-gray-100">
                        <div className="w-9 h-9 bg-[var(--earth)]/10 rounded-xl flex items-center justify-center text-[var(--earth)] mb-3">
                          {item.icon}
                        </div>
                        <div className="font-semibold text-[var(--charcoal)] text-sm">{item.label}</div>
                        <div className="text-xs text-[var(--muted)] mt-1">{item.sub}</div>
                      </div>
                    </InView>
                  ))}
                </div>
              </div>

              <InView delay={0.2}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-lg">
                    <Image src="/images/Hero1.jpeg" alt="Community training" fill className="object-cover" sizes="300px" />
                  </div>
                  <div className="space-y-4 pt-8">
                    <div className="relative aspect-square rounded-3xl overflow-hidden shadow-lg">
                      <Image src="/images/React7.jpeg" alt="Youth players" fill className="object-cover" sizes="200px" />
                    </div>
                    <div className="bg-[var(--earth)] rounded-3xl p-6 text-white">
                      <div className="text-4xl font-black mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>0 KES</div>
                      <div className="text-white/80 text-sm">cost to any player who can't afford to pay</div>
                    </div>
                  </div>
                </div>
              </InView>
            </div>
          </div>
        </section>

        {/* ── 10. LEADERSHIP CARDS ── */}
        <section className="py-24 sm:py-32 bg-[var(--sand)]">
          <div className="max-w-7xl mx-auto px-6 sm:px-12">
            <InView className="text-center mb-16">
              <Label>Leadership</Label>
              <h2 className="text-4xl sm:text-5xl font-black text-[var(--charcoal)] leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                The people behind<br />
                <em className="not-italic text-[var(--earth)]">the mission</em>
              </h2>
            </InView>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              <LeaderCard name="George Dralagar" role="Founder & Head Coach" initials="GD" bio="Builder of structure, believer in youth, and the heartbeat of React Now FC Academy since day one." />
              <LeaderCard name="Programs Director" role="Education Lead" initials="PD" bio="Bridges football and academics, ensuring every player's school performance is tracked and supported." />
              <LeaderCard name="Community Manager" role="Partnerships" initials="CM" bio="Builds the network of parents, partners, and volunteers that keeps the academy running and growing." />
              <LeaderCard name="Technical Coach" role="Skills Development" initials="TC" bio="Brings professional-level football methodology to grassroots training. Every drill has a purpose." />
            </div>
          </div>
        </section>

        {/* ── 11. VISION FOR THE FUTURE ── */}
        <section className="py-24 sm:py-32 bg-[var(--charcoal)] relative overflow-hidden">
          <div className="absolute inset-0">
            <Image src={academyImages.teamPhoto1} alt="" fill className="object-cover opacity-10" sizes="100vw" />
          </div>
          <div className="relative max-w-5xl mx-auto px-6 sm:px-12 text-center">
            <InView>
              <Label light>Vision for the Future</Label>
              <h2 className="text-5xl sm:text-7xl font-black text-white leading-tight mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
                The long game<br />
                <em className="not-italic text-[var(--earth-light)]">has only begun</em>
              </h2>
              <p className="text-white/60 text-lg max-w-3xl mx-auto leading-relaxed mb-12">
                By 2030, we envision a network of React Now FC academies across East Africa — each one 
                a community anchor where youth find structure, mentorship, academic support, 
                and a clear pathway from the pitch to a purposeful life.
              </p>

              <div className="grid sm:grid-cols-3 gap-6 mb-12">
                {[
                  { year: "2026", goal: "100 active players across 3 Nairobi communities" },
                  { year: "2028", goal: "Regional expansion to Uganda, Tanzania & Rwanda" },
                  { year: "2030", goal: "10 academies. 1,000 youth. Countless futures changed." },
                ].map((item, i) => (
                  <InView key={item.year} delay={i * 0.15}>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[var(--earth)] transition-colors">
                      <div className="text-3xl font-black text-[var(--earth-light)] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{item.year}</div>
                      <p className="text-white/60 text-sm">{item.goal}</p>
                    </div>
                  </InView>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/join" className="inline-flex items-center gap-2 bg-[var(--earth)] text-white px-8 py-4 rounded-2xl font-semibold hover:bg-[var(--earth-light)] transition-colors">
                  Be part of this story <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/20 transition-colors">
                  Partner with us
                </Link>
              </div>
            </InView>
          </div>
        </section>

      </div>
    </>
  );
}