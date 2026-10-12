import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Micheal Olaniyi | AI/ML Engineer | AI Automation & Data Science | BI/CVM Manager",
  description: "Innovative AI/ML Engineer with 7 years of data science and analytics experience, including 3+ years in fintech/payments, building production-ready AI systems and specializing in LLM engineering, multi-agent architectures, data automation and RAG-based applications.",
  keywords: ["AI Engineer", "ML Engineer", "LLM", "RAG", "Multi-agent systems", "Python", "Machine Learning"],
  authors: [{ name: "Micheal Olaniyi Oluwatosin" }],
  openGraph: {
    title: "Micheal Olaniyi | AI/ML Engineer | AI Automation & Data Science | BI/CVM Manager",
    description: "Innovative AI/ML Engineer specializing in LLM engineering, data automation and multi-agent systems",
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
