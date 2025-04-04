
import { useState, useCallback } from 'react';
import { Message, InterviewQuestion } from '@/types/interview';
import { toast } from "@/hooks/use-toast";

export const useAnswerAnalysis = (
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  currentQuestionIndex: number,
  questions: InterviewQuestion[],
  setCurrentStep: (step: string) => void
) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Function to analyze the user's response
  const analyzeSentiment = useCallback(async (userResponse: string) => {
    try {
      if (!userResponse) {
        throw new Error('No response to analyze');
      }

      setIsAnalyzing(true);

      // Get the current question
      const currentQuestion = questions[currentQuestionIndex];
      if (!currentQuestion) {
        throw new Error('No question found');
      }

      // Call the edge function to analyze the response
      const response = await fetch('https://tpsbdccngrhhdoekzasp.supabase.co/functions/v1/analyze-interview-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transcription: userResponse,
          question: currentQuestion.question,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Analysis failed: ${errorText}`);
      }

      const analysisResult = await response.json();

      // Add the analysis result as an AI message
      const feedbackHtml = `
        <div>
          <p>${analysisResult.feedback}</p>
          <div class="mt-3 pt-3 border-t border-gray-200">
            <div class="grid grid-cols-2 gap-2 text-sm">
              <div>Confidence: ${analysisResult.sentiment.confidence}%</div>
              <div>Clarity: ${analysisResult.sentiment.clarity}%</div>
              <div>Relevance: ${analysisResult.sentiment.relevance}%</div>
              <div>Overall: ${analysisResult.sentiment.overall}%</div>
            </div>
          </div>
        </div>
      `;

      setMessages(prev => [
        ...prev,
        {
          role: 'ai',
          content: feedbackHtml,
          sentiment: analysisResult.sentiment
        }
      ]);

      // Move to the next question if available
      if (currentQuestionIndex < questions.length - 1) {
        const nextQuestion = questions[currentQuestionIndex + 1];
        setMessages(prev => [
          ...prev,
          {
            role: 'ai',
            content: nextQuestion.question
          }
        ]);
      } else {
        // If this was the last question, move to results screen
        setTimeout(() => {
          setCurrentStep('results');
        }, 1500);
      }

    } catch (error) {
      console.error('Error analyzing response:', error);
      toast({
        title: 'Analysis Failed',
        description: error.message || 'Failed to analyze your response',
        variant: 'destructive'
      });
      
      // Add a generic feedback message in case of error
      setMessages(prev => [
        ...prev,
        {
          role: 'ai',
          content: 'I was unable to analyze your response. Please try again.',
        }
      ]);
      
    } finally {
      setIsAnalyzing(false);
    }
  }, [currentQuestionIndex, questions, setCurrentStep, setMessages]);

  return {
    isAnalyzing,
    setIsAnalyzing,
    analyzeSentiment
  };
};
