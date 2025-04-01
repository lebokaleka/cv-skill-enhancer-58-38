
import { useState, useEffect } from 'react';
import { InterviewType, Message, InterviewQuestion } from '@/types/interview';
import { interviewQuestionsByCategory } from '@/utils/interviewUtils';

export const useInterviewQuestions = (
  currentStep: string, 
  interviewType: InterviewType, 
  difficulty: string, 
  questionCount: number
) => {
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Set up initial questions based on interview type and difficulty
  useEffect(() => {
    if (currentStep === 'interview') {
      if (interviewType === 'general') {
        // Get questions from the correct difficulty level
        const availableQuestions = interviewQuestionsByCategory.general[difficulty as keyof typeof interviewQuestionsByCategory.general];
        
        // Randomly select the requested number of questions
        const shuffled = [...availableQuestions].sort(() => 0.5 - Math.random());
        const selectedQuestions = shuffled.slice(0, questionCount);
        
        setQuestions(selectedQuestions);
        
        // Set the first question as the initial AI message
        setMessages([{
          role: 'ai',
          content: selectedQuestions[0].question
        }]);
      } else if (interviewType === 'narrowed') {
        // For job-specific interviews, we'll use a set of default questions for now
        // In a real implementation, these would be generated based on job details
        const jobSpecificQuestions = [
          {
            question: "What specific experience do you have that makes you a good fit for this position?",
            type: "Persuasive" as QuestionType,
            keyPoints: ["Relevant experience", "Key skills", "Past achievements", "Industry knowledge"]
          },
          {
            question: "How do your skills align with the requirements mentioned in the job description?",
            type: "Self-Assessment" as QuestionType,
            keyPoints: ["Match between skills and requirements", "Examples of using relevant skills", "How your experience prepares you", "Areas of expertise"]
          },
          {
            question: "Can you describe a project where you used the key skills required for this role?",
            type: "Behavioral" as QuestionType,
            keyPoints: ["Project overview", "Specific skills utilized", "Your contributions", "Outcomes achieved"]
          },
          {
            question: "What interests you most about working at this company?",
            type: "Company Knowledge" as QuestionType,
            keyPoints: ["Company mission and values", "Products/services", "Company culture", "Growth opportunities"]
          },
          {
            question: "How do you see yourself contributing to this role in the first 90 days?",
            type: "Strategic Thinking" as QuestionType,
            keyPoints: ["Learning period", "Initial priorities", "Building relationships", "Early wins"]
          }
        ];
        setQuestions(jobSpecificQuestions);
        setMessages([{
          role: 'ai',
          content: jobSpecificQuestions[0].question
        }]);
      }
    }
  }, [currentStep, interviewType, difficulty, questionCount]);

  return {
    questions,
    messages,
    currentQuestionIndex,
    setMessages,
    setCurrentQuestionIndex
  };
};
