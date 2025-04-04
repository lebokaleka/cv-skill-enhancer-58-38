
import { useInterviewState } from '@/hooks/useInterviewState';
import InterviewLanding from '@/components/interview/InterviewLanding';
import InterviewSelection from '@/components/interview/InterviewSelection';
import InterviewSession from '@/components/interview/InterviewSession';
import InterviewResults from '@/components/interview/InterviewResults';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';
import { InterviewType } from '@/types/interview';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import APIKeySettings from '@/components/settings/APIKeySettings';
import { isOpenAIKeySet } from '@/utils/openaiUtils';
import { toast } from '@/hooks/use-toast';

const Interview = () => {
  const [showSettings, setShowSettings] = useState(false);
  
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
  
  const { isAuthenticated, setIsAuthModalOpen } = useAuth();
  
  // Check authentication when attempting to start an interview
  const handleInterviewTypeSelectWithAuth = (type: InterviewType, selectedDifficulty?: string) => {
    if (type && !isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }
    
    // Check if OpenAI API key is set before starting the interview
    if (type && !isOpenAIKeySet()) {
      toast({
        title: "API Key Required",
        description: "Please set your OpenAI API key in the settings before starting an interview",
        variant: "destructive"
      });
      setShowSettings(true);
      return;
    }
    
    handleInterviewTypeSelect(type, selectedDifficulty);
  };
  
  const handleStartInterviewWithAuth = () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }
    
    // Check if OpenAI API key is set before starting the interview
    if (!isOpenAIKeySet()) {
      toast({
        title: "API Key Required",
        description: "Please set your OpenAI API key in the settings before starting an interview",
        variant: "destructive"
      });
      setShowSettings(true);
      return;
    }
    
    handleStartInterview();
  };

  // Render content based on current step
  const renderContent = () => {
    switch (currentStep) {
      case 'landing':
        return (
          <>
            <div className="flex justify-end mb-6">
              <button 
                onClick={() => setShowSettings(!showSettings)}
                className="text-sm text-primary underline"
              >
                {showSettings ? "Hide Settings" : "Settings"}
              </button>
            </div>
            
            {showSettings ? (
              <APIKeySettings />
            ) : (
              <InterviewLanding onSelectInterviewType={handleInterviewTypeSelectWithAuth} />
            )}
          </>
        );
      case 'selection':
        return (
          <InterviewSelection
            interviewType={interviewType}
            difficulty={difficulty}
            questionCount={questionCount}
            onSetDifficulty={setDifficulty}
            onSetQuestionCount={setQuestionCount}
            onStartInterview={handleStartInterviewWithAuth}
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
            isProcessing={isProcessing}
            audioUrl={audioUrl}
            transcription={transcription}
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
