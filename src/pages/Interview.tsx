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
import { Mic, Play, RefreshCw, ArrowLeft, ArrowRight, Upload, ThumbsUp, BrainCircuit, Save, RotateCw, Radio } from 'lucide-react';
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


