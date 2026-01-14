# Micheal Olaniyi - AI-Powered Portfolio

A production-ready, interactive AI-powered portfolio website featuring a conversational RAG system built with Next.js 15, Claude Sonnet 4, and Supabase vector search. Visitors can explore projects, skills, experience, and certifications through natural language queries with real-time streaming responses.

## ✨ Features

### 🤖 **AI-Powered Conversational Interface**
- **Claude Sonnet 4 Integration**: Intelligent responses powered by Anthropic's latest model
- **RAG System**: Vector-based retrieval using Supabase (PostgreSQL + pgvector)
- **Real-time Streaming**: Fast, token-by-token response streaming
- **Component-Based Rendering**: Dynamic UI components (Projects, Skills, Experience, Certifications, Contact)
- **Skill-Click Automation**: Click any skill pill to auto-generate contextual queries
- **Smart Filtering**: Filter projects/experience/certifications by category or keyword

### 🎨 **User Experience**
- **Stormy Animated Hero**: Eye-catching animated word frame with particle effects
- **Tab Navigation**: Quick-access buttons for common queries (Intro, Skills, Projects, etc.)
- **Floating Message Button**: Instant contact form trigger
- **Auto-Scroll**: Page automatically scrolls to chat on new messages
- **Message Limiting**: 10-message cap per session to protect API costs
- **Rate Limiting**: Server-side protection against abuse
- **Mobile Responsive**: Optimized for all screen sizes with horizontal scroll tabs

### 🛡️ **Production Features**
- **Cost Protection**: Message limits + rate limiting
- **Hydration Error-Free**: Deterministic animations prevent React hydration mismatches
- **Edge Runtime**: Fast response times using Vercel Edge Functions
- **Dark Mode Toggle**: Seamless theme switching
- **Clear Chat**: Reset conversation anytime
- **Contact Form**: In-chat contact form with email integration

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React

### **AI & Backend**
- **LLM**: Anthropic Claude Sonnet 4 (via Vercel AI SDK)
- **Embeddings**: OpenAI text-embedding-3-small
- **Vector Database**: Supabase (PostgreSQL + pgvector)
- **RAG Pipeline**: 42 embedded chunks (projects, skills, experience, certifications)
- **Streaming**: Vercel AI SDK streaming responses

