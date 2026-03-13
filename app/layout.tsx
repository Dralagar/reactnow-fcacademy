// app/layout.tsx

import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParabolicBackground from "@/components/ParabolicBackground";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://reactnowfc.org"),

  title: {
    default: "React Now FC Academy",
    template: "%s | React Now FC Academy",
  },

  description:
    "A grassroots football initiative empowering vulnerable youth through sport, mentorship, education, and digital literacy in Kenya.",

  keywords: [
    "football academy",
    "youth empowerment",
    "Kenya grassroots football",
    "React Now FC",
    "digital literacy",
    "community sports",
  ],

  authors: [{ name: "React Now FC" }],

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
      },
    ],

    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "React Now FC Academy",
    description: "Where Football Meets Innovation & Impact",
    images: ["/twitter-image.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#059669",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased bg-[var(--background)] text-[var(--foreground)]`}
      >
        {/* Background Parallax Layer */}
        <div className="fixed inset-0 -z-10">
          <ParabolicBackground intensity={0.15} />
        </div>

        {/* Navigation */}
        <Navbar />

        {/* Main Content */}
        <main className="pt-20 min-h-screen relative z-10">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
