// components/CVButton.tsx - ADJUSTED FOR DARK MODE
'use client';

import { FileText, Download } from 'lucide-react';

interface CVButtonProps {
  resumeUrl?: string;
}

export default function CVButton({ resumeUrl = '/resume.pdf' }: CVButtonProps) {
  return (
    <div className="fixed top-6 left-6 z-50">
    <a
        href={resumeUrl}
        download="Micheal_Olaniyi_Resume.pdf"
        className="group flex items-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-amber-50 dark:hover:from-emerald-900/30 dark:hover:to-amber-900/30 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 hover:border-emerald-400 dark:hover:border-emerald-500 transition-all duration-300 hover:shadow-xl"
      >
        {/* CV Icon */}
        <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-emerald-500 to-amber-400 rounded-full text-white transition-transform duration-300 group-hover:scale-110">
          <FileText className="w-5 h-5" />
        </div>

        {/* Text - only shows on hover */}
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap font-medium text-gray-700 dark:text-gray-200">
          Download CV
        </span>

        {/* Download icon - only shows on hover */}
        <Download className="w-0 h-0 opacity-0 group-hover:w-4 group-hover:h-4 group-hover:opacity-100 transition-all duration-300 text-emerald-600 dark:text-emerald-400" />
      </a>
    </div>
  );
}