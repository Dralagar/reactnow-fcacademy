"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Users, 
  Trophy, 
  Target, 
  Star,
  Calendar,
  Clock,
  Shield,
  Zap,
  ChevronRight,
  ArrowRight,
  Award,
  Flag,
  BookOpen,
  Heart,
  CheckCircle
} from "lucide-react";
import { academyImages, playerImages } from "@/lib/imageLibrary";

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
   Main Component
========================= */

export default function JoinPlayerPage() {
  const requirements = [
    {
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      title: "Commitment",
      description: "Regular attendance at training sessions and team activities"
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      title: "Respect",
      description: "For coaches, teammates, opponents, and the community"
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      title: "Academic Balance",
      description: "Maintaining school performance while participating in sports"
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      title: "Positive Attitude",
      description: "Willingness to learn, grow, and support teammates"
    }
  ];

  const benefits = [
    "Professional coaching and skill development",
    "Character building and leadership training",
    "Academic support and monitoring",
    "Tournament participation and match experience",
    "Access to quality equipment and facilities",
    "Safe and inclusive environment"
  ];

  const ageGroups = [
    {
      age: "Under 6",
      years: "4-6 years",
      focus: "Fun, coordination, and basic skills",
      schedule: "Saturdays 9:00-10:30 AM"
    },
    {
      age: "Under 12", 
      years: "7-12 years",
      focus: "Technical skills and tactical understanding",
      schedule: "Tuesdays & Thursdays 4:00-6:00 PM"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={playerImages.action1}
            alt="Join as a Player - React Now FC Academy"
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
                <Trophy className="w-5 h-5" />
                <span className="text-sm font-semibold tracking-wide">
                  Future Champions Start Here
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
              Join as a Player
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.75, delay: 0.2 }}
              className="mb-8 max-w-3xl text-lg sm:text-xl leading-relaxed text-white/95 font-medium"
            >
              For youth who are ready to learn, listen, and grow—with football as the classroom 
              and character development as the ultimate goal.
            </motion.p>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.75, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-white px-8 py-4 text-lg font-bold text-blue-600 shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10">Start Registration</span>
                <Users className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/team"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl border-2 border-white/30 bg-white/15 px-8 py-4 text-lg font-bold text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/25"
              >
                <span className="relative z-10">Meet Current Players</span>
                <Trophy className="relative z-10 h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
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
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">What We Look For</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We seek dedicated young athletes who are committed to growing both on and off the pitch
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {requirements.map((req, index) => (
              <motion.div
                key={req.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={scaleIn}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl mb-4">
                  {req.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{req.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{req.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Age Groups Section */}
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
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Age Group Programs</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Age-appropriate training programs designed for optimal development and enjoyment
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {ageGroups.map((group, index) => (
              <motion.div
                key={group.age}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={scaleIn}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden"
              >
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{group.age}</h3>
                  <p className="text-blue-100">{group.years}</p>
                </div>
                <div className="p-6">
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Target className="w-4 h-4 text-blue-600" />
                      Focus Area
                    </h4>
                    <p className="text-gray-700">{group.focus}</p>
                  </div>
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-green-600" />
                      Schedule
                    </h4>
                    <p className="text-gray-700">{group.schedule}</p>
                  </div>
                  <Link
                    href="/contact"
                    className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg"
                  >
                    Join This Group
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-20">
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
                Why Join Our Academy?
              </h2>
              <p className="text-lg leading-relaxed text-gray-700 mb-8">
                More than just football training—we provide a comprehensive development program 
                that builds character, discipline, and life skills that last a lifetime.
              </p>
              
              <ul className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-green-600 rounded-full" />
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg">
                  Apply Now
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/programs/academy" className="group inline-flex items-center gap-2 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:border-gray-400 hover:bg-gray-50">
                  Learn About Programs
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={scaleIn}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="relative aspect-square overflow-hidden rounded-3xl shadow-xl">
                  <img
                    src={playerImages.action2}
                    alt="Training session"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative aspect-square overflow-hidden rounded-3xl shadow-xl">
                  <img
                    src={playerImages.action3}
                    alt="Team practice"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative col-span-2 aspect-[16/9] overflow-hidden rounded-3xl shadow-xl">
                  <img
                    src={academyImages.match1}
                    alt="Match day"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl shadow-xl p-4 border border-white/20">
                <div className="flex items-center gap-3">
                  <Award className="w-6 h-6" />
                  <div>
                    <div className="font-bold">100% Free</div>
                    <div className="text-sm">No Hidden Costs</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Registration Process */}
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
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Registration Process</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Simple steps to join our academy and start your football journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={scaleIn}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full font-bold text-xl mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Contact Us</h3>
              <p className="text-gray-600">Reach out via phone, email, or visit our training grounds to express interest</p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={scaleIn}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full font-bold text-xl mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Trial Session</h3>
              <p className="text-gray-600">Attend a free trial session to experience our training approach</p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={scaleIn}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full font-bold text-xl mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Complete Registration</h3>
              <p className="text-gray-600">Fill out registration forms and receive your academy welcome kit</p>
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
              <span className="text-sm font-semibold">Ready to Start?</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight">
              Begin Your Football Journey Today
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Take the first step towards becoming part of our academy family. 
              No experience required—just dedication and a love for the game.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-white px-8 py-4 text-lg font-bold text-blue-600 shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10">Start Registration</span>
                <Users className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/team"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl border-2 border-white/30 bg-white/15 px-8 py-4 text-lg font-bold text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/25"
              >
                <span className="relative z-10">Meet Our Team</span>
                <Trophy className="relative z-10 h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
