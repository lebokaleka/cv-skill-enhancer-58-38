
import { useState, useCallback } from 'react';
import { CoverLetterStateData } from './types';

export const useCoverLetterData = (): CoverLetterStateData => {
  const [cvText, setCvText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('classic-professional');
  const [step, setStep] = useState<'input' | 'result'>('input');
  const [canGenerateLetter, setCanGenerateLetter] = useState(false);

  return {
    cvText,
    jobDescription,
    coverLetter,
    isGenerating,
    selectedTemplate,
    step,
    // Internal state setters exported for use by actions
    _setCvText: setCvText,
    _setJobDescription: setJobDescription,
    _setCoverLetter: setCoverLetter,
    _setIsGenerating: setIsGenerating,
    _setSelectedTemplate: setSelectedTemplate,
    _setStep: setStep,
    _setCanGenerateLetter: setCanGenerateLetter,
    _canGenerateLetter: canGenerateLetter
  };
};
