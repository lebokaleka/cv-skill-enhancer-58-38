
export interface CoverLetterState {
  cvText: string;
  jobDescription: string;
  coverLetter: string;
  isGenerating: boolean;
  selectedTemplate: string;
  step: 'input' | 'result';
  customHTML?: string;
  handleCVUpload: (text: string) => void;
  handleJobDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleTemplateSelect: (template: string) => void;
  handleGenerate: () => void;
  handleRegenerate: () => void;
  setStep: (step: 'input' | 'result') => void;
  handleHTMLUpload?: (html: string) => void;
}

export interface CoverLetterStateProviderProps {
  children: (state: CoverLetterState) => React.ReactNode;
  isAuthenticated: boolean;
  setIsAuthModalOpen: (isOpen: boolean) => void;
  setIsSubscriptionModalOpen: (isOpen: boolean) => void;
}
