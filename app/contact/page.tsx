import SitePageHero from "@/components/SitePageHero";
import Link from "next/link";
import Image from "next/image";
import { FaWhatsapp, FaInstagram, FaFacebook, FaTwitter, FaLinkedin, FaTiktok } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn, MdAccessTime } from "react-icons/md";

// ─────────────────────────────────────────────────────────────────────────────
// Social Links - Same as footer
// ─────────────────────────────────────────────────────────────────────────────
const SOCIAL_LINKS = [
  { icon: "/images/Tiktok.jpeg", href: "https://www.tiktok.com/@react_now.fc.academy", label: "TikTok" },
  { icon: "/images/Xlogo.png", href: "https://x.com/reactnowfc", label: "X (Twitter)" },
  { icon: "/images/InstLOGO.jpeg", href: "https://www.instagram.com/reactnowfc_academy", label: "Instagram" },
  { icon: "/images/LinkedInLogo.png", href: "https://linkedin.com/company/reactnowfc", label: "LinkedIn" },
  { icon: "/images/facebooklogo.png", href: "https://facebook.com/reactnowfc", label: "Facebook" },
];

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <SitePageHero
        title="Contact Us"
        subtitle="Partnerships, media, parent questions, or a simple hello—we read every message."
        imageSrc="/images/Geo.JPG"
        imageAlt="React Now FC community"
      />

      {/* Contact Information Section */}
      <section className="section bg-surface py-16 md:py-24">
        <div className="container-custom mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Left Column - Contact Info Cards */}
            <div>
              <h2 className="mb-6 text-3xl font-bold tracking-tight text-secondary md:text-4xl">
                Get in <span className="text-primary">Touch</span>
              </h2>
              <p className="mb-8 text-lg text-text-secondary">
                We&apos;d love to hear from you. Whether you have a question about our programs, 
                want to partner with us, or simply want to say hello—reach out using any of the 
                methods below.
              </p>

              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start gap-5 rounded-2xl border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <MdEmail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-semibold text-secondary">Email Us</h3>
                    <a
                      href="mailto:info@reactnowfca.org"
                      className="text-primary transition-colors hover:text-primary-700 hover:underline"
                    >
                      info@reactnowfca.org
                    </a>
                    <p className="mt-1 text-sm text-text-muted">We respond within 24-48 hours</p>
                  </div>
                </div>

                {/* Phone & WhatsApp */}
                <div className="flex items-start gap-5 rounded-2xl border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                    <MdPhone className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1 text-lg font-semibold text-secondary">Call or WhatsApp</h3>
                    <div className="flex flex-col gap-2 sm:flex-row sm:gap-6">
                      <a
                        href="tel:+254706255611"
                        className="flex items-center gap-2 text-primary transition-colors hover:text-primary-700"
                      >
                        <MdPhone className="h-4 w-4" />
                        +254 706 255 611
                      </a>
                      <a
                        href="https://wa.me/254706255611"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-green-600 transition-colors hover:text-green-700"
                      >
                        <FaWhatsapp className="h-4 w-4" />
                        WhatsApp Chat
                      </a>
                    </div>
                    <p className="mt-1 text-sm text-text-muted">
                      Available Monday–Friday, 9am–5pm EAT
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-5 rounded-2xl border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
                    <MdLocationOn className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-semibold text-secondary">Visit Us</h3>
                    <address className="not-italic text-text-primary">
                      Bee Centre Bar — Nasra Gardens Estate<br />
                      Embakasi Central<br />
                      Nairobi, Kenya
                    </address>
                    <p className="mt-2 text-sm text-text-muted">
                      Training sessions: Saturdays & Sundays, 9am–12pm
                    </p>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="flex items-start gap-5 rounded-2xl border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-500">
                    <MdAccessTime className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-semibold text-secondary">Office Hours</h3>
                    <div className="space-y-1 text-text-primary">
                      <p>Monday – Friday: 9:00 AM – 5:00 PM EAT</p>
                      <p>Saturday: 10:00 AM – 2:00 PM EAT</p>
                      <p>Sunday: Closed (Training sessions only)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Social Media & Map */}
            <div>
              {/* Social Media Section */}
              <div className="mb-8 rounded-2xl border border-border bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-xl font-semibold text-secondary">Connect With Us</h3>
                <p className="mb-6 text-text-secondary">
                  Follow our journey on social media for updates, highlights, and behind-the-scenes content.
                </p>
                <div className="flex flex-wrap gap-4">
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 rounded-xl border border-border bg-surface p-3 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md"
                      aria-label={`Follow us on ${social.label}`}
                    >
                      <div className="relative h-8 w-8">
                        <Image
                          src={social.icon}
                          alt={social.label}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="text-sm font-medium text-text-secondary group-hover:text-primary">
                        {social.label}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Response Section */}
              <div className="rounded-2xl bg-gradient-to-br from-primary to-primary-700 p-6 text-white shadow-lg md:p-8">
                <h3 className="mb-3 text-2xl font-bold">Quick Response Guarantee</h3>
                <p className="mb-4 text-white/90">
                  We understand that timing matters. Our team is committed to responding to all inquiries within 24-48 hours.
                </p>
                <div className="flex flex-col gap-3 border-t border-white/20 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                      <MdEmail className="h-4 w-4" />
                    </div>
                    <span className="text-sm">info@reactnowfca.org</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                      <FaWhatsapp className="h-4 w-4" />
                    </div>
                    <span className="text-sm">+254 706 255 611 (WhatsApp)</span>
                  </div>
                </div>
              </div>

              {/* Map Placeholder - Optional */}
              <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
                <div className="bg-surface p-4">
                  <h3 className="mb-2 font-semibold text-secondary">Find Us</h3>
                  <p className="text-sm text-text-muted">
                    Located in Embakasi Central, easily accessible from Nairobi&apos;s Central Business District.
                  </p>
                </div>
                <div className="h-48 w-full bg-gray-200 flex items-center justify-center text-text-muted">
                  <span>📍 Map View Coming Soon</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Notice */}
          <div className="mt-12 text-center">
            <div className="inline-block rounded-full bg-primary-50 px-6 py-3">
              <p className="text-sm text-primary">
                <span className="font-semibold">💬 Coming Soon:</span> A secure contact form for direct messaging.
                Until then, please use email or WhatsApp for fastest response.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}