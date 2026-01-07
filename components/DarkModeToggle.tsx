'use client';

import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  // Load dark mode preference from localStorage on mount
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const shouldBeDark = savedMode === 'true' || (!savedMode && prefersDark);
    setIsDark(shouldBeDark);
    
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  };

  return (
    <div className="fixed top-6 right-6 z-50">
      <button
        onClick={toggleDarkMode}
        className="group relative w-14 h-14 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 overflow-hidden"
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {/* Sun Icon (Light Mode) */}
        <Sun 
          className={`absolute w-6 h-6 text-amber-500 transition-all duration-500 ${
            isDark 
              ? 'opacity-0 rotate-90 scale-0' 
              : 'opacity-100 rotate-0 scale-100'
          }`}
        />
        
        {/* Moon Icon (Dark Mode) */}
        <Moon 
          className={`absolute w-6 h-6 text-blue-400 transition-all duration-500 ${
            isDark 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 -rotate-90 scale-0'
          }`}
        />

        {/* Animated background circle */}
        <div 
          className={`absolute inset-0 rounded-full transition-all duration-500 ${
            isDark 
              ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 scale-100' 
              : 'bg-gradient-to-br from-amber-500/20 to-orange-500/20 scale-0'
          }`}
        />
      </button>

      {/* Tooltip - only shows on hover */}
      <div className="absolute top-full right-0 mt-2 px-3 py-1 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
        {isDark ? 'Light Mode' : 'Dark Mode'}
      </div>
    </div>
  );
}