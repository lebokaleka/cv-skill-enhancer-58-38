
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Mic, Play, RefreshCw, ArrowLeft, ArrowRight, Upload, ThumbsUp, BrainCircuit, Save, Rotate, Radio } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import Image from "@/components/ui/image";

// Mock interview questions by category 
const interviewQuestionsByCategory = {
  general: {
    basic: [
      "Tell me about yourself and your background.",
      "What are your greatest professional strengths?",
      "What do you consider to be your weaknesses?",
      "Why are you interested in this position?",
      "Where do you see yourself in five years?",
    ],
    intermediate: [
      "Describe a challenge you faced at work and how you overcame it.",
      "Tell me about a time you demonstrated leadership skills.",
      "How do you handle stress and pressure?",
      "What is your greatest professional achievement?",
      "How would your previous colleagues describe you?",
    ],
    advanced: [
      "Describe a situation where you had to make a difficult decision with limited information.",
      "Tell me about a time when you had to adapt to a significant change at work.",
      "How do you approach working with people who have different working styles than you?",
      "Describe a time when you identified a problem before it became apparent to others.",
      "Tell me about a time when you failed. How did you handle it?",
    ]
  }
};

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

type FormData = {
  jobTitle: string;
  companyName: string;
  jobDescription: string;
  positionLevel: string;
  keySkills: string;
};

