// app/page.tsx - WITH AUTO-SCROLL ON MESSAGE
'use client';

import { useState, useEffect, useRef } from 'react';
import BackgroundPattern from '@/components/BackgroundPattern';
import HeroSection from '@/components/HeroSection';
import ChatInterface from '@/components/ChatInterface';
import CVButton from '@/components/CVButton';
import DarkModeToggle from '@/components/DarkModeToggle';
import FloatingMessageButton from '@/components/FloatingMessageButton';

export default function Home() {
  const [triggerMessage, setTriggerMessage] = useState<string | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  // Scroll to top on page load/refresh
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // ✅ AUTO-SCROLL: Listen for chat expansion/messages
  useEffect(() => {
    const handleChatActivity = () => {
      // Small delay to let content render
      setTimeout(() => {
        if (chatRef.current) {
          chatRef.current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }
      }, 300);
    };

    // Listen for custom events from ChatInterface
    window.addEventListener('chat-expanded', handleChatActivity);
    window.addEventListener('message-sent', handleChatActivity);

    return () => {
      window.removeEventListener('chat-expanded', handleChatActivity);
      window.removeEventListener('message-sent', handleChatActivity);
    };
  }, []);

  const handleQuickMessage = () => {
    setTriggerMessage('lets talk ASAP');
    // Reset after trigger
    setTimeout(() => setTriggerMessage(null), 100);
  };

  return (
    <main className="min-h-screen relative overflow-x-hidden">
      <BackgroundPattern />
      
      {/* Floating Message Button - Top Left */}
      <FloatingMessageButton onClick={handleQuickMessage} />
      
      {/* CV Download Button - Below Message Button */}
      <div className="fixed top-20 left-4 z-30">
        <CVButton resumeUrl="https://drive.google.com/file/d/1rgn2KCGlQD3kVi6sibt5HOTJbX9PHMf5/view" />
      </div>
      
      {/* Dark Mode Toggle - Top Right (unchanged) */}
      <DarkModeToggle />
      
      {/* Main content with responsive padding */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        <HeroSection />
        
        {/* ✅ Ref for auto-scroll target */}
        <div ref={chatRef}>
          <ChatInterface triggerMessage={triggerMessage} />
        </div>
      </div>
    </main>
  );
}