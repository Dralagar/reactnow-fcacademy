"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Team", href: "/team" },
  { name: "Impact", href: "/impact" },
  { name: "Get Involved", href: "/join" },
  { name: "Sustainability", href: "/sustainability" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur shadow-lg py-3"
          : "bg-primary/95 backdrop-blur py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
              <span className="text-primary text-lg">⚽</span>
            </div>
            <div className="flex flex-col">
              <span className={`font-bold text-base leading-tight ${
                scrolled ? "text-gray-900" : "text-white"
              }`}>
                React Now FC
              </span>
              <span className={`text-xs ${
                scrolled ? "text-gray-500" : "text-white/80"
              }`}>
                Academy
              </span>
            </div>
          </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-4 sm:gap-6">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? scrolled
                      ? "text-primary"
                      : "text-white font-semibold"
                    : scrolled
                    ? "text-gray-700 hover:text-primary"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/join/donate"
              className={`ml-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                scrolled
                  ? "bg-primary text-white hover:bg-primary-dark"
                  : "bg-white text-primary hover:bg-gray-100"
              }`}
            >
              Support Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary bg-black/5 hover:bg-black/10"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke={scrolled ? "#111827" : "white"}
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute left-4 right-4 mt-3 bg-white rounded-xl shadow-xl border border-gray-100 py-4">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-4 py-3 text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? "text-primary bg-primary/5"
                    : "text-gray-700 hover:bg-gray-50 hover:text-primary"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="px-4 pt-3 mt-2 border-t border-gray-100">
              <Link
                href="/join/donate"
                className="block w-full px-4 py-3 bg-primary text-white text-center font-semibold rounded-lg hover:bg-primary-dark transition-all"
              >
                Support Us
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}