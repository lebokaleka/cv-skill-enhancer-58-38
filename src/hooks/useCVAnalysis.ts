import { useState, useEffect } from 'react';
import { getAppState, setAppState, clearAppState, APP_STATE_KEY } from '@/utils/localStorage';
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
    
    // Add event listener for before unload (page refresh/close)
    const handleBeforeUnload = () => {
      localStorage.removeItem(APP_STATE_KEY);
    };
    
    // Add event listener for page visibility change
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        // User is navigating away or minimizing
        // We keep the data in this case, as it's likely still the same session
      }
    };
    
    // Clear data on logout
    const handleLogout = () => {
      localStorage.removeItem(APP_STATE_KEY);
    };
    
    // Add event listeners
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Add logout listener if logout function exists
    if (logout) {
      document.addEventListener('logout-event', handleLogout);
    }
    
    // Clean up event listeners on component unmount
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      
      if (logout) {
        document.removeEventListener('logout-event', handleLogout);
      }
    };
  }, [logout]);

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
    localStorage.removeItem(APP_STATE_KEY);
    
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
