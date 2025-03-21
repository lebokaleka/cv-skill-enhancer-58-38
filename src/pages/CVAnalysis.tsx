import { useState, useEffect } from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FileText } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import CVUploadSection from "@/components/cv-analysis/CVUploadSection";
import CVAnalysisResults from "@/components/cv-analysis/CVAnalysisResults";
import CVSuggestions from "@/components/cv-analysis/CVSuggestions";
import type { CVScoreData } from "@/types/cvAnalysis";
import { useAuth } from '@/context/AuthContext';
import { useToast } from "@/components/ui/use-toast";

// In-memory storage key for app state
const APP_STATE_KEY = 'appState';

// Global state management (memory only, not persistent)
const getAppState = () => {
  const stateString = window.localStorage.getItem(APP_STATE_KEY);
  if (!stateString) return null;
  try {
    return JSON.parse(stateString);
  } catch (e) {
    console.error('Failed to parse app state', e);
    return null;
  }
};

const setAppState = (state) => {
  window.localStorage.setItem(APP_STATE_KEY, JSON.stringify(state));
};

const CVAnalysis = () => {
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 space-y-12">
          {/* Always show the upload section */}
          <CVUploadSection 
            onAnalyze={handleCVUpload} 
            isAnalyzing={isAnalyzing} 
            savedCvText={cvText}
            savedFileName={fileName}
          />

          {/* Loading indicator */}
          {isAnalyzing && (
            <div className="text-center py-10 animate-pulse">
              <FileText size={48} className="mx-auto mb-6 text-gray-700" />
              <h3 className="text-xl font-medium mb-3">Analyzing Your CV</h3>
              <p className="text-muted-foreground mb-6">
                Our AI is evaluating your CV for structure, content, and ATS compatibility...
              </p>
              <Progress value={45} className="max-w-md mx-auto" />
            </div>
          )}

          {/* Results section - only shown after analysis */}
          {scoreData && !isAnalyzing && (
            <div id="cv-analysis-results" className="space-y-8 animate-fade-in">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">CV Analysis Results</h2>
                <button 
                  onClick={handleClearSession}
                  className="text-sm text-gray-500 hover:text-gray-700 hover:underline"
                >
                  Reset Analysis
                </button>
              </div>
              {/* Container card for the results section */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden pb-6">
                <CVAnalysisResults scoreData={scoreData} fileName={fileName} />
                <CVSuggestions 
                  suggestions={scoreData.suggestions} 
                  structuredSuggestions={scoreData.structuredSuggestions}
                  sectionScores={scoreData.sections}
                  overallScore={scoreData.overallScore}
                />
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CVAnalysis;
