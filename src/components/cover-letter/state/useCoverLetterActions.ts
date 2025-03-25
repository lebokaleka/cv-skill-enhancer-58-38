
import { useCallback, useState } from 'react';
import { CoverLetterStateData, CoverLetterStateActions, AuthenticationHandlers } from './types';
import { useGenerateCoverLetter } from './useGenerateCoverLetter';

export const useCoverLetterActions = (
  stateData: CoverLetterStateData,
  authHandlers: AuthenticationHandlers
): CoverLetterStateActions => {
  const { isAuthenticated, setIsAuthModalOpen, setIsSubscriptionModalOpen } = authHandlers;

  // Generate functions from the dedicated hook
  const { 
    handleGenerate, 
    handleRegenerate, 
    errorMessage, 
    showErrorDialog, 
    setShowErrorDialog 
  } = useGenerateCoverLetter(
    stateData,
    isAuthenticated,
    setIsSubscriptionModalOpen
  );

  const handleCVUpload = useCallback((text: string, fileName?: string) => {
    // Save CV text to state
    stateData._setCvText(text);
  }, [stateData]);

  const handleJobDescriptionChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    stateData._setJobDescription(e.target.value);
  }, [stateData]);

  const handleTemplateSelect = useCallback((template: string) => {
    stateData._setSelectedTemplate(template);
  }, [stateData]);

  const setStep = useCallback((step: 'input' | 'result') => {
    stateData._setStep(step);
  }, [stateData]);

  return {
    handleCVUpload,
    handleJobDescriptionChange,
    handleTemplateSelect,
    handleGenerate,
    handleRegenerate,
    setStep,
    errorMessage,
    showErrorDialog,
    setShowErrorDialog
  };
};
