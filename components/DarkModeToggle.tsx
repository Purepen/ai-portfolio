// components/DarkModeToggle.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));
    
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      onClick={toggleDarkMode}
      className="fixed top-6 right-6 z-50 p-3 bg-white dark:bg-gray-800 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-amber-400 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 group"
      aria-label="Toggle dark mode"
    >
      {darkMode ? (
        <Sun className="w-6 h-6 text-gray-800 dark:text-gray-200 group-hover:text-white transition-colors" />
      ) : (
        <Moon className="w-6 h-6 text-gray-800 dark:text-gray-200 group-hover:text-white transition-colors" />
      )}
    </motion.button>
  );
}