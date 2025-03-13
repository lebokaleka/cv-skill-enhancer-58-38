
import React from 'react';

interface ClassicProfessionalTemplateProps {
  content?: string;
  userData?: {
    name: string;
    address: string;
    city: string;
    email: string;
    phone: string;
    recipientName?: string;
    company?: string;
    recipientAddress?: string;
    recipientCity?: string;
    date?: string;
  };
}

const ClassicProfessionalTemplate: React.FC<ClassicProfessionalTemplateProps> = ({
  content = '',
  userData = {
    name: 'Floria Wayne',
    address: '1234 Elm Street',
    city: 'Springfield, IL 62704',
    email: 'floriawayne@email.com',
    phone: '(555) 123-4567',
    recipientName: 'Monica Langley',
    company: 'FreshMart Supermarkets',
    recipientAddress: '7890 Maple Avenue',
    recipientCity: 'Springfield, IL 62704',
    date: 'April 6, 2054'
  }
}) => {
  // Split content by paragraphs and bullet points for formatting
  const contentLines = content ? content.split('\n') : [];
  
  // Default content matching the image if none provided
  const defaultContent = [
    'I am writing to express my keen interest in the Cashier position at FreshMart Supermarkets as advertised on your website. With my three years of experience in customer service, I believe I am well-equipped to contribute positively to your team.',
    '',
    'What I bring to the table:',
    '',
    '• Proven ability to manage customer complaints with patience and professionalism',
    '• Experience in stocking shelves and maintaining inventory levels',
    '• Proficiency in advanced POS systems',
    '• Demonstrated ability to work in fast-paced environments and adapt to varying customer needs',
    '• Strong teamwork and collaboration skills, having worked closely with teams in my previous role as Retail Assistant at GroceriesGalore',
    '',
    'I am particularly attracted to FreshMart Supermarkets because of its reputation for community involvement and focus on organic produce. I am confident that my passion for ensuring customer satisfaction aligns well with your company\'s values and objectives.',
    '',
    'Further details of my professional journey and achievements can be found in the attached resume. I am eager to bring my dedication, drive, and skills to a role at FreshMart. I would be grateful for an opportunity to discuss how I can be a valuable addition to your team.',
    '',
    'Thank you for considering my application. I look forward to the possibility of contributing to FreshMart Supermarkets and am available at your earliest convenience for an interview. You can reach me at (555) 123-4567 or floriawayne@email.com.',
    '',
    'Warm regards,',
    'Floria Wayne'
  ];

  const displayContent = content ? contentLines : defaultContent;
  
  return (
    <div className="bg-white text-black rounded-md shadow-md overflow-hidden border border-slate-200">
      {/* Header with contact info and photo */}
      <div className="bg-black text-white p-5 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{userData.name}</h1>
          <p className="text-sm">{userData.address}</p>
          <p className="text-sm">{userData.city}</p>
          <p className="text-sm">{userData.email}</p>
          <p className="text-sm">{userData.phone}</p>
        </div>
        <div className="w-24 h-24 bg-white p-1">
          <img 
            src="/lovable-uploads/b265a279-0d8f-45dc-bb76-02c398bfbf97.png" 
            alt="Profile photo" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      {/* Letter content */}
      <div className="p-8 text-sm">
        {/* Date */}
        <p className="mb-4">{userData.date}</p>
        
        {/* Recipient */}
        {userData.recipientName && <p>{userData.recipientName}</p>}
        {userData.company && <p>{userData.company}</p>}
        {userData.recipientAddress && <p>{userData.recipientAddress}</p>}
        {userData.recipientCity && <p>{userData.recipientCity}</p>}
        {userData.recipientName && <p className="mb-4">Dear {userData.recipientName},</p>}
        
        {/* Content */}
        <div className="space-y-2">
          {displayContent.map((line, index) => (
            <p key={index} className={`${line.startsWith('•') ? 'ml-5' : ''}`}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassicProfessionalTemplate;
