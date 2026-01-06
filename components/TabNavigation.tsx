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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="flex flex-wrap justify-center gap-3 mb-8"
    >
      {tabs.map((tab, index) => (
        <motion.button
          key={tab.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onTabClick(tab.prompt)}
          className="px-6 py-2.5 bg-white text-gray-700 rounded-full shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-emerald-400 font-medium text-sm"
        >
          {tab.label}
        </motion.button>
      ))}
    </motion.div>
  );
}
