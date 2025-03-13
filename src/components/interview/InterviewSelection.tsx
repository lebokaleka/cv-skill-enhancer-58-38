
import { InterviewType } from '@/types/interview';
import GeneralInterviewSettings from './settings/GeneralInterviewSettings';
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
  if (interviewType === 'general') {
    return (
      <GeneralInterviewSettings
        difficulty={difficulty}
        questionCount={questionCount}
        onSetDifficulty={onSetDifficulty}
        onSetQuestionCount={onSetQuestionCount}
        onStartInterview={onStartInterview}
        onBack={onBack}
      />
    );
  } else if (interviewType === 'narrowed') {
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
