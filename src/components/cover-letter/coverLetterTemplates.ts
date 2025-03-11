
export interface CoverLetterTemplate {
  id: string;
  name: string;
  description: string;
  style: string;
  imageUrl?: string;
  preview?: React.ReactNode;
}

export const coverLetterTemplates: CoverLetterTemplate[] = [
  {
    id: 'modern-professional',
    name: 'Modern Professional',
    description: 'A clean, professional template with a personal header section and structured layout',
    style: 'Contemporary with personal branding',
    imageUrl: '/lovable-uploads/40be15db-f883-42ef-a2a9-881b1aaed3cb.png'
  },
  {
    id: 'classic-elegant',
    name: 'Classic Elegant',
    description: 'Traditional format with refined typography and formal structure',
    style: 'Traditional and timeless',
    imageUrl: '/lovable-uploads/40be15db-f883-42ef-a2a9-881b1aaed3cb.png'
  },
  {
    id: 'creative-distinctive',
    name: 'Creative Distinctive',
    description: 'Bold design with modern elements for creative industries',
    style: 'Innovative and eye-catching',
    imageUrl: '/lovable-uploads/40be15db-f883-42ef-a2a9-881b1aaed3cb.png'
  },
  {
    id: 'minimal-clean',
    name: 'Minimal Clean',
    description: 'Sleek, minimalist design with ample white space and clean typography',
    style: 'Simple and focused',
    imageUrl: '/lovable-uploads/40be15db-f883-42ef-a2a9-881b1aaed3cb.png'
  },
  {
    id: 'corporate-executive',
    name: 'Corporate Executive',
    description: 'Professional business template ideal for corporate and executive positions',
    style: 'Corporate and authoritative',
    imageUrl: '/lovable-uploads/40be15db-f883-42ef-a2a9-881b1aaed3cb.png'
  }
];
