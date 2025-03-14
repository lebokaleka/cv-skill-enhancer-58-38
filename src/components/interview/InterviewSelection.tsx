
import { InterviewType } from '@/types/interview';

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
  onStartInterview, 
  onBack 
}: InterviewSelectionProps) => {
  // This component is now essentially a pass-through since job-specific settings
  // are directly handled in the InterviewLanding component
  if (interviewType === 'narrowed') {
    onStartInterview(); // Automatically start the interview
    return null;
  }
  
  return null;
};

export default InterviewSelection;
