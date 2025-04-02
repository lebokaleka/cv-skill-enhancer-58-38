
import { InterviewStep, InterviewType, Message, InterviewQuestion } from '@/types/interview';

export interface InterviewState {
  currentStep: InterviewStep;
  interviewType: InterviewType;
  difficulty: string;
  questionCount: number;
  isRecording: boolean;
  recordingTime: number;
  isPlaying: boolean;
  currentQuestionIndex: number;
  questions: InterviewQuestion[];
  messages: Message[];
  audioUrl: string | null;
  isAnalyzing: boolean;
}

export interface InterviewActions {
  setDifficulty: (difficulty: string) => void;
  setQuestionCount: (count: number) => void;
  handleStartRecording: () => void;
  handleStopRecording: () => void;
  handleTogglePlayback: () => void;
  handleSubmitRecording: () => void;
  handleInterviewTypeSelect: (type: InterviewType, selectedDifficulty?: string) => void;
  handleStartInterview: () => void;
  handleStartNewInterview: () => void;
  handleClearRecording: () => void;
}
