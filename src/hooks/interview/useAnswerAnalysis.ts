
import { useState } from 'react';
import { Message, InterviewQuestion } from '@/types/interview';
import { toast } from "@/hooks/use-toast";
import { analyzeInterviewResponse, isOpenAIKeySet } from '@/utils/openaiUtils';

export const useAnswerAnalysis = (
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  currentQuestionIndex: number,
  questions: InterviewQuestion[],
  set: (step: 'results' | 'interview') => void
) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeSentiment = async (response: string) => {
    try {
      setIsAnalyzing(true);
      
      // Check if OpenAI API key is set
      if (!isOpenAIKeySet()) {
        toast({
          title: "API Key Required",
          description: "Please set your OpenAI API key in the settings",
          variant: "destructive"
        });
        return;
      }
      
      // Get the current question being answered
      const currentQuestion = questions[currentQuestionIndex];
      
      // Analyze the response using OpenAI
      const result = await analyzeInterviewResponse(response, currentQuestion);
      
      // Update the messages with the analysis result
      setMessages(prev => [...prev, {
        role: 'ai',
        content: result.feedback,
        sentiment: result.scores
      }]);
      
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
      console.error("Error analyzing response:", error);
      toast({
        title: "Analysis failed",
        description: error instanceof Error ? error.message : "We couldn't analyze your response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    isAnalyzing,
    setIsAnalyzing,
    analyzeSentiment
  };
};
