
import { useState } from 'react';
import { InterviewStep, InterviewType, InterviewQuestion } from '@/types/interview';
import { useRecording } from './interview/useRecording';
import { useInterviewQuestions } from './interview/useInterviewQuestions';
import { useAnswerAnalysis } from './interview/useAnswerAnalysis';

export const useInterviewState = () => {
  // Core interview state
  const [currentStep, setCurrentStep] = useState<InterviewStep>('landing');
  const [interviewType, setInterviewType] = useState<InterviewType>(null);
  const [difficulty, setDifficulty] = useState('basic');
  const [questionCount, setQuestionCount] = useState(5); // Fixed to 5 for general interviews
  const [openAIApiKey, setOpenAIApiKey] = useState<string | null>(localStorage.getItem('openai_api_key'));

  // Custom hooks
  const recording = useRecording();
  const interviewQuestions = useInterviewQuestions(currentStep, interviewType, difficulty, questionCount);
  const answerAnalysis = useAnswerAnalysis(
    interviewQuestions.setMessages,
    interviewQuestions.currentQuestionIndex,
    interviewQuestions.questions,
    (step) => setCurrentStep(step as InterviewStep)
  );

  // API key handler
  const handleSetApiKey = (key: string) => {
    setOpenAIApiKey(key);
    recording.setApiKey(key);
    // Also pass to answer analysis if needed
  };

  // Submit recording handler
  const handleSubmitRecording = async () => {
    if (!recording.audioUrl) return;
    
    try {
      // Transcribe audio using OpenAI
      const userResponse = await recording.transcribeAudio();
      
      interviewQuestions.setMessages(prev => [...prev, {
        role: 'user',
        content: userResponse
      }]);
      
      answerAnalysis.setIsAnalyzing(true);
      answerAnalysis.analyzeSentiment(userResponse);
    } catch (error) {
      console.error("Error processing recording:", error);
    }
  };

  // Interview flow handlers
  const handleInterviewTypeSelect = (type: InterviewType, selectedDifficulty?: string) => {
    // If a difficulty is provided, update it first
    if (selectedDifficulty) {
      setDifficulty(selectedDifficulty);
    }
    
    setInterviewType(type);
    if (type) {
      setCurrentStep('interview');
    }
  };

  const handleStartInterview = () => {
    setCurrentStep('interview');
  };

  const handleStartNewInterview = () => {
    setCurrentStep('landing');
    setInterviewType(null);
    interviewQuestions.setCurrentQuestionIndex(0);
    recording.setAudioUrl(null);
    recording.setTranscription(null);
  };

  return {
    // State
    currentStep,
    interviewType,
    difficulty,
    questionCount,
    isRecording: recording.isRecording,
    recordingTime: recording.recordingTime,
    isPlaying: recording.isPlaying,
    currentQuestionIndex: interviewQuestions.currentQuestionIndex,
    questions: interviewQuestions.questions,
    messages: interviewQuestions.messages,
    audioUrl: recording.audioUrl,
    isAnalyzing: answerAnalysis.isAnalyzing,
    isProcessing: recording.isProcessing,
    transcription: recording.transcription,
    openAIApiKey,
    
    // Handlers
    setDifficulty,
    setQuestionCount,
    handleStartRecording: recording.handleStartRecording,
    handleStopRecording: recording.handleStopRecording,
    handleTogglePlayback: recording.handleTogglePlayback,
    handleSubmitRecording,
    handleInterviewTypeSelect,
    handleStartInterview,
    handleStartNewInterview,
    handleClearRecording: recording.handleClearRecording,
    setOpenAIApiKey: handleSetApiKey
  };
};
