"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SITE_IMAGES } from "@/lib/site-images";
import { AnimatePresence, motion, useScroll, useTransform, useSpring } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
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
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Hero background images
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

// ─────────────────────────────────────────────────────────────────────────────
// SOCIAL LINKS - SAME AS FOOTER - Images directly in /public/images/
// Using the exact same pattern that works in footer
// ─────────────────────────────────────────────────────────────────────────────
const SOCIAL_LINKS = [
  { icon: "/images/Tiktok.jpeg",      href: "https://www.tiktok.com/@react_now.fc.academy",           label: "TikTok" },
  { icon: "/images/Xlogo.png",        href: "https://x.com/reactnowfc",                               label: "X (Twitter)" },
  { icon: "/images/InstLOGO.jpeg",    href: "https://www.instagram.com/reactnowfc_academy",          label: "Instagram" },
  { icon: "/images/LinkedInLogo.png", href: "https://linkedin.com/company/reactnowfc",               label: "LinkedIn" },
  { icon: "/images/facebooklogo.png", href: "https://facebook.com/reactnowfc",                       label: "Facebook" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function hasActiveSubmenu(pathname: string, item: NavItem) {
  return item.submenu?.some((sub) => isActivePath(pathname, sub.href)) ?? false;
}

// ─────────────────────────────────────────────────────────────────────────────
// Spotlight carousel
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
            style={{ objectFit: "cover", objectPosition: "center 20%" }}
            priority={i === 0}
            quality={85}
          />
        </div>
      ))}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.75) 100%)",
        }}
      />
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
// Using same Image pattern as footer for social icons
// ─────────────────────────────────────────────────────────────────────────────
function TopBar({ isVisible, isDocked }: { isVisible: boolean; isDocked: boolean }) {
  if (!isVisible) return null;

  return (
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
        background: isDocked ? "rgba(0,0,0,0.7)" : "#0f172a",
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${isDocked ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.15)"}`,
      }}
    >
      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          padding: "6px clamp(12px, 4vw, 24px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        {/* Left side: Location & Contact */}
        <div style={{ display: "flex", alignItems: "center", gap: "clamp(12px, 2vw, 20px)", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: isDocked ? "rgba(255,255,255,0.85)" : "#fff" }}>
            <MapPin style={{ width: "12px", height: "12px" }} />
            <span style={{ fontSize: "clamp(10px, 2vw, 12px)" }}>Embakasi, Nairobi</span>
          </div>
          <a
            href="tel:+254706255611"
            style={{ display: "flex", alignItems: "center", gap: "6px", color: isDocked ? "rgba(255,255,255,0.85)" : "#fff", textDecoration: "none", fontSize: "clamp(10px, 2vw, 12px)" }}
          >
            <Phone style={{ width: "12px", height: "12px" }} />
            <span>+254 706 255 611</span>
          </a>
          <a
            href="https://wa.me/254706255611"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", gap: "6px", color: "#25D366", textDecoration: "none", fontSize: "clamp(10px, 2vw, 12px)" }}
          >
            <FaWhatsapp style={{ width: "12px", height: "12px" }} />
            <span>WhatsApp</span>
          </a>
          <a
            href="mailto:info@reactnowfca.org"
            style={{ display: "flex", alignItems: "center", gap: "6px", color: isDocked ? "rgba(255,255,255,0.85)" : "#fff", textDecoration: "none", fontSize: "clamp(10px, 2vw, 12px)" }}
          >
            <Mail style={{ width: "12px", height: "12px" }} />
            <span>info@reactnowfca.org</span>
          </a>
        </div>

        {/* Right side: Social Icons - SAME PATTERN AS FOOTER */}
        <div style={{ display: "flex", alignItems: "center", gap: "clamp(10px, 2vw, 14px)" }}>
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "24px",
                height: "24px",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              <Image 
                src={social.icon} 
                alt={social.label} 
                width={20} 
                height={20} 
                className="object-contain"
                style={{ filter: isDocked ? "brightness(0) invert(1)" : "none" }}
              />
            </a>
          ))}
        </div>
      </div>
    </motion.div>
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

  const DOCK_THRESHOLD = 100;

  const { scrollY } = useScroll();
  const rawProgress = useTransform(scrollY, [0, DOCK_THRESHOLD], [0, 1]);
  const progress = useSpring(rawProgress, { stiffness: 220, damping: 28, mass: 0.6 });
  const yPos = useTransform(progress, [0, 1], ["calc(100vh - 100px)", "0px"]);
  const navWidth  = useTransform(progress, [0, 1], ["100%", "100%"]);
  const navRadius = useTransform(progress, [0, 1], ["0px", "0px"]);
  const bgOpacity = useTransform(progress, [0, 1], [0, 1]);
  const logoScale = useTransform(progress, [0, 1], [1.15, 1]);

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

  const showTopBar = isDocked && !scrolled;
  const navbarTopOffset = showTopBar ? "40px" : "0px";

  return (
    <>
      <TopBar isVisible={showTopBar} isDocked={isDocked} />

      {/* SPOTLIGHT BAND - only visible when docked and not scrolled */}
      <AnimatePresence>
        {isDocked && !scrolled && (
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
                }}
              >
                Grassroots football, education &amp; mentorship — building champions &amp; futures.
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NAVBAR */}
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
          top: navbarTopOffset,
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
          }}
        />
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(16px)",
            opacity: useTransform(progress, [0, 0.4], [1, 0]),
            borderTop: "1px solid rgba(255,255,255,0.15)",
          }}
        />

        <div
          style={{
            maxWidth: 1440,
            margin: "0 auto",
            padding: "0 clamp(12px, 4vw, 24px)",
            height: scrolled ? "clamp(56px, 10vh, 70px)" : "clamp(64px, 12vh, 80px)",
            transition: "height 0.3s ease",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "100%" }}>

            {/* Logo */}
            <Link
              href="/"
              aria-label="React Now FC Academy home"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "clamp(8px, 2vw, 12px)",
                textDecoration: "none",
                color: "inherit",
              }}
              onClick={() => mobileOpen && setMobileOpen(false)}
            >
              <motion.div
                style={{
                  position: "relative",
                  flexShrink: 0,
                  scale: logoScale,
                  width:  scrolled ? "clamp(40px, 8vw, 50px)" : "clamp(48px, 10vw, 65px)",
                  height: scrolled ? "clamp(40px, 8vw, 50px)" : "clamp(48px, 10vw, 65px)",
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
                    fontSize: scrolled ? "clamp(12px, 2.5vw, 14px)" : "clamp(13px, 3vw, 16px)",
                    color: isDocked && !scrolled ? "#fff" : "#0f172a",
                    lineHeight: 1.2,
                    whiteSpace: "nowrap",
                  }}
                >
                  React Now FC
                </div>
                <div
                  style={{
                    fontSize: scrolled ? "clamp(8px, 1.8vw, 9px)" : "clamp(8px, 2vw, 10px)",
                    color: isDocked && !scrolled ? "rgba(255,255,255,0.7)" : "#64748b",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                  }}
                >
                  Academy
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="desktop-nav">
              <nav aria-label="Desktop navigation">
                <div style={{ display: "flex", gap: "clamp(2px, 1vw, 4px)", alignItems: "center" }}>
                  {navigationItems.map((item) => {
                    const Icon  = item.icon;
                    const active = isActivePath(pathname, item.href) || hasActiveSubmenu(pathname, item);
                    const isDarkMode = isDocked && !scrolled;

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
                            onClick={() => setDesktopMenu((p) => (p === item.name ? null : item.name))}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "clamp(4px, 1.5vw, 6px)",
                              padding: "clamp(5px, 1.5vw, 7px) clamp(8px, 2vw, 12px)",
                              background: active && !isDarkMode ? "#0f172a" : active && isDarkMode ? "rgba(255,255,255,0.18)" : "transparent",
                              color: isDarkMode ? "#fff" : active ? "#fff" : "#334155",
                              border: "none",
                              borderRadius: "clamp(8px, 2vw, 10px)",
                              cursor: "pointer",
                              fontSize: "clamp(11px, 2vw, 13px)",
                              fontWeight: 500,
                            }}
                          >
                            <Icon style={{ width: "14px", height: "14px" }} />
                            <span>{item.name}</span>
                            <ChevronDown style={{ width: "12px", height: "12px", transform: isOpen ? "rotate(180deg)" : "none" }} />
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
                                  boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
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
                                        }}
                                        role="menuitem"
                                        onClick={() => setDesktopMenu(null)}
                                      >
                                        <div style={{ fontSize: 13, fontWeight: 500 }}>{sub.name}</div>
                                        {sub.description && (
                                          <div style={{ fontSize: 12, marginTop: 4, color: subActive ? "#e2e8f0" : "#64748b" }}>
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
                          background: active && !isDarkMode ? "#0f172a" : active && isDarkMode ? "rgba(255,255,255,0.18)" : "transparent",
                          color: isDarkMode ? "#fff" : active ? "#fff" : "#334155",
                          borderRadius: "clamp(8px, 2vw, 10px)",
                          textDecoration: "none",
                          fontSize: "clamp(11px, 2vw, 13px)",
                          fontWeight: 500,
                        }}
                      >
                        <Icon style={{ width: "14px", height: "14px" }} />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </nav>
            </div>

            {/* Right side: Donate button */}
            <div style={{ display: "flex", alignItems: "center", gap: "clamp(12px, 3vw, 16px)" }}>
              <Link
                href="/join/donate"
                className="desktop-donate"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "clamp(6px, 1.5vw, 8px)",
                  padding: "clamp(6px, 1.5vw, 8px) clamp(16px, 4vw, 20px)",
                  background: isDocked && !scrolled ? "rgba(255,255,255,0.95)" : "#0284c7",
                  color: isDocked && !scrolled ? "#0f172a" : "#fff",
                  borderRadius: "40px",
                  textDecoration: "none",
                  fontSize: "clamp(12px, 2.5vw, 13px)",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                <Heart style={{ width: "14px", height: "14px" }} />
                <span>Support</span>
              </Link>

              <button
                type="button"
                onClick={() => { setMobileOpen((o) => !o); if (mobileOpen) setMobileMenu(null); }}
                aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileOpen}
                className="mobile-menu-button"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "clamp(38px, 9vw, 42px)",
                  height: "clamp(38px, 9vw, 42px)",
                  background: mobileOpen ? "#f1f5f9" : isDocked && !scrolled ? "rgba(255,255,255,0.15)" : "#fff",
                  border: mobileOpen ? "2px solid #0f172a" : isDocked && !scrolled ? "1px solid rgba(255,255,255,0.3)" : "1px solid #e2e8f0",
                  borderRadius: "clamp(10px, 2.5vw, 12px)",
                  cursor: "pointer",
                  color: mobileOpen ? "#0f172a" : isDocked && !scrolled ? "#fff" : "#334155",
                }}
              >
                {mobileOpen ? <X style={{ width: "18px", height: "18px" }} /> : <Menu style={{ width: "18px", height: "18px" }} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
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
              top: scrolled ? "clamp(56px, 10vh, 70px)" : "clamp(64px, 12vh, 80px)",
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
              {/* Mobile Contact Info Card */}
              <div style={{ 
                backgroundColor: "#fff", 
                borderRadius: "clamp(16px, 4vw, 20px)", 
                padding: "clamp(14px, 4vw, 16px)", 
                marginBottom: "clamp(12px, 3vw, 16px)", 
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)" 
              }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "clamp(10px, 2.5vw, 12px)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "clamp(13px, 3.5vw, 14px)", color: "#334155" }}>
                    <MapPin style={{ width: "16px", height: "16px" }} /> 
                    <span>Bee Centre Bar — Nasra Gardens Estate, Embakasi Central, Nairobi, Kenya</span>
                  </div>
                  <a href="tel:+254706255611" style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "clamp(13px, 3.5vw, 14px)", color: "#0284c7", textDecoration: "none" }}>
                    <Phone style={{ width: "16px", height: "16px" }} /> +254 706 255 611
                  </a>
                  <a href="https://wa.me/254706255611" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "clamp(13px, 3.5vw, 14px)", color: "#25D366", textDecoration: "none" }}>
                    <FaWhatsapp style={{ width: "16px", height: "16px" }} /> WhatsApp: +254 706 255 611
                  </a>
                  <a href="mailto:info@reactnowfca.org" style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "clamp(13px, 3.5vw, 14px)", color: "#0284c7", textDecoration: "none" }}>
                    <Mail style={{ width: "16px", height: "16px" }} /> info@reactnowfca.org
                  </a>
                  {/* Social Icons in Mobile Menu - SAME PATTERN AS FOOTER */}
                  <div style={{ display: "flex", gap: "16px", paddingTop: "8px", borderTop: "1px solid #e2e8f0", marginTop: "4px", flexWrap: "wrap" }}>
                    {SOCIAL_LINKS.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "28px", height: "28px" }}
                      >
                        <Image src={social.icon} alt={social.label} width={24} height={24} className="object-contain" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Navigation Items */}
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
                            <Icon style={{ width: "20px", height: "20px" }} />
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
                              <ChevronDown style={{ width: "20px", height: "20px", transform: isOpen ? "rotate(180deg)" : "none" }} />
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
                  <Heart style={{ width: "20px", height: "20px" }} />
                  <span>Support Our Academy</span>
                </Link>
              </div>
              <div style={{ height: "clamp(16px, 4vw, 20px)" }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Styles */}
      <style jsx global>{`
        @media (min-width: 1024px) {
          .desktop-nav { display: flex !important; flex: 1; justify-content: center; }
          .desktop-donate { display: inline-flex !important; }
          .mobile-menu-button { display: none !important; }
          #mobile-navigation { display: none !important; }
        }
        @media (max-width: 1023px) {
          .desktop-nav { display: none !important; }
          .desktop-donate { display: none !important; }
          .mobile-menu-button { display: flex !important; }
          #mobile-navigation {
            display: block !important;
            scrollbar-width: thin;
            scrollbar-color: #cbd5e1 #f1f5f9;
          }
          #mobile-navigation::-webkit-scrollbar { width: 4px; }
          #mobile-navigation::-webkit-scrollbar-track { background: #f1f5f9; }
          #mobile-navigation::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 20px; }
        }
        @media (max-width: 380px) {
          #mobile-navigation a { padding: 10px 12px !important; min-height: 44px !important; }
        }
        @supports (padding: max(0px)) {
          #mobile-navigation {
            padding-left: env(safe-area-inset-left);
            padding-right: env(safe-area-inset-right);
          }
        }
      `}</style>
    </>
  );
}