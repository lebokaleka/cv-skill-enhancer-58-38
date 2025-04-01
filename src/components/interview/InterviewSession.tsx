
import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import InterviewChat from './InterviewChat';
import InterviewTips from './InterviewTips';
import QuestionStrategy from './QuestionStrategy';
import { QuestionWithStrategy } from '@/types/interview';

interface SentimentScore {
  confidence: number;
  clarity: number;
  relevance: number;
  overall: number;
}

interface Message {
  role: 'user' | 'ai';
  content: string;
  sentiment?: SentimentScore;
}

interface InterviewSessionProps {
  interviewType: 'general' | 'narrowed' | null;
  currentQuestionIndex: number;
  questions: string[];
  questionObjects?: QuestionWithStrategy[];
  messages: Message[];
  isRecording: boolean;
  recordingTime: number;
  isPlaying: boolean;
  isAnalyzing: boolean;
  isProcessing: boolean;
  audioUrl: string | null;
  transcription: string | null;
  startRecording: () => void;
  stopRecording: () => void;
  togglePlayback: () => void;
  submitRecording: () => void;
  clearRecording: () => void;
  onGoBack: () => void;
}

const InterviewSession = ({
  interviewType,
  currentQuestionIndex,
  questions,
  questionObjects = [],
  messages,
  isRecording,
  recordingTime,
  isPlaying,
  isAnalyzing,
  isProcessing,
  audioUrl,
  transcription,
  startRecording,
  stopRecording,
  togglePlayback,
  submitRecording,
  clearRecording,
  onGoBack
}: InterviewSessionProps) => {
  const currentQuestionObject = questionObjects[currentQuestionIndex];
  
  return <div className="grid grid-cols-1 md:grid-cols-12 gap-6 py-8">
      <div className="md:col-span-8">
        <div className="flex items-center mb-6">
          <Button variant="outline" size="sm" onClick={onGoBack}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle>Interview Session</CardTitle>
            <Progress value={currentQuestionIndex / questions.length * 100} className="h-2" />
          </CardHeader>
          
          {/* Interview info badges moved below header */}
          <div className="px-6 pb-3 flex space-x-2">
            <Badge variant="outline" className="text-xs">
              {interviewType === 'general' ? 'General Interview' : 'Job-Specific Interview'}
            </Badge>
            <Badge variant="outline" className="text-xs">
              Question {currentQuestionIndex + 1} of {questions.length}
            </Badge>
          </div>
          
          <CardContent>
            <InterviewChat 
              messages={messages} 
              isRecording={isRecording} 
              recordingTime={recordingTime} 
              isPlaying={isPlaying} 
              isAnalyzing={isAnalyzing} 
              isProcessing={isProcessing}
              audioUrl={audioUrl}
              transcription={transcription} 
              startRecording={startRecording} 
              stopRecording={stopRecording} 
              togglePlayback={togglePlayback} 
              submitRecording={submitRecording} 
              clearRecording={clearRecording} 
            />
          </CardContent>
        </Card>
        
        <InterviewTips />
      </div>
      
      <div className="md:col-span-4">
        <QuestionStrategy 
          currentQuestion={questions[currentQuestionIndex]} 
          questionObject={currentQuestionObject}
        />
      </div>
    </div>;
};

export default InterviewSession;
