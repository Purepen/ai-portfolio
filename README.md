# Micheal Olaniyi - AI Portfolio

A modern, interactive AI-powered portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features an intelligent chatbot powered by Claude Sonnet 4 that can answer questions about experience, skills, and projects using RAG (Retrieval Augmented Generation).

## 🚀 Features

- **Conversational AI Interface**: Chat with an AI assistant to learn about the portfolio
- **RAG-Powered Responses**: Context-aware answers using portfolio data retrieval
- **Smooth Animations**: Polished UI with Framer Motion animations
- **Tab Navigation**: Quick-access buttons for common questions
- **Production-Ready**: Optimized for performance and SEO
- **Responsive Design**: Works seamlessly on all devices

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: Anthropic Claude Sonnet 4
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Anthropic API key ([Get one here](https://console.anthropic.com/))

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Then edit `.env.local` and add your Anthropic API key:
   ```
   ANTHROPIC_API_KEY=your_anthropic_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
ai-portfolio/
├── app/
│   ├── api/chat/         # API route for AI chat
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Main page
│   └── globals.css       # Global styles
├── components/
│   ├── BackgroundPattern.tsx
│   ├── ChatInterface.tsx
│   ├── HeroSection.tsx
│   ├── LoadingDots.tsx
│   ├── MessageBubble.tsx
│   └── TabNavigation.tsx
├── lib/
│   ├── portfolio-data.ts # Portfolio content
│   ├── rag-utils.ts      # RAG retrieval logic
│   └── types.ts          # TypeScript types
└── public/
```

## 🎨 Customization

### Update Portfolio Data

Edit `lib/portfolio-data.ts` to update your:
- Personal information
- Skills
- Projects
- Work experience
- Education
- Certifications

### Change Color Scheme

The current theme uses green-yellow gradient. To change:

1. Edit `tailwind.config.ts`:
   ```typescript
   colors: {
     primary: {
       start: "#yourStartColor",
       end: "#yourEndColor",
     },
   }
   ```

2. Update gradient classes in components:
   - `HeroSection.tsx`
   - `MessageBubble.tsx`
   - `ChatInterface.tsx`

### Modify Hero Tagline

Edit the cycling words in `components/HeroSection.tsx`:
```typescript
const cyclingWords = ['understands', 'solves', 'recreates'];
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variable `ANTHROPIC_API_KEY`
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Digital Ocean
- Railway

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `ANTHROPIC_API_KEY` | Your Anthropic API key | Yes |

## 🧪 Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 🎯 Key Features Explained

### RAG System
The portfolio uses a simple keyword-based RAG system that:
1. Analyzes user queries for keywords
2. Retrieves relevant portfolio sections
3. Injects context into Claude's system prompt
4. Generates natural, contextual responses

### Animation Strategy
- Hero section: Staggered entrance animations
- Cycling text: Smooth word transitions
- Chat bubbles: Fade-in with slight delay
- Buttons: Hover and tap feedback

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Adaptive font sizes
- Touch-friendly buttons

## 📄 License

MIT License - Feel free to use this for your own portfolio!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

**Micheal Olaniyi Oluwatosin**
- Email: purepen1376@gmail.com
- LinkedIn: [linkedin.com/in/micheal-olaniyi](https://linkedin.com/in/micheal-olaniyi)
- GitHub: [github.com/micheal-olaniyi](https://github.com/micheal-olaniyi)

---

Built with ❤️ using Next.js and Claude Sonnet 4
