import { useState } from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CVUploader from "@/components/upload/CVUploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, FileText, Briefcase, Copy, Check, RefreshCw } from 'lucide-react';

interface CoverLetterTemplate {
  id: string;
  name: string;
  description: string;
  style: string;
}

const CoverLetter = () => {
  const [cvText, setCvText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('professional');
  const [copied, setCopied] = useState(false);
  const [step, setStep] = useState<'input' | 'result'>('input');

  const templates: CoverLetterTemplate[] = [
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
      const template = templates.find(t => t.id === selectedTemplate);
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

  const handleCopy = () => {
    navigator.clipboard.writeText(coverLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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

          {step === 'input' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* CV Upload Section */}
                <Card className="glass-card border-dashed h-full animate-scale-in">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText size={20} />
                      <span>Your CV</span>
                    </CardTitle>
                    <CardDescription>
                      Upload or paste your CV
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CVUploader onUpload={handleCVUpload} />
                  </CardContent>
                </Card>

                {/* Job Description Section */}
                <Card className="glass-card border-dashed h-full animate-scale-in" style={{ animationDelay: '150ms' }}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase size={20} />
                      <span>Job Description</span>
                    </CardTitle>
                    <CardDescription>
                      Paste the job description you want to apply for
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Textarea
                        value={jobDescription}
                        onChange={handleJobDescriptionChange}
                        placeholder="Paste job description here..."
                        className="min-h-[200px] resize-none"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Template Selection */}
              <Card className="glass-card border-dashed animate-scale-in" style={{ animationDelay: '300ms' }}>
                <CardHeader>
                  <CardTitle>Choose a Template</CardTitle>
                  <CardDescription>
                    Select a template that matches the tone you want to convey
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {templates.map((template) => (
                      <div
                        key={template.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                          selectedTemplate === template.id 
                            ? 'border-primary bg-primary/5' 
                            : 'border-border bg-secondary/30'
                        }`}
                        onClick={() => handleTemplateSelect(template.id)}
                      >
                        <h3 className="font-medium mb-1">{template.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{template.description}</p>
                        <div className="text-xs text-muted-foreground">
                          <span>Style: </span>
                          <span className="text-foreground">{template.style}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Generate Button */}
              <div className="flex justify-end animate-fade-in" style={{ animationDelay: '450ms' }}>
                <Button
                  size="lg"
                  className="px-8"
                  onClick={handleGenerate}
                  disabled={!cvText || !jobDescription || isGenerating}
                >
                  {isGenerating ? 'Generating...' : 'Generate Cover Letter'}
                </Button>
              </div>
            </div>
          )}

          {step === 'result' && (
            <div className="space-y-8">
              {/* Cover Letter Preview */}
              <Card className="glass-card animate-scale-in">
                <CardHeader className="border-b bg-secondary/40">
                  <div className="flex justify-between items-center">
                    <CardTitle>Your Cover Letter</CardTitle>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1"
                        onClick={handleCopy}
                      >
                        {copied ? (
                          <>
                            <Check size={14} />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy size={14} />
                            <span>Copy</span>
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1"
                        onClick={handleRegenerate}
                        disabled={isGenerating}
                      >
                        <RefreshCw size={14} className={isGenerating ? 'animate-spin' : ''} />
                        <span>Regenerate</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1"
                      >
                        <Download size={14} />
                        <span>Download</span>
                      </Button>
                    </div>
                  </div>
                  <CardDescription>
                    {templates.find(t => t.id === selectedTemplate)?.name} template
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="bg-white dark:bg-background border rounded-md p-6 shadow-sm min-h-[60vh]">
                    <pre className="font-sans whitespace-pre-wrap text-foreground">
                      {coverLetter}
                    </pre>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between animate-fade-in">
                <Button 
                  variant="outline" 
                  onClick={() => setStep('input')}
                >
                  Back to Editor
                </Button>
                <Button>
                  Finalize Cover Letter
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CoverLetter;
