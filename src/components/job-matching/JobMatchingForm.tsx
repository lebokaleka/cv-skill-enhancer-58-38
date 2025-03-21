
import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { PenTool, Briefcase, Mic } from 'lucide-react';
import { MatchResult } from "@/types/jobMatching";
import InputForm from './InputForm';
import AnalysisResults from './AnalysisResults';
import { useJobMatchingState } from '@/hooks/useJobMatchingState';
import InterviewPreview from './interview-coach/InterviewPreview';
import AnalysisCardHeader from './AnalysisCardHeader';
import AnalysisPlaceholder from './AnalysisPlaceholder';

interface JobMatchingFormProps {
  onAnalyze: (cvText: string, jobDescription: string) => void;
  isAnalyzing: boolean;
  matchResult: MatchResult | null;
}

const JobMatchingForm = ({ onAnalyze, isAnalyzing, matchResult }: JobMatchingFormProps) => {
  const [showInterviewPreview, setShowInterviewPreview] = useState(false);
  const { cvText, jobDescription } = useJobMatchingState();

  useEffect(() => {
    console.log('JobMatchingForm mounted');
    
    return () => {
      console.log('JobMatchingForm unmounted');
    };
  }, []);

  useEffect(() => {
    console.log('matchResult updated:', matchResult ? 'has value' : 'null');
  }, [matchResult]);

  const toggleInterviewPreview = () => {
    console.log('Toggling interview preview');
    setShowInterviewPreview(!showInterviewPreview);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left side: Job Description and CV container */}
      <div>
        <Card className="glass-card border-dashed border animate-fade-in h-full">
          <CardContent>
            <InputForm 
              onAnalyze={onAnalyze} 
              isAnalyzing={isAnalyzing} 
              initialCvText={cvText}
              initialJobDescription={jobDescription}
            />
          </CardContent>
        </Card>
      </div>

      {/* Right side: AI analysis preview section */}
      <div>
        <Card className="glass-card border-dashed animate-fade-in h-full">
          <AnalysisCardHeader 
            showInterviewPreview={showInterviewPreview}
            title={<><PenTool size={20} /><span>AI Analysis Preview</span></>}
            interviewTitle={<><Mic size={20} /><span>AI Interview Coach</span></>}
            description="AI-generated job matching analysis will appear here"
            interviewDescription="Practice interview questions and get real-time feedback"
            onToggleView={toggleInterviewPreview}
          />
          
          <CardContent className="flex flex-col h-[650px] overflow-y-auto">
            {!showInterviewPreview ? (
              !matchResult ? (
                <AnalysisPlaceholder />
              ) : (
                <AnalysisResults matchResult={matchResult} />
              )
            ) : (
              <InterviewPreview />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JobMatchingForm;
