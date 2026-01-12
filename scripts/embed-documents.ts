import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import path from 'path';
import {
  getDocumentFiles,
  processDocument,
  chunkText,
  cleanText,
} from '../lib/document-processor';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// ═══════════════════════════════════════════════════════════════════
// COMPLETE PORTFOLIO DATA - PRIMARY SOURCE OF TRUTH
// 39 Rich Chunks: Intro + 6 Projects + 5 Skills + 9 Experience + 14 Certs + Contact + 3 Recommendations
// ═══════════════════════════════════════════════════════════════════

const portfolioChunks = [
  // INTRO
  {
    content: `Micheal Olaniyi is an AI/ML Engineer with 4+ years of experience focusing on building intelligent agents that scale, automate, and optimize growth. He specializes in production-ready AI systems, multi-agent applications, and RAG pipelines.`,
    metadata: { type: 'intro', source: 'hardcoded' }
  },
  {
    content: `AI Banking Assistant (2025) - Voice-enabled banking system with 8 specialized agents, secure 2FA, real-time processing serving 700+ users. Achieved sub-2-second response times with optimized async processing. Tech Stack: Python, FastAPI, AsyncIO, SQLite, Gradio, OpenAI GPT-4o-mini, Whisper API, TTS-1. Status: Completed. Category: AI Tools. GitHub: https://github.com/micheal-olaniyi/ai-banking-assistant Live Demo: https://youtu.be/Hvwg5XZ3TR0?si=0yA0emdZmZOsc8pX Featured: Yes`,
    metadata: { type: 'project', name: 'AI Banking Assistant', year: '2025', category: 'AI Tools', github: 'https://github.com/micheal-olaniyi/ai-banking-assistant', liveDemo: 'https://youtu.be/Hvwg5XZ3TR0?si=0yA0emdZmZOsc8pX', source: 'hardcoded' }
  },
  {
    content: `CFO AI Assistant v2 (2025) - Advanced multi-agent financial intelligence system for Nigerian bank CFOs with intelligent query routing and RAG pipeline achieving 95%+ accuracy. Tech Stack: Python, Claude Sonnet 4, LangChain, LangGraph, ChromaDB, Sentence Transformers, FastAPI. Status: Completed. Category: AI Tools. Live Demo: https://youtu.be/Hmk_OsMPNt0?si=uNPvtnVGcNOOWSeY Featured: Yes`,
    metadata: { type: 'project', name: 'CFO AI Assistant v2', year: '2025', category: 'AI Tools', liveDemo: 'https://youtu.be/Hmk_OsMPNt0?si=uNPvtnVGcNOOWSeY', source: 'hardcoded' }
  },
  {
    content: `CFO AI Assistant v1 (2024) - Initial version of CFO AI Assistant with foundational RAG capabilities and financial document analysis for Nigerian banking executives. Tech Stack: Python, OpenAI GPT-4, LangChain, FAISS, FastAPI. Status: Completed. Category: AI Tools. GitHub: https://github.com/Purepen/CFO-ai-assistant Live Demo: https://youtu.be/y_JC8nHnf10?si=e02Z6A94i2N5enbH Featured: No`,
    metadata: { type: 'project', name: 'CFO AI Assistant v1', year: '2024', category: 'AI Tools', github: 'https://github.com/Purepen/CFO-ai-assistant', liveDemo: 'https://youtu.be/y_JC8nHnf10?si=e02Z6A94i2N5enbH', source: 'hardcoded' }
  },
  {
    content: `AI-Powered Portfolio Website (2025) - Interactive AI-powered portfolio featuring RAG-based conversational interface with Claude Sonnet 4, vector search with Supabase PostgreSQL+pgvector, and dynamic component rendering. Visitors explore projects, skills, experience, and certifications through natural language queries. Includes real-time streaming responses, skill-click automation, and floating animations. Tech Stack: Next.js 15, TypeScript, Tailwind CSS, Claude Sonnet 4, OpenAI Embeddings, Vercel AI SDK, Supabase (PostgreSQL+pgvector), Framer Motion, Lucide Icons, Edge Runtime, Vercel Deployment. Status: Completed. Category: Full-Stack AI. GitHub: https://github.com/micheal-olaniyi/ai-portfolio Live Demo: https://micheal-olaniyi.vercel.app Featured: Yes`,
    metadata: { type: 'project', name: 'AI-Powered Portfolio Website', year: '2025', category: 'Full-Stack AI', github: 'https://github.com/micheal-olaniyi/ai-portfolio', liveDemo: 'https://micheal-olaniyi.vercel.app', source: 'hardcoded' }
  },
  {
    content: `Credit Risk Model (2024) - Machine learning model for credit risk assessment and loan application approval with comprehensive analysis and predictive capabilities. Tech Stack: Python, Scikit-learn, Pandas, XGBoost, NumPy. Status: Completed. Category: Data Science. GitHub: https://github.com/Purepen/Credit-risk-model-and-features-extraction Featured: No`,
    metadata: { type: 'project', name: 'Credit Risk Model', year: '2024', category: 'Data Science', github: 'https://github.com/Purepen/Credit-risk-model-and-features-extraction', source: 'hardcoded' }
  },
  {
    content: `Customer Analytics Dashboard (2023) - Comprehensive analytics platform for tracking customer behavior, churn prediction, and revenue metrics at Smartcash PSB. Tech Stack: Python, Tableau, SQL, Power BI, Pandas. Status: Completed. Category: Data Science. GitHub: https://github.com/micheal-olaniyi/customer-analytics Featured: No`,
    metadata: { type: 'project', name: 'Customer Analytics Dashboard', year: '2023', category: 'Data Science', github: 'https://github.com/micheal-olaniyi/customer-analytics', source: 'hardcoded' }
  },
  {
    content: `Loan Application Approval (2025) - Application that analyzes historical loan data and creates a model that predicts whether a loan application should be approved or denied. Tech Stack: sklearn, Matplotlib, plotly, pandas, seaborn. Status: Completed. Category: Data Science. GitHub: https://github.com/Purepen/Loan_application_approval Featured: No`,
    metadata: { type: 'project', name: 'Loan Application Approval', year: '2025', category: 'Data Science', github: 'https://github.com/Purepen/Loan_application_approval', source: 'hardcoded' }
  },
  // SKILLS (5 CATEGORIES)
  {
    content: `AI/ML Engineering Skills: LLM Engineering with OpenAI GPT-4o/GPT-4o-mini and Claude Sonnet 4, Prompt Engineering, Function/Tool Calling, Fine-tuning, Agentic AI including Multi-agent systems with LangChain and LangGraph, RAG Systems using ChromaDB, FAISS, Pinecone, Semantic search, NLP & Voice AI with Whisper API, TTS-1 API, BERT, NLTK, Machine Learning with Scikit-learn, TensorFlow, Keras, PyTorch, Algorithms & Data Structures: Hash tables, Trees, Graphs, Dynamic programming.`,
    metadata: { type: 'skills', category: 'AI/ML Engineering', source: 'hardcoded' }
  },
  {
    content: `Data Engineering & Analytics Skills: Python (Advanced - 4+ years production experience), SQL, JavaScript (NodeJS, React), R programming, Power BI, Tableau, Looker, Apache Superset, Excel, Statistical Analysis, A/B Testing, Matplotlib, Seaborn.`,
    metadata: { type: 'skills', category: 'Data Engineering & Analytics', source: 'hardcoded' }
  },
  {
    content: `Frontend Development Skills: React.js, Next.js, TypeScript, Tailwind CSS, JavaScript, Vercel AI SDK.`,
    metadata: { type: 'skills', category: 'Frontend Development', source: 'hardcoded' }
  },
  {
    content: `Backend Technologies Skills: FastAPI, Node.js, Express.js, MongoDB, PostgreSQL, MySQL, Supabase, Redis.`,
    metadata: { type: 'skills', category: 'Backend Technologies', source: 'hardcoded' }
  },
  {
    content: `Deployment & DevOps Skills: Docker, Kubernetes, CI/CD, AWS, GCP, Azure, Digital Ocean, Vercel.`,
    metadata: { type: 'skills', category: 'Deployment & DevOps', source: 'hardcoded' }
  },

  // EXPERIENCE (9 POSITIONS)
  {
    content: `Freelance AI/ML Engineer (Aug 2024 - Present, Remote) - Building production-ready AI systems and multi-agent applications. Achievements: Engineered CFO AI Assistant with 95%+ accuracy using advanced RAG pipeline, Deployed AI Banking Assistant serving 700+ customers with secure 2FA, Implemented advanced RAG pipeline with 80% improvement in response precision, Developed real-time voice interaction with sub-2-second processing. Current Position.`,
    metadata: { type: 'experience', company: 'Freelance', role: 'Freelance AI/ML Engineer', period: '2024-present', source: 'hardcoded' }
  },
  {
    content: `Business Intelligence/CVM Manager at Smartcash PSB (Apr 2023 - Present, Lagos Nigeria) - Leading customer value management and BI initiatives. Achievements: Achieved 68.9% increase in revenue-earning customers within 6 months, Reduced monthly churn by 30% through data-driven retention strategies, Built Python automation achieving 1,440x efficiency improvement from full-day to sub-minute processing, Designed executive dashboards in Power BI for real-time metrics. Current Position.`,
    metadata: { type: 'experience', company: 'Smartcash PSB', role: 'Business Intelligence/CVM Manager', period: '2023-present', source: 'hardcoded' }
  },
  {
    content: `Data Analyst at Interswitch Group (Apr 2024 - Jun 2024, Lagos Nigeria) - Collaborated on complex business and payments analytics. Achievements: Designed dashboards in Tableau for payment transaction monitoring, Optimized data pipelines using SQL for faster reporting, Analyzed payment trends to support strategic business decisions.`,
    metadata: { type: 'experience', company: 'Interswitch Group', role: 'Data Analyst', period: '2024', source: 'hardcoded' }
  },
  {
    content: `Data Analyst at Mustard (Mar 2023 - Jun 2023, Remote) - Fintech platform focused on financial product analytics. Achievements: Delivered stakeholder presentations improving financial product adoption by 32%, Automated data cleaning with Python cutting prep time by 50%, Created customer segmentation models for targeted marketing.`,
    metadata: { type: 'experience', company: 'Mustard', role: 'Data Analyst', period: '2023', source: 'hardcoded' }
  },
  {
    content: `Data Analyst/Assistant Teacher at JAF College (Jan 2021 - Feb 2023, Abeokuta Nigeria) - Dual role managing student data and teaching mathematics. Achievements: Managed student performance data and academic reporting systems, Taught mathematics to secondary school students, Developed automated grading systems.`,
    metadata: { type: 'experience', company: 'JAF College', role: 'Data Analyst/Assistant Teacher', period: '2021-2023', source: 'hardcoded' }
  },
  {
    content: `Data Analyst Intern at PwC Legal Switzerland (Aug 2022 - Dec 2022, Remote) - Virtual internship focused on legal data analysis. Achievements: Analyzed legal case data for pattern recognition, Created visualizations for case outcome predictions.`,
    metadata: { type: 'experience', company: 'PwC Legal Switzerland', role: 'Data Analyst Intern', period: '2022', source: 'hardcoded' }
  },
  {
    content: `Data Analyst Intern at Tata Group Mumbai India (Sep 2022 - Dec 2022, Remote) - Virtual internship in business intelligence. Achievements: Performed data analysis on sales and operations data, Created dashboards for business performance tracking.`,
    metadata: { type: 'experience', company: 'Tata Group Mumbai India', role: 'Data Analyst Intern', period: '2022', source: 'hardcoded' }
  },
  {
    content: `Data Analyst Virtual Intern at Accenture (Nov 2022 - Dec 2022, Remote) - Virtual experience program in data analytics. Achievements: Completed data cleaning and visualization projects, Presented insights to virtual stakeholders.`,
    metadata: { type: 'experience', company: 'Accenture', role: 'Data Analyst Virtual Intern', period: '2022', source: 'hardcoded' }
  },
  {
    content: `Statistical Officer at National Bureau of Statistics Nigeria (Sep 2019 - Mar 2020, Abeokuta Nigeria) - Government statistical data collection and analysis. Achievements: Conducted field surveys for national statistics, Processed and validated survey data for accuracy.`,
    metadata: { type: 'experience', company: 'National Bureau of Statistics Nigeria', role: 'Statistical Officer', period: '2019-2020', source: 'hardcoded' }
  },

  // CERTIFICATIONS (14 TOTAL)
  {
    content: `Model Context Protocol (MCP): Hands-On with Agentic AI - LinkedIn Learning (Dec 2025). 55-minute hands-on course covering MCP for building advanced agentic AI systems. Skills: Anthropic Claude, AI Agents, Artificial Intelligence, Model Context Protocol. Credential: https://drive.google.com/file/d/18jGdt5sPcXFx2WXrs31myfmPvzfb2UgD/view?usp=sharing`,
    metadata: { type: 'certification', issuer: 'LinkedIn Learning', date: '2025-12', source: 'hardcoded' }
  },
  {
    content: `Hands-On AI: Building AI Agents with MCP and A2A - LinkedIn Learning (Dec 2025). Practical course on building AI agents with MCP and A2A protocols. Skills: AI Agents, Artificial Intelligence, Generative AI, MCP, A2A. Credential: https://drive.google.com/file/d/1CoX-211FLYRziL7h1egBU_118ZlunZSA/view?usp=sharing`,
    metadata: { type: 'certification', issuer: 'LinkedIn Learning', date: '2025-12', source: 'hardcoded' }
  },
  {
    content: `AI Engineer Core Track: LLM Engineering, RAG, QLoRA, Agents - Ligency/Udemy (Dec 2025). Comprehensive training in production-ready LLM applications, RAG systems, QLoRA fine-tuning, autonomous AI agents. 58.5 hours. Skills: LLM Engineering, RAG Systems, QLoRA Fine-tuning, AI Agents, LangChain. Credential: https://drive.google.com/file/d/1vh8YIl2T_Ba_jjAdpvTD1N1ZTX3MsCyC/view?usp=sharing`,
    metadata: { type: 'certification', issuer: 'Ligency Udemy', date: '2025-12', source: 'hardcoded' }
  },
  {
    content: `Career Essentials in Generative AI - Microsoft & LinkedIn Learning (Jun 2025). Learning Path covering generative AI essentials, Microsoft Copilot, responsible AI practices. 6 hours. Skills: Microsoft Copilot, Generative AI, Responsible AI. Credential: https://www.linkedin.com/learning/certificates/7fc629b7a7486c14740d0d77b343f897954f58ebffbd6da200a814094c067ff6`,
    metadata: { type: 'certification', issuer: 'Microsoft', date: '2025-06', source: 'hardcoded' }
  },
  {
    content: `Microsoft Certified: Fabric Analytics Engineer Associate - Microsoft (Dec 2024). Professional certification in Microsoft Fabric analytics engineering. ID: 8B098D6A3FF9E285. Skills: Microsoft Fabric, Data Analytics, Cloud Engineering, ETL, Data Warehousing. Credential: https://learn.microsoft.com/en-us/users/purepen-1376/credentials/8b098d6a3ff9e285`,
    metadata: { type: 'certification', issuer: 'Microsoft', date: '2024-12', credentialId: '8B098D6A3FF9E285', source: 'hardcoded' }
  },
  {
    content: `Applied Data Science Lab - WorldQuant University (Dec 2024). Applied data science methodologies, practical implementations, real-world applications. Skills: Data Science, Python, Machine Learning, Statistical Analysis, Data Analytics. Credential: https://www.credly.com/badges/3d3283e9-195f-4518-9a8f-03fe9c812020/linked_in_profile`,
    metadata: { type: 'certification', issuer: 'WorldQuant University', date: '2024-12', source: 'hardcoded' }
  },
  {
    content: `Microsoft Certified: Power BI Data Analyst Associate - Microsoft (Apr 2024). Power BI data analysis, visualization, business intelligence. ID: F839D41AFEEFDF41. Skills: Power BI, Data Analysis, DAX, Data Visualization, Business Intelligence. Credential: https://learn.microsoft.com/en-us/users/purepen-1376/credentials/f839d41afeefdf41`,
    metadata: { type: 'certification', issuer: 'Microsoft', date: '2024-04', credentialId: 'F839D41AFEEFDF41', source: 'hardcoded' }
  },
  {
    content: `Data Analytics and Visualization Virtual Experience - Accenture/Forage (Dec 2022). Project understanding, data cleaning & modeling, data visualization & storytelling, client presentation. Skills: Data Analytics, Data Visualization, Data Modeling, Client Presentation, Storytelling. Credential: https://drive.google.com/file/d/1-59qHNZS3O50sEIrhXPsiIZwosvOxak3/view?usp=sharing`,
    metadata: { type: 'certification', issuer: 'Accenture', date: '2022-12', source: 'hardcoded' }
  },
  {
    content: `Power BI in Data Analytics Virtual Case Experience - PwC/Forage (Dec 2022). Call centre trends analysis, customer retention strategies, diversity & inclusion metrics, Power BI dashboard development. Skills: Power BI, Customer Analytics, KPI Development, Dashboard Design, Data Analysis. Credential: https://drive.google.com/file/d/1q69Pqf2sZiWunNFk66M_V4Dw5jUC-KBu/view?usp=sharing`,
    metadata: { type: 'certification', issuer: 'PwC', date: '2022-12', source: 'hardcoded' }
  },
  {
    content: `Data Visualisation: Empowering Business with Effective Insights - Tata/Forage (Dec 2022). Framing business scenarios, choosing visuals, creating effective visualizations, communicating insights. Skills: Data Visualization, Business Intelligence, Communication, Visual Analytics, Tableau. Credential: https://drive.google.com/file/d/1ySv3VuFFlgHQlGafyf0Iki8CoBuFgJFm/view?usp=sharing`,
    metadata: { type: 'certification', issuer: 'Tata', date: '2022-12', source: 'hardcoded' }
  },
  {
    content: `Data Analytics Internship Certificate - Side Hustle (Oct 2022). Completed cohort 6 Side Hustle Internship, executed all individual and team data analytics tasks. ID: SH-IT-0364438. Skills: Data Analytics, Team Collaboration, Python, Data Cleaning, Excel. Credential: https://drive.google.com/file/d/1_DkWIAmPDV74WzTCZqUxfEZ89PyXsqO0/view?usp=sharing`,
    metadata: { type: 'certification', issuer: 'Side Hustle', date: '2022-10', credentialId: 'SH-IT-0364438', source: 'hardcoded' }
  },
  {
    content: `SQL Course Completion Certificate - Sololearn (Oct 2022). Theoretical and practical SQL understanding: queries, joins, subqueries, database design, data manipulation. ID: CT-2YME5B7L. Skills: SQL, Database Design, Queries, Data Manipulation, Joins. Credential: https://drive.google.com/file/d/1_5RTM3uqSsb-aaQh_HhKfms73eQR4BUd/view?usp=sharing`,
    metadata: { type: 'certification', issuer: 'Sololearn', date: '2022-10', credentialId: 'CT-2YME5B7L', source: 'hardcoded' }
  },
  {
    content: `Google Data Analytics Professional Certificate - Google/Coursera (Sep 2022). 8-course specialization: data foundations, SQL, data cleaning & preparation, analysis, Tableau visualization, R programming, capstone project. Skills: Data Analytics, SQL, Tableau, R Programming, Data Visualization. Credential: https://drive.google.com/file/d/1_6hwvZkR5FiZ6tGVTxsW3YXnCcxQcXq7/view?usp=sharing`,
    metadata: { type: 'certification', issuer: 'Google', date: '2022-09', source: 'hardcoded' }
  },
  {
    content: `Jobberman Soft-Skills Training - Jobberman Nigeria/Mastercard Foundation (Sep 2022). Completed Jobberman Soft-Skills Training focused on professional development and workplace skills. Skills: Communication, Teamwork, Problem Solving, Time Management, Professional Development. Credential: https://drive.google.com/file/d/1_51L_xhBa-0MD3GDznF1chFfQMDy4qW9/view?usp=sharing`,
    metadata: { type: 'certification', issuer: 'Jobberman Nigeria', date: '2022-09', source: 'hardcoded' }
  },

  // CONTACT
  {
    content: `Contact: Email purepen1376@gmail.com, Phone +234 703 164 3120, LinkedIn https://linkedin.com/in/micheal-olaniyi, GitHub https://github.com/micheal-olaniyi, Location Lagos State Nigeria.`,
    metadata: { type: 'contact', source: 'hardcoded' }
  },

  // RECOMMENDATIONS (3 TOTAL)
  {
    content: `Professional Recommendation from Adeshina Tosin, CEO at TOSZ Empire: "Micheal is exceptionally proactive and innovative. He played a key role in building an AI-powered website for my small business, which has significantly contributed to our growth and scalability. His expertise and execution are top-notch, and the impact of his work speaks for itself."`,
    metadata: { type: 'recommendation', recommender: 'Adeshina Tosin', company: 'TOSZ Empire', role: 'CEO', source: 'hardcoded' }
  },
  {
    content: `Professional Recommendation from Sheriff Kolapo, Sales & Marketing Manager at Airtel SmartCash PSB: "Working with Micheal in the Customer Value Management space has been truly impactful. His strong data-driven approach to customer retention and churn reduction directly supported revenue-earning customers and delivered measurable business value. His professionalism and analytical depth stand out."`,
    metadata: { type: 'recommendation', recommender: 'Sheriff Kolapo', company: 'Airtel SmartCash PSB', role: 'Sales & Marketing Manager', source: 'hardcoded' }
  },
  {
    content: `Professional Recommendation from Nosa Nick, CEO at Mustard: "Micheal brings unmatched energy, reliability, and technical expertise to every engagement. His data proficiency was one of the core strengths we relied on during the early stages of building Mustard, and it played a critical role in shaping our niche and growth trajectory."`,
    metadata: { type: 'recommendation', recommender: 'Nosa Nick', company: 'Mustard', role: 'CEO', source: 'hardcoded' }
  },
];

