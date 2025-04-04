
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
    localStorage.setItem('openai_api_key', key);
    recording.setApiKey(key);
  };

  // Submit recording handler
  const handleSubmitRecording = async () => {
    if (!recording.audioUrl) {
      console.error("No audio recording to submit");
      return;
    }
    
    try {
      // Set loading state
      recording.setIsProcessing(true);
      
      // Transcribe audio using OpenAI via the edge function
      const audioData = await recording.transcribeAudio();
      
      if (!audioData) {
        throw new Error("Failed to process audio");
      }
      
      // Get the current question
      const currentQuestion = interviewQuestions.questions[interviewQuestions.currentQuestionIndex];
      
      if (!currentQuestion) {
        throw new Error("No question found");
      }
      
      // Send audio to analyze-interview-response edge function
      const response = await fetch('https://tpsbdccngrhhdoekzasp.supabase.co/functions/v1/analyze-interview-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          audio: audioData,
          question: currentQuestion.question
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Analysis failed: ${await response.text()}`);
      }
      
      const result = await response.json();
      
      // Set the transcription
      recording.setTranscription(result.transcription);
      
      // Add user message with the transcription
      interviewQuestions.setMessages(prev => [
        ...prev, 
        {
          role: 'user',
          content: result.transcription
        }
      ]);
      
      // Analyze the response
      answerAnalysis.setIsAnalyzing(true);
      
      // Add the AI feedback message (now handled by the edge function response)
      const feedbackHtml = `
        <div>
          <p>${result.feedback}</p>
          <div class="mt-3 pt-3 border-t border-gray-200">
            <div class="grid grid-cols-2 gap-2 text-sm">
              <div>Confidence: ${result.sentiment.confidence}%</div>
              <div>Clarity: ${result.sentiment.clarity}%</div>
              <div>Relevance: ${result.sentiment.relevance}%</div>
              <div>Overall: ${result.sentiment.overall}%</div>
            </div>
          </div>
        </div>
      `;
      
      interviewQuestions.setMessages(prev => [
        ...prev,
        {
          role: 'ai',
          content: feedbackHtml,
          sentiment: result.sentiment
        }
      ]);
      
      // Move to the next question if available
      if (interviewQuestions.currentQuestionIndex < interviewQuestions.questions.length - 1) {
        interviewQuestions.setCurrentQuestionIndex(interviewQuestions.currentQuestionIndex + 1);
        const nextQuestion = interviewQuestions.questions[interviewQuestions.currentQuestionIndex + 1];
        
        interviewQuestions.setMessages(prev => [
          ...prev,
          {
            role: 'ai',
            content: nextQuestion.question
          }
        ]);
      } else {
        // If this was the last question, move to results screen
        setTimeout(() => {
          setCurrentStep('results');
        }, 1500);
      }
      
    } catch (error) {
      console.error("Error processing recording:", error);
      recording.setTranscription("An error occurred while processing your response. Please try again.");
    } finally {
      recording.setIsProcessing(false);
      answerAnalysis.setIsAnalyzing(false);
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
    // Instead of using setAudioUrl which doesn't exist, we'll use handleClearRecording
    recording.handleClearRecording();
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
