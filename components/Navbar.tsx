"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Home,
  Info,
  Users,
  BarChart3,
  Leaf,
  Phone,
  HandHeart,
  Heart,
} from "lucide-react";

/* =========================
   Navigation Structure
========================= */

const navigationItems = [
  { name: "Home", href: "/", icon: Home },

  {
    name: "About",
    href: "/about",
    icon: Info,
    submenu: [
      { name: "Our Story", href: "/about/story" },
      { name: "Mission & Vision", href: "/about/mission" },
      { name: "Core Pillars", href: "/about/pillars" },
      { name: "Team", href: "/about/team" },
    ],
  },

  {
    name: "Team",
    href: "/team",
    icon: Users,
    submenu: [
      { name: "Players", href: "/team/players" },
      { name: "Coaches", href: "/team/coaches" },
      { name: "Rising Stars", href: "/team/rising-stars" },
      { name: "Player of the Week", href: "/team/player-of-week" },
    ],
  },

  { name: "Impact", href: "/impact", icon: BarChart3 },

  {
    name: "Get Involved",
    href: "/join",
    icon: HandHeart,
    submenu: [
      { name: "Join as Player", href: "/join/player" },
      { name: "Volunteer", href: "/join/volunteer" },
      { name: "Partner With Us", href: "/join/partner" },
      { name: "Donate", href: "/join/donate" },
    ],
  },

  { name: "Sustainability", href: "/sustainability", icon: Leaf },
  { name: "Contact", href: "/contact", icon: Phone },
];

/* =========================
   Helpers
========================= */

const getSubmenuId = (name: string, prefix: "desktop" | "mobile") =>
  `${prefix}-submenu-${name.toLowerCase().replace(/\s+/g, "-")}`;

const isActivePath = (pathname: string, href: string) => {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
};

/* =========================
   Navbar
========================= */

export default function Navbar() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopMenu, setDesktopMenu] = useState<string | null>(null);
  const [mobileMenu, setMobileMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  /* Scroll Behaviour */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setMobileMenu(null);
    setDesktopMenu(null);
  }, [pathname]);

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-lg"
          : "bg-white/85 backdrop-blur"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* NAVBAR ROW */}
        <div className="flex items-center justify-between min-h-[72px] gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 flex-shrink-0"
            aria-label="React Now FC Academy home"
          >
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#14B8A6] to-[#0D5C63] flex items-center justify-center shadow-md">
              <span className="text-white text-lg">⚽</span>
            </div>

            <div className="leading-tight">
              <div className="font-bold text-sm sm:text-base text-[#081C1B]">
                React Now FC
              </div>
              <div className="text-[11px] sm:text-xs text-gray-500">
                Academy
              </div>
            </div>
          </Link>

          {/* Desktop Navigation (lg+) */}
          <div className="hidden lg:flex items-center gap-1 flex-1 justify-end">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const active = isActivePath(pathname, item.href);

              if (item.submenu) {
                const submenuId = getSubmenuId(item.name, "desktop");

                return (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => setDesktopMenu(item.name)}
                    onMouseLeave={() => setDesktopMenu(null)}
                  >
                    <button
                      type="button"
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14B8A6] focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
                        active
                          ? "bg-[#0D5C63]/10 text-[#0D5C63]"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      aria-haspopup="true"
                      aria-expanded={desktopMenu === item.name}
                      aria-controls={submenuId}
                      onClick={() =>
                        setDesktopMenu(
                          desktopMenu === item.name ? null : item.name
                        )
                      }
                      onKeyDown={(event) => {
                        if (event.key === "Escape") {
                          setDesktopMenu(null);
                        }
                      }}
                    >
                      <Icon size={16} aria-hidden="true" />
                      <span>{item.name}</span>
                      <ChevronDown
                        size={14}
                        className={`transition-transform ${
                          desktopMenu === item.name ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      />
                    </button>

                    {/* Desktop Dropdown */}
                    <AnimatePresence>
                      {desktopMenu === item.name && (
                        <motion.div
                          id={submenuId}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.16 }}
                          className="absolute top-full left-0 mt-3 w-60 rounded-xl bg-white shadow-xl border border-gray-100 py-2 overflow-hidden"
                        >
                          {item.submenu.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              className="flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#0D5C63] focus-visible:outline-none focus-visible:bg-gray-50"
                            >
                              <span>{sub.name}</span>
                              <ChevronRight size={14} aria-hidden="true" />
                            </Link>
                          ))}
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
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14B8A6] focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
                    active
                      ? "bg-[#0D5C63]/10 text-[#0D5C63]"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon size={16} aria-hidden="true" />
                  <span>{item.name}</span>
                </Link>
              );
            })}

            {/* Desktop CTA */}
            <Link
              href="/join/donate"
              className="ml-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0D5C63] text-white text-sm font-semibold shadow-sm hover:bg-[#081C1B] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14B8A6] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              <Heart size={16} aria-hidden="true" />
              <span>Support Us</span>
            </Link>
          </div>

          {/* Mobile Toggle (default, hidden on lg+) */}
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg border border-gray-200 bg-white/70 text-gray-800 shadow-sm hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14B8A6] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            {mobileOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="mobile-nav"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.18 }}
              className="lg:hidden mt-3 rounded-xl bg-white shadow-xl border border-gray-100 overflow-hidden"
            >
              <nav aria-label="Mobile navigation">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActivePath(pathname, item.href);
                  const hasSubmenu = Boolean(item.submenu);
                  const submenuId = hasSubmenu
                    ? getSubmenuId(item.name, "mobile")
                    : undefined;

                  return (
                    <div
                      key={item.name}
                      className="border-b last:border-b-0 border-gray-100"
                    >
                      <div className="flex items-center justify-between">
                        <Link
                          href={item.href}
                          className={`flex flex-1 items-center gap-3 px-4 py-3 text-sm font-medium ${
                            active
                              ? "text-[#0D5C63] bg-[#0D5C63]/5"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <Icon size={18} aria-hidden="true" />
                          <span>{item.name}</span>
                        </Link>

                        {hasSubmenu && (
                          <button
                            type="button"
                            onClick={() =>
                              setMobileMenu(
                                mobileMenu === item.name ? null : item.name
                              )
                            }
                            className="px-4 py-3 text-gray-500 hover:text-[#0D5C63] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14B8A6] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                            aria-label={
                              mobileMenu === item.name
                                ? `Collapse ${item.name} submenu`
                                : `Expand ${item.name} submenu`
                            }
                            aria-expanded={mobileMenu === item.name}
                            aria-controls={submenuId}
                          >
                            <ChevronDown
                              size={16}
                              className={`transition-transform ${
                                mobileMenu === item.name ? "rotate-180" : ""
                              }`}
                              aria-hidden="true"
                            />
                          </button>
                        )}
                      </div>

                      {/* Mobile Submenu */}
                      <AnimatePresence>
                        {hasSubmenu && mobileMenu === item.name && (
                          <motion.div
                            id={submenuId}
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.16 }}
                            className="pl-10 pr-4 pb-3 pt-1 space-y-1 bg-gray-50/60"
                          >
                            {item.submenu!.map((sub) => (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                className="block py-1.5 text-sm text-gray-600 hover:text-[#0D5C63]"
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}

                {/* Mobile CTA */}
                <div className="border-t border-gray-100 p-4">
                  <Link
                    href="/join/donate"
                    className="block w-full text-center bg-[#0D5C63] text-white font-semibold py-3 rounded-lg shadow-sm hover:bg-[#081C1B] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14B8A6] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  >
                    Support Us
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}