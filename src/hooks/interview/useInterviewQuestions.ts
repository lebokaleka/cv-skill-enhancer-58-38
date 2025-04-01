
import { useState, useEffect } from 'react';
import { InterviewType, Message, QuestionWithStrategy } from '@/types/interview';
import { interviewQuestionsByCategory, selectRandomQuestions, extractQuestionTexts } from '@/utils/interviewUtils';

export const useInterviewQuestions = (
  currentStep: string, 
  interviewType: InterviewType, 
  difficulty: string, 
  questionCount: number
) => {
  const [questions, setQuestions] = useState<string[]>([]);
  const [questionObjects, setQuestionObjects] = useState<QuestionWithStrategy[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Set up initial questions based on interview type and difficulty
  useEffect(() => {
    if (currentStep === 'interview') {
      if (interviewType === 'general') {
        // Debug information
        console.log(`Selecting questions with difficulty: ${difficulty}`);
        
        // Select random questions based on difficulty - explicitly pass the difficulty level
        const selectedQuestionObjects = selectRandomQuestions(difficulty, questionCount);
        setQuestionObjects(selectedQuestionObjects);
        
        // Extract just the question texts for backwards compatibility
        const questionTexts = extractQuestionTexts(selectedQuestionObjects);
        setQuestions(questionTexts);
        
        // Set the first question as an AI message
        setMessages([{
          role: 'ai',
          content: questionTexts[0]
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
        
        // Create dummy question objects for job-specific questions
        const jobSpecificQuestionObjects = jobSpecificQuestions.map(q => ({
          question: q,
          type: "Job-Specific",
          keyPoints: [
            "Relevant experience",
            "Skills alignment",
            "Cultural fit"
          ]
        }));
        
        setQuestionObjects(jobSpecificQuestionObjects);
        setQuestions(jobSpecificQuestions);
        setMessages([{
          role: 'ai',
          content: jobSpecificQuestions[0]
        }]);
      }
    }
  }, [currentStep, interviewType, difficulty, questionCount]);

  return {
    questions,
    questionObjects,
    messages,
    currentQuestionIndex,
    setMessages,
    setCurrentQuestionIndex
  };
};
