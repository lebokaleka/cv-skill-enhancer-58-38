
import { useState } from 'react';
import { useForm } from "react-hook-form";
import InterviewHeader from './landing/InterviewHeader';
import GeneralInterviewCard from './landing/GeneralInterviewCard';
import JobSpecificCard from './landing/JobSpecificCard';
import { InterviewType } from '@/types/interview';

interface InterviewLandingProps {
  onSelectInterviewType: (type: InterviewType) => void;
}

const InterviewLanding = ({
  onSelectInterviewType
}: InterviewLandingProps) => {
  const [difficulty, setDifficulty] = useState<string | null>(null);
  const [questionCount, setQuestionCount] = useState<number | null>(null);
  const [showGeneralError, setShowGeneralError] = useState(false);
  const [showJobError, setShowJobError] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'job'>('general');
  
  const jobForm = useForm({
    defaultValues: {
      jobTitle: '',
      companyName: '',
      jobDescription: '',
      positionLevel: '',
      keySkills: ''
    }
  });

  const handleGeneralInterviewStart = () => {
    if (difficulty && questionCount) {
      // Both settings are selected, proceed with the interview
      onSelectInterviewType('general');
      setShowGeneralError(false);
    } else {
      // Show error message if settings are not complete
      setShowGeneralError(true);
    }
  };

  const handleJobSpecificInterviewStart = () => {
    const formValues = jobForm.getValues();
    const isValid = 
      formValues.jobTitle.trim() !== '' && 
      formValues.companyName.trim() !== '' && 
      formValues.jobDescription.trim() !== '' && 
      formValues.positionLevel.trim() !== '' && 
      formValues.keySkills.trim() !== '';
    
    if (isValid) {
      onSelectInterviewType('narrowed');
      setShowJobError(false);
    } else {
      setShowJobError(true);
      jobForm.trigger(); // Trigger validation to show specific field errors
    }
  };

  return (
    <div>
      <InterviewHeader 
        title="Interview Coach" 
        description="Practice your interview skills with our AI-powered Interview Coach. Get feedback on your responses and improve your performance."
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8 animate-scale-in">
        <GeneralInterviewCard 
          isActive={activeTab === 'general'}
          difficulty={difficulty}
          questionCount={questionCount}
          showError={showGeneralError}
          onSelectTab={() => setActiveTab('general')}
          onSetDifficulty={setDifficulty}
          onSetQuestionCount={setQuestionCount}
          onStartInterview={handleGeneralInterviewStart}
        />
        
        <JobSpecificCard 
          isActive={activeTab === 'job'}
          showError={showJobError}
          formMethods={jobForm}
          onSelectTab={() => setActiveTab('job')}
          onStartInterview={handleJobSpecificInterviewStart}
        />
      </div>
    </div>
  );
};

export default InterviewLanding;
