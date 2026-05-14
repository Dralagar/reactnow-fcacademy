"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  MessageCircle,
  Send,
  Star,
  ChevronRight,
  ArrowRight,
  Award,
  Target,
  Zap,
  Shield,
  Heart,
  Users,
  CheckCircle
} from "lucide-react";
import { academyImages } from "@/lib/imageLibrary";

/* =========================
   Animation Variants
========================= */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

/* =========================
   Contact Card Component
========================= */

function ContactCard({ 
  title, 
  description, 
  icon, 
  action, 
  href,
  color 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
  action: string; 
  href: string;
  color: string;
}) {
  return (
    <motion.div
      variants={scaleIn}
      className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-gray-50 to-slate-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100"
    >
      <div className="p-6">
        <div className={`inline-flex items-center justify-center w-12 h-12 ${color} rounded-2xl mb-4 text-white`}>
          {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>
        <Link
          href={href}
          className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors group-hover:gap-3"
        >
          {action}
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-3 right-3 w-16 h-16 bg-gradient-to-br from-blue-100 to-transparent rounded-full opacity-30 group-hover:opacity-50 transition-opacity" />
    </motion.div>
  );
}

/* =========================
   Main Component
========================= */

export default function ContactPage() {
  const contactMethods = [
    {
      title: "Email Us",
      description: "Send us a detailed message about programs, partnerships, or general inquiries.",
      icon: <Mail className="w-6 h-6" />,
      action: "Send Email",
      href: "mailto:info@reactnowfca.org",
      color: "bg-gradient-to-r from-blue-500 to-indigo-600"
    },
    {
      title: "Call or WhatsApp",
      description: "Reach us directly for urgent matters or quick questions about enrollment.",
      icon: <Phone className="w-6 h-6" />,
      action: "+254 706 255 611",
      href: "tel:+254706255611",
      color: "bg-gradient-to-r from-green-500 to-emerald-600"
    },
    {
      title: "Visit Our Location",
      description: "Come see our training grounds and meet our team in person.",
      icon: <MapPin className="w-6 h-6" />,
      action: "Get Directions",
      href: "#location",
      color: "bg-gradient-to-r from-purple-500 to-pink-600"
    },
    {
      title: "Office Hours",
      description: "Monday-Friday: 9AM-5PM, Saturday: 10AM-2PM, Sunday: Training only",
      icon: <Clock className="w-6 h-6" />,
      action: "Schedule Visit",
      href: "mailto:info@reactnowfca.org?subject=Schedule Visit",
      color: "bg-gradient-to-r from-amber-500 to-orange-600"
    }
  ];

  const socialLinks = [
    {
      name: "Instagram",
      href: "https://www.instagram.com/reactnowfc_academy",
      icon: <MessageCircle className="w-5 h-5" />,
      color: "bg-gradient-to-r from-purple-500 to-pink-500"
    },
    {
      name: "TikTok",
      href: "https://www.tiktok.com/@react_now.fc.academy",
      icon: <Star className="w-5 h-5" />,
      color: "bg-gray-900"
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/reactnowfc",
      icon: <Users className="w-5 h-5" />,
      color: "bg-blue-600"
    },
    {
      name: "Facebook",
      href: "https://facebook.com/reactnowfc",
      icon: <Heart className="w-5 h-5" />,
      color: "bg-blue-700"
    }
  ];

  const reasons = [
    {
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      title: "Quick Response",
      description: "We reply to all messages within 24-48 hours"
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      title: "Multiple Channels",
      description: "Contact us through email, phone, WhatsApp, or social media"
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      title: "Personal Attention",
      description: "Every inquiry receives individual care and follow-up"
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      title: "Expert Guidance",
      description: "Get answers from our experienced coaching and administrative team"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={academyImages.teamPhoto1}
            alt="Contact React Now FC Academy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
        </div>

        <div className="relative z-10 flex min-h-[60vh] items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center text-white">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-3 backdrop-blur-md">
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm font-semibold tracking-wide">
                  We're Here to Help
                </span>
              </div>
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-6 text-4xl sm:text-5xl md:text-6xl font-black leading-[1.1] tracking-[-0.05em] drop-shadow-2xl"
            >
              Contact Us
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.75, delay: 0.2 }}
              className="mb-8 max-w-3xl text-lg sm:text-xl leading-relaxed text-white/95 font-medium"
            >
              Partnerships, media, parent questions, or a simple hello—we read every message. 
              Your journey with React Now FC Academy starts with a conversation.
            </motion.p>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.75, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="mailto:info@reactnowfca.org"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-white px-8 py-4 text-lg font-bold text-blue-600 shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10">Send Message</span>
                <Send className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="tel:+254706255611"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl border-2 border-white/30 bg-white/15 px-8 py-4 text-lg font-bold text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/25"
              >
                <span className="relative z-10">Call Now</span>
                <Phone className="relative z-10 h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Methods Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose the most convenient way to reach us—we're always ready to help
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12"
          >
            {contactMethods.map((method, index) => (
              <ContactCard
                key={method.title}
                title={method.title}
                description={method.description}
                icon={method.icon}
                action={method.action}
                href={method.href}
                color={method.color}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Location & Social Section */}
      <section className="py-16 sm:py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={slideInLeft}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Visit Our Academy
              </h2>
              <p className="text-lg leading-relaxed text-gray-700 mb-8">
                Experience our training environment firsthand. Located in the heart of Embakasi Central, 
                our facility is easily accessible and provides the perfect setting for youth development.
              </p>
              
              <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 mb-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Training Grounds</h3>
                    <address className="text-gray-700 not-italic leading-relaxed">
                      Bee Centre Bar — Nasra Gardens Estate<br />
                      Embakasi Central<br />
                      Nairobi, Kenya
                    </address>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Training Schedule</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Saturdays & Sundays: 9:00 AM - 12:00 PM<br />
                      <span className="text-sm text-gray-600">Best time to visit: Saturdays 10:00 AM</span>
                    </p>
                  </div>
                </div>
              </div>

              <Link
                href="mailto:info@reactnowfca.org?subject=Schedule Visit"
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:from-purple-700 hover:to-pink-700 hover:shadow-lg"
              >
                Schedule a Visit
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={scaleIn}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-3 right-3 w-16 h-16 bg-white/10 rounded-full blur-2xl" />
                <div className="absolute bottom-3 left-3 w-24 h-24 bg-white/10 rounded-full blur-3xl" />
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-6">Connect With Us</h3>
                  <p className="text-white/90 mb-8 leading-relaxed">
                    Follow our journey on social media for daily updates, training highlights, 
                    and inspiring stories from our academy community.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {socialLinks.map((social, index) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group flex items-center gap-3 p-4 rounded-xl ${social.color} text-white transition-all duration-300 hover:scale-105 hover:shadow-lg`}
                      >
                        {social.icon}
                        <span className="font-semibold">{social.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Contact Us Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Why Reach Out to Us?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We're committed to providing exceptional service and support to our community
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={scaleIn}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl mb-4">
                  {reason.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{reason.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-md px-4 py-2 mb-6 border border-white/20">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-semibold">Ready to Connect?</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight">
              Start Your Journey Today
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Whether you're interested in enrolling your child, volunteering, or partnering with us, 
              we're excited to hear from you and explore how we can work together.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="mailto:info@reactnowfca.org"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-white px-8 py-4 text-lg font-bold text-blue-600 shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10">Send Email Now</span>
                <Send className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="https://wa.me/254706255611"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl border-2 border-white/30 bg-white/15 px-8 py-4 text-lg font-bold text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/25"
              >
                <span className="relative z-10">WhatsApp Us</span>
                <MessageCircle className="relative z-10 h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}