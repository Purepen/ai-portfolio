'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Mic } from 'lucide-react';
import MessageBubble from './MessageBubble';
import SkillsResponse from './SkillsResponse';
import ExperienceResponse from './ExperienceResponse';
import ProjectsResponse from './ProjectsResponse';
import ContactResponse from './ContactResponse';
import LoadingDots from './LoadingDots';
import { Message } from '@/lib/types';

interface ChatInterfaceProps {
  initialPrompt?: string;
}

const placeholderMessages = [
  "Tell me about yourself and your background?",
  "What are your core skills and technical expertise?",
  "What projects have you worked on?",
  "Tell me about your work experience?",
  "How can I contact you?"
];

export default function ChatInterface({ initialPrompt }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Greetings, I am Micheal Olaniyi. Feel free to ask about my experience, projects, skills, and more. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Clear chat function
  const handleClearChat = () => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: "Greetings, I am Micheal Olaniyi. Feel free to ask about my experience, projects, skills, and more. What would you like to know?",
        timestamp: new Date(),
      },
    ]);
    setInput('');
    setIsExpanded(false);
  };

  // Cycle through placeholder messages
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholderMessages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Handle initial prompt from tab clicks - AUTO SUBMIT
  useEffect(() => {
    if (initialPrompt && initialPrompt.trim()) {
      setInput(initialPrompt);
      setIsExpanded(true);
      setTimeout(() => {
        handleSubmitWithMessage(initialPrompt);
      }, 100);
    }
  }, [initialPrompt]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSkillClick = async (skillName: string) => {
    const prompt = `Tell me about your experience with ${skillName}`;
    // DON'T hide skills UI - keep it visible
    // setShowSkillsUI(false); // REMOVED
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: prompt,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Call RAG directly (skip skills UI check)
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I apologize, but I encountered an error. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitWithMessage = async (message: string) => {
    if (!message.trim() || isLoading) return;

    setIsExpanded(true);

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: message.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Check if asking about skills - EXACT match only
    const lowerMessage = message.toLowerCase().trim();
    const isExactSkillsQuestion = 
      lowerMessage === 'what are your core skills and technical expertise?' ||
      lowerMessage === 'what are your skills?' ||
      lowerMessage === 'tell me about your skills';
    
    if (isExactSkillsQuestion) {
      // Add skills UI as a special message type in history
      const skillsMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'SKILLS_UI', // Special marker
        type: 'skills',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, skillsMessage]);
      return; // EXIT HERE - don't continue to API call
    }

    // Check if asking about experience - EXACT match only
    const isExactExperienceQuestion =
      lowerMessage === 'tell me about your work experience?' ||
      lowerMessage === 'what is your work experience?' ||
      lowerMessage === 'tell me about your experience';
    
    if (isExactExperienceQuestion) {
      // Add experience UI as a special message type in history
      const experienceMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'EXPERIENCE_UI', // Special marker
        type: 'experience',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, experienceMessage]);
      return; // EXIT HERE - don't continue to API call
    }

    // Check if asking about projects - EXACT match only
    const isExactProjectsQuestion =
      lowerMessage === 'what projects have you worked on?' ||
      lowerMessage === 'tell me about your projects' ||
      lowerMessage === 'show me your projects';
    
    if (isExactProjectsQuestion) {
      // Add projects UI as a special message type in history
      const projectsMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'PROJECTS_UI', // Special marker
        type: 'projects',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, projectsMessage]);
      return; // EXIT HERE - don't continue to API call
    }

    // Check if asking about contact - EXACT match only
    const isExactContactQuestion =
      lowerMessage === 'how can i contact you?' ||
      lowerMessage === 'what is your contact information?' ||
      lowerMessage === 'how do i reach you?';
    
    if (isExactContactQuestion) {
      // Add contact UI as a special message type in history
      const contactMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'CONTACT_UI', // Special marker
        type: 'contact',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, contactMessage]);
      return; // EXIT HERE - don't continue to API call
    }

    // If not any special UI question, proceed with normal RAG call
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I apologize, but I encountered an error. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmitWithMessage(input);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className="max-w-4xl mx-auto px-4"
    >
      {/* Chat messages container - only show when expanded */}
      {isExpanded && (
        <>
          {/* Clear Chat Button - only show if more than 1 message */}
          {messages.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex justify-end mb-3"
            >
              <button
                onClick={handleClearChat}
                className="group flex items-center gap-2 px-4 py-2 bg-white hover:bg-red-50 border border-gray-200 hover:border-red-300 rounded-full text-sm font-medium text-gray-600 hover:text-red-600 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                  />
                </svg>
                Clear Chat
              </button>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 mb-6 overflow-hidden"
          >
          <div className="h-[500px] overflow-y-auto p-6">
            {messages.map((message, index) => (
              message.type === 'skills' ? (
                // Render SkillsResponse for skills type messages
                <SkillsResponse key={message.id} onSkillClick={handleSkillClick} />
              ) : message.type === 'experience' ? (
                // Render ExperienceResponse for experience type messages
                <ExperienceResponse key={message.id} />
              ) : message.type === 'projects' ? (
                // Render ProjectsResponse for projects type messages
                <ProjectsResponse key={message.id} />
              ) : message.type === 'contact' ? (
                // Render ContactResponse for contact type messages
                <ContactResponse key={message.id} />
              ) : (
                // Render normal message bubble
                <MessageBubble
                  key={message.id}
                  content={message.content}
                  isUser={message.role === 'user'}
                  index={index}
                />
              )
            ))}
            
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

      {/* Input form - always visible */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        onSubmit={handleSubmit}
        className="relative"
      >
        <div className="flex items-center gap-3 bg-white rounded-full shadow-lg border border-gray-100 px-6 py-4">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholderMessages[placeholderIndex]}
            className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400 transition-all duration-300"
            disabled={isLoading}
          />
          
          <button
            type="button"
            className="p-2 text-gray-400 hover:text-emerald-500 transition-colors"
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