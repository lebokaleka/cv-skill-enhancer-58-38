
import { useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Briefcase } from 'lucide-react';
import { MatchResult } from "@/types/jobMatching";
import InputForm from './InputForm';
import PreviewHeader from './header/PreviewHeader';
import AnalysisPreview from './analysis/AnalysisPreview';
import InterviewPreview from './interview/InterviewPreview';
import { useContentExpansion } from '@/hooks/useContentExpansion';

interface JobMatchingFormProps {
  onAnalyze: (cvText: string, jobDescription: string) => void;
  isAnalyzing: boolean;
  matchResult: MatchResult | null;
}

const JobMatchingForm = ({
  onAnalyze,
  isAnalyzing,
  matchResult
}: JobMatchingFormProps) => {
  const [showInterviewPreview, setShowInterviewPreview] = useState(false);
  const [isInterviewOptionsOpen, setIsInterviewOptionsOpen] = useState(false);
  
  const { 
    showContentIndicator, 
    expandContent, 
    toggleContent 
  } = useContentExpansion({ 
    onResultChange: matchResult 
  });

  const toggleInterviewPreview = () => {
    setShowInterviewPreview(!showInterviewPreview);
    if (showInterviewPreview) {
      setIsInterviewOptionsOpen(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
      <div>
        <Card className="glass-card border-dashed border animate-fade-in h-auto">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Briefcase size={20} />
              <span className="text-2xl font-semibold leading-none tracking-tight">Job Application Details</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Enter job details and your CV to analyze match
            </p>
          </CardHeader>
          <InputForm onAnalyze={onAnalyze} isAnalyzing={isAnalyzing} />
        </Card>
      </div>

      <div className="relative">
        <Card className={`glass-card border-dashed animate-fade-in ${expandContent ? 'h-auto' : 'h-[calc(100%+0.5px)]'}`}>
          <CardHeader>
            <PreviewHeader 
              showInterviewPreview={showInterviewPreview} 
              toggleInterviewPreview={toggleInterviewPreview} 
            />
          </CardHeader>
          <CardContent className="flex flex-col relative py-[28px]">
            <div className={`relative ${expandContent ? 'h-auto' : 'h-[450px] overflow-hidden'}`}>
              {!showInterviewPreview ? (
                <AnalysisPreview 
                  matchResult={matchResult} 
                  showContentIndicator={showContentIndicator} 
                  expandContent={expandContent} 
                  onExpandContent={toggleContent} 
                />
              ) : (
                <InterviewPreview 
                  isInterviewOptionsOpen={isInterviewOptionsOpen} 
                  setIsInterviewOptionsOpen={setIsInterviewOptionsOpen} 
                />
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JobMatchingForm;
