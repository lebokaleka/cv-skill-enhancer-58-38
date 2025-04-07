
import { useState, useEffect } from 'react';
import { InterviewType, Message, InterviewQuestion, QuestionType, FormData } from '@/types/interview';
import { interviewQuestionsByCategory } from '@/utils/interviewUtils';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export const useInterviewQuestions = (
  currentStep: string, 
  interviewType: InterviewType, 
  difficulty: string, 
  questionCount: number,
  jobFormData?: FormData
) => {
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Generate job-specific questions using OpenAI
  const generateJobQuestions = async (formData: FormData) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-job-questions', {
        body: {
          jobTitle: formData.jobTitle,
          companyName: formData.companyName,
          jobDescription: formData.jobDescription,
          positionLevel: formData.positionLevel,
          keySkills: formData.keySkills,
        }
      });
      
      if (error) {
        console.error('Error generating job questions:', error);
        toast({
          title: 'Question Generation Failed',
          description: 'There was an error generating interview questions. Please try again.',
          variant: 'destructive'
        });
        return [];
      }
      
      // Transform the API response to match our InterviewQuestion structure
      const jobQuestions: InterviewQuestion[] = data.questions.map((q: any) => ({
        question: q.question,
        type: q.type as QuestionType,
        keyPoints: q.keyPoints
      }));
      
      return jobQuestions;
    } catch (error) {
      console.error('Error in generateJobQuestions:', error);
      toast({
        title: 'Question Generation Failed',
        description: 'There was an error generating interview questions. Please try again.',
        variant: 'destructive'
      });
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Set up initial questions based on interview type and difficulty
  useEffect(() => {
    const setupQuestions = async () => {
      if (currentStep === 'interview') {
        if (interviewType === 'general') {
          // Get questions from the correct difficulty level
          const difficultyKey = difficulty as keyof typeof interviewQuestionsByCategory.general;
          const availableQuestions = interviewQuestionsByCategory.general[difficultyKey];
          
          // Randomly select the requested number of questions
          const shuffled = [...availableQuestions].sort(() => 0.5 - Math.random());
          const selectedQuestions = shuffled.slice(0, questionCount);
          
          // Cast each question's type property to QuestionType
          const typedQuestions: InterviewQuestion[] = selectedQuestions.map(q => ({
            ...q,
            type: q.type as QuestionType
          }));
          
          setQuestions(typedQuestions);
          
          // Set the first question as the initial AI message
          if (typedQuestions.length > 0) {
            setMessages([{
              role: 'ai',
              content: typedQuestions[0].question
            }]);
          }
        } else if (interviewType === 'narrowed' && jobFormData) {
          // For job-specific interviews, generate questions based on job details
          setIsLoading(true);
          
          // Show a message while generating questions
          setMessages([{
            role: 'ai',
            content: 'Generating job-specific interview questions. One moment please...'
          }]);
          
          // Generate job-specific questions
          const jobQuestions = await generateJobQuestions(jobFormData);
          
          if (jobQuestions.length > 0) {
            setQuestions(jobQuestions);
            
            // Update the message with the first question
            setMessages([{
              role: 'ai',
              content: `Let's start the interview for the ${jobFormData.jobTitle} position at ${jobFormData.companyName}. Here's your first question:\n\n${jobQuestions[0].question}`
            }]);
          } else {
            // Fallback to default questions if generation fails
            const fallbackQuestions: InterviewQuestion[] = [
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
            
            setQuestions(fallbackQuestions);
            setMessages([{
              role: 'ai',
              content: fallbackQuestions[0].question
            }]);
          }
          
          setIsLoading(false);
        }
      }
    };
    
    setupQuestions();
  }, [currentStep, interviewType, difficulty, questionCount, jobFormData]);

  return {
    questions,
    messages,
    currentQuestionIndex,
    isLoading,
    setMessages,
    setCurrentQuestionIndex
  };
};
