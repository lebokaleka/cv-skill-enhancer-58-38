
export type InterviewType = 'general' | 'narrowed' | null;
export type InterviewStep = 'landing' | 'selection' | 'interview' | 'results';
export type DifficultyLevel = 'basic' | 'intermediate' | 'advanced';

export interface SentimentScore {
  confidence: number;
  clarity: number;
  relevance: number;
  overall: number;
}

export interface Message {
  role: 'user' | 'ai';
  content: string;
  sentiment?: SentimentScore;
}

export interface FormData {
  jobTitle: string;
  companyName: string;
  jobDescription: string;
  positionLevel: string;
  keySkills: string;
}

export interface InterviewQuestions {
  general: {
    basic: string[];
    intermediate: string[];
    advanced: string[];
  }
}
