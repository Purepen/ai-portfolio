// components/RecommendationsResponse.tsx
'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

interface Recommendation {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  imageUrl?: string;
}

interface RecommendationsResponseProps {
  data?: { recommendations: Recommendation[] };
  filter?: string;
}

export default function RecommendationsResponse({ data, filter }: RecommendationsResponseProps) {
  const hardcodedRecommendations: Recommendation[] = [
    {
      id: '1',
      name: 'Adeshina Tosin',
      role: 'CEO',
      company: 'TOSZ Empire',
      text: 'Micheal is exceptionally proactive and innovative. He played a key role in building an AI-powered website for my small business, which has significantly contributed to our growth and scalability. His expertise and execution are top-notch, and the impact of his work speaks for itself.',
    },
    {
      id: '2',
      name: 'Sheriff Kolapo',
      role: 'Sales & Marketing Manager',
      company: 'Airtel SmartCash PSB',
      text: 'Working with Micheal in the Customer Value Management space has been truly impactful. His strong data-driven approach to customer retention and churn reduction directly supported revenue-earning customers and delivered measurable business value. His professionalism and analytical depth stand out.',
    },
    {
      id: '3',
      name: 'Nosa Nick',
      role: 'CEO',
      company: 'Mustard',
      text: 'Micheal brings unmatched energy, reliability, and technical expertise to every engagement. His data proficiency was one of the core strengths we relied on during the early stages of building Mustard, and it played a critical role in shaping our niche and growth trajectory.',
    },
  ];

  const recommendations = data?.recommendations || hardcodedRecommendations;

  const filteredRecommendations = filter
    ? recommendations.filter(rec =>
        rec.name.toLowerCase().includes(filter.toLowerCase()) ||
        rec.company.toLowerCase().includes(filter.toLowerCase()) ||
        rec.text.toLowerCase().includes(filter.toLowerCase())
      )
    : recommendations;

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
          <span className="ml-2">({filteredRecommendations.length} result{filteredRecommendations.length !== 1 ? 's' : ''})</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRecommendations.map((rec, idx) => (
          <motion.div
            key={rec.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
            className="bg-gray-900 dark:bg-gray-950 rounded-2xl p-6 shadow-lg border border-gray-800 dark:border-gray-900 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
          >
            {/* Quote Icon */}
            <Quote className="absolute top-4 right-4 w-12 h-12 text-gray-700 opacity-30" />

            {/* Header */}
            <div className="flex items-start gap-4 mb-4 relative z-10">
              {/* Avatar Placeholder */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-amber-400 flex items-center justify-center flex-shrink-0 text-white font-bold text-xl">
                {rec.name.split(' ').map(n => n[0]).join('')}
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-white mb-1">
                  {rec.name}
                </h3>
                <p className="text-sm text-gray-400">
                  {rec.role}
                </p>
                <p className="text-sm text-gray-500">
                  at {rec.company}
                </p>
              </div>
            </div>

            {/* Recommendation Text */}
            <p className="text-gray-300 text-sm leading-relaxed relative z-10">
              "{rec.text}"
            </p>
          </motion.div>
        ))}
      </div>

      {filteredRecommendations.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>No recommendations found matching the filter "{filter}"</p>
        </div>
      )}
    </motion.div>
  );
}