
import { useState } from 'react';
import { Message, InterviewQuestion } from '@/types/interview';
import { toast } from "@/hooks/use-toast";

// Define types for OpenAI responses
interface OpenAIAnalysisResponse {
  feedback: string;
  sentiment: {
    confidence: number;
    clarity: number;
    relevance: number;
    overall: number;
  };
}

export const useAnswerAnalysis = (
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  currentQuestionIndex: number,
  questions: InterviewQuestion[],
  set: (step: 'results' | 'interview') => void
) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(localStorage.getItem('openai_api_key'));

  const analyzeSentiment = async (response: string) => {
    if (!apiKey) {
      // If no API key is available, show a toast and use the mock analysis
      toast({
        title: "Missing OpenAI API Key",
        description: "Please add your OpenAI API key in settings to get real-time analysis.",
        variant: "destructive"
      });
      return useMockAnalysis(response);
    }
    
    try {
      setIsAnalyzing(true);
      
      // Get the current question text
      const currentQuestion = questions[currentQuestionIndex].question;
      
      // Prepare the analysis request
      const analysisResponse = await analyzeWithOpenAI(currentQuestion, response, apiKey);
      
      setMessages(prev => [...prev, {
        role: 'ai',
        content: analysisResponse.feedback,
        sentiment: analysisResponse.sentiment
      }]);
      
      setIsAnalyzing(false);
      
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
        description: "There was an error analyzing your response. Using simulated analysis instead.",
        variant: "destructive"
      });
      useMockAnalysis(response);
    }
  };

  // Function to make API call to OpenAI
  const analyzeWithOpenAI = async (
    question: string, 
    userResponse: string, 
    apiKey: string
  ): Promise<OpenAIAnalysisResponse> => {
    const prompt = `
You are an expert interview coach analyzing a candidate's response to an interview question.

Interview Question: "${question}"

Candidate's Response: "${userResponse}"

Please analyze the response and provide:
1. Constructive feedback on the answer's strengths and weaknesses
2. Specific suggestions for improvement (what was missing or could be stronger)
3. A better way to structure or phrase key points
4. Assessment scores (0-100) for:
   - Confidence: How assured and authoritative the response sounds
   - Clarity: How well-structured and easy to follow the response is
   - Relevance: How directly the response addresses the question asked
   - Overall: A general evaluation of the response quality

Format your response with HTML tags for better readability. Use <p>, <ul>, <li>, <strong>, <em> as needed.
Include the assessment scores at the end.
`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are an expert interview coach who provides constructive feedback."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Extract scores from response
    const confidenceMatch = content.match(/Confidence:\s*(\d+)/i);
    const clarityMatch = content.match(/Clarity:\s*(\d+)/i);
    const relevanceMatch = content.match(/Relevance:\s*(\d+)/i);
    const overallMatch = content.match(/Overall:\s*(\d+)/i);
    
    const confidence = confidenceMatch ? parseInt(confidenceMatch[1]) : 70;
    const clarity = clarityMatch ? parseInt(clarityMatch[1]) : 70;
    const relevance = relevanceMatch ? parseInt(relevanceMatch[1]) : 70;
    const overall = overallMatch ? parseInt(overallMatch[1]) : 70;
    
    return {
      feedback: content,
      sentiment: {
        confidence,
        clarity,
        relevance,
        overall
      }
    };
  };

  // Fallback mock analysis function
  const useMockAnalysis = (response: string) => {
    // This is the original mock implementation
    const sentiment = {
      confidence: Math.floor(Math.random() * 40) + 60,
      clarity: Math.floor(Math.random() * 40) + 60,
      relevance: Math.floor(Math.random() * 40) + 60,
      overall: Math.floor(Math.random() * 40) + 60
    };
    
    const feedback = `
      <p>Thanks for your response. Here's some feedback to help you improve:</p>
      <p><strong>Strengths:</strong></p>
      <ul>
        <li>You provided a clear structure in your answer</li>
        <li>You included some relevant examples</li>
      </ul>
      <p><strong>Areas for improvement:</strong></p>
      <ul>
        <li>Try to be more specific with your examples</li>
        <li>Consider using the STAR method (Situation, Task, Action, Result) for behavioral questions</li>
        <li>Quantify your achievements when possible</li>
      </ul>
      <p>Overall score: ${sentiment.overall}%</p>
    `;
    
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
  };

  return {
    isAnalyzing,
    setIsAnalyzing,
    analyzeSentiment,
    setApiKey
  };
};
