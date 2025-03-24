
import { useState } from 'react';
import { coverLetterTemplates } from './coverLetterTemplates';
import { CoverLetterState } from './types';
import { useToast } from '@/components/ui/use-toast';

export const useCoverLetterState = (
  isAuthenticated: boolean,
  setIsAuthModalOpen: (isOpen: boolean) => void
): CoverLetterState => {
  const [cvText, setCvText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('classic-professional');
  const [step, setStep] = useState<'input' | 'result'>('input');
  const { toast } = useToast();

  const handleCVUpload = (text: string) => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }
    setCvText(text);
  };

  const handleJobDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJobDescription(e.target.value);
  };

  const handleTemplateSelect = (template: string) => {
    setSelectedTemplate(template);
  };

  const handleGenerate = () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }
    
    if (!cvText || !jobDescription) {
      toast({
        title: "Missing information",
        description: "Please upload your CV and add a job description.",
        variant: "destructive"
      });
      return;
    }
    
    setIsGenerating(true);

    setTimeout(() => {
      const template = coverLetterTemplates.find(t => t.id === selectedTemplate);
      let mockCoverLetter = '';
      
      if (template?.id === 'modern-professional') {
        mockCoverLetter = `To whom it may concern,

I am writing to express my interest in the Frontend Developer position at Acme Corporation, as advertised on your company website. With over five years of experience in web development and a strong background in React, TypeScript, and modern JavaScript frameworks, I believe I would be a valuable addition to your team.

• Throughout my career, I have developed and maintained high-performance web applications, focusing on creating intuitive user interfaces and optimizing user experiences.
• My experience aligns perfectly with the requirements outlined in your job description, particularly in building responsive interfaces and implementing complex UI components.
• I have successfully led the frontend development of a customer portal that decreased support requests by 35% and increased user engagement by 28%.

In my current role at XYZ Technologies, I collaborated closely with UX designers and backend developers to ensure seamless integration and optimal performance. I am particularly drawn to Acme Corporation's commitment to innovation and your focus on creating products that solve real-world problems.

I am excited about the possibility of bringing my technical expertise and creative problem-solving skills to your team. Thank you for considering my application. I look forward to the opportunity to discuss how my skills and experience can contribute to Acme Corporation's continued success.

Kind regards,`;
      } else if (template?.id === 'classic-professional') {
        mockCoverLetter = `Dear Hiring Manager,

I am writing to apply for the Frontend Developer position at Acme Corporation. With a Bachelor's degree in Computer Science and 5+ years of experience in frontend development, I offer a strong technical foundation in the exact technologies your job description requires.

Technical qualifications relevant to your requirements:
• React & React Hooks: Implemented component-based architecture across 7 production applications
• TypeScript: Utilized for type safety in 100% of my recent projects, reducing runtime errors by 45%
• Performance Optimization: Reduced initial load time by 62% through code splitting and lazy loading
• Testing: Maintained 85%+ test coverage using Jest and React Testing Library
• RESTful APIs: Extensive experience integrating frontend applications with backend services

In my current position as Senior Frontend Developer at XYZ Technologies, I lead development of a complex SaaS platform serving 50,000+ daily users. Key achievements include:
• Architected and implemented a modular component library, decreasing development time for new features by 35%
• Reduced bundle size by 28% through code optimization and tree shaking
• Implemented real-time data visualization dashboard using D3.js and WebSockets

My systematic approach to problem-solving and strong collaborative skills would be assets to your engineering team. I am particularly interested in Acme's focus on scalable frontend architecture, as mentioned in your job posting.

I would welcome the opportunity to discuss how my technical expertise can contribute to your development objectives. Thank you for your consideration.

Sincerely,
[Your Name]`;
      } else {
        mockCoverLetter = `Dear Hiring Manager,

I am writing to express my interest in the Frontend Developer position at Acme Corporation.

With a strong foundation in web development and expertise in modern frontend technologies including React and TypeScript, I am confident in my ability to make significant contributions to your team. My experience has focused on creating exceptional user experiences through clean, efficient code and thoughtful UI design.

Throughout my career, I have consistently delivered high-quality solutions that meet business requirements while exceeding user expectations. I am particularly drawn to Acme Corporation's commitment to innovation and user-centric design, values that align perfectly with my own professional philosophy.

I would welcome the opportunity to discuss how my skills and experience can benefit your team. Thank you for considering my application.

Sincerely,
[Your Name]`;
      }
      setCoverLetter(mockCoverLetter);
      setIsGenerating(false);
      setStep('result');
    }, 2500);
  };

  const handleRegenerate = () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }
    
    setIsGenerating(true);

    setTimeout(() => {
      const currentLetter = coverLetter;

      const paragraphs = currentLetter.split('\n\n');

      if (paragraphs.length > 1) {
        paragraphs[1] = `With a strong background in web development and expertise in modern frontend technologies including React and TypeScript, I am confident in my ability to make significant contributions to your team. My experience has focused on creating exceptional user experiences through clean, efficient code and thoughtful UI design.`;
      }
      setCoverLetter(paragraphs.join('\n\n'));
      setIsGenerating(false);
    }, 1500);
  };

  return {
    cvText,
    jobDescription,
    coverLetter,
    isGenerating,
    selectedTemplate,
    step,
    handleCVUpload,
    handleJobDescriptionChange,
    handleTemplateSelect,
    handleGenerate,
    handleRegenerate,
    setStep
  };
};
