// components/TabNavigation.tsx - MOBILE RESPONSIVE
'use client';

import { motion } from 'framer-motion';

interface Tab {
  id: string;
  label: string;
  prompt: string;
}

interface TabNavigationProps {
  tabs: Tab[];
  onTabClick: (prompt: string) => void;
}

export default function TabNavigation({ tabs, onTabClick }: TabNavigationProps) {
  const handleClick = (prompt: string) => {
    console.log('Tab clicked, sending prompt:', prompt);
    onTabClick(prompt);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="mb-6 overflow-x-auto pb-2"
    >
      {/* Horizontal scroll container for mobile */}
      <div className="flex justify-start md:justify-center gap-2 sm:gap-3 min-w-min px-2 sm:px-0">
        {tabs.map((tab, idx) => (
          <motion.button
            key={tab.id}
            type="button"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.5 + idx * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick(tab.prompt)}
            className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 bg-white dark:bg-gray-800 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-amber-50 dark:hover:from-emerald-900/30 dark:hover:to-amber-900/30 border border-gray-200 dark:border-gray-700 rounded-full text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 transition-all duration-300 shadow-sm hover:shadow-md whitespace-nowrap flex-shrink-0"
          >
            {tab.label}
          </motion.button>
        ))}
      </div>

      {/* Scroll indicator hint for mobile */}
      <style jsx>{`
        /* Hide scrollbar but keep functionality */
        .overflow-x-auto::-webkit-scrollbar {
          height: 4px;
        }
        .overflow-x-auto::-webkit-scrollbar-track {
          background: transparent;
        }
        .overflow-x-auto::-webkit-scrollbar-thumb {
          background: rgba(16, 185, 129, 0.3);
          border-radius: 2px;
        }
        .overflow-x-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(16, 185, 129, 0.5);
        }
      `}</style>
    </motion.div>
  );
}