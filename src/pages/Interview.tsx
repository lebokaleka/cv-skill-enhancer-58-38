
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
import { Mic, Play, RefreshCw, ArrowLeft, ArrowRight, Upload, ThumbsUp, BrainCircuit, Save, RotateCw } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import Image from "@/components/ui/image";

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
  
  const [currentStep, setCurrentStep] = useState<'landing' | 'selection' | 'interview' | 'results'>('landing');
  const [interviewType, setInterviewType] = useState<'general' | 'narrowed' | null>(null);
  
  const [difficulty, setDifficulty] = useState('basic');
  const [questionCount, setQuestionCount] = useState(5);
  
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

  useEffect(() => {
    if (currentStep === 'interview' && interviewType === 'general') {
      const selectedQuestions = [...interviewQuestionsByCategory.general[difficulty as keyof typeof interviewQuestionsByCategory.general]];
      setQuestions(selectedQuestions.slice(0, questionCount));
      setMessages([{ role: 'ai', content: selectedQuestions[0] }]);
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

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    setAudioUrl(null);
    toast({
      title: "Recording started",
      description: "Speak clearly into your microphone...",
    });
  };

  const stopRecording = () => {
    setIsRecording(false);
    setAudioUrl('mock-audio-url');
    toast({
      title: "Recording complete",
      description: "You can now listen to your answer or submit it for analysis.",
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
    setMessages(prev => [...prev, { role: 'user', content: userResponse }]);
    
    setIsAnalyzing(true);
    setTimeout(() => {
      analyzeSentiment(userResponse);
    }, 2000);
  };

  const analyzeSentiment = (response: string) => {
    const sentiment: SentimentScore = {
      confidence: Math.floor(Math.random() * 40) + 60,
      clarity: Math.floor(Math.random() * 40) + 60,
      relevance: Math.floor(Math.random() * 40) + 60,
      overall: Math.floor(Math.random() * 40) + 60,
    };
    
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
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { 
            role: 'ai', 
            content: "Interview session complete! You've answered all the questions. You can now view your results."
          }
        ]);
        setCurrentStep('results');
      }, 1500);
    }
  };

  const generateFeedback = (sentiment: SentimentScore) => {
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
      <p><strong>Overall Impression:</strong> ${
        sentiment.overall > 75 
          ? "Your answer was strong and effective." 
          : "There's room for improvement in your answer."
      }</p>
      <p><strong>Tips for improvement:</strong> Prepare concise stories using the STAR method (Situation, Task, Action, Result) for behavioral questions. Practice speaking at a measured pace and emphasize key points.</p>
    `;
  };

  const renderContent = () => {
    switch (currentStep) {
      case 'landing':
        return (
          <div className="flex flex-col items-center text-center space-y-6 py-8">
            <div className="max-w-3xl">
              <h2 className="mb-4">Interview Coach</h2>
              <p className="text-lg text-muted-foreground mb-8">Practice your interview skills with our AI-powered Interview Coach. Get feedback on your responses and improve your performance.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => {
                  setInterviewType('general');
                  setCurrentStep('selection');
                }}>
                  <CardHeader>
                    <CardTitle>General Interview</CardTitle>
                    <CardDescription>Practice common interview questions that apply to most job positions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center">
                      <BrainCircuit size={64} className="text-primary" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Select General Interview</Button>
                  </CardFooter>
                </Card>
                
                <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => {
                  setInterviewType('narrowed');
                  setCurrentStep('selection');
                }}>
                  <CardHeader>
                    <CardTitle>Job-Specific Interview</CardTitle>
                    <CardDescription>Customize the interview based on a specific job position</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center">
                      <Upload size={64} className="text-primary" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Select Job-Specific Interview</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        );
        
      case 'selection':
        if (interviewType === 'general') {
          return (
            <div className="max-w-3xl mx-auto py-8">
              <Button 
                variant="outline" 
                size="sm" 
                className="mb-6" 
                onClick={() => setCurrentStep('landing')}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              
              <h2 className="mb-4">General Interview Settings</h2>
              <p className="text-muted-foreground mb-8">Select the difficulty level and number of questions for your practice interview.</p>
              
              <Card>
                <CardHeader>
                  <CardTitle>Configure Your Interview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <Label>Difficulty Level</Label>
                    <RadioGroup 
                      defaultValue="basic" 
                      value={difficulty}
                      onValueChange={setDifficulty}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="basic" id="basic" />
                        <Label htmlFor="basic" className="font-normal">Basic</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="intermediate" id="intermediate" />
                        <Label htmlFor="intermediate" className="font-normal">Intermediate</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="advanced" id="advanced" />
                        <Label htmlFor="advanced" className="font-normal">Advanced</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-4">
                    <Label>Number of Questions</Label>
                    <RadioGroup 
                      defaultValue="5" 
                      value={questionCount.toString()} 
                      onValueChange={(value) => setQuestionCount(parseInt(value))}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="5" id="q5" />
                        <Label htmlFor="q5" className="font-normal">5 Questions</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="10" id="q10" />
                        <Label htmlFor="q10" className="font-normal">10 Questions</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="15" id="q15" />
                        <Label htmlFor="q15" className="font-normal">15 Questions</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => setCurrentStep('interview')}>
                    Start Interview
                  </Button>
                </CardFooter>
              </Card>
            </div>
          );
        } else if (interviewType === 'narrowed') {
          return (
            <div className="max-w-3xl mx-auto py-8">
              <Button 
                variant="outline" 
                size="sm" 
                className="mb-6" 
                onClick={() => setCurrentStep('landing')}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              
              <h2 className="mb-4">Job-Specific Interview</h2>
              <p className="text-muted-foreground mb-8">Provide details about the job you're interviewing for to get tailored questions.</p>
              
              <Card>
                <CardHeader>
                  <CardTitle>Job Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form className="space-y-4">
                      <FormField
                        control={form.control}
                        name="jobTitle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Job Title</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Software Engineer" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="companyName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Tech Solutions Inc." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="jobDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Job Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Paste the job description here..." 
                                className="min-h-32"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="positionLevel"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Position Level</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select position level" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="entry">Entry Level</SelectItem>
                                <SelectItem value="mid">Mid Level</SelectItem>
                                <SelectItem value="senior">Senior Level</SelectItem>
                                <SelectItem value="manager">Management</SelectItem>
                                <SelectItem value="executive">Executive</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="keySkills"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Key Skills (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. React, TypeScript, Project Management" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => setCurrentStep('interview')}>
                    Generate Interview
                  </Button>
                </CardFooter>
              </Card>
            </div>
          );
        }
        return null;
        
      case 'interview':
        return (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 py-8">
            <div className="md:col-span-8">
              <div className="flex items-center mb-6">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setCurrentStep('selection')}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <div className="ml-auto space-x-2">
                  <Badge variant="outline" className="text-xs">
                    {interviewType === 'general' ? 'General Interview' : 'Job-Specific Interview'}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </Badge>
                </div>
              </div>

              <Card className="mb-6">
                <CardHeader className="pb-3">
                  <CardTitle>Interview Session</CardTitle>
                  <Progress value={(currentQuestionIndex / questions.length) * 100} className="h-2" />
                </CardHeader>
                <CardContent>
                  <div 
                    ref={chatContainerRef}
                    className="h-64 overflow-y-auto space-y-4 mb-4 p-2"
                  >
                    {messages.map((message, index) => (
                      <div 
                        key={index} 
                        className={`p-3 rounded-lg ${
                          message.role === 'ai' 
                            ? 'bg-muted text-foreground mr-12' 
                            : 'bg-primary text-primary-foreground ml-12'
                        }`}
                      >
                        <div dangerouslySetInnerHTML={{ __html: message.content }} />
                        {message.sentiment && (
                          <div className="mt-2 pt-2 border-t border-border">
                            <div className="grid grid-cols-4 gap-2 text-xs">
                              <div>
                                <div className="font-semibold">Confidence</div>
                                <div className="flex items-center">
                                  <Progress value={message.sentiment.confidence} className="h-1.5 mr-2 w-16" />
                                  {message.sentiment.confidence}%
                                </div>
                              </div>
                              <div>
                                <div className="font-semibold">Clarity</div>
                                <div className="flex items-center">
                                  <Progress value={message.sentiment.clarity} className="h-1.5 mr-2 w-16" />
                                  {message.sentiment.clarity}%
                                </div>
                              </div>
                              <div>
                                <div className="font-semibold">Relevance</div>
                                <div className="flex items-center">
                                  <Progress value={message.sentiment.relevance} className="h-1.5 mr-2 w-16" />
                                  {message.sentiment.relevance}%
                                </div>
                              </div>
                              <div>
                                <div className="font-semibold">Overall</div>
                                <div className="flex items-center">
                                  <Progress value={message.sentiment.overall} className="h-1.5 mr-2 w-16" />
                                  {message.sentiment.overall}%
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    {isAnalyzing && (
                      <div className="flex justify-center items-center p-4">
                        <RotateCw className="h-6 w-6 animate-spin text-muted-foreground" />
                        <span className="ml-2 text-muted-foreground">Analyzing your response...</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex flex-col space-y-2 items-center">
                      <div className="flex space-x-3">
                        <Button 
                          onClick={isRecording ? stopRecording : startRecording}
                          className={`rounded-full w-12 h-12 flex items-center justify-center ${isRecording ? 'bg-red-500 hover:bg-red-600' : ''}`}
                        >
                          <Mic className={`h-6 w-6 ${isRecording ? 'animate-pulse' : ''}`} />
                        </Button>
                        
                        {audioUrl && (
                          <>
                            <Button 
                              variant="outline" 
                              onClick={togglePlayback}
                              className="rounded-full w-12 h-12 flex items-center justify-center"
                              disabled={isAnalyzing}
                            >
                              <Play className={`h-6 w-6 ${isPlaying ? 'text-green-500' : ''}`} />
                            </Button>
                            
                            <Button 
                              variant="outline" 
                              onClick={() => setAudioUrl(null)}
                              className="rounded-full w-12 h-12 flex items-center justify-center"
                              disabled={isAnalyzing}
                            >
                              <RefreshCw className="h-6 w-6" />
                            </Button>
                          </>
                        )}
                      </div>
                      
                      {isRecording && (
                        <div className="flex items-center text-sm">
                          <span className="text-red-500 animate-pulse mr-2">●</span>
                          Recording: {recordingTime}s / 30s
                        </div>
                      )}
                      
                      {audioUrl && !isAnalyzing && (
                        <Button 
                          className="mt-2" 
                          onClick={submitRecording}
                        >
                          Submit Response
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Interview Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <ThumbsUp className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                      <p className="text-sm">Speak clearly and maintain a steady pace.</p>
                    </div>
                    <div className="flex items-start">
                      <ThumbsUp className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                      <p className="text-sm">Use the STAR method (Situation, Task, Action, Result) for behavioral questions.</p>
                    </div>
                    <div className="flex items-start">
                      <ThumbsUp className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                      <p className="text-sm">Be specific with examples from your experience.</p>
                    </div>
                    <div className="flex items-start">
                      <ThumbsUp className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                      <p className="text-sm">Keep your answers concise, typically 1-2 minutes per question.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-4">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Current Question</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-muted rounded-lg mb-6">
                    <p className="font-medium">{questions[currentQuestionIndex]}</p>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Question Strategy</h4>
                      <p className="text-sm text-muted-foreground">This is a{' '}
                        {questions[currentQuestionIndex]?.toLowerCase().includes('tell me about') ? 'behavioral' : 'situational'} question.
                        Focus on {questions[currentQuestionIndex]?.toLowerCase().includes('tell me about') ? 'providing specific examples' : 'explaining your thought process'}.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Key Points to Address</h4>
                      <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                        <li>Your specific experience or approach</li>
                        <li>The skills you demonstrated</li>
                        <li>The results you achieved</li>
                        <li>What you learned from the experience</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
        
      case 'results':
        return (
          <div className="max-w-3xl mx-auto py-8">
            <Button 
              variant="outline" 
              size="sm" 
              className="mb-6" 
              onClick={() => setCurrentStep('landing')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Start New Interview
            </Button>
            
            <h2 className="mb-4">Interview Results</h2>
            <p className="text-muted-foreground mb-8">Review your performance and get insights on areas to improve.</p>
            
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex flex-col items-center">
                    <div className="text-2xl font-bold">
                      {Math.floor(messages.reduce((acc, msg) => msg.sentiment ? acc + msg.sentiment.confidence : acc, 0) / 
                        messages.filter(msg => msg.sentiment).length)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Confidence</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="text-2xl font-bold">
                      {Math.floor(messages.reduce((acc, msg) => msg.sentiment ? acc + msg.sentiment.clarity : acc, 0) / 
                        messages.filter(msg => msg.sentiment).length)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Clarity</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="text-2xl font-bold">
                      {Math.floor(messages.reduce((acc, msg) => msg.sentiment ? acc + msg.sentiment.relevance : acc, 0) / 
                        messages.filter(msg => msg.sentiment).length)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Relevance</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="text-2xl font-bold">
                      {Math.floor(messages.reduce((acc, msg) => msg.sentiment ? acc + msg.sentiment.overall : acc, 0) / 
                        messages.filter(msg => msg.sentiment).length)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Overall</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold">Key Strengths</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>You provided specific examples in your answers.</li>
                    <li>Your responses were generally well-structured.</li>
                    <li>You maintained good energy throughout the interview.</li>
                  </ul>
                  
                  <h4 className="font-semibold pt-4">Areas for Improvement</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Try to be more concise in some of your longer answers.</li>
                    <li>Practice eliminating filler words ("um", "like", "you know").</li>
                    <li>Work on connecting your experiences more clearly to the job requirements.</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">
                  <Save className="mr-2 h-4 w-4" /> Save Results
                </Button>
                <Button onClick={() => setCurrentStep('landing')}>
                  Practice Again
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Question Review</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {questions.map((question, index) => {
                    const userMsg = messages.find((msg, i) => 
                      msg.role === 'user' && messages[i-1]?.content === question
                    );
                    const aiMsg = userMsg ? messages.find((msg, i) => 
                      msg.role === 'ai' && i > messages.indexOf(userMsg) && msg.sentiment
                    ) : null;
                    
                    return (
                      <div key={index} className="pb-4 border-b last:border-b-0">
                        <h5 className="font-medium mb-2">{index + 1}. {question}</h5>
                        {aiMsg?.sentiment && (
                          <div className="flex space-x-2 mt-2">
                            <Badge variant="outline" className={`${aiMsg.sentiment.overall > 75 ? 'border-green-500 text-green-700' : 'border-orange-500 text-orange-700'}`}>
                              {aiMsg.sentiment.overall}% Overall
                            </Badge>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
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
