
export type InterviewType = 'general' | 'narrowed' | null;
export type InterviewStep = 'landing' | 'selection' | 'interview' | 'results';
export type DifficultyLevel = 'basic' | 'intermediate' | 'advanced';
export type QuestionType = 'Behavioral' | 'Self-Assessment' | 'Company Knowledge' | 'Motivational' | 
  'Problem-Solving' | 'Teamwork' | 'Time Management' | 'Communication' | 'Persuasive' | 'Work Ethic' | 
  'Personality Fit' | 'Career Goals' | 'Project Management' | 'Conflict Resolution' | 
  'Leadership' | 'Customer Service' | 'Analytical Thinking' | 'Productivity & Efficiency' | 
  'Decision-Making' | 'Leadership & Change Management' | 'Strategic Thinking' | 
  'Change Management' | 'Process Improvement' | 'Conflict Resolution & Cross-Functional Leadership' | 
  'Resilience & Problem-Solving' | 'Strategic Risk Assessment' | 'People Management' | 
  'Leadership & HR Management' | 'Leadership & Team Building' | 'Mentorship & Leadership' | 
  'Financial Decision-Making' | 'Business Performance Analysis' | 'Project & Stakeholder Management' | 
  'Data-Driven Decision-Making' | 'Executive Communication' | 'Negotiation & Business Development' | 
  'Public Speaking & Brand Representation' | 'Cross-Cultural & Remote Leadership' |
  'Adaptability' | 'Leadership Potential' | 'Self-Improvement';

export interface SentimentScore {
  confidence: number;
  clarity: number;
  relevance: number;
  overall: number;
  jobFit?: number;
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

export interface InterviewQuestion {
  question: string;
  type: QuestionType;
  keyPoints: string[];
}

export interface InterviewQuestions {
  general: {
    basic: InterviewQuestion[];
    intermediate: InterviewQuestion[];
    advanced: InterviewQuestion[];
  }
}
