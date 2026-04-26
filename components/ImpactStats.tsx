// components/ImpactStats.tsx
"use client";

import { motion } from "framer-motion";
import { Users, Globe, Zap, Target, Heart, TrendingUp } from "lucide-react";
const stats = [
  { 
    icon: <Users className="w-8 h-8" />, 
    value: "50zx+", 
    label: "Youth Athletes",
    change: "+15 this year",
    color: "blue"
  },
  { 
    icon: <Globe className="w-8 h-8" />, 
    value: "12", 
    label: "Countries Represented",
    change: "Growing",
    color: "green"
  },
  { 
    icon: <Zap className="w-8 h-8" />, 
    value: "100%", 
    label: "Free to Participate",
    change: "Always free",
    color: "yellow"
  },
  { 
    icon: <Heart className="w-8 h-8" />, 
    value: "95%", 
    label: "Parent Satisfaction",
    change: "+5% vs last year",
    color: "red"
  },
  { 
    icon: <Target className="w-8 h-8" />, 
    value: "156", 
    label: "Goals Scored",
    change: "+34 this season",
    color: "purple"
  },
  { 
    icon: <TrendingUp className="w-8 h-8" />, 
    value: "85%", 
    label: "School Attendance",
    change: "Above average",
    color: "indigo"
  }
];

const colorClasses = {
  blue: "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
  green: "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400",
  yellow: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400",
  red: "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400",
  purple: "bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
  indigo: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400"
};

export default function ImpactStats() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
            Our Impact in Numbers
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Every number represents a life changed, a dream nurtured, and a future transformed
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Icon */}
              <div className={`${colorClasses[stat.color as keyof typeof colorClasses]} w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>

              {/* Value and label */}
              <div className="relative">
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-300 font-medium mb-2">{stat.label}</div>
                <div className="text-sm text-primary">{stat.change}</div>
              </div>

              {/* Progress bar */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary-dark rounded-b-2xl"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                style={{ originX: 0 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Additional metrics */}
        <motion.div
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <div className="text-center p-4">
            <div className="text-2xl font-bold text-primary">24+</div>
            <div className="text-sm text-gray-500">Community Events</div>
          </div>
          <div className="text-center p-4">
            <div className="text-2xl font-bold text-primary">500+</div>
            <div className="text-sm text-gray-500">Volunteer Hours</div>
          </div>
          <div className="text-center p-4">
            <div className="text-2xl font-bold text-primary">150+</div>
            <div className="text-sm text-gray-500">Trees Planted</div>
          </div>
          <div className="text-center p-4">
            <div className="text-2xl font-bold text-primary">200+</div>
            <div className="text-sm text-gray-500">Kids Mentored</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}