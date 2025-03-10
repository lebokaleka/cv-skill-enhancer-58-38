import { useState } from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CVUploader from "@/components/upload/CVUploader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, CheckCircle, FileText, AlertTriangle } from 'lucide-react';

interface CVScoreData {
  overallScore: number;
  sections: {
    relevance: number;
    structure: number;
    clarity: number;
    impact: number;
  };
  suggestions: {
    high: string[];
    medium: string[];
    low: string[];
  };
  atsCompatible: boolean;
  missingKeywords: string[];
}

const CVAnalysis = () => {
  const [cvText, setCvText] = useState('');
  const [fileName, setFileName] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scoreData, setScoreData] = useState<CVScoreData | null>(null);

  const handleCVUpload = (text: string, name?: string) => {
    setCvText(text);
    if (name) setFileName(name);
    setIsAnalyzing(true);

    // Simulate API call with timeout
    setTimeout(() => {
      // Mock response data
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

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-amber-500";
    return "text-red-500";
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="app-container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="mb-4">CV Analysis & Optimization</h1>
            <p className="text-muted-foreground text-lg">
              Upload your CV to get a detailed analysis and actionable suggestions for improvement.
            </p>
          </div>

          {!scoreData && !isAnalyzing && (
            <Card className="border-dashed animate-scale-in">
              <CardHeader>
                <CardTitle>Upload Your CV</CardTitle>
                <CardDescription>
                  We'll analyze your CV and provide detailed feedback to help you improve it.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CVUploader onUpload={handleCVUpload} />
              </CardContent>
            </Card>
          )}

          {isAnalyzing && (
            <div className="text-center py-20 animate-pulse">
              <FileText size={48} className="mx-auto mb-6 text-primary" />
              <h3 className="text-xl font-medium mb-3">Analyzing Your CV</h3>
              <p className="text-muted-foreground mb-6">
                Our AI is evaluating your CV for structure, content, and ATS compatibility...
              </p>
              <Progress value={45} className="max-w-md mx-auto" />
            </div>
          )}

          {scoreData && (
            <div className="space-y-8 animate-fade-in">
              {/* Score Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="col-span-1 md:col-span-2 glass-card overflow-hidden">
                  <CardHeader className="border-b bg-secondary/40">
                    <CardTitle className="flex items-center justify-between">
                      <span>CV Score Overview</span>
                      <span className={`text-2xl font-bold ${getScoreColor(scoreData.overallScore)}`}>
                        {scoreData.overallScore}/100
                      </span>
                    </CardTitle>
                    <CardDescription>
                      {fileName ? `Analysis for: ${fileName}` : 'Analysis of your CV'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Relevance</span>
                          <span className={`text-sm ${getScoreColor(scoreData.sections.relevance)}`}>
                            {scoreData.sections.relevance}%
                          </span>
                        </div>
                        <Progress value={scoreData.sections.relevance} className={getProgressColor(scoreData.sections.relevance)} />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Structure</span>
                          <span className={`text-sm ${getScoreColor(scoreData.sections.structure)}`}>
                            {scoreData.sections.structure}%
                          </span>
                        </div>
                        <Progress value={scoreData.sections.structure} className={getProgressColor(scoreData.sections.structure)} />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Clarity</span>
                          <span className={`text-sm ${getScoreColor(scoreData.sections.clarity)}`}>
                            {scoreData.sections.clarity}%
                          </span>
                        </div>
                        <Progress value={scoreData.sections.clarity} className={getProgressColor(scoreData.sections.clarity)} />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Impact</span>
                          <span className={`text-sm ${getScoreColor(scoreData.sections.impact)}`}>
                            {scoreData.sections.impact}%
                          </span>
                        </div>
                        <Progress value={scoreData.sections.impact} className={getProgressColor(scoreData.sections.impact)} />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card overflow-hidden">
                  <CardHeader className={`border-b ${scoreData.atsCompatible ? 'bg-green-50 dark:bg-green-900/10' : 'bg-red-50 dark:bg-red-900/10'}`}>
                    <CardTitle className="flex items-center gap-2">
                      {scoreData.atsCompatible ? (
                        <>
                          <CheckCircle size={20} className="text-green-500" />
                          <span>ATS Compatible</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle size={20} className="text-red-500" />
                          <span>ATS Issues Found</span>
                        </>
                      )}
                    </CardTitle>
                    <CardDescription>
                      Applicant Tracking System Analysis
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    {scoreData.atsCompatible ? (
                      <p className="text-sm text-muted-foreground">
                        Your CV is properly formatted for Applicant Tracking Systems. It will be parsed correctly by most HR software.
                      </p>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        We've detected formatting issues that may cause problems with ATS systems. Check our suggestions tab for details.
                      </p>
                    )}

                    {scoreData.missingKeywords.length > 0 && (
                      <div className="mt-6">
                        <h4 className="text-sm font-medium mb-2">Consider adding these keywords:</h4>
                        <div className="flex flex-wrap gap-2">
                          {scoreData.missingKeywords.map((keyword, index) => (
                            <span key={index} className="px-2 py-1 bg-secondary rounded-full text-xs">
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Suggestions */}
              <Card className="glass-card overflow-hidden">
                <CardHeader className="border-b bg-secondary/40">
                  <CardTitle>Improvement Suggestions</CardTitle>
                  <CardDescription>
                    Actionable recommendations to improve your CV
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <Tabs defaultValue="high">
                    <TabsList className="mb-6">
                      <TabsTrigger value="high" className="gap-2">
                        <AlertCircle size={14} className="text-red-500" />
                        High Priority
                      </TabsTrigger>
                      <TabsTrigger value="medium" className="gap-2">
                        <AlertTriangle size={14} className="text-amber-500" />
                        Medium Priority
                      </TabsTrigger>
                      <TabsTrigger value="low" className="gap-2">
                        <FileText size={14} className="text-blue-500" />
                        Low Priority
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="high" className="mt-0">
                      <ul className="space-y-4">
                        {scoreData.suggestions.high.map((suggestion, index) => (
                          <li key={index} className="flex gap-3 items-start p-3 rounded-lg bg-red-50 dark:bg-red-900/10">
                            <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
                            <p>{suggestion}</p>
                          </li>
                        ))}
                      </ul>
                    </TabsContent>
                    
                    <TabsContent value="medium" className="mt-0">
                      <ul className="space-y-4">
                        {scoreData.suggestions.medium.map((suggestion, index) => (
                          <li key={index} className="flex gap-3 items-start p-3 rounded-lg bg-amber-50 dark:bg-amber-900/10">
                            <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
                            <p>{suggestion}</p>
                          </li>
                        ))}
                      </ul>
                    </TabsContent>
                    
                    <TabsContent value="low" className="mt-0">
                      <ul className="space-y-4">
                        {scoreData.suggestions.low.map((suggestion, index) => (
                          <li key={index} className="flex gap-3 items-start p-3 rounded-lg bg-blue-50 dark:bg-blue-900/10">
                            <FileText size={18} className="text-blue-500 shrink-0 mt-0.5" />
                            <p>{suggestion}</p>
                          </li>
                        ))}
                      </ul>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CVAnalysis;
