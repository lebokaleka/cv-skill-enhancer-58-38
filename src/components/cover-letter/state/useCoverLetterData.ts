
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
    _canGenerateLetter: canGenerateLetter,
    _setCvText: setCvText,
    _setJobDescription: setJobDescription,
    _setCoverLetter: setCoverLetter,
    _setIsGenerating: setIsGenerating,
    _setSelectedTemplate: setSelectedTemplate,
    _setStep: setStep,
    _setCanGenerateLetter: setCanGenerateLetter
  };
};
