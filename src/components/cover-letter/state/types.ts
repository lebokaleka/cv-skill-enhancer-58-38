
import { ChangeEvent } from 'react';

export interface CoverLetterStateData {
  cvText: string;
  jobDescription: string;
  coverLetter: string;
  isGenerating: boolean;
  selectedTemplate: string;
  step: 'input' | 'result';
  _canGenerateLetter: boolean;
  _setCvText: (text: string) => void;
  _setJobDescription: (description: string) => void;
  _setCoverLetter: (letter: string) => void;
  _setIsGenerating: (isGenerating: boolean) => void;
  _setSelectedTemplate: (template: string) => void;
  _setStep: (step: 'input' | 'result') => void;
  _setCanGenerateLetter: (canGenerate: boolean) => void;
}

export interface CoverLetterStateActions {
  handleCVUpload: (text: string, fileName?: string) => void;
  handleJobDescriptionChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handleTemplateSelect: (template: string) => void;
  handleGenerate: () => void;
  handleRegenerate: () => void;
  setStep: (step: 'input' | 'result') => void;
  errorMessage: string | null;
  showErrorDialog: boolean;
  setShowErrorDialog: (show: boolean) => void;
}

export interface AuthenticationHandlers {
  isAuthenticated: boolean;
  setIsAuthModalOpen: (isOpen: boolean) => void;
  setIsSubscriptionModalOpen: (isOpen: boolean) => void;
}
