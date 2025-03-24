
import { useCallback } from 'react';
import { CoverLetterStateData, CoverLetterStateActions, AuthenticationHandlers } from './types';
import { useGenerateCoverLetter } from './useGenerateCoverLetter';

export const useCoverLetterActions = (
  stateData: CoverLetterStateData,
  authHandlers: AuthenticationHandlers
): CoverLetterStateActions => {
  const { isAuthenticated, setIsAuthModalOpen, setIsSubscriptionModalOpen } = authHandlers;

  // Generate functions from the dedicated hook
  const { handleGenerate, handleRegenerate } = useGenerateCoverLetter(
    stateData,
    isAuthenticated,
    setIsSubscriptionModalOpen
  );

  const handleCVUpload = (text: string) => {
    // Allow CV upload for non-authenticated users
    stateData._setCvText(text);
  };

  const handleJobDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    stateData._setJobDescription(e.target.value);
  };

  const handleTemplateSelect = (template: string) => {
    stateData._setSelectedTemplate(template);
  };

  const setStep = (step: 'input' | 'result') => {
    stateData._setStep(step);
  };

  return {
    handleCVUpload,
    handleJobDescriptionChange,
    handleTemplateSelect,
    handleGenerate,
    handleRegenerate,
    setStep
  };
};
