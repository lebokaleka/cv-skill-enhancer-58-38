
import React, { createContext, useContext } from 'react';
import { useCoverLetterData } from './state/useCoverLetterData';
import { useCoverLetterActions } from './state/useCoverLetterActions';
import { CoverLetterStateData, CoverLetterStateActions } from './state/types';

export interface CoverLetterState extends CoverLetterStateData, CoverLetterStateActions {
  errorMessage: string | null;
  showErrorDialog: boolean;
  setShowErrorDialog: (show: boolean) => void;
}

interface CoverLetterStateProviderProps {
  children: (state: CoverLetterState) => React.ReactNode;
  isAuthenticated: boolean;
  setIsAuthModalOpen: (isOpen: boolean) => void;
  setIsSubscriptionModalOpen: (isOpen: boolean) => void;
}

const CoverLetterStateProvider: React.FC<CoverLetterStateProviderProps> = ({
  children,
  isAuthenticated,
  setIsAuthModalOpen,
  setIsSubscriptionModalOpen
}) => {
  const stateData = useCoverLetterData();
  
  const {
    handleCVUpload,
    handleJobDescriptionChange,
    handleTemplateSelect,
    handleGenerate,
    handleRegenerate,
    setStep,
    errorMessage,
    showErrorDialog,
    setShowErrorDialog
  } = useCoverLetterActions(
    stateData,
    { isAuthenticated, setIsAuthModalOpen, setIsSubscriptionModalOpen }
  );

  const value: CoverLetterState = {
    ...stateData,
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

  return (
    <>{children(value)}</>
  );
};

export default CoverLetterStateProvider;
