
import { useState, useRef, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";
import { InterviewStep, InterviewType, Message } from '@/types/interview';
import { interviewQuestionsByCategory, startRecording, stopRecording, generateFeedback } from '@/utils/interviewUtils';

export const useInterviewState = () => {
  // State
  const [currentStep, setCurrentStep] = useState<InterviewStep>('landing');
  const [interviewType, setInterviewType] = useState<InterviewType>(null);
  const [difficulty, setDifficulty] = useState('basic');
  const [questionCount, setQuestionCount] = useState(5);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<string[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // Refs
  const recordingTimerRef = useRef<number | null>(null);

  // Effects
  useEffect(() => {
    if (currentStep === 'interview' && interviewType === 'general') {
      const selectedQuestions = [...interviewQuestionsByCategory.general[difficulty as keyof typeof interviewQuestionsByCategory.general]];
      setQuestions(selectedQuestions.slice(0, questionCount));
      setMessages([{
        role: 'ai',
        content: selectedQuestions[0]
      }]);
    }
  }, [currentStep, interviewType, difficulty, questionCount]);

  useEffect(() => {
    if (isRecording) {
      recordingTimerRef.current = window.setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= 30) {
            handleStopRecording();
            toast({
              title: "Recording limit reached",
              description: "The maximum recording time is 30 seconds"
            });
            return 30;
          }
          return prev + 1;
        });
      }, 1000);
    } else if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
    }
    
    return () => {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
    };
  }, [isRecording]);

  // Handlers
  const handleStartRecording = () => {
    startRecording(setIsRecording, setRecordingTime, setAudioUrl);
  };

  const handleStopRecording = () => {
    stopRecording(setIsRecording, setAudioUrl);
  };

  const handleTogglePlayback = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setTimeout(() => {
        setIsPlaying(false);
      }, 3000);
    }
  };

  const handleSubmitRecording = () => {
    if (!audioUrl) return;
    
    const userResponse = "This is a simulated transcription of the recorded answer. In a real implementation, this would be the actual transcribed text from the audio recording.";
    
    setMessages(prev => [...prev, {
      role: 'user',
      content: userResponse
    }]);
    
    setIsAnalyzing(true);
    
    setTimeout(() => {
      analyzeSentiment(userResponse);
    }, 2000);
  };

  const analyzeSentiment = (response: string) => {
    // In a real implementation, this would call an API to analyze the sentiment
    const sentiment = {
      confidence: Math.floor(Math.random() * 40) + 60,
      clarity: Math.floor(Math.random() * 40) + 60,
      relevance: Math.floor(Math.random() * 40) + 60,
      overall: Math.floor(Math.random() * 40) + 60
    };
    
    const feedback = generateFeedback(sentiment);
    
    setMessages(prev => [...prev, {
      role: 'ai',
      content: feedback,
      sentiment: sentiment
    }]);
    
    setIsAnalyzing(false);
    
    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
        setMessages(prev => [...prev, {
          role: 'ai',
          content: questions[currentQuestionIndex + 1]
        }]);
        setAudioUrl(null);
      }, 1500);
    } else {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          role: 'ai',
          content: "Interview session complete! You've answered all the questions. You can now view your results."
        }]);
        setCurrentStep('results');
      }, 1500);
    }
  };

  const handleInterviewTypeSelect = (type: 'general' | 'narrowed') => {
    setInterviewType(type);
    
    // When selecting general interview, skip the selection step and go straight to the interview
    if (type === 'general') {
      setCurrentStep('interview');
    } else {
      setCurrentStep('selection');
    }
  };

  const handleStartInterview = () => {
    setCurrentStep('interview');
  };

  const handleStartNewInterview = () => {
    setCurrentStep('landing');
    setInterviewType(null);
    setCurrentQuestionIndex(0);
    setQuestions([]);
    setMessages([]);
    setAudioUrl(null);
  };

  const handleClearRecording = () => {
    setAudioUrl(null);
  };

  return {
    // State
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
    
    // Handlers
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
  };
};
