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
    id: 'modern-minimalist',
    name: 'Modern Minimalist',
    description: 'Sleek, minimalist design with elegant typography and ample whitespace',
    style: 'Contemporary and refined',
    imageUrl: '/lovable-uploads/0b8e0eff-7ae9-434f-b5a9-98a9f276ca23.png'
  },
  {
    id: 'creative-accent',
    name: 'Creative Accent',
    description: 'Bold design with colorful sidebar for creative professionals',
    style: 'Eye-catching with personality',
    imageUrl: '/lovable-uploads/40be15db-f883-42ef-a2a9-881b1aaed3cb.png'
  },
  {
    id: 'executive-elegant',
    name: 'Executive Elegant',
    description: 'Sophisticated design with subtle gold accents for leadership roles',
    style: 'Refined and authoritative',
    imageUrl: '/lovable-uploads/a5e5f604-78cc-41ad-aa11-dc5fb06ba156.png'
  },
  {
    id: 'tech-professional',
    name: 'Tech Professional',
    description: 'Modern template with hexagon pattern for tech industry roles',
    style: 'Professional with geometric design',
    imageUrl: '/lovable-uploads/40be15db-f883-42ef-a2a9-881b1aaed3cb.png'
  },
  {
    id: 'professional-corner',
    name: 'Professional Corner',
    description: 'Elegant design with burgundy corner accents and circular profile photo',
    style: 'Polished and distinctive',
    imageUrl: '/lovable-uploads/20681fdb-61c2-4cf6-8bbf-f149eb3f5e31.png'
  },
  {
    id: 'professional-burgundy',
    name: 'Professional Burgundy',
    description: 'Elegant design with burgundy triangle corners and circular profile photo',
    style: 'Clean and professional',
    imageUrl: '/lovable-uploads/ca0f80b7-ee23-4a1d-8f56-8e88a00047ca.png'
  }
];
