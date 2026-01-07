'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { User } from 'lucide-react';

const cyclingPhrases = ['scale', 'automate', 'optimize growth'];

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
      className="text-center py-16 px-4"
    >
      {/* Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="inline-flex items-center justify-center w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg mb-8 border border-gray-100 dark:border-gray-700"
      >
        <User className="w-8 h-8 text-emerald-500" />
      </motion.div>

      {/* Name with slide-in animation */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white"
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

      {/* Single line with same boldness throughout */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="text-3xl md:text-5xl font-bold mb-6 min-h-[140px] flex flex-col items-center justify-center px-4"
      >
        <div className="max-w-5xl">
          <div className="text-gray-800 dark:text-gray-100 mb-3">
            AI Engineer focused on building
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-gray-800 dark:text-gray-100">intelligent agents that</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={currentPhraseIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-r from-emerald-500 to-amber-400 bg-clip-text text-transparent inline-block"
              >
                {cyclingPhrases[currentPhraseIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}