// components/TabNavigation.tsx - COMPLETE REPLACEMENT
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
    console.log('Tab clicked, sending prompt:', prompt); // Debug log
    onTabClick(prompt);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="flex justify-center gap-3 mb-6"
    >
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
          className="px-6 py-2.5 bg-white dark:bg-gray-800 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-amber-50 dark:hover:from-emerald-900/30 dark:hover:to-amber-900/30 border border-gray-200 dark:border-gray-700 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 transition-all duration-300 shadow-sm hover:shadow-md"
        >
          {tab.label}
        </motion.button>
      ))}
    </motion.div>
  );
}