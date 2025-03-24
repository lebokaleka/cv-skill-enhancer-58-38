
import { useState, useCallback, useEffect } from 'react';
import { CoverLetterStateData } from './types';
import { getCoverLetterData, saveCoverLetterData } from '@/utils/coverLetterStorage';

export const useCoverLetterData = (): CoverLetterStateData => {
  // Initialize state with stored data (if available) or defaults
  const storedData = getCoverLetterData();
  
  const [cvText, setCvText] = useState(storedData?.cvText || '');
  const [jobDescription, setJobDescription] = useState(storedData?.jobDescription || '');
  const [coverLetter, setCoverLetter] = useState(storedData?.coverLetter || '');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(storedData?.selectedTemplate || 'classic-professional');
  const [step, setStep] = useState<'input' | 'result'>(storedData?.step || 'input');
  const [canGenerateLetter, setCanGenerateLetter] = useState(false); // Kept for type compatibility but no longer used

  // Persist data to localStorage when state changes
  useEffect(() => {
    if (cvText || jobDescription || coverLetter) {
      saveCoverLetterData({
        cvText,
        jobDescription,
        coverLetter,
        selectedTemplate,
        step
      });
    }
  }, [cvText, jobDescription, coverLetter, selectedTemplate, step]);

  const setCvTextWithStorage = (text: string) => {
    setCvText(text);
  };

  const setJobDescriptionWithStorage = (description: string) => {
    setJobDescription(description);
  };

  const setCoverLetterWithStorage = (letter: string) => {
    setCoverLetter(letter);
  };

  const setSelectedTemplateWithStorage = (template: string) => {
    setSelectedTemplate(template);
  };

  const setStepWithStorage = (newStep: 'input' | 'result') => {
    setStep(newStep);
  };

  return {
    cvText,
    jobDescription,
    coverLetter,
    isGenerating,
    selectedTemplate,
    step,
    _canGenerateLetter: canGenerateLetter,
    _setCvText: setCvTextWithStorage,
    _setJobDescription: setJobDescriptionWithStorage,
    _setCoverLetter: setCoverLetterWithStorage,
    _setIsGenerating: setIsGenerating,
    _setSelectedTemplate: setSelectedTemplateWithStorage,
    _setStep: setStepWithStorage,
    _setCanGenerateLetter: setCanGenerateLetter
  };
};
