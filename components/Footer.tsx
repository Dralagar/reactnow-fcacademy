"use client";

import Link from "next/link";
import Image from "next/image";
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
  Linkedin,
  Flame,
  Star,
  Trophy,
  Medal,
  CalendarDays
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { SITE_IMAGES } from "@/lib/site-images";

// Types
interface FooterLink {
  name: string;
  href: string;
  external?: boolean;
  rel?: string;
  ariaLabel?: string;
  badge?: string;
  badgeColor?: string;
  highlight?: boolean;
}

interface FooterSection {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  links: FooterLink[];
  color: string;
  gradient: string;
  accentColor: string;
}

interface SocialLink {
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  label: string;
  color: string;
  gradient: string;
}

// Footer sections data with enhanced colors
const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: "Discover",
    icon: Rocket,
    color: "primary",
    gradient: "from-primary to-primary-dark",
    accentColor: "text-primary",
    links: [
      { name: "Our Story", href: "/about/story" },
      { name: "Impact Report", href: "/impact", badge: "2024", badgeColor: "primary", highlight: true },
      { name: "Blog", href: "/blog" },
      { name: "Media Kit", href: "/media" },
    ]
  },
  {
    title: "Programs",
    icon: Trophy,
    color: "emerald",
    gradient: "from-emerald-500 to-teal-500",
    accentColor: "text-emerald-400",
    links: [
      { name: "Football Academy", href: "/programs/academy", highlight: true },
      { name: "Digital Literacy", href: "/programs/digital" },
      { name: "Climate Action", href: "/programs/climate" },
      { name: "Mentorship", href: "/programs/mentorship", badge: "Popular", badgeColor: "amber" },
    ]
  },
  {
    title: "Community",
    icon: Users,
    color: "amber",
    gradient: "from-amber-500 to-primary",
    accentColor: "text-amber-300",
    links: [
      { name: "Join as Player", href: "/join/player", badge: "Free", badgeColor: "green" },
      { name: "Volunteer", href: "/join/volunteer" },
      { name: "Partner With Us", href: "/join/partner" },
      { name: "Donate", href: "/join/donate", badge: "Support", badgeColor: "primary", highlight: true },
    ]
  },
  {
    title: "Resources",
    icon: Newspaper,
    color: "slate",
    gradient: "from-slate-600 to-primary-dark",
    accentColor: "text-slate-300",
    links: [
      { name: "FAQ", href: "/faq" },
      { name: "Leadership", href: "/about/team" },
      { name: "Privacy", href: "/privacy" },
      { name: "Terms", href: "/terms" },
    ]
  }
];

// Social links with gradients
const SOCIAL_LINKS: SocialLink[] = [
  { icon: Facebook, href: "https://facebook.com/reactnowfc", label: "Facebook", color: "blue", gradient: "from-[#1877f2] to-[#0e5fc7]" },
  { icon: Twitter, href: "https://twitter.com/reactnowfc", label: "X", color: "slate", gradient: "from-slate-600 to-slate-800" },
  { icon: Instagram, href: "https://instagram.com/reactnowfc", label: "Instagram", color: "pink", gradient: "from-[#e4405f] to-[#d81f3d]" },
  { icon: Youtube, href: "https://youtube.com/reactnowfc", label: "YouTube", color: "red", gradient: "from-[#ff0000] to-[#cc0000]" },
  { icon: Linkedin, href: "https://linkedin.com/company/reactnowfc", label: "LinkedIn", color: "blue", gradient: "from-[#0077b5] to-[#005582]" },
];

