"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { notFound } from "next/navigation";
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Trophy, 
  Star,
  Target,
  Users,
  Heart,
  Award,
  TrendingUp,
  BookOpen,
  Flag,
  Zap,
  Shield
} from "lucide-react";
import { players, getPlayerById } from "@/lib/playerDatabase";
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
   Player Profile Component
========================= */

export default function PlayerProfilePage({ params }: { params: { id: string } }) {
  const player = getPlayerById(params.id);

  if (!player) {
    notFound();
  }

  const joinDate = new Date(player.joinDate).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={player.image}
            alt={`${player.name} - React Now FC Player`}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
        </div>

        <div className="relative z-10 flex min-h-[50vh] items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center text-white">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <Link 
                href="/team"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Team
              </Link>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={scaleIn}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-6"
            >
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-6">
                <Image
                  src={player.image}
                  alt={`${player.name} profile`}
                  fill
                  className="object-cover rounded-full border-4 border-white/20 shadow-2xl"
                  sizes="160px"
                />
                <div className="absolute bottom-0 right-0 bg-gradient-to-br from-blue-600 to-indigo-700 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                  {player.jerseyNumber}
                </div>
              </div>
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mb-4 text-4xl sm:text-5xl md:text-6xl font-black leading-[1.1] tracking-[-0.05em] drop-shadow-2xl"
            >
              {player.name}
            </motion.h1>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.75, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 text-lg sm:text-xl text-white/95 font-medium"
            >
              <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                {player.position}
              </span>
              <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                Age {player.age}
              </span>
              <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                Joined {joinDate}
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Player Bio */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Bio Section */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeUp}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100"
              >
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Heart className="w-6 h-6 text-red-500" />
                  Player Story
                </h2>
                <p className="text-lg leading-relaxed text-gray-700">
                  {player.bio}
                </p>
              </motion.div>

              {/* Stats Section */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeUp}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100"
              >
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-green-500" />
                  Performance Stats
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-2xl">
                    <div className="text-3xl font-bold text-blue-600">{player.stats.goals}</div>
                    <div className="text-sm text-gray-600">Goals</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-2xl">
                    <div className="text-3xl font-bold text-green-600">{player.stats.assists}</div>
                    <div className="text-sm text-gray-600">Assists</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-2xl">
                    <div className="text-3xl font-bold text-purple-600">{player.stats.matches}</div>
                    <div className="text-sm text-gray-600">Matches</div>
                  </div>
                  <div className="text-center p-4 bg-amber-50 rounded-2xl">
                    <div className="text-3xl font-bold text-amber-600">{player.stats.attendance}</div>
                    <div className="text-sm text-gray-600">Attendance</div>
                  </div>
                </div>
              </motion.div>

              {/* Achievements Section */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeUp}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100"
              >
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Trophy className="w-6 h-6 text-amber-500" />
                  Achievements
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {player.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-amber-50 rounded-2xl">
                      <Award className="w-5 h-5 text-amber-600 flex-shrink-0" />
                      <span className="text-gray-800 font-medium">{achievement}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Skills Section */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeUp}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100"
              >
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Star className="w-6 h-6 text-blue-500" />
                  Key Skills
                </h2>
                <div className="flex flex-wrap gap-3">
                  {player.skills.map((skill, index) => (
                    <span key={index} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Background Info */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={slideInLeft}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  Background
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <MapPin className="w-4 h-4" />
                      Hometown
                    </div>
                    <div className="font-medium text-gray-900">{player.background.hometown}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <BookOpen className="w-4 h-4" />
                      School
                    </div>
                    <div className="font-medium text-gray-900">{player.background.school}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <Heart className="w-4 h-4" />
                      Family
                    </div>
                    <div className="font-medium text-gray-900">{player.background.familyBackground}</div>
                  </div>
                </div>
              </motion.div>

              {/* Aspirations */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={slideInLeft}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-500" />
                  Aspirations
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {player.background.aspirations}
                </p>
              </motion.div>

              {/* Personality */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={slideInLeft}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-purple-500" />
                  Personality
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900 mb-2">Strengths</div>
                    <ul className="space-y-1">
                      {player.personality.strengths.map((strength, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 mb-2">Best Memory</div>
                    <p className="text-sm text-gray-700">{player.personality.bestMemory}</p>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 mb-2">Favorite Part</div>
                    <p className="text-sm text-gray-700">{player.personality.favoritePart}</p>
                  </div>
                </div>
              </motion.div>
            </div>
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
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight">
              Support Players Like {player.name}
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Help us continue providing opportunities for young athletes to grow, learn, and dream big.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/donate"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-white px-8 py-4 text-lg font-bold text-blue-600 shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10">Donate Now</span>
                <Heart className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/team"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl border-2 border-white/30 bg-white/15 px-8 py-4 text-lg font-bold text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/25"
              >
                <span className="relative z-10">Meet More Players</span>
                <Users className="relative z-10 h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
