
import { useState } from 'react';
import { CoverLetterStateData } from './types';
import { coverLetterTemplates } from '../coverLetterTemplates';

export const useGenerateCoverLetter = (
  stateData: CoverLetterStateData,
  isAuthenticated: boolean,
  setIsSubscriptionModalOpen: (isOpen: boolean) => void
) => {
  const {
    cvText,
    jobDescription,
    selectedTemplate,
    _setCoverLetter,
    _setIsGenerating,
    _setStep
  } = stateData;
  
  // Local state for error handling
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  const generateCoverLetter = () => {
    // Reset error state first
    setErrorMessage(null);
    setShowErrorDialog(false);
    
    // Validate inputs and set appropriate error message
    const isCvMissing = !cvText;
    const isJobDescMissing = !jobDescription;
    
    if (isCvMissing && isJobDescMissing) {
      setErrorMessage("Please upload your CV and enter the Job Description");
      setShowErrorDialog(true);
      return;
    } else if (isCvMissing) {
      setErrorMessage("Please upload your CV");
      setShowErrorDialog(true);
      return;
    } else if (isJobDescMissing) {
      setErrorMessage("Please enter the Job Description");
      setShowErrorDialog(true);
      return;
    }
    
    // If not authenticated, show subscription modal only after input validation
    if (!isAuthenticated) {
      setIsSubscriptionModalOpen(true);
      return;
    }
    
    _setIsGenerating(true);

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
      } else if (template?.id === 'classic-elegant') {
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
      } else if (template?.id === 'creative-distinctive') {
        mockCoverLetter = `Dear Acme Creative Team,

When I discovered your job posting for a Frontend Developer, I couldn't help but feel that this role was made for me. As someone who lives and breathes web development, with a passion for creating beautiful, functional interfaces, I'm thrilled at the possibility of bringing my skills to your innovative team.

My journey in web development began five years ago, and since then, I've had the privilege of turning complex problems into elegant solutions. Whether I'm building responsive layouts with modern CSS techniques or crafting interactive experiences with React, I approach each project as an opportunity to blend technical expertise with creative thinking.

What excites me most about Acme Corporation is your commitment to pushing boundaries. Your recent project launching an interactive product visualization tool particularly caught my attention – I'd love to contribute to similarly impactful initiatives.

In my current role, I revitalized an outdated user interface, transforming it into an intuitive experience that users actually enjoy. By introducing modern JavaScript frameworks and thoughtful animations, I helped increase user retention by 40%. This experience taught me that small details can make a massive difference in how people interact with technology.

I believe great products come from collaboration between diverse perspectives, and I'm eager to bring my unique approach to your team. I'd love to discuss how my blend of technical skill and creative problem-solving could help Acme continue to create exceptional digital experiences.

Looking forward to potentially creating something amazing together,

[Your Name]`;
      } else if (template?.id === 'modern-minimalist') {
        mockCoverLetter = `Dear Hiring Manager,

I am writing to express my interest in the UX Designer position at Acme Corporation as advertised on your career page. With my background in user-centered design and experience creating intuitive digital experiences, I believe I would be a valuable addition to your team.

Throughout my career, I have focused on combining aesthetic design with functional usability to create products that users genuinely enjoy interacting with. My work on the recent redesign of XYZ App resulted in a 45% increase in user engagement and a significant reduction in customer support inquiries.

I am particularly drawn to Acme Corporation because of your commitment to innovation and your user-first approach to product development. These values align perfectly with my own professional philosophy, and I am excited about the possibility of contributing to your continued success.

Thank you for considering my application. I look forward to the opportunity to discuss how my skills and experience could benefit your team.

Sincerely,
ALEX MORGAN`;
      } else if (template?.id === 'creative-accent') {
        mockCoverLetter = `Dear Creative Team,

I am excited to apply for the Graphic Designer position at Studio Creative. As a passionate designer with five years of experience creating compelling visual identities and marketing materials, I believe my creative approach would be a perfect fit for your innovative team.

My portfolio showcases a diverse range of projects, from branding for startups to campaign materials for established corporations. I pride myself on delivering designs that not only look beautiful but also effectively communicate my clients' messages and values.

I've been following Studio Creative's work for several years and have been particularly impressed by your recent campaign for Eco Essentials. Your ability to blend aesthetic appeal with meaningful storytelling is exactly the kind of work I aspire to create.

I would welcome the opportunity to bring my creativity, technical skills, and collaborative spirit to your studio. Thank you for considering my application.

Creatively yours,
Jordan Rivers`;
      } else if (template?.id === 'executive-elegant') {
        mockCoverLetter = `Dear Hiring Committee,

I am writing to express my interest in the Chief Operations Officer position at Global Enterprises, as advertised in the Wall Street Journal. With over 15 years of senior leadership experience and a proven track record of organizational transformation, I am confident in my ability to contribute significantly to your executive team.

Throughout my career, I have successfully led cross-functional teams through periods of substantial growth and change. At Visionary Corp, I oversaw a comprehensive operational restructuring that resulted in a 30% increase in efficiency and $4.5M in annual cost savings. My approach combines strategic vision with meticulous execution, ensuring that ambitious goals translate into measurable results.

I am particularly drawn to Global Enterprises' commitment to sustainability alongside profitability. This balanced approach aligns perfectly with my leadership philosophy, and I would welcome the opportunity to advance these dual priorities in the COO role.

Thank you for your consideration. I look forward to discussing how my experience and leadership style could benefit Global Enterprises during this pivotal growth period.

Respectfully,
Morgan Reynolds`;
      } else {
        mockCoverLetter = `Dear Hiring Manager,

I am writing to express my interest in the Frontend Developer position at Acme Corporation.

With a strong foundation in web development and expertise in modern frontend technologies including React and TypeScript, I am confident in my ability to make significant contributions to your team. My experience has focused on creating exceptional user experiences through clean, efficient code and thoughtful UI design.

Throughout my career, I have consistently delivered high-quality solutions that meet business requirements while exceeding user expectations. I am particularly drawn to Acme Corporation's commitment to innovation and user-centric design, values that align perfectly with my own professional philosophy.

I would welcome the opportunity to discuss how my skills and experience can benefit your team. Thank you for considering my application.

Sincerely,
[Your Name]`;
      }
      _setCoverLetter(mockCoverLetter);
      _setIsGenerating(false);
      _setStep('result');
    }, 2500);
  };

  const regenerateCoverLetter = () => {
    // If not authenticated, show subscription modal
    if (!isAuthenticated) {
      setIsSubscriptionModalOpen(true);
      return;
    }
    
    _setIsGenerating(true);

    setTimeout(() => {
      const currentLetter = stateData.coverLetter;

      const paragraphs = currentLetter.split('\n\n');

      if (paragraphs.length > 1) {
        paragraphs[1] = `With a strong background in web development and expertise in modern frontend technologies including React and TypeScript, I am confident in my ability to make significant contributions to your team. My experience has focused on creating exceptional user experiences through clean, efficient code and thoughtful UI design.`;
      }
      _setCoverLetter(paragraphs.join('\n\n'));
      _setIsGenerating(false);
    }, 1500);
  };

  return {
    handleGenerate: generateCoverLetter,
    handleRegenerate: regenerateCoverLetter,
    errorMessage,
    showErrorDialog,
    setShowErrorDialog
  };
};
