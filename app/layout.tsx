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
import TransparentNavWrapper from "@/components/TransparentNavWrapper";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://reactnowfc.org"),

  title: {
    default:
      "Under 6 & Under 12 Football Academy Nairobi | Weekend & After School Programs | React Now FC",
    template: "%s | React Now FC Academy Nairobi",
  },

  description:
    "React Now FC Academy offers comprehensive Under 6 and Under 12 football training in Nairobi (Kayole, Embakasi, Donholm, Nyayo Estate). Join our accessible weekend football programs, after school programs, back-to-school programs, and holiday tournaments focused on youth development, leadership, and digital skills. All abilities welcome.",

  keywords: [
    "under 6 football Nairobi",
    "under 12 football Nairobi",
    "kids football training Nairobi",
    "football academy Kayole",
    "football training Embakasi",
    "football academy Donholm",
    "kids football Nyayo Estate",
    "weekend football programs Nairobi",
    "after school football program Nairobi",
    "holiday football tournaments Nairobi",
    "back to school football program Kenya",
    "grassroots football Kenya",
    "youth empowerment through sports Nairobi",
    "accessible football academy",
    "inclusive sports programs Nairobi",
    "children with disabilities football",
    "special needs football training",
    "React Now FC Academy",
  ],

  authors: [{ name: "React Now FC", url: "https://reactnowfc.org/about/team" }],
  creator: "React Now FC",
  publisher: "React Now FC Academy",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    title: "Under 6 & Under 12 Football Programs Nairobi | React Now FC",
    description:
      "Join our accessible kids football training in Nairobi. Weekend, after school and holiday football programs in Kayole, Embakasi and Donholm. All abilities welcome.",
    url: "https://reactnowfc.org",
    siteName: "React Now FC Academy",
    locale: "en_KE",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kids Football Training Nairobi - Under 6 & Under 12 - All Abilities Welcome",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Kids Football Academy Nairobi | All Abilities Welcome",
    description:
      "Under 6 & Under 12 weekend and after school football programs. Inclusive, accessible training for all children.",
    images: ["/twitter-image.jpg"],
  },

  alternates: {
    canonical: "https://reactnowfc.org",
  },

  other: {
    "theme-color": "#10b981",
    "msapplication-TileColor": "#10b981",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "React Now FC Academy",
  },

  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

