
import { useInterviewState } from '@/hooks/useInterviewState';
import InterviewLanding from '@/components/interview/InterviewLanding';
import InterviewSession from '@/components/interview/InterviewSession';
import InterviewResults from '@/components/interview/InterviewResults';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';
import { InterviewType, FormData } from '@/types/interview';
import { Loader2 } from 'lucide-react';

const Interview = () => {
  const {
    currentStep,
    interviewType,
    difficulty,
    questionCount,
    isRecording,
    recordingTime,
    isPlaying,
    currentQuestionIndex,
    questions,
    messages,
    audioUrl,
    isAnalyzing,
    isProcessing,
    transcription,
    isLoading,
    jobForm,
    jobFormData,
    
    setDifficulty,
    setQuestionCount,
    handleStartRecording,
    handleStopRecording,
    handleTogglePlayback,
    handleSubmitRecording,
    handleInterviewTypeSelect,
    handleStartInterview,
    handleStartNewInterview,
    handleClearRecording,
    handleJobFormSubmit
  } = useInterviewState();
  
  const { isAuthenticated, setIsAuthModalOpen } = useAuth();
  
  // Check authentication when attempting to start an interview
  const handleInterviewTypeSelectWithAuth = (type: InterviewType, selectedDifficulty?: string) => {
    if (type && !isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }
    handleInterviewTypeSelect(type, selectedDifficulty);
  };
  
  const handleJobFormSubmitWithAuth = (data: FormData) => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }
    handleJobFormSubmit(data);
  };
  
  const handleStartInterviewWithAuth = () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }
    handleStartInterview();
  };

  // Render content based on current step
  const renderContent = () => {
    switch (currentStep) {
      case 'landing':
        return (
          <InterviewLanding 
            onSelectInterviewType={handleInterviewTypeSelectWithAuth}
            onJobFormSubmit={handleJobFormSubmitWithAuth}
            jobForm={jobForm}
          />
        );
      case 'interview':
        // Show loading state while questions are being generated
        if (isLoading) {
          return (
            <div className="flex flex-col items-center justify-center h-64">
              <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
              <p className="text-lg">Generating your interview questions...</p>
              <p className="text-sm text-muted-foreground mt-2">
                This may take a moment as we create personalized questions for your interview.
              </p>
            </div>
          );
        }
        
        return (
          <InterviewSession
            interviewType={interviewType}
            currentQuestionIndex={currentQuestionIndex}
            questions={questions}
            messages={messages}
            isRecording={isRecording}
            recordingTime={recordingTime}
            isPlaying={isPlaying}
            isAnalyzing={isAnalyzing}
            isProcessing={isProcessing}
            audioUrl={audioUrl}
            transcription={transcription}
            startRecording={handleStartRecording}
            stopRecording={handleStopRecording}
            togglePlayback={handleTogglePlayback}
            submitRecording={handleSubmitRecording}
            clearRecording={handleClearRecording}
            onGoBack={() => handleStartNewInterview()}
          />
        );
      case 'results':
        return (
          <InterviewResults
            messages={messages}
            questions={questions}
            onStartNewInterview={handleStartNewInterview}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="app-container">
          {renderContent()}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Interview;
