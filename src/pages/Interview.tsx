
import { useState } from 'react';
import { useInterviewState } from '@/hooks/useInterviewState';
import InterviewLanding from '@/components/interview/InterviewLanding';
import InterviewSelection from '@/components/interview/InterviewSelection';
import InterviewSession from '@/components/interview/InterviewSession';
import InterviewResults from '@/components/interview/InterviewResults';
import ApiKeySettings from '@/components/interview/settings/ApiKeySettings';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';
import { InterviewType } from '@/types/interview';
import { Settings, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from '@/components/ui/sheet';

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
    openAIApiKey,
    
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
    setOpenAIApiKey
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
          <InterviewLanding onSelectInterviewType={handleInterviewTypeSelectWithAuth} />
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
        {/* Settings button */}
        <div className="fixed top-20 right-4 z-10">
          <Button
            onClick={() => setShowSettings(true)}
            size="sm"
            variant="outline"
            className="rounded-full h-10 w-10 p-0"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Settings panel */}
        <Sheet open={showSettings} onOpenChange={setShowSettings}>
          <SheetContent>
            <SheetHeader className="pb-4">
              <SheetTitle>Interview Settings</SheetTitle>
              <SheetDescription>
                Configure API keys and other interview settings.
              </SheetDescription>
            </SheetHeader>
            <div className="space-y-6 py-4">
              <ApiKeySettings 
                apiKey={openAIApiKey} 
                setApiKey={setOpenAIApiKey} 
              />
            </div>
            <SheetClose asChild>
              <Button
                className="absolute top-4 right-4 h-7 w-7 p-0 rounded-full"
                variant="ghost"
              >
                <X className="h-4 w-4" />
              </Button>
            </SheetClose>
          </SheetContent>
        </Sheet>
        
        <div className="app-container">
          {renderContent()}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Interview;
