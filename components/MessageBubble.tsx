'use client';

import { motion } from 'framer-motion';

interface MessageBubbleProps {
  content: string;
  isUser: boolean;
  index: number;
}

export default function MessageBubble({ content, isUser, index }: MessageBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-5 py-3 ${
          isUser
            ? 'bg-gradient-to-r from-emerald-500 to-amber-400 text-white'
            : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-md border border-gray-100 dark:border-gray-700'
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
      </div>
    </motion.div>
  );
}