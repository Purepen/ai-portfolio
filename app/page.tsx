// app/page.tsx - FIXED ALIGNMENT
'use client';

import { useState, useEffect } from 'react';
import BackgroundPattern from '@/components/BackgroundPattern';
import HeroSection from '@/components/HeroSection';
import ChatInterface from '@/components/ChatInterface';
import CVButton from '@/components/CVButton';
import DarkModeToggle from '@/components/DarkModeToggle';
import FloatingMessageButton from '@/components/FloatingMessageButton';

export default function Home() {
  const [triggerMessage, setTriggerMessage] = useState<string | null>(null);

  // Scroll to top on page load/refresh
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleQuickMessage = () => {
    setTriggerMessage('lets talk ASAP');
    // Reset after trigger
    setTimeout(() => setTriggerMessage(null), 100);
  };

  return (
    <main className="min-h-screen relative">
      <BackgroundPattern />
      
      {/* Floating Message Button - Top Left */}
      <FloatingMessageButton onClick={handleQuickMessage} />
      
      {/* CV Download Button - Below Message Button */}
      <div className="fixed top-20 left-4 z-30">
        <CVButton resumeUrl="https://drive.google.com/file/d/1rgn2KCGlQD3kVi6sibt5HOTJbX9PHMf5/view" />
      </div>
      
      {/* Dark Mode Toggle - Top Right (unchanged) */}
      <DarkModeToggle />
      
      <div className="relative z-10 container mx-auto py-8">
        <HeroSection />
        
        {/* ChatInterface with trigger message prop */}
        <ChatInterface triggerMessage={triggerMessage} />
      </div>
    </main>
  );
}