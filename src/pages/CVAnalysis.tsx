
import { useState } from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, CheckCircle, FileText, AlertTriangle, Upload, Check, X, FileUp, ArrowRight } from 'lucide-react';

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
  const [inputMethod, setInputMethod] = useState<'upload' | 'paste'>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadState, setUploadState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCvText(e.target.value);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleFileSelect = (selectedFile: File) => {
    // Check if file is PDF, DOC, DOCX, or TXT
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    
    if (!validTypes.includes(selectedFile.type)) {
      setUploadState('error');
      return;
    }
    
    setFile(selectedFile);
    
    // For demonstration purposes, if it's a text file, read and set the content
    if (selectedFile.type === 'text/plain') {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        if (typeof e.target?.result === 'string') {
          setCvText(e.target.result);
        }
      };
      
      reader.readAsText(selectedFile);
    }
    
    setUploadState('success');
  };

  const handleCVUpload = () => {
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
        <div className="max-w-4xl mx-auto px-4">
          {!scoreData && !isAnalyzing && (
            <div className="animate-scale-in">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">CV Analysis & Optimization</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Upload your CV to receive a score, ATS compatibility check, and actionable improvements.
                </p>
              </div>

              <Card className="shadow-md overflow-hidden border">
                <div className="pt-6 px-6">
                  <Tabs defaultValue="upload" className="w-full" onValueChange={(value) => setInputMethod(value as 'upload' | 'paste')}>
                    <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-6 rounded-full overflow-hidden">
                      <TabsTrigger 
                        value="upload" 
                        className="data-[state=active]:bg-[#897497] data-[state=active]:text-white"
                      >
                        Upload File
                      </TabsTrigger>
                      <TabsTrigger 
                        value="paste" 
                        className="data-[state=active]:bg-[#897497] data-[state=active]:text-white"
                      >
                        Paste Text
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="upload" className="mt-0">
                      <div
                        className={`border-2 border-dashed rounded-xl p-10 transition-all duration-200 ${
                          isDragging 
                            ? 'border-gray-400 bg-gray-50 dark:bg-gray-800/30' 
                            : file 
                              ? 'border-green-400 bg-green-50 dark:bg-green-900/10' 
                              : 'border-gray-300 bg-transparent'
                        }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                      >
                        <div className="flex flex-col items-center justify-center text-center">
                          <FileText className="w-12 h-12 mb-4 text-gray-400" />
                          
                          <h3 className="text-lg font-medium mb-1">
                            Upload your CV
                          </h3>
                          
                          <p className="text-muted-foreground text-sm mb-6">
                            Drag and drop your CV or click to browse
                          </p>
                          
                          <div>
                            <input
                              type="file"
                              id="cv-upload"
                              className="hidden"
                              accept=".pdf,.doc,.docx,.txt"
                              onChange={handleFileInputChange}
                            />
                            <label htmlFor="cv-upload">
                              <Button variant="outline" className="cursor-pointer rounded-full px-6 font-medium border-gray-300" asChild>
                                <span>Choose File</span>
                              </Button>
                            </label>
                          </div>

                          <p className="text-xs text-muted-foreground mt-4">
                            Supported formats: PDF, Word, TXT
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="paste" className="mt-0">
                      <div className="space-y-4">
                        <Textarea
                          value={cvText}
                          onChange={handleTextChange}
                          placeholder="Paste your CV content here..."
                          className="min-h-[250px] resize-none border-2 border-dashed p-4"
                        />
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="flex justify-end my-6">
                    <Button
                      className="rounded-full px-6 py-2 bg-gray-700 hover:bg-gray-800 text-white gap-2"
                      onClick={handleCVUpload}
                      disabled={isAnalyzing || ((inputMethod === 'paste' && cvText.trim() === '') || (inputMethod === 'upload' && !file))}
                    >
                      Analyze CV <ArrowRight size={16} />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {isAnalyzing && (
            <div className="text-center py-20 animate-pulse max-w-3xl mx-auto">
              <FileText size={48} className="mx-auto mb-6 text-gray-700" />
              <h3 className="text-xl font-medium mb-3">Analyzing Your CV</h3>
              <p className="text-muted-foreground mb-6">
                Our AI is evaluating your CV for structure, content, and ATS compatibility...
              </p>
              <Progress value={45} className="max-w-md mx-auto" />
            </div>
          )}

          {scoreData && (
            <div className="space-y-8 animate-fade-in">
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
