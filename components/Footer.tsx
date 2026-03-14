"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  MapPin,
  Phone,
  Heart,
  ArrowUp,
  Sparkles,
  ChevronRight,
  Globe,
  GraduationCap,
  HandHeart,
  Newspaper,
  Rocket,
  Zap,
  Award,
  Target,
  Users,
  BookOpen,
  Calendar,
  MessageCircle,
  ExternalLink,
  CheckCircle,
  Clock,
  MapPinned,
  Send,
  Github,
  Linkedin
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";

// Types
interface FooterLink {
  name: string;
  href: string;
  external?: boolean;
  rel?: string;
  ariaLabel?: string;
  badge?: string;
  badgeColor?: string;
}

interface FooterSection {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  links: FooterLink[];
  color: string;
}

interface SocialLink {
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  label: string;
  color: string;
}

// Footer sections data - exactly as requested
const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: "Discover",
    icon: Rocket,
    color: "primary",
    links: [
      { name: "Our Story", href: "/about/story" },
      { name: "Impact Report", href: "/impact", badge: "2024", badgeColor: "primary" },
      { name: "Blog", href: "/blog" },
      { name: "Media Kit", href: "/media" },
    ]
  },
  {
    title: "Programs",
    icon: GraduationCap,
    color: "emerald",
    links: [
      { name: "Football Academy", href: "/programs/academy" },
      { name: "Digital Literacy", href: "/programs/digital" },
      { name: "Climate Action", href: "/programs/climate" },
      { name: "Mentorship", href: "/programs/mentorship", badge: "Popular", badgeColor: "amber" },
    ]
  },
  {
    title: "Community",
    icon: HandHeart,
    color: "orange",
    links: [
      { name: "Join as Player", href: "/join/player" },
      { name: "Volunteer", href: "/join/volunteer" },
      { name: "Partner With Us", href: "/join/partner" },
      { name: "Donate", href: "/join/donate", badge: "Support", badgeColor: "primary" },
    ]
  },
  {
    title: "Resources",
    icon: Newspaper,
    color: "purple",
    links: [
      { name: "FAQ", href: "/faq" },
      { name: "Team", href: "/about/team" },
      { name: "Privacy", href: "/privacy" },
      { name: "Terms", href: "/terms" },
    ]
  }
];

// Social links
const SOCIAL_LINKS: SocialLink[] = [
  { icon: Facebook, href: "https://facebook.com/reactnowfc", label: "Facebook", color: "blue" },
  { icon: Twitter, href: "https://twitter.com/reactnowfc", label: "X", color: "slate" },
  { icon: Instagram, href: "https://instagram.com/reactnowfc", label: "Instagram", color: "pink" },
  { icon: Youtube, href: "https://youtube.com/reactnowfc", label: "YouTube", color: "red" },
  { icon: Github, href: "https://github.com/reactnowfc", label: "GitHub", color: "slate" },
  { icon: Linkedin, href: "https://linkedin.com/company/reactnowfc", label: "LinkedIn", color: "blue" },
];

// Quick links
const QUICK_LINKS = [
  { name: "Privacy", href: "/privacy" },
  { name: "Terms", href: "/terms" },
  { name: "Cookies", href: "/cookies" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
  { name: "Sitemap", href: "/sitemap" },
];

// Animation variants - respecting reduced motion
const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5, 
      ease: [0.22, 1, 0.36, 1] 
    }
  }
};

const staggerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export default function Footer() {
  const [mounted, setMounted] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleScroll = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setShowScrollTop(window.scrollY > 400);
      }, 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ 
      top: 0, 
      behavior: prefersReducedMotion ? 'auto' : 'smooth' 
    });
  }, [prefersReducedMotion]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  if (!mounted) return null;

  // Color mapping matching globals.css
  const getColorClasses = (color: string) => {
    const colors = {
      primary: "from-primary to-primary-dark bg-primary text-primary border-primary/20 hover:border-primary/40",
      emerald: "from-emerald-500 to-emerald-600 bg-emerald-500 text-emerald-500 border-emerald-500/20 hover:border-emerald-500/40",
      orange: "from-orange-500 to-orange-600 bg-orange-500 text-orange-500 border-orange-500/20 hover:border-orange-500/40",
      purple: "from-purple-500 to-purple-600 bg-purple-500 text-purple-500 border-purple-500/20 hover:border-purple-500/40",
      pink: "from-pink-500 to-pink-600 bg-pink-500 text-pink-500 border-pink-500/20 hover:border-pink-500/40",
      red: "from-red-500 to-red-600 bg-red-500 text-red-500 border-red-500/20 hover:border-red-500/40",
      slate: "from-slate-600 to-slate-700 bg-slate-500 text-slate-500 border-slate-500/20 hover:border-slate-500/40",
      blue: "from-blue-500 to-blue-600 bg-blue-500 text-blue-500 border-blue-500/20 hover:border-blue-500/40",
      amber: "from-amber-500 to-amber-600 bg-amber-500 text-amber-500 border-amber-500/20 hover:border-amber-500/40",
    };
    return colors[color as keyof typeof colors] || colors.primary;
  };

  return (
    <>
      <footer className="relative bg-surface-dark text-white section" role="contentinfo" aria-label="Site footer">
        {/* Skip to main content link - accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md focus:shadow-lg"
        >
          Skip to main content
        </a>

        {/* Background gradient - matching hero-gradient from globals.css */}
        <div className="absolute inset-0 hero-gradient opacity-80" aria-hidden="true" />
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02]" 
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
          aria-hidden="true"
        />

        {/* Floating orbs - decorative */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" aria-hidden="true" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-primary-light/5 rounded-full blur-3xl animate-pulse [animation-delay:2s]" aria-hidden="true" />

        {/* Main content */}
        <div className="container-custom relative z-10">
          <div className="py-16 lg:py-20">
            
            {/* Top section: Logo + Email */}
            <motion.div
              variants={!prefersReducedMotion ? fadeInUpVariants : undefined}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-16"
            >
              {/* Logo with description */}
              <Link href="/" className="flex items-center gap-4 group focus-ring" aria-label="React Now FC Academy - Return to homepage">
                <div className="w-16 h-16 bg-brand-gradient rounded-2xl flex items-center justify-center shadow-xl shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl" aria-hidden="true">⚽</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">React Now FC</h2>
                  <p className="text-sm text-gray-400 mt-1">Academy • Empowering youth through sport</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse" aria-hidden="true" />
                    <span className="text-xs text-gray-500">Making impact since 2020</span>
                  </div>
                </div>
              </Link>

              {/* Email contact - prominently displayed */}
              <div className="flex items-center gap-3 bg-surface/20 backdrop-blur-sm px-5 py-3 rounded-xl border border-border/50">
                <Mail className="w-5 h-5 text-primary" aria-hidden="true" />
                <a 
                  href="mailto:info@reactnowfc.org" 
                  className="text-base text-white hover:text-primary transition-colors focus-ring rounded px-1"
                  aria-label="Email us at info@reactnowfc.org"
                >
                  info@reactnowfc.org
                </a>
              </div>
            </motion.div>

            {/* Main navigation sections - FLEX layout with cards, NO BULLETS */}
            <motion.div
              variants={!prefersReducedMotion ? staggerVariants : undefined}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-wrap gap-6 mb-16"
            >
              {FOOTER_SECTIONS.map((section, idx) => {
                const Icon = section.icon;
                const colorClasses = getColorClasses(section.color);
                
                return (
                  <motion.div
                    key={idx}
                    variants={!prefersReducedMotion ? fadeInUpVariants : undefined}
                    className="flex-1 min-w-[240px]"
                  >
                    <div className="card h-full border-border/50 bg-surface/20 backdrop-blur-sm hover:border-primary/30 hover:shadow-xl group">
                      {/* Section header with icon */}
                      <div className="flex items-center gap-3 mb-5">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colorClasses.split(' ')[0]} ${colorClasses.split(' ')[1]} flex items-center justify-center shadow-lg`}>
                          <Icon className="w-5 h-5 text-white" aria-hidden="true" />
                        </div>
                        <h3 className="font-semibold text-white">{section.title}</h3>
                      </div>

                      {/* Links - NO BULLETS, clean flex column */}
                      <div className="flex flex-col space-y-3" aria-label={`${section.title} links`}>
                        {section.links.map((link, linkIdx) => (
                          <div key={linkIdx} className="flex items-center justify-between">
                            <Link
                              href={link.href}
                              className="group/link text-gray-400 hover:text-white transition-colors focus-ring rounded px-1 py-1 flex-1"
                              aria-label={link.ariaLabel || link.name}
                              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            >
                              <span className="text-sm flex items-center gap-2">
                                <ChevronRight className="w-3 h-3 text-primary opacity-0 group-hover/link:opacity-100 transition-all group-hover/link:translate-x-1" aria-hidden="true" />
                                {link.name}
                              </span>
                            </Link>
                            {link.badge && (
                              <span className={`text-[10px] px-2 py-0.5 rounded-full bg-${link.badgeColor}-500/20 text-${link.badgeColor}-400 font-medium border border-${link.badgeColor}-500/30 ml-2 whitespace-nowrap`}>
                                {link.badge}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Middle section: Contact + Social - Surface panel */}
            <motion.div
              variants={!prefersReducedMotion ? scaleInVariants : undefined}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="surface-panel bg-surface/20 backdrop-blur-sm border-border/50 p-6 md:p-8 mb-8"
            >
              <div className="flex flex-wrap items-center justify-between gap-6">
                {/* Contact info */}
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-surface rounded-lg flex items-center justify-center border border-border/50">
                      <MapPinned className="w-4 h-4 text-orange-400" aria-hidden="true" />
                    </div>
                    <span className="text-sm text-gray-300">Nairobi, Kenya</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-surface rounded-lg flex items-center justify-center border border-border/50">
                      <Phone className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                    </div>
                    <a 
                      href="tel:+254700000000" 
                      className="text-sm text-gray-300 hover:text-white transition-colors focus-ring rounded px-1"
                      aria-label="Call us at +254 700 000 000"
                    >
                      +254 700 000 000
                    </a>
                  </div>
                </div>

                {/* Social links */}
                <nav className="flex items-center gap-2" aria-label="Social media links">
                  <span className="text-xs text-gray-500 mr-2">Follow us:</span>
                  {SOCIAL_LINKS.map((social, idx) => {
                    const colorClasses = getColorClasses(social.color);
                    return (
                      <a
                        key={idx}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="relative group focus-ring rounded-lg"
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses.split(' ')[0]} ${colorClasses.split(' ')[1]} rounded-lg blur opacity-0 group-hover:opacity-70 transition-opacity`} aria-hidden="true" />
                        <div className="relative w-9 h-9 bg-surface rounded-lg flex items-center justify-center border border-border/50 group-hover:border-transparent transition-all">
                          <social.icon className="w-4 h-4 text-white" aria-hidden="true" />
                        </div>
                      </a>
                    );
                  })}
                </nav>
              </div>
            </motion.div>

            {/* Bottom bar - Legal links and copyright */}
            <motion.div
              variants={!prefersReducedMotion ? fadeInUpVariants : undefined}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
              className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-border/50"
            >
              {/* Copyright */}
              <p className="text-xs text-gray-500 order-2 md:order-1">
                <span aria-label="Copyright">©</span> {new Date().getFullYear()} React Now FC Academy. 
                <span className="hidden md:inline"> All rights reserved.</span>
              </p>

              {/* Quick links */}
              <nav className="flex flex-wrap items-center justify-center gap-4 order-1 md:order-2" aria-label="Legal links">
                {QUICK_LINKS.map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.href}
                    className="text-xs text-gray-500 hover:text-gray-300 transition-colors focus-ring rounded px-1"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              {/* Made with love */}
              <p className="text-xs text-gray-500 flex items-center gap-1.5 order-3">
                <span>Made with</span>
                <Heart className="w-3 h-3 text-danger fill-danger" aria-hidden="true" />
                <span>in Kenya</span>
                <Sparkles className="w-3 h-3 text-primary ml-1" aria-hidden="true" />
              </p>
            </motion.div>

            {/* Impact stats */}
            <motion.div
              variants={!prefersReducedMotion ? fadeInUpVariants : undefined}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.3 }}
              className="mt-8 pt-6 flex flex-wrap items-center justify-center gap-8 text-xs"
              aria-label="Impact statistics"
            >
              <div className="flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                <span className="text-gray-400">1,000+ Youth Impacted</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                <span className="text-gray-400">250+ Graduates</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-orange-400" aria-hidden="true" />
                <span className="text-gray-400">15 Communities</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-3.5 h-3.5 text-purple-400" aria-hidden="true" />
                <span className="text-gray-400">100+ Volunteers</span>
              </div>
            </motion.div>
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
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
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark rounded-xl blur opacity-70 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
          <div className="relative w-12 h-12 bg-surface-dark rounded-xl flex items-center justify-center border border-primary/30">
            <ArrowUp className="w-5 h-5 text-white" aria-hidden="true" />
          </div>
        </motion.button>
      )}
    </>
  );
}