async function generateEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  });
  return response.data[0].embedding;
}

async function storeChunk(content: string, embedding: number[], metadata: Record<string, any>) {
  const { error } = await supabase.from('documents').insert({
    content,
    embedding,
    metadata,
  });
  if (error) throw error;
}

async function embedDocuments() {
  console.log('🚀 Starting comprehensive document embedding...\n');

  let totalChunks = 0;
  let successCount = 0;
  let errorCount = 0;

  console.log(`📝 Embedding ${portfolioChunks.length} portfolio chunks...\n`);

  for (let i = 0; i < portfolioChunks.length; i++) {
    const chunk = portfolioChunks[i];
    try {
      console.log(`  [${i + 1}/${portfolioChunks.length}] ${chunk.metadata.type}...`);
      const embedding = await generateEmbedding(chunk.content);
      await storeChunk(chunk.content, embedding, chunk.metadata);
      successCount++;
      totalChunks++;
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`  ❌ Error: ${error}`);
      errorCount++;
    }
  }

  console.log(`\n✅ Portfolio: ${successCount} chunks embedded\n`);

  // Process additional documents
  const documentsPath = path.join(process.cwd(), 'public', 'documents');
  try {
    const files = getDocumentFiles(documentsPath);
    if (files.length > 0) {
      console.log(`📁 Found ${files.length} additional document(s)\n`);
      for (const filePath of files) {
        const fileName = path.basename(filePath);
        console.log(`📄 Processing: ${fileName}`);
        try {
          const text = await processDocument(filePath);
          const cleanedText = cleanText(text);
          if (!cleanedText || cleanedText.length < 50) {
            console.log(`  ⚠️  Skipped (too short)\n`);
            continue;
          }
          const chunks = chunkText(cleanedText, 512, 50);
          console.log(`  Split into ${chunks.length} chunks`);
          for (let i = 0; i < chunks.length; i++) {
            try {
              console.log(`    Chunk ${i + 1}/${chunks.length}...`);
              const embedding = await generateEmbedding(chunks[i]);
              await storeChunk(chunks[i], embedding, {
                source: 'document',
                file_name: fileName,
                file_path: filePath,
                chunk_index: i,
                total_chunks: chunks.length,
              });
              successCount++;
              totalChunks++;
              await new Promise(resolve => setTimeout(resolve, 100));
            } catch (error) {
              console.error(`    ❌ Error: ${error}`);
              errorCount++;
            }
          }
          console.log(`  ✅ ${fileName}: ${chunks.length} chunks\n`);
        } catch (error) {
          console.error(`  ❌ Failed: ${error}\n`);
          errorCount++;
        }
      }
    }
  } catch (error) {
    console.log(`⚠️  No documents folder\n`);
  }

  console.log('═'.repeat(60));
  console.log('🎉 EMBEDDING COMPLETE!');
  console.log('═'.repeat(60));
  console.log(`📊 Total: ${totalChunks}`);
  console.log(`✅ Success: ${successCount}`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log(`💰 Cost: $${(successCount * 0.00002).toFixed(4)}`);
  console.log('\n📋 Embedded:');
  console.log(`   • 1 Intro`);
  console.log(`   • 6 Projects (GitHub/Demo links)`);
  console.log(`   • 5 Skill Categories`);
  console.log(`   • 9 Work Experiences`);
  console.log(`   • 14 Certifications (credential URLs)`);
  console.log(`   • 1 Contact Info`);
  console.log(`   • 3 Recommendations`);
  console.log(`   • ${totalChunks - 39} Additional docs (if any)`);
  console.log('═'.repeat(60));
}

embedDocuments().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});