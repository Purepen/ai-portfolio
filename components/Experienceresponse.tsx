// components/ExperienceResponse.tsx - COMPLETE REPLACEMENT
'use client';

import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

interface ExperienceResponseProps {
  data?: {
    experiences: {
      role: string;
      company: string;
      period: string;
      location?: string;
      description: string;
      achievements?: string[];
      current?: boolean;
    }[];
  };
  filter?: string;
}

export default function ExperienceResponse({ data, filter }: ExperienceResponseProps) {
  const hardcodedExperiences = [
    {
      role: 'Freelance AI/ML Engineer',
      company: 'Freelance',
      period: 'Aug 2024 - Present',
      location: 'Remote',
      description: 'Building production-ready AI systems and multi-agent applications for enterprise clients.',
      achievements: [
        'Engineered CFO AI Assistant with 95%+ accuracy using advanced RAG pipeline',
        'Deployed AI Banking Assistant serving 700+ customers with secure 2FA authentication',
        'Implemented advanced RAG pipeline with 80% improvement in response precision',
        'Developed real-time voice interaction with sub-2-second processing time'
      ],
      current: true
    },
    {
      role: 'Business Intelligence/CVM Manager',
      company: 'Smartcash PSB',
      period: 'Apr 2023 - Present',
      location: 'Lagos, Nigeria',
      description: 'Leading customer value management and business intelligence initiatives.',
      achievements: [
        'Achieved 68.9% increase in revenue-earning customers within 6 months',
        'Reduced monthly churn by 30% through data-driven retention strategies',
        'Built Python automation achieving 1,440x efficiency improvement from full-day to sub-minute processing',
        'Designed executive dashboards in Power BI for real-time business metrics'
      ],
      current: true
    },
    {
      role: 'Data Analyst',
      company: 'Interswitch Group',
      period: 'Apr 2024 - Jun 2024',
      location: 'Lagos, Nigeria',
      description: 'Collaborated on complex business and payments analytics.',
      achievements: [
        'Designed dashboards in Tableau for payment transaction monitoring',
        'Optimized data pipelines using SQL for faster reporting',
        'Analyzed payment trends to support strategic business decisions'
      ],
      current: false
    },
    {
      role: 'Data Analyst',
      company: 'Mustard',
      period: 'Mar 2023 - Jun 2023',
      location: 'Remote',
      description: 'Fintech platform focused on financial product analytics.',
      achievements: [
        'Delivered stakeholder presentations improving financial product adoption by 32%',
        'Automated data cleaning with Python cutting prep time by 50%',
        'Created customer segmentation models for targeted marketing'
      ],
      current: false
    },
    {
      role: 'Data Analyst/Assistant Teacher',
      company: 'JAF College',
      period: 'Jan 2021 - Feb 2023',
      location: 'Abeokuta, Nigeria',
      description: 'Dual role managing student data and teaching mathematics.',
      achievements: [
        'Managed student performance data and academic reporting systems',
        'Taught mathematics to secondary school students',
        'Developed automated grading systems'
      ],
      current: false
    },
    {
      role: 'Data Analyst Intern',
      company: 'PwC Legal Switzerland',
      period: 'Aug 2022 - Dec 2022',
      location: 'Remote',
      description: 'Virtual internship focused on legal data analysis.',
      achievements: [
        'Analyzed legal case data for pattern recognition',
        'Created visualizations for case outcome predictions'
      ],
      current: false
    },
    {
      role: 'Data Analyst Intern',
      company: 'Tata Group Mumbai India',
      period: 'Sep 2022 - Dec 2022',
      location: 'Remote',
      description: 'Virtual internship in business intelligence.',
      achievements: [
        'Performed data analysis on sales and operations data',
        'Created dashboards for business performance tracking'
      ],
      current: false
    },
    {
      role: 'Data Analyst Virtual Intern',
      company: 'Accenture',
      period: 'Nov 2022 - Dec 2022',
      location: 'Remote',
      description: 'Virtual experience program in data analytics.',
      achievements: [
        'Completed data cleaning and visualization projects',
        'Presented insights to virtual stakeholders'
      ],
      current: false
    },
    {
      role: 'Statistical Officer',
      company: 'National Bureau of Statistics Nigeria',
      period: 'Sep 2019 - Mar 2020',
      location: 'Abeokuta, Nigeria',
      description: 'Government statistical data collection and analysis.',
      achievements: [
        'Conducted field surveys for national statistics',
        'Processed and validated survey data for accuracy'
      ],
      current: false
    }
  ];

  const experiences = data?.experiences || hardcodedExperiences;

  const filteredExperiences = filter
    ? experiences.filter(exp =>
        exp.role.toLowerCase().includes(filter.toLowerCase()) ||
        exp.company.toLowerCase().includes(filter.toLowerCase()) ||
        exp.description.toLowerCase().includes(filter.toLowerCase()) ||
        exp.achievements?.some(ach => ach.toLowerCase().includes(filter.toLowerCase()))
      )
    : experiences;

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
          <span className="ml-2">({filteredExperiences.length} result{filteredExperiences.length !== 1 ? 's' : ''})</span>
        </div>
      )}

      <div className="space-y-6">
        {filteredExperiences.map((exp, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="relative pl-8 pb-8 border-l-2 border-gradient-to-b from-emerald-500 to-amber-400 last:pb-0"
            style={{
              borderImage: 'linear-gradient(to bottom, rgb(16, 185, 129), rgb(251, 191, 36)) 1'
            }}
          >
            <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-gradient-to-br from-emerald-500 to-amber-400 border-4 border-white dark:border-gray-900" />
            
            {exp.current && (
              <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-gradient-to-br from-emerald-500 to-amber-400 animate-ping" />
            )}

            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Briefcase className="w-4 h-4 text-emerald-500" />
                    <span className="font-medium bg-gradient-to-r from-emerald-600 to-amber-500 bg-clip-text text-transparent">
                      {exp.company}
                    </span>
                  </div>
                </div>
                {exp.current && (
                  <span className="px-3 py-1 bg-gradient-to-r from-emerald-500 to-amber-400 text-white text-xs font-medium rounded-full">
                    Current
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-400 mb-3">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{exp.period}</span>
                </div>
                {exp.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{exp.location}</span>
                  </div>
                )}
              </div>

              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                {exp.description}
              </p>

              {exp.achievements && exp.achievements.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 tracking-wider mb-2">
                    KEY ACHIEVEMENTS
                  </p>
                  <ul className="space-y-1">
                    {exp.achievements.map((achievement, achIdx) => (
                      <li key={achIdx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <span className="text-transparent bg-gradient-to-r from-emerald-500 to-amber-400 bg-clip-text mt-1 font-bold">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {filteredExperiences.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>No experience found matching the filter "{filter}"</p>
        </div>
      )}
    </motion.div>
  );
}