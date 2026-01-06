import { PortfolioData } from './types';

export const portfolioData: PortfolioData = {
  name: "Micheal Olaniyi Oluwatosin",
  title: "AI/ML Engineer, Data & Business Intelligence Manager",
  location: "Lagos, Nigeria",
  email: "purepen1376@gmail.com",
  phone: ["+234 703 164 3120", "+234 904 1592 542"],
  linkedin: "https://linkedin.com/in/micheal-olaniyi",
  github: "https://github.com/micheal-olaniyi",
  portfolio: "https://portfolio-link.com",
  
  summary: "Innovative AI/ML Engineer with 4+ years of experience building production-ready AI systems, specializing in LLM engineering, multi-agent architectures, and RAG-based applications. Expert in developing intelligent voice-enabled assistants, agentic AI systems, and NLP solutions that drive operational efficiency and customer engagement.",
  
  skills: [
    {
      category: "Artificial Intelligence & Machine Learning",
      items: [
        "LLM Engineering: OpenAI GPT-4o/GPT-4o-mini, Claude Sonnet 4",
        "Prompt Engineering, Function/Tool Calling, Fine-tuning",
        "Agentic AI: Multi-agent systems, LangChain, LangGraph",
        "RAG Systems: ChromaDB, FAISS, Pinecone, Semantic search",
        "NLP & Voice AI: Whisper API, TTS-1 API, BERT, NLTK",
        "Machine Learning: Scikit-learn, TensorFlow, Keras, PyTorch",
        "Algorithms & Data Structures: Hash tables, Trees, Graphs, Dynamic programming"
      ]
    },
    {
      category: "Data Engineering & Analytics",
      items: [
        "Python (Advanced - 4+ years production experience)",
        "SQL, JavaScript (NodeJS, React), R programming",
        "Python Libraries: Pandas, NumPy, AsyncIO, FastAPI",
        "Databases: SQLite, PostgreSQL, MySQL, MongoDB, BigQuery",
        "Big Data & ETL: Apache Airflow, Kafka, dbt",
        "Business Intelligence: Power BI, Tableau, Looker"
      ]
    },
    {
      category: "Deployment & DevOps",
      items: [
        "Cloud Platforms: AWS, GCP, Azure, Digital Ocean",
        "Containerization: Docker, Kubernetes",
        "API Development: FastAPI, REST APIs, Gradio, Streamlit",
        "Version Control: Git, GitHub"
      ]
    }
  ],
  
  projects: [
    {
      name: "AI Banking Assistant",
      category: "AI Tools",
      year: "2025",
      status: "Completed",
      description: "Voice-enabled banking system with 8 specialized agents, secure 2FA, and real-time processing serving 700+ users. Achieved sub-2-second response times with optimized async processing.",
      techStack: ["Python", "FastAPI", "AsyncIO", "SQLite", "Gradio", "OpenAI GPT-4o-mini", "Whisper API", "TTS-1"],
      links: {
        github: "https://github.com/micheal-olaniyi/ai-banking-assistant"
      }
    },
    {
      name: "CFO AI Assistant v1 & v2",
      category: "AI Tools",
      year: "2025",
      status: "Completed",
      description: "Multi-agent financial intelligence system for Nigerian bank CFOs with intelligent query routing and RAG pipeline achieving 95%+ accuracy. Implemented efficient data structures for vector search optimization.",
      techStack: ["Python", "Claude Sonnet 4", "LangChain", "LangGraph", "ChromaDB", "Sentence Transformers", "FastAPI"],
      links: {
        github: "https://github.com/micheal-olaniyi/cfo-ai-assistant"
      }
    },
    {
      name: "Credit Risk Model",
      category: "Machine Learning",
      year: "2024",
      status: "Completed",
      description: "Machine learning model for credit risk assessment and loan application approval with comprehensive analysis.",
      techStack: ["Python", "Scikit-learn", "Pandas", "XGBoost"],
    },
    {
      name: "WhatsApp Group Analysis Tool",
      category: "Analytics",
      year: "2024",
      status: "Completed",
      description: "Python-based tool for analyzing WhatsApp group conversations with sentiment analysis and visualization.",
      techStack: ["Python", "NLTK", "Matplotlib", "Pandas"],
    }
  ],
  
  experience: [
    {
      title: "Artificial Intelligence/ML Engineer",
      company: "Freelance (Consulting Projects)",
      location: "Remote",
      period: "August 2024 – Present",
      type: "Consulting",
      description: "Building production-ready AI systems and multi-agent applications for enterprise clients.",
      achievements: [
        "Engineered CFO AI Assistant with 95%+ accuracy in financial analysis",
        "Deployed AI Banking Assistant serving 700+ customers with secure 2FA",
        "Implemented advanced RAG pipeline with 80% improvement in response precision",
        "Developed real-time voice interaction system with sub-2-second processing time",
        "Optimized Python code for sub-second query response across 1,000+ concurrent sessions"
      ],
      techStack: ["Python", "Claude Sonnet 4", "OpenAI GPT-4o", "LangChain", "FastAPI", "ChromaDB"]
    },
    {
      title: "Business Intelligence/CVM Manager",
      company: "Smartcash PSB (Airtel Money)",
      location: "Hybrid",
      period: "April 2023 – Present",
      type: "Full-Time",
      description: "Leading customer value management and business intelligence initiatives for a leading payment service bank.",
      achievements: [
        "Achieved 68.9% increase in revenue-earning customers within 6 months",
        "Reduced monthly churn by 30% through targeted segmentation strategies",
        "Led audience segmentation increasing revenue-generating customers by 30%",
        "Built Python automation achieving 1,440x efficiency improvement (full-day to sub-minute processing)",
        "Designed and optimized marketing dashboards for acquisition and retention campaigns"
      ],
      techStack: ["SQL", "Python", "Power BI", "WebEngage"]
    },
    {
      title: "Data Analyst (Apprenticeship)",
      company: "Interswitch Group",
      location: "Hybrid",
      period: "April 2024 – June 2024",
      type: "Apprenticeship",
      description: "Collaborated on complex business and payments analytics problems for Africa's leading digital payments company.",
      achievements: [
        "Designed dashboards in Tableau and optimized data pipelines using SQL",
        "Acted as Assistant Program Representative coordinating participants across projects"
      ],
      techStack: ["Tableau", "SQL", "Python"]
    }
  ],
  
  education: [
    "BAsc Applied Data Science, WorldQuant University, LA USA (2024)",
    "B.Sc. Pure Mathematics, Federal University of Agriculture, Abeokuta (2021)",
    "N.C.E. Mathematics/Chemistry, Federal College of Education, Osiele, Abeokuta (2016)"
  ],
  
  certifications: [
    "Microsoft Fabric Analytics Engineer Associate (2024)",
    "Microsoft Power BI Associate Data Analyst (2024)",
    "Microsoft Generative AI (2025)",
    "LLM Engineering, RAG, QLoRA, Agents - Udemy (2025)",
    "Google Data Analytics - Coursera (2022)",
    "Data Analytics – Side Hustle (2022)"
  ],
  
  languages: ["English (Fluent)"]
};

export const tabs = [
  {
    id: "intro",
    label: "Intro",
    prompt: "Tell me about yourself and your background?"
  },
  {
    id: "skills",
    label: "Skills",
    prompt: "What are your core skills and technical expertise?"
  },
  {
    id: "projects",
    label: "Projects",
    prompt: "What projects have you worked on?"
  },
  {
    id: "experience",
    label: "Experience",
    prompt: "Tell me about your work experience?"
  },
  {
    id: "contact",
    label: "Contact",
    prompt: "How can I contact you?"
  }
];
