
import { useState } from 'react';
import { InterviewStep, InterviewType } from '@/types/interview';
import { useRecording } from './interview/useRecording';
import { useInterviewQuestions } from './interview/useInterviewQuestions';
import { useAnswerAnalysis } from './interview/useAnswerAnalysis';

export const useInterviewState = () => {
  // Core interview state
  const [currentStep, setCurrentStep] = useState<InterviewStep>('landing');
  const [interviewType, setInterviewType] = useState<InterviewType>(null);
  const [difficulty, setDifficulty] = useState('basic');
  const [questionCount, setQuestionCount] = useState(5); // Fixed to 5 for general interviews

  // Custom hooks
  const recording = useRecording();
  const interviewQuestions = useInterviewQuestions(currentStep, interviewType, difficulty, questionCount);
  const answerAnalysis = useAnswerAnalysis(
    interviewQuestions.setMessages,
    interviewQuestions.currentQuestionIndex,
    interviewQuestions.questions,
    (step) => setCurrentStep(step as InterviewStep)
  );

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
      
      setTimeout(() => {
        answerAnalysis.analyzeSentiment(userResponse);
        interviewQuestions.setCurrentQuestionIndex(prev => prev + 1);
      }, 2000);
    } catch (error) {
      console.error("Error processing recording:", error);
    }
  };

  // Interview flow handlers
  const handleInterviewTypeSelect = (type: InterviewType) => {
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
    questionObjects: interviewQuestions.questionObjects,
    messages: interviewQuestions.messages,
    audioUrl: recording.audioUrl,
    isAnalyzing: answerAnalysis.isAnalyzing,
    isProcessing: recording.isProcessing,
    transcription: recording.transcription,
    
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
    handleClearRecording: recording.handleClearRecording
  };
};
