
import { CoverLetterState as BaseCoverLetterState } from '../types';

export interface CoverLetterStateActions {
  handleCVUpload: (text: string) => void;
  handleJobDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleTemplateSelect: (template: string) => void;
  handleGenerate: () => void;
  handleRegenerate: () => void;
  setStep: (step: 'input' | 'result') => void;
}

export interface CoverLetterStateData {
  cvText: string;
  jobDescription: string;
  coverLetter: string;
  isGenerating: boolean;
  selectedTemplate: string;
  step: 'input' | 'result';
  _canGenerateLetter: boolean;
  // Internal state setters
  _setCvText: (text: string) => void;
  _setJobDescription: (text: string) => void;
  _setCoverLetter: (text: string) => void;
  _setIsGenerating: (isGenerating: boolean) => void;
  _setSelectedTemplate: (template: string) => void;
  _setStep: (step: 'input' | 'result') => void;
  _setCanGenerateLetter: (canGenerate: boolean) => void;
}

export interface AuthenticationHandlers {
  isAuthenticated: boolean;
  setIsAuthModalOpen: (isOpen: boolean) => void;
  setIsSubscriptionModalOpen: (isOpen: boolean) => void;
}
