"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Users, 
  Heart, 
  Handshake, 
  Trophy, 
  Star,
  ChevronRight,
  ArrowRight,
  Award,
  Target,
  Zap,
  Shield,
  BookOpen,
  Calendar,
  Flag
} from "lucide-react";
import { academyImages } from "@/lib/imageLibrary";

/* =========================
   Animation Variants
========================= */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
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
   Join Card Component
========================= */

function JoinCard({ 
  title, 
  description, 
  icon, 
  href, 
  color,
  features 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
  href: string; 
  color: string;
  features?: string[];
}) {
  return (
    <motion.div
      variants={scaleIn}
      className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-gray-50 to-slate-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100"
    >
      {/* Card Header */}
      <div className={`p-6 ${color} text-white relative overflow-hidden`}>
        <div className="absolute top-3 right-3 w-16 h-16 bg-white/10 rounded-full blur-2xl" />
        <div className="relative z-10">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl mb-4">
            {icon}
          </div>
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <p className="text-gray-700 mb-6 leading-relaxed">{description}</p>
        
        {features && (
          <div className="mb-6">
            <ul className="space-y-2">
              {features.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-sm text-gray-700">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-600 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <Link
          href={href}
          className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg group-hover:scale-105"
        >
          Get Started
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

export default function JoinPage() {
  const joinOptions = [
    {
      title: "Join as a Player",
      description: "Train with structure, standards, and coaches who invest in your future.",
      icon: <Users className="w-6 h-6" />,
      href: "/join/player",
      color: "bg-gradient-to-r from-blue-500 to-indigo-600",
      features: [
        "Professional coaching",
        "Age-appropriate training",
        "Character development",
        "Academic support"
      ]
    },
    {
      title: "Volunteer",
      description: "Mentor, organise, or share a skill—time is one of our greatest assets.",
      icon: <Heart className="w-6 h-6" />,
      href: "/join/volunteer",
      color: "bg-gradient-to-r from-green-500 to-emerald-600",
      features: [
        "Training assistance",
        "Academic support",
        "Event coordination",
        "Skill sharing"
      ]
    },
    {
      title: "Partner with Us",
      description: "Align your brand or organisation with grassroots impact that lasts.",
      icon: <Handshake className="w-6 h-6" />,
      href: "/join/partner",
      color: "bg-gradient-to-r from-purple-500 to-pink-600",
      features: [
        "Brand alignment",
        "Community impact",
        "Sustainable partnerships",
        "Shared values"
      ]
    },
    {
      title: "Donate",
      description: "Fund kits, learning materials, and pitch time for kids who need it most.",
      icon: <Trophy className="w-6 h-6" />,
      href: "/join/donate",
      color: "bg-gradient-to-r from-amber-500 to-orange-600",
      features: [
        "Equipment funding",
        "Educational resources",
        "Facility maintenance",
        "Program sustainability"
      ]
    }
  ];

  const stats = [
    { value: "15+", label: "Youth Players", icon: <Users className="w-6 h-6" /> },
    { value: "100%", label: "Free Programs", icon: <Heart className="w-6 h-6" /> },
    { value: "5", label: "Countries", icon: <Flag className="w-6 h-6" /> },
    { value: "20+", label: "Volunteers", icon: <Shield className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={academyImages.teamPhoto2}
            alt="Get Involved with React Now FC Academy"
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
                <Heart className="w-5 h-5" />
                <span className="text-sm font-semibold tracking-wide">
                  Join Our Community
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
              Get Involved
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.75, delay: 0.2 }}
              className="mb-8 max-w-3xl text-lg sm:text-xl leading-relaxed text-white/95 font-medium"
            >
              Players, volunteers, partners, donors—there is a lane for everyone who believes 
              football can change lives. Be part of something bigger than yourself.
            </motion.p>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.75, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/join/player"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-white px-8 py-4 text-lg font-bold text-blue-600 shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10">Join as Player</span>
                <Users className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/join/volunteer"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl border-2 border-white/30 bg-white/15 px-8 py-4 text-lg font-bold text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/25"
              >
                <span className="relative z-10">Volunteer</span>
                <Heart className="relative z-10 h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Growing Community</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join a diverse and passionate community making a real difference in Nairobi
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                className="text-center p-6 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl mb-4 text-blue-600">
                  {stat.icon}
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-sm font-medium text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Join Options Section */}
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
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">How You Can Join</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Find the perfect way to contribute your skills, time, or resources to our mission
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12"
          >
            {joinOptions.map((option, index) => (
              <JoinCard
                key={option.title}
                title={option.title}
                description={option.description}
                icon={option.icon}
                href={option.href}
                color={option.color}
                features={option.features}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 sm:py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Make a Real Impact
              </h2>
              <p className="text-lg leading-relaxed text-gray-700 mb-8">
                When you join React Now FC Academy, you become part of a movement that's 
                transforming lives through football, education, and community development. 
                Your contribution—whether time, skills, or resources—creates lasting change.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-green-600 rounded-full" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Direct Community Impact</div>
                    <div className="text-gray-600">See your contribution transform young lives immediately</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Sustainable Development</div>
                    <div className="text-gray-600">Help build programs that last for generations</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-purple-600 rounded-full" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Personal Growth</div>
                    <div className="text-gray-600">Develop new skills and expand your network</div>
                  </div>
                </div>
              </div>

              <Link href="/impact" className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg">
                See Our Impact
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
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                      <Target className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold">Join the Movement</h3>
                  </div>
                  
                  <p className="text-white/90 mb-6 leading-relaxed">
                    Every person who joins our community brings unique skills and perspectives 
                    that strengthen our mission. Together, we're creating opportunities where 
                    none existed before.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
                      <div className="text-2xl font-bold mb-1">100+</div>
                      <div className="text-sm text-white/80">Lives Impacted</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
                      <div className="text-2xl font-bold mb-1">∞</div>
                      <div className="text-sm text-white/80">Potential</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
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
              <span className="text-sm font-semibold">Ready to Join?</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight">
              Your Journey Starts Here
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Whether you want to play, coach, support, or partner, there's a place for you 
              in our community. Take the first step today and be part of something extraordinary.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-white px-8 py-4 text-lg font-bold text-blue-600 shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10">Get in Touch</span>
                <Heart className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/about"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl border-2 border-white/30 bg-white/15 px-8 py-4 text-lg font-bold text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/25"
              >
                <span className="relative z-10">Learn More</span>
                <BookOpen className="relative z-10 h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
