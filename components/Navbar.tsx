"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import Link from "next/link";
import Image from "next/image"   
import { usePathname } from "next/navigation";
import { SITE_IMAGES } from "@/lib/site-images";
import { AnimatePresence, motion } from "framer-motion";
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
      {
        name: "Our Story",
        href: "/about/story",
        description: "How the academy started and why it matters.",
      },
      {
        name: "Mission & Vision",
        href: "/about/mission",
        description: "What drives our work and where we are going.",
      },
      {
        name: "Core Pillars",
        href: "/about/pillars",
        description: "The values and focus areas shaping our impact.",
      },
      {
        name: "Team",
        href: "/about/team",
        description: "Meet the people guiding the academy forward.",
      },
    ],
  },
  {
    name: "Team",
    href: "/team",
    icon: Users,
    submenu: [
      {
        name: "Meet the Team",
        href: "/team",
        description: "Squad, coaches, and the faces behind the academy.",
      },
      {
        name: "Staff & leadership",
        href: "/about/team",
        description: "Founders, head coach, and core leadership.",
      },
      {
        name: "Player highlights",
        href: "/team/highlights",
        description: "Spotlights, match moments, and rising talent.",
      },
    ],
  },
  { name: "Impact", href: "/impact", icon: BarChart3 },
  {
    name: "Get Involved",
    href: "/join",
    icon: HandHeart,
    submenu: [
      {
        name: "Join as Player",
        href: "/join/player",
        description: "Become part of a structured growth journey.",
      },
      {
        name: "Volunteer",
        href: "/join/volunteer",
        description: "Support mentoring, logistics, and community work.",
      },
      {
        name: "Partner With Us",
        href: "/join/partner",
        description: "Collaborate to expand youth opportunity and impact.",
      },
      {
        name: "Donate",
        href: "/join/donate",
        description: "Help fund safe, meaningful youth development.",
      },
    ],
  },
  { name: "Sustainability", href: "/sustainability", icon: Leaf },
  { name: "Contact", href: "/contact", icon: Phone },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function hasActiveSubmenu(pathname: string, item: NavItem) {
  return item.submenu?.some((sub) => isActivePath(pathname, sub.href)) ?? false;
}

export default function Navbar() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const desktopMenuTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopMenu, setDesktopMenu] = useState<string | null>(null);
  const [mobileMenu, setMobileMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
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

  // Handle body scroll lock for mobile menu
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.height = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.height = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.height = "";
    };
  }, [mobileOpen]);

  // Handle click outside for desktop menus
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setDesktopMenu(null);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDesktopMenu(null);
        if (mobileOpen) {
          setMobileOpen(false);
          setMobileMenu(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [mobileOpen]);

  // Handle desktop menu with hover intent
  const handleDesktopMenuEnter = (itemName: string) => {
    if (desktopMenuTimeoutRef.current) {
      clearTimeout(desktopMenuTimeoutRef.current);
    }
    setDesktopMenu(itemName);
  };

  const handleDesktopMenuLeave = () => {
    desktopMenuTimeoutRef.current = setTimeout(() => {
      setDesktopMenu(null);
    }, 150);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
    if (!mobileOpen) {
      setMobileMenu(null);
    }
  };

  return (
    <>
      <header 
        ref={navRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderBottom: scrolled ? '1px solid rgba(226, 232, 240, 0.8)' : '1px solid rgba(226, 232, 240, 0.5)',
          transition: 'all 0.3s ease',
          boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.08)' : 'none'
        }}
      >
        <div style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 1rem',
          height: scrolled ? '76px' : '96px',
          transition: 'height 0.3s ease'
        }}>
          {/* Main navbar row - flex layout */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '100%'
          }}>
            {/* Logo section - always visible */}
            <Link
              href="/"
              aria-label="React Now FC Academy home"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                textDecoration: 'none',
                color: 'inherit',
                WebkitTapHighlightColor: 'transparent'
              }}
              onClick={() => mobileOpen && setMobileOpen(false)}
            >
