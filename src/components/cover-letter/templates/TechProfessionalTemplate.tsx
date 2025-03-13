
import React from 'react';

interface TechProfessionalTemplateProps {
  content?: string;
  userData?: {
    name: string;
    title: string;
    phone: string;
    email: string;
    linkedIn: string;
    location: string;
  };
}

const TechProfessionalTemplate: React.FC<TechProfessionalTemplateProps> = ({
  content = '',
  userData = {
    name: 'LUNA THOMAS',
    title: 'Product Manager | API Development | Strategic Innovation',
    phone: '+1-(234)-555-1234',
    email: 'hello@enhancv.com',
    linkedIn: 'linkedin.com',
    location: 'Los Angeles, California'
  }
}) => {
  // Split content by paragraphs for formatting
  const contentParagraphs = content ? content.split('\n\n') : [
    "Dear Hiring Manager,",
    "Understanding the nexus between market needs and technological capabilities is where my approach to product management begins. My career, underpinned by a perennial quest to craft innovative and effective solutions, aligns seamlessly with your company's vision of driving progressive change in the industry.",
    "In my role as Senior Product Manager at Google, I orchestrated a multifaceted initiative that led to the development and launch of four customer-first API tools. This endeavor not only heightened the productivity of software engineers by an impressive 30% but also saw a notable customer surge by 25% within its inaugural year. These figures not only exemplify adept strategy and execution but also echo my ability to lead teams towards delivering products that profoundly resonate with our customer base and spur the company's growth.",
    "I am eager to discuss how my background, skills, and awards, including the Product Launch Excellence Award for groundbreaking API products, can directly benefit your team. My aspiration is to contribute to your company's success through relentless innovation and customer-focused product development. I would welcome the opportunity to further explore how my expertise can align with your company's goals during an interview.",
    "Sincerely,",
    "LUNA THOMAS",
    "Product Manager"
  ];

  return (
    <div className="bg-white text-black rounded-md shadow-md overflow-hidden border border-slate-200 relative">
      {/* Hexagon pattern background */}
      <div className="absolute inset-0 z-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
            <polygon points="25,0 50,14.4 50,43.3 25,57.7 0,43.3 0,14.4" fill="none" stroke="#000" strokeWidth="1"></polygon>
          </pattern>
          <rect width="100%" height="100%" fill="url(#hexagons)"></rect>
        </svg>
      </div>
      
      {/* Header section */}
      <div className="relative z-10 p-6 pb-2">
        <h1 className="text-4xl font-bold tracking-tight">{userData.name}</h1>
        <p className="text-blue-500 font-medium mt-1">{userData.title}</p>
        
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-3 text-sm">
          <div className="flex items-center">
            <span className="text-gray-500 mr-1">📞</span>
            <span>{userData.phone}</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-500 mr-1">📧</span>
            <span>{userData.email}</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-500 mr-1">🔗</span>
            <span>{userData.linkedIn}</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-500 mr-1">📍</span>
            <span>{userData.location}</span>
          </div>
        </div>
      </div>
      
      {/* COVER LETTER header with line */}
      <div className="relative z-10 px-6 pt-4">
        <h2 className="text-lg font-bold mb-1 border-b border-black pb-1">COVER LETTER</h2>
      </div>
      
      {/* Letter content */}
      <div className="relative z-10 p-6 pt-3">
        <div className="text-sm">
          {contentParagraphs.map((paragraph, index) => (
            <p key={index} className={`mb-3 ${paragraph.startsWith('•') ? 'pl-4' : ''}`}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechProfessionalTemplate;
