'use client';

import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, ExternalLink, Phone } from 'lucide-react';

interface ContactMethod {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  link?: string;
  bgColor: string;
  iconColor: string;
}

const contactMethods: ContactMethod[] = [
  {
    id: 'email',
    icon: Mail,
    label: 'EMAIL',
    value: 'purepen1376@gmail.com',
    link: 'mailto:purepen1376@gmail.com',
    bgColor: 'bg-cyan-50',
    iconColor: 'bg-cyan-500'
  },
  {
    id: 'phone',
    icon: Phone,
    label: 'PHONE',
    value: '+234 703 164 3120',
    link: 'tel:+2347031643120',
    bgColor: 'bg-emerald-50',
    iconColor: 'bg-emerald-500'
  },
  {
    id: 'linkedin',
    icon: Linkedin,
    label: 'LINKEDIN',
    value: 'View Profile',
    link: 'https://linkedin.com/in/micheal-olaniyi',
    bgColor: 'bg-blue-50',
    iconColor: 'bg-blue-600'
  },
  {
    id: 'github',
    icon: Github,
    label: 'GITHUB',
    value: 'View Repositories',
    link: 'https://github.com/micheal-olaniyi',
    bgColor: 'bg-gray-50',
    iconColor: 'bg-gray-900'
  }
];

export default function ContactResponse() {
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
          You can reach me via email or connect with me on LinkedIn and GitHub. Here are my contact details:
        </p>
      </div>

      {/* Contact Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-2xl"
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="text-4xl">📧</div>
          <h3 className="text-2xl font-bold text-gray-800">
            Get in Touch
          </h3>
        </div>

        {/* Contact Methods */}
        <div className="space-y-4 mb-6">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            const isClickable = method.link && method.id !== 'email' && method.id !== 'phone';
            
            return (
              <motion.div
                key={method.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
              >
                {isClickable ? (
                  <a
                    href={method.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-4 p-4 rounded-xl ${method.bgColor} hover:shadow-md transition-all duration-200 group`}
                  >
                    {/* Icon */}
                    <div className={`w-12 h-12 ${method.iconColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-gray-500 tracking-wider mb-1">
                        {method.label}
                      </p>
                      <p className="text-gray-800 font-medium flex items-center gap-2">
                        {method.value}
                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                      </p>
                    </div>
                  </a>
                ) : (
                  <div className={`flex items-center gap-4 p-4 rounded-xl ${method.bgColor}`}>
                    {/* Icon */}
                    <div className={`w-12 h-12 ${method.iconColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-gray-500 tracking-wider mb-1">
                        {method.label}
                      </p>
                      {method.link ? (
                        <a 
                          href={method.link}
                          className="text-gray-800 font-medium hover:text-emerald-600 transition-colors"
                        >
                          {method.value}
                        </a>
                      ) : (
                        <p className="text-gray-800 font-medium">
                          {method.value}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Send Email Button */}
        <motion.a
          href="mailto:purepen1376@gmail.com"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-gradient-to-r from-emerald-500 to-amber-400 hover:from-emerald-600 hover:to-amber-500 rounded-xl text-white font-semibold text-lg transition-all duration-200 hover:shadow-lg"
        >
          <Mail className="w-5 h-5" />
          Send Email
        </motion.a>
      </motion.div>
    </motion.div>
  );
}