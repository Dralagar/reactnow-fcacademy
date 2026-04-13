"use client";

/**
 * ╔══════════════════════════════════════════════════════════════════════════╗
 * ║  FOOTER — React Now FC Academy                                          ║
 * ╠══════════════════════════════════════════════════════════════════════════╣
 * ║  CHANGES IN THIS VERSION                                                ║
 * ║    • Contact row  → flex flex-wrap gap-4 (flex-1 min-w-[200px] cards)  ║
 * ║    • Bottom bar quick-links → gap-x-6 gap-y-2 + whitespace-nowrap      ║
 * ║    • Social icons using string paths from /public/images/              ║
 * ╚══════════════════════════════════════════════════════════════════════════╝
 */

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { MdEmail } from "react-icons/md";
import {
  MapPin,
  Phone,
  Heart,
  ArrowUp,
  ChevronRight,
  Globe,
  GraduationCap,
  HandHeart,
  Newspaper,
  Rocket,
  Users,
  Star,
  Trophy,
  CalendarDays,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { SITE_IMAGES } from "@/lib/site-images";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type BadgeColor = "primary" | "amber" | "green" | "slate";

interface FooterLink {
  name: string;
  href: string;
  external?: boolean;
  ariaLabel?: string;
  badge?: string;
  badgeColor?: BadgeColor;
  highlight?: boolean;
}

interface FooterSection {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  links: FooterLink[];
  gradient: string;
  accentColor: string;
}

interface SocialLink {
  icon: string;
  href: string;
  label: string;
  gradient: string;
}

interface ImpactStat {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
  bg: string;
  border: string;
  iconColor: string;
}

interface QuickLink {
  name: string;
  href: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Static data
// ─────────────────────────────────────────────────────────────────────────────

const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: "Discover",
    icon: Rocket,
    gradient: "from-primary to-primary-dark",
    accentColor: "text-primary",
    links: [
      { name: "Our Story", href: "/about/story" },
      {
        name: "Impact Report",
        href: "/impact",
        badge: "2026",
        badgeColor: "primary",
        highlight: true,
      },
      { name: "Blog", href: "/blog" },
      { name: "Media Kit", href: "/media" },
    ],
  },
  {
    title: "Programs",
    icon: Trophy,
    gradient: "from-emerald-500 to-teal-500",
    accentColor: "text-emerald-400",
    links: [
      { name: "Football Academy", href: "/programs/academy", highlight: true },
      { name: "Digital Literacy", href: "/programs/digital" },
      { name: "Climate Action",   href: "/programs/climate" },
      {
        name: "Mentorship",
        href: "/programs/mentorship",
        badge: "Popular",
        badgeColor: "amber",
      },
    ],
  },
  {
    title: "Community",
    icon: Users,
    gradient: "from-amber-500 to-primary",
    accentColor: "text-amber-300",
    links: [
      {
        name: "Join as Player",
        href: "/join/player",
        badge: "Free",
        badgeColor: "green",
      },
      { name: "Volunteer", href: "/join/volunteer" },
      { name: "Partner With Us", href: "/join/partner" },
      {
        name: "Donate",
        href: "/join/donate",
        badge: "Support",
        badgeColor: "primary",
        highlight: true,
      },
    ],
  },
  {
    title: "Resources",
    icon: Newspaper,
    gradient: "from-slate-600 to-primary-dark",
    accentColor: "text-slate-300",
    links: [
      { name: "FAQ",        href: "/faq" },
      { name: "Leadership", href: "/about/team" },
      { name: "Privacy",    href: "/privacy" },
      { name: "Terms",      href: "/terms" },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SOCIAL LINKS - Images are directly in /public/images/
// ─────────────────────────────────────────────────────────────────────────────

const SOCIAL_LINKS: SocialLink[] = [
  { icon: "/images/Tiktok.jpeg",         href: "https://tiktok.com/@reactnowfc",                       label: "TikTok",      gradient: "from-black to-gray-800"           },
  { icon: "/images/Xlogo.png",           href: "https://twitter.com/reactnowfc",                       label: "X (Twitter)", gradient: "from-slate-600 to-slate-800"      },
  { icon: "/images/InstLOGO.jpeg",       href: "https://instagram.com/reactnowfc",                     label: "Instagram",   gradient: "from-[#e4405f] to-[#d81f3d]"      },
  { icon: "/images/LinkedInLogo.png",        href: "https://linkedin.com/company/reactnowfc",              label: "LinkedIn",    gradient: "from-[#0077b5] to-[#005582]"      },
  { icon: "/images/facebooklogo.jpeg",   href: "https://facebook.com/reactnowfc",                      label: "Facebook",    gradient: "from-[#1877f2] to-[#0e5fc7]"      },
  { icon: "/images/mastadonLogo.png",    href: "https://mastodon.social/@reactnowfc",                  label: "Mastodon",    gradient: "from-[#6364ff] to-[#4a4ad6]"      },
  { icon: "/images/slack.png",           href: "https://join.slack.com/t/reactnowfc/shared_invite/xxx",label: "Slack",       gradient: "from-[#4A154B] to-[#36123b]"      },
];

const QUICK_LINKS: QuickLink[] = [
  { name: "Privacy", href: "/privacy" },
  { name: "Terms",   href: "/terms"   },
  { name: "Cookies", href: "/cookies" },
  { name: "FAQ",     href: "/faq"     },
  { name: "Contact", href: "/contact" },
];

const IMPACT_STATS: ImpactStat[] = [
  {
    icon: Users,
    value: "20+",
    label: "Youth Enrolled",
    bg: "bg-primary/10",
    border: "border-primary/20",
    iconColor: "text-primary",
  },
  {
    icon: GraduationCap,
    value: "0",
    label: "Graduates",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    iconColor: "text-emerald-400",
  },
  {
    icon: Globe,
    value: "5",
    label: "Communities",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    iconColor: "text-orange-400",
  },
  {
    icon: HandHeart,
    value: "10+",
    label: "Volunteers",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    iconColor: "text-purple-400",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Badge lookup
// ─────────────────────────────────────────────────────────────────────────────

const BADGE_CLASSES: Record<BadgeColor, string> = {
  primary: "bg-primary/20 text-primary border border-primary/30",
  amber:   "bg-amber-500/20 text-amber-400 border border-amber-500/30",
  green:   "bg-green-500/20 text-green-400 border border-green-500/30",
  slate:   "bg-slate-500/20 text-slate-300 border border-slate-500/30",
};

// ─────────────────────────────────────────────────────────────────────────────
// Animation variants
// ─────────────────────────────────────────────────────────────────────────────

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.48, ease: EASE } },
};

const fadeUpMid: Variants = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.48, ease: EASE, delay: 0.18 } },
};

