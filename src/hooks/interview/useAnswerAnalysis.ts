
import { useState } from 'react';
import { Message } from '@/types/interview';
import { generateFeedback } from '@/utils/interviewUtils';

export const useAnswerAnalysis = (
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  currentQuestionIndex: number,
  questions: string[],
  set: (step: 'results' | 'interview') => void
) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeSentiment = (response: string) => {
    // In a real implementation, this would call an API to analyze the sentiment
    const sentiment = {
      confidence: Math.floor(Math.random() * 40) + 60,
      clarity: Math.floor(Math.random() * 40) + 60,
      relevance: Math.floor(Math.random() * 40) + 60,
      overall: Math.floor(Math.random() * 40) + 60
    };
    
    const feedback = generateFeedback(sentiment);
    
    setMessages(prev => [...prev, {
      role: 'ai',
      content: feedback,
      sentiment: sentiment
    }]);
    
    setIsAnalyzing(false);
    
    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          role: 'ai',
          content: questions[currentQuestionIndex + 1]
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
  };

  return {
    isAnalyzing,
    setIsAnalyzing,
    analyzeSentiment
  };
};
