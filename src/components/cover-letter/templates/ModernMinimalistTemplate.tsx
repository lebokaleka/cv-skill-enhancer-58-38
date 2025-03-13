
import React from 'react';

interface ModernMinimalistTemplateProps {
  content?: string;
  userData?: {
    name: string;
    title: string;
    email: string;
    phone: string;
    linkedin: string;
    date?: string;
  };
}

const ModernMinimalistTemplate: React.FC<ModernMinimalistTemplateProps> = ({
  content = '',
  userData = {
    name: 'ALEX MORGAN',
    title: 'UX DESIGNER',
    email: 'alex@example.com',
    phone: '(555) 123-4567',
    linkedin: 'linkedin.com/in/alexmorgan',
    date: 'May 15, 2024'
  }
}) => {
  // Split content by paragraphs for formatting
  const contentParagraphs = content ? content.split('\n\n') : [
    "Dear Hiring Manager,",
    "I am writing to express my interest in the UX Designer position at Acme Corporation as advertised on your career page. With my background in user-centered design and experience creating intuitive digital experiences, I believe I would be a valuable addition to your team.",
    "Throughout my career, I have focused on combining aesthetic design with functional usability to create products that users genuinely enjoy interacting with. My work on the recent redesign of XYZ App resulted in a 45% increase in user engagement and a significant reduction in customer support inquiries.",
    "I am particularly drawn to Acme Corporation because of your commitment to innovation and your user-first approach to product development. These values align perfectly with my own professional philosophy, and I am excited about the possibility of contributing to your continued success.",
    "Thank you for considering my application. I look forward to the opportunity to discuss how my skills and experience could benefit your team.",
    "Sincerely,",
    "Alex Morgan"
  ];

  return (
    <div className="bg-white text-black rounded-md shadow-md overflow-hidden border border-slate-200">
      <div className="p-8 max-w-[800px] mx-auto">
        {/* Header section */}
        <div className="mb-10">
          <h1 className="text-3xl font-light tracking-wide text-gray-800 mb-2">{userData.name}</h1>
          <p className="text-sm font-medium tracking-wider text-gray-500 mb-4">{userData.title}</p>
          
          <div className="flex flex-wrap gap-6 text-xs text-gray-600">
            <span>{userData.email}</span>
            <span>{userData.phone}</span>
            <span>{userData.linkedin}</span>
            {userData.date && <span className="ml-auto">{userData.date}</span>}
          </div>
          
          <div className="h-px bg-gray-200 w-full mt-4"></div>
        </div>
        
        {/* Letter content */}
        <div className="text-sm leading-relaxed text-gray-700 space-y-4">
          {contentParagraphs.map((paragraph, index) => (
            <p 
              key={index} 
              className={`${index === 0 || index === contentParagraphs.length - 1 || index === contentParagraphs.length - 2 ? 'font-medium' : ''}`}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModernMinimalistTemplate;
