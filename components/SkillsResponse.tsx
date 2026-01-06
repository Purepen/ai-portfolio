'use client';

import { motion } from 'framer-motion';

interface SkillCategory {
  emoji: string;
  title: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    emoji: '🤖',
    title: 'AI/ML',
    skills: [
      'LangChain',
      'LangGraph',
      'Voice Agents',
      'Pipecat',
      'RAG Systems',
      'Vector Databases',
      'LoRA/PEFT',
      'PyTorch',
      'ChromaDB',
      'FAISS',
      'Pinecone',
      'Qdrant',
      'scikit-learn',
      'TensorFlow',
      'Pandas'
    ]
  },
  {
    emoji: '📊',
    title: 'Data Science/Analysis',
    skills: [
      'Python',
      'SQL',
      'Power BI',
      'Tableau',
      'Looker',
      'Apache Superset',
      'Excel',
      'Statistical Analysis',
      'A/B Testing',
      'Matplotlib',
      'Seaborn'
    ]
  },
  {
    emoji: '🎨',
    title: 'Frontend',
    skills: [
      'React.js',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'JavaScript',
      'Vercel AI SDK'
    ]
  },
  {
    emoji: '⚙️',
    title: 'Backend',
    skills: [
      'FastAPI',
      'Node.js',
      'Express.js',
      'MongoDB',
      'PostgreSQL',
      'MySQL',
      'Supabase',
      'Redis'
    ]
  },
  {
    emoji: '🚀',
    title: 'Deployment',
    skills: [
      'Docker',
      'Kubernetes',
      'CI/CD',
      'AWS',
      'GCP',
      'Azure',
      'Digital Ocean',
      'Vercel'
    ]
  }
];

interface SkillsResponseProps {
  onSkillClick: (skillName: string) => void;
}

export default function SkillsResponse({ onSkillClick }: SkillsResponseProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-4"
    >
      {/* Response message */}
      <div className="bg-white text-gray-800 shadow-md border border-gray-100 rounded-2xl px-5 py-4 mb-4 max-w-[80%]">
        <p className="text-sm leading-relaxed mb-2">
          I have a broad skill set that spans AI/ML, frontend, backend, and deployment technologies. Here's a comprehensive list of my technical expertise:
        </p>
      </div>

      {/* Skills categories */}
      <div className="space-y-6">
        {skillCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: categoryIndex * 0.1 }}
            className="max-w-[90%]"
          >
            {/* Category Header */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{category.emoji}</span>
              <h3 className="text-lg font-bold text-gray-800">
                {category.title}
              </h3>
            </div>

            {/* Skills Pills */}
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, skillIndex) => (
                <motion.button
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.2,
                    delay: categoryIndex * 0.1 + skillIndex * 0.02,
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onSkillClick(skill)}
                  className="px-4 py-2 bg-white text-gray-700 rounded-full shadow-sm hover:shadow-md transition-all duration-200 border-2 border-emerald-400 hover:border-amber-400 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-amber-50 font-medium text-sm"
                >
                  {skill}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}