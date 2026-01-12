// components/ChatInterface.tsx - WITH CERTIFICATIONS TAB
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Mic } from 'lucide-react';
import { useChat } from 'ai/react';
import { parseResponse } from '@/lib/component-parser';
import LoadingDots from './LoadingDots';
import TabNavigation from './TabNavigation';

const placeholderMessages = [
  "Tell me about yourself and your background?",
  "What are your core skills and technical expertise?",
  "What projects have you worked on?",
  "Tell me about your work experience?",
  "What certifications do you have?",
  "How can I contact you?"
];

const TAB_QUESTIONS = {
  intro: "Tell me about yourself and your background?",
  skills: "What are your core skills and technical expertise?",
  projects: "What projects have you worked on?",
  experience: "Tell me about your work experience?",
  certifications: "What certifications and credentials do you have?",
  contact: "How can I contact you?"
};

export default function ChatInterface() {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages, append } = useChat({
    api: '/api/chat',
    initialMessages: [
      {
        id: '1',
        role: 'assistant',
        content: "Greetings, I am Micheal Olaniyi. Feel free to ask about my experience, projects, skills, certifications, and more. What would you like to know?",
      },
    ],
    onResponse: () => {
      setIsExpanded(true);
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholderMessages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);


  ///trial by mike for skills handler
  useEffect(() => {
    const handler = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      if (!customEvent.detail) return;

      if (!isExpanded) setIsExpanded(true);

      append({
        role: 'user',
        content: customEvent.detail
      });
    };

    window.addEventListener('skill-question', handler);
    return () => {
      window.removeEventListener('skill-question', handler);
    };
  }, [append, isExpanded]);
///end of trial by mike for skills handler



  const handleClearChat = () => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: "Greetings, I am Micheal Olaniyi. Feel free to ask about my experience, projects, skills, certifications, and more. What would you like to know?",
      },
    ]);
    setIsExpanded(false);
  };

  const handleTabClick = (prompt: string) => {
    console.log('Tab clicked with prompt:', prompt);
    if (!isExpanded) setIsExpanded(true);
    
    append({
      role: 'user',
      content: prompt
    });
  };


   
  // // ✅ NEW: Skill click handler
  // const handleSkillQuestion = (question: string) => {
  //   if (!isExpanded) setIsExpanded(true);

  //   append({
  //     role: 'user',
  //     content: question,
  //   });
  // };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className="max-w-4xl mx-auto px-4"
    >
      <TabNavigation 
        tabs={[
          { id: 'intro', label: 'Intro', prompt: TAB_QUESTIONS.intro },
          { id: 'skills', label: 'Skills', prompt: TAB_QUESTIONS.skills },
          { id: 'projects', label: 'Projects', prompt: TAB_QUESTIONS.projects },
          { id: 'experience', label: 'Experience', prompt: TAB_QUESTIONS.experience },
          { id: 'certifications', label: 'Certifications', prompt: TAB_QUESTIONS.certifications },
          { id: 'contact', label: 'Contact', prompt: TAB_QUESTIONS.contact }
        ]}
        onTabClick={handleTabClick}
      />

      {isExpanded && (
        <>
          {messages.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex justify-end mb-3"
            >
              <button
                onClick={handleClearChat}
                className="group flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-900/30 border border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-500 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Clear Chat
              </button>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.4 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 mb-6 overflow-hidden"
          >
            <div className="h-[500px] overflow-y-auto p-6">
              {messages.map((message, index) => 
                parseResponse(message.content, message.role === 'user', index)
              )}

              {isLoading && (
                <div className="flex justify-start">
                  <LoadingDots />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </motion.div>
        </>
      )}

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        onSubmit={(e) => {
          e.preventDefault();
          if (!isExpanded) setIsExpanded(true);
          handleSubmit(e);
        }}
        className="relative"
      >
        <div className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-100 dark:border-gray-700 px-6 py-4">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder={placeholderMessages[placeholderIndex]}
            className="flex-1 bg-transparent outline-none text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-300"
            disabled={isLoading}
          />

          <button
            type="button"
            className="p-2 text-gray-400 dark:text-gray-500 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
            aria-label="Voice input"
          >
            <Mic className="w-5 h-5" />
          </button>

          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-3 bg-gradient-to-r from-emerald-500 to-amber-400 text-white rounded-full hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </motion.form>
    </motion.div>
  );
}