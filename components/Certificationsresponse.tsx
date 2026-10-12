// components/CertificationsResponse.tsx - FINAL WORKING VERSION
'use client';

import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';

interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  skills: string[];
  credentialUrl: string;
  credentialId?: string;
}

interface CertificationsResponseProps {
  data?: { certifications: Certification[] };
  filter?: string;
}

export default function CertificationsResponse({ data, filter }: CertificationsResponseProps) {
  const hardcodedCertifications: Certification[] = [
    {
      id: '15',
      title: 'Certificate of Recognition: Mentor, 3MTT Mentorship Program Cohort 3 (Data Science, AI & ML track)',
      issuer: 'Data Science Nigeria, WESOnline & 3MTT',
      date: 'Sep 2026',
      description: 'Over 8 weeks, guided a group of fellows from first principles to two shipped group projects, from churn prediction models to MamaCare, a full ML + GenAI maternal health app deployed live.',
      skills: ['Mentorship', 'Data Science', 'Machine Learning', 'Generative AI'],
      credentialUrl: 'https://micheal.fly.dev/mamacare-mentorship.html',
    },
    {
      id: '16',
      title: 'AI Engineer Production Track: Deploy LLMs & Agents at scale',
      issuer: 'Udemy',
      date: 'Jul 2026',
      description: 'Deploying AI to AWS, GCP, Azure and Vercel with MLOps, Bedrock, SageMaker, RAG, Agents and MCP: scalable, secure, observable.',
      skills: ['AWS', 'GCP', 'Azure', 'Vercel', 'MLOps', 'Bedrock', 'SageMaker', 'RAG', 'AI Agents', 'MCP'],
      credentialUrl: 'https://www.udemy.com/certificate/UC-e38dc130-693c-42b6-9ddc-8b2276c480e8/',
    },
    {
      id: '17',
      title: 'AI Automation Builder with n8n',
      issuer: 'Udemy',
      date: 'May 2026',
      description: 'Creating agents, voice agents and automations in n8n.',
      skills: ['n8n', 'AI Agents', 'Voice Agents', 'Automation'],
      credentialUrl: 'https://drive.google.com/file/d/1wgv8RMhnP-eh8esaemk0_eMJ4XRldaKy/view?usp=drive_link',
    },
    {
      id: '18',
      title: 'AI/ML Engineer (consulting project) assessment',
      issuer: 'micro1 Recruiting',
      date: 'May 2026',
      description: 'Completed a series of AI engineering screening assessments.',
      skills: ['AI Engineering', 'Machine Learning'],
      credentialUrl: 'https://drive.google.com/file/d/1840N2x6W5sU9qPtrNfROE0zNLUVNCjQM/view?usp=sharing',
    },
    {
      id: '19',
      title: 'AI Engineer Agentic Track',
      issuer: 'Udemy',
      date: 'Mar 2026',
      description: 'Completed Agent and MCP course.',
      skills: ['AI Agents', 'MCP'],
      credentialUrl: 'https://www.udemy.com/certificate/UC-5dbbd488-f0ec-4d34-b9cb-3799c5108bd0/',
    },
    {
      id: '1',
      title: 'Model Context Protocol (MCP): Hands-On with Agentic AI',
      issuer: 'LinkedIn Learning',
      date: 'Dec 2025',
      description: '55-minute hands-on course covering the Model Context Protocol for building advanced agentic AI systems with practical implementations.',
      skills: ['Anthropic Claude', 'AI Agents', 'Artificial Intelligence (AI)', 'Model Context Protocol'],
      credentialUrl: 'https://drive.google.com/file/d/18jGdt5sPcXFx2WXrs31myfmPvzfb2UgD/view?usp=sharing',
    },
    {
      id: '2',
      title: 'Hands-On AI: Building AI Agents with MCP and A2A',
      issuer: 'LinkedIn Learning',
      date: 'Dec 2025',
      description: 'Practical course on building AI agents with Model Context Protocol (MCP) and Agent2Agent (A2A) protocols.',
      skills: ['AI Agents', 'Artificial Intelligence (AI)', 'Generative AI', 'MCP', 'A2A'],
      credentialUrl: 'https://drive.google.com/file/d/1CoX-211FLYRziL7h1egBU_118ZlunZSA/view?usp=sharing',
    },
    {
      id: '3',
      title: 'AI Engineer Core Track: LLM Engineering, RAG, QLoRA, Agents',
      issuer: 'Ligency, Ed Donner (Udemy)',
      date: 'Dec 2025',
      description: 'Comprehensive training in building production-ready LLM applications, implementing RAG systems, fine-tuning models with QLoRA, and developing autonomous AI agents. 58.5 total hours.',
      skills: ['LLM Engineering', 'RAG Systems', 'QLoRA Fine-tuning', 'AI Agents', 'LangChain'],
      credentialUrl: 'https://drive.google.com/file/d/1vh8YIl2T_Ba_jjAdpvTD1N1ZTX3MsCyC/view?usp=sharing',
    },
    {
      id: '4',
      title: 'Career Essentials in Generative AI by Microsoft and LinkedIn',
      issuer: 'Microsoft & LinkedIn Learning',
      date: 'Jun 2025',
      description: 'Learning Path covering generative AI essentials, Microsoft Copilot, responsible AI practices, and AI integration in professional workflows. Duration: 6 hours 3 minutes.',
      skills: ['Microsoft Copilot', 'Generative AI', 'Responsible AI'],
      credentialUrl: 'https://www.linkedin.com/learning/certificates/7fc629b7a7486c14740d0d77b343f897954f58ebffbd6da200a814094c067ff6',
    },
    {
      id: '5',
      title: 'Microsoft Certified: Fabric Analytics Engineer Associate',
      issuer: 'Microsoft',
      date: 'Dec 2024',
      description: 'Professional certification validating expertise in Microsoft Fabric analytics engineering.',
      skills: ['Microsoft Fabric', 'Data Analytics', 'Cloud Engineering', 'ETL', 'Data Warehousing'],
      credentialUrl: 'https://learn.microsoft.com/en-us/users/purepen-1376/credentials/8b098d6a3ff9e285?ref=https%3A%2F%2Fwww.linkedin.com%2F',
      credentialId: '8B098D6A3FF9E285'
    },
    {
      id: '6',
      title: 'Certificate in Applied Data Science Lab',
      issuer: 'WorldQuant University',
      date: 'Dec 2024',
      description: 'Certificate of completion in applied data science methodologies, practical implementations, and real-world data science applications.',
      skills: ['Data Science', 'Python', 'Machine Learning', 'Statistical Analysis', 'Data Analytics'],
      credentialUrl: 'https://www.credly.com/badges/3d3283e9-195f-4518-9a8f-03fe9c812020/linked_in_profile',
    },
    {
      id: '7',
      title: 'Microsoft Certified: Power BI Data Analyst Associate',
      issuer: 'Microsoft',
      date: 'Apr 2024',
      description: 'Professional certification demonstrating proficiency in Power BI data analysis, visualization, and business intelligence.',
      skills: ['Power BI', 'Data Analysis', 'DAX', 'Data Visualization', 'Business Intelligence'],
      credentialUrl: 'https://learn.microsoft.com/en-us/users/purepen-1376/credentials/f839d41afeefdf41?ref=https%3A%2F%2Fwww.linkedin.com%2F',
      credentialId: 'F839D41AFEEFDF41'
    },
    {
      id: '8',
      title: 'Data Analytics and Visualization Virtual Experience',
      issuer: 'Accenture (Forage)',
      date: 'Dec 2022',
      description: 'Virtual case experience covering project understanding, data cleaning & modeling, data visualization & storytelling, and client presentation skills.',
      skills: ['Data Analytics', 'Data Visualization', 'Data Modeling', 'Client Presentation', 'Storytelling'],
      credentialUrl: 'https://drive.google.com/file/d/1-59qHNZS3O50sEIrhXPsiIZwosvOxak3/view?usp=sharing',
    },
    {
      id: '9',
      title: 'Power BI in Data Analytics Virtual Case Experience',
      issuer: 'PwC (Forage)',
      date: 'Dec 2022',
      description: 'Virtual internship covering call centre trends analysis, customer retention strategies, diversity & inclusion metrics, and Power BI dashboard development.',
      skills: ['Power BI', 'Customer Analytics', 'KPI Development', 'Dashboard Design', 'Data Analysis'],
      credentialUrl: 'https://drive.google.com/file/d/1q69Pqf2sZiWunNFk66M_V4Dw5jUC-KBu/view?usp=sharing',
    },
    {
      id: '10',
      title: 'Data Visualisation: Empowering Business with Effective Insights',
      issuer: 'Tata (Forage)',
      date: 'Dec 2022',
      description: 'Virtual experience covering framing business scenarios, choosing the right visuals, creating effective visualizations, and communicating insights and analysis to stakeholders.',
      skills: ['Data Visualization', 'Business Intelligence', 'Communication', 'Visual Analytics', 'Tableau'],
      credentialUrl: 'https://drive.google.com/file/d/1ySv3VuFFlgHQlGafyf0Iki8CoBuFgJFm/view?usp=sharing',
    },
    {
      id: '11',
      title: 'Data Analytics Internship Certificate',
      issuer: 'Side Hustle',
      date: 'Oct 2022',
      description: 'Successfully completed cohort 6 Side Hustle Internship, executing all individual and team data analytics tasks.',
      skills: ['Data Analytics', 'Team Collaboration', 'Python', 'Data Cleaning', 'Excel'],
      credentialUrl: 'https://drive.google.com/file/d/1_DkWIAmPDV74WzTCZqUxfEZ89PyXsqO0/view?usp=sharing',
      credentialId: 'SH-IT-0364438'
    },
    {
      id: '12',
      title: 'SQL Course Completion Certificate',
      issuer: 'Sololearn',
      date: 'Oct 2022',
      description: 'Demonstrated theoretical and practical understanding of SQL, including queries, joins, subqueries, database design, and data manipulation.',
      skills: ['SQL', 'Database Design', 'Queries', 'Data Manipulation', 'Joins'],
      credentialUrl: 'https://drive.google.com/file/d/1_5RTM3uqSsb-aaQh_HhKfms73eQR4BUd/view?usp=sharing',
      credentialId: 'CT-2YME5B7L'
    },
    {
      id: '13',
      title: 'Google Data Analytics Professional Certificate',
      issuer: 'Google (Coursera)',
      date: 'Sep 2022',
      description: '8-course comprehensive specialization covering data foundations, SQL, data cleaning & preparation, data analysis, data visualization with Tableau, R programming, and capstone project.',
      skills: ['Data Analytics', 'SQL', 'Tableau', 'R Programming', 'Data Visualization'],
      credentialUrl: 'https://drive.google.com/file/d/1_6hwvZkR5FiZ6tGVTxsW3YXnCcxQcXq7/view?usp=sharing',
    },
    {
      id: '14',
      title: 'Jobberman Soft-Skills Training',
      issuer: 'Jobberman Nigeria (Mastercard Foundation, Young Africa Works)',
      date: 'Sep 2022',
      description: 'Successfully completed and passed the introductory Jobberman Soft-Skills Training program focused on professional development and workplace skills.',
      skills: ['Communication', 'Teamwork', 'Problem Solving', 'Time Management', 'Professional Development'],
      credentialUrl: 'https://drive.google.com/file/d/1_51L_xhBa-0MD3GDznF1chFfQMDy4qW9/view?usp=sharing',
    },
  ];

  const certifications = data?.certifications || hardcodedCertifications;

  const filteredCertifications = filter
    ? certifications.filter(cert =>
        cert.title.toLowerCase().includes(filter.toLowerCase()) ||
        cert.issuer.toLowerCase().includes(filter.toLowerCase()) ||
        cert.skills.some(skill => skill.toLowerCase().includes(filter.toLowerCase()))
      )
    : certifications;

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
          <span className="ml-2">({filteredCertifications.length} result{filteredCertifications.length !== 1 ? 's' : ''})</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCertifications.map((cert, idx) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-emerald-500 to-amber-400 rounded-xl">
                <Award className="w-6 h-6 text-white" />
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 leading-tight mb-2">
                  {cert.title}
                </h3>
                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">{cert.issuer}</span>
                  <span className="text-gray-400">•</span>
                  <span>{cert.date}</span>
                </div>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
              {cert.description}
            </p>

            <div className="mb-4">
              <div className="flex items-start gap-3">
                <div className="w-1 h-16 bg-gradient-to-b from-emerald-500 to-amber-400 rounded-full flex-shrink-0" />
                
                <div className="flex-1">
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 tracking-wider mb-2">
                    SKILLS VALIDATED
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill, skillIdx) => (
                      <span
                        key={skillIdx}
                        className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-lg text-xs font-medium border border-emerald-200 dark:border-emerald-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {cert.credentialId && (
              <div className="mb-4 text-xs text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Credential ID:</span> {cert.credentialId}
              </div>
            )}

            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-amber-400 text-white rounded-xl hover:shadow-lg transition-all text-sm font-medium cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              View Credential
            </a>
          </motion.div>
        ))}
      </div>

      {filteredCertifications.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>No certifications found matching the filter "{filter}"</p>
        </div>
      )}
    </motion.div>
  );
}