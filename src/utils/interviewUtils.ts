
import { Message } from '@/types/interview';
import { toast } from "@/hooks/use-toast";

export const interviewQuestionsByCategory = {
  general: {
    basic: [
      "Tell me about yourself and your background.", 
      "What are your greatest professional strengths?", 
      "What do you consider to be your weaknesses?", 
      "Why are you interested in this position?", 
      "Where do you see yourself in five years?"
    ],
    intermediate: [
      "Describe a challenge you faced at work and how you overcame it.", 
      "Tell me about a time you demonstrated leadership skills.", 
      "How do you handle stress and pressure?", 
      "What is your greatest professional achievement?", 
      "How would your previous colleagues describe you?"
    ],
    advanced: [
      "Describe a situation where you had to make a difficult decision with limited information.", 
      "Tell me about a time when you had to adapt to a significant change at work.", 
      "How do you approach working with people who have different working styles than you?", 
      "Describe a time when you identified a problem before it became apparent to others.", 
      "Tell me about a time when you failed. How did you handle it?"
    ]
  }
};

export const startRecording = (setIsRecording: (value: boolean) => void, setRecordingTime: (value: number) => void, setAudioUrl: (value: string | null) => void) => {
  setIsRecording(true);
  setRecordingTime(0);
  setAudioUrl(null);
  toast({
    title: "Recording started",
    description: "Speak clearly into your microphone..."
  });
};

export const stopRecording = (setIsRecording: (value: boolean) => void, setAudioUrl: (value: string | null) => void) => {
  setIsRecording(false);
  setAudioUrl('mock-audio-url');
  toast({
    title: "Recording complete",
    description: "You can now listen to your answer or submit it for analysis."
  });
};

export const generateFeedback = (sentiment: Message["sentiment"]) => {
  if (!sentiment) return '';
  
  const confidenceFeedback = sentiment.confidence > 75 
    ? "Your confidence level is excellent! You speak with authority and conviction." 
    : "Try to improve your confidence by speaking with more conviction and avoiding hesitations.";
  
  const clarityFeedback = sentiment.clarity > 75 
    ? "Your answer was very clear and articulate." 
    : "Work on making your points more clearly and concisely.";
  
  const relevanceFeedback = sentiment.relevance > 75 
    ? "Your answer was highly relevant to the question." 
    : "Try to focus more directly on answering the specific question asked.";
  
  return `
    <h3>Feedback on your answer:</h3>
    <p><strong>Confidence:</strong> ${confidenceFeedback}</p>
    <p><strong>Clarity:</strong> ${clarityFeedback}</p>
    <p><strong>Relevance:</strong> ${relevanceFeedback}</p>
    <p><strong>Overall Impression:</strong> ${sentiment.overall > 75 ? "Your answer was strong and effective." : "There's room for improvement in your answer."}</p>
    <p><strong>Tips for improvement:</strong> Prepare concise stories using the STAR method (Situation, Task, Action, Result) for behavioral questions. Practice speaking at a measured pace and emphasize key points.</p>
  `;
};
