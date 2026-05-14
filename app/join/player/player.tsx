"use client";

import React, { useEffect, useState } from "react";
import { Metadata } from "next";
import SitePageHero from "@/components/SitePageHero";
import dynamic from "next/dynamic";

// Type definitions for better type safety
interface PlayerPageProps {
  searchParams?: {
    ref?: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
  };
}

// Dynamic imports for performance optimization
const BenefitsSection = dynamic(
  () => import("@/components/join/player/BenefitsSection").then(mod => mod.BenefitsSection),
  {
    loading: () => <div className="animate-pulse bg-gray-100 h-96" />,
    ssr: true
  }
);

const RegistrationForm = dynamic(
  () => import("@/components/join/player/RegistrationForm").then(mod => mod.RegistrationForm),
  {
    loading: () => <div className="animate-pulse bg-gray-100 h-[600px]" />,
    ssr: false // Form can be client-side only
  }
);

const TestimonialsSection = dynamic(
  () => import("@/components/join/player/TestimonialsSection").then(mod => mod.TestimonialsSection),
  { ssr: true }
);

const FAQSection = dynamic(
  () => import("@/components/join/player/FAQSection").then(mod => mod.FAQSection),
  { ssr: true }
);

export default function PlayerPage({ searchParams }: PlayerPageProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Track page view for analytics
  useEffect(() => {
    // Track page view with your analytics service
    const trackPageView = async () => {
      try {
        // Example: Send to Vercel Analytics, Google Analytics, etc.
        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("config", process.env.NEXT_PUBLIC_GA_ID!, {
            page_path: "/player",
            page_title: "Join as a Player",
            referral_source: searchParams?.utm_source || "direct",
            campaign: searchParams?.utm_campaign || "organic"
          });
        }
      } catch (error) {
        console.error("Analytics tracking error:", error);
      }
    };

    trackPageView();
    setIsVisible(true);
  }, []);

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Join as a Player - ReactNow Football Academy",
    "description": "Join ReactNow Football Academy's youth development program where football becomes the classroom for leadership, discipline, and personal growth.",
    "publisher": {
      "@type": "Organization",
      "name": "ReactNow Football Academy",
      "logo": {
        "@type": "ImageObject",
        "url": "/images/logo.png"
      }
    },
    "mainEntity": {
      "@type": "Offer",
      "name": "Youth Football Development Program",
      "description": "Professional football training combined with life skills development for youth aged 8-18",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-white via-gray-50 to-white">
      {/* SEO Optimization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Hero Section */}
      <SitePageHero
        title="Unlock Your Potential on and off the Pitch"
        subtitle="For ambitious youth ready to learn, listen, and grow—where football becomes the ultimate classroom for life skills, leadership, and excellence."
        imageSrc="/images/React3.jpeg"
        imageAlt="Young athletes training at ReactNow Football Academy - Professional youth development program"
      />

      {/* Benefits Section */}
      <BenefitsSection 
      />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Registration Form Section with ID for anchor link */}
      <div id="register">
        <RegistrationForm />
      </div>

      {/* FAQ Section */}
      <FAQSection 
      />

      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-6 right-6 md:hidden z-50">
        <a
          href="#register"
          className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          aria-label="Register Now"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.5-4.5M15 10l-4.5-4.5M15 10v11" />
          </svg>
        </a>
      </div>

      {/* Progress Indicator for Scroll Position */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 z-50"
        style={{ width: `${(window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100}%` }}
      />
    </main>
  );
}

// Optional: Add metadata export for better SEO (if using App Router)
export const generateMetadata = () => {
  return {
    title: "Join as a Player | ReactNow Football Academy | Youth Development Program",
    description: "Transform your passion for football into life skills. Join ReactNow's youth program where we build athletes, leaders, and future champions both on and off the pitch.",
    keywords: "football academy, youth soccer training, player development, football education, life skills through sports",
    openGraph: {
      title: "Join ReactNow Football Academy - Start Your Journey Today",
      description: "Limited spots available for our upcoming season. Professional training + character development = future ready athletes.",
      images: [
        {
          url: "/images/og-player-page.jpg",
          width: 1200,
          height: 630,
          alt: "ReactNow Football Academy Player Program"
        }
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Join as a Player - ReactNow Academy",
      description: "Where football meets life skills development",
      images: ["/images/twitter-player-card.jpg"]
    }
  };
};