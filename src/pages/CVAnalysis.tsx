
import { useState } from 'react';
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

const CVAnalysis = () => {
  const [cvText, setCvText] = useState('');
  const [fileName, setFileName] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scoreData, setScoreData] = useState<CVScoreData | null>(null);
  const { isAuthenticated, setIsSubscriptionModalOpen, user } = useAuth();
  const { toast } = useToast();

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

    // Scroll to the top for better UX when analysis starts
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(() => {
      const mockData: CVScoreData = {
        overallScore: 73,
        sections: {
          relevance: 65,
          structure: 80,
          clarity: 85,
          impact: 62
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 space-y-12">
          {/* Always show the upload section */}
          <CVUploadSection onAnalyze={handleCVUpload} isAnalyzing={isAnalyzing} />

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
              <h2 className="text-2xl font-bold text-center mb-6">CV Analysis Results</h2>
              {/* Container card for the results section */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden">
                <CVAnalysisResults scoreData={scoreData} fileName={fileName} />
                <CVSuggestions suggestions={scoreData.suggestions} />
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