### **Infrastructure**
- **Deployment**: Vercel (Edge Runtime)
- **Email**: Resend (optional, for contact form)
- **Rate Limiting**: LRU cache-based (10 req/min per IP)

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Anthropic API key ([Get one](https://console.anthropic.com/))
- OpenAI API key ([Get one](https://platform.openai.com/api-keys))
- Supabase account ([Sign up](https://supabase.com))
- (Optional) Resend API key for email ([Get one](https://resend.com))

## 🚀 Quick Start

### 1. **Clone & Install**
```bash
git clone https://github.com/micheal-olaniyi/ai-portfolio.git
cd ai-portfolio
npm install
```

### 2. **Set Up Supabase**

Create a new Supabase project, then run this SQL in the SQL Editor:

```sql
-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create documents table
CREATE TABLE documents (
  id BIGSERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  embedding VECTOR(1536),
  metadata JSONB
);

-- Create vector similarity search function
CREATE OR REPLACE FUNCTION match_documents(
  query_embedding VECTOR(1536),
  match_threshold FLOAT,
  match_count INT
)
RETURNS TABLE (
  id BIGINT,
  content TEXT,
  metadata JSONB,
  similarity FLOAT
)
LANGUAGE SQL STABLE
AS $$
  SELECT
    id,
    content,
    metadata,
    1 - (documents.embedding <=> query_embedding) AS similarity
  FROM documents
  WHERE 1 - (documents.embedding <=> query_embedding) > match_threshold
  ORDER BY similarity DESC
  LIMIT match_count;
$$;

-- Create index for faster similarity search
CREATE INDEX ON documents USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);
```

### 3. **Environment Variables**

Create `.env.local`:

```bash
# Anthropic (Claude)
ANTHROPIC_API_KEY=sk-ant-xxxxx

# OpenAI (Embeddings)
OPENAI_API_KEY=sk-xxxxx

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxxxx
SUPABASE_SERVICE_ROLE_KEY=eyJxxxxx

# Optional: Email (Resend)
RESEND_API_KEY=re_xxxxx
```

### 4. **Generate Embeddings**

Run the embedding script to populate your vector database:

```bash
npx tsx scripts/generate-embeddings.ts
```

This creates 42 chunks covering:
- Projects (8)
- Skills (5 categories)
- Experience (9 roles)
- Certifications (14)
- Contact info
- Recommendations (3)

### 5. **Run Development Server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
ai-portfolio/
├── app/
│   ├── api/
│   │   ├── chat/route.ts        # RAG + Claude streaming endpoint
│   │   └── contact/route.ts     # Contact form handler
│   ├── layout.tsx               # Root layout with metadata
│   ├── page.tsx                 # Main page with auto-scroll
│   └── globals.css              # Global styles + scrollbar
├── components/
│   ├── BackgroundPattern.tsx    # Animated dot pattern
│   ├── ChatInterface.tsx        # Main chat UI (with message limits)
│   ├── HeroSection.tsx          # Stormy animated hero
│   ├── TabNavigation.tsx        # Quick-access tabs
│   ├── FloatingMessageButton.tsx # Contact trigger button
│   ├── CVButton.tsx             # Resume download button
│   ├── DarkModeToggle.tsx       # Theme switcher
│   ├── MessageBubble.tsx        # Chat message display
│   ├── LoadingDots.tsx          # Loading animation
│   ├── ProjectsResponse.tsx     # Dynamic projects component
│   ├── SkillsResponse.tsx       # Skill pills with click handlers
│   ├── ExperienceResponse.tsx   # Work history timeline
│   ├── CertificationsResponse.tsx # Certifications grid
│   ├── ContactResponse.tsx      # Contact info display
│   ├── ContactFormResponse.tsx  # In-chat contact form
│   └── RecommendationsResponse.tsx # Testimonials
├── lib/
│   ├── component-parser.tsx     # Parses [COMPONENT:x] tags
│   └── rate-limit.ts            # LRU cache rate limiter
├── scripts/
│   └── generate-embeddings.ts   # Populates vector DB
└── public/
```

## 🎨 Customization

### **Update Portfolio Content**

Edit the hardcoded data in these components:
- **Projects**: `components/ProjectsResponse.tsx`
- **Skills**: `components/SkillsResponse.tsx`
- **Experience**: `components/ExperienceResponse.tsx`
- **Certifications**: `components/CertificationsResponse.tsx`

Then regenerate embeddings:
```bash
npx tsx scripts/generate-embeddings.ts
```

### **Change Colors**

Current theme: Emerald (#10b981) → Amber (#f59e0b)

To change, update gradient classes:
```typescript
// Find & replace across components:
from-emerald-500 to-amber-400
```

### **Modify Hero Animation**

Edit cycling phrases in `components/HeroSection.tsx`:
```typescript
const cyclingPhrases = ['scale', 'automate', 'optimize growth'];
```

### **Adjust Message Limit**

In `components/ChatInterface.tsx`:
```typescript
const MAX_MESSAGES = 10; // Change to your preference
```

### **Switch AI Model**

For cost savings, switch to Haiku in `app/api/chat/route.ts`:
```typescript
// Sonnet 4 (better quality, $3/1M input)
model: anthropic('claude-sonnet-4-20250514'),

// Haiku 4 (73% cheaper, $0.80/1M input)
model: anthropic('claude-haiku-4-5-20251001'),
```

## 🚀 Deployment

### **Vercel (Recommended)**

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

**Auto-deploys**: Every git push triggers automatic redeployment

### **Custom Domain**

1. Vercel Dashboard → Project Settings → Domains
2. Add your domain (e.g., `purepen.com`)
3. Update DNS records as instructed

## 🛡️ API Cost Protection

### **Built-in Safeguards**

1. **Client-side**: 10 messages per session
2. **Server-side**: 10 requests/minute per IP (rate limiting)
3. **Provider-side**: Set monthly spending limits in Anthropic/OpenAI dashboards

### **Monitoring**

Check usage:
- **Anthropic**: [console.anthropic.com](https://console.anthropic.com)
- **OpenAI**: [platform.openai.com/usage](https://platform.openai.com/usage)

## 📊 Performance

- **First Load**: < 3s
- **LCP**: < 2s
- **FID**: < 100ms
- **CLS**: < 0.1
- **Edge Response Time**: ~200-500ms

## 🧪 Development Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint

# Generate embeddings
npx tsx scripts/generate-embeddings.ts
```

## 🐛 Troubleshooting

### **Chat not responding**
1. Check browser console for errors
2. Verify environment variables are set
3. Check Anthropic API key is valid
4. Restart dev server: `npm run dev`

### **Hydration errors**
- Caused by `Math.random()` in animations
- Solution: Use deterministic particle positions (already fixed)

### **Rate limit errors**
- Increase limit in `lib/rate-limit.ts`
- Or add IP whitelist for testing

### **Vector search returns no results**
- Run embedding script: `npx tsx scripts/generate-embeddings.ts`
- Check Supabase connection
- Lower `match_threshold` in `app/api/chat/route.ts`

## 📝 License

MIT License - Free to use for your own portfolio!

## 🤝 Contributing

Contributions welcome! Open an issue or PR.

## 📧 Contact

**Micheal Olaniyi Oluwatosin**
- **Email**: purepen1376@gmail.com
- **LinkedIn**: [linkedin.com/in/micheal-olaniyi](https://linkedin.com/in/micheal-olaniyi)
- **GitHub**: [github.com/micheal-olaniyi](https://github.com/purepen)
- **Portfolio**: [micheal-olaniyi.vercel.app](https://purepen.vercel.app)

---

**Built with** ❤️ **using Next.js 15, Claude Sonnet 4, and Supabase**

⭐ Star this repo if you found it helpful!