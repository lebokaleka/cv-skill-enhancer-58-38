
import { toast } from "@/hooks/use-toast";
import { InterviewQuestion, SentimentScore } from '@/types/interview';

// Function to get the OpenAI API key from localStorage
export const getOpenAIKey = (): string | null => {
  return localStorage.getItem('openai_api_key');
};

// Function to check if the OpenAI API key is set
export const isOpenAIKeySet = (): boolean => {
  const key = getOpenAIKey();
  return key !== null && key.trim() !== '';
};

// Interface for the OpenAI analysis result
export interface OpenAIAnalysisResult {
  scores: SentimentScore;
  feedback: string;
}

// Function to analyze an interview response using OpenAI
export const analyzeInterviewResponse = async (
  response: string,
  question: InterviewQuestion
): Promise<OpenAIAnalysisResult> => {
  const apiKey = getOpenAIKey();
  
  if (!apiKey) {
    throw new Error("OpenAI API key not found. Please set your API key in the settings.");
  }

  try {
    // Create a prompt for OpenAI based on the question and response
    const prompt = createAnalysisPrompt(question, response);
    
    // Make the API call to OpenAI
    const result = await callOpenAI(apiKey, prompt);
    return result;
  } catch (error) {
    console.error("Error analyzing interview response:", error);
    throw new Error("Failed to analyze your response. Please try again.");
  }
};

// Helper function to create a prompt for OpenAI
const createAnalysisPrompt = (question: InterviewQuestion, response: string): string => {
  return `
You are an expert interview coach analyzing a candidate's response to the following interview question:

Question: "${question.question}"
Question Type: ${question.type}
Key Points to Cover: ${question.keyPoints.join(', ')}

Candidate's Response:
"${response}"

Please analyze the response based on the following criteria:
1. Confidence (How confidently did the candidate communicate?)
2. Clarity (How clear and structured was the response?)
3. Relevance (How relevant was the response to the question asked?)
4. Content (Did the candidate cover the key points expected for this question type?)

For each criterion, provide a score between 0-100.

Also provide specific, actionable feedback on how the candidate can improve their response, including:
- What they did well
- What they missed or could improve
- Specific suggestions for enhancing their answer

Format your response in JSON as follows:
{
  "scores": {
    "confidence": <score>,
    "clarity": <score>,
    "relevance": <score>,
    "overall": <score>
  },
  "feedback": "<detailed HTML-formatted feedback with specific suggestions>"
}
`;
};

// Mock function to simulate OpenAI API call during development
// In production, this would be replaced with an actual API call
const callOpenAI = async (apiKey: string, prompt: string): Promise<OpenAIAnalysisResult> => {
  // For demonstration purposes, we'll use mock data
  // In a real application, this would call the OpenAI API
  
  console.log("API Key:", apiKey.substring(0, 5) + "...");
  console.log("Prompt:", prompt.substring(0, 100) + "...");
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Generate mock scores
  const scores = {
    confidence: Math.floor(Math.random() * 40) + 60,
    clarity: Math.floor(Math.random() * 40) + 60,
    relevance: Math.floor(Math.random() * 40) + 60,
    overall: Math.floor(Math.random() * 40) + 60
  };
  
  // Generate contextual feedback
  let feedback = `<p><strong>Feedback on your answer:</strong></p>`;
  
  feedback += `<p>Your response shows ${scores.overall > 75 ? 'good' : 'some'} understanding of the question. 
    ${scores.clarity < 70 ? 'Your answer could be more structured and clear.' : 'Your explanation was well-structured.'}
    ${scores.relevance < 70 ? 'Try to focus more directly on addressing the question asked.' : 'Your answer addressed the question effectively.'}
    </p>`;
  
  feedback += `<p><strong>What you did well:</strong></p><ul>`;
  feedback += `<li>You demonstrated confidence in your knowledge.</li>`;
  feedback += `<li>Your response was concise and to the point.</li>`;
  feedback += `</ul>`;
  
  feedback += `<p><strong>Areas for improvement:</strong></p><ul>`;
  if (scores.confidence < 75) {
    feedback += `<li>Work on your delivery to sound more confident.</li>`;
  }
  if (scores.clarity < 75) {
    feedback += `<li>Structure your answer with a clear beginning, middle, and end.</li>`;
  }
  if (scores.relevance < 75) {
    feedback += `<li>Make sure to address all aspects of the question directly.</li>`;
  }
  feedback += `<li>Consider using the STAR method for behavioral questions (Situation, Task, Action, Result).</li>`;
  feedback += `</ul>`;
  
  return {
    scores,
    feedback
  };
};

// TODO: In a production environment, replace the mock implementation with a real OpenAI API call
// Example of how to implement the real API call:
/*
const callOpenAI = async (apiKey: string, prompt: string): Promise<OpenAIAnalysisResult> => {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 800
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`OpenAI API error: ${error.message || response.statusText}`);
  }

  const data = await response.json();
  const content = data.choices[0].message.content;
  
  try {
    return JSON.parse(content);
  } catch (error) {
    throw new Error("Failed to parse the OpenAI response");
  }
};
*/
