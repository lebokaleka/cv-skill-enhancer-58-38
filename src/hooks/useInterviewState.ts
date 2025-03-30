
import { useState, useEffect } from 'react';
import { InterviewStep, InterviewType } from '@/types/interview';
import { useRecording } from './interview/useRecording';
import { useInterviewQuestions } from './interview/useInterviewQuestions';
import { useAnswerAnalysis } from './interview/useAnswerAnalysis';

export const useInterviewState = () => {
  // Core interview state
  const [currentStep, setCurrentStep] = useState<InterviewStep>('landing');
  const [interviewType, setInterviewType] = useState<InterviewType>(null);
  const [difficulty, setDifficulty] = useState('basic');
  const [questionCount, setQuestionCount] = useState(5); // Default to 5 questions for General Interview
  
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
  const handleSubmitRecording = () => {
    if (!recording.audioUrl) return;
    
    // Set a flag to indicate that analysis is in progress
    answerAnalysis.setIsAnalyzing(true);
    
    // For General Interview, we process with OpenAI API
    if (interviewType === 'general') {
      // In a real implementation, this would send the audio to OpenAI for processing
      // and handle the response. For this implementation, we'll simulate the process
      // with a timeout and use our existing analysis function.
      
      // Simulate OpenAI processing with a timeout
      setTimeout(() => {
        // Simulate speech-to-text conversion
        const userResponse = "This is a simulated transcription of the recorded answer from OpenAI. In a real implementation, this would be the actual transcribed text from the audio recording.";
        
        // Add the user's response to the messages
        interviewQuestions.setMessages(prev => [...prev, {
          role: 'user',
          content: userResponse
        }]);
        
        // Analyze the response
        answerAnalysis.analyzeSentiment(userResponse);
        
        // Move to the next question
        interviewQuestions.setCurrentQuestionIndex(prev => prev + 1);
      }, 2000);
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
