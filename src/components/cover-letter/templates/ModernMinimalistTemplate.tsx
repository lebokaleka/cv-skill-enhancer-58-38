
import React from 'react';

interface ModernMinimalistTemplateProps {
  content: string;
}

const ModernMinimalistTemplate: React.FC<ModernMinimalistTemplateProps> = ({ content }) => {
  // Extract paragraphs from the content
  const paragraphs = content.split('\n\n').filter(p => p.trim() !== '');
  
  // Get the greeting (first paragraph)
  const greeting = paragraphs[0];
  
  // Get the signature (last paragraph)
  const signature = paragraphs[paragraphs.length - 1];
  
  // Get the body paragraphs (everything in between)
  const bodyParagraphs = paragraphs.slice(1, paragraphs.length - 1);

  // Extract name if present in the signature
  let signatureName = "";
  const nameMatch = signature.match(/Sincerely,\s*\n*(.+)/i);
  if (nameMatch && nameMatch[1]) {
    signatureName = nameMatch[1].trim();
  }

  return (
    <div className="relative w-full bg-white">
      <div className="flex flex-col md:flex-row max-w-4xl mx-auto border border-gray-100 shadow-sm">
        {/* Left sidebar - light beige */}
        <div className="w-full md:w-1/4 bg-[#E8E2DD] p-6 flex flex-col">
          {/* Profile Photo */}
          <div className="mx-auto mb-8">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-md">
              <img 
                src="/lovable-uploads/4151e48c-1ea6-440f-a4c1-ad410af0c0f6.png" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-3 text-[#333333]">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail text-[#333333]">
                <rect width="20" height="16" x="2" y="4" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              <span className="text-sm">your@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone text-[#333333]">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span className="text-sm">+123-456-7890</span>
            </div>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin text-[#333333]">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span className="text-sm">Address</span>
            </div>
          </div>
          
          {/* TO Section */}
          <div className="mt-8">
            <h3 className="font-bold text-lg text-[#333333] mb-2">TO</h3>
            <div className="space-y-1 text-[#333333]">
              <p className="font-medium">Mr. James Bennett</p>
              <p className="text-sm">HR Manager</p>
              <p className="text-sm">Company Name</p>
              <p className="text-sm">123 Anywhere St. Any City</p>
            </div>
          </div>
          
          {/* Date */}
          <div className="mt-6">
            <h3 className="font-medium text-[#333333] mb-1">Date</h3>
            <p className="text-sm text-[#333333]">January 2030</p>
          </div>
        </div>
        
        {/* Right content area - white */}
        <div className="w-full md:w-3/4 bg-white p-8">
          {/* Header */}
          <div className="mb-8 pb-4 border-b border-[#444444]">
            <h1 className="text-3xl font-bold text-[#333333] uppercase tracking-wider">{signatureName || "EMILY CLARK"}</h1>
            <p className="text-[#444444] mt-1">Economist</p>
          </div>
          
          <h2 className="text-xl font-medium text-[#333333] mb-4">Cover Letter</h2>
          
          {/* Greeting */}
          <div className="mb-4 text-[#333333]">
            <p>{greeting}</p>
          </div>
          
          {/* Body paragraphs */}
          <div className="space-y-4 text-[#333333]">
            {bodyParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          
          {/* Signature */}
          <div className="mt-6 text-[#333333]">
            <p>{signature}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernMinimalistTemplate;
