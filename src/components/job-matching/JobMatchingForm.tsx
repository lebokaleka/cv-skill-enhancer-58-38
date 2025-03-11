
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PenTool, Briefcase, FileText } from 'lucide-react';
import { MatchResult } from "@/types/jobMatching";
import InputForm from './InputForm';
import AnalysisResults from './AnalysisResults';

interface JobMatchingFormProps {
  onAnalyze: (cvText: string, jobDescription: string) => void;
  isAnalyzing: boolean;
  matchResult: MatchResult | null;
}

const JobMatchingForm = ({ onAnalyze, isAnalyzing, matchResult }: JobMatchingFormProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left side: Job Description and CV container */}
      <div>
        <Card className="glass-card border-dashed border animate-fade-in h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase size={20} />
              <span>Job Application Details</span>
            </CardTitle>
            <CardDescription>
              Enter job details and your CV to analyze match
            </CardDescription>
          </CardHeader>
          <InputForm onAnalyze={onAnalyze} isAnalyzing={isAnalyzing} />
        </Card>
      </div>

      {/* Right side: AI analysis preview section */}
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
          <CardContent className="flex flex-col h-[650px] overflow-y-auto">
            {!matchResult ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="p-6 rounded-lg bg-secondary/10 max-w-sm mx-auto">
                  <p className="text-muted-foreground">
                    Upload your CV and paste a job description, then click 'Analyze CV' to get AI-powered insights and suggestions.
                  </p>
                </div>
              </div>
            ) : (
              <AnalysisResults matchResult={matchResult} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JobMatchingForm;
