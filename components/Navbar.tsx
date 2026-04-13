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
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Hero background images shown in the "docked-bottom" navbar band
// Swap these paths for your actual academy spotlight images
// ─────────────────────────────────────────────────────────────────────────────
const SPOTLIGHT_IMAGES = [
  "/images/Africankid.jpeg",
  "/images/Hero1.jpeg",
  "/images/Hero2.jpeg",
  "/images/reactnowlog.png",
  "/images/Hero5.jpeg"
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
            style={{ objectFit: "cover", objectPosition: "center top" }}
            priority={i === 0}
          />
        </div>
      ))}
      {/* Dark overlay so text stays readable */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.72) 100%)",
        }}
      />
      {/* Dot indicators */}
      <div
        style={{
          position: "absolute",
          bottom: 10,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 6,
        }}
      >
        {SPOTLIGHT_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`Show spotlight ${i + 1}`}
            style={{
              width: i === idx ? 20 : 6,
              height: 6,
              borderRadius: 3,
              background: i === idx ? "#fff" : "rgba(255,255,255,0.4)",
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
// Component
// ─────────────────────────────────────────────────────────────────────────────
export default function Navbar() {
  const pathname   = usePathname();
  const navRef     = useRef<HTMLElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [desktopMenu, setDesktopMenu] = useState<string | null>(null);
  const [mobileMenu,  setMobileMenu]  = useState<string | null>(null);
  const [scrolled,    setScrolled]    = useState(false);

  // ── Parabolic / spring scroll state ──────────────────────────────────────
  // When page Y < DOCK_THRESHOLD the navbar floats at the bottom with the
  // spotlight behind it.  Once the user scrolls past the threshold it springs
  // up to the top with a satisfying overshoot.
  const DOCK_THRESHOLD = 80; // px before the nav "launches" to the top

  const { scrollY } = useScroll();

  // Raw 0-1 progress (0 = docked-bottom, 1 = pinned-top)
  const rawProgress = useTransform(scrollY, [0, DOCK_THRESHOLD], [0, 1]);
  // Spring gives the parabolic / elastic feel
  const progress = useSpring(rawProgress, { stiffness: 220, damping: 28, mass: 0.6 });

  // Vertical position: starts near bottom (calc(100vh - navHeight - 24px)), ends at 0
  const yPos = useTransform(progress, [0, 1], ["calc(100vh - 112px)", "0px"]);

  // Width narrows slightly as it docks to top (full-bleed → contained)
  const navWidth  = useTransform(progress, [0, 1], ["100%", "100%"]);
  const navRadius = useTransform(progress, [0, 1], ["0px", "0px"]);

  // Backdrop and bg shift from transparent-dark (over image) → white
  const bgOpacity = useTransform(progress, [0, 1], [0, 1]);

  // Logo scales up when docked at bottom
  const logoScale = useTransform(progress, [0, 1], [1.18, 1]);

  // ── Derived "is docked at bottom" boolean for conditional rendering ───────
  const [isDocked, setIsDocked] = useState(true);
  useEffect(() => {
    return progress.on("change", (v) => setIsDocked(v < 0.5));
  }, [progress]);

  // ── Scroll listener for legacy `scrolled` flag (used by dropdown shadow) ─
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > DOCK_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on route change
  useEffect(() => {
    setMobileOpen(false);
    setMobileMenu(null);
    setDesktopMenu(null);
  }, [pathname]);

  // Body scroll-lock for mobile menu
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.cssText = "overflow:hidden;position:fixed;width:100%;height:100%";
    } else {
      document.body.style.cssText = "";
    }
    return () => { document.body.style.cssText = ""; };
  }, [mobileOpen]);

  // Click-outside / Escape for desktop dropdowns
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

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
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
            {/* Academy tagline centred over the image */}
            <div
              style={{
                position: "absolute",
                top: "38%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
                color: "#fff",
                pointerEvents: "none",
                width: "90%",
              }}
            >
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                style={{
                  fontSize: "clamp(11px, 2vw, 14px)",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.7)",
                  marginBottom: 10,
                  fontWeight: 500,
                }}
              >
                Nairobi, Kenya
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.7 }}
                style={{
                  fontSize: "clamp(28px, 6vw, 72px)",
                  fontWeight: 800,
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                  color: "#fff",
                  margin: "0 0 16px",
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
                  fontSize: "clamp(13px, 2vw, 18px)",
                  color: "rgba(255,255,255,0.8)",
                  maxWidth: 520,
                  margin: "0 auto",
                  lineHeight: 1.5,
                }}
              >
                Grassroots football, education &amp; mentorship — building champions &amp; futures.
              </motion.p>
              {/* Scroll hint */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                style={{ marginTop: 32, display: "flex", justifyContent: "center" }}
              >
                <div
                  style={{
                    width: 28, height: 44,
                    border: "2px solid rgba(255,255,255,0.5)",
                    borderRadius: 14,
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    paddingTop: 6,
                  }}
                >
                  <div
                    style={{
                      width: 4, height: 10,
                      background: "rgba(255,255,255,0.8)",
                      borderRadius: 2,
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
        }}
      >
        {/* Animated white backdrop (appears as nav travels to top) */}
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
        {/* While docked, show a dark glassmorphism band at the bottom */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            opacity: useTransform(progress, [0, 0.4], [1, 0]),
            borderTop: "1px solid rgba(255,255,255,0.15)",
          }}
        />

        <div
          style={{
            maxWidth: 1440,
            margin: "0 auto",
            padding: "0 1rem",
            height: scrolled ? 76 : 88,
            transition: "height 0.3s ease",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "100%" }}>

            {/* ── Logo ─────────────────────────────────────────────────────── */}
            <Link
              href="/"
              aria-label="React Now FC Academy home"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
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
                  width:  scrolled ? 60 : 76,
                  height: scrolled ? 60 : 76,
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
              <div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: scrolled ? 15 : 17,
                    transition: "font-size 0.3s ease",
                    color: isDocked ? "#fff" : "#0f172a",
                    lineHeight: 1.2,
                  }}
                >
                  React Now FC
                </div>
                <div
                  style={{
                    fontSize: scrolled ? 10 : 11,
                    color: isDocked ? "rgba(255,255,255,0.65)" : "#64748b",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    lineHeight: 1.2,
                    transition: "color 0.3s ease",
                  }}
                >
                  Academy
                </div>
              </div>
            </Link>

            {/* ── Desktop nav ───────────────────────────────────────────────── */}
            <div className="desktop-nav">
              <nav aria-label="Desktop navigation">
                <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
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
                              gap: 6,
                              padding: "7px 10px",
                              background: active
                                ? isDocked ? "rgba(255,255,255,0.18)" : "#0f172a"
                                : "transparent",
                              color: isDocked ? "#fff" : active ? "#fff" : "#334155",
                              border: "none",
                              borderRadius: 10,
                              cursor: "pointer",
                              fontSize: 13,
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
                                  width: 280,
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
                          gap: 6,
                          padding: "7px 10px",
                          background: active
                            ? isDocked ? "rgba(255,255,255,0.18)" : "#0f172a"
                            : "transparent",
                          color: isDocked ? "#fff" : active ? "#fff" : "#334155",
                          borderRadius: 10,
                          textDecoration: "none",
                          fontSize: 13,
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

            {/* ── Right side ────────────────────────────────────────────────── */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Link
                href="/join/donate"
                className="desktop-donate"
                style={{
                  display: "none",
                  alignItems: "center",
                  gap: 6,
                  padding: "8px 16px",
                  background: isDocked ? "rgba(255,255,255,0.92)" : "#0284c7",
                  color: isDocked ? "#0f172a" : "#fff",
                  borderRadius: 10,
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: 600,
                  transition: "all 0.3s ease",
                  border: isDocked ? "1px solid rgba(255,255,255,0.3)" : "none",
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
                  width: 44,
                  height: 44,
                  background: mobileOpen
                    ? "#f1f5f9"
                    : isDocked ? "rgba(255,255,255,0.15)" : "#fff",
                  border: mobileOpen
                    ? "2px solid #0f172a"
                    : isDocked ? "1px solid rgba(255,255,255,0.3)" : "1px solid #e2e8f0",
                  borderRadius: 12,
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
              top: scrolled ? 76 : 88,
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
            <div style={{ padding: 16, minHeight: "100%", display: "flex", flexDirection: "column" }}>
              <div style={{ backgroundColor: "#fff", borderRadius: 20, padding: 8, boxShadow: "0 4px 12px rgba(0,0,0,0.05)", flex: 1 }}>
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
                              gap: 14,
                              padding: "14px 16px",
                              color: active ? "#0f172a" : "#334155",
                              fontWeight: active ? 600 : 500,
                              fontSize: 16,
                              textDecoration: "none",
                              borderRadius: 14,
                              minHeight: 52,
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
                                width: 52,
                                height: 52,
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
                                  marginLeft: 52,
                                  paddingLeft: 16,
                                  borderLeft: "2px solid #e2e8f0",
                                  marginTop: 4,
                                  marginBottom: 4,
                                  paddingRight: 8,
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
                                        padding: "12px 14px",
                                        marginBottom: 4,
                                        backgroundColor: subActive ? "#f1f5f9" : "transparent",
                                        color: subActive ? "#0f172a" : "#475569",
                                        borderRadius: 12,
                                        textDecoration: "none",
                                        fontSize: 15,
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
                                        <div style={{ fontSize: 13, color: subActive ? "#475569" : "#64748b", marginTop: 4, lineHeight: 1.4 }}>
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

              <div style={{ marginTop: 16, position: "sticky", bottom: 16, zIndex: 46 }}>
                <Link
                  href="/join/donate"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    padding: 16,
                    backgroundColor: "#0284c7",
                    color: "#fff",
                    borderRadius: 16,
                    textDecoration: "none",
                    fontSize: 17,
                    fontWeight: 600,
                    minHeight: 56,
                    boxShadow: "0 8px 20px -4px rgba(2,132,199,0.3)",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                  onClick={() => setMobileOpen(false)}
                >
                  <Heart className="icon icon-mobile" />
                  <span>Support Our Academy</span>
                </Link>
              </div>
              <div style={{ height: 20 }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── GLOBAL STYLES ──────────────────────────────────────────────────── */}
      <style jsx global>{`
        .icon { width: 16px; height: 16px; transition: transform 0.2s ease; }
        .icon-large  { width: 20px; height: 20px; }
        .icon-mobile { width: 20px; height: 20px; }
        .rotated { transform: rotate(180deg); }

        @media (min-width: 1024px) {
          .desktop-nav    { display: flex !important; flex: 1; justify-content: center; }
          .desktop-donate { display: inline-flex !important; }
          .mobile-menu-button { display: none !important; }
          #mobile-navigation  { display: none !important; }
        }
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
        @media (max-width: 380px) {
          .icon-mobile { width: 18px; height: 18px; }
          #mobile-navigation a { padding: 12px 14px !important; min-height: 48px !important; }
        }
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