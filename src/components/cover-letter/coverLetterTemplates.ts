
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
    id: 'classic-professional',
    name: 'Classic Professional',
    description: 'Clean, professional template with black header and photo',
    style: 'Traditional with personal branding',
    imageUrl: '/lovable-uploads/b265a279-0d8f-45dc-bb76-02c398bfbf97.png'
  },
  {
    id: 'tech-professional',
    name: 'Tech Professional',
    description: 'Clean, modern template with header and hexagon pattern background',
    style: 'Professional with geometric design',
    imageUrl: '/lovable-uploads/2efc55ec-83df-49c1-a46f-9aa4e295518e.png'
  },
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
  }
];
