
import { CoverLetterState as BaseCoverLetterState } from '../types';

export interface CoverLetterStateActions {
  handleCVUpload: (text: string) => void;
  handleJobDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleTemplateSelect: (template: string) => void;
  handleGenerate: () => void;
  handleRegenerate: () => void;
  setStep: (step: 'input' | 'result') => void;
  updateAuthenticationStatus: (isAuthenticated: boolean) => void;
}

export type CoverLetterStateData = Omit<BaseCoverLetterState, keyof CoverLetterStateActions>;

export interface AuthenticationHandlers {
  isAuthenticated: boolean;
  setIsAuthModalOpen: (isOpen: boolean) => void;
  setIsSubscriptionModalOpen: (isOpen: boolean) => void;
}
