"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Users, 
  Trophy, 
  Target, 
  Star,
  Search,
  Filter,
  Calendar,
  MapPin,
  Award,
  Heart,
  ChevronRight,
  Shield,
  Zap,
  TrendingUp
} from "lucide-react";
import { players, getPlayerById, getPlayersByPosition, getTopScorers, getTeamStats, searchPlayers, Player } from "@/lib/playerDatabase";
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
   Player Card Component
========================= */

function PlayerCard({ player }: { player: Player }) {
  return (
    <motion.div
      variants={scaleIn}
      className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-gray-50 to-slate-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100"
    >
      {/* Jersey Number Badge */}
      <div className="absolute top-4 left-4 z-20">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">
          {player.jerseyNumber}
        </div>
      </div>

      {/* Player Image */}
      <div className="relative h-64 sm:h-72 overflow-hidden">
        <Image
          src={player.image}
          alt={`${player.name} - ${player.position} at React Now FC`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Position Badge */}
        <div className="absolute top-4 right-4 z-20">
          <div className="bg-white/20 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-bold border border-white/20">
            {player.position}
          </div>
        </div>
        
        {/* Player Info Overlay */}
        <div className="absolute bottom-4 left-4 right-4 text-white z-10">
          <h3 className="text-2xl font-bold mb-1">{player.name}</h3>
          <p className="text-sm opacity-90 font-medium">Age {player.age} • Jersey #{player.jerseyNumber}</p>
        </div>
      </div>

      {/* Player Details */}
      <div className="p-6 sm:p-7">
        {/* Bio */}
        <p className="text-gray-700 mb-6 text-sm leading-relaxed font-medium line-clamp-3">
          {player.bio}
        </p>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="text-center p-3 bg-white rounded-xl border border-gray-100">
            <div className="text-lg font-bold text-blue-600">{player.stats.goals}</div>
            <div className="text-xs text-gray-600">Goals</div>
          </div>
          <div className="text-center p-3 bg-white rounded-xl border border-gray-100">
            <div className="text-lg font-bold text-green-600">{player.stats.assists}</div>
            <div className="text-xs text-gray-600">Assists</div>
          </div>
          <div className="text-center p-3 bg-white rounded-xl border border-gray-100">
            <div className="text-lg font-bold text-purple-600">{player.stats.attendance}</div>
            <div className="text-xs text-gray-600">Attendance</div>
          </div>
        </div>

        {/* Key Achievements */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-500" />
            Key Achievements
          </h4>
          <div className="flex flex-wrap gap-2">
            {player.achievements.slice(0, 2).map((achievement, index) => (
              <span key={index} className="px-2 py-1 bg-amber-50 text-amber-700 text-xs rounded-full font-medium">
                {achievement}
              </span>
            ))}
            {player.achievements.length > 2 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                +{player.achievements.length - 2} more
              </span>
            )}
          </div>
        </div>

        {/* Skills */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <Star className="w-4 h-4 text-blue-500" />
            Key Skills
          </h4>
          <div className="flex flex-wrap gap-2">
            {player.skills.slice(0, 3).map((skill, index) => (
              <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* View Profile Button */}
        <Link
          href={`/team/player/${player.id}`}
          className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg group-hover:scale-105"
        >
          View Full Profile
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-3 right-3 w-16 h-16 bg-gradient-to-br from-blue-100 to-transparent rounded-full opacity-30 group-hover:opacity-50 transition-opacity" />
      <div className="absolute bottom-3 left-3 w-12 h-12 bg-gradient-to-br from-green-100 to-transparent rounded-full opacity-30 group-hover:opacity-50 transition-opacity" />
    </motion.div>
  );
}

/* =========================
   Stats Card Component
========================= */

function StatsCard({ icon, value, label, color }: { 
  icon: React.ReactNode; 
  value: string; 
  label: string; 
  color: string;
}) {
  return (
    <motion.div
      variants={scaleIn}
      className="text-center p-6 sm:p-8 rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
    >
      <div className={`inline-flex items-center justify-center w-16 h-16 ${color} rounded-2xl mb-4 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{value}</div>
      <div className="text-sm font-medium text-gray-600">{label}</div>
    </motion.div>
  );
}

/* =========================
   Main Component
========================= */

export default function TeamPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  // Filter and sort players
  const filteredPlayers = useMemo(() => {
    let filtered = players;

    // Apply search filter
    if (searchQuery) {
      filtered = searchPlayers(searchQuery);
    }

    // Apply position filter
    if (selectedPosition !== "all") {
      filtered = filtered.filter(player => player.position === selectedPosition);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "age":
          return a.age - b.age;
        case "goals":
          return b.stats.goals - a.stats.goals;
        case "attendance":
          return parseInt(b.stats.attendance) - parseInt(a.stats.attendance);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedPosition, sortBy]);

  const teamStats = getTeamStats();
  const positions = ["all", ...Array.from(new Set(players.map(p => p.position)))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={academyImages.teamPhoto1}
            alt="React Now FC Team"
            fill
            className="object-cover"
            priority
            sizes="100vw"
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
                <Users className="w-5 h-5" />
                <span className="text-sm font-semibold tracking-wide">
                  Our Team • Our Family • Our Future
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
              Meet the Team
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.75, delay: 0.2 }}
              className="mb-8 max-w-3xl text-lg sm:text-xl leading-relaxed text-white/95 font-medium"
            >
              The heart and soul of React Now FC Academy. Young athletes transforming their lives 
              through discipline, teamwork, and the beautiful game.
            </motion.p>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.75, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/about/team"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-white px-8 py-4 text-lg font-bold text-blue-600 shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10">Coaches & Staff</span>
                <Users className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/team/highlights"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl border-2 border-white/30 bg-white/15 px-8 py-4 text-lg font-bold text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/25"
              >
                <span className="relative z-10">Player Highlights</span>
                <Trophy className="relative z-10 h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Stats Section */}
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
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Team Statistics</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Numbers that tell our story of growth, dedication, and community impact
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
          >
            <StatsCard
              icon={<Users className="w-8 h-8 text-blue-600" />}
              value={teamStats.totalPlayers.toString()}
              label="Total Players"
              color="bg-blue-100"
            />
            <StatsCard
              icon={<Trophy className="w-8 h-8 text-amber-600" />}
              value={teamStats.totalGoals.toString()}
              label="Total Goals"
              color="bg-amber-100"
            />
            <StatsCard
              icon={<Target className="w-8 h-8 text-green-600" />}
              value={teamStats.averageAttendance}
              label="Average Attendance"
              color="bg-green-100"
            />
            <StatsCard
              icon={<TrendingUp className="w-8 h-8 text-purple-600" />}
              value={`${teamStats.ageRange.youngest}-${teamStats.ageRange.oldest}`}
              label="Age Range"
              color="bg-purple-100"
            />
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white/50 backdrop-blur-sm border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search players by name, position, or hometown..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>

            {/* Position Filter */}
            <div className="flex gap-3 items-center">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                value={selectedPosition}
                onChange={(e) => setSelectedPosition(e.target.value)}
                className="px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              >
                {positions.map(position => (
                  <option key={position} value={position}>
                    {position === "all" ? "All Positions" : position}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="flex gap-3 items-center">
              <Zap className="w-5 h-5 text-gray-600" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              >
                <option value="name">Sort by Name</option>
                <option value="age">Sort by Age</option>
                <option value="goals">Sort by Goals</option>
                <option value="attendance">Sort by Attendance</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredPlayers.length} of {players.length} players
          </div>
        </div>
      </section>

      {/* Players Grid */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
          >
            {filteredPlayers.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </motion.div>

          {filteredPlayers.length === 0 && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No players found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 relative overflow-hidden">
        {/* Background decorative elements */}
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
              <span className="text-sm font-semibold">Join Our Family</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight">
              Become Part of React Now FC Academy
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Whether you want to join as a player, volunteer as a coach, or support our mission, 
              there's a place for you in our growing family.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
