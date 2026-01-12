// components/ContactResponse.tsx
'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Github, MapPin } from 'lucide-react';

interface ContactResponseProps {
  data?: {
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    location: string;
  };
}

export default function ContactResponse({ data }: ContactResponseProps) {
  const contactInfo = data || {
    email: 'purepen1376@gmail.com, olaniyimicheal1376@gmail.com',
    phone: '+2347031643120,+2349012222183,+2349041592542',
    linkedin: 'https://linkedin.com/in/micheal-olaniyi',
    github: 'https://github.com/purepen',
    location: 'Lagos State, Nigeria'
  };

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: contactInfo.email,
      link: `mailto:${contactInfo.email}`,
      color: 'bg-cyan-500',
      hoverColor: 'hover:bg-cyan-600'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: contactInfo.phone,
      link: `tel:${contactInfo.phone}`,
      color: 'bg-emerald-500',
      hoverColor: 'hover:bg-emerald-600'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'View Profile',
      link: contactInfo.linkedin,
      color: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700'
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'View Repositories',
      link: contactInfo.github,
      color: 'bg-gray-800',
      hoverColor: 'hover:bg-gray-900'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="my-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {contactMethods.map((method, idx) => {
          const Icon = method.icon;
          return (
            <motion.a
              key={idx}
              href={method.link}
              target={method.label === 'LinkedIn' || method.label === 'GitHub' ? '_blank' : undefined}
              rel={method.label === 'LinkedIn' || method.label === 'GitHub' ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="block"
            >
              <div className={`${method.color} ${method.hoverColor} text-white rounded-xl p-5 transition-all duration-300 shadow-md hover:shadow-xl`}>
                <div className="flex items-center gap-3 mb-2">
                  <Icon className="w-6 h-6" />
                  <h3 className="font-bold text-lg">{method.label}</h3>
                </div>
                <p className="text-sm text-white/90">{method.value}</p>
              </div>
            </motion.a>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm"
      >
        <MapPin className="w-4 h-4" />
        <span>{contactInfo.location}</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="mt-4"
      >
        <a
          href={`mailto:${contactInfo.email}`}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-amber-400 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
        >
          <Mail className="w-5 h-5" />
          Send Email
        </a>
      </motion.div>
    </motion.div>
  );
}