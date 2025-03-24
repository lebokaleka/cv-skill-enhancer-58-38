
import React, { useEffect } from 'react';
import { useCoverLetterState } from './useCoverLetterState';
import { CoverLetterStateProviderProps } from './types';

const CoverLetterStateProvider = ({ children, isAuthenticated, setIsAuthModalOpen }: CoverLetterStateProviderProps) => {
  const state = useCoverLetterState(isAuthenticated, setIsAuthModalOpen);
  
  // Update the state when authentication status changes
  useEffect(() => {
    state.updateAuthenticationStatus(isAuthenticated);
  }, [isAuthenticated, state]);
  
  return (
    <>
      {children(state)}
    </>
  );
};

export default CoverLetterStateProvider;
export type { CoverLetterState } from './types';
