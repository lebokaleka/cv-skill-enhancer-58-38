import { useState, useEffect } from 'react';
import { getAppState, setAppState, clearAppState, clearCVData, APP_STATE_KEY } from '@/utils/localStorage';
import type { CVScoreData } from "@/types/cvAnalysis";
import { useAuth } from '@/context/AuthContext';
import { useToast } from "@/components/ui/use-toast";

export const useCVAnalysis = () => {
  const [cvText, setCvText] = useState('');
  const [fileName, setFileName] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scoreData, setScoreData] = useState<CVScoreData | null>(null);
  const { isAuthenticated, setIsSubscriptionModalOpen, user, logout } = useAuth();
  const { toast } = useToast();

  // Load data from localStorage on initial render
  useEffect(() => {
    const appState = getAppState();
    
    if (appState && appState.cvAnalysis) {
      const { cvText: savedCvText, fileName: savedFileName, scoreData: savedScoreData } = appState.cvAnalysis;
      
      if (savedCvText) setCvText(savedCvText);
      if (savedFileName) setFileName(savedFileName);
      if (savedScoreData) {
        setScoreData(savedScoreData);
      }
    }
    
    // Set up event listeners for page refresh, tab close, etc.
    const handleBeforeUnload = () => {
      // Clear CV data when the page is refreshed or closed
      clearCVData();
    };
    
    // Listen for auth changes - clear CV data on logout
    const handleLogout = () => {
      clearCVData();
    };
    
    // Add event listeners
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Create a custom event listener for logout
    document.addEventListener('logout', handleLogout);
    
    // Clean up event listeners on component unmount
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('logout', handleLogout);
    };
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (cvText || fileName || scoreData) {
      const currentState = getAppState() || {};
      setAppState({
        ...currentState,
        cvAnalysis: {
          cvText,
          fileName,
          scoreData
        }
      });
    }
  }, [cvText, fileName, scoreData]);

  const handleCVUpload = (text: string, name?: string) => {
    if (!isAuthenticated) {
      setIsSubscriptionModalOpen(true);
      return;
    }
    
    if (user?.subscriptionTier === 'free') {
      const mockUsageCount = Math.floor(Math.random() * 4);
      if (mockUsageCount >= 3) {
        toast({
          title: "Weekly limit reached",
          description: "You've reached your 3 free CV analyses this week. Upgrade to continue.",
          variant: "destructive"
        });
        return;
      }
    }
    
    setCvText(text);
    if (name) setFileName(name);
    setIsAnalyzing(true);

    // Clear previous data when starting a new analysis
    setScoreData(null);

    // Scroll to the top for better UX when analysis starts
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(() => {
      const mockData: CVScoreData = {
        overallScore: 73,
        sections: {
          formattingReadability: 78,
          contentClarity: 85,
          atsOptimization: 65,
          skillsExperience: 72,
          grammarLanguage: 82
        },
        suggestions: {
          high: [
            "Add more quantifiable achievements to demonstrate impact",
            "Include relevant industry keywords throughout your CV"
          ],
          medium: [
            "Reduce the length of your professional summary",
            "Use more action verbs at the beginning of your bullet points"
          ],
          low: [
            "Consider using a more modern format",
            "Add a skills section for better ATS compatibility"
          ]
        },
        atsCompatible: true,
        missingKeywords: [
          "data analysis",
          "project management",
          "agile methodology"
        ]
      };

      setScoreData(mockData);
      setIsAnalyzing(false);
      
      // Scroll to results section after analysis is complete
      setTimeout(() => {
        const resultsElement = document.getElementById('cv-analysis-results');
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }, 2000);
  };

  // Clear all session data
  const handleClearSession = () => {
    setCvText('');
    setFileName('');
    setScoreData(null);
    clearCVData();
    
    toast({
      title: "Session cleared",
      description: "All analysis data has been reset.",
    });
  };

  return {
    cvText,
    fileName,
    isAnalyzing,
    scoreData,
    handleCVUpload,
    handleClearSession
  };
};
