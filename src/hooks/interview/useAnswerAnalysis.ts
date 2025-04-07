
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
      // Validate questions array and currentQuestionIndex
      if (!Array.isArray(questions) || questions.length === 0) {
        throw new Error('No questions available');
      }
      
      // Get the current question with safe fallback
      const currentQuestion = questions[currentQuestionIndex] || {
        question: 'Unknown question',
        type: 'Behavioral' as const,
        keyPoints: []
      };
      
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
        
        analysisResult = data || { 
          sentiment: { confidence: 50, clarity: 50, relevance: 50, overall: 50 },
          feedback: "Unable to analyze response properly."
        };
      } else if (interviewType === 'narrowed' && jobFormData) {
        // Use the job-specific interview analysis function with job details
        const { data, error } = await supabase.functions.invoke('analyze-job-specific-interview', {
          body: {
            question: currentQuestion.question,
            transcription: response,
            jobDetails: {
              jobTitle: jobFormData.jobTitle || 'Unknown position',
              companyName: jobFormData.companyName || 'Unknown company',
              jobDescription: jobFormData.jobDescription || '',
              positionLevel: jobFormData.positionLevel || 'Entry level',
              keySkills: jobFormData.keySkills || ''
            }
          }
        });
        
        if (error) {
          throw new Error(`Error from analyze-job-specific-interview: ${error.message}`);
        }
        
        // Ensure we have a valid result structure even if the response is unexpected
        analysisResult = data || { 
          sentiment: { confidence: 50, clarity: 50, relevance: 50, jobFit: 50, overall: 50 },
          feedback: "Unable to analyze response properly."
        };
      } else {
        throw new Error('Invalid interview type or missing job details');
      }
      
      // Ensure sentiment data is always available with fallback values
      const sentiment = analysisResult?.sentiment || {
        confidence: 50,
        clarity: 50,
        relevance: 50,
        jobFit: 50,
        overall: 50
      };
      
      // Ensure feedback is always available
      const feedback = analysisResult?.feedback || 'No feedback available.';
      
      // Add AI message with feedback and sentiment scores
      setMessages(prev => [...prev, {
        role: 'ai',
        content: feedback,
        sentiment: sentiment
      }]);
      
      setIsAnalyzing(false);
      
      // Move to next question or results
      if (currentQuestionIndex < questions.length - 1) {
        setTimeout(() => {
          setMessages(prev => [...prev, {
            role: 'ai',
            content: questions[currentQuestionIndex + 1]?.question || "Next question"
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
          jobFit: 50,
          overall: 50
        }
      }]);
      
      setIsAnalyzing(false);
      
      // Still move to next question or results with safety checks
      if (currentQuestionIndex < (questions?.length || 0) - 1) {
        const nextQuestion = questions[currentQuestionIndex + 1]?.question || "Next question";
        setTimeout(() => {
          setMessages(prev => [...prev, {
            role: 'ai',
            content: nextQuestion
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
