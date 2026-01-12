import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Micheal Olaniyi | AI/ML Engineer|Data /AI Automation Specialist",
  description: "Innovative AI/ML Engineer with 4+ years of experience building production-ready AI systems, specializing in LLM engineering, multi-agent architectures, Data automation and RAG-based applications.",
  keywords: ["AI Engineer", "ML Engineer", "LLM", "RAG", "Multi-agent systems", "Python", "Machine Learning"],
  authors: [{ name: "Micheal Olaniyi Oluwatosin" }],
  openGraph: {
    title: "Micheal Olaniyi | AI/ML Engineer|Data /AI Automation Specialist",
    description: "Innovative AI/ML Engineer specializing in LLM engineering, Data automationand multi-agent systems",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
