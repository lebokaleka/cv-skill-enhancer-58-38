
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
  
  // Calculate overall percentage
  const overallScore = sentiment.overall;
  
  // Generate personalized feedback based on simulated analysis
  const strengthPoints = [
    "You provided a clear structure in your answer",
    "Your examples were relevant to the question",
    "You demonstrated good problem-solving skills",
    "You connected your experience to the specific question",
    "You maintained good pacing throughout your answer"
  ];
  
  const improvementPoints = [
    "Try to be more concise while still being thorough",
    "Incorporate more specific examples from your experience",
    "Structure your answer using the STAR method (Situation, Task, Action, Result)",
    "Make sure to address all parts of the question directly",
    "Practice reducing filler words to sound more confident"
  ];
  
  // Select 2-3 random strength points
  const randomStrengths = [];
  while (randomStrengths.length < Math.min(3, Math.ceil(overallScore/30))) {
    const randomIndex = Math.floor(Math.random() * strengthPoints.length);
    if (!randomStrengths.includes(strengthPoints[randomIndex])) {
      randomStrengths.push(strengthPoints[randomIndex]);
    }
  }
  
  // Select 2-3 random improvement points
  const randomImprovements = [];
  while (randomImprovements.length < Math.min(3, Math.ceil((100-overallScore)/30))) {
    const randomIndex = Math.floor(Math.random() * improvementPoints.length);
    if (!randomImprovements.includes(improvementPoints[randomIndex])) {
      randomImprovements.push(improvementPoints[randomIndex]);
    }
  }
  
  // Create the HTML feedback content
  return `
    <h3>Answer Analysis</h3>
    <p>Overall Score: <strong>${overallScore}%</strong></p>
    
    <h4>Strengths:</h4>
    <ul>
      ${randomStrengths.map(point => `<li>${point}</li>`).join('')}
    </ul>
    
    <h4>Areas for Improvement:</h4>
    <ul>
      ${randomImprovements.map(point => `<li>${point}</li>`).join('')}
    </ul>
    
    <p><strong>Tips:</strong> When answering interview questions, focus on being specific rather than general. Use concrete examples from your experience to illustrate your points. Remember to highlight both the actions you took and the results you achieved.</p>
  `;
};