<div
  style={{
    width: scrolled ? "56px" : "72px",
    height: scrolled ? "56px" : "72px",
    position: "relative",
    flexShrink: 0,
    transition: "all 0.3s ease",
  }}
>
  <Image
    src={SITE_IMAGES.logo}
    alt="React Now FC Logo"
    fill
    sizes="(max-width: 768px) 72px, 72px"
    style={{
      objectFit: "contain",
      padding: "2px",
    }}
    priority
  />
</div>
              <div>
                <div style={{ 
                  fontWeight: 600,
                  fontSize: scrolled ? '14px' : '16px',
                  transition: 'font-size 0.3s ease',
                  color: '#0f172a',
                  lineHeight: 1.2,
                  
                }}>
                  React Now FC
                </div>
                <div style={{ 
                  fontSize: scrolled ? '10px' : '11px',
                  color: '#64748b',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  lineHeight: 1.2
                }}>
                  Academy
                </div>
              </div>
            </Link>

            {/* Desktop Navigation - visible only on desktop */}
            <div className="desktop-nav">
              <nav aria-label="Desktop navigation">
                <div style={{
                  display: 'flex',
                  gap: '2px',
                  alignItems: 'center'
                }}>
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActivePath(pathname, item.href) || hasActiveSubmenu(pathname, item);

                    if (item.submenu) {
                      const isOpen = desktopMenu === item.name;

                      return (
                        <div
                          key={item.name}
                          style={{ position: 'relative' }}
                          onMouseEnter={() => handleDesktopMenuEnter(item.name)}
                          onMouseLeave={handleDesktopMenuLeave}
                        >
                          <button
                            type="button"
                            aria-expanded={isOpen}
                            aria-haspopup="menu"
                            onClick={() =>
                              setDesktopMenu((prev) => (prev === item.name ? null : item.name))
                            }
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              padding: '7px 10px',
                              background: active ? '#0f172a' : 'transparent',
                              color: active ? 'white' : '#334155',
                              border: 'none',
                              borderRadius: '10px',
                              cursor: 'pointer',
                              fontSize: '13px',
                              fontWeight: 500,
                              transition: 'all 0.2s ease'
                            }}
                          >
                            <Icon className="icon" />
                            <span>{item.name}</span>
                            <ChevronDown className={`icon ${isOpen ? 'rotated' : ''}`} />
                          </button>

                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 8 }}
                                transition={{ duration: 0.2 }}
                                style={{
                                  position: 'absolute',
                                  left: 0,
                                  top: '100%',
                                  marginTop: '8px',
                                  width: '280px',
                                  background: 'white',
                                  border: '1px solid #e2e8f0',
                                  borderRadius: '14px',
                                  padding: '6px',
                                  boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)'
                                }}
                                role="menu"
                              >
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                  {item.submenu.map((sub) => {
                                    const subActive = isActivePath(pathname, sub.href);

                                    return (
                                      <Link
                                        key={sub.href}
                                        href={sub.href}
                                        style={{
                                          display: 'block',
                                          padding: '10px 14px',
                                          background: subActive ? '#0f172a' : 'transparent',
                                          color: subActive ? 'white' : '#0f172a',
                                          borderRadius: '10px',
                                          textDecoration: 'none',
                                          transition: 'background 0.2s'
                                        }}
                                        role="menuitem"
                                        onClick={() => setDesktopMenu(null)}
                                      >
                                        <div style={{
                                          fontSize: '13px',
                                          fontWeight: 500
                                        }}>
                                          {sub.name}
                                        </div>
                                        {sub.description && (
                                          <div style={{
                                            fontSize: '12px',
                                            marginTop: '4px',
                                            color: subActive ? '#e2e8f0' : '#64748b',
                                            lineHeight: 1.4
                                          }}>
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
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '7px 10px',
                          background: active ? '#0f172a' : 'transparent',
                          color: active ? 'white' : '#334155',
                          borderRadius: '10px',
                          textDecoration: 'none',
                          fontSize: '13px',
                          fontWeight: 500,
                          transition: 'all 0.2s ease'
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

            {/* Right side actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {/* Desktop Donate Button - visible only on desktop */}
              <Link
                href="/join/donate"
                className="desktop-donate"
                style={{
                  display: 'none',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  background: '#0284c7',
                  color: 'white',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: 600,
                  transition: 'all 0.2s ease'
                }}
              >
                <Heart className="icon" />
                <span>Support</span>
              </Link>

              {/* Mobile Menu Button - visible only on mobile */}
              <button
                type="button"
                onClick={toggleMobileMenu}
                aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileOpen}
                aria-controls="mobile-navigation"
                className="mobile-menu-button"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '44px',
                  height: '44px',
                  background: mobileOpen ? '#f1f5f9' : 'white',
                  border: mobileOpen ? '2px solid #0f172a' : '1px solid #e2e8f0',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  color: mobileOpen ? '#0f172a' : '#334155',
                  WebkitTapHighlightColor: 'transparent'
                }}
              >
                {mobileOpen ? (
                  <X className="icon icon-large" />
                ) : (
                  <Menu className="icon icon-large" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu - Optimized for thumb scrolling */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{
              position: 'fixed',
              top: scrolled ? '60px' : '72px',
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: '#f8fafc',
              zIndex: 45,
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
              paddingBottom: 'env(safe-area-inset-bottom, 20px)'
            }}
          >
            <div style={{
              padding: '16px',
              minHeight: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '20px',
                padding: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                flex: 1
              }}>
                <nav style={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  gap: '2px'
                }}>
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActivePath(pathname, item.href) || hasActiveSubmenu(pathname, item);
                    const hasSubmenu = Boolean(item.submenu);
                    const isOpen = mobileMenu === item.name;

                    return (
                      <div key={item.name} style={{ marginBottom: '2px' }}>
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          backgroundColor: active && !hasSubmenu ? '#f1f5f9' : 'transparent',
                          borderRadius: '14px',
                          border: active && !hasSubmenu ? '1px solid #e2e8f0' : 'none'
                        }}>
                          <Link
                            href={item.href}
                            style={{
                              display: 'flex',
                              flex: 1,
                              alignItems: 'center',
                              gap: '14px',
                              padding: '14px 16px',
                              color: active ? '#0f172a' : '#334155',
                              fontWeight: active ? 600 : 500,
                              fontSize: '16px',
                              textDecoration: 'none',
                              borderRadius: '14px',
                              minHeight: '52px',
                            }}
                            onClick={() => {
                              if (!hasSubmenu) {
                                setMobileOpen(false);
                              }
                            }}
                          >
                            <Icon className="icon icon-mobile" />
                            <span>{item.name}</span>
                            {active && !hasSubmenu && (
                              <span style={{
                                marginLeft: 'auto',
                                fontSize: '8px',
                                color: '#0284c7'
                              }}>●</span>
                            )}
                          </Link>

                          {hasSubmenu && (
                            <button
                              onClick={() => setMobileMenu(isOpen ? null : item.name)}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '52px',
                                height: '52px',
                                background: 'transparent',
                                border: 'none',
                                borderRadius: '14px',
                                cursor: 'pointer',
                                color: active ? '#0f172a' : '#64748b',
                              }}
                              aria-label={isOpen ? `Close ${item.name} menu` : `Open ${item.name} menu`}
                            >
                              <ChevronDown className={`icon icon-mobile ${isOpen ? 'rotated' : ''}`} />
                            </button>
                          )}
                        </div>

                        <AnimatePresence>
                          {hasSubmenu && isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              style={{ overflow: 'hidden' }}
                            >
                              <div style={{
                                marginLeft: '52px',
                                paddingLeft: '16px',
                                borderLeft: '2px solid #e2e8f0',
                                marginTop: '4px',
                                marginBottom: '4px',
                                paddingRight: '8px'
                              }}>
                                {item.submenu?.map((sub) => {
                                  const subActive = isActivePath(pathname, sub.href);

                                  return (
                                    <Link
                                      key={sub.href}
                                      href={sub.href}
                                      style={{
                                        display: 'block',
                                        padding: '12px 14px',
                                        marginBottom: '4px',
                                        backgroundColor: subActive ? '#f1f5f9' : 'transparent',
                                        color: subActive ? '#0f172a' : '#475569',
                                        borderRadius: '12px',
                                        textDecoration: 'none',
                                        fontSize: '15px',
                                        fontWeight: subActive ? 500 : 400,
                                        transition: 'all 0.2s ease',
                                        border: subActive ? '1px solid #e2e8f0' : 'none'
                                      }}
                                      onClick={() => setMobileOpen(false)}
                                    >
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span>{sub.name}</span>
                                        {subActive && (
                                          <span style={{
                                            fontSize: '8px',
                                            color: '#0284c7'
                                          }}>●</span>
                                        )}
                                      </div>
                                      {sub.description && (
                                        <div style={{
                                          fontSize: '13px',
                                          color: subActive ? '#475569' : '#64748b',
                                          marginTop: '4px',
                                          lineHeight: 1.4,
                                          paddingRight: '8px'
                                        }}>
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

              {/* Mobile Donate Button - Fixed at bottom for easy access */}
              <div style={{ 
                marginTop: '16px',
                position: 'sticky',
                bottom: '16px',
                zIndex: 46
              }}>
                <Link
                  href="/join/donate"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    padding: '16px',
                    backgroundColor: '#0284c7',
                    color: 'white',
                    borderRadius: '16px',
                    textDecoration: 'none',
                    fontSize: '17px',
                    fontWeight: 600,
                    minHeight: '56px',
                    boxShadow: '0 8px 20px -4px rgba(2, 132, 199, 0.3)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                  onClick={() => setMobileOpen(false)}
                >
                  <Heart className="icon icon-mobile" />
                  <span>Support Our Academy</span>
                </Link>
              </div>

              {/* Extra bottom padding for comfortable scrolling */}
              <div style={{ height: '20px' }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global styles */}
      <style jsx global>{`
        .icon {
          width: 16px;
          height: 16px;
          transition: transform 0.2s ease;
        }
        
        .icon-large {
          width: 20px;
          height: 20px;
        }
        
        .icon-mobile {
          width: 20px;
          height: 20px;
        }
        
        .rotated {
          transform: rotate(180deg);
        }

        /* Desktop styles */
        @media (min-width: 1024px) {
          .desktop-nav {
            display: flex !important;
            flex: 1;
            justify-content: center;
          }
          .desktop-donate {
            display: inline-flex !important;
          }
          .mobile-menu-button {
            display: none !important;
          }
          #mobile-navigation {
            display: none !important;
          }
        }

        /* Mobile styles */
        @media (max-width: 1023px) {
          .desktop-nav {
            display: none !important;
          }
          .desktop-donate {
            display: none !important;
          }
          .mobile-menu-button {
            display: flex !important;
          }
          
          /* Optimize scrolling on mobile */
          #mobile-navigation {
            display: block !important;
            scrollbar-width: thin;
            scrollbar-color: #cbd5e1 #f1f5f9;
          }
          
          #mobile-navigation::-webkit-scrollbar {
            width: 4px;
          }
          
          #mobile-navigation::-webkit-scrollbar-track {
            background: #f1f5f9;
          }
          
          #mobile-navigation::-webkit-scrollbar-thumb {
            background-color: #cbd5e1;
            border-radius: 20px;
          }
        }

        /* Small phones */
        @media (max-width: 380px) {
          header > div > div > a > div:last-child {
            display: none;
          }
          
          .icon-mobile {
            width: 18px;
            height: 18px;
          }
          
          #mobile-navigation a {
            padding: 12px 14px !important;
            min-height: 48px !important;
          }
        }

        /* Safe area support for modern phones */
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