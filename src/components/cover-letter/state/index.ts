
import { useCoverLetterData } from './useCoverLetterData';
import { useCoverLetterActions } from './useCoverLetterActions';
import { CoverLetterState } from '../types';

export const useCoverLetterState = (
  isAuthenticated: boolean,
  setIsAuthModalOpen: (isOpen: boolean) => void,
  setIsSubscriptionModalOpen: (isOpen: boolean) => void
): CoverLetterState => {
  // Initialize state data
  const stateData = useCoverLetterData();
  
  // Get state actions
  const actions = useCoverLetterActions(
    stateData, 
    { isAuthenticated, setIsAuthModalOpen, setIsSubscriptionModalOpen }
  );
  
  // Combine state data and actions into a single object
  return {
    cvText: stateData.cvText,
    jobDescription: stateData.jobDescription,
    coverLetter: stateData.coverLetter,
    isGenerating: stateData.isGenerating,
    selectedTemplate: stateData.selectedTemplate,
    step: stateData.step,
    ...actions
  };
};

export * from './types';
