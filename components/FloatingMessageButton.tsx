// components/FloatingMessageButton.tsx
'use client';

import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface FloatingMessageButtonProps {
  onClick: () => void;
}

export default function FloatingMessageButton({ onClick }: FloatingMessageButtonProps) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="fixed top-4 left-4 z-40 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-amber-400 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
      aria-label="Send instant message"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="text-sm font-medium hidden sm:inline">Quick Message</span>
    </motion.button>
  );
}