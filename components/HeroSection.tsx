'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { User } from 'lucide-react';

const cyclingPhrases = ['scale', 'automate', 'optimize growth'];

// ✅ FIXED: Pre-defined particle positions (no Math.random())
const particlePositions = [
  { startX: -80, pathX: [-80, -60, -40], pathY: [0, 50, 100] },
  { startX: 60, pathX: [60, 40, 20], pathY: [0, 50, 100] },
  { startX: -30, pathX: [-30, -10, 10], pathY: [0, 50, 100] },
  { startX: 90, pathX: [90, 70, 50], pathY: [0, 50, 100] },
  { startX: 10, pathX: [10, 30, 50], pathY: [0, 50, 100] },
  { startX: -50, pathX: [-50, -70, -90], pathY: [0, 50, 100] },
  { startX: 70, pathX: [70, 90, 110], pathY: [0, 50, 100] },
  { startX: -70, pathX: [-70, -50, -30], pathY: [0, 50, 100] },
];

export default function HeroSection() {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prev) => (prev + 1) % cyclingPhrases.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="text-center py-8 sm:py-12 md:py-16 px-3 sm:px-4"
    >
      {/* Icon - Responsive sizes */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white dark:bg-gray-800 rounded-2xl shadow-lg mb-4 sm:mb-6 md:mb-8 border border-gray-100 dark:border-gray-700"
      >
        <User className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-emerald-500" />
      </motion.div>

      {/* Name - Responsive text sizes */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white px-2"
      >
        I&apos;m{' '}
        <motion.span 
          className="bg-gradient-to-r from-emerald-500 to-amber-400 bg-clip-text text-transparent inline-block"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Micheal Olaniyi
        </motion.span>
      </motion.h1>

      {/* Tagline with Stormy Word Frame */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-4 sm:mb-6 flex flex-col items-center justify-center px-2 sm:px-4"
      >
        <div className="max-w-5xl">
          <div className="text-gray-800 dark:text-gray-100 mb-3 sm:mb-4">
            AI/ML Engineer focused on building
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <span className="text-gray-800 dark:text-gray-100">intelligent agents that</span>
            
            {/* Stormy Animated Word Frame */}
            <div className="relative inline-block">
              {/* Animated border with glow effect */}
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(16, 185, 129, 0.3)',
                    '0 0 40px rgba(245, 158, 11, 0.4)',
                    '0 0 20px rgba(16, 185, 129, 0.3)',
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 rounded-2xl border-2 border-emerald-500 dark:border-emerald-400 bg-gradient-to-r from-emerald-50/80 to-amber-50/80 dark:from-emerald-900/20 dark:to-amber-900/20 backdrop-blur-sm"
              />
              
              {/* ✅ FIXED: Stormy particles with deterministic positions */}
              <motion.div
                className="absolute inset-0 rounded-2xl overflow-hidden"
                style={{ pointerEvents: 'none' }}
              >
                {particlePositions.map((particle, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-emerald-400 dark:bg-emerald-300 rounded-full"
                    initial={{ 
                      x: particle.startX, 
                      y: -10,
                      opacity: 0 
                    }}
                    animate={{
                      x: particle.pathX,
                      y: particle.pathY,
                      opacity: [0, 0.6, 0],
                      scale: [0, 1.5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </motion.div>

              {/* Word container with storm effect */}
              <div className="relative px-6 sm:px-8 md:px-10 py-3 sm:py-4 min-w-[160px] sm:min-w-[200px] md:min-w-[240px]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentPhraseIndex}
                    initial={{ 
                      opacity: 0, 
                      x: -60,
                      y: 10,
                      rotateX: -30,
                      filter: 'blur(4px)'
                    }}
                    animate={{ 
                      opacity: 1, 
                      x: 0,
                      y: 0,
                      rotateX: 0,
                      filter: 'blur(0px)',
                      transition: {
                        duration: 0.4,
                        ease: [0.34, 1.56, 0.64, 1]
                      }
                    }}
                    exit={{ 
                      opacity: 0, 
                      x: 60,
                      y: -10,
                      rotateX: 30,
                      filter: 'blur(4px)',
                      transition: {
                        duration: 0.3,
                        ease: "easeIn"
                      }
                    }}
                    className="bg-gradient-to-r from-emerald-600 to-amber-500 bg-clip-text text-transparent inline-block font-extrabold"
                    style={{ 
                      textShadow: '0 0 20px rgba(16, 185, 129, 0.3)',
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    {cyclingPhrases[currentPhraseIndex]}
                  </motion.span>
                </AnimatePresence>

                {/* Wind lines effect */}
                <motion.div
                  className="absolute top-1/2 left-0 right-0 h-[1px]"
                  animate={{
                    opacity: [0, 0.3, 0],
                    scaleX: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className="w-full h-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />
                </motion.div>
              </div>

              {/* Corner accent decorations */}
              <motion.div
                className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-emerald-500 dark:border-emerald-400 rounded-tl-lg"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-amber-500 dark:border-amber-400 rounded-tr-lg"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
              <motion.div
                className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-emerald-500 dark:border-emerald-400 rounded-bl-lg"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              />
              <motion.div
                className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-amber-500 dark:border-amber-400 rounded-br-lg"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}