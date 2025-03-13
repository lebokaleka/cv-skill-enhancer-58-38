
import React from 'react';
import { User } from 'lucide-react';

interface ProfessionalCornerTemplateProps {
  content?: string;
  userData?: {
    name: string;
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
    };
    email: string;
    phone: string;
    profileImage?: string;
    recipientName?: string;
    recipientCompany?: string;
    recipientAddress?: {
      street: string;
      city: string;
      state: string;
      zip: string;
    };
    date?: string;
  };
}

const ProfessionalCornerTemplate: React.FC<ProfessionalCornerTemplateProps> = ({
  content = '',
  userData = {
    name: 'Floria Wayne',
    address: {
      street: '123 Elm Street',
      city: 'Austin',
      state: 'TX',
      zip: '75401'
    },
    email: 'floria.wayne@email.com',
    phone: '(512) 555-0123',
    recipientName: 'Monica Langley',
    recipientCompany: 'Wayne Electrical Solutions',
    recipientAddress: {
      street: '789 Maple Avenue',
      city: 'Dallas',
      state: 'TX',
      zip: '75402'
    },
    date: 'August 17, 2024'
  }
}) => {
  // Convert paragraphs for formatting
  const paragraphs = content ? content.split('\n\n') : [
    "Dear Monica Langley,",
    "I am writing to express my strong interest in the Electrician position at Wayne Electrical Solutions, as advertised on FutureJobs Portal. With 10 years of experience in electrical installation, maintenance, and repair, combined with my dedication to achieving excellent service, I believe I would be an excellent fit for your team.",
    "Here's a brief overview of my qualifications and experience:",
    "• Certified electrician with a Journeyman Electrician License from the Texas State Electrical Board.\n• Proven expertise in installing and maintaining advanced electrical systems for modern homes.\n• Demonstrated ability to diagnose malfunctioning systems using next-gen test equipment.\n• Experience in residential smart-wiring, leading to enhanced home automation for numerous clients.\n• Trained and mentored 5 junior electricians, fostering a collaborative and safety-first team environment.\n• Familiarity with local, state, and federal electrical codes and regulations.",
    "I am particularly attracted to Wayne Electrical Solutions because of your trailblazing efforts in sustainable energy integration within household electrical setups. I believe that my skills and passion align well with the values and goals of your organization. Furthermore, my extensive experience with automated electrical systems would provide invaluable insights to your team.",
    "I'm confident that my hands-on experience and commitment to the highest standards of the electrical profession make me a top candidate for this role. I am eager to bring my dedication to craftsmanship and safety to Wayne Electrical Solutions as an Electrician.",
    "Sincerely,",
    "Floria Wayne"
  ];

  return (
    <div className="bg-white text-black rounded-md shadow-md overflow-hidden border border-slate-200 relative">
      {/* Top and bottom corner decorations */}
      <div className="absolute top-0 left-0 w-full h-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-1/3 h-20 bg-burgundy rounded-br-[100px]"
             style={{backgroundColor: '#8B2942'}}></div>
        <div className="absolute top-0 right-0 w-1/3 h-20 bg-burgundy rounded-bl-[100px]"
             style={{backgroundColor: '#8B2942'}}></div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-20 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-1/3 h-20 bg-burgundy rounded-tr-[100px]"
             style={{backgroundColor: '#8B2942'}}></div>
        <div className="absolute bottom-0 right-0 w-1/3 h-20 bg-burgundy rounded-tl-[100px]"
             style={{backgroundColor: '#8B2942'}}></div>
      </div>
      
      {/* Content area with padding to avoid the corners */}
      <div className="p-8 pt-24 pb-24">
        {/* Header section with contact info and profile photo */}
        <div className="flex justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold mb-3">{userData.name}</h1>
            <div className="text-sm space-y-0.5 text-gray-700">
              <p>{userData.address.street}</p>
              <p>{userData.address.city}, {userData.address.state} {userData.address.zip}</p>
              <p>{userData.email}</p>
              <p>{userData.phone}</p>
            </div>
          </div>
          
          <div className="relative w-24 h-24 border-4 rounded-full overflow-hidden" style={{borderColor: '#8B2942'}}>
            {userData.profileImage ? (
              <img 
                src={userData.profileImage} 
                alt={userData.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <User className="text-gray-400" size={36} />
              </div>
            )}
          </div>
        </div>
        
        {/* Date and recipient info */}
        <div className="mb-8">
          <p className="mb-4">{userData.date}</p>
          <p>{userData.recipientName}</p>
          <p>{userData.recipientCompany}</p>
          <p>{userData.recipientAddress?.street}</p>
          <p>{userData.recipientAddress?.city}, {userData.recipientAddress?.state} {userData.recipientAddress?.zip}</p>
        </div>
        
        {/* Letter content */}
        <div className="space-y-4">
          {paragraphs.map((paragraph, index) => (
            <div key={index} className={`${paragraph.startsWith('•') ? 'whitespace-pre-line' : ''}`}>
              {paragraph}
            </div>
          ))}
        </div>
        
        {/* Footer with website */}
        <div className="text-center text-xs text-gray-500 mt-8">
          © highfile.com
        </div>
      </div>
    </div>
  );
};

export default ProfessionalCornerTemplate;
