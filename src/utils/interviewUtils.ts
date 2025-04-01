
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
  
  // Define possible feedback components based on response analysis
  const contentFeedback = [
    "Your answer lacks specific examples. Try to include concrete situations from your experience.",
    "You provided good examples, but could elaborate more on the results achieved.",
    "Consider structuring your answer using the STAR method for more clarity.",
    "Your answer addresses the question well, but could be more concise.",
    "Try to connect your experience more directly to the requirements of the position.",
    "Your introduction was strong, but your conclusion could be more impactful.",
    "Consider quantifying your achievements with specific metrics or percentages.",
    "You covered the main points well, but missed an opportunity to highlight your unique skills.",
    "Focus more on what you learned from challenging situations rather than just describing them.",
    "Try to demonstrate more self-awareness when discussing your weaknesses."
  ];
  
  const deliveryFeedback = [
    "Practice reducing filler words (like 'um', 'uh', 'like') to sound more confident.",
    "Try varying your tone to emphasize key points in your answer.",
    "Consider slowing down your pace slightly for better clarity.",
    "Pausing briefly between main points can help the interviewer absorb your information better.",
    "Work on maintaining a conversational tone rather than sounding rehearsed.",
    "Your enthusiasm comes through well - maintain this energy throughout all answers.",
    "Practice speaking with more confidence, especially when discussing your achievements.",
    "Consider using more professional vocabulary in your responses.",
    "Try to maintain a positive framing even when discussing challenges."
  ];
  
  // Determine feedback based on score ranges
  let strengthPoints: string[] = [];
  let improvementPoints: string[] = [];
  
  // Select feedback points based on simulated content analysis
  // In a real implementation, this would be based on actual content analysis
  
  // For strengths
  if (overallScore > 70) {
    strengthPoints = [
      "You effectively structured your answer with a clear beginning, middle, and end.",
      "You provided relevant examples that illustrated your skills well.",
      "Your answer demonstrated good self-awareness and authenticity."
    ];
  } else if (overallScore > 50) {
    strengthPoints = [
      "You addressed the key points the question was asking for.",
      "You shared some relevant background information that supports your qualifications."
    ];
  } else {
    strengthPoints = [
      "You maintained a professional tone throughout your answer.",
      "You showed willingness to engage with the question."
    ];
  }
  
  // For improvement areas
  // Select 2-3 random improvement points
  const shuffledContentFeedback = [...contentFeedback].sort(() => 0.5 - Math.random());
  const shuffledDeliveryFeedback = [...deliveryFeedback].sort(() => 0.5 - Math.random());
  
  // Lower scores get more improvement points
  const numImprovements = overallScore > 80 ? 1 : overallScore > 60 ? 2 : 3;
  
  // Mix content and delivery feedback
  improvementPoints = [
    ...shuffledContentFeedback.slice(0, Math.ceil(numImprovements/2)),
    ...shuffledDeliveryFeedback.slice(0, Math.floor(numImprovements/2))
  ];
  
  // Add tailored advice based on score
  let tailoredAdvice = "";
  if (overallScore > 80) {
    tailoredAdvice = "Your answer was strong overall. For even more impact, consider practicing responses to unexpected follow-up questions.";
  } else if (overallScore > 60) {
    tailoredAdvice = "With some refinement in the areas mentioned, your answer will be more impactful and memorable to interviewers.";
  } else {
    tailoredAdvice = "Focus on preparing more thoroughly for common interview questions by writing out key points and practicing your delivery aloud.";
  }
  
  // Create the HTML feedback content
  return `
    <h3>Feedback on your answer:</h3>
    <p><strong>Overall Score:</strong> ${overallScore}%</p>
    
    <h4>What you did well:</h4>
    <ul>
      ${strengthPoints.map(point => `<li>${point}</li>`).join('')}
    </ul>
    
    <h4>Areas for improvement:</h4>
    <ul>
      ${improvementPoints.map(point => `<li>${point}</li>`).join('')}
    </ul>
    
    <p><strong>${tailoredAdvice}</strong></p>
    
    <p class="text-sm mt-4">Try using the STAR method in your answers: <strong>S</strong>ituation, <strong>T</strong>ask, <strong>A</strong>ction, <strong>R</strong>esult. This structure helps you deliver clear, compelling stories about your experience.</p>
  `;
};

