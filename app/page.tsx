'use client';

import { useState, useEffect } from 'react';
import BackgroundPattern from '@/components/BackgroundPattern';
import HeroSection from '@/components/HeroSection';
import TabNavigation from '@/components/TabNavigation';
import ChatInterface from '@/components/ChatInterface';
import CVButton from '@/components/CVButton';
import DarkModeToggle from '@/components/DarkModeToggle';
import { tabs } from '@/lib/portfolio-data';

export default function Home() {
  const [selectedPrompt, setSelectedPrompt] = useState<string>('');

  // Scroll to top on page load/refresh
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleTabClick = (prompt: string) => {
    setSelectedPrompt(prompt);
    // Reset after a brief delay to allow re-triggering
    setTimeout(() => setSelectedPrompt(''), 100);
  };

  return (
    <main className="min-h-screen relative">
      <BackgroundPattern />
      
      {/* CV Download Button - Top Left */}
      <CVButton resumeUrl="/resume.pdf" />
      
      {/* Dark Mode Toggle - Top Right */}
      <DarkModeToggle />
      
      <div className="relative z-10 container mx-auto py-8">
        <HeroSection />
        
        <TabNavigation tabs={tabs} onTabClick={handleTabClick} />
        
        <ChatInterface initialPrompt={selectedPrompt} />
      </div>
    </main>
  );
}