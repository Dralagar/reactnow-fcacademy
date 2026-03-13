// components/CTASection.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Users, HandHeart } from "lucide-react";

export default function CTASection() {
  const options = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Join as Player",
      description: "Be part of our academy and develop your skills",
      href: "/join/player",
      color: "blue"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Volunteer",
      description: "Share your time and expertise",
      href: "/join/volunteer",
      color: "green"
    },
    {
      icon: <HandHeart className="w-8 h-8" />,
      title: "Partner With Us",
      description: "Collaborate for greater impact",
      href: "/join/partner",
      color: "purple"
    }
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background with parabolic pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 20 L40 20 M20 0 L20 40" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white/20 rounded-full"
          animate={{
            x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
            y: [Math.random() * 600, Math.random() * 600],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white mb-16">
          <motion.h2 
            className="text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Join the React Now FC Movement
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Become part of a journey where football empowers youth, builds leaders, 
            and creates real opportunities for the future.
          </motion.p>
        </div>

        {/* Options grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {options.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              <Link href={option.href}>
                <motion.div
                  className="group bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-white hover:bg-white/20 transition-all cursor-pointer"
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="mb-6 text-white/80 group-hover:scale-110 transition-transform">
                    {option.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{option.title}</h3>
                  <p className="text-white/80 mb-6">{option.description}</p>
                  <div className="flex items-center text-white/90 group-hover:text-white">
                    <span className="mr-2">Learn more</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Main CTA buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <Link
            href="/join/donate"
            className="group relative px-10 py-5 bg-white text-primary rounded-xl font-bold text-lg overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Support Our Mission
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </span>
            <motion.div
              className="absolute inset-0 bg-gray-100"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </Link>

          <Link
            href="/contact"
            className="px-10 py-5 border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white hover:text-primary transition-all"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
}