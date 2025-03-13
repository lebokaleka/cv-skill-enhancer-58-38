
import { useInterviewState } from '@/hooks/useInterviewState';
import InterviewLanding from '@/components/interview/InterviewLanding';
import InterviewSelection from '@/components/interview/InterviewSelection';
import InterviewSession from '@/components/interview/InterviewSession';
import InterviewResults from '@/components/interview/InterviewResults';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

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
    
    setDifficulty,
    setQuestionCount,
    handleStartRecording,
    handleStopRecording,
    handleTogglePlayback,
    handleSubmitRecording,
    handleInterviewTypeSelect,
    handleStartInterview,
    handleStartNewInterview,
    handleClearRecording
  } = useInterviewState();

  // Render content based on current step
  const renderContent = () => {
    switch (currentStep) {
      case 'landing':
        return (
          <InterviewLanding onSelectInterviewType={handleInterviewTypeSelect} />
        );
      case 'selection':
        return (
          <InterviewSelection
            interviewType={interviewType}
            difficulty={difficulty}
            questionCount={questionCount}
            onSetDifficulty={setDifficulty}
            onSetQuestionCount={setQuestionCount}
            onStartInterview={handleStartInterview}
            onBack={() => handleInterviewTypeSelect(null)}
          />
        );
      case 'interview':
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
            audioUrl={audioUrl}
            startRecording={handleStartRecording}
            stopRecording={handleStopRecording}
            togglePlayback={handleTogglePlayback}
            submitRecording={handleSubmitRecording}
            clearRecording={handleClearRecording}
            onGoBack={() => handleInterviewTypeSelect(null)}
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