const Interview = () => {
  const navigate = useNavigate();
  const form = useForm<FormData>();
  
  // Step navigation
  const [currentStep, setCurrentStep] = useState<'landing' | 'selection' | 'interview' | 'results'>('landing');
  const [interviewType, setInterviewType] = useState<'general' | 'narrowed' | null>(null);
  
  // Interview configuration
  const [difficulty, setDifficulty] = useState('basic');
  const [questionCount, setQuestionCount] = useState(5);
  
  // Interview state
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<string[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const recordingTimerRef = useRef<number | null>(null);

  // Set up questions based on selections
  useEffect(() => {
    if (currentStep === 'interview' && interviewType === 'general') {
      const selectedQuestions = [...interviewQuestionsByCategory.general[difficulty as keyof typeof interviewQuestionsByCategory.general]];
      // Limit to the selected question count
      setQuestions(selectedQuestions.slice(0, questionCount));
      setMessages([{ role: 'ai', content: selectedQuestions[0] }]);
    }
  }, [currentStep, interviewType, difficulty, questionCount]);

  // Recording timer
  useEffect(() => {
    if (isRecording) {
      recordingTimerRef.current = window.setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= 30) {
            stopRecording();
            toast({
              title: "Recording limit reached",
              description: "The maximum recording time is 30 seconds",
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

  // Auto-scroll chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Mock function for recording start
  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    setAudioUrl(null);
    toast({
      title: "Recording started",
      description: "Speak clearly into your microphone...",
    });
  };

  // Mock function for recording stop
  const stopRecording = () => {
    setIsRecording(false);
    // Simulate creating an audio url for playback
    setAudioUrl('mock-audio-url');
    toast({
      title: "Recording complete",
      description: "You can now listen to your answer or submit it for analysis.",
    });
  };

  // Mock function for audio playback
  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setTimeout(() => {
        setIsPlaying(false);
      }, 3000); // Simulate audio duration
    }
  };

  // Handle submitting the recorded answer
  const submitRecording = () => {
    if (!audioUrl) return;
    
    // Add user message with simulated transcription
    const userResponse = "This is a simulated transcription of the recorded answer. In a real implementation, this would be the actual transcribed text from the audio recording.";
    setMessages(prev => [...prev, { role: 'user', content: userResponse }]);
    
    // Simulate AI analysis
    setIsAnalyzing(true);
    setTimeout(() => {
      analyzeSentiment(userResponse);
    }, 2000);
  };

  // Simulate sentiment analysis
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
      if (currentQuestionIndex < questions.length - 1) {
        setTimeout(() => {
          setCurrentQuestionIndex(prev => prev + 1);
          setMessages(prev => [
            ...prev,
            { role: 'ai', content: questions[currentQuestionIndex + 1] }
          ]);
          setAudioUrl(null);
        }, 1500);
      } else {
        // Interview complete
        setTimeout(() => {
          setMessages(prev => [
            ...prev,
            { 
              role: 'ai', 
              content: "You've completed all the interview questions! You can review your performance above or start a new interview session."
            }
          ]);
          setCurrentStep('results');
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
    if (interviewType === 'general') {
      setMessages([{ role: 'ai', content: questions[0] }]);
    } else {
      setMessages([]);
    }
    setIsAnalyzing(false);
    setIsRecording(false);
    setIsPlaying(false);
    setAudioUrl(null);
    setCurrentStep('landing');
    
    toast({
      title: "Interview Reset",
      description: "Starting a new interview session.",
    });
  };

  // Start narrowed interview with job info
  const onNarrowedSubmit = (data: FormData) => {
    // In a real implementation, you would send this data to an API to generate specific questions
    toast({
      title: "Generating tailored questions",
      description: "Creating interview questions based on job details...",
    });
    
    setTimeout(() => {
      // Simulate API response with generated questions
      const generatedQuestions = [
        `As a ${data.positionLevel} ${data.jobTitle} at ${data.companyName}, how would you handle a situation where a project deadline is at risk?`,
        `Can you describe your experience with ${data.keySkills.split(',')[0]}?`,
        `What makes you a good fit for the ${data.jobTitle} role at ${data.companyName}?`,
        `How do you prioritize tasks when working on multiple projects simultaneously?`,
        `Based on the job description, how would you improve the current processes at ${data.companyName}?`
      ];
      
      setQuestions(generatedQuestions.slice(0, questionCount));
      setMessages([{ role: 'ai', content: generatedQuestions[0] }]);
      setCurrentStep('interview');
    }, 3000);
  };

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
        
        {currentStep === 'landing' && (
          <div className="space-y-8">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold tracking-tight">AI Interview Coach</h1>
              <p className="text-lg text-muted-foreground">
                Practice your interview skills with our AI-powered coach. Get real-time feedback on your answers and improve your performance.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="relative overflow-hidden hover:shadow-lg transition-all transform hover:-translate-y-1 cursor-pointer" onClick={() => {
                setInterviewType('general');
                setCurrentStep('selection');
              }}>
                <div className="absolute top-2 right-2">
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                    Recommended
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ThumbsUp className="h-5 w-5 text-primary" />
                    General Interview Questions
                  </CardTitle>
                  <CardDescription>
                    Practice with common interview questions that apply to most job positions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-40 bg-secondary/10 rounded-md overflow-hidden mb-4 flex items-center justify-center">
                    <Image 
                      src="/placeholder.svg" 
                      alt="General Interview" 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 text-primary flex-shrink-0">✓</div>
                      <span>Standard questions used in most interviews</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 text-primary flex-shrink-0">✓</div>
                      <span>Choose from different difficulty levels</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 text-primary flex-shrink-0">✓</div>
                      <span>Get feedback on your speaking style and answers</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="relative overflow-hidden hover:shadow-lg transition-all transform hover:-translate-y-1 cursor-pointer" onClick={() => {
                setInterviewType('narrowed');
                setCurrentStep('selection');
              }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BrainCircuit className="h-5 w-5 text-primary" />
                    Narrowed Interview Questions
                  </CardTitle>
                  <CardDescription>
                    Get questions tailored to a specific job position or industry
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-40 bg-secondary/10 rounded-md overflow-hidden mb-4 flex items-center justify-center">
                    <Image 
                      src="/placeholder.svg" 
                      alt="Narrowed Interview" 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 text-primary flex-shrink-0">✓</div>
                      <span>Questions specific to your desired job</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 text-primary flex-shrink-0">✓</div>
                      <span>Upload job descriptions for more relevance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 text-primary flex-shrink-0">✓</div>
                      <span>Targeted feedback based on industry standards</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
        
        {currentStep === 'selection' && (
          <div className="max-w-3xl mx-auto">
            <Button 
              variant="ghost" 
              className="mb-6" 
              onClick={() => setCurrentStep('landing')}
            >
              <ArrowLeft className="mr-2" size={16} />
              Back to Options
            </Button>
            
            <Card>
              <CardHeader>
                <CardTitle>
                  {interviewType === 'general' 
                    ? 'Configure General Interview' 
                    : 'Configure Job-Specific Interview'}
                </CardTitle>
                <CardDescription>
                  {interviewType === 'general'
                    ? 'Select the difficulty and number of questions'
                    : 'Enter details about the job position to generate targeted questions'}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {interviewType === 'general' ? (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="difficulty">Difficulty Level</Label>
                      <div className="grid grid-cols-3 gap-4">
                        <Button 
                          type="button"
                          variant={difficulty === 'basic' ? 'default' : 'outline'}
                          className="w-full"
                          onClick={() => setDifficulty('basic')}
                        >
                          Basic
                        </Button>
                        <Button 
                          type="button"
                          variant={difficulty === 'intermediate' ? 'default' : 'outline'}
                          className="w-full"
                          onClick={() => setDifficulty('intermediate')}
                        >
                          Intermediate
                        </Button>
                        <Button 
                          type="button"
                          variant={difficulty === 'advanced' ? 'default' : 'outline'}
                          className="w-full"
                          onClick={() => setDifficulty('advanced')}
                        >
                          Advanced
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="questionCount">Number of Questions</Label>
                      <div className="grid grid-cols-3 gap-4">
                        <Button 
                          type="button"
                          variant={questionCount === 5 ? 'default' : 'outline'}
                          className="w-full"
                          onClick={() => setQuestionCount(5)}
                        >
                          5 Questions
                        </Button>
                        <Button 
                          type="button"
                          variant={questionCount === 10 ? 'default' : 'outline'}
                          className="w-full"
                          onClick={() => setQuestionCount(10)}
                        >
                          10 Questions
                        </Button>
                        <Button 
                          type="button"
                          variant={questionCount === 15 ? 'default' : 'outline'}
                          className="w-full"
                          onClick={() => setQuestionCount(15)}
                        >
                          15 Questions
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={form.handleSubmit(onNarrowedSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="jobTitle">Job Title</Label>
                        <Input 
                          id="jobTitle"
                          placeholder="e.g. Frontend Developer" 
                          {...form.register('jobTitle')}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="companyName">Company Name</Label>
                        <Input 
                          id="companyName"
                          placeholder="e.g. Acme Inc." 
                          {...form.register('companyName')}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="jobDescription">Job Description</Label>
                      <Textarea 
                        id="jobDescription"
                        placeholder="Paste the job description here or provide key responsibilities" 
                        className="min-h-[120px]"
                        {...form.register('jobDescription')}
                        required
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="positionLevel">Position Level</Label>
                        <Select 
                          onValueChange={(value) => form.setValue('positionLevel', value)}
                          defaultValue="mid"
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="entry">Entry Level</SelectItem>
                            <SelectItem value="mid">Mid Level</SelectItem>
                            <SelectItem value="senior">Senior Level</SelectItem>
                            <SelectItem value="leadership">Leadership</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="keySkills">
                          Key Skills <span className="text-muted-foreground">(comma separated)</span>
                        </Label>
                        <Input 
                          id="keySkills"
                          placeholder="e.g. React, TypeScript, API integration" 
                          {...form.register('keySkills')}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="questionCount">Number of Questions</Label>
                      <div className="grid grid-cols-3 gap-4">
                        <Button 
                          type="button"
                          variant={questionCount === 5 ? 'default' : 'outline'}
                          className="w-full"
                          onClick={() => setQuestionCount(5)}
                        >
                          5 Questions
                        </Button>
                        <Button 
                          type="button"
                          variant={questionCount === 10 ? 'default' : 'outline'}
                          className="w-full"
                          onClick={() => setQuestionCount(10)}
                        >
                          10 Questions
                        </Button>
                        <Button 
                          type="button"
                          variant={questionCount === 15 ? 'default' : 'outline'}
                          className="w-full"
                          onClick={() => setQuestionCount(15)}
                        >
                          15 Questions
                        </Button>
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full">
                      Generate Interview Questions
                    </Button>
                  </form>
                )}
              </CardContent>
              
              {interviewType === 'general' && (
                <CardFooter>
                  <Button 
                    className="w-full" 
                    onClick={() => setCurrentStep('interview')}
                  >
                    Start Interview
                  </Button>
                </CardFooter>
              )}
            </Card>
          </div>
        )}
        
        {(currentStep === 'interview' || currentStep === 'results') && (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main interview panel */}
            <Card className="flex-1">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Interview Session</CardTitle>
                  <Badge variant="outline" className="ml-2">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </Badge>
                </div>
                <CardDescription>
                  {currentStep === 'interview' 
                    ? "Answer each question using audio or text. You'll receive AI feedback on your response."
                    : "Review your performance and feedback from the interview session."}
                </CardDescription>
                
                <div className="w-full bg-secondary/20 rounded-full h-2 mt-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-500 ease-in-out" 
                    style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>
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
                
                {currentStep === 'interview' && (
                  <div className="space-y-4">
                    {isRecording ? (
                      <div className="flex flex-col items-center justify-center p-6 border-2 border-primary/50 border-dashed rounded-lg bg-primary/5">
                        <div className="mb-4 relative">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xl font-semibold">{recordingTime}s</span>
                          </div>
                          <svg className="w-20 h-20">
                            <circle
                              className="text-primary/20"
                              strokeWidth="4"
                              stroke="currentColor"
                              fill="transparent"
                              r="36"
                              cx="40"
                              cy="40"
                            />
                            <circle
                              className="text-primary transition-all duration-500 ease-in-out"
                              strokeWidth="4"
                              strokeDasharray={36 * 2 * Math.PI}
                              strokeDashoffset={36 * 2 * Math.PI * (1 - recordingTime / 30)}
                              strokeLinecap="round"
                              stroke="currentColor"
                              fill="transparent"
                              r="36"
                              cx="40"
                              cy="40"
                            />
                          </svg>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-4">Recording... (max 30 seconds)</p>
                        
                        <Button
                          variant="destructive"
                          onClick={stopRecording}
                          className="flex items-center gap-2"
                        >
                          <Radio className="h-4 w-4 animate-pulse" /> 
                          Stop Recording
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col sm:flex-row gap-4">
                        {!audioUrl ? (
                          <Button
                            onClick={startRecording}
                            className="flex-1 h-auto py-4 flex-col"
                          >
                            <Mic className="h-8 w-8 mb-2" />
                            <span>Record Answer</span>
                            <span className="text-xs text-muted-foreground mt-1">(max 30 seconds)</span>
                          </Button>
                        ) : (
                          <div className="flex flex-col sm:flex-row gap-2 flex-1">
                            <Button
                              variant="outline"
                              onClick={togglePlayback}
                              className={`flex-1 h-auto py-4 flex-col ${isPlaying ? 'animate-pulse' : ''}`}
                            >
                              {isPlaying ? (
                                <>
                                  <div className="flex gap-1 mb-2">
                                    <div className="h-5 w-1 bg-current animate-pulse"></div>
                                    <div className="h-5 w-1 bg-current animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                                    <div className="h-5 w-1 bg-current animate-pulse" style={{ animationDelay: "0.1s" }}></div>
                                    <div className="h-5 w-1 bg-current animate-pulse" style={{ animationDelay: "0.3s" }}></div>
                                  </div>
                                  <span>Playing...</span>
                                </>
                              ) : (
                                <>
                                  <Play className="h-8 w-8 mb-2" />
                                  <span>Play Recording</span>
                                </>
                              )}
                            </Button>
                            
                            <Button
                              variant="default"
                              onClick={submitRecording}
                              className="flex-1 h-auto py-4 flex-col"
                            >
                              <ArrowRight className="h-8 w-8 mb-2" />
                              <span>Submit Answer</span>
                            </Button>
                            
                            <Button
                              variant="secondary"
                              onClick={() => {
                                setAudioUrl(null);
                                setRecordingTime(0);
                              }}
                              className="flex-1 h-auto py-4 flex-col"
                            >
                              <Rotate className="h-8 w-8 mb-2" />
                              <span>Re-record</span>
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="flex items-center">
                      <div className="flex-grow h-px bg-border"></div>
                      <span className="px-3 text-xs text-muted-foreground uppercase">or type your answer</span>
                      <div className="flex-grow h-px bg-border"></div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Type your response here..."
                        className="flex-1"
                        disabled={isAnalyzing || isRecording}
                        onKeyDown={(e) => e.key === 'Enter' && handleSubmitText()}
                      />
                      <Button
                        onClick={handleSubmitText}
                        disabled={!userInput.trim() || isAnalyzing || isRecording}
                      >
                        <ArrowRight size={16} />
                      </Button>
                    </div>
                  </div>
                )}
                
                {currentStep === 'results' && (
                  <div className="space-y-4">
                    <Card className="bg-secondary/10">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-xl">Interview Summary</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <p className="text-sm font-medium">Average Confidence</p>
                              <Progress value={75} className="h-2" />
                              <p className="text-xs text-right">75%</p>
                            </div>
                            <div className="space-y-2">
                              <p className="text-sm font-medium">Average Clarity</p>
                              <Progress value={82} className="h-2" />
                              <p className="text-xs text-right">82%</p>
                            </div>
                            <div className="space-y-2">
                              <p className="text-sm font-medium">Average Relevance</p>
                              <Progress value={78} className="h-2" />
                              <p className="text-xs text-right">78%</p>
                            </div>
                            <div className="space-y-2">
                              <p className="text-sm font-medium">Overall Score</p>
                              <Progress value={80} className="h-2" />
                              <p className="text-xs text-right">80%</p>
                            </div>
                          </div>
                          
                          <Separator />
                          
                          <div>
                            <h4 className="font-medium mb-2">Key Observations</h4>
                            <ul className="space-y-2 text-sm">
                              <li className="flex gap-2">
                                <ThumbsUp className="h-5 w-5 text-green-500 flex-shrink-0" />
                                <span>Strong responses to situational questions</span>
                              </li>
                              <li className="flex gap-2">
                                <ThumbsUp className="h-5 w-5 text-green-500 flex-shrink-0" />
                                <span>Good articulation of experience and skills</span>
                              </li>
                              <li className="flex gap-2">
                                <BrainCircuit className="h-5 w-5 text-amber-500 flex-shrink-0" />
                                <span>Consider using more concrete examples in responses</span>
                              </li>
                              <li className="flex gap-2">
                                <BrainCircuit className="h-5 w-5 text-amber-500 flex-shrink-0" />
                                <span>Work on speaking with more confidence on technical topics</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={resetInterview}
                      >
                        <RefreshCw size={16} className="mr-2" />
                        New Interview
                      </Button>
                      
                      <Button className="flex-1">
                        <Save size={16} className="mr-2" />
                        Save Results
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
              
              {currentStep === 'interview' && (
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={resetInterview}
                    size="sm"
                  >
                    <RefreshCw size={16} className="mr-2" />
                    Reset
                  </Button>
                </CardFooter>
              )}
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
              
              {currentStep === 'interview' && (
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>Current Question</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-3 bg-secondary/20 rounded-lg">
                      <p className="italic">{questions[currentQuestionIndex]}</p>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">Tips for this question:</h4>
                      <ul className="space-y-2 text-xs">
                        <li className="flex gap-2">
                          <div className="h-4 w-4 text-primary flex-shrink-0">✓</div>
                          <span>Be honest but frame weaknesses constructively</span>
                        </li>
                        <li className="flex gap-2">
                          <div className="h-4 w-4 text-primary flex-shrink-0">✓</div>
                          <span>Show self-awareness and desire for improvement</span>
                        </li>
                        <li className="flex gap-2">
                          <div className="h-4 w-4 text-primary flex-shrink-0">✓</div>
                          <span>Describe steps you're taking to address weaknesses</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Interview;
