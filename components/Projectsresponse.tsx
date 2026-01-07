'use client';

import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  year: string;
  category: string;
  status: string;
  description: string;
  techStack: string[];
  github?: string;
  liveDemo?: string;
  featured?: boolean; // For gradient text
}

const projects: Project[] = [
  {
    id: '1',
    name: 'AI Banking Assistant',
    year: '2025',
    category: 'AI Tools',
    status: 'Completed',
    description: 'Voice-enabled banking system with 8 specialized agents, secure 2FA, and real-time processing serving 700+ users. Achieved sub-2-second response times with optimized async processing.',
    techStack: ['Python', 'FastAPI', 'AsyncIO', 'SQLite', 'Gradio', 'OpenAI GPT-4o-mini', 'Whisper API', 'TTS-1'],
    github: 'https://github.com/micheal-olaniyi/ai-banking-assistant',
    liveDemo: 'https://ai-banking-assistant.vercel.app',
    featured: true
  },
  {
    id: '2',
    name: 'CFO AI Assistant v2',
    year: '2025',
    category: 'AI Tools',
    status: 'Completed',
    description: 'Advanced multi-agent financial intelligence system for Nigerian bank CFOs with intelligent query routing and RAG pipeline achieving 95%+ accuracy.',
    techStack: ['Python', 'Claude Sonnet 4', 'LangChain', 'LangGraph', 'ChromaDB', 'Sentence Transformers', 'FastAPI'],
    github: 'https://github.com/micheal-olaniyi/cfo-ai-assistant-v2',
    liveDemo: 'https://cfo-ai-assistant-v2.vercel.app',
    featured: true
  },
  {
    id: '3',
    name: 'CFO AI Assistant v1',
    year: '2024',
    category: 'AI Tools',
    status: 'Completed',
    description: 'Initial version of the CFO AI Assistant with foundational RAG capabilities and financial document analysis for Nigerian banking executives.',
    techStack: ['Python', 'OpenAI GPT-4', 'LangChain', 'FAISS', 'FastAPI'],
    github: 'https://github.com/micheal-olaniyi/cfo-ai-assistant-v1',
    liveDemo: 'https://cfo-ai-assistant-v1.vercel.app',
  },
  {
    id: '4',
    name: 'AI Portfolio (This Site)',
    year: '2025',
    category: 'Web',
    status: 'Completed',
    description: 'Interactive AI-powered portfolio website featuring RAG-based chat interface, dynamic skills/experience/projects displays, and smooth animations. Built with Next.js, Claude Sonnet 4, and Vercel AI SDK for intelligent conversational navigation.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Claude Sonnet 4', 'Vercel AI SDK', 'Framer Motion'],
    github: 'https://github.com/micheal-olaniyi/ai-portfolio',
    liveDemo: 'https://micheal-olaniyi.vercel.app',
    featured: true
  },
  {
    id: '5',
    name: 'Credit Risk Model',
    year: '2024',
    category: 'Machine Learning',
    status: 'Completed',
    description: 'Machine learning model for credit risk assessment and loan application approval with comprehensive analysis and predictive capabilities.',
    techStack: ['Python', 'Scikit-learn', 'Pandas', 'XGBoost', 'NumPy'],
    github: 'https://github.com/micheal-olaniyi/credit-risk-model',
    liveDemo: 'https://credit-risk-model.streamlit.app',
  },
  {
    id: '6',
    name: 'WhatsApp Group Analysis Tool',
    year: '2024',
    category: 'Analytics',
    status: 'Completed',
    description: 'Python-based tool for analyzing WhatsApp group conversations with sentiment analysis, visualization, and comprehensive chat statistics.',
    techStack: ['Python', 'NLTK', 'Matplotlib', 'Pandas', 'Seaborn'],
    github: 'https://github.com/micheal-olaniyi/whatsapp-analysis',
    liveDemo: 'https://whatsapp-analysis.streamlit.app',
  }
];

interface ProjectsResponseProps {
  onProjectClick?: (projectName: string) => void;
}

export default function ProjectsResponse({ onProjectClick }: ProjectsResponseProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-4"
    >
      {/* Response message */}
      <div className="bg-white text-gray-800 shadow-md border border-gray-100 rounded-2xl px-5 py-4 mb-6 max-w-[85%]">
        <p className="text-sm leading-relaxed">
          I've built a handful of AI-centric and web-focused applications that solve real-world problems. Below is a snapshot of the projects I've delivered:
        </p>
      </div>

      {/* Projects Grid - 2 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300 flex flex-col"
          >
            {/* Project Header */}
            <div className="mb-4">
              <h3 className={`text-xl font-bold mb-3 ${
                project.featured 
                  ? 'bg-gradient-to-r from-emerald-600 to-amber-500 bg-clip-text text-transparent'
                  : 'text-gray-800'
              }`}>
                {project.name}
              </h3>

              {/* Metadata: Year • Category • Status */}
              <div className="flex items-center gap-2 text-sm flex-wrap">
                <span className="text-gray-600">{project.year}</span>
                <span className="text-gray-400">•</span>
                <span className="text-emerald-600 font-medium">{project.category}</span>
                <span className="text-gray-400">•</span>
                <span className="px-3 py-1 bg-emerald-500 text-white rounded-full text-xs font-medium">
                  {project.status}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              {project.description}
            </p>

            {/* Tech Stack */}
            <div className="mb-5 flex-1">
              <div className="flex items-start gap-3">
                {/* Emerald-Amber accent bar - YOUR THEME */}
                <div className="w-1 h-20 bg-gradient-to-b from-emerald-500 to-amber-400 rounded-full flex-shrink-0" />
                
                <div className="flex-1">
                  <p className="text-xs font-semibold text-gray-500 tracking-wider mb-3">
                    TECH STACK
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons - Always show both */}
            <div className="flex gap-3 mt-auto">
              <a
                href={project.github || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white border-2 border-gray-300 hover:border-gray-400 rounded-lg text-gray-700 font-medium text-sm transition-all duration-200 hover:shadow-md"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              
              <a
                href={project.liveDemo || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-amber-400 hover:from-emerald-600 hover:to-amber-500 rounded-lg text-white font-medium text-sm transition-all duration-200 hover:shadow-lg"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}