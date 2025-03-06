
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Mic, Send, RefreshCw, ArrowLeft } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

// Mock interview questions
const interviewQuestions = [
  "Tell me about yourself and your background.",
  "What are your greatest professional strengths?",
  "What do you consider to be your weaknesses?",
  "Why are you interested in this position?",
  "Where do you see yourself in five years?",
  "Describe a challenge you faced at work and how you overcame it.",
  "Why should we hire you?",
  "What are your salary expectations?",
  "Do you have any questions for us?",
];

type SentimentScore = {
  confidence: number;
  clarity: number;
  relevance: number;
  overall: number;
};

type Message = {
  role: 'user' | 'ai';
  content: string;
  sentiment?: SentimentScore;
};

const Interview = () => {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', content: interviewQuestions[0] }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Mock function for audio recording (would be replaced with actual recording logic)
  const toggleRecording = () => {
    if (isRecording) {
      // Simulate stopping recording and processing response
      setIsRecording(false);
      setIsAnalyzing(true);
      
      // Simulate recording analysis with a delay
      setTimeout(() => {
        // Add the "recorded" response to messages
        const userResponse = "This is a simulated response that would be replaced with actual transcribed audio in a real implementation.";
        setMessages(prev => [...prev, { role: 'user', content: userResponse }]);
        
        // Simulate AI analysis
        setTimeout(() => {
          analyzeSentiment(userResponse);
        }, 1000);
      }, 1500);
    } else {
      // Start recording
      setIsRecording(true);
      toast({
        title: "Recording started",
        description: "Speak clearly into your microphone...",
      });
    }
  };

  // Simulate sentiment analysis (would be replaced with actual AI analysis)
  const analyzeSentiment = (response: string) => {
    // Simulate AI analyzing the response
    setTimeout(() => {
      const sentiment: SentimentScore = {
        confidence: Math.floor(Math.random() * 40) + 60, // 60-100
        clarity: Math.floor(Math.random() * 40) + 60,    // 60-100
        relevance: Math.floor(Math.random() * 40) + 60,  // 60-100
        overall: Math.floor(Math.random() * 40) + 60,    // 60-100
      };
      
      // Add AI feedback based on "analysis"
      const feedback = generateFeedback(sentiment);
      
      setMessages(prev => [
        ...prev,
        { 
          role: 'ai', 
          content: feedback,
          sentiment: sentiment
        }
      ]);
      
      setIsAnalyzing(false);
      
      // Move to next question if not at the end
      if (currentQuestionIndex < interviewQuestions.length - 1) {
        setTimeout(() => {
          setCurrentQuestionIndex(prev => prev + 1);
          setMessages(prev => [
            ...prev,
            { role: 'ai', content: interviewQuestions[currentQuestionIndex + 1] }
          ]);
        }, 1500);
      } else {
        // Interview complete
        setTimeout(() => {
          setMessages(prev => [
            ...prev,
            { 
              role: 'ai', 
              content: "Thank you for completing this mock interview! You can review your performance above or start a new interview session."
            }
          ]);
        }, 1500);
      }
    }, 2000);
  };
  
  // Generate feedback based on sentiment scores
  const generateFeedback = (sentiment: SentimentScore) => {
    const feedbackPoints = [];
    
    if (sentiment.confidence < 70) {
      feedbackPoints.push("Try to speak with more confidence by maintaining a steady tone and pace.");
    } else {
      feedbackPoints.push("Your confidence comes across well in your response.");
    }
    
    if (sentiment.clarity < 70) {
      feedbackPoints.push("Consider structuring your answers more clearly with specific examples.");
    } else {
      feedbackPoints.push("Your answer was clearly articulated and easy to follow.");
    }
    
    if (sentiment.relevance < 70) {
      feedbackPoints.push("Try to focus more directly on addressing the specific question asked.");
    } else {
      feedbackPoints.push("Your response was relevant and addressed the question well.");
    }
    
    // Add overall assessment
    if (sentiment.overall < 70) {
      feedbackPoints.push("Overall, there's room for improvement in how you structure and deliver your answers.");
    } else if (sentiment.overall < 85) {
      feedbackPoints.push("Overall, this was a solid response with some minor areas for improvement.");
    } else {
      feedbackPoints.push("Overall, excellent response that would likely impress an interviewer.");
    }
    
    return feedbackPoints.join(" ");
  };

  // Handle text input submission
  const handleSubmitText = () => {
    if (!userInput.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: userInput }]);
    setUserInput('');
    setIsAnalyzing(true);
    
    // Simulate analysis delay
    setTimeout(() => {
      analyzeSentiment(userInput);
    }, 2000);
  };

  // Reset the interview
  const resetInterview = () => {
    setCurrentQuestionIndex(0);
    setMessages([{ role: 'ai', content: interviewQuestions[0] }]);
    setIsAnalyzing(false);
    setIsRecording(false);
    
    toast({
      title: "Interview Reset",
      description: "Starting a new interview session.",
    });
  };

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="min-h-screen bg-background">
      <div className="app-container py-12">
        <Button 
          variant="ghost" 
          className="mb-6" 
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="mr-2" size={16} />
          Back to Home
        </Button>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main interview panel */}
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Mock Interview</CardTitle>
              <CardDescription>
                Practice your interview skills with our AI interviewer. Respond via text or voice to receive instant feedback.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div 
                ref={chatContainerRef} 
                className="h-[500px] overflow-y-auto mb-6 p-4 border rounded-lg"
              >
                {messages.map((message, index) => (
                  <div key={index} className="mb-6">
                    <div className={`flex ${message.role === 'ai' ? 'justify-start' : 'justify-end'}`}>
                      <div 
                        className={`max-w-[85%] p-4 rounded-lg ${
                          message.role === 'ai' 
                            ? 'bg-secondary/30 text-foreground' 
                            : 'bg-primary/10 text-foreground'
                        }`}
                      >
                        <div className="mb-1">
                          <Badge variant={message.role === 'ai' ? 'outline' : 'secondary'}>
                            {message.role === 'ai' ? 'Interviewer' : 'You'}
                          </Badge>
                        </div>
                        <p>{message.content}</p>
                        
                        {message.sentiment && (
                          <div className="mt-4">
                            <Separator className="my-2" />
                            <p className="text-sm font-medium mb-2">Response Analysis:</p>
                            <div className="space-y-2">
                              <div>
                                <div className="flex justify-between text-xs mb-1">
                                  <span>Confidence</span>
                                  <span>{message.sentiment.confidence}%</span>
                                </div>
                                <Progress value={message.sentiment.confidence} className="h-2" />
                              </div>
                              <div>
                                <div className="flex justify-between text-xs mb-1">
                                  <span>Clarity</span>
                                  <span>{message.sentiment.clarity}%</span>
                                </div>
                                <Progress value={message.sentiment.clarity} className="h-2" />
                              </div>
                              <div>
                                <div className="flex justify-between text-xs mb-1">
                                  <span>Relevance</span>
                                  <span>{message.sentiment.relevance}%</span>
                                </div>
                                <Progress value={message.sentiment.relevance} className="h-2" />
                              </div>
                              <div>
                                <div className="flex justify-between text-xs mb-1">
                                  <span>Overall</span>
                                  <span>{message.sentiment.overall}%</span>
                                </div>
                                <Progress value={message.sentiment.overall} className="h-2" />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {isAnalyzing && (
                  <div className="flex justify-start">
                    <div className="bg-secondary/30 p-4 rounded-lg max-w-[85%]">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-primary rounded-full animate-pulse"></div>
                        <div className="h-2 w-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                        <div className="h-2 w-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                        <span className="text-sm text-muted-foreground">Analyzing your response...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Type your response here..."
                  className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  disabled={isAnalyzing || isRecording}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmitText()}
                />
                <Button
                  onClick={handleSubmitText}
                  disabled={!userInput.trim() || isAnalyzing || isRecording}
                >
                  <Send size={16} />
                </Button>
                <Button
                  variant={isRecording ? "destructive" : "outline"}
                  className={isRecording ? "animate-pulse" : ""}
                  onClick={toggleRecording}
                  disabled={isAnalyzing}
                >
                  <Mic size={16} className="mr-1" />
                  {isRecording ? "Stop" : "Record"}
                </Button>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Question {currentQuestionIndex + 1} of {interviewQuestions.length}
              </div>
              <Button variant="outline" onClick={resetInterview}>
                <RefreshCw size={16} className="mr-2" />
                Reset Interview
              </Button>
            </CardFooter>
          </Card>
          
          {/* Tips panel */}
          <div className="w-full lg:w-80">
            <Card>
              <CardHeader>
                <CardTitle>Interview Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex gap-2 items-start">
                    <Badge variant="outline" className="mt-0.5">01</Badge>
                    <p>Use the STAR method (Situation, Task, Action, Result) for behavioral questions.</p>
                  </li>
                  <li className="flex gap-2 items-start">
                    <Badge variant="outline" className="mt-0.5">02</Badge>
                    <p>Speak clearly and at a moderate pace to ensure the AI can accurately transcribe your responses.</p>
                  </li>
                  <li className="flex gap-2 items-start">
                    <Badge variant="outline" className="mt-0.5">03</Badge>
                    <p>Provide specific examples from your experience to support your answers.</p>
                  </li>
                  <li className="flex gap-2 items-start">
                    <Badge variant="outline" className="mt-0.5">04</Badge>
                    <p>Always relate your answers back to the job you're applying for when possible.</p>
                  </li>
                  <li className="flex gap-2 items-start">
                    <Badge variant="outline" className="mt-0.5">05</Badge>
                    <p>Practice confident body language even though this is a simulated interview.</p>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;
