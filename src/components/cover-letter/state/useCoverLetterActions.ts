
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

  // Update capability to generate letter when auth status or inputs change
  const updateGenerationCapability = useCallback(() => {
    const { _setCanGenerateLetter, cvText, jobDescription } = stateData;
    _setCanGenerateLetter(isAuthenticated && !!cvText && !!jobDescription);
  }, [isAuthenticated, stateData]);

  // Update auth status from parent component
  const updateAuthenticationStatus = useCallback((newAuthStatus: boolean) => {
    // When auth status changes, update capability to generate letter
    updateGenerationCapability();
  }, [updateGenerationCapability]);

  const handleCVUpload = (text: string) => {
    if (!isAuthenticated) {
      // Show subscription modal instead of auth modal
      setIsSubscriptionModalOpen(true);
      return;
    }
    stateData._setCvText(text);
    updateGenerationCapability();
  };

  const handleJobDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    stateData._setJobDescription(e.target.value);
    updateGenerationCapability();
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
    setStep,
    updateAuthenticationStatus
  };
};