// Enhanced structured data with accessibility and comprehensive schema markup
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SportsOrganization",
      "@id": "https://reactnowfc.org",
      name: "React Now FC Academy",
      description:
        "Accessible Under 6 and Under 12 football academy in Nairobi offering inclusive weekend, after school, and holiday programs for youth development. All abilities welcome.",
      url: "https://reactnowfc.org",
      logo: "https://reactnowfc.org/images/reactnowlog.png",
      sameAs: [
        "https://www.tiktok.com/@react_now.fc.academy",
        "https://x.com/reactnowfc",
        "https://www.instagram.com/reactnowfc_academy",
        "https://linkedin.com/company/reactnowfc",
        "https://facebook.com/reactnowfc"
      ],

      address: {
        "@type": "PostalAddress",
        streetAddress: "Bee Centre Bar — Nasra Gardens Estate",
        addressLocality: "Embakasi Central",
        addressRegion: "Nairobi",
        addressCountry: "KE",
      },

      areaServed: [
        "Nairobi",
        "Kayole",
        "Embakasi",
        "Donholm",
        "Nyayo Estate",
      ],

      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+254-706-255-611",
        contactType: "customer service",
        email: "info@reactnowfca.org",
        availableLanguage: ["English", "Swahili"],
        areaServed: "Nairobi, Kenya",
      },

      accessibility: {
        "@type": "SpecialCommitment",
        name: "Accessibility Commitment",
        description: "We provide accessible football training for children of all abilities, including those with disabilities and special needs.",
        accessibilityFeature: [
          "Wheelchair accessible facilities",
          "Inclusive coaching methods",
          "Adaptive equipment available",
          "Trained staff for special needs"
        ]
      },

      award: ["Grassroots Football Excellence Award 2024"],
      slogan: "Where Football Meets Innovation & Impact"
    },

    {
      "@type": "SportsActivityLocation",
      name: "Youth Football Programs Nairobi",
      description: "Inclusive and accessible football training programs for children aged 6-12 in Nairobi",
      accessibility: "Full wheelchair accessibility and inclusive coaching",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Football Programs",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Course",
              name: "Under 6 Football Training Nairobi",
              description: "Accessible football training for children under 6 years old",
              accessibilityFeature: "Age-appropriate inclusive coaching"
            },
            availability: "https://schema.org/InStock"
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Course",
              name: "Under 12 Football Training Nairobi",
              description: "Accessible football training for children under 12 years old",
              accessibilityFeature: "Skill-based inclusive training"
            },
            availability: "https://schema.org/InStock"
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Course",
              name: "Weekend Football Programs Nairobi",
              description: "Accessible weekend football programs for all abilities",
              accessibilityFeature: "Weekend accessibility support"
            },
            availability: "https://schema.org/InStock"
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Course",
              name: "After School Football Program Nairobi",
              description: "Accessible after-school football programs with educational support",
              accessibilityFeature: "After-school accessibility arrangements"
            },
            availability: "https://schema.org/InStock"
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Event",
              name: "Holiday Football Tournaments Nairobi",
              description: "Inclusive holiday football tournaments for all skill levels",
              accessibilityFeature: "Tournament accessibility accommodations"
            },
            availability: "https://schema.org/InStock"
          },
        ],
      },
    },

    {
      "@type": "EducationalOrganization",
      name: "React Now FC Academy",
      description: "Youth development through football, education, and digital literacy programs",
      educationalLevel: "Elementary School",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Educational Programs",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Course",
              name: "Digital Literacy Workshops",
              description: "Weekly coding and digital skills workshops for youth"
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Course",
              name: "Life Skills Development",
              description: "Discipline, leadership, teamwork, and emotional intelligence training"
            }
          }
        ]
      }
    },

    {
      "@type": "LocalBusiness",
      name: "React Now FC Academy",
      description: "Accessible football academy and youth development center",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Bee Centre Bar — Nasra Gardens Estate",
        addressLocality: "Embakasi Central",
        addressRegion: "Nairobi",
        addressCountry: "KE",
      },
      telephone: "+254-706-255-611",
      email: "info@reactnowfca.org",
      openingHours: "Mo-Fr 09:00-17:00, Sa 10:00-14:00",
      accessibility: "Full wheelchair accessibility",
      priceRange: "$",
      paymentAccepted: ["Cash", "Mobile Money"],
      currenciesAccepted: "KES"
    }
  ],
};

// Accessibility structured data
const accessibilityStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "React Now FC Academy",
  description: "Accessible football academy for youth development in Nairobi",
  url: "https://reactnowfc.org",
  accessibility: {
    "@type": "SpecialCommitment",
    name: "Accessibility Commitment",
    description: "We are committed to providing accessible football training for children of all abilities, including those with disabilities and special needs.",
    accessibilityFeature: [
      "Wheelchair accessible facilities",
      "Inclusive coaching methods", 
      "Adaptive equipment available",
      "Trained staff for special needs",
      "Accessible communication methods",
      "Multi-language support (English, Swahili)"
    ],
    accessibilityControl: [
      "Full keyboard navigation",
      "Screen reader compatible",
      "Voice navigation support",
      "High contrast mode available"
    ],
    accessibilityHazard: [
      "No flashing content",
      "No motion simulation hazards",
      "No sound hazards"
    ]
  },
  audience: {
    "@type": "Audience",
    audienceType: ["Children with disabilities", "Youth athletes", "Parents", "Educators", "Sports enthusiasts"]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(accessibilityStructuredData) }}
        />
        <meta name="accessibility" content="WCAG 2.1 AA compliant" />
        <meta name="theme-color" content="#10b981" />
      </head>

      <body className={`${inter.variable} ${inter.className}`}>
        <LoadingBar />

        <div className="fixed inset-0 -z-20">
          <ParabolicBackground intensity={0.15} />
        </div>

        <Navbar />

        <div id="main-content" className="min-h-screen">
          <TransparentNavWrapper>
            {children}
          </TransparentNavWrapper>
        </div>

        <Footer />
        <CookieConsent />
        <ScrollToTop />

        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
