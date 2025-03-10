
import { useState } from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { coverLetterTemplates } from "@/components/cover-letter/coverLetterTemplates";
import CoverLetterInput from "@/components/cover-letter/CoverLetterInput";
import CoverLetterPreview from "@/components/cover-letter/CoverLetterPreview";

const CoverLetter = () => {
  const [cvText, setCvText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('professional');
  const [step, setStep] = useState<'input' | 'result'>('input');

  const handleCVUpload = (text: string) => {
    setCvText(text);
  };

  const handleJobDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJobDescription(e.target.value);
  };

  const handleTemplateSelect = (template: string) => {
    setSelectedTemplate(template);
  };

  const handleGenerate = () => {
    if (!cvText || !jobDescription) return;
    
    setIsGenerating(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Mock generated cover letter based on template
      const template = coverLetterTemplates.find(t => t.id === selectedTemplate);
      let mockCoverLetter = '';
      
      if (template?.id === 'professional') {
        mockCoverLetter = `Dear Hiring Manager,

I am writing to express my interest in the Frontend Developer position at Acme Corporation, as advertised on your company website. With over five years of experience in web development and a strong background in React, TypeScript, and modern JavaScript frameworks, I believe I would be a valuable addition to your team.

Throughout my career, I have developed and maintained high-performance web applications, focusing on creating intuitive user interfaces and optimizing user experiences. My experience aligns perfectly with the requirements outlined in your job description, particularly in building responsive interfaces and implementing complex UI components.

In my current role at XYZ Technologies, I successfully led the frontend development of a customer portal that decreased support requests by 35% and increased user engagement by 28%. I collaborated closely with UX designers and backend developers to ensure seamless integration and optimal performance.

I am particularly drawn to Acme Corporation because of your commitment to innovation and your focus on creating products that solve real-world problems. I am excited about the possibility of bringing my technical expertise and creative problem-solving skills to your team.

Thank you for considering my application. I look forward to the opportunity to discuss how my skills and experience can contribute to Acme Corporation's continued success.

Sincerely,
[Your Name]`;
      } else if (template?.id === 'creative') {
        mockCoverLetter = `Dear Acme Creative Team,

When I discovered your job posting for a Frontend Developer, I couldn't help but feel that this role was made for me. As someone who lives and breathes web development, with a passion for creating beautiful, functional interfaces, I'm thrilled at the possibility of bringing my skills to your innovative team.

My journey in web development began five years ago, and since then, I've had the privilege of turning complex problems into elegant solutions. Whether I'm building responsive layouts with modern CSS techniques or crafting interactive experiences with React, I approach each project as an opportunity to blend technical expertise with creative thinking.

What excites me most about Acme Corporation is your commitment to pushing boundaries. Your recent project launching an interactive product visualization tool particularly caught my attention – I'd love to contribute to similarly impactful initiatives.

In my current role, I revitalized an outdated user interface, transforming it into an intuitive experience that users actually enjoy. By introducing modern JavaScript frameworks and thoughtful animations, I helped increase user retention by 40%. This experience taught me that small details can make a massive difference in how people interact with technology.

I believe great products come from collaboration between diverse perspectives, and I'm eager to bring my unique approach to your team. I'd love to discuss how my blend of technical skill and creative problem-solving could help Acme continue to create exceptional digital experiences.

Looking forward to potentially creating something amazing together,

[Your Name]`;
      } else {
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
      }
      
      setCoverLetter(mockCoverLetter);
      setIsGenerating(false);
      setStep('result');
    }, 2500);
  };

  const handleRegenerate = () => {
    setIsGenerating(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      const currentLetter = coverLetter;
      
      // Create a slightly modified version
      const paragraphs = currentLetter.split('\n\n');
      
      // Modify the second paragraph if it exists
      if (paragraphs.length > 1) {
        paragraphs[1] = `With a strong background in web development and expertise in modern frontend technologies including React and TypeScript, I am confident in my ability to make significant contributions to your team. My experience has focused on creating exceptional user experiences through clean, efficient code and thoughtful UI design.`;
      }
      
      setCoverLetter(paragraphs.join('\n\n'));
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="app-container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="mb-4">Cover Letter Generator</h1>
            <p className="text-muted-foreground text-lg">
              Create a tailored cover letter based on your CV and the job description.
            </p>
          </div>

          {step === 'input' ? (
            <CoverLetterInput 
              cvText={cvText}
              jobDescription={jobDescription}
              selectedTemplate={selectedTemplate}
              templates={coverLetterTemplates}
              isGenerating={isGenerating}
              onCVUpload={handleCVUpload}
              onJobDescriptionChange={handleJobDescriptionChange}
              onTemplateSelect={handleTemplateSelect}
              onGenerate={handleGenerate}
            />
          ) : (
            <CoverLetterPreview 
              coverLetter={coverLetter}
              selectedTemplate={selectedTemplate}
              templates={coverLetterTemplates}
              isGenerating={isGenerating}
              onRegenerate={handleRegenerate}
              onBack={() => setStep('input')}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CoverLetter;
