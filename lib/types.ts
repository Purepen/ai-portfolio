export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type?: 'text' | 'skills' | 'experience' | 'projects' | 'contact'; // Add contact type
}

export interface Project {
  name: string;
  category: string;
  year: string;
  status: string;
  description: string;
  techStack: string[];
  links?: {
    github?: string;
    demo?: string;
  };
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  type: string;
  description: string;
  achievements: string[];
  techStack?: string[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface PortfolioData {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string[];
  linkedin: string;
  github: string;
  portfolio: string;
  summary: string;
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
  education: string[];
  certifications: string[];
  languages: string[];
}

export interface TabType {
  id: string;
  label: string;
  prompt: string;
}