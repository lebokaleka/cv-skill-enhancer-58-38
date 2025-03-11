
export interface CoverLetterTemplate {
  id: string;
  name: string;
  description: string;
  style: string;
  imageUrl?: string;
}

export const coverLetterTemplates: CoverLetterTemplate[] = [
  {
    id: 'modern-professional',
    name: 'Modern Professional',
    description: 'A clean, professional template with a personal header section and structured layout',
    style: 'Contemporary with personal branding',
    imageUrl: '/lovable-uploads/c51266ab-a6cb-4fa2-841d-25838a246426.png'
  },
  {
    id: 'classic-elegant',
    name: 'Classic Elegant',
    description: 'Traditional format with refined typography and formal structure',
    style: 'Traditional and timeless',
    imageUrl: '/lovable-uploads/c51266ab-a6cb-4fa2-841d-25838a246426.png'
  },
  {
    id: 'creative-distinctive',
    name: 'Creative Distinctive',
    description: 'Bold design with modern elements for creative industries',
    style: 'Innovative and eye-catching',
    imageUrl: '/lovable-uploads/c51266ab-a6cb-4fa2-841d-25838a246426.png'
  },
  {
    id: 'minimal-clean',
    name: 'Minimal Clean',
    description: 'Sleek, minimalist design with ample white space and clean typography',
    style: 'Simple and focused',
    imageUrl: '/lovable-uploads/c51266ab-a6cb-4fa2-841d-25838a246426.png'
  },
  {
    id: 'corporate-executive',
    name: 'Corporate Executive',
    description: 'Professional business template ideal for corporate and executive positions',
    style: 'Corporate and authoritative',
    imageUrl: '/lovable-uploads/c51266ab-a6cb-4fa2-841d-25838a246426.png'
  }
];
