
import React from 'react';
import { useCoverLetterState } from './useCoverLetterState';
import { CoverLetterStateProviderProps } from './types';

const CoverLetterStateProvider = ({ children, isAuthenticated, setIsAuthModalOpen }: CoverLetterStateProviderProps) => {
  const state = useCoverLetterState(isAuthenticated, setIsAuthModalOpen);
  
  return (
    <>
      {children(state)}
    </>
  );
};

export default CoverLetterStateProvider;
export type { CoverLetterState } from './types';
