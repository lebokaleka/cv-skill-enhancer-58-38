
import { useState } from 'react';
import CVUploader from "@/components/upload/CVUploader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Briefcase, ArrowRight, PenTool, CheckCircle, AlertCircle, Lightbulb } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { MatchResult } from "@/types/jobMatching";
import { Progress } from "@/components/ui/progress";

interface JobMatchingFormProps {
  onAnalyze: (cvText: string, jobDescription: string) => void;
  isAnalyzing: boolean;
  matchResult: MatchResult | null;
}

const JobMatchingForm = ({ onAnalyze, isAnalyzing, matchResult }: JobMatchingFormProps) => {
  const [cvText, setCvText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [showUploader, setShowUploader] = useState(true);

  const handleCVUpload = (text: string) => {
    setCvText(text);
    if (text) {
      setShowUploader(false);
    }
  };

  const handleJobDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJobDescription(e.target.value);
  };

  const handleAnalyzeClick = () => {
    if (!cvText || !jobDescription) return;
    onAnalyze(cvText, jobDescription);
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left side: Job Description and CV container - 50% width */}
      <div>
        <Card className="glass-card border-dashed border-2 animate-fade-in h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase size={20} />
              <span>Job Application Details</span>
            </CardTitle>
            <CardDescription>
              Enter job details and your CV to analyze match
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Job Description Section */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium flex items-center gap-2">
                <Briefcase size={16} />
                <span>Job Description</span>
              </h3>
              <Textarea
                value={jobDescription}
                onChange={handleJobDescriptionChange}
                placeholder="Paste job description here..."
                className="min-h-[180px] resize-none"
              />
            </div>

            {/* CV Section */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium flex items-center gap-2">
                <FileText size={16} />
                <span>Your CV</span>
              </h3>
              {showUploader ? (
                <CVUploader onUpload={handleCVUpload} />
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">CV Uploaded</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setShowUploader(true)}
                      className="isolate hover:bg-[#46235C] hover:text-white h-7 text-xs px-3"
                    >
                      Change
                    </Button>
                  </div>
                  <div className="bg-secondary/50 p-4 rounded-md h-[160px] overflow-auto">
                    <p className="text-sm whitespace-pre-wrap">{cvText}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Analyze Button */}
            <div className="flex justify-end">
              <Button
                onClick={handleAnalyzeClick}
                disabled={!cvText || !jobDescription || isAnalyzing}
                className="rounded-full bg-[#46235C] hover:bg-[#46235C]/90 text-white isolate"
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze CV'}
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right side: AI analysis preview section - 50% width */}
      <div>
        <Card className="glass-card border-dashed animate-fade-in h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PenTool size={20} />
              <span>AI Analysis Preview</span>
            </CardTitle>
            <CardDescription>
              AI-generated job matching analysis will appear here
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col h-[550px] overflow-y-auto">
            {!matchResult ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="p-6 rounded-lg bg-secondary/10 max-w-sm mx-auto">
                  <p className="text-muted-foreground">
                    Upload your CV and paste a job description, then click 'Analyze CV' to get AI-powered insights and suggestions.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6 animate-fade-in">
                {/* Match Score */}
                <div>
                  <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <span>Match Score</span>
                    <span className={`text-xl font-bold ${getScoreColor(matchResult.score)}`}>
                      {matchResult.score}%
                    </span>
                  </h3>
                  <Progress value={matchResult.score} className={getProgressColor(matchResult.score)} />
                </div>
                
                {/* Skills */}
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-500" />
                      <span>Skills You Have</span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {matchResult.presentSkills.map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded-full text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                      <AlertCircle size={16} className="text-red-500" />
                      <span>Missing Skills</span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {matchResult.missingSkills.map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded-full text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Suggestions */}
                <div>
                  <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                    <Lightbulb size={16} className="text-amber-500" />
                    <span>Improvement Suggestions</span>
                  </h3>
                  <ul className="space-y-2">
                    {matchResult.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex gap-2 items-start p-2 rounded-lg bg-amber-50 dark:bg-amber-900/10">
                        <AlertCircle size={16} className="text-amber-500 shrink-0 mt-0.5" />
                        <p className="text-xs">{suggestion}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Document Comparison */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Keyword Highlights</h3>
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <h4 className="text-xs font-medium mb-1">Job Description</h4>
                      <div className="bg-secondary/50 p-3 rounded-md max-h-[100px] overflow-auto">
                        <p className="text-xs" dangerouslySetInnerHTML={{ __html: matchResult.highlightedJob }}></p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-medium mb-1">Your CV</h4>
                      <div className="bg-secondary/50 p-3 rounded-md max-h-[100px] overflow-auto">
                        <p className="text-xs" dangerouslySetInnerHTML={{ __html: matchResult.highlightedCV }}></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JobMatchingForm;
