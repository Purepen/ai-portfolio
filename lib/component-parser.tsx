// lib/component-parser.tsx - FIXED: No JSON required
import React from 'react';
import SkillsResponse from '@/components/SkillsResponse';
import ProjectsResponse from '@/components/Projectsresponse';
import ExperienceResponse from '@/components/Experienceresponse';
import ContactResponse from '@/components/Contactresponse';
import CertificationsResponse from '@/components/Certificationsresponse';
import RecommendationsResponse from '@/components/Recommendationsresponse';
import MessageBubble from '@/components/MessageBubble';

export function parseResponse(
  content: string, 
  isUser: boolean, 
  index: number
): JSX.Element | JSX.Element[] {
  if (isUser) {
    return <MessageBubble key={`user-${index}`} content={content} isUser={true} index={index} />;
  }

  const elements: JSX.Element[] = [];
  
  const firstComponentIndex = content.search(/\[COMPONENT:/);
  const textContent = firstComponentIndex > -1 
    ? content.substring(0, firstComponentIndex).trim()
    : content;

  if (textContent) {
    elements.push(
      <MessageBubble 
        key={`text-${index}`}
        content={textContent}
        isUser={false}
        index={index}
      />
    );
  }

  // Updated regex to handle empty component tags
  const componentRegex = /\[COMPONENT:(\w+)(?:\s+filter="([^"]*)")?\]\s*(?:\{[\s\S]*?\})?\s*\[\/COMPONENT:\1\]/g;
  let match;
  let componentCount = 0;

  while ((match = componentRegex.exec(content)) !== null) {
    const [fullMatch, componentType, filter] = match;
    componentCount++;
    
    const key = `${componentType}-${index}-${componentCount}`;
    
    // Components use their hardcoded data, filter is optional
    switch (componentType) {
      case 'projects':
        elements.push(
          <ProjectsResponse 
            key={key}
            filter={filter}
          />
        );
        break;
        
      case 'skills':
        elements.push(
          <SkillsResponse 
            key={key}
            filter={filter}
            onSkillClick={(skill) => console.log('Skill clicked:', skill)}
          />
        );
        break;
        
      case 'experience':
        elements.push(
          <ExperienceResponse 
            key={key}
            filter={filter}
          />
        );
        break;
        
      case 'certifications':
        elements.push(
          <CertificationsResponse 
            key={key}
            filter={filter}
          />
        );
        break;
        
      case 'contact':
        elements.push(
          <ContactResponse 
            key={key}
          />
        );
        break;
        
      case 'recommendations':
        elements.push(
          <RecommendationsResponse 
            key={key}
            filter={filter}
          />
        );
        break;
    }
  }

  if (elements.length === 0) {
    return <MessageBubble key={`fallback-${index}`} content={content} isUser={false} index={index} />;
  }

  if (elements.length === 1) {
    return elements[0];
  }

  return <React.Fragment key={`fragment-${index}`}>{elements}</React.Fragment>;
}

export function hasComponents(content: string): boolean {
  return /\[COMPONENT:\w+\]/.test(content);
}

export function extractTextOnly(content: string): string {
  const firstComponentIndex = content.search(/\[COMPONENT:/);
  if (firstComponentIndex === -1) {
    return content;
  }
  return content.substring(0, firstComponentIndex).trim();
}