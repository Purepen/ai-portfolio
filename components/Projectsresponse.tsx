// components/ProjectsResponse.tsx - WITH SMOOTH SCROLL TO TOP
'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowUp } from 'lucide-react';

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
  featured?: boolean;
}

interface ProjectsResponseProps {
  data?: { projects: Project[] };
  filter?: string;
}

export default function ProjectsResponse({ data, filter }: ProjectsResponseProps) {
  const hardcodedProjects: Project[] = [
    {
      id: '1',
      name: 'AI Banking Assistant',
      year: '2025',
      category: 'AI Tools',
      status: 'Completed',
      description: 'Voice-enabled banking system with 8 specialized agents, secure 2FA, real-time processing serving 70+ users. Achieved sub-2-second response times with optimized async processing.',
      techStack: ['Python', 'FastAPI', 'AsyncIO', 'SQLite', 'Gradio', 'OpenAI GPT-4o-mini', 'Whisper API', 'TTS-1'],
      github: 'https://github.com/micheal-olaniyi/ai-banking-assistant',
      liveDemo: 'https://youtu.be/Hvwg5XZ3TR0?si=0yA0emdZmZOsc8pX',
      featured: true
    },
    {
      id: '2',
      name: 'CFO AI Assistant v2',
      year: '2025',
      category: 'AI Tools',
      status: 'Completed',
      description: 'Advanced multi-agent financial intelligence system for Nigerian bank CFOs with intelligent query routing, semantic search and RAG pipeline achieving 95%+ accuracy.',
      techStack: ['Python', 'Claude Sonnet 4', 'LangChain', 'LangGraph', 'ChromaDB', 'Sentence Transformers', 'FastAPI'],
      github: '',
      liveDemo: 'https://youtu.be/Hmk_OsMPNt0?si=uNPvtnVGcNOOWSeY',
      featured: true
    },
    {
      id: '3',
      name: 'CFO AI Assistant v1',
      year: '2024',
      category: 'AI Tools',
      status: 'Completed',
      description: 'Initial version of CFO AI Assistant with foundational RAG capabilities and financial document analysis for Nigerian banking executives.',
      techStack: ['Python', 'Claude Sonnet 4', 'LangChain', 'ChromaDB', 'Sentence Transformers', 'Streamlit'],
      github: 'https://github.com/Purepen/CFO-ai-assistant',
      liveDemo: 'https://youtu.be/y_JC8nHnf10?si=e02Z6A94i2N5enbH',
      featured: false
    },
    {
      id: '4',
      name: 'Credit Risk Model',
      year: '2024',
      category: 'Data Science',
      status: 'Completed',
      description: 'Machine learning model for credit risk assessment and loan application approval with comprehensive analysis and predictive capabilities.',
      techStack: ['Python', 'Scikit-learn', 'Pandas', 'XGBoost', 'NumPy'],
      github: 'https://github.com/Purepen/Credit-risk-model-and-features-extraction',
      liveDemo: '',
      featured: false
    },
    {
      id: '5',
      name: 'Customer Analytics Dashboard',
      year: '2023',
      category: 'Data Science',
      status: 'Completed',
      description: 'Comprehensive analytics platform for tracking customer behavior, churn prediction, and revenue metrics at Smartcash PSB.',
      techStack: ['Python', 'Tableau', 'SQL', 'Power BI', 'Pandas'],
      github: 'https://github.com/micheal-olaniyi/customer-analytics',
      liveDemo: '',
      featured: false
    },
    {
      id: '6',
      name: 'Loan_application_approval',
      year: '2025',
      category: 'Data Science',
      status: 'Completed',
      description: 'Application that analyze historical loan data and create a model that predicts whether a loan application should be approved or denied.',
      techStack: ['sklearn', 'Matplotlib', 'plotly', 'pandas', 'seaborn'],
      github: 'https://github.com/Purepen/Loan_application_approval',
      liveDemo: '',
      featured: false
    },
    {
      id: '7',
      name: 'AI-Powered Portfolio Website',
      year: '2025',
      category: 'Full-Stack AI',
      status: 'Completed',
      description: 'Interactive AI-powered portfolio featuring RAG-based conversational interface with Claude Sonnet 4, vector search with Supabase, and dynamic component rendering. Visitors can explore projects, skills, experience, and certifications through natural language queries. Includes real-time streaming responses, skill-click automation, and floating animations.',
      techStack: ['Next.js 15','TypeScript','Tailwind CSS','Claude Sonnet 4','OpenAI Embeddings','Vercel AI SDK','Supabase (PostgreSQL+pg vector)','Framer Motion','Lucide Icons','Edge Runtime','Vercel Deployment'],
      github: 'https://github.com/micheal-olaniyi/ai-portfolio',
      liveDemo: 'SCROLL_TO_TOP', // ✅ Special flag
      featured: true
    },
    {
      id: '8',
      name: 'Avatar (Digital Twin)',
      year: '2026',
      category: 'AI Tools',
      status: 'Live',
      description: 'A conversational digital twin: visitors chat with an AI version of me trained on my real experience, with the option for me to jump into the conversation live from an admin dashboard. Streamed over SSE.',
      techStack: ['OpenAI Agents SDK', 'FastAPI', 'Supabase', 'TypeScript'],
      github: 'https://github.com/Purepen/avatar',
      liveDemo: 'https://purepen.fly.dev',
      featured: true
    },
    {
      id: '9',
      name: 'Research AI',
      year: '2026',
      category: 'AI Tools',
      status: 'Live',
      description: 'A free tool that helps students and professionals get unstuck at the start of a research project: choosing a topic, deriving a clear specification, and finding the right materials.',
      techStack: ['Python', 'LLM', 'RAG'],
      github: 'https://github.com/Purepen/research-assistant',
      liveDemo: '',
      featured: false
    }
  ];

  const projects = data?.projects || hardcodedProjects;

  const filteredProjects = filter 
    ? projects.filter(project => {
        const filters = filter.toLowerCase().split(',').map(f => f.trim());
        return filters.some(f => 
          project.category?.toLowerCase().includes(f) ||
          project.name?.toLowerCase().includes(f) ||
          project.description?.toLowerCase().includes(f) ||
          project.year?.includes(f) ||
          project.techStack?.some(tech => tech.toLowerCase().includes(f))
        );
      })
    : projects;

  // ✅ Handler for AI Portfolio button
  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="my-4"
    >
      {filter && (
        <div className="mb-3 text-sm text-gray-500 dark:text-gray-400">
          <span className="font-medium">Filtered by:</span> {filter.split(',').join(', ')}
          <span className="ml-2">({filteredProjects.length} result{filteredProjects.length !== 1 ? 's' : ''})</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProjects.map((project, idx) => (
          <motion.div
            key={project.id || idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
          >
            <div className="mb-4">
              <h3 className={`text-xl font-bold mb-3 ${
                project.featured 
                  ? 'bg-gradient-to-r from-emerald-600 to-amber-500 bg-clip-text text-transparent'
                  : 'text-gray-800 dark:text-gray-100'
              }`}>
                {project.name}
              </h3>

              <div className="flex items-center gap-2 text-sm flex-wrap">
                <span className="text-gray-600 dark:text-gray-400">{project.year}</span>
                <span className="text-gray-400">•</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">{project.category}</span>
                <span className="text-gray-400">•</span>
                <span className="px-3 py-1 bg-emerald-500 text-white rounded-full text-xs font-medium">
                  {project.status}
                </span>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
              {project.description}
            </p>

            <div className="mb-5 flex-1">
              <div className="flex items-start gap-3">
                <div className="w-1 h-20 bg-gradient-to-b from-emerald-500 to-amber-400 rounded-full flex-shrink-0" />
                
                <div className="flex-1">
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 tracking-wider mb-3">
                    TECH STACK
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-900 dark:bg-gray-700 text-white rounded-xl hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              )}
              
              {/* ✅ Special handling for AI Portfolio */}
              {project.liveDemo && (
                project.liveDemo === 'SCROLL_TO_TOP' ? (
                  <button
                    onClick={handleScrollToTop}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-amber-400 text-white rounded-xl hover:shadow-lg transition-all text-sm font-medium"
                  >
                    <ArrowUp className="w-4 h-4" />
                    You&apos;re Here!
                  </button>
                ) : (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-amber-400 text-white rounded-xl hover:shadow-lg transition-all text-sm font-medium"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                )
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>No projects found matching the filter "{filter}"</p>
        </div>
      )}
    </motion.div>
  );
}