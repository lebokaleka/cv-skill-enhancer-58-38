
import { useState } from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FileText } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import CVUploadSection from "@/components/cv-analysis/CVUploadSection";
import CVAnalysisResults from "@/components/cv-analysis/CVAnalysisResults";
import CVSuggestions from "@/components/cv-analysis/CVSuggestions";
import type { CVScoreData } from "@/types/cvAnalysis";

const CVAnalysis = () => {
  const [cvText, setCvText] = useState('');
  const [fileName, setFileName] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scoreData, setScoreData] = useState<CVScoreData | null>(null);

  const handleCVUpload = (text: string, name?: string) => {
    setCvText(text);
    if (name) setFileName(name);
    setIsAnalyzing(true);

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
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          {!scoreData && !isAnalyzing && (
            <CVUploadSection onAnalyze={handleCVUpload} isAnalyzing={isAnalyzing} />
          )}

          {isAnalyzing && (
            <div className="text-center py-20 max-w-3xl mx-auto">
              <FileText size={48} className="mx-auto mb-6 text-gray-700" />
              <h3 className="text-xl font-medium mb-3">Analyzing Your CV</h3>
              <p className="text-muted-foreground mb-6">
                Our AI is evaluating your CV for structure, content, and ATS compatibility...
              </p>
              <Progress value={45} className="max-w-md mx-auto" />
            </div>
          )}

          {scoreData && (
            <div className="space-y-8">
              <CVAnalysisResults scoreData={scoreData} fileName={fileName} />
              <CVSuggestions suggestions={scoreData.suggestions} />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CVAnalysis;
