"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Monitor, 
  Code, 
  Shield, 
  BookOpen,
  Users, 
  Trophy, 
  Target, 
  Star,
  Calendar,
  Clock,
  Zap,
  ChevronRight,
  ArrowRight,
  Award,
  Flag,
  Heart,
  Laptop,
  Smartphone,
  GraduationCap,
  Globe
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
   Module Card Component
========================= */

function ModuleCard({ 
  title, 
  description, 
  topics, 
  duration, 
  icon,
  color 
}: { 
  title: string; 
  description: string; 
  topics: string[]; 
  duration: string;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <motion.div
      variants={scaleIn}
      className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-gray-50 to-slate-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100"
    >
      {/* Module Header */}
      <div className={`p-6 ${color} text-white relative overflow-hidden`}>
        <div className="absolute top-3 right-3 w-16 h-16 bg-white/10 rounded-full blur-2xl" />
        <div className="relative z-10">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl mb-4">
            {icon}
          </div>
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
          <p className="text-white/90 text-sm">{duration}</p>
        </div>
      </div>

      {/* Module Content */}
      <div className="p-6">
        <p className="text-gray-700 mb-6 leading-relaxed">{description}</p>
        
        {/* Topics */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-500" />
            Key Topics
          </h4>
          <ul className="space-y-2">
            {topics.map((topic, index) => (
              <li key={index} className="flex items-center gap-3 text-sm text-gray-700">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-600 flex-shrink-0" />
                <span>{topic}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Join Button */}
        <Link
          href="/join"
          className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg group-hover:scale-105"
        >
          Join This Module
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

export default function ProgramsDigitalPage() {
  const modules = [
    {
      title: "Digital Safety & Citizenship",
      description: "Learn how to navigate the online world safely, protect personal information, and be a responsible digital citizen.",
      topics: [
        "Online privacy and security",
        "Social media safety",
        "Cyberbullying prevention",
        "Digital footprint management",
        "Online etiquette and respect"
      ],
      duration: "4 weeks • 2 sessions per week",
      icon: <Shield className="w-6 h-6" />,
      color: "bg-gradient-to-r from-green-500 to-emerald-600"
    },
    {
      title: "Introduction to Coding",
      description: "Discover the fundamentals of programming through fun, interactive projects and logical thinking exercises.",
      topics: [
        "Basic programming concepts",
        "Problem-solving skills",
        "Simple game development",
        "Web development basics",
        "Algorithmic thinking"
      ],
      duration: "6 weeks • 2 sessions per week",
      icon: <Code className="w-6 h-6" />,
      color: "bg-gradient-to-r from-blue-500 to-indigo-600"
    },
    {
      title: "Digital Tools for School",
      description: "Master essential digital tools that enhance learning, organization, and academic performance.",
      topics: [
        "Document creation and editing",
        "Presentation software",
        "Online research skills",
        "Digital note-taking",
        "Collaboration tools"
      ],
      duration: "4 weeks • 1 session per week",
      icon: <BookOpen className="w-6 h-6" />,
      color: "bg-gradient-to-r from-purple-500 to-pink-600"
    },
    {
      title: "Career & Future Skills",
      description: "Prepare for the future with digital skills essential for modern careers and entrepreneurship.",
      topics: [
        "Resume building with digital tools",
        "Online presence and personal branding",
        "Basic entrepreneurship concepts",
        "Financial literacy apps",
        "Job search strategies"
      ],
      duration: "5 weeks • 1 session per week",
      icon: <GraduationCap className="w-6 h-6" />,
      color: "bg-gradient-to-r from-amber-500 to-orange-600"
    }
  ];

  const benefits = [
    {
      icon: <Monitor className="w-6 h-6 text-blue-600" />,
      title: "Hands-on Learning",
      description: "Practical experience with real devices and software"
    },
    {
      icon: <Users className="w-6 h-6 text-green-600" />,
      title: "Peer Collaboration",
      description: "Work together on projects and learn from each other"
    },
    {
      icon: <Globe className="w-6 h-6 text-purple-600" />,
      title: "Global Skills",
      description: "Prepare for the digital economy and future careers"
    },
    {
      icon: <Heart className="w-6 h-6 text-red-600" />,
      title: "Free Access",
      description: "All programs completely free for participants"
    }
  ];

  const outcomes = [
    "Improved digital literacy and confidence",
    "Enhanced problem-solving and critical thinking",
    "Better academic performance through digital tools",
    "Increased awareness of online safety",
    "Foundation for future tech careers",
    "Skills for entrepreneurship and innovation"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={academyImages.training2}
            alt="Digital Literacy Program"
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
                <Laptop className="w-5 h-5" />
                <span className="text-sm font-semibold tracking-wide">
                  Future-Ready Digital Skills
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
              Digital Literacy Program
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.75, delay: 0.2 }}
              className="mb-8 max-w-3xl text-lg sm:text-xl leading-relaxed text-white/95 font-medium"
            >
              The same discipline we teach in defence applies online: think, verify, and use tech to open doors.
              Bridging the gap between sports and technology for comprehensive youth development.
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
                <span className="relative z-10">Join Digital Program</span>
                <Users className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/programs/academy"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl border-2 border-white/30 bg-white/15 px-8 py-4 text-lg font-bold text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/25"
              >
                <span className="relative z-10">Football Academy</span>
                <Trophy className="relative z-10 h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Program Overview */}
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
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Program Overview</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Weekly-style workshops introduce youth to coding concepts, digital safety, and practical tools—
              always alongside our football calendar so no child has to choose between pitch and progress.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={scaleIn}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100"
          >
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Digital Literacy Matters</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  In today's digital world, technology skills are essential for success in education, career, and daily life. 
                  Our program ensures every young person has the opportunity to develop these crucial skills, regardless of their background.
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Flexible Schedule</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>Small Group Learning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    <span>Certificates</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-2xl p-4 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">100%</div>
                  <div className="text-sm text-gray-600">Free Access</div>
                </div>
                <div className="bg-green-50 rounded-2xl p-4 text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">4:1</div>
                  <div className="text-sm text-gray-600">Student Ratio</div>
                </div>
                <div className="bg-purple-50 rounded-2xl p-4 text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-1">50+</div>
                  <div className="text-sm text-gray-600">Youth Enrolled</div>
                </div>
                <div className="bg-amber-50 rounded-2xl p-4 text-center">
                  <div className="text-3xl font-bold text-amber-600 mb-1">20+</div>
                  <div className="text-sm text-gray-600">Devices Available</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modules Section */}
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
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Learning Modules</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive modules covering essential digital skills for the modern world
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12"
          >
            {modules.map((module, index) => (
              <ModuleCard
                key={module.title}
                title={module.title}
                description={module.description}
                topics={module.topics}
                duration={module.duration}
                icon={module.icon}
                color={module.color}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
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
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Program Benefits</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              What makes our digital literacy program unique and impactful
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={scaleIn}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes Section */}
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
                Learning Outcomes
              </h2>
              <p className="text-lg leading-relaxed text-gray-700 mb-8">
                Participants gain practical skills and confidence that translate to academic success, 
                career readiness, and empowered digital citizenship.
              </p>
              
              <ul className="space-y-4 mb-8">
                {outcomes.map((outcome, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-green-600 rounded-full" />
                    </div>
                    <span className="text-gray-700">{outcome}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-4">
                <Link href="/join" className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg">
                  Enroll Now
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/contact" className="group inline-flex items-center gap-2 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:border-gray-400 hover:bg-gray-50">
                  Learn More
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
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-3 right-3 w-16 h-16 bg-white/10 rounded-full blur-2xl" />
                <div className="absolute bottom-3 left-3 w-24 h-24 bg-white/10 rounded-full blur-3xl" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                      <Smartphone className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold">Tech Integration</h3>
                  </div>
                  
                  <p className="text-white/90 mb-6 leading-relaxed">
                    Our digital program seamlessly integrates with football training, 
                    creating a holistic development experience that prepares youth for the future.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
                      <div className="text-2xl font-bold mb-1">Hybrid</div>
                      <div className="text-sm text-white/80">Learning Model</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
                      <div className="text-2xl font-bold mb-1">Project</div>
                      <div className="text-sm text-white/80">Based Learning</div>
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
              <Heart className="w-4 h-4" />
              <span className="text-sm font-semibold">Support Digital Learning</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight">
              Help Bridge the Digital Divide
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Your support helps us provide devices, internet access, and quality instruction 
              to youth who need it most. Together, we can create digital opportunities for all.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/donate"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-white px-8 py-4 text-lg font-bold text-blue-600 shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10">Donate Devices</span>
                <Laptop className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl border-2 border-white/30 bg-white/15 px-8 py-4 text-lg font-bold text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/25"
              >
                <span className="relative z-10">Volunteer as Mentor</span>
                <Users className="relative z-10 h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
