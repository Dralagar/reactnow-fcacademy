"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Users, 
  Trophy, 
  Target,
  Heart,
  Star,
  BookOpen,
  Globe,
  Shield,
  Zap,
  ChevronRight,
  ArrowRight,
  Award,
  Calendar,
  Flag,
  GraduationCap,
  TreePine
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
   Impact Card Component
========================= */

function ImpactCard({ 
  icon, 
  value, 
  label, 
  description, 
  color,
  trend 
}: { 
  icon: React.ReactNode; 
  value: string; 
  label: string; 
  description: string;
  color: string;
  trend?: string;
}) {
  return (
    <motion.div
      variants={scaleIn}
      className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-gray-50 to-slate-100 p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100"
    >
      <div className={`inline-flex items-center justify-center w-16 h-16 ${color} rounded-2xl mb-6 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{value}</div>
      <div className="text-lg font-semibold text-gray-800 mb-3">{label}</div>
      <p className="text-gray-600 leading-relaxed mb-4">{description}</p>
      {trend && (
        <div className="inline-flex items-center gap-2 text-green-600 font-medium">
          <TrendingUp className="w-4 h-4" />
          {trend}
        </div>
      )}
      
      {/* Decorative Elements */}
      <div className="absolute top-3 right-3 w-16 h-16 bg-gradient-to-br from-blue-100 to-transparent rounded-full opacity-30 group-hover:opacity-50 transition-opacity" />
    </motion.div>
  );
}

/* =========================
   Story Card Component
========================= */

function StoryCard({ 
  title, 
  story, 
  impact, 
  image,
  category 
}: { 
  title: string; 
  story: string; 
  impact: string; 
  image: string;
  category: string;
}) {
  return (
    <motion.div
      variants={scaleIn}
      className="group relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium border border-white/20">
            {category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">{title}</h3>
        <p className="text-gray-600 mb-4 leading-relaxed">{story}</p>
        <div className="flex items-center gap-2 text-green-600 font-medium">
          <Heart className="w-4 h-4" />
          <span className="text-sm">{impact}</span>
        </div>
      </div>
    </motion.div>
  );
}

/* =========================
   Main Component
========================= */

export default function ImpactPage() {
  const impactMetrics = [
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      value: "15+",
      label: "Youth Players",
      description: "Active participants in our football and education programs",
      color: "bg-blue-100",
      trend: "+25% growth"
    },
    {
      icon: <GraduationCap className="w-8 h-8 text-green-600" />,
      value: "95%",
      label: "School Attendance",
      description: "Players showing improved school attendance and performance",
      color: "bg-green-100",
      trend: "+15% improvement"
    },
    {
      icon: <Heart className="w-8 h-8 text-red-600" />,
      value: "100%",
      label: "Free Participation",
      description: "All programs completely free for participants and families",
      color: "bg-red-100",
      trend: "Since day one"
    },
    {
      icon: <Globe className="w-8 h-8 text-purple-600" />,
      value: "5",
      label: "Countries",
      description: "Diverse representation from multiple African communities",
      color: "bg-purple-100",
      trend: "Growing diversity"
    },
    {
      icon: <Trophy className="w-8 h-8 text-amber-600" />,
      value: "37",
      label: "Goals Scored",
      description: "Team achievements across matches and tournaments",
      color: "bg-amber-100",
      trend: "Season total"
    },
    {
      icon: <TreePine className="w-8 h-8 text-emerald-600" />,
      value: "50+",
      label: "Trees Planted",
      description: "Environmental impact through our climate action initiatives",
      color: "bg-emerald-100",
      trend: "Ongoing project"
    }
  ];

  const successStories = [
    {
      title: "Didi's Leadership Journey",
      story: "From shy newcomer to team captain, Didi's confidence has soared both on and off the pitch.",
      impact: "Improved school attendance from 70% to 95%",
      image: "/images/React24.jpeg",
      category: "Leadership"
    },
    {
      title: "Grace Breaks Barriers",
      story: "First girl to join the team, Grace is inspiring other girls to pursue football.",
      impact: "3 more girls joined the academy",
      image: "/images/React20.jpeg",
      category: "Inclusion"
    },
    {
      title: "Community Clean-up Success",
      story: "Players organized a community clean-up that brought 50+ residents together.",
      impact: "2 tons of waste collected, community pride boosted",
      image: "/images/React26.jpeg",
      category: "Environment"
    }
  ];

  const timeline = [
    {
      phase: "Foundation",
      period: "Q1 2024",
      achievements: [
        "Academy established",
        "First 5 players enrolled",
        "Community partnerships formed"
      ],
      color: "bg-blue-500"
    },
    {
      phase: "Growth",
      period: "Q2 2024",
      achievements: [
        "Expanded to 15+ players",
        "First tournament participation",
        "Education monitoring launched"
      ],
      color: "bg-green-500"
    },
    {
      phase: "Impact",
      period: "Q3 2024",
      achievements: [
        "Climate action initiatives",
        "Girls inclusion program",
        "Community service projects"
      ],
      color: "bg-purple-500"
    },
    {
      phase: "Future",
      period: "Q4 2024+",
      achievements: [
        "Digital literacy program",
        "Professional pathways",
        "Regional expansion plans"
      ],
      color: "bg-amber-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={academyImages.match1}
            alt="React Now FC Academy Impact"
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
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm font-semibold tracking-wide">
                  Measuring Success Beyond the Pitch
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
              Our Impact
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.75, delay: 0.2 }}
              className="mb-8 max-w-3xl text-lg sm:text-xl leading-relaxed text-white/95 font-medium"
            >
              Measured in attendance, grades, leadership moments, and the trust families place in us 
              week after week. Real impact that transforms lives and strengthens communities.
            </motion.p>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.75, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/join"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-white px-8 py-4 text-lg font-bold text-blue-600 shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10">Join the Movement</span>
                <Users className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/sustainability"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl border-2 border-white/30 bg-white/15 px-8 py-4 text-lg font-bold text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/25"
              >
                <span className="relative z-10">Climate & Service</span>
                <TreePine className="relative z-10 h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Metrics Section */}
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
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Impact by the Numbers</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Quantifiable results showing our commitment to youth development, education, and community transformation
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {impactMetrics.map((metric, index) => (
              <ImpactCard
                key={metric.label}
                icon={metric.icon}
                value={metric.value}
                label={metric.label}
                description={metric.description}
                color={metric.color}
                trend={metric.trend}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Success Stories Section */}
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
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Real stories of transformation, growth, and community impact from our players and programs
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {successStories.map((story, index) => (
              <StoryCard
                key={story.title}
                title={story.title}
                story={story.story}
                impact={story.impact}
                image={story.image}
                category={story.category}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
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
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Journey of Impact</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From foundation to future growth, tracking our milestones and achievements
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-200 via-blue-300 to-blue-200 rounded-full" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {timeline.map((phase, index) => (
                <motion.div
                  key={phase.phase}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeUp}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:ml-auto'}`}
                >
                  {/* Timeline Dot */}
                  <div className={`absolute top-0 ${index % 2 === 0 ? 'md:right-0 md:translate-x-1/2' : 'md:left-0 md:-translate-x-1/2'} left-1/2 transform -translate-x-1/2 w-6 h-6 ${phase.color} rounded-full border-4 border-white shadow-lg`} />
                  
                  <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-3 h-3 ${phase.color} rounded-full`} />
                      <span className="text-sm font-medium text-gray-600">{phase.period}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{phase.phase}</h3>
                    <ul className="space-y-2">
                      {phase.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-center gap-2 text-gray-700">
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                          <span className="text-sm">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
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
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-md px-4 py-2 mb-6 border border-white/20">
              <Heart className="w-4 h-4" />
              <span className="text-sm font-semibold">Make an Impact</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight">
              Join Us in Creating Lasting Change
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Every contribution helps us provide free football training, education support, 
              and community development opportunities for Nairobi's youth.
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
                href="/join/volunteer"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl border-2 border-white/30 bg-white/15 px-8 py-4 text-lg font-bold text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/25"
              >
                <span className="relative z-10">Volunteer</span>
                <Users className="relative z-10 h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
