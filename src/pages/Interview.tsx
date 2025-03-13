
import { useState, useRef, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";
import { InterviewStep, InterviewType, Message } from '@/types/interview';
import InterviewLanding from '@/components/interview/InterviewLanding';
import InterviewSelection from '@/components/interview/InterviewSelection';
import InterviewSession from '@/components/interview/InterviewSession';
import InterviewResults from '@/components/interview/InterviewResults';

const interviewQuestionsByCategory = {
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

const Interview = () => {
  // State
  const [currentStep, setCurrentStep] = useState<InterviewStep>('landing');
  const [interviewType, setInterviewType] = useState<InterviewType>(null);
  const [difficulty, setDifficulty] = useState('basic');
  const [questionCount, setQuestionCount] = useState(5);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<string[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // Refs
  const recordingTimerRef = useRef<number | null>(null);

  // Effects
  useEffect(() => {
    if (currentStep === 'interview' && interviewType === 'general') {
      const selectedQuestions = [...interviewQuestionsByCategory.general[difficulty as keyof typeof interviewQuestionsByCategory.general]];
      setQuestions(selectedQuestions.slice(0, questionCount));
      setMessages([{
        role: 'ai',
        content: selectedQuestions[0]
      }]);
    }
  }, [currentStep, interviewType, difficulty, questionCount]);

  useEffect(() => {
    if (isRecording) {
      recordingTimerRef.current = window.setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= 30) {
            stopRecording();
            toast({
              title: "Recording limit reached",
              description: "The maximum recording time is 30 seconds"
            });
            return 30;
          }
          return prev + 1;
        });
      }, 1000);
    } else if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
    }
    
    return () => {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
    };
  }, [isRecording]);

  // Handlers
  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    setAudioUrl(null);
    toast({
      title: "Recording started",
      description: "Speak clearly into your microphone..."
    });
  };

  const stopRecording = () => {
    setIsRecording(false);
    setAudioUrl('mock-audio-url');
    toast({
      title: "Recording complete",
      description: "You can now listen to your answer or submit it for analysis."
    });
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setTimeout(() => {
        setIsPlaying(false);
      }, 3000);
    }
  };

  const submitRecording = () => {
    if (!audioUrl) return;
    
    const userResponse = "This is a simulated transcription of the recorded answer. In a real implementation, this would be the actual transcribed text from the audio recording.";
    
    setMessages(prev => [...prev, {
      role: 'user',
      content: userResponse
    }]);
    
    setIsAnalyzing(true);
    
    setTimeout(() => {
      analyzeSentiment(userResponse);
    }, 2000);
  };

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
        setCurrentQuestionIndex(prev => prev + 1);
        setMessages(prev => [...prev, {
          role: 'ai',
          content: questions[currentQuestionIndex + 1]
        }]);
        setAudioUrl(null);
      }, 1500);
    } else {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          role: 'ai',
          content: "Interview session complete! You've answered all the questions. You can now view your results."
        }]);
        setCurrentStep('results');
      }, 1500);
    }
  };

  const generateFeedback = (sentiment: Message["sentiment"]) => {
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

  const handleInterviewTypeSelect = (type: 'general' | 'narrowed') => {
    setInterviewType(type);
    setCurrentStep('selection');
  };

  const handleStartInterview = () => {
    setCurrentStep('interview');
  };

  const handleStartNewInterview = () => {
    setCurrentStep('landing');
    setInterviewType(null);
    setCurrentQuestionIndex(0);
    setQuestions([]);
    setMessages([]);
    setAudioUrl(null);
  };

  const clearRecording = () => {
    setAudioUrl(null);
  };

  // Render content based on current step
  const renderContent = () => {
    switch (currentStep) {
      case 'landing':
        return (
          <InterviewLanding onSelectInterviewType={handleInterviewTypeSelect} />
        );
      case 'selection':
        return (
          <InterviewSelection
            interviewType={interviewType}
            difficulty={difficulty}
            questionCount={questionCount}
            onSetDifficulty={setDifficulty}
            onSetQuestionCount={setQuestionCount}
            onStartInterview={handleStartInterview}
            onBack={() => setCurrentStep('landing')}
          />
        );
      case 'interview':
        return (
          <InterviewSession
            interviewType={interviewType}
            currentQuestionIndex={currentQuestionIndex}
            questions={questions}
            messages={messages}
            isRecording={isRecording}
            recordingTime={recordingTime}
            isPlaying={isPlaying}
            isAnalyzing={isAnalyzing}
            audioUrl={audioUrl}
            startRecording={startRecording}
            stopRecording={stopRecording}
            togglePlayback={togglePlayback}
            submitRecording={submitRecording}
            clearRecording={clearRecording}
            onGoBack={() => setCurrentStep('selection')}
          />
        );
      case 'results':
        return (
          <InterviewResults
            messages={messages}
            questions={questions}
            onStartNewInterview={handleStartNewInterview}
          />
        );
    }
  };

  return (
    <div className="container mx-auto px-4">
      {renderContent()}
    </div>
  );
};

export default Interview;
