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
  Heart
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
   Program Card Component
========================= */

function ProgramCard({ 
  title, 
  ageGroup, 
  description, 
  features, 
  schedule, 
  image,
  color 
}: { 
  title: string; 
  ageGroup: string; 
  description: string; 
  features: string[]; 
  schedule: string;
  image: string;
  color: string;
}) {
  return (
    <motion.div
      variants={scaleIn}
      className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-gray-50 to-slate-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100"
    >
      {/* Program Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Age Group Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-medium border border-white/20">
            {ageGroup}
          </span>
        </div>
        
        {/* Program Title */}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h3 className="text-2xl font-bold">{title}</h3>
        </div>
      </div>

      {/* Program Details */}
      <div className="p-6">
        <p className="text-gray-700 mb-6 leading-relaxed">{description}</p>
        
        {/* Features */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-500" />
            Key Features
          </h4>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3 text-sm text-gray-700">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-600 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Schedule */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-500" />
            Schedule
          </h4>
          <p className="text-sm text-gray-600">{schedule}</p>
        </div>

        {/* Join Button */}
        <Link
          href="/join/player"
          className={`w-full inline-flex items-center justify-center gap-2 ${color} text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg group-hover:scale-105`}
        >
          Join Program
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

export default function ProgramsAcademyPage() {
  const programs = [
    {
      title: "Under 6 Academy",
      ageGroup: "Ages 4-6",
      description: "Fun-focused introduction to football with emphasis on coordination, teamwork, and love for the game.",
      features: [
        "Basic motor skills development",
        "Fun games and activities",
        "Small-sided matches",
        "Parent involvement encouraged",
        "Focus on enjoyment and confidence"
      ],
      schedule: "Saturdays 9:00-10:30 AM",
      image: playerImages.action1,
      color: "bg-gradient-to-r from-green-500 to-emerald-600"
    },
    {
      title: "Under 12 Academy",
      ageGroup: "Ages 7-12",
      description: "Technical skill development combined with tactical understanding and character building.",
      features: [
        "Technical skill development",
        "Tactical understanding",
        "Strength and conditioning",
        "Match preparation",
        "Leadership development"
      ],
      schedule: "Tuesdays & Thursdays 4:00-6:00 PM",
      image: playerImages.action2,
      color: "bg-gradient-to-r from-blue-500 to-indigo-600"
    }
  ];

  const trainingFocus = [
    {
      icon: <Target className="w-6 h-6 text-blue-600" />,
      title: "Technical Skills",
      description: "Ball control, passing, shooting, dribbling, and fundamental techniques"
    },
    {
      icon: <Users className="w-6 h-6 text-green-600" />,
      title: "Teamwork",
      description: "Communication, collaboration, and understanding team dynamics"
    },
    {
      icon: <Shield className="w-6 h-6 text-purple-600" />,
      title: "Discipline",
      description: "Punctuality, respect, kit care, and personal responsibility"
    },
    {
      icon: <Trophy className="w-6 h-6 text-amber-600" />,
      title: "Match Play",
      description: "Game intelligence, decision-making, and competitive experience"
    }
  ];

  const benefits = [
    "Professional coaching with youth development expertise",
    "Age-appropriate curriculum and progression",
    "Character development and life skills",
    "Regular match opportunities and tournaments",
    "Progress tracking and parent communication",
    "Safe, inclusive, and supportive environment"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={academyImages.training1}
            alt="React Now FC Academy Training"
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
                  Professional Youth Development
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
              Football Academy
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.75, delay: 0.2 }}
              className="mb-8 max-w-3xl text-lg sm:text-xl leading-relaxed text-white/95 font-medium"
            >
              Age-appropriate training, clear expectations, and coaches who coach the person—not only the player.
              Building champions on and off the pitch.
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
                href="/team"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl border-2 border-white/30 bg-white/15 px-8 py-4 text-lg font-bold text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/25"
              >
                <span className="relative z-10">Meet Our Players</span>
                <Trophy className="relative z-10 h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
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
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Academy Programs</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Structured programs designed for different age groups, focusing on development, enjoyment, and growth
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12"
          >
            {programs.map((program, index) => (
              <ProgramCard
                key={program.title}
                title={program.title}
                ageGroup={program.ageGroup}
                description={program.description}
                features={program.features}
                schedule={program.schedule}
                image={program.image}
                color={program.color}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Training Focus Section */}
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
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Training Focus Areas</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive development covering all aspects of the modern game
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {trainingFocus.map((focus, index) => (
              <motion.div
                key={focus.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={scaleIn}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl mb-4">
                  {focus.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{focus.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{focus.description}</p>
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
                Why Choose React Now FC Academy?
              </h2>
              <p className="text-lg leading-relaxed text-gray-700 mb-8">
                We combine professional football training with character development, 
                creating well-rounded young athletes who excel both on and off the pitch.
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
                <Link href="/join/player" className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg">
                  Register Now
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/contact" className="group inline-flex items-center gap-2 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:border-gray-400 hover:bg-gray-50">
                  Ask Questions
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
                    src={playerImages.action3}
                    alt="Training session"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative aspect-square overflow-hidden rounded-3xl shadow-xl">
                  <img
                    src={playerImages.action4}
                    alt="Match practice"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative col-span-2 aspect-[16/9] overflow-hidden rounded-3xl shadow-xl">
                  <img
                    src={academyImages.match2}
                    alt="Team celebration"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl shadow-xl p-4 border border-white/20">
                <div className="flex items-center gap-3">
                  <Award className="w-6 h-6" />
                  <div>
                    <div className="font-bold">Professional</div>
                    <div className="text-sm">Coaching Staff</div>
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
              <Heart className="w-4 h-4" />
              <span className="text-sm font-semibold">Join Our Academy</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight">
              Start Your Football Journey Today
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Give your child the opportunity to develop football skills, build character, 
              and be part of a supportive community that nurtures growth.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/join/player"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-white px-8 py-4 text-lg font-bold text-blue-600 shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10">Register Your Child</span>
                <Users className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl border-2 border-white/30 bg-white/15 px-8 py-4 text-lg font-bold text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/25"
              >
                <span className="relative z-10">Schedule a Visit</span>
                <Calendar className="relative z-10 h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
