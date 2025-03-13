
import React from 'react';

interface CreativeAccentTemplateProps {
  content?: string;
  userData?: {
    name: string;
    title: string;
    email: string;
    phone: string;
    website: string;
    date?: string;
  };
}

const CreativeAccentTemplate: React.FC<CreativeAccentTemplateProps> = ({
  content = '',
  userData = {
    name: 'Jordan Rivers',
    title: 'Graphic Designer',
    email: 'jordan@designstudio.com',
    phone: '(555) 987-6543',
    website: 'jordanrivers.design',
    date: 'May 10, 2024'
  }
}) => {
  // Split content by paragraphs for formatting
  const contentParagraphs = content ? content.split('\n\n') : [
    "Dear Creative Team,",
    "I am excited to apply for the Graphic Designer position at Studio Creative. As a passionate designer with five years of experience creating compelling visual identities and marketing materials, I believe my creative approach would be a perfect fit for your innovative team.",
    "My portfolio showcases a diverse range of projects, from branding for startups to campaign materials for established corporations. I pride myself on delivering designs that not only look beautiful but also effectively communicate my clients' messages and values.",
    "I've been following Studio Creative's work for several years and have been particularly impressed by your recent campaign for Eco Essentials. Your ability to blend aesthetic appeal with meaningful storytelling is exactly the kind of work I aspire to create.",
    "I would welcome the opportunity to bring my creativity, technical skills, and collaborative spirit to your studio. Thank you for considering my application.",
    "Creatively yours,",
    "Jordan Rivers"
  ];

  return (
    <div className="bg-white text-black rounded-md shadow-md overflow-hidden border border-slate-200 flex">
      {/* Colorful sidebar */}
      <div className="w-24 bg-gradient-to-b from-purple-500 via-pink-500 to-orange-400"></div>
      
      {/* Main content */}
      <div className="flex-1 p-6">
        {/* Header section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">{userData.name}</h1>
          <p className="text-purple-600 font-medium mt-1">{userData.title}</p>
          
          <div className="flex flex-wrap gap-x-4 mt-3 text-sm text-gray-600">
            <span>{userData.email}</span>
            <span>{userData.phone}</span>
            <span>{userData.website}</span>
          </div>
          
          {userData.date && <p className="mt-6 text-sm text-gray-500">{userData.date}</p>}
        </div>
        
        {/* Letter content */}
        <div className="text-sm leading-relaxed space-y-4">
          {contentParagraphs.map((paragraph, index) => (
            <p 
              key={index} 
              className={`${index === 0 ? 'text-lg font-medium' : ''} ${index === contentParagraphs.length - 2 ? 'font-medium text-purple-600' : ''}`}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreativeAccentTemplate;
