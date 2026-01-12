// app/page.tsx - COMPLETE REPLACEMENT
'use client';

import { useState, useEffect } from 'react';
import BackgroundPattern from '@/components/BackgroundPattern';
import HeroSection from '@/components/HeroSection';
import ChatInterface from '@/components/ChatInterface';
import CVButton from '@/components/CVButton';
import DarkModeToggle from '@/components/DarkModeToggle';

export default function Home() {
  // Scroll to top on page load/refresh
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <main className="min-h-screen relative">
      <BackgroundPattern />
      
      {/* CV Download Button - Top Left */}
      <CVButton resumeUrl="https://drive.google.com/file/d/1rgn2KCGlQD3kVi6sibt5HOTJbX9PHMf5/view" />
      
      {/* Dark Mode Toggle - Top Right */}
      <DarkModeToggle />
      
      <div className="relative z-10 container mx-auto py-8">
        <HeroSection />
        
        {/* ChatInterface has TabNavigation built-in now */}
        <ChatInterface />
      </div>
    </main>
  );
}