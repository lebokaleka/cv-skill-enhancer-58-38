
export interface CoverLetterState {
  cvText: string;
  jobDescription: string;
  coverLetter: string;
  isGenerating: boolean;
  selectedTemplate: string;
  step: 'input' | 'result';
  handleCVUpload: (text: string) => void;
  handleJobDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleTemplateSelect: (template: string) => void;
  handleGenerate: () => void;
  handleRegenerate: () => void;
  setStep: (step: 'input' | 'result') => void;
}

export interface CoverLetterStateProviderProps {
  children: (state: CoverLetterState) => React.ReactNode;
  isAuthenticated: boolean;
  setIsAuthModalOpen: (isOpen: boolean) => void;
}
