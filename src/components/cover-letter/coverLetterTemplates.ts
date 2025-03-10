
export interface CoverLetterTemplate {
  id: string;
  name: string;
  description: string;
  style: string;
}

export const coverLetterTemplates: CoverLetterTemplate[] = [
  {
    id: 'professional',
    name: 'Professional',
    description: 'Formal and concise, ideal for corporate roles',
    style: 'Formal tone with clear structure'
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Showcase your unique style and personality',
    style: 'Conversational with storytelling elements'
  },
  {
    id: 'technical',
    name: 'Technical',
    description: 'Highlight technical skills and achievements',
    style: 'Detailed with emphasis on technical expertise'
  }
];
