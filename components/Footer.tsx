"use client";

import Link from "next/link";
import { motion } from "framer-motion";
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
  Sparkles
} from "lucide-react";
import { useState, useEffect } from "react";

const footerSections = [
  {
    title: "About",
    links: [
      { name: "Our Story", href: "/about/story" },
      { name: "Mission & Vision", href: "/about/mission" },
      { name: "Core Pillars", href: "/about/pillars" },
      { name: "Team", href: "/about/team" },
    ]
  },
  {
    title: "Get Involved",
    links: [
      { name: "Join as Player", href: "/join/player" },
      { name: "Volunteer", href: "/join/volunteer" },
      { name: "Partner With Us", href: "/join/partner" },
      { name: "Donate", href: "/join/donate" },
    ]
  },
  {
    title: "Programs",
    links: [
      { name: "Football Academy", href: "/programs/academy" },
      { name: "Digital Literacy", href: "/programs/digital" },
      { name: "Climate Action", href: "/programs/climate" },
      { name: "Mentorship", href: "/programs/mentorship" },
    ]
  },
  {
    title: "Resources",
    links: [
      { name: "Impact Report", href: "/impact" },
      { name: "Blog", href: "/blog" },
      { name: "Media Kit", href: "/media" },
      { name: "FAQ", href: "/faq" },
    ]
  }
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook", color: "hover:bg-[#1877f2]" },
  { icon: Twitter, href: "#", label: "X", color: "hover:bg-black" },
  { icon: Instagram, href: "#", label: "Instagram", color: "hover:bg-[#e4405f]" },
  { icon: Youtube, href: "#", label: "YouTube", color: "hover:bg-[#ff0000]" },
];

export default function Footer() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gray-900 text-white overflow-hidden">

      {/* subtle pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full">
          <defs>
            <pattern id="pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pattern)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-12 py-20">

        {/* MAIN GRID */}
        <div className="flex flex-wrap gap-16 justify-between mb-20">

          {/* BRAND */}
          <div className="flex flex-col gap-8 max-w-[420px]">

            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                ⚽
              </div>

              <div>
                <span className="font-bold text-xl block">React Now FC</span>
                <span className="text-sm text-primary">Academy</span>
              </div>
            </Link>

            <p className="text-gray-400 leading-relaxed">
              Empowering vulnerable youth through football, mentorship,
              education and digital literacy in Kenya and beyond.
            </p>

            {/* SOCIAL */}
            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  className={`w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center transition-all ${social.color}`}
                  whileHover={{ y: -3 }}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* CONTACT */}
          <div className="flex flex-col gap-8 min-w-[260px]">

            <h3 className="font-semibold text-lg">Contact</h3>

            <div className="flex flex-col gap-6">

              <div className="flex items-start gap-4">
                <MapPin className="text-primary mt-1" size={18} />
                <div>
                  <p className="text-white font-medium">Address</p>
                  <p className="text-gray-400">Nairobi, Kenya</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="text-primary mt-1" size={18} />
                <div>
                  <p className="text-white font-medium">Phone</p>
                  <p className="text-gray-400">+254 700 000 000</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="text-primary mt-1" size={18} />
                <div>
                  <p className="text-white font-medium">Email</p>
                  <p className="text-gray-400">info@reactnowfc.org</p>
                </div>
              </div>

            </div>
          </div>

          {/* NAVIGATION */}
          <div className="flex flex-wrap gap-16">

            {footerSections.map((section, i) => (
              <div key={i} className="flex flex-col gap-6 min-w-[150px]">

                <h3 className="font-semibold text-lg">
                  {section.title}
                </h3>

                <ul className="flex flex-col gap-3">
                  {section.links.map((link, idx) => (
                    <li key={idx}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>

              </div>
            ))}

          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-gray-800 pt-10">

          <div className="flex flex-wrap items-center justify-between gap-6">

            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} React Now FC Academy. All rights reserved.
            </p>

            <div className="flex items-center gap-8">

              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm">
                Privacy
              </Link>

              <Link href="/terms" className="text-gray-400 hover:text-white text-sm">
                Terms
              </Link>

              <Link href="/cookies" className="text-gray-400 hover:text-white text-sm">
                Cookies
              </Link>

              <button
                onClick={scrollToTop}
                className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center"
              >
                <ArrowUp size={18} />
              </button>

            </div>

          </div>

          <div className="mt-6 text-center text-sm text-gray-500 flex items-center justify-center gap-2">
            Made with
            <Heart size={14} className="text-red-500" />
            for the community
            <Sparkles size={14} className="text-primary" />
          </div>

        </div>

      </div>

    </footer>
  );
}
