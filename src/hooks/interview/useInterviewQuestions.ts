
import { useState, useEffect } from 'react';
import { InterviewType, Message } from '@/types/interview';
import { interviewQuestionsByCategory } from '@/utils/interviewUtils';

export const useInterviewQuestions = (
  currentStep: string, 
  interviewType: InterviewType, 
  difficulty: string, 
  questionCount: number
) => {
  const [questions, setQuestions] = useState<string[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Set up initial questions based on interview type and difficulty
  useEffect(() => {
    if (currentStep === 'interview') {
      if (interviewType === 'general') {
        // For General Interview, we always use 5 questions from the selected difficulty
        const selectedQuestions = [...interviewQuestionsByCategory.general[difficulty as keyof typeof interviewQuestionsByCategory.general]];
        // Only use first 5 questions for General Interview
        setQuestions(selectedQuestions.slice(0, 5));
        setMessages([{
          role: 'ai',
          content: selectedQuestions[0]
        }]);
      } else if (interviewType === 'narrowed') {
        // For job-specific interviews, we'll use a set of default questions for now
        // In a real implementation, these would be generated based on job details
        const jobSpecificQuestions = [
          "What specific experience do you have that makes you a good fit for this position?",
          "How do your skills align with the requirements mentioned in the job description?",
          "Can you describe a project where you used the key skills required for this role?",
          "What interests you most about working at this company?",
          "How do you see yourself contributing to this role in the first 90 days?"
        ];
        setQuestions(jobSpecificQuestions);
        setMessages([{
          role: 'ai',
          content: jobSpecificQuestions[0]
        }]);
      }
    }
  }, [currentStep, interviewType, difficulty]);

  return {
    questions,
    messages,
    currentQuestionIndex,
    setMessages,
    setCurrentQuestionIndex
  };
};
