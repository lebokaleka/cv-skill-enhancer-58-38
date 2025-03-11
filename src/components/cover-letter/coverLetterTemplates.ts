
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
  }
];
