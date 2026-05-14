"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface TransparentNavWrapperProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Wrapper component to handle proper spacing when navbar is transparent
 * Ensures content doesn't get hidden behind the transparent navbar
 */
export default function TransparentNavWrapper({
  children,
  className = "",
}: TransparentNavWrapperProps) {
  const [navbarHeight, setNavbarHeight] = useState(80);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Detect navbar height and scroll state
    const updateNavbarInfo = () => {
      const navbar = document.querySelector('header');
      if (navbar) {
        const rect = navbar.getBoundingClientRect();
        setNavbarHeight(rect.height);
      }
      setIsScrolled(window.scrollY > 100);
    };

    // Initial update
    updateNavbarInfo();

    // Update on scroll and resize
    const handleScroll = () => {
      updateNavbarInfo();
      setIsScrolled(window.scrollY > 100);
    };

    const handleResize = () => {
      updateNavbarInfo();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Don't add padding on homepage where navbar has special behavior
  const isHomepage = pathname === '/';
  const shouldAddPadding = !isHomepage;

  return (
    <div 
      className={className}
      style={{
        paddingTop: shouldAddPadding ? `${navbarHeight}px` : '0',
        transition: 'padding-top 0.3s ease',
      }}
    >
      {children}
    </div>
  );
}
