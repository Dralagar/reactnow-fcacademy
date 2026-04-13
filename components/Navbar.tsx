"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SITE_IMAGES } from "@/lib/site-images";
import { AnimatePresence, motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  BarChart3,
  ChevronDown,
  HandHeart,
  Heart,
  Home,
  Info,
  Leaf,
  Menu,
  Phone,
  Users,
  X,
  MapPin,
  Mail,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Hero background images - Professional, high-quality academy spotlight images
// Fully responsive with mobile-first approach
// ─────────────────────────────────────────────────────────────────────────────
const SPOTLIGHT_IMAGES = [
  "/images/Africankid.jpeg",
  "/images/Hero1.jpeg",
  "/images/Hero2.jpeg",
  "/images/Hero5.jpeg",
  "/images/reactnowlog.png",
];

type NavSubItem = {
  name: string;
  href: string;
  description?: string;
};

type NavItem = {
  name: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
  submenu?: NavSubItem[];
};

const navigationItems: NavItem[] = [
  { name: "Home", href: "/", icon: Home },
  {
    name: "About",
    href: "/about",
    icon: Info,
    submenu: [
      { name: "Our Story",      href: "/about/story",   description: "How the academy started and why it matters."         },
      { name: "Mission & Vision",href: "/about/mission", description: "What drives our work and where we are going."         },
      { name: "Core Pillars",   href: "/about/pillars", description: "The values and focus areas shaping our impact."       },
      { name: "Team",           href: "/about/team",    description: "Meet the people guiding the academy forward."        },
    ],
  },
  {
    name: "Team",
    href: "/team",
    icon: Users,
    submenu: [
      { name: "Meet the Team",    href: "/team",            description: "Squad, coaches, and the faces behind the academy." },
      { name: "Staff & Leadership",href: "/about/team",     description: "Founders, head coach, and core leadership."        },
      { name: "Player Highlights",href: "/team/highlights", description: "Spotlights, match moments, and rising talent."     },
    ],
  },
  { name: "Impact", href: "/impact", icon: BarChart3 },
  {
    name: "Get Involved",
    href: "/join",
    icon: HandHeart,
    submenu: [
      { name: "Join as Player",  href: "/join/player",    description: "Become part of a structured growth journey."           },
      { name: "Volunteer",       href: "/join/volunteer", description: "Support mentoring, logistics, and community work."      },
      { name: "Partner With Us", href: "/join/partner",   description: "Collaborate to expand youth opportunity and impact."    },
      { name: "Donate",          href: "/join/donate",    description: "Help fund safe, meaningful youth development."          },
    ],
  },
  { name: "Sustainability", href: "/sustainability", icon: Leaf },
  { name: "Contact",        href: "/contact",        icon: Phone },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function hasActiveSubmenu(pathname: string, item: NavItem) {
  return item.submenu?.some((sub) => isActivePath(pathname, sub.href)) ?? false;
}

// ─────────────────────────────────────────────────────────────────────────────
// Spotlight carousel — auto-advances every 4 s, cross-fades
// Fully responsive with mobile-optimized image positioning
// ─────────────────────────────────────────────────────────────────────────────
function SpotlightCarousel() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % SPOTLIGHT_IMAGES.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", borderRadius: "inherit" }}>
      {SPOTLIGHT_IMAGES.map((src, i) => (
        <div
          key={src}
          style={{
            position: "absolute",
            inset: 0,
            transition: "opacity 1.2s ease",
            opacity: i === idx ? 1 : 0,
          }}
        >
          <Image
            src={src}
            alt={`React Now FC spotlight ${i + 1}`}
            fill
            sizes="100vw"
            style={{ 
              objectFit: "cover", 
              objectPosition: "center 20%",
              transform: "scale(1)",
            }}
            priority={i === 0}
            quality={85}
          />
        </div>
      ))}
      {/* Enhanced dark overlay for better text readability - responsive */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.85) 100%)",
        }}
      />
      {/* Dot indicators - mobile friendly */}
      <div
        style={{
          position: "absolute",
          bottom: "clamp(12px, 4vh, 24px)",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "clamp(6px, 2vw, 10px)",
          zIndex: 10,
        }}
      >
        {SPOTLIGHT_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`Show spotlight ${i + 1}`}
            style={{
              width: i === idx ? "clamp(16px, 4vw, 24px)" : "clamp(6px, 2vw, 8px)",
              height: "clamp(6px, 2vw, 8px)",
              borderRadius: "clamp(3px, 1.5vw, 4px)",
              background: i === idx ? "#38bdf8" : "rgba(255,255,255,0.5)",
              border: "none",
              padding: 0,
              cursor: "pointer",
              transition: "all 0.4s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Top Bar Component - Contact & Social Icons (appears above navbar when docked)
// ─────────────────────────────────────────────────────────────────────────────
function TopBar({ isVisible, isDocked }: { isVisible: boolean; isDocked: boolean }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 49,
            background: isDocked ? "rgba(0,0,0,0.6)" : "#0f172a",
            backdropFilter: "blur(12px)",
            borderBottom: `1px solid ${isDocked ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.15)"}`,
          }}
        >
          <div
            style={{
              maxWidth: 1440,
              margin: "0 auto",
              padding: "8px clamp(12px, 4vw, 24px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            {/* Left side: Location & Contact */}
            <div style={{ display: "flex", alignItems: "center", gap: "clamp(12px, 3vw, 24px)", flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", color: isDocked ? "rgba(255,255,255,0.85)" : "#fff" }}>
                <MapPin className="icon" style={{ width: "14px", height: "14px" }} />
                <span style={{ fontSize: "clamp(11px, 2.5vw, 12px)" }}>Bee Centre, Embakasi, Nairobi</span>
              </div>
              <a
                href="tel:+254706255611"
                style={{ display: "flex", alignItems: "center", gap: "6px", color: isDocked ? "rgba(255,255,255,0.85)" : "#fff", textDecoration: "none", fontSize: "clamp(11px, 2.5vw, 12px)" }}
              >
                <Phone className="icon" style={{ width: "14px", height: "14px" }} />
                <span>+254 706 255 611</span>
              </a>
              <a
                href="mailto:info@reactnowfca.org"
                style={{ display: "flex", alignItems: "center", gap: "6px", color: isDocked ? "rgba(255,255,255,0.85)" : "#fff", textDecoration: "none", fontSize: "clamp(11px, 2.5vw, 12px)" }}
              >
                <Mail className="icon" style={{ width: "14px", height: "14px" }} />
                <span>info@reactnowfca.org</span>
              </a>
            </div>

            {/* Right side: Social Icons */}
            <div style={{ display: "flex", alignItems: "center", gap: "clamp(12px, 3vw, 16px)" }}>
              <a
                href="https://instagram.com/reactnowfc"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                style={{ color: isDocked ? "rgba(255,255,255,0.85)" : "#fff", transition: "color 0.2s ease" }}
                onMouseEnter={(e) => e.currentTarget.style.color = "#e4405f"}
                onMouseLeave={(e) => e.currentTarget.style.color = isDocked ? "rgba(255,255,255,0.85)" : "#fff"}
              >
                <Instagram className="icon" style={{ width: "16px", height: "16px" }} />
              </a>
              <a
                href="https://facebook.com/reactnowfc"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                style={{ color: isDocked ? "rgba(255,255,255,0.85)" : "#fff", transition: "color 0.2s ease" }}
                onMouseEnter={(e) => e.currentTarget.style.color = "#1877f2"}
                onMouseLeave={(e) => e.currentTarget.style.color = isDocked ? "rgba(255,255,255,0.85)" : "#fff"}
              >
                <Facebook className="icon" style={{ width: "16px", height: "16px" }} />
              </a>
              <a
                href="https://twitter.com/reactnowfc"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                style={{ color: isDocked ? "rgba(255,255,255,0.85)" : "#fff", transition: "color 0.2s ease" }}
                onMouseEnter={(e) => e.currentTarget.style.color = "#1da1f2"}
                onMouseLeave={(e) => e.currentTarget.style.color = isDocked ? "rgba(255,255,255,0.85)" : "#fff"}
              >
                <Twitter className="icon" style={{ width: "16px", height: "16px" }} />
              </a>
              <a
                href="https://tiktok.com/@reactnowfc"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                style={{ color: isDocked ? "rgba(255,255,255,0.85)" : "#fff", transition: "color 0.2s ease" }}
                onMouseEnter={(e) => e.currentTarget.style.color = "#000000"}
                onMouseLeave={(e) => e.currentTarget.style.color = isDocked ? "rgba(255,255,255,0.85)" : "#fff"}
              >
                <svg className="icon" style={{ width: "14px", height: "14px" }} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.87-3.85 3.1 3.1 0 0 1 .46.04V9.9a6.48 6.48 0 0 0-1.28-.12 6.31 6.31 0 0 0-6.35 6.27 6.31 6.31 0 0 0 9.68 5.31 6.31 6.31 0 0 0 2.9-4.93V9.06a7.9 7.9 0 0 0 4.5 1.44V7.23a4.67 4.67 0 0 1-2.36-.54z"/>
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────────────────────
export default function Navbar() {
  const pathname   = usePathname();
  const navRef     = useRef<HTMLElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [desktopMenu, setDesktopMenu] = useState<string | null>(null);
  const [mobileMenu,  setMobileMenu]  = useState<string | null>(null);
  const [scrolled,    setScrolled]    = useState(false);

  const DOCK_THRESHOLD = 80;

  const { scrollY } = useScroll();
  const rawProgress = useTransform(scrollY, [0, DOCK_THRESHOLD], [0, 1]);
  const progress = useSpring(rawProgress, { stiffness: 220, damping: 28, mass: 0.6 });
  const yPos = useTransform(progress, [0, 1], ["calc(100vh - 112px)", "0px"]);
  const navWidth  = useTransform(progress, [0, 1], ["100%", "100%"]);
  const navRadius = useTransform(progress, [0, 1], ["0px", "0px"]);
  const bgOpacity = useTransform(progress, [0, 1], [0, 1]);
  const logoScale = useTransform(progress, [0, 1], [1.18, 1]);

  const [isDocked, setIsDocked] = useState(true);
  useEffect(() => {
    return progress.on("change", (v) => setIsDocked(v < 0.5));
  }, [progress]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > DOCK_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileMenu(null);
    setDesktopMenu(null);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.cssText = "overflow:hidden;position:fixed;width:100%;height:100%";
    } else {
      document.body.style.cssText = "";
    }
    return () => { document.body.style.cssText = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setDesktopMenu(null);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setDesktopMenu(null); if (mobileOpen) { setMobileOpen(false); setMobileMenu(null); } }
    };
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown",   onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown",   onKeyDown);
    };
  }, [mobileOpen]);

  const handleDesktopMenuEnter = (name: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDesktopMenu(name);
  };
  const handleDesktopMenuLeave = () => {
    timeoutRef.current = setTimeout(() => setDesktopMenu(null), 150);
  };

  // Show top bar only when docked (at bottom) and not scrolled
  const showTopBar = isDocked;

  return (
    <>
      {/* ── TOP BAR: Contact & Social Icons (above navbar) ── */}
      <TopBar isVisible={showTopBar} isDocked={isDocked} />

      {/* ── SPOTLIGHT BAND (only visible while docked at bottom) ── */}
      <AnimatePresence>
        {isDocked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 39,
              pointerEvents: "none",
            }}
          >
            <SpotlightCarousel />
            {/* Academy tagline centred over the image - fully responsive */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
                color: "#fff",
                pointerEvents: "none",
                width: "85%",
                maxWidth: "800px",
                zIndex: 5,
                padding: "clamp(16px, 5vw, 32px)",
              }}
            >
              {/* Nairobi, Kenya - Professional styling */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 16px",
                  background: "rgba(0,0,0,0.4)",
                  backdropFilter: "blur(8px)",
                  borderRadius: "40px",
                  marginBottom: "clamp(16px, 4vw, 24px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <span style={{ fontSize: "clamp(14px, 3vw, 16px)" }}>📍</span>
                <span style={{
                  fontSize: "clamp(11px, 2.5vw, 13px)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.95)",
                }}>
                  NAIROBI, KENYA
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.7 }}
                style={{
                  fontSize: "clamp(28px, 8vw, 72px)",
                  fontWeight: 800,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  color: "#fff",
                  margin: "0 0 clamp(12px, 3vw, 20px) 0",
                  textShadow: "0 2px 20px rgba(0,0,0,0.3)",
                }}
              >
                React Now FC<br />
                <span style={{ color: "#38bdf8" }}>Academy</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.7 }}
                style={{
                  fontSize: "clamp(13px, 3vw, 18px)",
                  color: "rgba(255,255,255,0.9)",
                  maxWidth: "550px",
                  margin: "0 auto",
                  lineHeight: 1.5,
                  fontWeight: 400,
                }}
              >
                Grassroots football, education &amp; mentorship — building champions &amp; futures.
              </motion.p>

              {/* Scroll hint - responsive */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                style={{ 
                  marginTop: "clamp(30px, 8vh, 50px)", 
                  display: "flex", 
                  justifyContent: "center" 
                }}
              >
                <div
                  style={{
                    width: "clamp(26px, 6vw, 32px)",
                    height: "clamp(40px, 8vw, 52px)",
                    border: "2px solid rgba(255,255,255,0.5)",
                    borderRadius: "clamp(14px, 4vw, 20px)",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    paddingTop: "clamp(8px, 2vw, 12px)",
                  }}
                >
                  <div
                    style={{
                      width: "3px",
                      height: "clamp(8px, 2vw, 12px)",
                      background: "rgba(255,255,255,0.8)",
                      borderRadius: "2px",
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── NAVBAR ─────────────────────────────────────────────────────────── */}
      <motion.header
        ref={navRef as React.RefObject<HTMLDivElement>}
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          zIndex: 50,
          y: yPos,
          width: navWidth,
          borderRadius: navRadius,
          top: showTopBar ? "40px" : "0px",
          transition: "top 0.3s ease",
        }}
      >
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            background: "#fff",
            opacity: bgOpacity,
            borderBottom: "1px solid rgba(226,232,240,0.8)",
            boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.08)" : "none",
            transition: "box-shadow 0.3s ease",
          }}
        />
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            opacity: useTransform(progress, [0, 0.4], [1, 0]),
            borderTop: "1px solid rgba(255,255,255,0.15)",
          }}
        />

        <div
          style={{
            maxWidth: 1440,
            margin: "0 auto",
            padding: "0 clamp(12px, 4vw, 24px)",
            height: scrolled ? "clamp(60px, 12vh, 76px)" : "clamp(70px, 15vh, 88px)",
            transition: "height 0.3s ease",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "100%" }}>

            {/* ── Logo - Responsive ───────────────────────────────────────── */}
            <Link
              href="/"
              aria-label="React Now FC Academy home"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "clamp(8px, 2vw, 12px)",
                textDecoration: "none",
                color: "inherit",
                WebkitTapHighlightColor: "transparent",
              }}
              onClick={() => mobileOpen && setMobileOpen(false)}
            >
              <motion.div
                style={{
                  position: "relative",
                  flexShrink: 0,
                  scale: logoScale,
                  width:  scrolled ? "clamp(44px, 10vw, 60px)" : "clamp(52px, 12vw, 76px)",
                  height: scrolled ? "clamp(44px, 10vw, 60px)" : "clamp(52px, 12vw, 76px)",
                  transition: "width 0.3s ease, height 0.3s ease",
                }}
              >
                <Image
                  src={SITE_IMAGES.logo}
                  alt="React Now FC Logo"
                  fill
                  sizes="80px"
                  style={{ objectFit: "contain", padding: 2 }}
                  priority
                />
              </motion.div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: scrolled ? "clamp(13px, 3vw, 15px)" : "clamp(14px, 3.5vw, 17px)",
                    transition: "font-size 0.3s ease",
                    color: isDocked ? "#fff" : "#0f172a",
                    lineHeight: 1.2,
                    whiteSpace: "nowrap",
                  }}
                >
                  React Now FC
                </div>
                <div
                  style={{
                    fontSize: scrolled ? "clamp(8px, 2vw, 10px)" : "clamp(9px, 2.2vw, 11px)",
                    color: isDocked ? "rgba(255,255,255,0.7)" : "#64748b",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    lineHeight: 1.2,
                    transition: "color 0.3s ease",
                    whiteSpace: "nowrap",
                  }}
                >
                  Academy
                </div>
              </div>
            </Link>

            {/* ── Desktop nav ───────────────────────────────────────────────── */}
            <div className="desktop-nav">
              <nav aria-label="Desktop navigation">
                <div style={{ display: "flex", gap: "clamp(2px, 1vw, 4px)", alignItems: "center" }}>
                  {navigationItems.map((item) => {
                    const Icon  = item.icon;
                    const active = isActivePath(pathname, item.href) || hasActiveSubmenu(pathname, item);

                    if (item.submenu) {
                      const isOpen = desktopMenu === item.name;
                      return (
                        <div
                          key={item.name}
                          style={{ position: "relative" }}
                          onMouseEnter={() => handleDesktopMenuEnter(item.name)}
                          onMouseLeave={handleDesktopMenuLeave}
                        >
                          <button
                            type="button"
                            aria-expanded={isOpen}
                            aria-haspopup="menu"
                            onClick={() => setDesktopMenu((p) => (p === item.name ? null : item.name))}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "clamp(4px, 1.5vw, 6px)",
                              padding: "clamp(5px, 1.5vw, 7px) clamp(8px, 2vw, 12px)",
                              background: active
                                ? isDocked ? "rgba(255,255,255,0.18)" : "#0f172a"
                                : "transparent",
                              color: isDocked ? "#fff" : active ? "#fff" : "#334155",
                              border: "none",
                              borderRadius: "clamp(8px, 2vw, 10px)",
                              cursor: "pointer",
                              fontSize: "clamp(11px, 2vw, 13px)",
                              fontWeight: 500,
                              transition: "all 0.2s ease",
                            }}
                          >
                            <Icon className="icon" />
                            <span>{item.name}</span>
                            <ChevronDown className={`icon ${isOpen ? "rotated" : ""}`} />
                          </button>

                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 8 }}
                                transition={{ duration: 0.2 }}
                                style={{
                                  position: "absolute",
                                  left: 0,
                                  top: "100%",
                                  marginTop: 8,
                                  width: "min(280px, 85vw)",
                                  background: "#fff",
                                  border: "1px solid #e2e8f0",
                                  borderRadius: 14,
                                  padding: 6,
                                  boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1),0 10px 10px -5px rgba(0,0,0,0.04)",
                                }}
                                role="menu"
                              >
                                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                  {item.submenu.map((sub) => {
                                    const subActive = isActivePath(pathname, sub.href);
                                    return (
                                      <Link
                                        key={sub.href}
                                        href={sub.href}
                                        style={{
                                          display: "block",
                                          padding: "10px 14px",
                                          background: subActive ? "#0f172a" : "transparent",
                                          color: subActive ? "#fff" : "#0f172a",
                                          borderRadius: 10,
                                          textDecoration: "none",
                                          transition: "background 0.2s",
                                        }}
                                        role="menuitem"
                                        onClick={() => setDesktopMenu(null)}
                                      >
                                        <div style={{ fontSize: 13, fontWeight: 500 }}>{sub.name}</div>
                                        {sub.description && (
                                          <div style={{ fontSize: 12, marginTop: 4, color: subActive ? "#e2e8f0" : "#64748b", lineHeight: 1.4 }}>
                                            {sub.description}
                                          </div>
                                        )}
                                      </Link>
                                    );
                                  })}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    }

                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "clamp(4px, 1.5vw, 6px)",
                          padding: "clamp(5px, 1.5vw, 7px) clamp(8px, 2vw, 12px)",
                          background: active
                            ? isDocked ? "rgba(255,255,255,0.18)" : "#0f172a"
                            : "transparent",
                          color: isDocked ? "#fff" : active ? "#fff" : "#334155",
                          borderRadius: "clamp(8px, 2vw, 10px)",
                          textDecoration: "none",
                          fontSize: "clamp(11px, 2vw, 13px)",
                          fontWeight: 500,
                          transition: "all 0.2s ease",
                        }}
                      >
                        <Icon className="icon" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </nav>
            </div>

            {/* ── Right side: Donate button only ───────────────────────────── */}
            <div style={{ display: "flex", alignItems: "center", gap: "clamp(12px, 3vw, 16px)" }}>
              <Link
                href="/join/donate"
                className="desktop-donate"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "clamp(6px, 1.5vw, 8px)",
                  padding: "clamp(6px, 1.5vw, 8px) clamp(16px, 4vw, 20px)",
                  background: isDocked ? "rgba(255,255,255,0.95)" : "#0284c7",
                  color: isDocked ? "#0f172a" : "#fff",
                  borderRadius: "40px",
                  textDecoration: "none",
                  fontSize: "clamp(12px, 2.5vw, 13px)",
                  fontWeight: 600,
                  transition: "all 0.3s ease",
                  border: isDocked ? "none" : "none",
                  boxShadow: isDocked ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
                  whiteSpace: "nowrap",
                }}
              >
                <Heart className="icon" />
                <span>Support</span>
              </Link>

              <button
                type="button"
                onClick={() => { setMobileOpen((o) => !o); if (mobileOpen) setMobileMenu(null); }}
                aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileOpen}
                aria-controls="mobile-navigation"
                className="mobile-menu-button"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "clamp(40px, 10vw, 44px)",
                  height: "clamp(40px, 10vw, 44px)",
                  background: mobileOpen
                    ? "#f1f5f9"
                    : isDocked ? "rgba(255,255,255,0.15)" : "#fff",
                  border: mobileOpen
                    ? "2px solid #0f172a"
                    : isDocked ? "1px solid rgba(255,255,255,0.3)" : "1px solid #e2e8f0",
                  borderRadius: "clamp(10px, 2.5vw, 12px)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  color: mobileOpen ? "#0f172a" : isDocked ? "#fff" : "#334155",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                {mobileOpen ? <X className="icon icon-large" /> : <Menu className="icon icon-large" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* ── MOBILE MENU ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{
              position: "fixed",
              top: scrolled ? "clamp(60px, 12vh, 76px)" : "clamp(70px, 15vh, 88px)",
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "#f8fafc",
              zIndex: 45,
              overflowY: "auto",
              WebkitOverflowScrolling: "touch",
              paddingBottom: "env(safe-area-inset-bottom, 20px)",
            }}
          >
            <div style={{ padding: "clamp(12px, 4vw, 16px)", minHeight: "100%", display: "flex", flexDirection: "column" }}>
              {/* Mobile Contact Info Card - Clean & Professional */}
              <div style={{ 
                backgroundColor: "#fff", 
                borderRadius: "clamp(16px, 4vw, 20px)", 
                padding: "clamp(14px, 4vw, 16px)", 
                marginBottom: "clamp(12px, 3vw, 16px)", 
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)" 
              }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "clamp(10px, 2.5vw, 12px)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "clamp(13px, 3.5vw, 14px)", color: "#334155" }}>
                    <span style={{ fontSize: "16px" }}>📍</span> 
                    <span>Bee Centre Bar — Nasra Gardens Estate, Embakasi Central, Nairobi, Kenya</span>
                  </div>
                  <a href="tel:+254706255611" style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "clamp(13px, 3.5vw, 14px)", color: "#0284c7", textDecoration: "none" }}>
                    <Phone className="icon" style={{ width: "16px", height: "16px" }} /> +254 706 255 611
                  </a>
                  <a href="mailto:info@reactnowfca.org" style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "clamp(13px, 3.5vw, 14px)", color: "#0284c7", textDecoration: "none" }}>
                    <svg className="icon" style={{ width: "16px", height: "16px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg> info@reactnowfca.org
                  </a>
                  {/* Social Icons in Mobile Menu */}
                  <div style={{ display: "flex", gap: "16px", paddingTop: "8px", borderTop: "1px solid #e2e8f0", marginTop: "4px" }}>
                    <a href="https://instagram.com/reactnowfc" target="_blank" rel="noopener noreferrer" style={{ color: "#64748b" }}><Instagram className="icon" /></a>
                    <a href="https://facebook.com/reactnowfc" target="_blank" rel="noopener noreferrer" style={{ color: "#64748b" }}><Facebook className="icon" /></a>
                    <a href="https://twitter.com/reactnowfc" target="_blank" rel="noopener noreferrer" style={{ color: "#64748b" }}><Twitter className="icon" /></a>
                    <a href="https://tiktok.com/@reactnowfc" target="_blank" rel="noopener noreferrer" style={{ color: "#64748b" }}>
                      <svg className="icon" fill="currentColor" viewBox="0 0 24 24" style={{ width: "16px", height: "16px" }}>
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.87-3.85 3.1 3.1 0 0 1 .46.04V9.9a6.48 6.48 0 0 0-1.28-.12 6.31 6.31 0 0 0-6.35 6.27 6.31 6.31 0 0 0 9.68 5.31 6.31 6.31 0 0 0 2.9-4.93V9.06a7.9 7.9 0 0 0 4.5 1.44V7.23a4.67 4.67 0 0 1-2.36-.54z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              <div style={{ backgroundColor: "#fff", borderRadius: "clamp(16px, 4vw, 20px)", padding: "clamp(6px, 2vw, 8px)", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", flex: 1 }}>
                <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {navigationItems.map((item) => {
                    const Icon       = item.icon;
                    const active     = isActivePath(pathname, item.href) || hasActiveSubmenu(pathname, item);
                    const hasSubmenu = Boolean(item.submenu);
                    const isOpen     = mobileMenu === item.name;

                    return (
                      <div key={item.name} style={{ marginBottom: 2 }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            backgroundColor: active && !hasSubmenu ? "#f1f5f9" : "transparent",
                            borderRadius: 14,
                            border: active && !hasSubmenu ? "1px solid #e2e8f0" : "none",
                          }}
                        >
                          <Link
                            href={item.href}
                            style={{
                              display: "flex",
                              flex: 1,
                              alignItems: "center",
                              gap: "clamp(12px, 3vw, 14px)",
                              padding: "clamp(12px, 3.5vw, 14px) clamp(14px, 4vw, 16px)",
                              color: active ? "#0f172a" : "#334155",
                              fontWeight: active ? 600 : 500,
                              fontSize: "clamp(14px, 3.5vw, 16px)",
                              textDecoration: "none",
                              borderRadius: 14,
                              minHeight: "clamp(48px, 12vw, 52px)",
                            }}
                            onClick={() => { if (!hasSubmenu) setMobileOpen(false); }}
                          >
                            <Icon className="icon icon-mobile" />
                            <span>{item.name}</span>
                            {active && !hasSubmenu && (
                              <span style={{ marginLeft: "auto", fontSize: 8, color: "#0284c7" }}>●</span>
                            )}
                          </Link>
                          {hasSubmenu && (
                            <button
                              onClick={() => setMobileMenu(isOpen ? null : item.name)}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "clamp(44px, 12vw, 52px)",
                                height: "clamp(44px, 12vw, 52px)",
                                background: "transparent",
                                border: "none",
                                borderRadius: 14,
                                cursor: "pointer",
                                color: active ? "#0f172a" : "#64748b",
                              }}
                              aria-label={isOpen ? `Close ${item.name} menu` : `Open ${item.name} menu`}
                            >
                              <ChevronDown className={`icon icon-mobile ${isOpen ? "rotated" : ""}`} />
                            </button>
                          )}
                        </div>

                        <AnimatePresence>
                          {hasSubmenu && isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              style={{ overflow: "hidden" }}
                            >
                              <div
                                style={{
                                  marginLeft: "clamp(44px, 12vw, 52px)",
                                  paddingLeft: "clamp(12px, 3vw, 16px)",
                                  borderLeft: "2px solid #e2e8f0",
                                  marginTop: 4,
                                  marginBottom: 4,
                                  paddingRight: "clamp(6px, 2vw, 8px)",
                                }}
                              >
                                {item.submenu?.map((sub) => {
                                  const subActive = isActivePath(pathname, sub.href);
                                  return (
                                    <Link
                                      key={sub.href}
                                      href={sub.href}
                                      style={{
                                        display: "block",
                                        padding: "clamp(10px, 3vw, 12px) clamp(12px, 3.5vw, 14px)",
                                        marginBottom: 4,
                                        backgroundColor: subActive ? "#f1f5f9" : "transparent",
                                        color: subActive ? "#0f172a" : "#475569",
                                        borderRadius: 12,
                                        textDecoration: "none",
                                        fontSize: "clamp(13px, 3.5vw, 15px)",
                                        fontWeight: subActive ? 500 : 400,
                                        border: subActive ? "1px solid #e2e8f0" : "none",
                                      }}
                                      onClick={() => setMobileOpen(false)}
                                    >
                                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                        <span>{sub.name}</span>
                                        {subActive && <span style={{ fontSize: 8, color: "#0284c7" }}>●</span>}
                                      </div>
                                      {sub.description && (
                                        <div style={{ fontSize: "clamp(11px, 3vw, 13px)", color: subActive ? "#475569" : "#64748b", marginTop: 4, lineHeight: 1.4 }}>
                                          {sub.description}
                                        </div>
                                      )}
                                    </Link>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </nav>
              </div>

              <div style={{ marginTop: "clamp(12px, 4vw, 16px)", position: "sticky", bottom: 16, zIndex: 46 }}>
                <Link
                  href="/join/donate"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "clamp(8px, 2vw, 10px)",
                    padding: "clamp(14px, 4vw, 16px)",
                    backgroundColor: "#0284c7",
                    color: "#fff",
                    borderRadius: "clamp(14px, 4vw, 16px)",
                    textDecoration: "none",
                    fontSize: "clamp(15px, 4vw, 17px)",
                    fontWeight: 600,
                    minHeight: "clamp(52px, 14vw, 56px)",
                    boxShadow: "0 8px 20px -4px rgba(2,132,199,0.3)",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                  onClick={() => setMobileOpen(false)}
                >
                  <Heart className="icon icon-mobile" />
                  <span>Support Our Academy</span>
                </Link>
              </div>
              <div style={{ height: "clamp(16px, 4vw, 20px)" }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── GLOBAL STYLES ──────────────────────────────────────────────────── */}
      <style jsx global>{`
        .icon { width: 16px; height: 16px; transition: transform 0.2s ease; }
        .icon-large  { width: 20px; height: 20px; }
        .icon-mobile { width: 20px; height: 20px; }

        @media (max-width: 480px) {
          .icon { width: 14px; height: 14px; }
          .icon-large { width: 18px; height: 18px; }
          .icon-mobile { width: 18px; height: 18px; }
        }

        .rotated { transform: rotate(180deg); }

        /* Desktop styles */
        @media (min-width: 1024px) {
          .desktop-nav    { display: flex !important; flex: 1; justify-content: center; }
          .desktop-donate { display: inline-flex !important; }
          .mobile-menu-button { display: none !important; }
          #mobile-navigation  { display: none !important; }
        }

        /* Tablet and mobile styles */
        @media (max-width: 1023px) {
          .desktop-nav    { display: none !important; }
          .desktop-donate { display: none !important; }
          .mobile-menu-button { display: flex !important; }
          #mobile-navigation {
            display: block !important;
            scrollbar-width: thin;
            scrollbar-color: #cbd5e1 #f1f5f9;
          }
          #mobile-navigation::-webkit-scrollbar       { width: 4px; }
          #mobile-navigation::-webkit-scrollbar-track { background: #f1f5f9; }
          #mobile-navigation::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 20px; }
        }

        /* Small mobile adjustments */
        @media (max-width: 380px) {
          .icon-mobile { width: 18px; height: 18px; }
          #mobile-navigation a { padding: 10px 12px !important; min-height: 44px !important; }
        }

        /* Safe area support for notched devices */
        @supports (padding: max(0px)) {
          #mobile-navigation {
            padding-left:  env(safe-area-inset-left);
            padding-right: env(safe-area-inset-right);
          }
        }
      `}</style>
    </>
  );
}