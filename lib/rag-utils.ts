import { portfolioData } from './portfolio-data';
import { PortfolioData } from './types';

/**
 * Simple keyword-based RAG retrieval
 * Returns relevant portfolio context based on user query
 */
export function retrieveContext(query: string): string {
  const lowerQuery = query.toLowerCase();
  let context = '';
  
  // Always include basic info
  context += `# About ${portfolioData.name}\n`;
  context += `Title: ${portfolioData.title}\n`;
  context += `Location: ${portfolioData.location}\n\n`;
  
  // Intro/Background/Summary keywords
  if (lowerQuery.includes('intro') || lowerQuery.includes('about') || 
      lowerQuery.includes('background') || lowerQuery.includes('who') ||
      lowerQuery.includes('yourself') || lowerQuery.includes('summary')) {
    context += `## Professional Summary\n${portfolioData.summary}\n\n`;
  }
  
  // Skills keywords
  if (lowerQuery.includes('skill') || lowerQuery.includes('tech') || 
      lowerQuery.includes('expertise') || lowerQuery.includes('know') ||
      lowerQuery.includes('proficien') || lowerQuery.includes('capabilit')) {
    context += `## Skills\n`;
    portfolioData.skills.forEach(skillCategory => {
      context += `\n### ${skillCategory.category}\n`;
      skillCategory.items.forEach(item => {
        context += `- ${item}\n`;
      });
    });
    context += '\n';
  }
  
  // Projects keywords
  if (lowerQuery.includes('project') || lowerQuery.includes('built') || 
      lowerQuery.includes('created') || lowerQuery.includes('developed') ||
      lowerQuery.includes('portfolio') || lowerQuery.includes('work')) {
    context += `## Projects\n`;
    portfolioData.projects.forEach(project => {
      context += `\n### ${project.name}\n`;
      context += `- Category: ${project.category}\n`;
      context += `- Year: ${project.year}\n`;
      context += `- Status: ${project.status}\n`;
      context += `- Description: ${project.description}\n`;
      context += `- Tech Stack: ${project.techStack.join(', ')}\n`;
      if (project.links?.github) {
        context += `- GitHub: ${project.links.github}\n`;
      }
      if (project.links?.demo) {
        context += `- Demo: ${project.links.demo}\n`;
      }
    });
    context += '\n';
  }
  
  // Experience keywords
  if (lowerQuery.includes('experience') || lowerQuery.includes('work') || 
      lowerQuery.includes('job') || lowerQuery.includes('role') ||
      lowerQuery.includes('career') || lowerQuery.includes('employ')) {
    context += `## Work Experience\n`;
    portfolioData.experience.forEach(exp => {
      context += `\n### ${exp.title} at ${exp.company}\n`;
      context += `- Location: ${exp.location}\n`;
      context += `- Period: ${exp.period}\n`;
      context += `- Type: ${exp.type}\n`;
      context += `- Description: ${exp.description}\n`;
      context += `- Key Achievements:\n`;
      exp.achievements.forEach(achievement => {
        context += `  * ${achievement}\n`;
      });
      if (exp.techStack) {
        context += `- Technologies: ${exp.techStack.join(', ')}\n`;
      }
    });
    context += '\n';
  }
  
  // Contact keywords
  if (lowerQuery.includes('contact') || lowerQuery.includes('reach') || 
      lowerQuery.includes('email') || lowerQuery.includes('phone') ||
      lowerQuery.includes('linkedin') || lowerQuery.includes('github') ||
      lowerQuery.includes('connect')) {
    context += `## Contact Information\n`;
    context += `- Email: ${portfolioData.email}\n`;
    context += `- Phone: ${portfolioData.phone.join(', ')}\n`;
    context += `- LinkedIn: ${portfolioData.linkedin}\n`;
    context += `- GitHub: ${portfolioData.github}\n`;
    context += `- Portfolio: ${portfolioData.portfolio}\n\n`;
  }
  
  // Education keywords
  if (lowerQuery.includes('education') || lowerQuery.includes('degree') || 
      lowerQuery.includes('school') || lowerQuery.includes('university') ||
      lowerQuery.includes('stud')) {
    context += `## Education\n`;
    portfolioData.education.forEach(edu => {
      context += `- ${edu}\n`;
    });
    context += '\n';
  }
  
  // Certification keywords
  if (lowerQuery.includes('certif') || lowerQuery.includes('credential') ||
      lowerQuery.includes('license')) {
    context += `## Certifications\n`;
    portfolioData.certifications.forEach(cert => {
      context += `- ${cert}\n`;
    });
    context += '\n';
  }
  
  return context.trim();
}

/**
 * Generate system prompt with relevant context
 */
export function generateSystemPrompt(userQuery: string): string {
  const context = retrieveContext(userQuery);
  
  return `You are an AI assistant representing Micheal Olaniyi Oluwatosin, an AI/ML Engineer with 4+ years of experience.

Your role is to answer questions about Micheal's professional background, skills, projects, and experience in a natural, conversational, and professional manner.

# Guidelines:
- Be concise but informative
- Use first person ("I") when speaking as Micheal
- Be enthusiastic about AI/ML projects and technical achievements
- If asked about something not in the context, politely mention you don't have that specific information
- Keep responses focused and relevant to the question
- Maintain a professional yet approachable tone

# Context:
${context}

Now respond to the user's question naturally and professionally.`;
}
