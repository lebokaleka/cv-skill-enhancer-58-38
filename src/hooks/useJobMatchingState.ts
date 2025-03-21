
import { useState, useEffect } from 'react';
import { getAppState, setAppState } from '@/utils/localStorage';
import { useAuth } from '@/context/AuthContext';
import { MatchResult } from '@/types/jobMatching';

export const useJobMatchingState = () => {
  const [cvText, setCvText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [fileName, setFileName] = useState('');
  const { isAuthenticated } = useAuth();

  // Load data from localStorage on initial render
  useEffect(() => {
    const appState = getAppState();
    
    if (appState && appState.jobMatching) {
      const { cvText: savedCvText, jobDescription: savedJobDescription, fileName: savedFileName } = appState.jobMatching;
      
      if (savedCvText) setCvText(savedCvText);
      if (savedJobDescription) setJobDescription(savedJobDescription);
      if (savedFileName) setFileName(savedFileName);
    }
    
    // Set up event listeners for page refresh, tab close, etc.
    const handleBeforeUnload = () => {
      // Clear job matching data when the page is refreshed or closed
      clearJobMatchingData();
    };
    
    // Listen for auth changes - clear data on logout
    const handleLogout = () => {
      clearJobMatchingData();
    };
    
    // Add event listeners
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('logout', handleLogout);
    
    // Clean up event listeners on component unmount
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('logout', handleLogout);
    };
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (cvText || jobDescription || fileName) {
      const currentState = getAppState() || {};
      setAppState({
        ...currentState,
        jobMatching: {
          cvText,
          jobDescription,
          fileName
        }
      });
    }
  }, [cvText, jobDescription, fileName]);

  // Function to clear job matching data from localStorage
  const clearJobMatchingData = () => {
    const appState = getAppState();
    if (appState) {
      // Remove only job matching data while preserving other app state
      const { jobMatching, ...remainingState } = appState;
      setAppState(remainingState);
    }
  };

  return {
    cvText,
    setCvText,
    jobDescription,
    setJobDescription,
    fileName, 
    setFileName,
    clearJobMatchingData
  };
};
