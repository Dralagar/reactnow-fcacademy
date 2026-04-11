// app/layout.tsx

import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParabolicBackground from "@/components/ParabolicBackground";
import ScrollToTop from "@/components/ScrollToTop";
import CookieConsent from "@/components/CookieConsent";
import Analytics from "@/components/Analytics";
import LoadingBar from "@/components/LoadingBar";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://reactnowfc.org"),

  title: {
    default: "React Now FC Academy",
    template: "%s | React Now FC Academy",
  },

  description:
    "A grassroots football initiative empowering vulnerable youth through sport, mentorship, education, and digital literacy in Kenya. Join us in making an impact through football.",

  keywords: [
    "football academy",
    "youth empowerment",
    "Kenya grassroots football",
    "React Now FC",
    "digital literacy",
    "community sports",
    "youth development",
    "football mentorship",
    "African football academy",
    "social impact through sport",
  ],

  authors: [{ name: "React Now FC", url: "https://reactnowfc.org/about/team" }],
  
  creator: "React Now FC",
  
  publisher: "React Now FC Academy",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  icons: {
    icon: [{ url: "/images/reactnowlog.png", type: "image/png" }],
    apple: [{ url: "/images/reactnowlog.png", type: "image/png" }],
  },

  manifest: '/manifest.json',

  openGraph: {
    title: "React Now FC Academy",
    description: "Where Football Meets Innovation & Impact",
    url: "https://reactnowfc.org",
    siteName: "React Now FC Academy",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "React Now FC Academy - Football for Youth Empowerment",
        type: "image/jpeg",
      },
      {
        url: "/og-image-square.jpg",
        width: 800,
        height: 800,
        alt: "React Now FC Academy Logo",
        type: "image/jpeg",
      },
    ],
    locale: "en_US",
    type: "website",
    countryName: "Kenya",
    emails: ["info@reactnowfc.org"],
    phoneNumbers: ["+254700000000"],
  },

  twitter: {
    card: "summary_large_image",
    title: "React Now FC Academy",
    description: "Where Football Meets Innovation & Impact",
    images: ["/twitter-image.jpg"],
    creator: "@reactnowfc",
    site: "@reactnowfc",
  },

  appleWebApp: {
    capable: true,
    title: "React Now FC",
    statusBarStyle: "black-translucent",
    startupImage: [
      {
        url: "/apple-splash-2048-2732.jpg",
        media: "(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)",
      },
    ],
  },

  applicationName: "React Now FC",
  
  category: "sports",
  
  classification: "Non-profit organization",

  alternates: {
    canonical: "https://reactnowfc.org",
    languages: {
      'en-US': 'https://reactnowfc.org/en-us',
      'sw-KE': 'https://reactnowfc.org/sw',
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#059669" },
    { media: "(prefers-color-scheme: dark)", color: "#0b2322" },
  ],
  colorScheme: "light dark",
};

// Structured data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "NGO",
      "@id": "https://reactnowfc.org",
      "name": "React Now FC Academy",
      "description": "Empowering vulnerable youth through football, mentorship, education and digital literacy in Kenya and beyond.",
      "url": "https://reactnowfc.org",
      "logo": "https://reactnowfc.org/images/reactnowlog.png",
      "image": "https://reactnowfc.org/images/Hero1.jpeg",
      "foundingDate": "2020",
      "founders": [
        {
          "@type": "Person",
          "name": "React Now FC Team"
        }
      ],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Nairobi",
        "addressRegion": "Nairobi",
        "addressCountry": "KE"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+254-700-000-000",
        "contactType": "customer service",
        "email": "info@reactnowfc.org",
        "availableLanguage": ["English", "Swahili"]
      },
      "sameAs": [
        "https://facebook.com/reactnowfc",
        "https://twitter.com/reactnowfc",
        "https://instagram.com/reactnowfc",
        "https://youtube.com/reactnowfc",
        "https://linkedin.com/company/reactnowfc"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://reactnowfc.org/#website",
      "url": "https://reactnowfc.org",
      "name": "React Now FC Academy",
      "description": "A grassroots football initiative empowering vulnerable youth through sport.",
      "publisher": {
        "@id": "https://reactnowfc.org"
      },
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://reactnowfc.org/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://reactnowfc.org"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "About",
          "item": "https://reactnowfc.org/about"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Programs",
          "item": "https://reactnowfc.org/programs"
        }
      ]
    }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://reactnowfc.org" />
        
        {/* Preload brand mark (file lives in /public/images/) */}
        <link rel="preload" as="image" href="/images/reactnowlog.png" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`
          ${inter.variable} 
          ${inter.className} 
          antialiased 
          bg-[var(--background)] 
          text-[var(--foreground)]
          min-h-screen
          overflow-x-hidden
        `}
        style={{ scrollBehavior: 'smooth' }}
      >
        {/* Loading Progress Bar */}
        <LoadingBar />

        {/* Background Parallax Layer - Enhanced */}
        <div className="fixed inset-0 -z-20">
          <ParabolicBackground intensity={0.15} />
        </div>

        {/* Gradient Overlay for depth */}
        <div 
          className="fixed inset-0 -z-10 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.2) 100%)',
          }}
          aria-hidden="true"
        />

        {/* Skip to main content link - Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Skip to main content
        </a>

        {/* Navigation */}
        <Navbar />

        {/* Single landmark: pages render their own <main>. This wrapper is for skip-link + nav offset only. */}
        <div
          id="main-content"
          className="min-h-screen relative z-10 pt-[var(--navbar-offset,5rem)]"
        >
          {children}
        </div>

        {/* Footer */}
        <Footer />

        {/* Cookie Consent Banner */}
        <CookieConsent />

        {/* Scroll to Top Button */}
        <ScrollToTop />

        {/* Analytics - Only in production */}
        {process.env.NODE_ENV === 'production' && <Analytics />}

        {/* PWA: only register when sw.js is served (avoids dev 404 noise) */}
        {process.env.NODE_ENV === "production" ? (
          <script
            dangerouslySetInnerHTML={{
              __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').catch(function() {});
                });
              }
            `,
            }}
          />
        ) : null}
      </body>
    </html>
  );
}