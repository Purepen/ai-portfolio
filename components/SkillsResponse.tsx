'use client';

import { motion } from 'framer-motion';
import { Cpu, Code, Palette, Server, Database, BarChart, TrendingUp } from 'lucide-react';
import { dispatchSkillQuestion } from '@/lib/events';

interface SkillsResponseProps {
  data?: {
    categories: {
      name: string;
      icon: string;
      skills: string[];
    }[];
  };
  filter?: string;
  onSkillClick: (skill: string) => void;
}

export default function SkillsResponse({ data, filter, onSkillClick }: SkillsResponseProps) {
  const hardcodedCategories = [
    {
      name: 'AI/ML Engineering',
      icon: 'cpu',
      skills: [
        'LangChain',
        'LangGraph',
        'OpenAI GPT-4o/GPT-4o-mini',
        'Claude Sonnet 4',
        'Prompt Engineering',
        'Function/Tool Calling',
        'Fine-tuning',
        'Multi-agent Systems',
        'Agentic AI',
        'Voice Agents',
        'Whisper API',
        'TTS-1 API',
        'NLP (BERT, NLTK)',
        'ChromaDB',
        'FAISS',
        'Pinecone',
        'Semantic Search',
        'Retrieval-Augmented Generation',
        'PyTorch',
        'TensorFlow',
        'Keras',
        'Scikit-learn',
        'LoRA/PEFT',
        'Pandas',
        'NumPy'
      ]
    },
    {
      name: 'Programming & Algorithms',
      icon: 'code',
      skills: [
        'Python',
        'SQL',
        'JavaScript',
        'TypeScript',
        'R',
        'Data Structures (Hash tables, Trees, Graphs)',
        'Dynamic Programming'
      ]
    },
    {
      name: 'Frontend Development',
      icon: 'palette',
      skills: [
        'React.js',
        'Next.js',
        'JavaScript',
        'TypeScript',
        'Tailwind CSS',
        'Streamlit',
        'Gradio'
      ]
    },
    {
      name: 'Backend & API Development',
      icon: 'server',
      skills: [
        'FastAPI',
        'Node.js',
        'Express.js',
        'REST APIs',
        'AsyncIO'
      ]
    },
    {
      name: 'Databases & Data Infrastructure',
      icon: 'database',
      skills: [
        'PostgreSQL',
        'MongoDB',
        'MySQL',
        'SQLite',
        'BigQuery',
        'Supabase',
        'Snowflake'
      ]
    },
    {
      name: 'Data Engineering & ETL',
      icon: 'database',
      skills: [
        'Apache Airflow',
        'Kafka',
        'dbt',
        'Big Data Processing'
      ]
    },
    {
      name: 'Business Intelligence & Analytics',
      icon: 'bar-chart',
      skills: [
        'Power BI',
        'Tableau',
        'Looker',
        'Data Visualization',
        'Statistical Analysis'
      ]
    },
    {
      name: 'Marketing & Growth',
      icon: 'trending-up',
      skills: [
        'Churn Retention Strategy',
        'A/B Testing',
        'Campaign Optimization',
        'SMS Broadcasting',
        'WebEngage',
        'CRM Automation',
        'Audience Segmentation',
        'Attribution Modeling'
      ]
    }
  ];

  const getIcon = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      'cpu': Cpu,
      'code': Code,
      'palette': Palette,
      'server': Server,
      'database': Database,
      'bar-chart': BarChart,
      'trending-up': TrendingUp
    };
    const IconComponent = iconMap[iconName] || Cpu;
    return <IconComponent className="w-5 h-5" />;
  };

  const categories = data?.categories || hardcodedCategories;

  const filteredCategories = filter
    ? categories
        .filter(cat =>
          cat.name.toLowerCase().includes(filter.toLowerCase()) ||
          cat.skills.some(skill => skill.toLowerCase().includes(filter.toLowerCase()))
        )
        .map(cat => ({
          ...cat,
          skills: cat.skills.filter(skill =>
            skill.toLowerCase().includes(filter.toLowerCase())
          )
        }))
        .filter(cat => cat.skills.length > 0)
    : categories;

  
//skill handling
  const handleSkillClick = (skill: string) => {
    dispatchSkillQuestion(skill);
  };
//anotherone

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="my-4"
    >
      {filter && (
        <div className="mb-3 text-sm text-gray-500 dark:text-gray-400">
          <span className="font-medium">Filtered by:</span> {filter}
          <span className="ml-2">
            ({filteredCategories.reduce((acc, cat) => acc + cat.skills.length, 0)} skill
            {filteredCategories.reduce((acc, cat) => acc + cat.skills.length, 0) !== 1 ? 's' : ''})
          </span>
        </div>
      )}

      <div className="space-y-8">
        {filteredCategories.map((category, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
            className="bg-white dark:bg-gray-800/50 rounded-2xl p-6 shadow-md border border-gray-100 dark:border-gray-700"
          >
            {/* Category Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-amber-400 flex items-center justify-center text-white">
                {getIcon(category.icon)}
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                {category.name}
              </h3>
              <div className="h-1 flex-1 bg-gradient-to-r from-emerald-500 to-amber-400 rounded-full ml-2" />
            </div>

            {/* Skills Pills - Floating Animation */}
            <div className="flex flex-wrap gap-3">
              {category.skills.map((skill, skillIdx) => (
                <motion.button
                  key={skillIdx}
                  onClick={() => handleSkillClick(skill)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -4,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: idx * 0.1 + skillIdx * 0.03,
                  }}
                  style={{
                    animation: `float ${3 + (skillIdx % 3)}s ease-in-out infinite`,
                    animationDelay: `${skillIdx * 0.1}s`
                  }}
                  className="px-4 py-2.5 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium border-2 border-cyan-400 dark:border-cyan-500 hover:border-emerald-500 dark:hover:border-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all cursor-pointer shadow-sm hover:shadow-md"
                >
                  {skill}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>No skills found matching the filter "{filter}"</p>
        </div>
      )}

      {/* Floating Animation CSS */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
      `}</style>
    </motion.div>
  );
}