// Quick links
const QUICK_LINKS = [
  { name: "Privacy", href: "/privacy" },
  { name: "Terms", href: "/terms" },
  { name: "Cookies", href: "/cookies" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
];

// Animation variants
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
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const prefersReducedMotion = useReducedMotion();

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

  return (
    <>
      <footer className="relative bg-surface-dark text-white section" role="contentinfo" aria-label="Site footer">
        {/* Skip to main content link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md focus:shadow-lg"
        >
          Skip to main content
        </a>

        {/* Background gradient */}
        <div className="absolute inset-0 hero-gradient opacity-80" aria-hidden="true" />
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02]" 
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
          aria-hidden="true"
        />

        {/* Floating orbs */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" aria-hidden="true" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-primary-light/5 rounded-full blur-3xl animate-pulse [animation-delay:2s]" aria-hidden="true" />

        {/* Main content */}
        <div className="container-custom relative z-10">
          <div className="py-16 lg:py-20">
            
            {/* Top section: Logo only - removed email from here */}
            <motion.div
              variants={!prefersReducedMotion ? fadeInUpVariants : undefined}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-16 pb-8 border-b border-border/30"
            >
              {/* Logo with description */}
              <Link href="/" className="flex items-center gap-5 group focus-ring" aria-label="React Now FC Academy - Return to homepage">
                <div className="relative h-[4.5rem] w-[4.5rem] shrink-0 overflow-hidden rounded-2xl bg-white shadow-md shadow-black/20 ring-1 ring-white/20 transition-transform duration-300 group-hover:scale-[1.02]">
                  <Image
                    src={SITE_IMAGES.logo}
                    alt=""
                    fill
                    sizes="72px"
                    className="object-contain p-2.5"
                  />
                </div>
                <div className="min-w-0 border-l border-white/15 pl-5">
                  <h2 className="text-2xl font-bold tracking-tight text-white">
                    React Now FC
                  </h2>
                  <p className="mt-1 text-sm font-medium text-primary-400">
                    Academy
                  </p>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-gray-400">
                    Grassroots football, education, and mentorship — Nairobi & beyond.
                  </p>
                </div>
              </Link>
            </motion.div>

            {/* Main navigation sections - Cards with centered icons above headings */}
            <motion.div
              variants={!prefersReducedMotion ? staggerVariants : undefined}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-wrap gap-8 mb-16"
            >
              {FOOTER_SECTIONS.map((section, idx) => {
                const Icon = section.icon;
                
                return (
                  <motion.div
                    key={idx}
                    variants={!prefersReducedMotion ? fadeInUpVariants : undefined}
                    className="flex-1 min-w-[260px]"
                  >
                    <div className="card h-full border-border/50 bg-surface/20 backdrop-blur-sm hover:border-primary/30 hover:shadow-xl group transition-all duration-300 p-6">
                      {/* Icon centered above heading */}
                      <div className="flex flex-col items-center mb-5">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${section.gradient} flex items-center justify-center shadow-xl mb-3 group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-8 h-8 text-white" aria-hidden="true" />
                        </div>
                        <h3 className={`font-bold text-lg ${section.accentColor} text-center`}>{section.title}</h3>
                        {/* Decorative underline */}
                        <div className={`w-12 h-1 bg-gradient-to-r ${section.gradient} rounded-full mt-2 opacity-60`} aria-hidden="true" />
                      </div>

                      {/* Links - Clean spacing */}
                      <div className="flex flex-col space-y-4 mt-6" aria-label={`${section.title} links`}>
                        {section.links.map((link, linkIdx) => (
                          <div key={linkIdx} className="flex items-center justify-between group/link">
                            <Link
                              href={link.href}
                              className={`flex-1 text-sm transition-all duration-200 hover:translate-x-1 focus-ring rounded px-1 py-1 ${
                                link.highlight 
                                  ? 'text-white font-medium' 
                                  : 'text-gray-400 hover:text-white'
                              }`}
                              aria-label={link.ariaLabel || link.name}
                              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            >
                              <span className="flex items-center gap-2">
                                <ChevronRight className={`w-3.5 h-3.5 ${section.accentColor} opacity-0 group-hover/link:opacity-100 transition-all group-hover/link:translate-x-1`} aria-hidden="true" />
                                {link.name}
                                {link.highlight && (
                                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 ml-1" aria-hidden="true" />
                                )}
                              </span>
                            </Link>
                            {link.badge && (
                              <span className={`
                                text-[10px] px-2.5 py-1 rounded-full font-medium whitespace-nowrap ml-2
                                ${link.badgeColor === 'primary' ? 'bg-primary/20 text-primary border border-primary/30' : ''}
                                ${link.badgeColor === 'amber' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : ''}
                                ${link.badgeColor === 'green' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : ''}
                                ${link.badgeColor === 'slate' ? 'bg-slate-500/20 text-slate-300 border border-slate-500/30' : ''}
                              `}>
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

            {/* Middle section: Contact + Social + Impact Message - Far end placement */}
            <motion.div
              variants={!prefersReducedMotion ? scaleInVariants : undefined}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="surface-panel bg-surface/20 backdrop-blur-sm border-border/50 p-8 mb-8"
            >
              <div className="flex flex-wrap items-center justify-between gap-8">
                {/* Contact info */}
                <div className="flex flex-wrap items-center gap-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
                      <MapPinned className="w-5 h-5 text-white" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Address</p>
                      <span className="text-sm text-gray-300">Nairobi, Kenya</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Phone className="w-5 h-5 text-white" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <a 
                        href="tel:+254700000000" 
                        className="text-sm text-gray-300 hover:text-white transition-colors focus-ring rounded"
                        aria-label="Call us at +254 700 000 000"
                      >
                        +254 700 000 000
                      </a>
                    </div>
                  </div>
                </div>

                {/* Social links */}
                <nav className="flex items-center gap-3" aria-label="Social media links">
                  <span className="text-sm text-gray-500 mr-2">Connect:</span>
                  {SOCIAL_LINKS.map((social, idx) => (
                    <a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="relative group focus-ring rounded-xl"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${social.gradient} rounded-xl blur opacity-0 group-hover:opacity-70 transition-opacity`} aria-hidden="true" />
                      <div className="relative w-10 h-10 bg-surface rounded-xl flex items-center justify-center border border-border/50 group-hover:border-transparent transition-all">
                        <social.icon className="w-5 h-5 text-white" aria-hidden="true" />
                      </div>
                    </a>
                  ))}
                </nav>
              </div>

              {/* Far end placement - Making impact message and email in the whitespace */}
              <div className="flex flex-wrap items-center justify-end gap-6 mt-6 pt-4 border-t border-border/30">
                {/* Making impact since 2020 - with icon */}
                <div className="flex items-center gap-3 px-5 py-2.5 bg-primary/10 rounded-xl border border-primary/20">
                  <CalendarDays className="w-5 h-5 text-primary" aria-hidden="true" />
                  <div>
                    <span className="text-sm font-medium text-white">Making impact</span>
                    <span className="text-sm text-primary ml-2 font-bold">since 2020</span>
                  </div>
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse ml-1" aria-hidden="true" />
                </div>

                {/* Email - prominently displayed at far end */}
                <div className="flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-primary/20 to-primary/5 rounded-xl border border-primary/30 hover:border-primary/50 transition-all group">
                  <Mail className="w-5 h-5 text-primary" aria-hidden="true" />
                  <a 
                    href="mailto:info@reactnowfc.org" 
                    className="text-base text-white hover:text-primary transition-colors focus-ring rounded px-1 font-medium"
                    aria-label="Email us at info@reactnowfc.org"
                  >
                    info@reactnowfc.org
                  </a>
                  <ExternalLink className="w-4 h-4 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                </div>
              </div>
            </motion.div>

            {/* Bottom bar - Legal links and copyright */}
            <motion.div
              variants={!prefersReducedMotion ? fadeInUpVariants : undefined}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
              className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-border/50"
            >
              {/* Copyright */}
              <p className="text-xs text-gray-500 order-2 md:order-1">
                <span aria-label="Copyright">©</span> {new Date().getFullYear()} React Now FC Academy. 
                <span className="hidden md:inline"> All rights reserved.</span>
              </p>

              {/* Quick links */}
              <nav className="flex flex-wrap items-center justify-center gap-6 order-1 md:order-2" aria-label="Legal links">
                {QUICK_LINKS.map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.href}
                    className="text-xs text-gray-500 hover:text-gray-300 transition-colors focus-ring rounded px-1 py-1"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              {/* Made with love */}
              <p className="text-xs text-gray-500 flex items-center gap-2 order-3">
                <span>Made with</span>
                <Heart className="w-3.5 h-3.5 text-danger fill-danger animate-pulse" aria-hidden="true" />
                <span>in Kenya</span>
                <span className="relative ml-1 inline-block h-5 w-5 shrink-0 opacity-90" aria-hidden="true">
                  <Image
                    src={SITE_IMAGES.logo}
                    alt=""
                    fill
                    className="object-contain"
                    sizes="20px"
                  />
                </span>
              </p>
            </motion.div>

            {/* Impact stats */}
            <motion.div
              variants={!prefersReducedMotion ? fadeInUpVariants : undefined}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.3 }}
              className="mt-10 pt-6 flex flex-wrap items-center justify-center gap-8"
              aria-label="Impact statistics"
            >
              <div className="flex items-center gap-3 px-4 py-2 bg-primary/10 rounded-xl border border-primary/20">
                <Users className="w-5 h-5 text-primary" aria-hidden="true" />
                <span className="text-sm text-gray-300">1,000+ <span className="text-gray-500">Youth</span></span>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                <GraduationCap className="w-5 h-5 text-emerald-400" aria-hidden="true" />
                <span className="text-sm text-gray-300">250+ <span className="text-gray-500">Graduates</span></span>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 bg-orange-500/10 rounded-xl border border-orange-500/20">
                <Globe className="w-5 h-5 text-orange-400" aria-hidden="true" />
                <span className="text-sm text-gray-300">15 <span className="text-gray-500">Communities</span></span>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 bg-purple-500/10 rounded-xl border border-purple-500/20">
                <Heart className="w-5 h-5 text-purple-400" aria-hidden="true" />
                <span className="text-sm text-gray-300">100+ <span className="text-gray-500">Volunteers</span></span>
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