
import React from 'react';

interface ExecutiveElegantTemplateProps {
  content?: string;
  userData?: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    date?: string;
  };
}

const ExecutiveElegantTemplate: React.FC<ExecutiveElegantTemplateProps> = ({
  content = '',
  userData = {
    name: 'Morgan Reynolds',
    title: 'Senior Executive',
    email: 'morgan.reynolds@executive.com',
    phone: '(555) 456-7890',
    location: 'New York, NY',
    date: 'May 12, 2024'
  }
}) => {
  // Split content by paragraphs for formatting
  const contentParagraphs = content ? content.split('\n\n') : [
    "Dear Hiring Committee,",
    "I am writing to express my interest in the Chief Operations Officer position at Global Enterprises, as advertised in the Wall Street Journal. With over 15 years of senior leadership experience and a proven track record of organizational transformation, I am confident in my ability to contribute significantly to your executive team.",
    "Throughout my career, I have successfully led cross-functional teams through periods of substantial growth and change. At Visionary Corp, I oversaw a comprehensive operational restructuring that resulted in a 30% increase in efficiency and $4.5M in annual cost savings. My approach combines strategic vision with meticulous execution, ensuring that ambitious goals translate into measurable results.",
    "I am particularly drawn to Global Enterprises' commitment to sustainability alongside profitability. This balanced approach aligns perfectly with my leadership philosophy, and I would welcome the opportunity to advance these dual priorities in the COO role.",
    "Thank you for your consideration. I look forward to discussing how my experience and leadership style could benefit Global Enterprises during this pivotal growth period.",
    "Respectfully,",
    "Morgan Reynolds"
  ];

  return (
    <div className="bg-white text-black rounded-md shadow-md overflow-hidden border border-slate-200">
      {/* Gold accent bar at top */}
      <div className="h-3 bg-gradient-to-r from-amber-300 to-yellow-500"></div>
      
      {/* Main content */}
      <div className="p-8 max-w-[800px] mx-auto">
        {/* Header section with elegant typography */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-serif text-gray-800 mb-1">{userData.name}</h1>
          <p className="text-sm tracking-wide text-gray-600 uppercase mb-3">{userData.title}</p>
          
          <div className="flex justify-center gap-6 text-xs text-gray-600">
            <span>{userData.email}</span>
            <span>{userData.phone}</span>
            <span>{userData.location}</span>
          </div>
          
          <div className="h-px w-32 bg-amber-300 mx-auto mt-6"></div>
        </div>
        
        {/* Date aligned right */}
        {userData.date && (
          <div className="text-right mb-8">
            <p className="text-sm text-gray-600">{userData.date}</p>
          </div>
        )}
        
        {/* Letter content with elegant spacing */}
        <div className="text-sm leading-relaxed text-gray-700 space-y-5">
          {contentParagraphs.map((paragraph, index) => (
            <p 
              key={index} 
              className={`${index === 0 ? 'font-medium' : ''} ${index === contentParagraphs.length - 2 ? 'font-medium' : ''}`}
            >
              {paragraph}
            </p>
          ))}
        </div>
        
        {/* Signature with gold accent */}
        <div className="mt-10">
          <div className="w-32 h-px bg-amber-300 mb-3"></div>
          <p className="font-serif text-lg">{userData.name}</p>
          <p className="text-xs text-gray-600">{userData.title}</p>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveElegantTemplate;