const fadeUpLate: Variants = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.48, ease: EASE, delay: 0.3 } },
};

const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: EASE } },
};

const stagger: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const onScroll = () => {
      clearTimeout(timer);
      timer = setTimeout(() => setShowScrollTop(window.scrollY > 400), 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); clearTimeout(timer); };
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  }, [prefersReducedMotion]);

  const anim = <T,>(variant: T) => (prefersReducedMotion ? undefined : variant);

  return (
    <>
      <footer
        className="relative bg-surface-dark text-white section"
        role="contentinfo"
        aria-label="Site footer"
      >
        {/* Skip link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md focus:shadow-lg"
        >
          Skip to main content
        </a>

        {/* Decorative layers */}
        <div className="absolute inset-0 hero-gradient opacity-80" aria-hidden="true" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
          aria-hidden="true"
        />
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" aria-hidden="true" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-primary-light/5 rounded-full blur-3xl animate-pulse [animation-delay:2s]" aria-hidden="true" />

        <div className="container-custom relative z-10">
          <div className="py-16 lg:py-20">

            {/* Section 1: Logo strip */}
            <motion.div
              variants={anim(fadeUp)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-16 pb-8 border-b border-border/30"
            >
              <Link
                href="/"
                className="flex items-center gap-5 group focus-ring"
                aria-label="React Now FC Academy — Return to homepage"
              >
                <div className="relative h-[4.5rem] w-[4.5rem] shrink-0 overflow-hidden rounded-2xl bg-white shadow-md shadow-black/20 ring-1 ring-white/20 transition-transform duration-300 group-hover:scale-[1.02]">
                  <Image
                    src={SITE_IMAGES.logo}
                    alt="React Now FC Academy logo"
                    fill
                    sizes="72px"
                    className="object-contain p-2.5"
                  />
                </div>
                <div className="min-w-0 border-l border-white/15 pl-5">
                  <h2 className="text-2xl font-bold tracking-tight text-white">React Now FC</h2>
                  <p className="mt-1 text-sm font-medium text-primary-400">Academy</p>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-gray-400">
                    Grassroots football, education, and mentorship — Nairobi &amp; beyond.
                  </p>
                </div>
              </Link>
            </motion.div>

            {/* Section 2: Nav grid */}
            <motion.div
              variants={anim(stagger)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
            >
              {FOOTER_SECTIONS.map((section) => {
                const Icon = section.icon;
                return (
                  <motion.div key={section.title} variants={anim(fadeUp)}>
                    <div className="card h-full border-border/50 bg-surface/20 backdrop-blur-sm hover:border-primary/30 hover:shadow-xl group transition-all duration-300 p-6">
                      <div className="flex flex-col items-center mb-5">
                        <div
                          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${section.gradient} flex items-center justify-center shadow-xl mb-3 group-hover:scale-110 transition-transform duration-300`}
                        >
                          <Icon className="w-8 h-8 text-white" aria-hidden="true" />
                        </div>
                        <h3 className={`font-bold text-lg ${section.accentColor} text-center`}>{section.title}</h3>
                        <div className={`w-12 h-1 bg-gradient-to-r ${section.gradient} rounded-full mt-2 opacity-60`} aria-hidden="true" />
                      </div>
                      <nav className="flex flex-col space-y-4 mt-6" aria-label={`${section.title} links`}>
                        {section.links.map((link) => (
                          <div key={link.name} className="flex items-center justify-between group/link">
                            <Link
                              href={link.href}
                              className={`flex-1 text-sm transition-all duration-200 hover:translate-x-1 focus-ring rounded px-1 py-1 ${
                                link.highlight ? "text-white font-medium" : "text-gray-400 hover:text-white"
                              }`}
                              aria-label={link.ariaLabel ?? link.name}
                              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            >
                              <span className="flex items-center gap-2">
                                <ChevronRight
                                  className={`w-3.5 h-3.5 ${section.accentColor} opacity-0 group-hover/link:opacity-100 transition-all group-hover/link:translate-x-1`}
                                  aria-hidden="true"
                                />
                                {link.name}
                                {link.highlight && (
                                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 ml-1" aria-hidden="true" />
                                )}
                              </span>
                            </Link>
                            {link.badge && link.badgeColor && (
                              <span className={`text-[10px] px-2.5 py-1 rounded-full font-medium whitespace-nowrap ml-2 ${BADGE_CLASSES[link.badgeColor]}`}>
                                {link.badge}
                              </span>
                            )}
                          </div>
                        ))}
                      </nav>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Sections 3 + 4: Contact panel + social strip */}
            <motion.div
              variants={anim(scaleIn)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="surface-panel bg-surface/20 backdrop-blur-sm border-border/50 p-8 mb-8"
            >
              {/* Contact cards — flex-wrap row */}
              <div className="flex flex-wrap gap-4">

                {/* Location */}
                <div className="flex-1 min-w-[200px] flex items-start gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center shadow-lg shrink-0">
                    <MapPin className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-primary-400 mb-2">Location</h4>
                    <address className="not-italic text-sm text-gray-300 leading-relaxed">
                      Bee Centre Bar — Nasra Gardens Estate<br />
                      Embakasi Central<br />
                      Nairobi, Kenya
                    </address>
                  </div>
                </div>

                {/* Contact */}
                <div className="flex-1 min-w-[200px] flex items-start gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shrink-0">
                    <Phone className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-primary-400 mb-2">Contact</h4>
                    <p className="text-sm text-gray-300 mb-2">
                      For inquiries, reach out to our Visionary & Strategic Lead — Founder of React Now Academy. 
                      <span className="text-primary-400 font-semibold"> We React Promptly.</span>
                    </p>
                    <a
                      href="tel:+254706255611"
                      className="text-sm text-gray-300 hover:text-white transition-colors block mb-1 focus-ring rounded"
                      aria-label="Call us at +254 706 255 611"
                    >
                      +254 706 255 611
                    </a>
                    <a
                      href="mailto:info@reactnowfca.org"
                      className="text-sm text-gray-300 hover:text-white transition-colors focus-ring rounded flex items-center gap-2"
                      aria-label="Email us at info@reactnowfca.org"
                    >
                      <MdEmail className="text-primary-400 text-lg" />  
                      info@reactnowfca.org
                    </a>
                  </div>
                </div>

                {/* Established */}
                <div className="flex-1 min-w-[200px] flex items-start gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shrink-0">
                    <CalendarDays className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-primary-400 mb-2">Established</h4>
                    <p className="text-sm text-gray-300 font-semibold">
                      First Quarter 2026 — <b>Inaugural Launch: 13th April 2026</b>
                    </p> 
                    <p className="text-xs text-primary-400 mt-2 italic">Building Champions, Building Futures</p>
                  </div>
                </div>

              </div>

              {/* Social icons */}
              <div className="mt-8 pt-6 border-t border-border/30 mb-8">
                <h4 className="text-sm font-semibold text-primary-400 mb-4 text-center">Connect With Us</h4>
                <div
                  className="flex flex-wrap items-center justify-center gap-4"
                  role="list"
                  aria-label="Social media links"
                >
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Follow us on ${social.label}`}
                      role="listitem"
                      className="relative group focus-ring rounded-xl transition-transform hover:scale-110"
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${social.gradient} rounded-xl blur opacity-0 group-hover:opacity-70 transition-opacity`}
                        aria-hidden="true"
                      />
                      <div className="relative w-12 h-12 bg-surface rounded-xl flex items-center justify-center border border-border/50 group-hover:border-transparent transition-all overflow-hidden p-2">
                        <Image 
                          src={social.icon} 
                          alt={social.label} 
                          width={28} 
                          height={28} 
                          className="object-contain" 
                        />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Section 5: Bottom bar */}
            <motion.div
              variants={anim(fadeUpMid)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-border/50"
            >
              <p className="text-xs text-gray-500 order-2 md:order-1">
                <span aria-label="Copyright">&copy;</span>{" "}
                2026 React Now FC Academy.{" "}
                <span className="hidden md:inline">All rights reserved.</span>
              </p>

              <nav
                className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 order-1 md:order-2"
                aria-label="Legal and utility links"
              >
                {QUICK_LINKS.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-xs text-gray-500 hover:text-gray-300 transition-colors focus-ring rounded px-1 py-1 whitespace-nowrap"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              <p className="text-xs text-gray-500 flex items-center gap-2 order-3">
                <span>Football is the entrypoint, not the goal</span>
                <Heart className="w-3.5 h-3.5 text-danger fill-danger animate-pulse" aria-hidden="true" />
                <span>Empowering youth through football and innovation</span>
              </p>
            </motion.div>

            {/* Section 6: Impact stats */}
            <motion.div
              variants={anim(fadeUpLate)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="mt-10 pt-6 flex flex-wrap items-center justify-center gap-6"
              aria-label="Impact statistics"
            >
              {IMPACT_STATS.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className={`flex items-center gap-3 px-4 py-2 ${stat.bg} rounded-xl border ${stat.border}`}
                  >
                    <Icon className={`w-5 h-5 ${stat.iconColor}`} aria-hidden="true" />
                    <span className="text-sm text-gray-300">
                      {stat.value}{" "}
                      <span className="text-gray-500">{stat.label}</span>
                    </span>
                  </div>
                );
              })}
            </motion.div>

          </div>
        </div>
      </footer>

      {/* SCROLL-TO-TOP BUTTON */}
      {showScrollTop && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 z-40 group focus-ring rounded-xl"
          aria-label="Scroll to top of page"
        >
          <div
            className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark rounded-xl blur opacity-70 group-hover:opacity-100 transition-opacity"
            aria-hidden="true"
          />
          <div className="relative w-12 h-12 bg-surface-dark rounded-xl flex items-center justify-center border border-primary/30">
            <ArrowUp className="w-5 h-5 text-white" aria-hidden="true" />
          </div>
        </motion.button>
      )}
    </>
  );
}