
import { InterviewType } from '@/types/interview';
import JobSpecificSettings from './settings/JobSpecificSettings';

interface InterviewSelectionProps {
  interviewType: InterviewType;
  difficulty: string;
  questionCount: number;
  onSetDifficulty: (difficulty: string) => void;
  onSetQuestionCount: (count: number) => void;
  onStartInterview: () => void;
  onBack: () => void;
}

const InterviewSelection = ({ 
  interviewType, 
  difficulty, 
  questionCount, 
  onSetDifficulty, 
  onSetQuestionCount, 
  onStartInterview, 
  onBack 
}: InterviewSelectionProps) => {
  // Now we only need to handle the narrowed (job-specific) interview type
  // as the general interview is directly started from the landing page
  if (interviewType === 'narrowed') {
    return (
      <JobSpecificSettings
        onStartInterview={onStartInterview}
        onBack={onBack}
      />
    );
  }
  
  return null;
};

export default InterviewSelection;
