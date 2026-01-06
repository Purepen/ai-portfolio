'use client';

import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

interface Experience {
  id: string;
  company: string;
  title: string;
  period: string;
  location: string;
  type: string;
  description: string;
  achievements?: string[];
}

const experiences: Experience[] = [
  {
    id: '1',
    company: 'Freelance (Consulting Projects)',
    title: 'Artificial Intelligence/ML Engineer',
    period: 'Aug 2024 - Present',
    location: 'Remote',
    type: 'Consulting',
    description: 'Building production-ready AI systems and multi-agent applications for enterprise clients.',
    achievements: [
      'Engineered CFO AI Assistant with 95%+ accuracy in financial analysis',
      'Deployed AI Banking Assistant serving 700+ customers with secure 2FA',
      'Implemented advanced RAG pipeline with 80% improvement in response precision',
      'Developed real-time voice interaction system with sub-2-second processing time'
    ]
  },
  {
    id: '2',
    company: 'Smartcash PSB (Airtel Money)',
    title: 'Business Intelligence/CVM Manager',
    period: 'Apr 2023 - Present',
    location: 'Hybrid',
    type: 'Full-Time',
    description: 'Leading customer value management and business intelligence initiatives for a leading payment service bank.',
    achievements: [
      'Achieved 68.9% increase in revenue-earning customers within 6 months',
      'Reduced monthly churn by 30% through targeted segmentation strategies',
      'Built Python automation achieving 1,440x efficiency improvement',
      'Designed and optimized marketing dashboards for acquisition and retention campaigns'
    ]
  },
  {
    id: '3',
    company: 'Interswitch Group',
    title: 'Data Analyst (Apprenticeship)',
    period: 'Apr 2024 - Jun 2024',
    location: 'Hybrid',
    type: 'Apprenticeship',
    description: 'Collaborated on complex business and payments analytics problems for Africa\'s leading digital payments company.',
    achievements: [
      'Designed dashboards in Tableau and optimized data pipelines using SQL',
      'Acted as Assistant Program Representative coordinating participants across projects'
    ]
  },
  {
    id: '4',
    company: 'Mustard',
    title: 'Data Analyst',
    period: 'Mar 2023 - Jun 2023',
    location: 'Remote',
    type: 'Contract',
    description: 'A saving investment fintech platform providing expert, innovative services for fair financial access.',
    achievements: [
      'Delivered stakeholder presentations that improved financial product adoption by 32%',
      'Developed dashboards for the CEO using Power BI & SQL',
      'Automated data cleaning with Python & Power Query, cutting visualization prep time by 50%'
    ]
  }
];

// Earlier compact experiences (less detail)
const earlierExperiences = [
  {
    id: 'e1',
    title: 'Data Analyst / Assistant Teacher',
    company: 'JAF College',
    period: 'Jan 2021 - Feb 2023',
    location: 'Onsite',
    type: 'Full-Time'
  },
  {
    id: 'e2',
    title: 'Data Analyst (Intern)',
    company: 'PwC Legal',
    period: 'Aug 2022 - Dec 2022',
    location: 'Switzerland',
    type: 'Internship'
  },
  {
    id: 'e3',
    title: 'Data Analyst (Intern)',
    company: 'Tata Group',
    period: 'Sep 2022 - Dec 2022',
    location: 'Mumbai, India',
    type: 'Internship'
  },
  {
    id: 'e4',
    title: 'Data Analyst (Virtual Intern)',
    company: 'Accenture',
    period: 'Nov 2022 - Dec 2022',
    location: 'Remote',
    type: 'Internship'
  },
  {
    id: 'e5',
    title: 'Statistical Officer',
    company: 'National Bureau of Statistics',
    period: 'Sep 2019 - Mar 2020',
    location: 'Ibadan, Nigeria',
    type: 'Full-Time'
  }
];

interface ExperienceResponseProps {
  onCompanyClick?: (companyName: string) => void;
}

export default function ExperienceResponse({ onCompanyClick }: ExperienceResponseProps) {
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
          I've spent the last few years building and refining AI systems, full-stack applications, and automation workflows across multiple organizations. Here's a concise overview of my professional experience:
        </p>
      </div>

      {/* Experience Timeline */}
      <div className="space-y-6 relative">
        {/* Vertical timeline line */}
        <div className="absolute left-5 top-8 bottom-8 w-0.5 bg-gradient-to-b from-emerald-400 to-amber-400" />

        {experiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.15 }}
            className="relative pl-14 pr-4"
          >
            {/* Timeline dot */}
            <div className="absolute left-3 top-6 w-5 h-5 rounded-full bg-gradient-to-br from-emerald-500 to-amber-400 border-4 border-white shadow-md z-10" />

            {/* Experience Card */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              {/* Header */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {exp.title}
                </h3>
                <p className="text-lg text-gray-700 font-semibold mb-3">
                  {exp.company}
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium border border-blue-200">
                    {exp.period}
                  </span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium border border-purple-200">
                    {exp.location}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                    exp.type === 'Full-Time' 
                      ? 'bg-emerald-100 text-emerald-700 border-emerald-200' 
                      : exp.type === 'Consulting'
                      ? 'bg-amber-100 text-amber-700 border-amber-200'
                      : 'bg-gray-100 text-gray-700 border-gray-200'
                  }`}>
                    {exp.type}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {exp.description}
              </p>

              {/* Achievements */}
              {exp.achievements && exp.achievements.length > 0 && (
                <div className="space-y-2">
                  {exp.achievements.map((achievement, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-1">•</span>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {achievement}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {/* Earlier Experience Section - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: experiences.length * 0.15 + 0.2 }}
          className="relative pl-14 pr-4 mt-8"
        >
          {/* Final timeline dot */}
          <div className="absolute left-3 top-6 w-5 h-5 rounded-full bg-gradient-to-br from-emerald-500 to-amber-400 border-4 border-white shadow-md z-10" />

          {/* Earlier Experiences Card */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-md border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-2xl">📚</span>
              Earlier Experience (2019-2023)
            </h3>
            
            <div className="space-y-3">
              {earlierExperiences.map((exp, idx) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: experiences.length * 0.15 + 0.3 + idx * 0.05 }}
                  className="flex flex-wrap items-start gap-3 pb-3 border-b border-gray-200 last:border-b-0 last:pb-0"
                >
                  <div className="flex-1 min-w-[200px]">
                    <p className="font-semibold text-gray-800 text-sm">
                      {exp.title}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {exp.company}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-200">
                      {exp.period}
                    </span>
                    <span className="px-2 py-0.5 bg-purple-50 text-purple-700 rounded-full text-xs font-medium border border-purple-200">
                      {exp.location}
                    </span>
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs font-medium border border-gray-200">
                      {exp.type}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Total years badge */}
            <div className="mt-5 pt-4 border-t border-gray-300">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-100 to-amber-100 rounded-full border-2 border-emerald-400">
                <span className="text-xl">🏆</span>
                <span className="font-bold text-gray-800 text-sm">
                  6+ Years Total Experience
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}