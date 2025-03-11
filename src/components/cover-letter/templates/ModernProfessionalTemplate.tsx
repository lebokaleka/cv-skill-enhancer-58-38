
import React from 'react';
import { Phone, Mail, Globe, User } from 'lucide-react';

interface ModernProfessionalTemplateProps {
  content?: string;
  userData?: {
    name: string;
    phone: string;
    email: string;
    website: string;
    username: string;
    date?: string;
  };
}

const ModernProfessionalTemplate: React.FC<ModernProfessionalTemplateProps> = ({
  content = '',
  userData = {
    name: 'Olivia Wilson',
    phone: '+123-456-7890',
    email: 'hello@reallygreatsite.com',
    website: 'www.reallygreatsite.com',
    username: '@reallygreatsite',
    date: '3rd May 2024'
  }
}) => {
  // Default content if none provided
  const defaultContent = `To whom it may concern,

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim justo in nibh ultricies condimentum.

• Cras gravida hendrerit orci luctus ut et porttitor non nunc
• Fusce gravida dignissim sapien, vestibulum sagittis ante finibus non
• Nunc libero justo, ornare at pellentesque sit, faucibus est tellus

Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Fusce euismod libero fringilla nunc tincidunt, in volutpat lectus mattis. Nullam suscipit, nulla nec aliquam ultrincorper, tellus orci sagittis nulla, id aliquam risus magna vitae augue. Maecenas vitae vulputate mauris. Duis sed erat cursus, varius enim vel, accumsan eros. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam rutrum, lorem eu luctus porttitor, sem porta rutrum urna, at sodales eros sapien laoreet elit. Donec egestas mollis sapien.

Kind regards,`;

  const displayContent = content || defaultContent;
  
  return (
    <div className="bg-white text-black rounded-md shadow-md overflow-hidden border border-slate-200">
      {/* Header with profile photo and contact info */}
      <div className="flex items-center p-4 border-b border-slate-200">
        <div className="relative w-16 h-16 overflow-hidden rounded-full border-4 border-indigo-900">
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <User className="text-gray-400" size={30} />
          </div>
        </div>
        
        <div className="ml-4 flex-grow">
          <h1 className="text-xl font-bold">{userData.name}</h1>
          <div className="flex flex-col sm:flex-row sm:space-x-6 text-xs text-gray-600 mt-1">
            <div className="flex items-center">
              <Phone size={12} className="mr-1" />
              <span>{userData.phone}</span>
            </div>
            <div className="flex items-center">
              <Mail size={12} className="mr-1" />
              <span>{userData.email}</span>
            </div>
            <div className="flex items-center">
              <Globe size={12} className="mr-1" />
              <span>{userData.website}</span>
            </div>
            <div className="flex items-center">
              <User size={12} className="mr-1" />
              <span>{userData.username}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Letter content */}
      <div className="p-4">
        {userData.date && <p className="mb-4 text-sm">{userData.date}</p>}
        
        <div className="whitespace-pre-line text-sm">
          {displayContent}
        </div>
        
        {/* Signature */}
        <div className="mt-8">
          <div className="text-xl italic font-script mb-1" style={{ fontFamily: "cursive" }}>{userData.name}</div>
          <div className="text-sm">{userData.name}</div>
        </div>
      </div>
    </div>
  );
};

export default ModernProfessionalTemplate;
