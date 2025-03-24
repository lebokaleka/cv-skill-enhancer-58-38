
import React from 'react';
import { useCoverLetterState } from './state';
import { CoverLetterStateProviderProps } from './types';

const CoverLetterStateProvider = ({ children, isAuthenticated, setIsAuthModalOpen, setIsSubscriptionModalOpen }: CoverLetterStateProviderProps) => {
  const state = useCoverLetterState(isAuthenticated, setIsAuthModalOpen, setIsSubscriptionModalOpen);
  
  return (
    <>
      {children(state)}
    </>
  );
};

export default CoverLetterStateProvider;
export type { CoverLetterState } from './types';
