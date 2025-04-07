
import { useState } from 'react';
import { Message, InterviewQuestion, FormData, InterviewType } from '@/types/interview';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export const useAnswerAnalysis = (
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  currentQuestionIndex: number,
  questions: InterviewQuestion[],
  set: (step: 'results' | 'interview') => void,
  interviewType: InterviewType,
  jobFormData?: FormData
) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeSentiment = async (response: string) => {
    setIsAnalyzing(true);
    
    try {
      // Get the current question
      const currentQuestion = questions[currentQuestionIndex];
      
      if (!currentQuestion) {
        throw new Error('Question not found');
      }
      
      let analysisResult;
      
      // Call the appropriate edge function based on interview type
      if (interviewType === 'general') {
        // Use the general interview analysis function
        const { data, error } = await supabase.functions.invoke('analyze-interview', {
          body: {
            question: currentQuestion.question,
            transcription: response
          }
        });
        
        if (error) {
          throw new Error(`Error from analyze-interview: ${error.message}`);
        }
        
        analysisResult = data;
      } else if (interviewType === 'narrowed' && jobFormData) {
        // Use the job-specific interview analysis function with job details
        const { data, error } = await supabase.functions.invoke('analyze-job-specific-interview', {
          body: {
            question: currentQuestion.question,
            transcription: response,
            jobDetails: {
              jobTitle: jobFormData.jobTitle,
              companyName: jobFormData.companyName,
              jobDescription: jobFormData.jobDescription,
              positionLevel: jobFormData.positionLevel,
              keySkills: jobFormData.keySkills
            }
          }
        });
        
        if (error) {
          throw new Error(`Error from analyze-job-specific-interview: ${error.message}`);
        }
        
        analysisResult = data;
      } else {
        throw new Error('Invalid interview type or missing job details');
      }
      
      if (!analysisResult || !analysisResult.sentiment) {
        throw new Error('Invalid analysis result format');
      }
      
      // Extract sentiment scores and feedback
      const { sentiment, feedback } = analysisResult;
      
      // Add AI message with feedback and sentiment scores
      setMessages(prev => [...prev, {
        role: 'ai',
        content: feedback || 'No feedback available.',
        sentiment: sentiment || {
          confidence: 0,
          clarity: 0,
          relevance: 0,
          overall: 0
        }
      }]);
      
      setIsAnalyzing(false);
      
      // Move to next question or results
      if (currentQuestionIndex < questions.length - 1) {
        setTimeout(() => {
          setMessages(prev => [...prev, {
            role: 'ai',
            content: questions[currentQuestionIndex + 1].question
          }]);
        }, 1500);
      } else {
        setTimeout(() => {
          setMessages(prev => [...prev, {
            role: 'ai',
            content: "Interview session complete! You've answered all the questions. You can now view your results."
          }]);
          set('results');
        }, 1500);
      }
    } catch (error) {
      console.error('Error in analyzeSentiment:', error);
      toast({
        title: 'Analysis Failed',
        description: 'There was an error analyzing your response. Please try again.',
        variant: 'destructive'
      });
      
      // Add a fallback message to avoid blocking the interview flow
      setMessages(prev => [...prev, {
        role: 'ai',
        content: "I couldn't properly analyze your response, but let's continue with the interview.",
        sentiment: {
          confidence: 50,
          clarity: 50,
          relevance: 50,
          overall: 50
        }
      }]);
      
      setIsAnalyzing(false);
      
      // Still move to next question or results
      if (currentQuestionIndex < questions.length - 1) {
        setTimeout(() => {
          setMessages(prev => [...prev, {
            role: 'ai',
            content: questions[currentQuestionIndex + 1].question
          }]);
        }, 1500);
      } else {
        setTimeout(() => {
          setMessages(prev => [...prev, {
            role: 'ai',
            content: "Interview session complete! You've answered all the questions. You can now view your results."
          }]);
          set('results');
        }, 1500);
      }
    }
  };

  return {
    isAnalyzing,
    setIsAnalyzing,
    analyzeSentiment
  };
};
