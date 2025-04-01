
import { useState, useEffect } from 'react';
import { InterviewType, Message, QuestionWithStrategy, DifficultyLevel } from '@/types/interview';
import { interviewQuestionsByCategory, selectRandomQuestions, extractQuestionTexts } from '@/utils/interviewUtils';
import { toast } from "@/hooks/use-toast";

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
        // Validate and normalize difficulty to ensure it's a valid DifficultyLevel
        const validatedDifficulty = validateDifficulty(difficulty);
        
        // Debug information
        console.log(`Selecting questions with validated difficulty: ${validatedDifficulty}`);
        
        try {
          // Select random questions based on validated difficulty
          const selectedQuestionObjects = selectRandomQuestions(validatedDifficulty, questionCount);
          
          if (selectedQuestionObjects.length === 0) {
            toast({
              title: "Error loading questions",
              description: "No questions available for the selected difficulty",
              variant: "destructive"
            });
            return;
          }
          
          setQuestionObjects(selectedQuestionObjects);
          
          // Extract just the question texts for backwards compatibility
          const questionTexts = extractQuestionTexts(selectedQuestionObjects);
          setQuestions(questionTexts);
          
          // Set the first question as an AI message
          setMessages([{
            role: 'ai',
            content: questionTexts[0]
          }]);
        } catch (error) {
          console.error("Error selecting interview questions:", error);
          toast({
            title: "Error loading questions",
            description: "There was a problem loading interview questions",
            variant: "destructive"
          });
        }
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

  // Helper function to validate and normalize difficulty
  const validateDifficulty = (difficultyInput: string): DifficultyLevel => {
    // Normalize to lowercase for consistent comparison
    const normalizedDifficulty = difficultyInput.toLowerCase();
    
    // Check if it's one of our valid difficulty levels
    if (['basic', 'intermediate', 'advanced'].includes(normalizedDifficulty)) {
      return normalizedDifficulty as DifficultyLevel;
    }
    
    // Default to 'basic' if invalid
    console.warn(`Invalid difficulty level provided: "${difficultyInput}". Defaulting to "basic".`);
    return 'basic';
  };

  return {
    questions,
    questionObjects,
    messages,
    currentQuestionIndex,
    setMessages,
    setCurrentQuestionIndex
  };
};
