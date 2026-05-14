"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Users, 
  Heart, 
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
  Camera,
  Megaphone,
  Handshake,
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
   Role Card Component
========================= */

function RoleCard({ 
  title, 
  description, 
  icon, 
  timeCommitment,
  skills 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
  timeCommitment: string;
  skills: string[];
}) {
  return (
    <motion.div
      variants={scaleIn}
      className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-gray-50 to-slate-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100"
    >
      {/* Card Header */}
      <div className="p-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white relative overflow-hidden">
        <div className="absolute top-3 right-3 w-16 h-16 bg-white/10 rounded-full blur-2xl" />
        <div className="relative z-10">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl mb-4">
            {icon}
          </div>
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
          <p className="text-green-100 text-sm">{timeCommitment}</p>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <p className="text-gray-700 mb-6 leading-relaxed">{description}</p>
        
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-500" />
            Skills Needed
          </h4>
          <ul className="space-y-2">
            {skills.map((skill, index) => (
              <li key={index} className="flex items-center gap-3 text-sm text-gray-700">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-600 flex-shrink-0" />
                <span>{skill}</span>
              </li>
            ))}
          </ul>
        </div>

        <Link
          href="/contact"
          className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg group-hover:scale-105"
        >
          Apply for This Role
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-3 right-3 w-16 h-16 bg-gradient-to-br from-green-100 to-transparent rounded-full opacity-30 group-hover:opacity-50 transition-opacity" />
    </motion.div>
  );
}

/* =========================
   Main Component
========================= */

export default function JoinVolunteerPage() {
  const volunteerRoles = [
    {
      title: "Training Assistant",
      description: "Support coaches during training sessions, help with drills, and ensure player safety.",
      icon: <Trophy className="w-6 h-6" />,
      timeCommitment: "2-3 hours per week",
      skills: [
        "Basic football knowledge",
        "Patience with children",
        "Reliability and punctuality",
        "Physical fitness"
      ]
    },
    {
      title: "Academic Support",
      description: "Help players with homework, reading, and basic educational activities.",
      icon: <BookOpen className="w-6 h-6" />,
      timeCommitment: "1-2 hours per week",
      skills: [
        "Teaching/tutoring experience",
        "Subject matter expertise",
        "Patience and encouragement",
        "Basic computer skills"
      ]
    },
    {
      title: "Event Coordinator",
      description: "Organize match days, tournaments, and special events for players and families.",
      icon: <Megaphone className="w-6 h-6" />,
      timeCommitment: "4-6 hours during events",
      skills: [
        "Event planning experience",
        "Communication skills",
        "Attention to detail",
        "Problem-solving ability"
      ]
    },
    {
      title: "Media & Storytelling",
      description: "Capture photos/videos, write stories, and help share our impact with the world.",
      icon: <Camera className="w-6 h-6" />,
      timeCommitment: "Flexible schedule",
      skills: [
        "Photography/videography",
        "Writing or social media",
        "Creative thinking",
        "Basic editing skills"
      ]
    }
  ];

  const benefits = [
    "Make a direct impact on youth development",
    "Develop new skills and gain experience",
    "Join a passionate and supportive community",
    "Flexible scheduling to fit your lifestyle",
    "Certificate of appreciation and recognition",
    "Opportunity for leadership roles"
  ];

  const requirements = [
    {
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      title: "Passion for Youth Development",
      description: "Genuine interest in helping young people grow and succeed"
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      title: "Reliability",
      description: "Consistent attendance and commitment to your role"
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      title: "Team Player",
      description: "Ability to work collaboratively with staff and other volunteers"
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      title: "Background Check",
      description: "Willingness to complete necessary safety screenings"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={academyImages.training2}
            alt="Volunteer with React Now FC Academy"
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
                  Make a Difference Today
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
              Volunteer With Us
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.75, delay: 0.2 }}
              className="mb-8 max-w-3xl text-lg sm:text-xl leading-relaxed text-white/95 font-medium"
            >
              Your time multiplies what we can offer—on the pitch, in the classroom, and behind the scenes. 
              Join our team of dedicated volunteers making a lasting impact in Nairobi.
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
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-white px-8 py-4 text-lg font-bold text-green-600 shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10">Start Volunteering</span>
                <Heart className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/impact"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl border-2 border-white/30 bg-white/15 px-8 py-4 text-lg font-bold text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/25"
              >
                <span className="relative z-10">See Our Impact</span>
                <Trophy className="relative z-10 h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Volunteer Roles Section */}
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
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Volunteer Opportunities</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Find the perfect role that matches your skills, interests, and availability
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12"
          >
            {volunteerRoles.map((role, index) => (
              <RoleCard
                key={role.title}
                title={role.title}
                description={role.description}
                icon={role.icon}
                timeCommitment={role.timeCommitment}
                skills={role.skills}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Requirements Section */}
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
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">What We're Looking For</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join our team of passionate volunteers committed to making a difference
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
                Why Volunteer With Us?
              </h2>
              <p className="text-lg leading-relaxed text-gray-700 mb-8">
                Volunteering with React Now FC Academy is more than just giving your time—it's 
                about being part of a transformative movement that's changing lives through 
                sports, education, and community development.
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
                <Link href="/contact" className="group inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:from-green-700 hover:to-emerald-700 hover:shadow-lg">
                  Apply to Volunteer
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/about" className="group inline-flex items-center gap-2 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:border-gray-400 hover:bg-gray-50">
                  Learn About Our Mission
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
              <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-3xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-3 right-3 w-16 h-16 bg-white/10 rounded-full blur-2xl" />
                <div className="absolute bottom-3 left-3 w-24 h-24 bg-white/10 rounded-full blur-3xl" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                      <Handshake className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold">Join Our Team</h3>
                  </div>
                  
                  <p className="text-white/90 mb-6 leading-relaxed">
                    Our volunteers are the heart of our organization. Together, we create 
                    opportunities for youth to learn, grow, and thrive both on and off the pitch.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
                      <div className="text-2xl font-bold mb-1">20+</div>
                      <div className="text-sm text-white/80">Active Volunteers</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
                      <div className="text-2xl font-bold mb-1">1000+</div>
                      <div className="text-sm text-white/80">Hours Contributed</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
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
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Volunteer Application Process</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Simple steps to start making a difference in our community
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={scaleIn}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 text-white rounded-full font-bold text-xl mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Apply Online</h3>
              <p className="text-gray-600">Submit your volunteer application with your interests and availability</p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={scaleIn}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 text-white rounded-full font-bold text-xl mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Interview</h3>
              <p className="text-gray-600">Meet with our team to discuss your skills and find the perfect role</p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={scaleIn}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 text-white rounded-full font-bold text-xl mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Training</h3>
              <p className="text-gray-600">Complete orientation and role-specific training sessions</p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={scaleIn}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 text-white rounded-full font-bold text-xl mb-4">
                4
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Start Volunteering</h3>
              <p className="text-gray-600">Begin your journey and start making an impact in our community</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 relative overflow-hidden">
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
              <span className="text-sm font-semibold">Ready to Make a Difference?</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight">
              Your Time Changes Lives
            </h2>
            <p className="text-lg sm:text-xl text-green-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Whether you have a few hours a week or just want to help at events, 
              your contribution matters. Join our volunteer family today.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-white px-8 py-4 text-lg font-bold text-green-600 shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10">Apply Now</span>
                <Heart className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/join/player"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl border-2 border-white/30 bg-white/15 px-8 py-4 text-lg font-bold text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/25"
              >
                <span className="relative z-10">Other Ways to Help</span>
                <Users className="relative z-10 h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
